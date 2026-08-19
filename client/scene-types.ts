/**
 * Client-side scene type mirrors (src/types.ts), duplicated so the browser
 * bundle never imports host code.
 */
export interface CadBounds3 {
  min: { x: number; y: number; z: number }
  max: { x: number; y: number; z: number }
}

export interface CadMesh {
  name: string
  positions: string
  normals?: string
  indices: string
  vertexCount: number
  triangleCount: number
  color?: number
}

export interface CadScene3D {
  kind: '3d'
  format: string
  meshes: CadMesh[]
  bounds: CadBounds3
  units: string
}

export type CadEntity2D =
  | { type: 'line'; x1: number; y1: number; x2: number; y2: number; layer?: string; color?: number }
  | { type: 'circle'; cx: number; cy: number; r: number; layer?: string; color?: number }
  | { type: 'arc'; cx: number; cy: number; r: number; startAngle: number; endAngle: number; layer?: string; color?: number }
  | { type: 'polyline'; points: number[]; closed: boolean; layer?: string; color?: number }
  | { type: 'text'; x: number; y: number; text: string; height: number; rotation?: number; layer?: string; color?: number }

export interface CadDrawing2D {
  kind: '2d'
  format: string
  entities: CadEntity2D[]
  bounds: { min: { x: number; y: number }; max: { x: number; y: number } }
  layers: string[]
  svgText?: string
}

export type CadScene = CadScene3D | CadDrawing2D

export interface CadViewMeta {
  viewId: string
  kind: '3d' | '2d'
  format: string
  file: string
  sceneUrl?: string
  title: string
  stats: {
    meshes?: number
    triangles?: number
    entities?: number
    layers?: number
  }
}
