/**
 * Selective fillet/chamfer: `edges` (1-based indices from describe) and
 * `edgesAlong` (direction filter) round/bevel only the named edges instead of
 * the whole body. Runs on the DEFAULT kernel (occt.ts) — the path real users
 * get unless they opt into DSH_CAD_KERNEL=cadorange.
 */
import { describe, expect, it } from 'vitest'
import { runModelOp } from '../src/modeling/client.js'

interface EdgeInfo {
  index: number
  curve: string
  length: number
  direction?: number[]
  axis?: number[]
}

const box = async (bodyId = 'box') => {
  await runModelOp({ kind: 'reset' })
  await runModelOp({ kind: 'create_prim', bodyId, prim: 'box', params: { dx: 20, dy: 20, dz: 10 } })
}

const edgesOf = async (bodyId = 'box'): Promise<EdgeInfo[]> => {
  const res = await runModelOp({ kind: 'describe', target: bodyId })
  return (res.describe as { edges: EdgeInfo[] }).edges
}

describe('describe / cad_edges data', () => {
  it('lists 12 edges with 1-based indices and straight-edge directions', { timeout: 120_000 }, async () => {
    await box()
    const edges = await edgesOf()
    expect(edges).toHaveLength(12)
    expect(Math.min(...edges.map((e) => e.index))).toBe(1)
    expect(Math.max(...edges.map((e) => e.index))).toBe(12)
    const vertical = edges.filter((e) => {
      const d = e.direction ?? e.axis
      return Array.isArray(d) && Math.abs(d[2]) > 0.99
    })
    expect(vertical).toHaveLength(4)
  })
})

describe('selective chamfer', () => {
  it('bevels only the vertical edges (edgesAlong)', { timeout: 120_000 }, async () => {
    await box()
    await runModelOp({ kind: 'chamfer', target: 'box', distance: 2, edgesAlong: [0, 0, 1] })
    const { volume } = await runModelOp({ kind: 'volume', target: 'box' })
    // 20×20×10 minus four 2×2/2×10 bevels.
    expect(volume).toBeCloseTo(20 * 20 * 10 - 4 * (0.5 * 2 * 2 * 10), 0)
  })

  it('bevels only the named edges (edges)', { timeout: 120_000 }, async () => {
    await box()
    const edges = await edgesOf()
    const vertical = edges
      .filter((e) => {
        const d = e.direction ?? e.axis
        return Array.isArray(d) && Math.abs(d[2]) > 0.99
      })
      .map((e) => e.index)
    expect(vertical).toHaveLength(4)
    await runModelOp({ kind: 'chamfer', target: 'box', distance: 2, edges: vertical })
    const { volume } = await runModelOp({ kind: 'volume', target: 'box' })
    expect(volume).toBeCloseTo(20 * 20 * 10 - 4 * (0.5 * 2 * 2 * 10), 0)
  })

  it('chamfers less than the whole body when only some edges are selected', { timeout: 120_000 }, async () => {
    await box()
    await runModelOp({ kind: 'chamfer', target: 'box', distance: 2, edgesAlong: [0, 0, 1] })
    const selective = (await runModelOp({ kind: 'volume', target: 'box' })).volume!
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 'all', prim: 'box', params: { dx: 20, dy: 20, dz: 10 } })
    await runModelOp({ kind: 'chamfer', target: 'all', distance: 2 })
    const all = (await runModelOp({ kind: 'volume', target: 'all' })).volume!
    expect(selective).toBeGreaterThan(all)
  })

  it('rejects a selection that matches no edge', { timeout: 120_000 }, async () => {
    await box()
    await expect(runModelOp({ kind: 'chamfer', target: 'box', distance: 1, edges: [999] })).rejects.toThrow(/matched no edges/)
  })
})

describe('selective fillet', () => {
  it('rounds only the vertical edges and leaves the horizontal ones sharp', { timeout: 120_000 }, async () => {
    await box()
    await runModelOp({ kind: 'fillet', target: 'box', radius: 2, edgesAlong: [0, 0, 1] })
    const selective = (await runModelOp({ kind: 'volume', target: 'box' })).volume!
    const removed = 20 * 20 * 10 - selective
    // Four corner quarter-rounds: (1 - π/4)·r²·h each, 4 of them.
    expect(removed).toBeCloseTo(4 * (1 - Math.PI / 4) * 2 * 2 * 10, 0)
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 'all', prim: 'box', params: { dx: 20, dy: 20, dz: 10 } })
    await runModelOp({ kind: 'fillet', target: 'all', radius: 2 })
    const all = (await runModelOp({ kind: 'volume', target: 'all' })).volume!
    expect(selective).toBeGreaterThan(all)
  })

  it('rounds only the named top edges (edges)', { timeout: 120_000 }, async () => {
    await box()
    const edges = await edgesOf()
    // Horizontal edges live at z = 10 (top face).
    const top = edges.filter((e) => {
      const d = e.direction ?? e.axis
      const isHorizontal = Array.isArray(d) && Math.abs(d[2]) < 0.01
      return isHorizontal && Math.abs((e as unknown as { center?: number[] }).center?.[2] ?? 0) > 9.9
    })
    expect(top).toHaveLength(4)
    await runModelOp({ kind: 'fillet', target: 'box', radius: 2, edges: top.map((e) => e.index) })
    const { volume } = await runModelOp({ kind: 'volume', target: 'box' })
    expect(volume).toBeLessThan(20 * 20 * 10)
    expect(volume).toBeGreaterThan(20 * 20 * 10 * 0.98)
  })
})
