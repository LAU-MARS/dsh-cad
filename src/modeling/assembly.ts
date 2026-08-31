/**
 * Assembly composition (main thread): instances reference body meshes by id
 * and place them with translate + XYZ-Euler rotate (degrees, the same
 * "translate → rotate" convention as cad_transform / the worker's
 * BRepBuilderAPI_Transform path: p' = T + Rx·(Ry·(Rz·p))). Composition is
 * pure typed-array math on the already-tessellated body meshes — no worker
 * round-trip, no re-tessellation.
 */
import type { BinMeshData } from './bin-format.js'
import type { AssemblyInstance } from './client.js'

function rotationMatrix(rotate: [number, number, number]): Float64Array {
  const toRad = (deg: number): number => (deg * Math.PI) / 180
  const [rx, ry, rz] = rotate.map(toRad) as [number, number, number]
  const cx = Math.cos(rx), sx = Math.sin(rx)
  const cy = Math.cos(ry), sy = Math.sin(ry)
  const cz = Math.cos(rz), sz = Math.sin(rz)
  // Row-major 3×3: Rx·Ry·Rz
  return new Float64Array([
    cy * cz, -cy * sz, sy,
    cx * sz + sx * sy * cz, cx * cz - sx * sy * sz, -sx * cy,
    sx * sz - cx * sy * cz, sx * cz + cx * sy * sz, cx * cy,
  ])
}

function transformMesh(mesh: BinMeshData, translate: [number, number, number], rotate: [number, number, number]): BinMeshData {
  const isIdentity =
    translate.every((v) => v === 0) && rotate.every((v) => v === 0)
  if (isIdentity) return mesh
  const m = rotationMatrix(rotate)
  const [tx, ty, tz] = translate
  const positions = new Float32Array(mesh.positions.length)
  for (let i = 0; i + 2 < mesh.positions.length; i += 3) {
    const x = mesh.positions[i]!
    const y = mesh.positions[i + 1]!
    const z = mesh.positions[i + 2]!
    positions[i] = m[0]! * x + m[1]! * y + m[2]! * z + tx
    positions[i + 1] = m[3]! * x + m[4]! * y + m[5]! * z + ty
    positions[i + 2] = m[6]! * x + m[7]! * y + m[8]! * z + tz
  }
  // Normals rotate with the same linear part (translation never applies).
  let normals: Float32Array | undefined
  if (mesh.normals !== undefined) {
    normals = new Float32Array(mesh.normals.length)
    for (let i = 0; i + 2 < mesh.normals.length; i += 3) {
      const x = mesh.normals[i]!
      const y = mesh.normals[i + 1]!
      const z = mesh.normals[i + 2]!
      normals[i] = m[0]! * x + m[1]! * y + m[2]! * z
      normals[i + 1] = m[3]! * x + m[4]! * y + m[5]! * z
      normals[i + 2] = m[6]! * x + m[7]! * y + m[8]! * z
    }
  }
  return { ...mesh, positions, normals }
}

/**
 * Compose the assembly scene: one transformed mesh copy per instance.
 * Instances referencing bodies missing from `bodies` (consumed by a later
 * boolean) are skipped — the worker's live list already filters them, this is
 * the replay-side double guard. Duplicate names get a ·N suffix.
 */
export function composeAssemblyMeshes(
  bodies: Map<string, BinMeshData>,
  instances: AssemblyInstance[],
): BinMeshData[] {
  const meshes: BinMeshData[] = []
  const nameUse = new Map<string, number>()
  for (const instance of instances) {
    const body = bodies.get(instance.bodyId)
    if (body === undefined) continue
    const seen = nameUse.get(instance.name) ?? 0
    nameUse.set(instance.name, seen + 1)
    const name = seen === 0 ? instance.name : `${instance.name}·${seen + 1}`
    meshes.push(transformMesh({ ...body, name }, instance.translate, instance.rotate))
  }
  return meshes
}
