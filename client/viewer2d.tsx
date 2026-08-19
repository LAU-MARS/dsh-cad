/**
 * 2D viewport: SVG rendering of the drawing entity subset with wheel zoom and
 * drag pan, implemented through viewBox state.
 */
import type { ReactNode } from 'react'
import type { CadDrawing2D, CadEntity2D } from './scene-types.js'

export interface ViewBox {
  x: number
  y: number
  width: number
  height: number
}

export function fitViewBox(drawing: CadDrawing2D): ViewBox {
  const { min, max } = drawing.bounds
  const width = Math.max(max.x - min.x, 1e-6)
  const height = Math.max(max.y - min.y, 1e-6)
  const margin = Math.max(width, height) * 0.05
  // y is flipped: SVG viewBox top = max.y.
  return { x: min.x - margin, y: -max.y - margin, width: width + margin * 2, height: height + margin * 2 }
}

function entityColor(entity: CadEntity2D): string {
  return entity.color === undefined ? 'var(--dsh-cad-stroke, #4c5561)' : `#${entity.color.toString(16).padStart(6, '0')}`
}

function polylinePoints(points: number[]): string {
  const pairs: string[] = []
  for (let i = 0; i + 1 < points.length; i += 2) pairs.push(`${points[i]!.toFixed(3)},${points[i + 1]!.toFixed(3)}`)
  return pairs.join(' ')
}

function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  // DXF angles are CCW degrees in math orientation; the group flip mirrors
  // them, so sweep stays 1 (positive-angle direction after flip).
  const start = startAngle * (Math.PI / 180)
  const end = endAngle * (Math.PI / 180)
  const x1 = cx + r * Math.cos(start)
  const y1 = cy + r * Math.sin(start)
  const x2 = cx + r * Math.cos(end)
  const y2 = cy + r * Math.sin(end)
  const largeArc = ((end - start) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) > Math.PI ? 1 : 0
  return `M ${x1.toFixed(4)} ${y1.toFixed(4)} A ${r.toFixed(4)} ${r.toFixed(4)} 0 ${largeArc} 1 ${x2.toFixed(4)} ${y2.toFixed(4)}`
}

/** Render the drawing's entities as React SVG children (inside the flipped group). */
export function entityNodes(drawing: CadDrawing2D): ReactNode[] {
  return drawing.entities.map((entity, index) => {
    const key = `e${index}`
    const style = { stroke: entityColor(entity), fill: 'none', strokeWidth: 1, vectorEffect: 'non-scaling-stroke' as const }
    switch (entity.type) {
      case 'line':
        return <line key={key} x1={entity.x1} y1={entity.y1} x2={entity.x2} y2={entity.y2} style={style} />
      case 'circle':
        return <circle key={key} cx={entity.cx} cy={entity.cy} r={entity.r} style={style} />
      case 'arc':
        return <path key={key} d={arcPath(entity.cx, entity.cy, entity.r, entity.startAngle, entity.endAngle)} style={style} />
      case 'polyline':
        return <polyline key={key} points={polylinePoints(entity.points)} fill="none" style={style} />
      case 'text':
        return (
          <g key={key} transform={`translate(${entity.x} ${entity.y}) scale(1 -1) rotate(${(entity.rotation ?? 0) * -1})`}>
            <text x={0} y={0} fontSize={entity.height} fill={entityColor(entity)} style={{ userSelect: 'none' }}>
              {entity.text}
            </text>
          </g>
        )
    }
  })
}
