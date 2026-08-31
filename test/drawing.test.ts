/**
 * Engineering drawing + assembly composition pipelines: the mesh HLR
 * projector (feature edges, silhouettes, occlusion), the GB sheet layout,
 * the SVG/DXF serializations, and the main-thread assembly mesh composer.
 */
import { describe, expect, it } from 'vitest'
import { createRequire } from 'node:module'
import { featureEdges, projectViews } from '../src/modeling/hlr.cjs'
import { buildDrawingSheet, drawingToDxf, drawingToSvg } from '../src/modeling/drawing.js'
import { composeAssemblyMeshes } from '../src/modeling/assembly.js'
import type { BinMeshData } from '../src/modeling/bin-format.js'

// dxf-parser ships as CJS `module.exports = class` (same load path as src/convert/dxf.ts).
const DxfParser = createRequire(import.meta.url)('dxf-parser') as new () => { parseSync(text: string): { entities: Array<Record<string, unknown>> } }

/** Orthographic box mesh: per-face vertices so normals are hard. */
function boxMesh(dx: number, dy: number, dz: number, ox = 0, oy = 0, oz = 0): { positions: number[]; indices: number[] } {
  const positions: number[] = []
  const indices: number[] = []
  const face = (o: [number, number, number], u: [number, number, number], v: [number, number, number]): void => {
    const base = positions.length / 3
    for (const [s, t] of [[0, 0], [1, 0], [1, 1], [0, 1]] as const) {
      positions.push(o[0] + u[0] * s + v[0] * t, o[1] + u[1] * s + v[1] * t, o[2] + u[2] * s + v[2] * t)
    }
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3)
  }
  face([ox, oy, oz], [0, dy, 0], [dx, 0, 0]) // bottom (-Z)
  face([ox, oy, oz + dz], [dx, 0, 0], [0, dy, 0]) // top (+Z)
  face([ox, oy, oz], [dx, 0, 0], [0, 0, dz]) // front (-Y)
  face([ox, oy + dy, oz], [0, 0, dz], [dx, 0, 0]) // back (+Y)
  face([ox, oy, oz], [0, 0, dz], [0, dy, 0]) // left (-X)
  face([ox + dx, oy, oz], [0, dy, 0], [0, 0, dz]) // right (+X)
  return { positions, indices }
}

const STANDARD_VIEWS = [
  { name: 'front', dir: [0, -1, 0], xDir: [1, 0, 0] },
  { name: 'top', dir: [0, 0, 1], xDir: [1, 0, 0] },
  { name: 'left', dir: [-1, 0, 0], xDir: [0, 1, 0] },
  { name: 'iso', dir: [1, -1, 1], xDir: [1, 1, 0] },
] as const

describe('mesh HLR projector', () => {
  it('finds exactly the 12 feature edges of a box', () => {
    const { positions, indices } = boxMesh(20, 10, 5)
    expect(featureEdges(positions as never, indices as never).length / 6).toBe(12)
  })

  it('projects a convex box with visible outlines and no hidden lines in the standard views', () => {
    const { positions, indices } = boxMesh(20, 10, 5)
    const { views } = projectViews(
      { positions: positions as never, indices: indices as never },
      STANDARD_VIEWS as unknown as never[],
    ) as { views: Array<{ name: string; visible: number[][]; hidden: number[][] }> }
    const byName = new Map(views.map((view) => [view.name, view]))
    for (const name of ['front', 'top', 'left']) {
      const view = byName.get(name)!
      expect(view.visible.length).toBeGreaterThanOrEqual(1)
      expect(view.hidden).toHaveLength(0)
    }
    // front view outline spans 20 × 5 mm
    const front = byName.get('front')!
    const xs = front.visible.flat().filter((_, i) => i % 2 === 0)
    const ys = front.visible.flat().filter((_, i) => i % 2 === 1)
    expect(Math.max(...xs) - Math.min(...xs)).toBeCloseTo(20, 3)
    expect(Math.max(...ys) - Math.min(...ys)).toBeCloseTo(5, 3)
  })

  it('marks the far-corner junction chain of the iso view hidden', () => {
    const { positions, indices } = boxMesh(20, 10, 5)
    const { views } = projectViews(
      { positions: positions as never, indices: indices as never },
      [{ name: 'iso', dir: [1, -1, 1], xDir: [1, 1, 0] }] as unknown as never[],
    ) as { views: Array<{ name: string; visible: number[][]; hidden: number[][] }> }
    const iso = views[0]!
    expect(iso.hidden.length).toBeGreaterThanOrEqual(1)
    // The far corner (0,10,0) projects to (10/√2, 20/√6) ≈ (7.07, 8.16); the
    // hidden Y-chain must connect there.
    const farX = 10 / Math.SQRT2
    const farY = 20 / Math.sqrt(6)
    const near = (value: number, target: number): boolean => Math.abs(value - target) < 0.01
    const touchesFarCorner = iso.hidden.some((polyline) =>
      polyline.some((_, i) => i % 2 === 0 && near(polyline[i]!, farX) && near(polyline[i + 1]!, farY)),
    )
    expect(touchesFarCorner).toBe(true)
  })

  it('traces curved silhouettes (cylinder outline reaches the full radius)', () => {
    // 48-gon prism with properly wound side + cap faces
    const positions: number[] = []
    const indices: number[] = []
    const N = 48
    const R = 10
    const H = 30
    for (let i = 0; i < N; i++) {
      const a = (i / N) * 2 * Math.PI
      positions.push(R * Math.cos(a), R * Math.sin(a), 0, R * Math.cos(a), R * Math.sin(a), H)
    }
    for (let i = 0; i < N; i++) {
      const j = (i + 1) % N
      indices.push(i * 2, j * 2, j * 2 + 1, i * 2, j * 2 + 1, i * 2 + 1) // side (+outward)
      indices.push(0, i * 2, j * 2) // bottom fan (-Z)
      indices.push(1, j * 2 + 1, i * 2 + 1) // top fan (+Z)
    }
    const { views } = projectViews(
      { positions: positions as never, indices: indices as never },
      [{ name: 'front', dir: [0, -1, 0], xDir: [1, 0, 0] }] as unknown as never[],
    ) as { views: Array<{ name: string; visible: number[][]; hidden: number[][] }> }
    const xs = views[0]!.visible.flat().filter((_, i) => i % 2 === 0)
    expect(Math.max(...xs)).toBeCloseTo(10, 1)
    expect(Math.min(...xs)).toBeCloseTo(-10, 1)
  })
})

describe('drawing sheet layout', () => {
  const rect = (w: number, h: number): number[][] => [[0, 0, w, 0, w, h, 0, h, 0, 0]]

  const sampleViews = [
    { name: 'front', visible: rect(60, 40), hidden: [[0, 10, 60, 10]] },
    { name: 'top', visible: rect(60, 20), hidden: [] },
    { name: 'left', visible: rect(20, 40), hidden: [] },
    { name: 'iso', visible: rect(50, 35), hidden: [] },
  ]

  it('lays out an A4 sheet with frame, title block, dimensions and layer-classified views', () => {
    const sheet = buildDrawingSheet({ partName: 'Test Bracket', views: sampleViews, drawingNo: 'DSH-001', date: '2026-08-31' })
    expect(sheet.width).toBe(297)
    expect(sheet.height).toBe(210)
    // every entity stays on the sheet
    for (const entity of sheet.entities) {
      if (entity.type === 'line') {
        expect(entity.x1).toBeGreaterThanOrEqual(0)
        expect(entity.x2).toBeLessThanOrEqual(297)
      }
      if (entity.type === 'polyline') {
        for (let i = 0; i < entity.points.length; i += 2) {
          expect(entity.points[i]).toBeGreaterThanOrEqual(-1e-6)
          expect(entity.points[i]).toBeLessThanOrEqual(297 + 1e-6)
        }
      }
    }
    expect(sheet.entities.some((entity) => entity.layer === 'dim')).toBe(true)
    expect(sheet.entities.some((entity) => entity.layer === 'hidden')).toBe(true)
    const texts = sheet.entities.filter((entity) => entity.type === 'text') as Array<{ type: 'text'; text: string }>
    expect(texts.some((entity) => entity.text.includes('Test Bracket'))).toBe(true)
    expect(texts.some((entity) => entity.text.includes('比例'))).toBe(true)
  })

  it('snaps the standard-view scale down to a standard series value', () => {
    // a 500 mm part cannot fit A4 at 1:1 → expect ≤ 0.5
    const big = [
      { name: 'front', visible: rect(500, 300), hidden: [] },
      { name: 'top', visible: rect(500, 100), hidden: [] },
      { name: 'left', visible: rect(100, 300), hidden: [] },
    ]
    const sheet = buildDrawingSheet({ partName: 'Big', views: big })
    expect(sheet.scale).toBeLessThanOrEqual(0.5)
  })

  it('serializes to standalone SVG and DXF that round-trips through dxf-parser', () => {
    const sheet = buildDrawingSheet({ partName: 'X', views: sampleViews })
    const svg = drawingToSvg(sheet)
    expect(svg.startsWith('<svg')).toBe(true)
    expect(svg).toContain('stroke-dasharray') // hidden lines dashed
    expect(svg).toContain('#ffffff')

    const dxf = drawingToDxf(sheet)
    const doc = new DxfParser().parseSync(dxf)
    expect(doc.entities.length).toBeGreaterThan(10)
    expect(doc.entities.some((entity) => entity.type === 'LINE')).toBe(true)
    expect(doc.entities.some((entity) => entity.type === 'TEXT')).toBe(true)
  })
})

describe('assembly composition', () => {
  const base: BinMeshData = {
    name: 'b',
    positions: Float32Array.from([1, 0, 0]),
    normals: Float32Array.from([1, 0, 0]),
    indices: Uint32Array.from([0]),
  }

  it('applies translate then XYZ-Euler rotation consistently', () => {
    // 90° about Z maps +X → +Y; translation composes after rotation
    const out = composeAssemblyMeshes(new Map([['b1', base]]), [
      { instanceId: 'i1', bodyId: 'b1', name: 'pin', translate: [10, 0, 0], rotate: [0, 0, 90] },
    ])
    const [px, py, pz] = Array.from(out[0]!.positions)
    expect(px).toBeCloseTo(10, 6)
    expect(py).toBeCloseTo(1, 6)
    expect(pz).toBeCloseTo(0, 6)
    const [nx, ny, nz] = Array.from(out[0]!.normals!)
    expect(nx).toBeCloseTo(0, 6)
    expect(ny).toBeCloseTo(1, 6)
    expect(nz).toBeCloseTo(0, 6)
  })

  it('suffixes duplicate instance names and skips stale bodies', () => {
    const bodies = new Map([['b1', base]])
    const out = composeAssemblyMeshes(bodies, [
      { instanceId: 'i1', bodyId: 'b1', name: 'bolt', translate: [0, 0, 0], rotate: [0, 0, 0] },
      { instanceId: 'i2', bodyId: 'b1', name: 'bolt', translate: [5, 0, 0], rotate: [0, 0, 0] },
      { instanceId: 'i3', bodyId: 'gone', name: 'stale', translate: [0, 0, 0], rotate: [0, 0, 0] },
    ])
    expect(out).toHaveLength(2)
    expect(out[0]!.name).toBe('bolt')
    expect(out[1]!.name).toBe('bolt·2')
  })
})
