/**
 * SVG → CadDrawing2D. The raw SVG source is carried through and rendered in a
 * sandboxed <img>; entities/bounds are a best-effort scan of basic shapes for
 * the stats line.
 */
import type { CadDrawing2D, CadEntity2D } from '../types.js'

function numberAttribute(tag: string, name: string, fallback = 0): number {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`))
  if (match === null) return fallback
  const value = Number(match[1])
  return Number.isFinite(value) ? value : fallback
}

function colorAttribute(tag: string): number | undefined {
  const stroke = tag.match(/stroke\s*=\s*"#([0-9a-fA-F]{6})"/)
  if (stroke === null || stroke[1] === 'none') return undefined
  return parseInt(stroke[1]!, 16)
}

/** Extract the renderable entity subset from an SVG document. */
export function parseSVG(text: string): CadDrawing2D {
  const entities: CadEntity2D[] = []
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  const track = (x: number, y: number): void => {
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
  }

  // User-space y grows downward in SVG; flip into math orientation.
  const flipY = (text.match(/\by2?\s*=\s*"/) !== null)
  const maybeFlip = (y: number): number => (flipY ? -y : y)

  for (const tag of text.matchAll(/<(line|circle|rect|polyline)\b[^>]*>/gi)) {
    const element = tag[0]
    const kind = tag[1]!.toLowerCase()
    const color = colorAttribute(element)
    switch (kind) {
      case 'line': {
        const x1 = numberAttribute(element, 'x1')
        const y1 = maybeFlip(numberAttribute(element, 'y1'))
        const x2 = numberAttribute(element, 'x2')
        const y2 = maybeFlip(numberAttribute(element, 'y2'))
        entities.push({ type: 'line', x1, y1, x2, y2, color })
        track(x1, y1); track(x2, y2)
        break
      }
      case 'circle': {
        const cx = numberAttribute(element, 'cx')
        const cy = maybeFlip(numberAttribute(element, 'cy'))
        const r = numberAttribute(element, 'r')
        entities.push({ type: 'circle', cx, cy, r, color })
        track(cx - r, cy - r); track(cx + r, cy + r)
        break
      }
      case 'rect': {
        const x = numberAttribute(element, 'x')
        const y = maybeFlip(numberAttribute(element, 'y'))
        const width = numberAttribute(element, 'width')
        const height = numberAttribute(element, 'height')
        const points = [x, y, x + width, y, x + width, y - height, x, y - height]
        entities.push({ type: 'polyline', points, closed: true, color })
        track(x, y - height); track(x + width, y)
        break
      }
      case 'polyline': {
        const pointsMatch = element.match(/points\s*=\s*"([^"]*)"/)
        if (pointsMatch === null) break
        const points: number[] = []
        for (const pair of pointsMatch[1]!.trim().split(/\s+/)) {
          const [xs, ys] = pair.split(',')
          const x = Number(xs)
          const y = Number(ys)
          if (Number.isFinite(x) && Number.isFinite(y)) {
            points.push(x, maybeFlip(y))
            track(x, maybeFlip(y))
          }
        }
        if (points.length >= 4) entities.push({ type: 'polyline', points, closed: element.includes('polygon'), color })
        break
      }
    }
  }

  if (!Number.isFinite(minX)) {
    const width = numberAttribute(text.match(/<svg\b[^>]*>/)?.[0] ?? '', 'width', 100)
    const height = numberAttribute(text.match(/<svg\b[^>]*>/)?.[0] ?? '', 'height', 100)
    minX = 0; minY = -height; maxX = width; maxY = 0
  }

  return {
    kind: '2d',
    format: 'svg',
    entities,
    bounds: { min: { x: minX, y: minY }, max: { x: maxX, y: maxY } },
    layers: [],
    svgText: text,
  }
}
