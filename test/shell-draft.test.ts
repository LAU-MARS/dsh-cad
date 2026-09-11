/**
 * Shell (抽壳) and draft (拔模) — the two ops that only the occt.ts kernel
 * provides (opencascade.js binds them as opaque no-method shells). Geometry
 * crosses kernels as STEP bytes; the result stays HOSTED on the occt.ts side,
 * which the tests also verify (volume via the bridge, refusal of
 * opencascade.js-only edits, .step export straight from the hosted bytes).
 *
 * Exact expectations:
 *  - shell box 10³ t=1 open top → 1000 − interior 8×8×9 = 424
 *  - sealed shell               → 1000 − interior 8×8×8 = 488
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { runModelOp } from '../src/modeling/client.js'
import { resolveDistDir } from '../src/modeling/occt-bridge.cjs'

const occtsAvailable = resolveDistDir() !== null

describe('shell (抽壳, occt.ts-hosted)', () => {
  beforeEach(async () => { await runModelOp({ kind: 'reset' }) })
  afterEach(async () => { await runModelOp({ kind: 'reset' }) })

  it('hollows a box with the top open (424 exact)', async () => {
    if (!occtsAvailable) throw new Error('occt.ts kernel not found — npm install first')
    await runModelOp({ kind: 'create_prim', bodyId: 'b', prim: 'box', params: { dx: 10, dy: 10, dz: 10 } })
    const result = await runModelOp({ kind: 'shell', target: 'b', thickness: 1, openNormals: [[0, 0, 1]] })
    expect(result.bodyId).toBe('b')
    expect(result.volume).toBeCloseTo(424, 0)
    // The hosted mesh came back for display.
    expect(result.mesh!.triangleCount).toBeGreaterThan(10)
  })

  it('seals the hollow with no openings (488 exact)', async () => {
    await runModelOp({ kind: 'create_prim', bodyId: 'b', prim: 'box', params: { dx: 10, dy: 10, dz: 10 } })
    const result = await runModelOp({ kind: 'shell', target: 'b', thickness: 1 })
    expect(result.volume).toBeCloseTo(488, 0)
  })

  it('answers cad_volume on a hosted body through the bridge', async () => {
    await runModelOp({ kind: 'create_prim', bodyId: 'b', prim: 'box', params: { dx: 10, dy: 10, dz: 10 } })
    await runModelOp({ kind: 'shell', target: 'b', thickness: 1, openNormals: [[0, 0, 1]] })
    const v = await runModelOp({ kind: 'volume', target: 'b' })
    expect(v.volume).toBeCloseTo(424, 0)
  })

  it('KEEPS EDITING after shell on the single kernel (the v0.8 seam is gone)', async () => {
    await runModelOp({ kind: 'create_prim', bodyId: 'b', prim: 'box', params: { dx: 20, dy: 20, dz: 20 } })
    const shelled = await runModelOp({ kind: 'shell', target: 'b', thickness: 2, openNormals: [[0, 0, 1]] })
    // 8000 − interior 16×16×18 (open top, inner floor at z=2)
    expect(shelled.volume).toBeCloseTo(3392, 0)
    // Fillet and chamfer after shelling — refused with a hosted-body error in
    // v0.8, native on the single occt.ts kernel. Independent bodies: a fillet
    // consumes the sharp edges, leaving nothing for a later chamfer.
    const filleted = await runModelOp({ kind: 'fillet', target: 'b', radius: 0.5 })
    expect(filleted.bodyId).toBe('b')
    const v1 = await runModelOp({ kind: 'volume', target: 'b' })
    expect(v1.volume).toBeLessThan(3392)
    await runModelOp({ kind: 'create_prim', bodyId: 'c', prim: 'box', params: { dx: 20, dy: 20, dz: 20 } })
    await runModelOp({ kind: 'shell', target: 'c', thickness: 2, openNormals: [[0, 0, 1]] })
    const chamfered = await runModelOp({ kind: 'chamfer', target: 'c', distance: 0.3 })
    expect(chamfered.bodyId).toBe('c')
    const v2 = await runModelOp({ kind: 'volume', target: 'c' })
    expect(v2.volume).toBeLessThan(3392)
  })

  it('exports a hosted body as valid STEP straight from the hosted bytes', async () => {
    await runModelOp({ kind: 'create_prim', bodyId: 'b', prim: 'box', params: { dx: 10, dy: 10, dz: 10 } })
    await runModelOp({ kind: 'shell', target: 'b', thickness: 1, openNormals: [[0, 0, 1]] })
    const exported = await runModelOp({ kind: 'export', target: 'b', format: 'step' })
    const text = new TextDecoder().decode(new Uint8Array(exported.bytes!))
    expect(text.startsWith('ISO-10303-21')).toBe(true)
  })
})

describe('draft (拔模, occt.ts-hosted)', () => {
  beforeEach(async () => { await runModelOp({ kind: 'reset' }) })
  afterEach(async () => { await runModelOp({ kind: 'reset' }) })

  it('tilts the walls of a box by 5° (volume changes, shape stays valid)', async () => {
    if (!occtsAvailable) throw new Error('occt.ts kernel not found')
    await runModelOp({ kind: 'create_prim', bodyId: 'b', prim: 'box', params: { dx: 20, dy: 10, dz: 5 } })
    const result = await runModelOp({ kind: 'draft', target: 'b', angle: 5, direction: [0, 0, 1] })
    expect(result.bodyId).toBe('b')
    // Walls tilt about the neutral plane; the volume moves by a small single-
    // digit percentage rather than collapsing.
    expect(result.volume).toBeGreaterThan(900)
    expect(result.volume).toBeLessThan(1100)
    expect(result.mesh!.triangleCount).toBeGreaterThan(10)
  })

  it('composes: shell after draft keeps the hosted chain intact', async () => {
    await runModelOp({ kind: 'create_prim', bodyId: 'b', prim: 'box', params: { dx: 20, dy: 10, dz: 5 } })
    const drafted = await runModelOp({ kind: 'draft', target: 'b', angle: 3, direction: [0, 0, 1] })
    const shelled = await runModelOp({ kind: 'shell', target: 'b', thickness: 0.8 })
    expect(shelled.volume).toBeLessThan(drafted.volume)
    expect(shelled.mesh!.triangleCount).toBeGreaterThan(10)
  })
})
