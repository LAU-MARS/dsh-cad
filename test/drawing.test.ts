/**
 * Engineering drawing + assembly composition pipelines: the GB sheet layout,
 * the SVG/DXF serializations, and the main-thread assembly mesh composer.
 * (Hidden-line projection itself is the occt.ts kernel's job — worker
 * integration for it lives in assembly-drawing.test.ts.)
 */
import { describe, expect, it } from 'vitest'
import { createRequire } from 'node:module'
import { buildDrawingSheet, drawingToDxf, drawingToSvg } from '../src/modeling/drawing.js'
import { composeAssemblyMeshes } from '../src/modeling/assembly.js'
import type { BinMeshData } from '../src/modeling/bin-format.js'

// dxf-parser ships as CJS `module.exports = class` (same load path as src/convert/dxf.ts).
const DxfParser = createRequire(import.meta.url)('dxf-parser') as new () => { parseSync(text: string): { entities: Array<Record<string, unknown>> } }


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
