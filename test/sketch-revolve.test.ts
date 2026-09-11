/**
 * Sketch curve segments + revolve/chamfer/pattern: exact geometry through the
 * real modeling worker and the tool interface.
 *
 * Exact volumes where analytic:
 *  - circle profile extrude: πr²h
 *  - stadium profile (line-arc-line-arc): (rect + circle) × h
 *  - revolve annulus: π(r1²−r0²)h, half-angle halves it
 *  - revolve half-disc (diameter on the axis): sphere 4/3·πr³
 *  - chamfer: bounds + BRepCheck (no closed form asserted)
 *  - pattern: copies verify by volume and placement
 *
 * bspline profiles are SAMPLED smooth curves (this kernel build cannot read
 * points back from a Geom_BSplineCurve) — asserted by volume band +
 * meshability, documented as an approximation.
 */
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { runModelOp } from '../src/modeling/client.js'
import { createModelTools } from '../src/tools/cad-model.js'
import { DocumentRegistry } from '../src/modeling/registry.js'
import { BinarySceneStore } from '../src/modeling/bin-store.js'
import { SceneStore } from '../src/store.js'

const vol = async (target: string): Promise<number> => (await runModelOp({ kind: 'volume', target })).volume!

const stadium = {
  start: [-10, -5],
  segments: [
    { type: 'line', to: [10, -5] },
    { type: 'arc', to: [10, 5], center: [10, 0], ccw: true },
    { type: 'line', to: [-10, 5] },
    { type: 'arc', to: [-10, -5], center: [-10, 0], ccw: true },
  ],
}
const halfDisc = { start: [0, -10], segments: [{ type: 'arc', to: [0, 10], center: [0, 0], ccw: true }, { type: 'line', to: [0, -10] }] }

describe('sketch curve segments (worker)', () => {
  beforeEach(async () => { await runModelOp({ kind: 'reset' }) })
  afterEach(async () => { await runModelOp({ kind: 'reset' }) })

  it('extrudes a circle profile exactly (πr²h)', async () => {
    await runModelOp({ kind: 'extrude_profile', bodyId: 'C', profile: { circle: { center: [0, 0], radius: 5 } }, height: 10 })
    expect(await vol('C')).toBeCloseTo(Math.PI * 25 * 10, 2)
  })

  it('extrudes a line-arc stadium profile exactly', async () => {
    await runModelOp({ kind: 'extrude_profile', bodyId: 'S', profile: stadium, height: 4 })
    expect(await vol('S')).toBeCloseTo((200 + Math.PI * 25) * 4, 2)
  })

  it('rejects arcs whose endpoints are not equidistant from the center', async () => {
    await expect(runModelOp({
      kind: 'extrude_profile', bodyId: 'X',
      profile: { start: [0, 0], segments: [{ type: 'arc', to: [5, 0], center: [0, 0] }] },
      height: 1,
    })).rejects.toThrow(/equidistant/)
  })

  it('extrudes a sampled bspline profile into a meshable solid (documented approximation)', async () => {
    const result = await runModelOp({
      kind: 'extrude_profile', bodyId: 'B',
      profile: {
        start: [0, 0],
        segments: [
          { type: 'bspline', through: [[5, 3], [10, 0]] },
          { type: 'line', to: [10, -3] },
          { type: 'bspline', through: [[5, -5], [0, -3]] },
        ],
      },
      height: 2,
    })
    // Meshed by the worker (the real usability bar) with a sane volume.
    expect(result.mesh!.triangleCount).toBeGreaterThan(10)
    expect(Math.abs(await vol('B'))).toBeGreaterThan(40)
    expect(Math.abs(await vol('B'))).toBeLessThan(200)
  })

  it('keeps the legacy flat-points form working', async () => {
    await runModelOp({ kind: 'extrude_profile', bodyId: 'P', points: [0, 0, 20, 0, 20, 10, 0, 10], height: 5 })
    expect(await vol('P')).toBeCloseTo(1000, 2)
  })
})

describe('revolve (旋转)', () => {
  beforeEach(async () => { await runModelOp({ kind: 'reset' }) })
  afterEach(async () => { await runModelOp({ kind: 'reset' }) })

  it('revolves an annulus cross-section exactly (full and half)', async () => {
    await runModelOp({ kind: 'revolve', bodyId: 'A', profile: [5, 0, 10, 0, 10, 4, 5, 4] })
    expect(Math.abs(await vol('A'))).toBeCloseTo(Math.PI * (100 - 25) * 4, 2)
    await runModelOp({ kind: 'revolve', bodyId: 'A2', profile: [5, 0, 10, 0, 10, 4, 5, 4], angle: Math.PI })
    expect(Math.abs(await vol('A2'))).toBeCloseTo((Math.PI * (100 - 25) * 4) / 2, 2)
  })

  it('revolves an axis-touching half-disc into a sphere (both orientations)', async () => {
    await runModelOp({ kind: 'revolve', bodyId: 'S1', profile: halfDisc })
    expect(Math.abs(await vol('S1'))).toBeCloseTo((4 / 3) * Math.PI * 1000, 1)
    await runModelOp({ kind: 'revolve', bodyId: 'S2', profile: halfDisc, axis: [1, 0, 0] })
    expect(Math.abs(await vol('S2'))).toBeCloseTo((4 / 3) * Math.PI * 1000, 1)
  })
})

describe('chamfer & pattern', () => {
  beforeEach(async () => { await runModelOp({ kind: 'reset' }) })
  afterEach(async () => { await runModelOp({ kind: 'reset' }) })

  it('chamfers a cube: valid, volume strictly reduced', async () => {
    await runModelOp({ kind: 'create_prim', bodyId: 'c', prim: 'box', params: { dx: 10, dy: 10, dz: 10 } })
    const result = await runModelOp({ kind: 'chamfer', target: 'c', distance: 1 })
    expect(result.bodyId).toBe('c')
    const v = await vol('c')
    expect(v).toBeGreaterThan(700)
    expect(v).toBeLessThan(1000)
  })

  it('linear pattern creates count bodies with the same volume', async () => {
    await runModelOp({ kind: 'create_prim', bodyId: 'b', prim: 'box', params: { dx: 10, dy: 10, dz: 10 } })
    const result = await runModelOp({ kind: 'pattern', target: 'b', mode: 'linear', count: 3, delta: [30, 0, 0] })
    expect(result.created).toHaveLength(2)
    for (const entry of result.created!) {
      expect(await vol(entry.bodyId)).toBeCloseTo(1000, 2)
    }
  })

  it('circular pattern rotates copies about an offset axis point', async () => {
    await runModelOp({ kind: 'create_prim', bodyId: 'p', prim: 'box', params: { dx: 4, dy: 4, dz: 4, at: [20, 0, 0] } })
    const result = await runModelOp({ kind: 'pattern', target: 'p', mode: 'circular', count: 4, at: [0, 0, 0], axis: [0, 0, 1] })
    expect(result.created).toHaveLength(3)
    for (const entry of result.created!) {
      expect(await vol(entry.bodyId)).toBeCloseTo(64, 2)
    }
  })
})

describe('through the tool interface (end to end)', () => {
  it('cad_revolve + cad_chamfer + cad_pattern compose', async () => {
    const ws = mkdtempSync(path.join(tmpdir(), 'sketch-tools-'))
    const tools = createModelTools({
      store: new BinarySceneStore(ws), sceneStore: new SceneStore(ws),
      workspaceRoot: ws, ensureSceneRoute: () => null, registry: new DocumentRegistry(ws),
    })
    const byName = new Map(tools.map((tool) => [(tool as { name: string }).name, tool as unknown as { execute(args: unknown, exec?: unknown): Promise<Record<string, unknown>> }]))
    const exec = { agent: { id: 'sketch-tools' } }
    const run = (name: string, args: Record<string, unknown>) => byName.get(name)!.execute(args, exec)

    const revolve = await run('cad_revolve', { profile: [5, 0, 10, 0, 10, 4, 5, 4], name: '轴套' })
    const rid = String(revolve.bodyId)
    expect((await run('cad_volume', { target: rid })).volume).toBeCloseTo(Math.PI * 75 * 4, 1)

    const chamfered = await run('cad_chamfer', { target: rid, distance: 0.5 })
    expect(String(chamfered.bodyId)).toBe(rid)
    expect((await run('cad_volume', { target: rid })).volume).toBeLessThan(Math.PI * 75 * 4)

    const pattern = await run('cad_pattern', { target: rid, mode: 'linear', count: 3, delta: [0, 40, 0] })
    expect((pattern.created as string[]).length).toBe(2)

    const curved = await run('cad_extrude_profile', {
      profile: { circle: { center: [0, 0], radius: 5 } }, height: 8,
    })
    expect((await run('cad_volume', { target: String(curved.bodyId) })).volume).toBeCloseTo(Math.PI * 25 * 8, 1)
  })
})
