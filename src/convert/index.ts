/**
 * File buffer → CadScene: format dispatch, bounds computation, unit handling.
 */
import type { CadScene, CadScene3D, CadMesh } from '../types.js'
import type { CadFormat } from './detect.js'
import { parseSTL } from './stl.js'
import { parseOBJ } from './obj.js'
import { parseDXF } from './dxf.js'
import { parseSVG } from './svg.js'
import { parseOcct } from './step.js'
import { parseDcprt } from './dcprt.js'

function meshBounds(meshes: CadMesh[]): CadScene3D['bounds'] {
  let minX = Infinity
  let minY = Infinity
  let minZ = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  let maxZ = -Infinity
  // Decode each mesh's base64 positions once and scan the xyz triplets.
  for (const mesh of meshes) {
    const positions = Buffer.from(mesh.positions, 'base64')
    for (let offset = 0; offset + 12 <= positions.length; offset += 12) {
      const x = positions.readFloatLE(offset)
      const y = positions.readFloatLE(offset + 4)
      const z = positions.readFloatLE(offset + 8)
      if (x < minX) minX = x
      if (y < minY) minY = y
      if (z < minZ) minZ = z
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
      if (z > maxZ) maxZ = z
    }
  }
  return { min: { x: minX, y: minY, z: minZ }, max: { x: maxX, y: maxY, z: maxZ } }
}

/** Scan a set of CadMeshes for their axis-aligned bounds. */
export function computeMeshBounds(meshes: CadMesh[]): CadScene3D['bounds'] {
  return meshBounds(meshes)
}

/** Convert a supported CAD file buffer into a renderable scene. */
export async function convert(buffer: Buffer, format: CadFormat, fileName: string): Promise<CadScene> {
  const stem = fileName.replace(/\.[^.]+$/, '')
  switch (format) {
    case 'stl': {
      const meshes = [parseSTL(buffer, stem)]
      return { kind: '3d', format, meshes, bounds: meshBounds(meshes), units: 'unitless' }
    }
    case 'obj': {
      const meshes = parseOBJ(buffer.toString('utf8'), stem)
      if (meshes.length === 0) throw new Error('the OBJ file contains no faces')
      return { kind: '3d', format, meshes, bounds: meshBounds(meshes), units: 'unitless' }
    }
    case 'step':
    case 'iges':
    case 'brep': {
      const meshes = await parseOcct(buffer, format, stem)
      return { kind: '3d', format, meshes, bounds: meshBounds(meshes), units: 'mm' }
    }
    case 'dcprt': {
      const meshes = await parseDcprt(buffer, stem)
      return { kind: '3d', format, meshes, bounds: meshBounds(meshes), units: 'mm' }
    }
    case 'dxf':
      return parseDXF(buffer.toString('utf8'))
    case 'svg':
      return parseSVG(buffer.toString('utf8'))
  }
}
