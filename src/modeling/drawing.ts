/**
 * Engineering-drawing sheet assembly (main thread, pure geometry — unit
 * tested). Takes projected hidden-line views (from the modeling worker's mesh
 * HLR) and lays them out on a GB-flavoured first-angle sheet: 主视图 front,
 * 左视图 right of front, 俯视图 below front, 轴测 in the free corner; frame,
 * title block, overall-dimension annotations, and a uniform standard scale
 * for the three standard views.
 *
 * Output is the plain 2D entity subset the client viewport already renders
 * (polylines + text, layer-classified), plus SVG/DXF serializations for
 * cad_export.
 */
import type { CadBounds2, CadEntity2D } from '../types.js'
import type { DrawingView } from './client.js'

export type PaperSize = 'A4' | 'A3'

/** Landscape paper in mm. */
const PAPER: Record<PaperSize, { width: number; height: number }> = {
  A4: { width: 297, height: 210 },
  A3: { width: 420, height: 297 },
}

const FRAME = 10 // inner frame inset from the paper edge
const GAP = 22 // breathing room between views
const TITLE_BLOCK = { width: 130, height: 28 }

/** GB-preferred scale series (values < 1 reduce, > 1 enlarge). */
const SCALE_SERIES = [5, 2, 1, 0.5, 0.4, 0.25, 0.2, 0.1, 0.05, 0.02, 0.01]

export interface DrawingSheetInput {
  partName: string
  views: DrawingView[]
  paper?: PaperSize
  drawingNo?: string
  date?: string
}

export interface DrawingSheet {
  entities: CadEntity2D[]
  bounds: CadBounds2
  layers: string[]
  width: number
  height: number
  /** Standard scale of the three standard views (iso is fit independently). */
  scale: number
  entityCount: number
}

const COLORS = {
  visible: 0x1a1d21,
  hidden: 0x98a0ab,
  dim: 0x2456a8,
  paper: 0xb6bdc7,
  text: 0x3d434c,
} as const

interface Bounds2 {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

/** (x, y) bounds of a view's projected polylines; null when empty. */
function viewBounds(view: DrawingView): Bounds2 | null {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const polyline of [...view.visible, ...view.hidden]) {
    for (let i = 0; i + 1 < polyline.length; i += 2) {
      if (polyline[i]! < minX) minX = polyline[i]!
      if (polyline[i]! > maxX) maxX = polyline[i]!
      if (polyline[i + 1]! < minY) minY = polyline[i + 1]!
      if (polyline[i + 1]! > maxY) maxY = polyline[i + 1]!
    }
  }
  return Number.isFinite(minX) ? { minX, minY, maxX, maxY } : null
}

function sizeOf(bounds: Bounds2 | null): { w: number; h: number } {
  return bounds === null ? { w: 0, h: 0 } : { w: bounds.maxX - bounds.minX, h: bounds.maxY - bounds.minY }
}

/** Largest GB scale that keeps `size` inside `cell`. */
function fitScale(viewW: number, viewH: number, cellW: number, cellH: number): number {
  if (viewW <= 1e-9 || viewH <= 1e-9) return 1
  const raw = Math.min(cellW / viewW, cellH / viewH)
  for (const scale of SCALE_SERIES) {
    if (scale <= raw) return scale
  }
  return SCALE_SERIES[SCALE_SERIES.length - 1] ?? 0.01
}

/** Scale a view's projected polylines (layout works in paper mm). */
function scaleView(view: DrawingView, s: number): DrawingView {
  if (s === 1) return view
  const scalePoly = (polyline: number[]): number[] => polyline.map((v) => v * s)
  return { name: view.name, visible: view.visible.map(scalePoly), hidden: view.hidden.map(scalePoly) }
}

/** Translation that centers a (scaled) view on (ox, oy). */
function centerTransform(view: DrawingView, ox: number, oy: number): { tx: number; ty: number } {
  const bounds = viewBounds(view)
  if (bounds === null) return { tx: ox, ty: oy }
  return { tx: ox - (bounds.minX + bounds.maxX) / 2, ty: oy - (bounds.minY + bounds.maxY) / 2 }
}

function trim(value: number): string {
  return Number(value.toFixed(1)).toString()
}

function scaleText(scale: number): string {
  return scale >= 1 ? `${trim(scale)}:1` : `1:${trim(1 / scale)}`
}

/**
 * A linear dimension: extension lines from the measure points, a dimension
 * line offset perpendicular by `offset`, arrowhead strokes, and the measured
 * text centered above the dimension line. `normal` is the side the dimension
 * line sits on (unit vector).
 */
function linearDim(
  entities: CadEntity2D[],
  p1: [number, number],
  p2: [number, number],
  normal: [number, number],
  offset: number,
  text: string,
): void {
  const dx = p2[0] - p1[0]
  const dy = p2[1] - p1[1]
  const len = Math.hypot(dx, dy)
  if (len < 1e-9) return
  const ux = dx / len
  const uy = dy / len
  const [nx, ny] = normal
  const a1: [number, number] = [p1[0] + nx * offset, p1[1] + ny * offset]
  const a2: [number, number] = [p2[0] + nx * offset, p2[1] + ny * offset]
  const gap = 1.2
  const over = 2.5
  const extension = (p: [number, number]): void => {
    entities.push({
      type: 'line',
      x1: p[0] + nx * gap, y1: p[1] + ny * gap,
      x2: p[0] + nx * (offset + over), y2: p[1] + ny * (offset + over),
      layer: 'dim', color: COLORS.dim,
    })
  }
  extension(p1)
  extension(p2)
  entities.push({ type: 'line', x1: a1[0], y1: a1[1], x2: a2[0], y2: a2[1], layer: 'dim', color: COLORS.dim })
  // arrowheads: two strokes each, ~30° half angle, 3mm
  for (const [at, sign] of [[a1, 1], [a2, -1]] as const) {
    for (const side of [1, -1]) {
      entities.push({
        type: 'line',
        x1: at[0], y1: at[1],
        x2: at[0] + (ux * 0.87 + -uy * side * 0.5) * 3 * sign,
        y2: at[1] + (uy * 0.87 + ux * side * 0.5) * 3 * sign,
        layer: 'dim', color: COLORS.dim,
      })
    }
  }
  const mid: [number, number] = [(a1[0] + a2[0]) / 2 + nx * 1.6, (a1[1] + a2[1]) / 2 + ny * 1.6]
  let rotation = (Math.atan2(uy, ux) * 180) / Math.PI
  if (rotation > 90 || rotation < -90) rotation += 180
  entities.push({ type: 'text', x: mid[0], y: mid[1], text, height: 3.2, rotation, layer: 'dim', color: COLORS.dim })
}

/** Build the full drawing sheet (frame, title block, views, dimensions). */
export function buildDrawingSheet(input: DrawingSheetInput): DrawingSheet {
  const paper = PAPER[input.paper ?? 'A4']
  const { width, height } = paper
  const byName = new Map(input.views.map((view) => [view.name, view]))
  const front = byName.get('front')
  const top = byName.get('top')
  const left = byName.get('left')
  const iso = byName.get('iso')

  // ── placements (dimensions collected into a side list, appended later) ────
  const placed: Array<{ view: DrawingView; tx: number; ty: number }> = []
  const dimEntities: CadEntity2D[] = []
  let scale = 1

  if (front !== undefined) {
    const regionW = (width - FRAME * 2) * 0.64
    const regionH = height - FRAME * 2
    const cellW = (regionW - GAP) / 2
    const cellH = (regionH - GAP) / 2
    const pad = 20 // room for the dimension annotations inside each cell
    const frontSize = sizeOf(viewBounds(front))
    const leftSize = left !== undefined ? sizeOf(viewBounds(left)) : { w: 0, h: 0 }
    const topSize = top !== undefined ? sizeOf(viewBounds(top)) : { w: 0, h: 0 }
    const candidates = [fitScale(frontSize.w, frontSize.h, cellW - pad, cellH - pad)]
    if (left !== undefined) candidates.push(fitScale(leftSize.w, leftSize.h, cellW - pad, cellH - pad))
    if (top !== undefined) candidates.push(fitScale(topSize.w, topSize.h, cellW - pad, cellH - pad))
    scale = Math.min(...candidates)

    // GB first angle: 主视图 upper-left, 左视图 right of it, 俯视图 below it.
    const rowY = FRAME + regionH - cellH / 2
    const frontCX = FRAME + cellW / 2 + 4
    const place = (raw: DrawingView, ox: number, oy: number): void => {
      const scaled = scaleView(raw, scale)
      const { tx, ty } = centerTransform(scaled, ox, oy)
      placed.push({ view: scaled, tx, ty })
    }
    place(front, frontCX, rowY)
    if (left !== undefined) place(left, FRAME + cellW * 1.5 + GAP, rowY)
    if (top !== undefined) place(top, frontCX, FRAME + cellH / 2)

    // Overall dimensions off the scaled front/top geometry (mm on paper).
    const fw = frontSize.w * scale
    const fh = frontSize.h * scale
    if (fw > 1e-9) {
      linearDim(dimEntities, [frontCX - fw / 2, rowY - fh / 2], [frontCX + fw / 2, rowY - fh / 2], [0, -1], 9, trim(frontSize.w))
    }
    if (fh > 1e-9) {
      linearDim(dimEntities, [frontCX - fw / 2, rowY - fh / 2], [frontCX - fw / 2, rowY + fh / 2], [-1, 0], 9, trim(frontSize.h))
    }
    if (top !== undefined && topSize.h > 1e-9) {
      const topCY = FRAME + cellH / 2
      const tw = topSize.w * scale
      const td = topSize.h * scale
      linearDim(dimEntities, [frontCX + tw / 2, topCY - td / 2], [frontCX + tw / 2, topCY + td / 2], [1, 0], 9, trim(topSize.h))
    }
  }

  // Iso: fit the right free column above the title block, independent scale.
  if (iso !== undefined) {
    const isoLeft = FRAME + (width - FRAME * 2) * 0.64 + GAP / 2
    const isoBottom = FRAME + TITLE_BLOCK.height + GAP / 2
    const cellW = Math.max(width - FRAME - isoLeft, 40)
    const cellH = Math.max(height - FRAME - isoBottom, 40)
    const isoSize = sizeOf(viewBounds(iso))
    const s = fitScale(isoSize.w, isoSize.h, cellW - 10, cellH - 10)
    const scaled = scaleView(iso, s)
    const { tx, ty } = centerTransform(scaled, isoLeft + cellW / 2, isoBottom + cellH / 2)
    placed.push({ view: scaled, tx, ty })
  }

  // ── entities ───────────────────────────────────────────────────────────────
  const entities: CadEntity2D[] = []
  const frameRect = (x: number, y: number, w: number, h: number): void => {
    entities.push({ type: 'polyline', points: [x, y, x + w, y, x + w, y + h, x, y + h], closed: true, layer: 'paper', color: COLORS.paper })
  }
  frameRect(2, 2, width - 4, height - 4)
  frameRect(FRAME, FRAME, width - FRAME * 2, height - FRAME * 2)
  const tbX = width - FRAME - TITLE_BLOCK.width
  const tbY = FRAME
  frameRect(tbX, tbY, TITLE_BLOCK.width, TITLE_BLOCK.height)
  entities.push({ type: 'line', x1: tbX, y1: tbY + TITLE_BLOCK.height / 2, x2: tbX + TITLE_BLOCK.width, y2: tbY + TITLE_BLOCK.height / 2, layer: 'paper', color: COLORS.paper })
  entities.push({ type: 'line', x1: tbX + 78, y1: tbY, x2: tbX + 78, y2: tbY + TITLE_BLOCK.height, layer: 'paper', color: COLORS.paper })
  const titleText = (x: number, y: number, text: string, size = 3.2): void => {
    entities.push({ type: 'text', x, y, text, height: size, layer: 'paper', color: COLORS.text })
  }
  titleText(tbX + 4, tbY + TITLE_BLOCK.height - 8, input.partName, 4.2)
  titleText(tbX + 4, tbY + 6, `图号 ${input.drawingNo ?? '—'}`)
  titleText(tbX + 44, tbY + 6, `比例 ${scaleText(scale)}`)
  titleText(tbX + 82, tbY + 6, '单位 mm')
  titleText(tbX + 82, tbY + TITLE_BLOCK.height / 2 - 4, `日期 ${input.date ?? ''}`)

  entities.push(...dimEntities)
  for (const item of placed) {
    for (const polyline of item.view.visible) {
      entities.push({
        type: 'polyline',
        points: polyline.map((v, i) => v + (i % 2 === 0 ? item.tx : item.ty)),
        closed: false, layer: 'visible', color: COLORS.visible,
      })
    }
    for (const polyline of item.view.hidden) {
      entities.push({
        type: 'polyline',
        points: polyline.map((v, i) => v + (i % 2 === 0 ? item.tx : item.ty)),
        closed: false, layer: 'hidden', color: COLORS.hidden,
      })
    }
  }

  return {
    entities,
    bounds: { min: { x: 0, y: 0 }, max: { x: width, y: height } },
    layers: ['visible', 'hidden', 'dim', 'paper'],
    width,
    height,
    scale,
    entityCount: entities.length,
  }
}

// ── export serializations ─────────────────────────────────────────────────────

const esc = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Serialize the sheet to a standalone SVG (paper mm = user units, Y flipped). */
export function drawingToSvg(sheet: DrawingSheet): string {
  const { width, height, entities } = sheet
  const parts: string[] = []
  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}mm" height="${height}mm">`,
  )
  parts.push(`<rect x="0" y="0" width="${width}" height="${height}" fill="#ffffff"/>`)
  parts.push(`<g transform="translate(0,${height}) scale(1,-1)">`)
  for (const entity of entities) {
    switch (entity.type) {
      case 'line':
        parts.push(`<line x1="${entity.x1}" y1="${entity.y1}" x2="${entity.x2}" y2="${entity.y2}" stroke="${cssColor(entity)}" ${strokeStyle(entity)}/>`)
        break
      case 'polyline': {
        const points: string[] = []
        for (let i = 0; i + 1 < entity.points.length; i += 2) points.push(`${entity.points[i]},${entity.points[i + 1]}`)
        parts.push(`<polyline points="${points.join(' ')}" fill="none" stroke="${cssColor(entity)}" ${strokeStyle(entity)}/>`)
        break
      }
      case 'text':
        parts.push(
          `<text x="${entity.x}" y="${entity.y}" font-size="${entity.height}" fill="${cssColor(entity)}" ` +
          `transform="translate(0,${2 * entity.y}) scale(1,-1)" font-family="sans-serif">${esc(entity.text)}</text>`,
        )
        break
      default:
        break
    }
  }
  parts.push('</g></svg>')
  return parts.join('\n')
}

function cssColor(entity: { color?: number }): string {
  const color = entity.color ?? 0x1a1d21
  return `#${color.toString(16).padStart(6, '0')}`
}

function strokeStyle(entity: { layer?: string }): string {
  const width = entity.layer === 'hidden' || entity.layer === 'dim' ? 0.25 : 0.45
  const dash = entity.layer === 'hidden' ? ' stroke-dasharray="2,1.2"' : ''
  return `stroke-width="${width}"${dash}`
}

/** Minimal R12 ASCII DXF (LINE + TEXT entities; polylines expand to lines). */
export function drawingToDxf(sheet: DrawingSheet): string {
  const out: string[] = []
  const push = (code: number, value: string | number): void => {
    out.push(String(code), String(value))
  }
  push(0, 'SECTION')
  push(2, 'ENTITIES')
  for (const entity of sheet.entities) {
    switch (entity.type) {
      case 'line':
        push(0, 'LINE')
        push(8, entity.layer ?? '0')
        push(10, entity.x1.toFixed(4)); push(20, entity.y1.toFixed(4)); push(30, '0')
        push(11, entity.x2.toFixed(4)); push(21, entity.y2.toFixed(4)); push(31, '0')
        break
      case 'polyline':
        for (let i = 0; i + 3 < entity.points.length; i += 2) {
          push(0, 'LINE')
          push(8, entity.layer ?? '0')
          push(10, entity.points[i]!.toFixed(4)); push(20, entity.points[i + 1]!.toFixed(4)); push(30, '0')
          push(11, entity.points[i + 2]!.toFixed(4)); push(21, entity.points[i + 3]!.toFixed(4)); push(30, '0')
        }
        break
      case 'text':
        push(0, 'TEXT')
        push(8, entity.layer ?? '0')
        push(10, entity.x.toFixed(4)); push(20, entity.y.toFixed(4)); push(30, '0')
        push(40, entity.height.toFixed(3))
        push(1, entity.text)
        if (entity.rotation !== undefined) push(50, entity.rotation.toFixed(2))
        break
      default:
        break
    }
  }
  push(0, 'ENDSEC')
  push(0, 'EOF')
  return out.join('\n')
}
