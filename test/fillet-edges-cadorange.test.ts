/**
 * Selective fillet/chamfer on the cadorange backend (DSH_CAD_KERNEL=cadorange):
 * same semantics as the default kernel — 1-based `edges` and direction-based
 * `edgesAlong` select a subset; no selection keeps the legacy all-edges behaviour.
 */
process.env.DSH_CAD_KERNEL = 'cadorange'

import { afterAll, describe, expect, it } from 'vitest'
import { runModelOp } from '../src/modeling/client.js'

afterAll(() => {
  delete process.env.DSH_CAD_KERNEL
})

const box = async (bodyId = 'box') => {
  await runModelOp({ kind: 'reset' })
  await runModelOp({ kind: 'create_prim', bodyId, prim: 'box', params: { dx: 20, dy: 20, dz: 10 } })
}

describe('cadorange selective fillet/chamfer', () => {
  it('describe exposes direction on straight edges', { timeout: 120_000 }, async () => {
    await box()
    const res = await runModelOp({ kind: 'describe', target: 'box' })
    const edges = (res.describe as { edges: Array<{ index: number; direction?: number[]; axis?: number[] }> }).edges
    expect(edges).toHaveLength(12)
    const vertical = edges.filter((e) => Array.isArray(e.direction) && Math.abs(e.direction[2]) > 0.99)
    expect(vertical).toHaveLength(4)
  })

  it('bevels only the vertical edges', { timeout: 120_000 }, async () => {
    await box()
    await runModelOp({ kind: 'chamfer', target: 'box', distance: 2, edgesAlong: [0, 0, 1] })
    const { volume } = await runModelOp({ kind: 'volume', target: 'box' })
    expect(volume).toBeCloseTo(20 * 20 * 10 - 4 * (0.5 * 2 * 2 * 10), 0)
  })

  it('rounds only the vertical edges', { timeout: 120_000 }, async () => {
    await box()
    await runModelOp({ kind: 'fillet', target: 'box', radius: 2, edgesAlong: [0, 0, 1] })
    const { volume } = await runModelOp({ kind: 'volume', target: 'box' })
    expect(20 * 20 * 10 - volume!).toBeCloseTo(4 * (1 - Math.PI / 4) * 2 * 2 * 10, 0)
  })

  it('keeps the all-edges default', { timeout: 120_000 }, async () => {
    await box()
    await runModelOp({ kind: 'chamfer', target: 'box', distance: 2 })
    const { volume } = await runModelOp({ kind: 'volume', target: 'box' })
    expect(volume).toBeLessThan(20 * 20 * 10 - 4 * (0.5 * 2 * 2 * 10))
  })
})
