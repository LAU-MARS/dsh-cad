/**
 * .dcprt converter: parse the native part document, replay its feature
 * history on the OCCT worker, and tessellate the rebuilt bodies into
 * indexed CadMeshes.
 *
 * Replay runs on the SHARED worker (via runModelOp): the opencascade.js WASM
 * heap is too large for a second concurrent instance. Every replay posts a
 * `reset`, which bumps the client's reset epoch — the live modeling session
 * detects the stale epoch and re-replays its own document before the next
 * modeling op, so out-of-band replays cannot corrupt the session.
 */
import type { CadMesh } from '../types.js'
import { encodeF32B64, encodeU32B64 } from '../b64.js'
import { runModelOp } from '../modeling/client.js'
import { isDcPrtDocument } from '../feature_script/dc_prt.js'

/** Convert a .dcprt buffer to indexed CadMeshes by replaying its features. */
export async function parseDcprt(buffer: Buffer, fallbackName: string, timeoutMs = 180_000): Promise<CadMesh[]> {
  let doc: unknown
  try {
    doc = JSON.parse(buffer.toString('utf8'))
  } catch (error) {
    throw new Error(`the DCPRT file is not valid JSON: ${(error as Error).message}`)
  }
  if (!isDcPrtDocument(doc)) {
    throw new Error('not a DCPRT part document (missing dcprt header or features)')
  }

  await runModelOp({ kind: 'reset' }, timeoutMs)
  for (const [index, feature] of doc.features.entries()) {
    try {
      await runModelOp(feature, timeoutMs)
    } catch (error) {
      throw new Error(`DCPRT replay failed at feature ${index} (${feature.kind}): ${(error as Error).message}`)
    }
  }
  const tessellated = await runModelOp({ kind: 'tessellate_all' }, timeoutMs)
  if (tessellated.meshes === undefined || tessellated.meshes.length === 0) {
    throw new Error('the DCPRT document replays to no bodies')
  }
  const names = new Map(doc.bodies.map((body) => [body.bodyId, body.name]))
  return tessellated.meshes.map((mesh, index) => ({
    name: names.get(mesh.bodyId) ?? mesh.name ?? `${fallbackName} #${index + 1}`,
    positions: encodeF32B64(mesh.positions),
    normals: mesh.normals === undefined ? undefined : encodeF32B64(mesh.normals),
    indices: encodeU32B64(mesh.indices),
    vertexCount: mesh.positions.length / 3,
    triangleCount: mesh.indices.length / 3,
  }))
}
