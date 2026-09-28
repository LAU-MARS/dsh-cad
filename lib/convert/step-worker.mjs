/**
 * occt-import-js worker: parses STEP/IGES/BREP in a worker thread so the
 * WASM tessellation never blocks the agent's event loop. Plain JavaScript —
 * this file is copied verbatim into lib/ by the build.
 */
import { createRequire } from 'node:module'
import { parentPort } from 'node:worker_threads'

const require = createRequire(import.meta.url)

async function main() {
  if (parentPort === null) return
  const occtimportjs = require('occt-import-js')
  const occt = await occtimportjs()

  parentPort.on('message', (request) => {
    try {
      const bytes = new Uint8Array(request.buffer)
      const result =
        request.format === 'step' ? occt.ReadStepFile(bytes, null)
        : request.format === 'iges' ? occt.ReadIgesFile(bytes, null)
        : occt.ReadBrepFile(bytes, null)
      if (!result.success || result.meshes === undefined || result.meshes.length === 0) {
        parentPort.postMessage({ jobId: request.jobId, ok: false, error: `the ${request.format.toUpperCase()} file parsed but contains no tessellatable geometry` })
        return
      }
      const transfers = []
      const meshes = result.meshes.map((mesh) => {
        const positionArray = mesh.attributes?.position?.array
        if (positionArray === undefined || positionArray.length < 9) return null
        const positions = Float32Array.from(positionArray)
        const normalSource = mesh.attributes?.normal?.array
        const normals = normalSource !== undefined && normalSource.length === positions.length ? Float32Array.from(normalSource) : null
        const indexSource = mesh.index?.array
        const indices = indexSource !== undefined && indexSource.length > 0
          ? Uint32Array.from(indexSource)
          : Uint32Array.from({ length: positions.length / 3 }, (_, i) => i)
        transfers.push(positions.buffer, indices.buffer)
        if (normals !== null) transfers.push(normals.buffer)
        const color = mesh.color
        return {
          name: mesh.name && mesh.name !== '' ? mesh.name : 'part',
          positions,
          normals: normals === null ? undefined : normals,
          indices,
          color: color === undefined ? undefined
            : (Math.round(color[0] * 255) << 16) | (Math.round(color[1] * 255) << 8) | Math.round(color[2] * 255),
        }
      }).filter((mesh) => mesh !== null)
      if (meshes.length === 0) {
        parentPort.postMessage({ jobId: request.jobId, ok: false, error: `the ${request.format.toUpperCase()} file contains no meshes with geometry` })
        return
      }
      parentPort.postMessage({ jobId: request.jobId, ok: true, meshes }, transfers)
    } catch (error) {
      parentPort.postMessage({ jobId: request.jobId, ok: false, error: error instanceof Error ? error.message : String(error) })
    }
  })
}

void main()
