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
import type { CadScene3D, CadMesh } from './scene-types.js'

export interface Viewer3DHandle {
  setWireframe(enabled: boolean): void
  resetView(): void
  dispose(): void
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
      const sprite = child as THREE.Sprite
      if (sprite.isSprite) {
        sprite.material.map?.dispose()
        sprite.material.dispose()
      }
    })
  }
}

/** Build one Three.js mesh; positions/normals/indices may be base64 or
 *  already-decoded typed arrays (the binary transport path). */
function buildMesh(mesh: CadMesh | { name: string; color?: number; positions: Float32Array; normals?: Float32Array; indices: Uint32Array }): THREE.Mesh {
  const geometry = new THREE.BufferGeometry()
  const positions = typeof mesh.positions === 'string' ? decodeF32(mesh.positions) : mesh.positions
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  if (mesh.normals !== undefined) {
    const normals = typeof mesh.normals === 'string' ? decodeF32(mesh.normals) : mesh.normals
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3))
  } else {
    geometry.computeVertexNormals()
  }
  const indices = typeof mesh.indices === 'string' ? decodeU32(mesh.indices) : mesh.indices
  geometry.setIndex(new THREE.BufferAttribute(indices, 1))
  const color = mesh.color === undefined ? 0x9fb4c7 : mesh.color
  const material = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.15,
    roughness: 0.55,
    flatShading: mesh.normals === undefined,
    side: THREE.DoubleSide,
  })
  return new THREE.Mesh(geometry, material)
}

/** Mount an always-on empty CAD viewport: grid + labeled XYZ triad, slowly rotating. */
export function mountEmptyViewer3D(container: HTMLElement): Viewer3DHandle {
  const shell = mountShell(container, { autoRotate: true })
  const scene = new THREE.Scene()
  const scale = 40 // mm-scale reference frame until geometry arrives
  const furniture = addSceneFurniture(scene, scale)

  const place = (): void => {
    const distance = scale * 2.4
    shell.camera.position.set(distance * 0.6, distance * 0.5, distance * 0.55)
    shell.controls.target.set(0, 0, 0)
    shell.controls.update()
  }
  place()

  const frame = (): void => {
    animationId = requestAnimationFrame(frame)
    shell.controls.update()
    shell.renderer.render(scene, shell.camera)
  }
  let animationId = requestAnimationFrame(frame)

  return {
    setWireframe(): void {
      // No model to switch.
    },
    resetView: place,
    dispose(): void {
      cancelAnimationFrame(animationId)
      disposeObjects(furniture)
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

  const frame = (): void => {
    animationId = requestAnimationFrame(frame)
    shell.controls.update()
    shell.renderer.render(threeScene, shell.camera)
  }
  let animationId = requestAnimationFrame(frame)

  return {
    setWireframe(enabled: boolean): void {
      cad.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
          material.wireframe = enabled
        }
      })
    },
    resetView: placeCamera,
    dispose(): void {
      cancelAnimationFrame(animationId)
      disposeObjects([cad, ...furniture, hemisphere, key, fill])
      shell.dispose()
    },
  }
}
