/**
 * Minimal STL parser (binary and ASCII) producing indexed triangle meshes.
 * Written by hand so the host side carries no Three.js dependency.
 */
import type { CadMesh } from '../types.js'
import { encodeF32B64, encodeU32B64 } from '../b64.js'

const BINARY_HEADER_SIZE = 80
const BINARY_TRIANGLE_SIZE = 50 // 12 normal + 36 vertices + 2 count

/** Decide binary vs ASCII by the classic solid-prefix heuristic. */
function isAscii(buffer: Buffer): boolean {
  const head = buffer.subarray(0, Math.min(buffer.length, 512)).toString('latin1').trimStart()
  return head.startsWith('solid') && !looksBinary(buffer)
}

function looksBinary(buffer: Buffer): boolean {
  if (buffer.length < BINARY_HEADER_SIZE + 4) return true
  const triangleCount = buffer.readUInt32LE(BINARY_HEADER_SIZE)
  const expected = BINARY_HEADER_SIZE + 4 + triangleCount * BINARY_TRIANGLE_SIZE
  return buffer.length === expected
}

interface IndexedMesh {
  positions: Float32Array
  normals: Float32Array | null
  indices: Uint32Array
}

/** Weld positions by exact float-key to index STL's raw triangle soup. */
function indexTriangleSoup(triangles: Float32Array, triangleCount: number, normals: Float32Array | null): IndexedMesh {
  const vertexMap = new Map<string, number>()
  const positions: number[] = []
  const indices: number[] = []
  const dedupNormals: number[] = []
  for (let triangle = 0; triangle < triangleCount; triangle++) {
    const base = triangle * 9
    for (let corner = 0; corner < 3; corner++) {
      const v = base + corner * 3
      const key = `${triangles[v]!},${triangles[v + 1]!},${triangles[v + 2]!}`
      let index = vertexMap.get(key)
      if (index === undefined) {
        index = positions.length / 3
        vertexMap.set(key, index)
        positions.push(triangles[v]!, triangles[v + 1]!, triangles[v + 2]!)
        if (normals !== null) {
          const n = base - (base % 9) + 0 // normal of this triangle (same for 3 corners)
          dedupNormals.push(normals[n]!, normals[n + 1]!, normals[n + 2]!)
        }
      }
      indices.push(index)
    }
  }
  return {
    positions: Float32Array.from(positions),
    normals: normals === null ? null : Float32Array.from(dedupNormals),
    indices: Uint32Array.from(indices),
  }
}

function parseBinary(buffer: Buffer): IndexedMesh {
  const triangleCount = buffer.readUInt32LE(BINARY_HEADER_SIZE)
  const triangles = new Float32Array(triangleCount * 9)
  const normals = new Float32Array(triangleCount * 3)
  let offset = BINARY_HEADER_SIZE + 4
  for (let triangle = 0; triangle < triangleCount; triangle++) {
    normals[triangle * 3] = buffer.readFloatLE(offset)
    normals[triangle * 3 + 1] = buffer.readFloatLE(offset + 4)
    normals[triangle * 3 + 2] = buffer.readFloatLE(offset + 8)
    offset += 12
    for (let corner = 0; corner < 9; corner++) {
      triangles[triangle * 9 + corner] = buffer.readFloatLE(offset)
      offset += 4
    }
    offset += 2 // attribute byte count
  }
  return indexTriangleSoup(triangles, triangleCount, normals)
}

/** Parse ASCII STL: `vertex x y z` triplets grouped into facet loops. */
function parseAscii(text: string): IndexedMesh {
  const vertices: number[] = []
  const normals: number[] = []
  let currentNormal: [number, number, number] | null = null
  let cornersInFacet = 0
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (trimmed === '') continue
    const lower = trimmed.toLowerCase()
    if (lower.startsWith('facet normal')) {
      const parts = lower.split(/\s+/)
      currentNormal = [Number(parts[2]), Number(parts[3]), Number(parts[4])]
      cornersInFacet = 0
    } else if (lower.startsWith('vertex')) {
      const parts = lower.split(/\s+/)
      vertices.push(Number(parts[1]), Number(parts[2]), Number(parts[3]))
      if (cornersInFacet === 0 && currentNormal !== null) {
        normals.push(currentNormal[0], currentNormal[1], currentNormal[2])
      }
      cornersInFacet++
    } else if (lower.startsWith('endfacet')) {
      // Facets with fewer or more than 3 vertices are malformed; STL requires 3.
      if (cornersInFacet !== 3) throw new Error(`malformed ASCII STL facet: expected 3 vertices, found ${cornersInFacet}`)
    }
  }
  const triangleCount = vertices.length / 9
  if (!Number.isInteger(triangleCount) || triangleCount === 0) throw new Error('malformed ASCII STL: no complete facets')
  return indexTriangleSoup(Float32Array.from(vertices), triangleCount, Float32Array.from(normals))
}

/** Convert an STL buffer into one indexed CadMesh. */
export function parseSTL(buffer: Buffer, name: string): CadMesh {
  const mesh = isAscii(buffer) ? parseAscii(buffer.toString('latin1')) : parseBinary(buffer)
  return {
    name,
    positions: encodeF32B64(mesh.positions),
    normals: mesh.normals === null ? undefined : encodeF32B64(mesh.normals),
    indices: encodeU32B64(mesh.indices),
    vertexCount: mesh.positions.length / 3,
    triangleCount: mesh.indices.length / 3,
  }
}
