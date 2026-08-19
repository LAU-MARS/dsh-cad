/**
 * Shared CAD scene model: the normalized JSON the host produces from a CAD
 * file and the browser card renders. Binary payloads (positions, normals,
 * indices) are base64-encoded typed arrays to keep large meshes transportable.
 */

/** 3D axis-aligned bounds. */
export interface CadBounds3 {
  min: { x: number; y: number; z: number }
  max: { x: number; y: number; z: number }
}

/** 2D axis-aligned bounds. */
export interface CadBounds2 {
  min: { x: number; y: number }
  max: { x: number; y: number }
}

/** One tessellated solid, ready for WebGL. */
export interface CadMesh {
  /** Human-readable part name (STEP product name, OBJ group, file stem, …). */
  name: string
  /** base64 Float32Array of xyz vertex triplets. */
  positions: string
  /** base64 Float32Array of xyz normal triplets, parallel to positions. */
  normals?: string
  /** base64 Uint32Array of triangle vertex indices. */
  indices: string
  /** Vertex count (one entry per xyz triplet). */
  vertexCount: number
  /** Triangle count. */
  triangleCount: number
  /** Optional 0xRRGGBB part color. */
  color?: number
}

/** A tessellated 3D scene. */
export interface CadScene3D {
  kind: '3d'
  /** Source format: stl | obj | step | iges | brep. */
  format: string
  meshes: CadMesh[]
  bounds: CadBounds3
  /** Source units (STEP carries them; mesh formats are unitless → assumed mm). */
  units: 'mm' | 'm' | 'in' | 'unitless'
}

/** 2D drawing entity, the lossless subset the 2D viewport renders. */
export type CadEntity2D =
  | { type: 'line'; x1: number; y1: number; x2: number; y2: number; layer?: string; color?: number }
  | { type: 'circle'; cx: number; cy: number; r: number; layer?: string; color?: number }
  | { type: 'arc'; cx: number; cy: number; r: number; startAngle: number; endAngle: number; layer?: string; color?: number }
  | { type: 'polyline'; points: number[]; closed: boolean; layer?: string; color?: number }
  | { type: 'text'; x: number; y: number; text: string; height: number; rotation?: number; layer?: string; color?: number }

/** A 2D drawing. */
export interface CadDrawing2D {
  kind: '2d'
  /** Source format: dxf | svg. */
  format: string
  entities: CadEntity2D[]
  bounds: CadBounds2
  layers: string[]
  /** Raw SVG source when format === 'svg' (rendered verbatim in a sandboxed img). */
  svgText?: string
}

/** The union a `cad_view` scene payload carries. */
export type CadScene = CadScene3D | CadDrawing2D

/** Presentation metadata projected through the tool's `output.presentationMeta`. */
export interface CadViewMeta {
  viewId: string
  kind: '3d' | '2d'
  format: string
  file: string
  /** Same-origin URL serving the scene JSON (absent without a web composition). */
  sceneUrl?: string
  title: string
  stats: {
    meshes?: number
    triangles?: number
    entities?: number
    layers?: number
    boundsMin?: [number, number, number] | [number, number]
    boundsMax?: [number, number, number] | [number, number]
    units?: string
  }
}

/** Geometric summary shared by cad_view and cad_info. */
export interface CadStats {
  format: string
  meshes?: number
  triangles?: number
  entities?: number
  layers?: string[]
  boundsMin?: [number, number, number] | [number, number]
  boundsMax?: [number, number, number] | [number, number]
  units?: string
}

/** Flatten a converted scene into the model/card-facing summary. */
export function sceneStats(scene: CadScene): CadStats {
  if (scene.kind === '3d') {
    return {
      format: scene.format,
      meshes: scene.meshes.length,
      triangles: scene.meshes.reduce((sum, mesh) => sum + mesh.triangleCount, 0),
      boundsMin: [scene.bounds.min.x, scene.bounds.min.y, scene.bounds.min.z],
      boundsMax: [scene.bounds.max.x, scene.bounds.max.y, scene.bounds.max.z],
      units: scene.units,
    }
  }
  return {
    format: scene.format,
    entities: scene.entities.length,
    layers: scene.layers,
    boundsMin: [scene.bounds.min.x, scene.bounds.min.y],
    boundsMax: [scene.bounds.max.x, scene.bounds.max.y],
  }
}
