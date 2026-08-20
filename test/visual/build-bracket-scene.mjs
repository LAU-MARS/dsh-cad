/**
 * Build the L-bracket preview scene (profile extrusion + through holes +
 * all-edge fillet) via the real worker, saved for the visual-check page and
 * the README screenshot.
 *
 * Bracket: L-profile 100×70 legs, 10 thick, 50 wide (Z). Two ⌀9 holes
 * through the base leg (axis +Y) and one ⌀12 mounting hole through the wall
 * (axis +X), all edges filleted R2.
 */
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { runModelOp } from '../../lib/modeling/client.js'
import { encodeF32B64, encodeU32B64 } from '../../lib/b64.js'

await runModelOp({ kind: 'reset' })
// L profile in XY (CCW): base leg x[0..100] y[0..10], wall x[0..10] y[0..70]
const points = [0, 0, 100, 0, 100, 10, 10, 10, 10, 70, 0, 70]
await runModelOp({ kind: 'extrude_profile', bodyId: 'bracket', points, height: 50, name: 'bracket' })
await runModelOp({ kind: 'create_prim', bodyId: 'h1', prim: 'cylinder', params: { radius: 4.5, height: 40, at: [25, -10, 25], axis: [0, 1, 0] } })
await runModelOp({ kind: 'create_prim', bodyId: 'h2', prim: 'cylinder', params: { radius: 4.5, height: 40, at: [75, -10, 25], axis: [0, 1, 0] } })
await runModelOp({ kind: 'create_prim', bodyId: 'h3', prim: 'cylinder', params: { radius: 6, height: 40, at: [-10, 45, 25], axis: [1, 0, 0] } })
await runModelOp({ kind: 'boolean', op: 'cut', target: 'bracket', tools: ['h1', 'h2', 'h3'] })
await runModelOp({ kind: 'fillet', target: 'bracket', radius: 2 })
const { volume } = await runModelOp({ kind: 'volume', target: 'bracket' })
const all = await runModelOp({ kind: 'tessellate_all' })

const meshes = all.meshes.map((mesh) => ({
  name: mesh.name,
  positions: encodeF32B64(mesh.positions),
  normals: encodeF32B64(mesh.normals),
  indices: encodeU32B64(mesh.indices),
  vertexCount: mesh.vertexCount,
  triangleCount: mesh.triangleCount,
}))
const scene = {
  kind: '3d',
  format: 'model',
  meshes,
  bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: 100, y: 70, z: 50 } },
  units: 'mm',
}
const json = JSON.stringify(scene)
await writeFile(path.join('test', 'visual', 'scene-3d-model.json'), json)
// same geometry for the resident 3D tab mock
await writeFile(path.join('test', 'visual', 'scene-3d-snowman.json'), json)
const triangles = meshes.reduce((s, m) => s + m.triangleCount, 0)
console.log(`bracket scene written: ${meshes.length} body, ${triangles} triangles, volume ${volume.toFixed(2)} mm³`)
process.exit(0)
