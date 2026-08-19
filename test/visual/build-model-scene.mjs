/**
 * Build a modeling-document scene (plate + hole, filleted) via the real
 * worker, saved for the visual-check page.
 */
import { writeFile } from 'node:fs/promises'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { runModelOp } from '../../lib/modeling/client.js'
import { encodeF32B64, encodeU32B64 } from '../../lib/b64.js'

await runModelOp({ kind: 'reset' })
await runModelOp({ kind: 'create_prim', bodyId: 'plate', prim: 'box', params: { dx: 100, dy: 60, dz: 5 }, name: 'plate' })
await runModelOp({ kind: 'create_prim', bodyId: 'hole', prim: 'cylinder', params: { radius: 10, height: 20, at: [50, 30, 0] } })
const cut = await runModelOp({ kind: 'boolean', op: 'cut', target: 'plate', tools: ['hole'] })
await runModelOp({ kind: 'fillet', target: 'plate', radius: 2 })
await runModelOp({ kind: 'create_prim', bodyId: 'boss', prim: 'cylinder', params: { radius: 8, height: 25, at: [20, 15, 5] }, name: 'boss' })
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
  bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: 100, y: 60, z: 25 } },
  units: 'mm',
}
await writeFile(path.join('test', 'visual', 'scene-3d-model.json'), JSON.stringify(scene))
console.log('model scene written:', meshes.length, 'bodies,', meshes.reduce((s, m) => s + m.triangleCount, 0), 'triangles')
process.exit(0)
