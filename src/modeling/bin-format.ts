/**
 * Binary scene format: the direct worker→three.js transport. One packed
 * buffer (JSON header + raw f32/u32 payloads) that the browser decodes with
 * typed-array views — no base64, no JSON number arrays, no intermediate file
 * unless the debounced disk mirror or an explicit cad_export happens.
 *
 * Layout (little-endian):
 *   [4B magic "DCB1"][4B headerByteLength][header JSON utf8][payload bytes]
 * Header: { meshes: [{ name, color?, vertexCount, triangleCount,
 *            posOffset, posBytes, nrmOffset?, nrmBytes, idxOffset, idxBytes }],
 *           bounds: { min: [x,y,z], max: [x,y,z] }, units }
 * Offsets/lengths are byte counts relative to the payload start.
 */

export interface BinMeshDesc {
  name: string
  color?: number
  vertexCount: number
  triangleCount: number
  posOffset: number
  posBytes: number
  nrmOffset?: number
  nrmBytes?: number
  idxOffset: number
  idxBytes: number
}

export interface BinHeader {
  meshes: BinMeshDesc[]
  bounds: { min: [number, number, number]; max: [number, number, number] }
  units: string
}

export interface BinMeshData {
  name: string
  color?: number
  positions: Float32Array
  normals?: Float32Array
  indices: Uint32Array
}

const MAGIC = 0x31424344 // "DCB1" little-endian

/** Pack meshes into the binary transport buffer. */
export function packBinaryScene(meshes: BinMeshData[]): Buffer {
  const header: BinHeader = {
    meshes: [],
    bounds: { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] },
    units: 'mm',
  }
  let payloadBytes = 0
  for (const mesh of meshes) {
    const posBytes = mesh.positions.byteLength
    const nrmBytes = mesh.normals === undefined ? 0 : mesh.normals.byteLength
    const idxBytes = mesh.indices.byteLength
    const desc: BinMeshDesc = {
      name: mesh.name,
      ...(mesh.color === undefined ? {} : { color: mesh.color }),
      vertexCount: mesh.positions.length / 3,
      triangleCount: mesh.indices.length / 3,
      posOffset: payloadBytes,
      posBytes,
      ...(mesh.normals === undefined ? {} : { nrmOffset: payloadBytes + posBytes, nrmBytes }),
      idxOffset: payloadBytes + posBytes + nrmBytes,
      idxBytes,
    }
    header.meshes.push(desc)
    payloadBytes += posBytes + nrmBytes + idxBytes
    for (let i = 0; i < mesh.positions.length; i += 3) {
      const x = mesh.positions[i] ?? 0
      const y = mesh.positions[i + 1] ?? 0
      const z = mesh.positions[i + 2] ?? 0
      if (x < header.bounds.min[0]) header.bounds.min[0] = x
      if (y < header.bounds.min[1]) header.bounds.min[1] = y
      if (z < header.bounds.min[2]) header.bounds.min[2] = z
      if (x > header.bounds.max[0]) header.bounds.max[0] = x
      if (y > header.bounds.max[1]) header.bounds.max[1] = y
      if (z > header.bounds.max[2]) header.bounds.max[2] = z
    }
  }
  if (!Number.isFinite(header.bounds.min[0])) {
    header.bounds = { min: [0, 0, 0], max: [1, 1, 1] }
  }

  const headerBuffer = Buffer.from(JSON.stringify(header), 'utf8')
  // Pad the header so the payload starts 8-byte aligned (typed-array views).
  const paddedHeaderLength = Math.ceil(headerBuffer.length / 8) * 8
  const out = Buffer.alloc(8 + paddedHeaderLength + payloadBytes)
  out.writeUInt32LE(MAGIC, 0)
  out.writeUInt32LE(paddedHeaderLength, 4)
  headerBuffer.copy(out, 8)
  let cursor = 8 + paddedHeaderLength
  for (const mesh of meshes) {
    Buffer.from(mesh.positions.buffer, mesh.positions.byteOffset, mesh.positions.byteLength).copy(out, cursor)
    cursor += mesh.positions.byteLength
    if (mesh.normals !== undefined) {
      Buffer.from(mesh.normals.buffer, mesh.normals.byteOffset, mesh.normals.byteLength).copy(out, cursor)
      cursor += mesh.normals.byteLength
    }
    Buffer.from(mesh.indices.buffer, mesh.indices.byteOffset, mesh.indices.byteLength).copy(out, cursor)
    cursor += mesh.indices.byteLength
  }
  return out
}
