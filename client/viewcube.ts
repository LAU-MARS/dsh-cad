/**
 * Onshape-style ViewCube: a small navigation cube pinned to the viewport's
 * top-right corner. It mirrors the main camera orientation live; each face is
 * a 3×3 grid whose cells map to the 26 standard zones (6 faces, 12 edges,
 * 8 corners). Hovering highlights the zone, clicking animates the camera to
 * that view around the current orbit target.
 *
 * Z-up CAD convention: TOP=+Z, FRONT=−Y (looking toward +Y), RIGHT=+X.
 */
import * as THREE from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const HALF = 0.85 // cube half-size in overlay units
const CELLS = 3 // zone grid resolution per face
const TWEEN_MS = 400

const V = (x: number, y: number, z: number): THREE.Vector3 => new THREE.Vector3(x, y, z)

/** Face name for each world axis direction. */
const AXIS_NAMES: Array<[string, THREE.Vector3]> = [
  ['TOP', V(0, 0, 1)],
  ['BOTTOM', V(0, 0, -1)],
  ['FRONT', V(0, -1, 0)],
  ['BACK', V(0, 1, 0)],
  ['RIGHT', V(1, 0, 0)],
  ['LEFT', V(-1, 0, 0)],
]

interface FaceDef {
  name: string
  normal: THREE.Vector3
  /** World direction that should read as "up" on the face texture. */
  up: THREE.Vector3
}

/** Basis per face: normal + texture-up (right = up × normal). */
const FACES: FaceDef[] = [
  { name: 'TOP', normal: V(0, 0, 1), up: V(0, 1, 0) },
  { name: 'BOTTOM', normal: V(0, 0, -1), up: V(0, 1, 0) },
  { name: 'FRONT', normal: V(0, -1, 0), up: V(0, 0, 1) },
  { name: 'BACK', normal: V(0, 1, 0), up: V(0, 0, 1) },
  { name: 'RIGHT', normal: V(1, 0, 0), up: V(0, 0, 1) },
  { name: 'LEFT', normal: V(-1, 0, 0), up: V(0, 0, 1) },
]

/** Canonical zone name for a direction like (0, -0.577, +0.577) → FRONT-TOP. */
function zoneName(dir: THREE.Vector3): string {
  const parts: string[] = []
  const n = dir.length()
  for (const [name, axis] of AXIS_NAMES) {
    const dot = dir.dot(axis) / n
    if (dot > 0.5) parts.push(name)
  }
  return parts.sort().join('-')
}

/** Face texture: soft fill, hairline border, centered label. */
function faceTexture(name: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext('2d')
  if (context !== null) {
    context.fillStyle = 'rgba(246, 248, 251, 0.96)'
    context.fillRect(0, 0, 128, 128)
    context.strokeStyle = 'rgba(148, 158, 172, 0.9)'
    context.lineWidth = 3
    context.strokeRect(1.5, 1.5, 125, 125)
    context.fillStyle = '#5b6472'
    context.font = `600 ${name.length > 2 ? 24 : 28}px -apple-system, "Segoe UI", sans-serif`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(name, 64, 66)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 4
  return texture
}

export interface ViewCubeOptions {
  /** Viewport container; `position: relative` is enforced here. */
  container: HTMLElement
  camera: THREE.PerspectiveCamera
  controls: OrbitControls
  /** Home-button callback (usually the viewer's reset view). */
  onHome?: () => void
  /** Overlay edge length in px. */
  size?: number
}

/**
 * The navigation cube overlay. Owns a tiny second WebGL renderer so hit
 * testing never interferes with the main canvas's orbit gestures.
 */
export class ViewCube {
  private readonly camera: THREE.PerspectiveCamera
  private readonly controls: OrbitControls
  private readonly renderer: THREE.WebGLRenderer
  private readonly overlayCamera = new THREE.OrthographicCamera(-1.35, 1.35, 1.35, -1.35, 0.1, 10)
  private readonly root = new THREE.Group()
  private readonly cells: THREE.Mesh[] = []
  private readonly zoneCells = new Map<string, THREE.Mesh[]>()
  private readonly hiddenMaterial = new THREE.MeshBasicMaterial({ visible: false })
  private readonly highlightMaterial = new THREE.MeshBasicMaterial({
    color: 0x4d6bfe,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  })
  private readonly disposables: Array<{ dispose(): void }> = [this.hiddenMaterial, this.highlightMaterial]
  private readonly raycaster = new THREE.Raycaster()
  private readonly overlay: HTMLDivElement
  private readonly caption: HTMLDivElement
  private hovered: string | null = null
  private tweenId = 0
  private disposed = false

  constructor(private readonly options: ViewCubeOptions) {
    const { container, camera, controls } = options
    this.camera = camera
    this.controls = controls
    const size = options.size ?? 96

    if (getComputedStyle(container).position === 'static') container.style.position = 'relative'
    this.overlay = document.createElement('div')
    this.overlay.style.cssText = `position:absolute;top:8px;right:8px;width:${size}px;display:flex;flex-direction:column;align-items:center;gap:3px;z-index:5;user-select:none;`
    container.appendChild(this.overlay)

    const canvasHost = document.createElement('div')
    canvasHost.style.cssText = `width:${size}px;height:${size}px;cursor:grab;`
    this.overlay.appendChild(canvasHost)

    this.caption = document.createElement('div')
    this.caption.style.cssText = `min-height:14px;font:500 10px/14px -apple-system,"Segoe UI",sans-serif;color:var(--dsw-alias-label-secondary,#374151);background:var(--dsw-alias-bg-base,rgba(255,255,255,0.85));border-radius:7px;padding:0 7px;opacity:0;transition:opacity 120ms;text-align:center;white-space:nowrap;`
    this.overlay.appendChild(this.caption)

    const home = document.createElement('button')
    home.type = 'button'
    home.title = 'Reset view'
    home.setAttribute('aria-label', 'Reset view')
    home.style.cssText = `width:22px;height:22px;border-radius:50%;border:1px solid var(--dsw-alias-border-l2,#c4c9d0);background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-secondary,#374151);font-size:12px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;`
    home.textContent = '⌂'
    home.addEventListener('click', () => { options.onHome?.() })
    this.overlay.appendChild(home)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(size, size)
    this.renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;touch-action:none;'
    canvasHost.appendChild(this.renderer.domElement)

    this.overlayCamera.position.set(0, 0, 4)
    this.overlayCamera.lookAt(0, 0, 0)

    const scene = new THREE.Scene()
    scene.add(this.root)
    this.buildCube()

    const pick = (event: PointerEvent): { zone: string | null; point: THREE.Vector3 | null } => {
      const rect = this.renderer.domElement.getBoundingClientRect()
      const ndc = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      )
      this.raycaster.setFromCamera(ndc, this.overlayCamera)
      const hit = this.raycaster.intersectObjects(this.cells, false)[0]
      return hit === undefined ? { zone: null, point: null } : { zone: hit.object.userData.zone as string, point: hit.point }
    }

    const dom = this.renderer.domElement
    dom.addEventListener('pointermove', (event) => {
      const { zone } = pick(event)
      this.setHover(zone)
      dom.style.cursor = zone === null ? 'grab' : 'pointer'
    })
    dom.addEventListener('pointerleave', () => { this.setHover(null) })
    dom.addEventListener('click', (event) => {
      const { zone } = pick(event)
      if (zone === null) return
      const dir = zoneDirection(zone)
      if (dir !== null) this.animateTo(dir)
    })
  }

  /** Build the six labeled face planes + the 54 zone hit cells. */
  private buildCube(): void {
    const cellSize = (2 * HALF) / CELLS
    for (const face of FACES) {
      const right = face.up.clone().cross(face.normal) // plane local +X
      const basis = new THREE.Matrix4().makeBasis(right, face.up, face.normal)
      const group = new THREE.Group()
      group.quaternion.setFromRotationMatrix(basis)

      const texture = faceTexture(face.name)
      this.disposables.push(texture)
      const labelMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true })
      this.disposables.push(labelMaterial)
      const label = new THREE.Mesh(new THREE.PlaneGeometry(2 * HALF, 2 * HALF), labelMaterial)
      label.position.set(0, 0, HALF)
      group.add(label)
      this.disposables.push(label.geometry)

      const cellGeometry = new THREE.PlaneGeometry(cellSize * 1.02, cellSize * 1.02)
      this.disposables.push(cellGeometry)
      for (let i = 0; i < CELLS; i++) {
        for (let j = 0; j < CELLS; j++) {
          const cell = new THREE.Mesh(cellGeometry, this.hiddenMaterial)
          cell.position.set((i - 1) * cellSize, (j - 1) * cellSize, HALF + 0.004)
          const dir = face.normal.clone()
            .addScaledVector(right, i - 1)
            .addScaledVector(face.up, j - 1)
          const zone = zoneName(dir)
          cell.userData.zone = zone
          group.add(cell)
          this.cells.push(cell)
          const bucket = this.zoneCells.get(zone)
          if (bucket === undefined) this.zoneCells.set(zone, [cell])
          else bucket.push(cell)
        }
      }
      this.root.add(group)
    }
  }

  private setHover(zone: string | null): void {
    if (zone === this.hovered) return
    for (const cell of this.hovered === null ? [] : this.zoneCells.get(this.hovered) ?? []) {
      cell.material = this.hiddenMaterial
    }
    this.hovered = zone
    for (const cell of zone === null ? [] : this.zoneCells.get(zone) ?? []) {
      cell.material = this.highlightMaterial
    }
    this.caption.textContent = zone
    this.caption.style.opacity = zone === null ? '0' : '1'
  }

  /** Camera placement for a zone: current radius, zone direction from target. */
  private animateTo(target: THREE.Vector3): void {
    const camera = this.camera
    const controls = this.controls
    const radius = camera.position.distanceTo(controls.target)
    const from = camera.position.clone().sub(controls.target).normalize()
    const to = target.clone().normalize()
    if (from.dot(to) > 0.9999) return

    const full = new THREE.Quaternion().setFromUnitVectors(from, to)
    const identity = new THREE.Quaternion()
    controls.enabled = false
    cancelAnimationFrame(this.tweenId)
    const start = performance.now()
    const step = (): void => {
      if (this.disposed) return
      const t = Math.min(1, (performance.now() - start) / TWEEN_MS)
      const eased = 1 - Math.pow(1 - t, 3)
      const spin = new THREE.Quaternion().slerpQuaternions(identity, full, eased)
      camera.position.copy(from).applyQuaternion(spin).multiplyScalar(radius).add(controls.target)
      camera.lookAt(controls.target)
      if (t < 1) this.tweenId = requestAnimationFrame(step)
      else {
        controls.enabled = true
        controls.update()
      }
    }
    this.tweenId = requestAnimationFrame(step)
  }

  /** Per-frame: mirror the main camera orientation and repaint. */
  update(): void {
    if (this.disposed) return
    this.root.quaternion.copy(this.camera.quaternion).invert()
    this.renderer.render(this.root.parent!, this.overlayCamera)
  }

  dispose(): void {
    if (this.disposed) return
    this.disposed = true
    cancelAnimationFrame(this.tweenId)
    this.controls.enabled = true
    for (const disposable of this.disposables) disposable.dispose()
    this.renderer.dispose()
    this.overlay.remove()
  }
}

/** World direction for a zone name like "TOP-FRONT-RIGHT" (null if unknown). */
export function zoneDirection(zone: string): THREE.Vector3 | null {
  const parts = zone.split('-')
  const dir = new THREE.Vector3()
  let matched = 0
  for (const [name, axis] of AXIS_NAMES) {
    if (parts.includes(name)) {
      dir.add(axis)
      matched++
    }
  }
  if (matched === 0 || dir.lengthSq() === 0) return null
  return dir.normalize()
}
