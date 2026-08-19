/**
 * Minimal OBJ parser (v / vn / f with polygon triangulation, o / g groups).
 * Ignores materials, curves, and other entities the viewer cannot show.
 */
import type { CadMesh } from '../types.js'
import { encodeF32B64, encodeU32B64 } from '../b64.js'

interface ObjGroup {
  name: string
  /** Flat faces: each face is an array of vertex indices (0-based, v/vn/vi resolved). */
  faces: { vertices: number[]; normalVertices: number[] }[]
}

interface ObjModel {
  positions: number[]
  normals: number[]
  groups: ObjGroup[]
}

function parseObj(text: string): ObjModel {
  const model: ObjModel = { positions: [], normals: [], groups: [{ name: '', faces: [] }] }
  let currentGroup = model.groups[0]!
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (line === '' || line.startsWith('#')) continue
    const space = line.indexOf(' ')
    if (space < 0) continue
    const keyword = line.slice(0, space)
    const rest = line.slice(space + 1).trim()
    if (keyword === 'v') {
      const parts = rest.split(/\s+/)
      model.positions.push(Number(parts[0]), Number(parts[1]), Number(parts[2]))
    } else if (keyword === 'vn') {
      const parts = rest.split(/\s+/)
      model.normals.push(Number(parts[0]), Number(parts[1]), Number(parts[2]))
    } else if (keyword === 'o' || keyword === 'g') {
      const name = rest.split(/\s+/)[0] ?? ''
      currentGroup = { name, faces: [] }
      model.groups.push(currentGroup)
    } else if (keyword === 'f') {
      const vertices: number[] = []
      const normalVertices: number[] = []
      for (const token of rest.split(/\s+/)) {
        if (token === '') continue
        // Forms: v, v/vt, v//vn, v/vt/vn
        const segments = token.split('/')
        const vertexIndex = Number(segments[0])
        if (!Number.isFinite(vertexIndex) || vertexIndex === 0) continue
        // OBJ indices are 1-based; negatives count back from the end.
        const resolved = vertexIndex > 0 ? vertexIndex - 1 : model.positions.length / 3 + vertexIndex
        vertices.push(resolved)
        const normalToken = segments[2]
        if (normalToken !== undefined && normalToken !== '') {
          const normalIndex = Number(normalToken)
          const resolvedNormal = normalIndex > 0 ? normalIndex - 1 : model.normals.length / 3 + normalIndex
          normalVertices.push(resolvedNormal)
        }
      }
      if (vertices.length >= 3) currentGroup.faces.push({ vertices, normalVertices })
    }
  }
  return model
}

/** Fan-triangulate one face loop. */
function fanTriangles(loop: number[]): [number, number, number][] {
  const triangles: [number, number, number][] = []
  for (let i = 1; i < loop.length - 1; i++) {
    triangles.push([loop[0]!, loop[i]!, loop[i + 1]!])
  }
  return triangles
}

/** Convert OBJ text into CadMeshes (one per non-empty group). */
export function parseOBJ(text: string, fallbackName: string): CadMesh[] {
  const model = parseObj(text)
  const meshes: CadMesh[] = []
  for (const group of model.groups) {
    if (group.faces.length === 0) continue
    const positions: number[] = []
    const normals: number[] = []
    const indices: number[] = []
    const vertexMap = new Map<string, number>()
    const hasNormals = group.faces.some((face) => face.normalVertices.length === face.vertices.length)
    for (const face of group.faces) {
      const faceNormals = face.normalVertices.length === face.vertices.length ? face.normalVertices : null
      for (const [a, b, c] of fanTriangles(face.vertices)) {
        for (const vertexIndex of [a, b, c]) {
          const px = model.positions[vertexIndex * 3] ?? 0
          const py = model.positions[vertexIndex * 3 + 1] ?? 0
          const pz = model.positions[vertexIndex * 3 + 2] ?? 0
          const normalIndex = faceNormals?.[vertexIndex]
          const key = normalIndex === undefined ? `${vertexIndex}` : `${vertexIndex}/${normalIndex}`
          let index = vertexMap.get(key)
          if (index === undefined) {
            index = positions.length / 3
            vertexMap.set(key, index)
            positions.push(px, py, pz)
            if (hasNormals) {
              normals.push(
                normalIndex === undefined ? 0 : model.normals[normalIndex * 3] ?? 0,
                normalIndex === undefined ? 0 : model.normals[normalIndex * 3 + 1] ?? 0,
                normalIndex === undefined ? 0 : model.normals[normalIndex * 3 + 2] ?? 0,
              )
            }
          }
          indices.push(index)
        }
      }
    }
    meshes.push({
      name: group.name === '' ? fallbackName : group.name,
      positions: encodeF32B64(Float32Array.from(positions)),
      normals: hasNormals ? encodeF32B64(Float32Array.from(normals)) : undefined,
      indices: encodeU32B64(Uint32Array.from(indices)),
      vertexCount: positions.length / 3,
      triangleCount: indices.length / 3,
    })
  }
  return meshes
}
