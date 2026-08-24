/**
 * CAD interaction mode: hover + click picking of faces and edges, following
 * standard 3D CAD conventions.
 *
 * - A "face" is a connected triangle region bounded by feature edges —
 *   triangles joined across shared edges whose dihedral angle is below the
 *   feature-edge threshold (same 25° as the rendered EdgesGeometry), so
 *   planar faces, cylinder walls and spheres group into single faces.
 * - An "edge" is a chain of feature-edge segments separating the same pair
 *   of face regions — a full circular hole rim or a whole prism edge is
 *   picked at once.
 * - Hover highlights (blue); click selects (orange, persistent); clicking
 *   empty space clears. A quiet label reports the measurement
 *   (face area mm² / edge length mm).
 */
import * as THREE from 'three'

/** Must match the feature-edge angle used for the rendered edges. */
const SMOOTH_ANGLE_DEG = 25

const HOVER_COLOR = 0x4d6bfe
const SELECT_COLOR = 0xff9a3d

/** Edge snap radius in screen pixels (CAD-standard generous snapping). */
const EDGE_SNAP_PX = 6

type Target =
  | { kind: 'face'; mesh: THREE.Mesh; region: number }
  | { kind: 'edge'; mesh: THREE.Mesh; group: number }

interface FaceRegions {
  /** Region id per triangle. */
  regionOf: Uint32Array
  regions: Array<{ triangles: number[]; area: number }>
}

interface EdgeGroups {
  /** Group id per feature-edge segment. */
  groupOf: Uint32Array
  groups: Array<{ length: number; closed: boolean }>
}

/** Quantized vertex key so duplicated (unwelded) vertices still match. */
function vertexKey(x: number, y: number, z: number): string {
  return `${Math.round(x * 1e5)},${Math.round(y * 1e5)},${Math.round(z * 1e5)}`
}

class UnionFind {
  private readonly parent: Int32Array
  constructor(size: number) {
    this.parent = new Int32Array(size)
    for (let i = 0; i < size; i++) this.parent[i] = i
  }
  find(i: number): number {
    while (this.parent[i] !== i) {
      this.parent[i] = this.parent[this.parent[i]]
      i = this.parent[i]
    }
    return i
  }
  union(a: number, b: number): void {
    const ra = this.find(a)
    const rb = this.find(b)
    if (ra !== rb) this.parent[rb] = ra
  }
}

/** Group a mesh's triangles into face regions (bounded by feature edges). */
function buildFaceRegions(mesh: THREE.Mesh): FaceRegions {
  const geometry = mesh.geometry as THREE.BufferGeometry
  const position = geometry.getAttribute('position') as THREE.BufferAttribute
  const index = geometry.getIndex()
  const array = position.array as ArrayLike<number>
  const triCount = Math.floor((index !== null ? index.count : position.count) / 3)
  const vertexAt = (t: number, corner: number): number =>
    index !== null ? index.getX(t * 3 + corner) : t * 3 + corner

  // Per-triangle normals + area.
  const normals: THREE.Vector3[] = []
  const triArea = new Float64Array(triCount)
  const a = new THREE.Vector3()
  const b = new THREE.Vector3()
  const c = new THREE.Vector3()
  const ab = new THREE.Vector3()
  const ac = new THREE.Vector3()
  for (let t = 0; t < triCount; t++) {
    a.fromArray(array as never, vertexAt(t, 0) * 3)
    b.fromArray(array as never, vertexAt(t, 1) * 3)
    c.fromArray(array as never, vertexAt(t, 2) * 3)
    ab.subVectors(b, a)
    ac.subVectors(c, a)
    const normal = new THREE.Vector3().crossVectors(ab, ac)
    triArea[t] = normal.length() / 2
    normals.push(normal.normalize())
  }

  // Shared-edge adjacency (works for welded and unwelded tessellations).
  // edgeKey -> [triangle, vertexAKey, vertexBKey] entries
  const edgeMap = new Map<string, Array<{ tri: number; ka: string; kb: string }>>()
  for (let t = 0; t < triCount; t++) {
    for (let corner = 0; corner < 3; corner++) {
      const v0 = vertexAt(t, corner) * 3
      const v1 = vertexAt(t, (corner + 1) % 3) * 3
      const ka = vertexKey(array[v0], array[v0 + 1], array[v0 + 2])
      const kb = vertexKey(array[v1], array[v1 + 1], array[v1 + 2])
      const key = ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`
      const bucket = edgeMap.get(key)
      if (bucket === undefined) edgeMap.set(key, [{ tri: t, ka, kb }])
    else bucket.push({ tri: t, ka, kb })
    }
  }

  const cosLimit = Math.cos((SMOOTH_ANGLE_DEG * Math.PI) / 180)
  const uf = new UnionFind(triCount)
  for (const bucket of edgeMap.values()) {
    for (let i = 0; i < bucket.length; i++) {
      for (let j = i + 1; j < bucket.length; j++) {
        const left = bucket[i]
        const right = bucket[j]
        if (left === undefined || right === undefined) continue
        // Same physical side? If both triangles share both vertex keys they
        // are the same triangle duplicated — only join across the edge.
        if (left.ka === right.ka && left.kb === right.kb) continue
        if (normals[left.tri].dot(normals[right.tri]) >= cosLimit) {
          uf.union(left.tri, right.tri)
        }
      }
    }
  }

  const regionIds = new Map<number, number>()
  const regionOf = new Uint32Array(triCount)
  const regions: FaceRegions['regions'] = []
  for (let t = 0; t < triCount; t++) {
    const root = uf.find(t)
    let region = regionIds.get(root)
    if (region === undefined) {
      region = regions.length
      regionIds.set(root, region)
      regions.push({ triangles: [], area: 0 })
    }
    regionOf[t] = region
    const entry = regions[region]
    if (entry !== undefined) {
      entry.triangles.push(t)
      entry.area += triArea[t]
    }
  }
  return { regionOf, regions }
}

/** Chain feature-edge segments that separate the same two face regions. */
function buildEdgeGroups(mesh: THREE.Mesh, faces: FaceRegions, segments: Float32Array): EdgeGroups {
  const geometry = mesh.geometry as THREE.BufferGeometry
  const position = geometry.getAttribute('position') as THREE.BufferAttribute
  const index = geometry.getIndex()
  const array = position.array as ArrayLike<number>
  const triCount = Math.floor((index !== null ? index.count : position.count) / 3)
  const vertexAt = (t: number, corner: number): number =>
    index !== null ? index.getX(t * 3 + corner) : t * 3 + corner

  // edge key -> regions on both sides (reuse the region ids)
  const edgeRegions = new Map<string, number[]>()
  for (let t = 0; t < triCount; t++) {
    const region = faces.regionOf[t]
    for (let corner = 0; corner < 3; corner++) {
      const v0 = vertexAt(t, corner) * 3
      const v1 = vertexAt(t, (corner + 1) % 3) * 3
      const ka = vertexKey(array[v0], array[v0 + 1], array[v0 + 2])
      const kb = vertexKey(array[v1], array[v1 + 1], array[v1 + 2])
      const key = ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`
      const bucket = edgeRegions.get(key)
      if (bucket === undefined) edgeRegions.set(key, [region])
      else if (!bucket.includes(region)) bucket.push(region)
    }
  }

  const segCount = segments.length / 6
  const uf = new UnionFind(segCount)
  // Endpoint -> segment list, to chain segments sharing a vertex.
  const byEndpoint = new Map<string, number[]>()
  const segEndpoints: Array<[string, string]> = []
  for (let s = 0; s < segCount; s++) {
    const x0 = segments[s * 6]
    const y0 = segments[s * 6 + 1]
    const z0 = segments[s * 6 + 2]
    const x1 = segments[s * 6 + 3]
    const y1 = segments[s * 6 + 4]
    const z1 = segments[s * 6 + 5]
    const ka = vertexKey(x0, y0, z0)
    const kb = vertexKey(x1, y1, z1)
    segEndpoints.push([ka, kb])
    const bucketA = byEndpoint.get(ka)
    if (bucketA === undefined) byEndpoint.set(ka, [s])
    else bucketA.push(s)
    const bucketB = byEndpoint.get(kb)
    if (bucketB === undefined) byEndpoint.set(kb, [s])
    else bucketB.push(s)
  }

  const sideRegions = (s: number): string => {
    const [ka, kb] = segEndpoints[s] ?? ['', '']
    const key = ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`
    return (edgeRegions.get(key) ?? []).slice().sort((x, y) => x - y).join(',')
  }
  const signatures: string[] = []
  for (let s = 0; s < segCount; s++) signatures.push(sideRegions(s))

  for (let s = 0; s < segCount; s++) {
    const [ka, kb] = segEndpoints[s] ?? ['', '']
    for (const endpoint of [ka, kb]) {
      const neighbors = byEndpoint.get(endpoint) ?? []
      for (const n of neighbors) {
        if (n <= s) continue
        if (signatures[s] === signatures[n]) uf.union(s, n)
      }
    }
  }

  const groupIds = new Map<number, number>()
  const groupOf = new Uint32Array(segCount)
  const groups: EdgeGroups['groups'] = []
  for (let s = 0; s < segCount; s++) {
    const root = uf.find(s)
    let group = groupIds.get(root)
    if (group === undefined) {
      group = groups.length
      groupIds.set(root, group)
      groups.push({ length: 0, closed: true })
    }
    groupOf[s] = group
    const entry = groups[group]
    if (entry !== undefined) {
      const dx = segments[s * 6 + 3] - segments[s * 6]
      const dy = segments[s * 6 + 4] - segments[s * 6 + 1]
      const dz = segments[s * 6 + 5] - segments[s * 6 + 2]
      entry.length += Math.sqrt(dx * dx + dy * dy + dz * dz)
    }
  }
  // Closed = every endpoint of the chain meets exactly 2 chain segments.
  const chainAt = new Map<string, number>()
  for (let s = 0; s < segCount; s++) {
    const [ka, kb] = segEndpoints[s] ?? ['', '']
    const g = groupOf[s]
    chainAt.set(`${g}:${ka}`, (chainAt.get(`${g}:${ka}`) ?? 0) + 1)
    chainAt.set(`${g}:${kb}`, (chainAt.get(`${g}:${kb}`) ?? 0) + 1)
  }
  for (let g = 0; g < groups.length; g++) {
    let closed = true
    let seen = false
    for (let s = 0; s < segCount; s++) {
      if (groupOf[s] !== g) continue
      seen = true
      const [ka, kb] = segEndpoints[s] ?? ['', '']
      if ((chainAt.get(`${g}:${ka}`) ?? 0) !== 2 || (chainAt.get(`${g}:${kb}`) ?? 0) !== 2) closed = false
    }
    const entry = groups[g]
    if (entry !== undefined) entry.closed = seen && closed
  }
  return { groupOf, groups }
}

export interface PickingOptions {
  domElement: HTMLCanvasElement
  camera: THREE.PerspectiveCamera
  /** Group holding the CAD meshes (children scanned for picking). */
  cad: THREE.Group
}

export class PickingController {
  private readonly raycaster = new THREE.Raycaster()
  private readonly meshes: THREE.Mesh[] = []
  private readonly faceCache = new Map<THREE.Mesh, FaceRegions>()
  private readonly edgeCache = new Map<THREE.Mesh, EdgeGroups>()
  private readonly label: HTMLDivElement
  private hover: Target | null = null
  private selection: Target | null = null
  private down: { x: number; y: number; at: number } | null = null
  private disposed = false
  private readonly center: THREE.Vector3
  private readonly disposables: Array<{ dispose(): void }> = []

  private readonly hoverFaceMesh = new THREE.Mesh(
    new THREE.BufferGeometry(),
    new THREE.MeshBasicMaterial({ color: HOVER_COLOR, transparent: true, opacity: 0.35, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
  )
  private readonly selectFaceMesh = new THREE.Mesh(
    new THREE.BufferGeometry(),
    new THREE.MeshBasicMaterial({ color: SELECT_COLOR, transparent: true, opacity: 0.45, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }),
  )
  private readonly hoverEdgeLines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: HOVER_COLOR, depthTest: false, transparent: true, opacity: 0.95 }),
  )
  private readonly selectEdgeLines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: SELECT_COLOR, depthTest: false, transparent: true, opacity: 1 }),
  )

  constructor(private readonly options: PickingOptions) {
    const { domElement, cad } = options
    for (const overlay of [this.hoverFaceMesh, this.selectFaceMesh, this.hoverEdgeLines, this.selectEdgeLines]) {
      overlay.raycast = () => {}
      overlay.renderOrder = overlay instanceof THREE.LineSegments ? 3 : 2
      overlay.visible = false
    }
    this.disposables.push(
      this.hoverFaceMesh.material, this.hoverFaceMesh.geometry,
      this.selectFaceMesh.material, this.selectFaceMesh.geometry,
      this.hoverEdgeLines.material, this.hoverEdgeLines.geometry,
      this.selectEdgeLines.material, this.selectEdgeLines.geometry,
    )

    const size = new THREE.Box3().setFromObject(cad).getSize(new THREE.Vector3())
    this.center = new THREE.Box3().setFromObject(cad).getCenter(new THREE.Vector3())

    this.label = document.createElement('div')
    this.label.style.cssText = `position:absolute;left:8px;bottom:8px;z-index:5;pointer-events:none;font:500 11px/16px -apple-system,"Segoe UI",sans-serif;color:var(--dsw-alias-label-secondary,#374151);background:var(--dsw-alias-bg-base,rgba(255,255,255,0.88));border:1px solid var(--dsw-alias-border-l1,rgba(215,219,224,0.7));border-radius:8px;padding:2px 8px;opacity:0;transition:opacity 120ms;white-space:nowrap;`

    domElement.addEventListener('pointermove', this.onPointerMove)
    domElement.addEventListener('pointerleave', this.onPointerLeave)
    domElement.addEventListener('pointerdown', this.onPointerDown)
    domElement.addEventListener('pointerup', this.onPointerUp)
  }

  private meshesOf(): THREE.Mesh[] {
    // Refresh lazily: bodies can change identity between scenes; traverse the
    // whole subtree so grouped/nested body containers work too.
    this.meshes.length = 0
    this.options.cad.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) this.meshes.push(child as THREE.Mesh)
    })
    return this.meshes
  }

  private facesOf(mesh: THREE.Mesh): FaceRegions {
    let faces = this.faceCache.get(mesh)
    if (faces === undefined) {
      faces = buildFaceRegions(mesh)
      this.faceCache.set(mesh, faces)
    }
    return faces
  }

  private edgesOf(mesh: THREE.Mesh): { groups: EdgeGroups; segments: Float32Array } | null {
    const edges = mesh.userData.edges as THREE.LineSegments | undefined
    if (edges === undefined) return null
    let groups = this.edgeCache.get(mesh)
    if (groups === undefined) {
      const segments = (edges.geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array
      groups = buildEdgeGroups(mesh, this.facesOf(mesh), segments)
      this.edgeCache.set(mesh, groups)
    }
    const position = (edges.geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array
    return { groups, segments: position }
  }

  private pick(event: PointerEvent): Target | null {
    const { domElement, camera } = this.options
    const rect = domElement.getBoundingClientRect()
    const ndc = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    )
    this.raycaster.setFromCamera(ndc, camera)
    const meshes = this.meshesOf()

    // Face hit first — its distance calibrates the screen-space edge snap.
    const faceHit = this.raycaster.intersectObjects(meshes, false)[0]
    const depth = faceHit?.distance ?? camera.position.distanceTo(this.center)
    const worldPerPixel = (2 * depth * Math.tan(((camera.fov * Math.PI) / 180) / 2)) / Math.max(rect.height, 1)
    const snap = EDGE_SNAP_PX * worldPerPixel
    this.raycaster.params.Line.threshold = snap

    // Edges win when the pointer is near one (standard CAD behavior).
    let best: { mesh: THREE.Mesh; distance: number; segment: number } | null = null
    for (const mesh of meshes) {
      const edges = mesh.userData.edges as THREE.LineSegments | undefined
      if (edges === undefined) continue
      const hits = this.raycaster.intersectObject(edges, false)
      const hit = hits[0]
      if (hit === undefined) continue
      if (best === null || hit.distance < best.distance) {
        const segment = Math.floor((hit.index ?? 0) / 2) // index = segment start vertex
        best = { mesh, distance: hit.distance, segment }
      }
    }
    if (best !== null && (faceHit === undefined || best.distance <= faceHit.distance + snap)) {
      const cache = this.edgesOf(best.mesh)
      if (cache !== null) {
        return { kind: 'edge', mesh: best.mesh, group: cache.groups.groupOf[best.segment] ?? 0 }
      }
    }

    if (faceHit === undefined || faceHit.face === undefined) return null
    const region = this.facesOf(faceHit.object as THREE.Mesh).regionOf[faceHit.faceIndex ?? 0] ?? 0
    return { kind: 'face', mesh: faceHit.object as THREE.Mesh, region }
  }

  private onPointerMove = (event: PointerEvent): void => {
    if (this.disposed) return
    if (event.buttons !== 0) {
      this.setHover(null)
      return
    }
    this.setHover(this.pick(event))
  }

  private onPointerLeave = (): void => {
    this.setHover(null)
  }

  private onPointerDown = (event: PointerEvent): void => {
    if (event.button === 0) this.down = { x: event.clientX, y: event.clientY, at: performance.now() }
  }

  private onPointerUp = (event: PointerEvent): void => {
    if (this.disposed) return
    const down = this.down
    this.down = null
    if (down === null || event.button !== 0) return
    const moved = Math.hypot(event.clientX - down.x, event.clientY - down.y)
    if (moved > 5 || performance.now() - down.at > 600) return // was an orbit drag
    const target = this.pick(event)
    this.setSelection(target)
  }

  private setHover(target: Target | null): void {
    if (sameTarget(target, this.hover)) return
    this.hover = target
    this.refresh()
  }

  /** Meshes were replaced (e.g. demo swap): drop region/group caches + selection. */
  invalidate(): void {
    this.faceCache.clear()
    this.edgeCache.clear()
    this.selection = null
    this.hover = null
    this.refresh()
  }

  private setSelection(target: Target | null): void {
    this.selection = target
    this.refresh()
  }

  /** Rebuild highlight overlays + label for the current hover/selection. */
  private refresh(): void {
    const showFace = (mesh: THREE.Mesh, region: number, overlay: THREE.Mesh): void => {
      const faces = this.facesOf(mesh)
      const entry = faces.regions[region]
      if (entry === undefined) {
        overlay.visible = false
        return
      }
      const geometry = mesh.geometry as THREE.BufferGeometry
      const position = geometry.getAttribute('position') as THREE.BufferAttribute
      const index = geometry.getIndex()
      const array = position.array as ArrayLike<number>
      const out = new Float32Array(entry.triangles.length * 9)
      let cursor = 0
      for (const t of entry.triangles) {
        for (let corner = 0; corner < 3; corner++) {
          const v = (index !== null ? index.getX(t * 3 + corner) : t * 3 + corner) * 3
          out[cursor++] = array[v]
          out[cursor++] = array[v + 1]
          out[cursor++] = array[v + 2]
        }
      }
      overlay.geometry.dispose()
      overlay.geometry = new THREE.BufferGeometry()
      overlay.geometry.setAttribute('position', new THREE.BufferAttribute(out, 3))
      if (mesh !== overlay.parent) mesh.add(overlay)
      overlay.visible = true
    }

    const showEdge = (mesh: THREE.Mesh, group: number, overlay: THREE.LineSegments): void => {
      const cache = this.edgesOf(mesh)
      if (cache === null) {
        overlay.visible = false
        return
      }
      const { groups, segments } = cache
      const out: number[] = []
      for (let s = 0; s < groups.groupOf.length; s++) {
        if (groups.groupOf[s] !== group) continue
        for (let k = 0; k < 6; k++) out.push(segments[s * 6 + k])
      }
      overlay.geometry.dispose()
      overlay.geometry = new THREE.BufferGeometry()
      overlay.geometry.setAttribute('position', new THREE.Float32BufferAttribute(out, 3))
      if (mesh !== overlay.parent) mesh.add(overlay)
      overlay.visible = true
    }

    const hide = (...overlays: THREE.Object3D[]): void => {
      for (const overlay of overlays) overlay.visible = false
    }

    const hover = sameTarget(this.hover, this.selection) ? null : this.hover
    const selection = this.selection

    if (hover !== null && hover.kind === 'face') showFace(hover.mesh, hover.region, this.hoverFaceMesh)
    else hide(this.hoverFaceMesh)
    if (hover !== null && hover.kind === 'edge') showEdge(hover.mesh, hover.group, this.hoverEdgeLines)
    else hide(this.hoverEdgeLines)
    if (selection !== null && selection.kind === 'face') showFace(selection.mesh, selection.region, this.selectFaceMesh)
    else hide(this.selectFaceMesh)
    if (selection !== null && selection.kind === 'edge') showEdge(selection.mesh, selection.group, this.selectEdgeLines)
    else hide(this.selectEdgeLines)

    const active = this.hover ?? selection
    const host = this.options.domElement.parentElement
    if (active !== null) {
      const name = active.mesh.name.length > 0 ? `${active.mesh.name} · ` : ''
      if (active.kind === 'face') {
        const area = this.facesOf(active.mesh).regions[active.region]?.area ?? 0
        this.label.textContent = `${name}face · ${area.toLocaleString(undefined, { maximumFractionDigits: 1 })} mm²`
      } else {
        const info = this.edgesOf(active.mesh)?.groups.groups[active.group]
        const length = info?.length ?? 0
        this.label.textContent = `${name}edge · ${length.toLocaleString(undefined, { maximumFractionDigits: 1 })} mm${info?.closed === true ? ' · closed' : ''}`
      }
      this.label.style.opacity = '1'
      if (this.label.parentElement !== host && host !== null) host.appendChild(this.label)
    } else {
      this.label.style.opacity = '0'
      this.label.textContent = ''
    }
    this.options.domElement.style.cursor = active === null ? 'grab' : 'pointer'
  }

  dispose(): void {
    if (this.disposed) return
    this.disposed = true
    const { domElement } = this.options
    domElement.removeEventListener('pointermove', this.onPointerMove)
    domElement.removeEventListener('pointerleave', this.onPointerLeave)
    domElement.removeEventListener('pointerdown', this.onPointerDown)
    domElement.removeEventListener('pointerup', this.onPointerUp)
    for (const overlay of [this.hoverFaceMesh, this.selectFaceMesh, this.hoverEdgeLines, this.selectEdgeLines]) {
      overlay.removeFromParent()
    }
    for (const disposable of this.disposables) disposable.dispose()
    this.label.remove()
  }
}

function sameTarget(a: Target | null, b: Target | null): boolean {
  if (a === null || b === null) return a === b
  return a.kind === b.kind && a.mesh === b.mesh && (a.kind === 'face' ? a.region === (b as { region: number }).region : a.group === (b as { group: number }).group)
}
