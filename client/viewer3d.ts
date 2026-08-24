/**
 * 3D viewport: a self-contained Three.js scene mounted into a container
 * element. Owns renderer/camera/lights/controls lifecycle and disposal.
 *
 * CAD convention: Z-up world (matching OCCT and the modeling document), with
 * a labeled XYZ axis triad always visible — including the empty scene.
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { decodeF32, decodeU32 } from './decode.js'
import { ViewCube } from './viewcube.js'
import { PickingController } from './picking.js'
import { demoBracketGeometry, DEMO_BOUNDS } from './demo-model.js'
import type { CadScene3D, CadMesh } from './scene-types.js'

/** CAD render modes: shaded faces with feature edges (default), faces only,
 *  or full wireframe. */
export type RenderMode = 'shaded-edges' | 'shaded' | 'wireframe'

/** Feature-edge threshold in degrees — below it, smooth surfaces stay clean. */
const EDGE_ANGLE = 25

/** The built-in demo examples served by /dsh-cad/demo-scene. */
export type DemoPart = 'bracket' | 'flange' | 'shaft'

export interface Viewer3DHandle {
  /** Legacy shortcut: true → wireframe, false → shaded-edges. */
  setWireframe(enabled: boolean): void
  setRenderMode(mode: RenderMode): void
  resetView(): void
  dispose(): void
}

export interface CadEditorHandle extends Viewer3DHandle {
  /** Load a different built-in demo BRep part (keeps the current one on failure). */
  loadPart(part: DemoPart): void
}

/** Axis color convention: X red, Y green, Z blue. */
const AXIS_COLORS = { x: 0xd23b3b, y: 0x2e9e44, z: 0x2b6fd6 } as const

/** A canvas-texture sprite with the axis letter at the triad tip. */
function axisLabelSprite(text: string, color: number): THREE.Sprite {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const context = canvas.getContext('2d')
  if (context !== null) {
    context.font = 'bold 44px -apple-system, "Segoe UI", sans-serif'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = `#${color.toString(16).padStart(6, '0')}`
    context.fillText(text, 32, 34)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(1, 1, 1)
  return sprite
}

interface SceneCommon {
  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  controls: OrbitControls
  dispose(): void
}

/** Shared scene shell: renderer, Z-up camera, orbit controls, resize, loop. */
function mountShell(container: HTMLElement, options: { autoRotate?: boolean } = {}): SceneCommon {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(container.clientWidth || 360, container.clientHeight || 300)
  container.appendChild(renderer.domElement)
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  renderer.domElement.style.display = 'block'

  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 10_000)
  camera.up.set(0, 0, 1) // CAD convention: Z-up

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.12
  if (options.autoRotate === true) {
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.8
  }

  const resize = (): void => {
    const width = container.clientWidth
    const height = container.clientHeight
    if (width === 0 || height === 0) return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(container)

  return {
    renderer,
    camera,
    controls,
    dispose(): void {
      observer.disconnect()
      controls.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement)
    },
  }
}

/** The always-on CAD scene furniture: ground grid (XY) + labeled XYZ triad. */
function addSceneFurniture(scene: THREE.Scene, scale: number): THREE.Object3D[] {
  const group = new THREE.Group()

  const grid = new THREE.GridHelper(scale * 2, 20, 0x8a919c, 0x4a4f58)
  // GridHelper defaults to the XZ plane; rotate onto XY for the Z-up world.
  grid.rotation.x = Math.PI / 2
  group.add(grid)

  const axes = new THREE.AxesHelper(scale)
  group.add(axes)

  const labelOffset = scale * 1.12
  const labelScale = scale * 0.14
  const xAxis = axisLabelSprite('X', AXIS_COLORS.x)
  xAxis.position.set(labelOffset, 0, 0)
  xAxis.scale.set(labelScale, labelScale, labelScale)
  group.add(xAxis)
  const yAxis = axisLabelSprite('Y', AXIS_COLORS.y)
  yAxis.position.set(0, labelOffset, 0)
  yAxis.scale.set(labelScale, labelScale, labelScale)
  group.add(yAxis)
  const zAxis = axisLabelSprite('Z', AXIS_COLORS.z)
  zAxis.position.set(0, 0, labelOffset)
  zAxis.scale.set(labelScale, labelScale, labelScale)
  group.add(zAxis)

  scene.add(group)
  return [group, grid, axes, xAxis, yAxis, zAxis]
}

function disposeObjects(objects: THREE.Object3D[]): void {
  for (const object of objects) {
    object.traverse((child) => {
      const mesh = child as THREE.Mesh
      if (mesh.isMesh) {
        mesh.geometry?.dispose()
        const material = mesh.material
        if (Array.isArray(material)) material.forEach((entry) => entry.dispose())
        else material?.dispose()
      }
      const line = child as THREE.LineSegments
      if (line.isLineSegments) {
        line.geometry?.dispose()
        line.material?.dispose()
      }
      const sprite = child as THREE.Sprite
      if (sprite.isSprite) {
        sprite.material.map?.dispose()
        sprite.material.dispose()
      }
    })
  }
}

// ── render modes (faces / feature edges / wireframe) ────────────────────────

/** Lazily attach a feature-edge overlay to a mesh (computed once per mesh). */
function ensureMeshEdges(mesh: THREE.Mesh): THREE.LineSegments | undefined {
  const existing = mesh.userData.edges
  if (existing !== undefined) return existing
  const geometry = mesh.geometry as THREE.BufferGeometry | undefined
  if (geometry === undefined) return undefined
  // Push faces slightly back so edge lines win the depth test.
  const material = mesh.material as THREE.MeshStandardMaterial
  material.polygonOffset = true
  material.polygonOffsetFactor = 1
  material.polygonOffsetUnits = 1
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry, EDGE_ANGLE),
    new THREE.LineBasicMaterial({ color: 0x33404f, transparent: true, opacity: 0.9 }),
  )
  mesh.add(edges)
  mesh.userData.edges = edges
  return edges
}

/** Apply a render mode to every mesh under root. */
function applyRenderMode(root: THREE.Object3D, mode: RenderMode): void {
  root.traverse((child) => {
    const mesh = child as THREE.Mesh
    if (!mesh.isMesh) return
    const material = mesh.material as THREE.MeshStandardMaterial
    material.wireframe = mode === 'wireframe'
    const edges = mode === 'shaded-edges' ? ensureMeshEdges(mesh) : (mesh.userData.edges as THREE.LineSegments | undefined)
    if (edges !== undefined) edges.visible = mode === 'shaded-edges'
  })
}

/** Build one Three.js mesh; positions/normals/indices may be base64 or
 *  already-decoded typed arrays (the binary transport path), or a ready-made
 *  geometry (the built-in demo part). */
function buildMesh(mesh: CadMesh | { name: string; color?: number; positions: Float32Array; normals?: Float32Array; indices: Uint32Array } | { name: string; color?: number; geometry: THREE.BufferGeometry }): THREE.Mesh {
  const geometry = 'geometry' in mesh
    ? mesh.geometry
    : (() => {
        const geometry = new THREE.BufferGeometry()
        const positions = typeof (mesh as { positions: unknown }).positions === 'string' ? decodeF32((mesh as { positions: string }).positions) : (mesh as { positions: Float32Array }).positions
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        if ((mesh as { normals?: unknown }).normals !== undefined) {
          const normals = typeof (mesh as { normals?: unknown }).normals === 'string' ? decodeF32((mesh as { normals: string }).normals) : (mesh as { normals: Float32Array }).normals
          geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3))
        } else {
          geometry.computeVertexNormals()
        }
        const indices = typeof (mesh as { indices: unknown }).indices === 'string' ? decodeU32((mesh as { indices: string }).indices) : (mesh as { indices: Uint32Array }).indices
        geometry.setIndex(new THREE.BufferAttribute(indices, 1))
        return geometry
      })()
  const color = (mesh as { color?: number }).color === undefined ? 0x9fb4c7 : (mesh as { color?: number }).color
  const material = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.15,
    roughness: 0.55,
    flatShading: (mesh as { normals?: unknown }).normals === undefined,
    side: THREE.DoubleSide,
  })
  return new THREE.Mesh(geometry, material)
}

/**
 * The CAD editor viewport: the demo example L-bracket parsed from the packaged
 * demo-bracket.brep (served by /dsh-cad/demo-scene), so what is displayed
 * corresponds to the real local BRep file. The client-side extrusion is the
 * instant-paint fallback while the fetch is in flight (or when it fails).
 */
export function mountCadEditor3D(container: HTMLElement, options: { onSource?: (source: 'brep' | 'fallback') => void; part?: DemoPart } = {}): CadEditorHandle {
  const shell = mountShell(container)
  const scene = new THREE.Scene()

  // cadRoot is stable across the BRep swap: picking and render-mode helpers
  // hold this reference, so replaced children are always the live set.
  const cadRoot = new THREE.Group()
  scene.add(cadRoot)
  let cad = new THREE.Group()
  cad.add(buildMesh({ name: 'demo-bracket', geometry: demoBracketGeometry() }))
  cadRoot.add(cad)

  let bounds: { min: { x: number; y: number; z: number }; max: { x: number; y: number; z: number } } = { ...DEMO_BOUNDS }
  let size = new THREE.Vector3(
    bounds.max.x - bounds.min.x,
    bounds.max.y - bounds.min.y,
    bounds.max.z - bounds.min.z,
  )
  let center = new THREE.Vector3(
    (bounds.max.x + bounds.min.x) / 2,
    (bounds.max.y + bounds.min.y) / 2,
    (bounds.max.z + bounds.min.z) / 2,
  )
  let maxDim = Math.max(size.x, size.y, size.z, 1e-6)

  scene.add(cad)

  const hemisphere = new THREE.HemisphereLight(0xffffff, 0x595f6b, 1.1)
  scene.add(hemisphere)
  const key = new THREE.DirectionalLight(0xffffff, 1.6)
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xffffff, 0.5)
  scene.add(fill)
  const placeLights = (): void => {
    key.position.set(center.x + maxDim, center.y + maxDim * 1.4, center.z + maxDim * 0.8)
    fill.position.set(center.x - maxDim, center.y + maxDim * 0.4, center.z - maxDim * 0.6)
  }
  placeLights()

  const furniture = addSceneFurniture(scene, maxDim)
  const grid = furniture[1] as THREE.GridHelper

  let mode: RenderMode = 'shaded-edges'

  const placeCamera = (): void => {
    const distance = maxDim * 1.9
    shell.camera.position.set(
      center.x + distance * 0.7,
      center.y + distance * 0.55,
      center.z + distance * 0.6,
    )
    shell.controls.target.copy(center)
    shell.controls.update()
  }

  const applyFrame = (): void => {
    grid.position.set(center.x, center.y, bounds.min.z)
    shell.camera.near = maxDim / 100
    shell.camera.far = maxDim * 40
    applyRenderMode(cadRoot, mode)
    placeLights()
    placeCamera()
  }
  applyFrame()

  const viewCube = new ViewCube({ container, camera: shell.camera, controls: shell.controls, onHome: placeCamera })
  const picking = new PickingController({ domElement: shell.renderer.domElement, camera: shell.camera, cad: cadRoot })

  let disposed = false
  /** Swap in geometry parsed from the real BRep file (server-side OCCT). */
  const swapFromBrep = (loaded: { meshes: Array<Record<string, unknown>>; bounds: typeof bounds }): void => {
    if (disposed) return
    cadRoot.remove(cad)
    disposeObjects([cad])
    picking.invalidate()
    cad = new THREE.Group()
    for (const mesh of loaded.meshes) cad.add(buildMesh(mesh as never))
    cadRoot.add(cad)
    bounds = loaded.bounds
    size = new THREE.Vector3(
      bounds.max.x - bounds.min.x,
      bounds.max.y - bounds.min.y,
      bounds.max.z - bounds.min.z,
    )
    center = new THREE.Vector3(
      (bounds.max.x + bounds.min.x) / 2,
      (bounds.max.y + bounds.min.y) / 2,
      (bounds.max.z + bounds.min.z) / 2,
    )
    maxDim = Math.max(size.x, size.y, size.z, 1e-6)
    applyFrame()
  }

  let brepLoaded = false
  /** Load a demo part's BRep scene and swap it in (server-side OCCT parse). */
  const loadPart = (part: DemoPart): void => {
    fetch(`/dsh-cad/demo-scene?part=${part}`)
      .then((response) => (response.ok ? (response.json() as Promise<{ meshes: Array<Record<string, unknown>>; bounds: typeof bounds }>) : Promise.reject(new Error(`HTTP ${response.status}`))))
      .then((loaded) => {
        if (disposed) return
        swapFromBrep(loaded)
        brepLoaded = true
        options.onSource?.('brep')
      })
      .catch(() => {
        /* keep whatever is currently displayed */
        if (!disposed) options.onSource?.(brepLoaded ? 'brep' : 'fallback')
      })
  }
  loadPart(options.part ?? 'bracket')

  const frame = (): void => {
    animationId = requestAnimationFrame(frame)
    shell.controls.update()
    shell.renderer.render(scene, shell.camera)
    viewCube.update()
  }
  let animationId = requestAnimationFrame(frame)

  return {
    setWireframe(enabled: boolean): void {
      this.setRenderMode(enabled ? 'wireframe' : 'shaded-edges')
    },
    setRenderMode(next: RenderMode): void {
      mode = next
      applyRenderMode(cadRoot, mode)
    },
    loadPart,
    resetView: placeCamera,
    dispose(): void {
      disposed = true
      cancelAnimationFrame(animationId)
      picking.dispose()
      viewCube.dispose()
      disposeObjects([cadRoot, ...furniture, hemisphere, key, fill])
      shell.dispose()
    },
  }
}

/** Mount a 3D viewer for real geometry into container; returns the control handle. */
export function mountViewer3D(container: HTMLElement, scene: CadScene3D | { kind: '3d'; format: string; meshes: Array<Record<string, unknown>>; bounds: { min: { x: number; y: number; z: number }; max: { x: number; y: number; z: number } }; units: string }): Viewer3DHandle {
  const shell = mountShell(container)
  const threeScene = new THREE.Scene()

  const cad = new THREE.Group()
  for (const mesh of scene.meshes) cad.add(buildMesh(mesh))

  const bounds = scene.bounds
  const size = new THREE.Vector3(
    bounds.max.x - bounds.min.x,
    bounds.max.y - bounds.min.y,
    bounds.max.z - bounds.min.z,
  )
  const center = new THREE.Vector3(
    (bounds.max.x + bounds.min.x) / 2,
    (bounds.max.y + bounds.min.y) / 2,
    (bounds.max.z + bounds.min.z) / 2,
  )
  const maxDim = Math.max(size.x, size.y, size.z, 1e-6)

  threeScene.add(cad)

  const hemisphere = new THREE.HemisphereLight(0xffffff, 0x595f6b, 1.1)
  threeScene.add(hemisphere)
  const key = new THREE.DirectionalLight(0xffffff, 1.6)
  key.position.set(center.x + maxDim, center.y + maxDim * 1.4, center.z + maxDim * 0.8)
  threeScene.add(key)
  const fill = new THREE.DirectionalLight(0xffffff, 0.5)
  fill.position.set(center.x - maxDim, center.y + maxDim * 0.4, center.z - maxDim * 0.6)
  threeScene.add(fill)

  // Ground grid on the model's XY plane plus the labeled triad at the origin.
  const furniture = addSceneFurniture(threeScene, maxDim)
  const grid = furniture[1] as THREE.GridHelper
  grid.position.set(center.x, center.y, bounds.min.z)

  shell.camera.near = maxDim / 100
  shell.camera.far = maxDim * 40

  const placeCamera = (): void => {
    const distance = maxDim * 1.9
    shell.camera.position.set(
      center.x + distance * 0.7,
      center.y + distance * 0.55,
      center.z + distance * 0.6,
    )
    shell.controls.target.copy(center)
    shell.controls.update()
  }
  placeCamera()
  const viewCube = new ViewCube({ container, camera: shell.camera, controls: shell.controls, onHome: placeCamera })

  const defaultMode: RenderMode = 'shaded-edges'
  applyRenderMode(cad, defaultMode)
  const picking = new PickingController({ domElement: shell.renderer.domElement, camera: shell.camera, cad })

  const frame = (): void => {
    animationId = requestAnimationFrame(frame)
    shell.controls.update()
    shell.renderer.render(threeScene, shell.camera)
    viewCube.update()
  }
  let animationId = requestAnimationFrame(frame)

  return {
    setWireframe(enabled: boolean): void {
      this.setRenderMode(enabled ? 'wireframe' : 'shaded-edges')
    },
    setRenderMode(next: RenderMode): void {
      applyRenderMode(cad, next)
    },
    resetView: placeCamera,
    dispose(): void {
      cancelAnimationFrame(animationId)
      picking.dispose()
      viewCube.dispose()
      disposeObjects([cad, ...furniture, hemisphere, key, fill])
      shell.dispose()
    },
  }
}
