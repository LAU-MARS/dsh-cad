/**
 * dsh-cad engineering drawing document (`.dceng`) — a 2D sheet referencing 3D
 * models through projected views, plus dimensions. Views are projections of
 * referenced parts/bodies, so the drawing stays in sync with the geometry.
 *
 * Default sheet is A4 landscape (297 × 210 mm), matching the DXF/SVG 2D
 * pipeline's true-drawing-units convention.
 */
export const DC_ENG_FORMAT = 'dceng' as const
export const DC_ENG_EXTENSION = '.dceng'

export const DC_ENG_SHEET_A4: DcEngSheet = { width: 297, height: 210 }

export interface DcEngHeader {
  format: typeof DC_ENG_FORMAT
  version: 1
  units: 'mm'
}

export interface DcEngSheet {
  width: number
  height: number
}

export type DcEngProjection = 'front' | 'top' | 'right' | 'iso'

export type DcEngSource =
  | { kind: 'body'; bodyId: string }
  | { kind: 'prt'; path: string }

export interface DcEngView {
  viewId: string
  projection: DcEngProjection
  source: DcEngSource
  /** Sheet-space placement of the view origin. */
  at: [number, number]
  scale: number
}

export type DcEngDimensionKind = 'linear' | 'diameter' | 'radius' | 'angle'

export interface DcEngDimension {
  dimensionId: string
  kind: DcEngDimensionKind
  /** Sheet-space anchor points; the value is derived unless overridden. */
  from: [number, number]
  to?: [number, number]
  /** Explicit override for derived dimensions. */
  value?: number
}

export interface DcEngDocument {
  header: DcEngHeader
  sheet: DcEngSheet
  /** Sheet-wide default scale (1:2 = 0.5); views may override. */
  scale: number
  views: DcEngView[]
  dimensions: DcEngDimension[]
}

export function isDcEngDocument(value: unknown): value is DcEngDocument {
  if (typeof value !== 'object' || value === null) return false
  const doc = value as Partial<DcEngDocument> & { header?: Partial<DcEngHeader> }
  return (
    doc.header?.format === DC_ENG_FORMAT &&
    typeof doc.sheet === 'object' && doc.sheet !== null &&
    Array.isArray(doc.views)
  )
}
