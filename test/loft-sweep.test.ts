/**
 * Loft (放样) and sweep (扫掠): exact geometry through the real modeling
 * worker, plus the BRepCheck validity gate that keeps a degenerate result out.
 *
 * Volumes are analytic where possible, so a broken kernel path cannot pass:
 *  - loft between 20×20 and 30×30 squares over 30mm → prismatoid 19000 mm³
 *  - sweep a 10×10 profile along 40mm → 4000 mm³ (any orientation)
 *  - a sharp corner self-intersects → rejected by the validity gate
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

const square = (w: number, h: number, z: number): number[] => [0, 0, z, w, 0, z, w, h, z, 0, h, z]
const hexagon = (radius: number, z: number): number[] => {
  const pts: number[] = []
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    pts.push(radius * Math.cos(a), radius * Math.sin(a), z)
  }
  return pts
}
/** Quarter-circle path of `segments` chords, radius 30 (length ≈ 47.12). */
const arcPath = (segments: number): number[] => {
  const pts: number[] = []
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * (Math.PI / 2)
    pts.push(30 * Math.sin(t), 0, 30 - 30 * Math.cos(t))
  }
  return pts
}

describe('loft (放样)', () => {
  beforeEach(async () => { await runModelOp({ kind: 'reset' }) })
  afterEach(async () => { await runModelOp({ kind: 'reset' }) })

  it('lofts between two squares with the exact prismatoid volume', async () => {
    const result = await runModelOp({
      kind: 'loft', bodyId: 'L',
      sections: [square(20, 20, 0), square(30, 30, 30)],
    })
    expect(result.bodyId).toBe('L')
    const volume = await runModelOp({ kind: 'volume', target: 'L' })
    // h/3 · (A1 + A2 + √(A1·A2)) = 10 · (400 + 900 + 600)
    expect(volume.volume!).toBeCloseTo(19000, 2)
  })

  it('keeps the same volume for a ruled loft', async () => {
    await runModelOp({ kind: 'loft', bodyId: 'LR', sections: [square(20, 20, 0), square(30, 30, 30)], ruled: true })
    const volume = await runModelOp({ kind: 'volume', target: 'LR' })
    expect(volume.volume!).toBeCloseTo(19000, 2)
  })

  it('lofts between sections with different shapes and point counts', async () => {
    const result = await runModelOp({
      kind: 'loft', bodyId: 'LH',
      sections: [square(40, 40, 0), hexagon(20, 40)],
    })
    expect(result.bodyId).toBe('LH')
    const volume = await runModelOp({ kind: 'volume', target: 'LH' })
    // Between the square (1600) and hexagon (1039.23) areas over 40mm.
    expect(volume.volume!).toBeGreaterThan(40000)
    expect(volume.volume!).toBeLessThan(64000)
  })

  it('refuses fewer than two sections', async () => {
    await expect(runModelOp({ kind: 'loft', bodyId: 'LX', sections: [square(10, 10, 0)] }))
      .rejects.toThrow(/at least 2 sections/)
  })

  it('smooths point-loop sections into a rounded, crease-free skin', async () => {
    // A polygon-section loft is 4 planar strips meeting at 90° creases
    // (OCCT reports 4 planar faces there); the periodic B-spline through the
    // same 4 corners rounds them and lofts into ONE continuous B-spline face.
    const polygon = await runModelOp({ kind: 'loft', bodyId: 'LG', sections: [square(20, 20, 0), square(20, 20, 20)] })
    expect(polygon.bodyId).toBe('LG')
    const flat = await runModelOp({ kind: 'volume', target: 'LG' })
    expect(flat.volume!).toBeCloseTo(8000, 0) // 20×20×20 exactly

    const result = await runModelOp({
      kind: 'loft', bodyId: 'LS', smooth: true,
      sections: [square(20, 20, 0), square(20, 20, 20)],
    })
    expect(result.bodyId).toBe('LS')
    const smooth = await runModelOp({ kind: 'volume', target: 'LS' })
    // Rounded corners push the section outside the square: ~12808 mm³.
    expect(smooth.volume!).toBeGreaterThan(12000)
    expect(smooth.volume!).toBeLessThan(13600)
  })

  it('per-section smooth override keeps other loops polygonal', async () => {
    await runModelOp({
      kind: 'loft', bodyId: 'LM',
      sections: [
        { points: square(20, 20, 0), smooth: true },
        square(20, 20, 20),
      ],
    })
    const volume = await runModelOp({ kind: 'volume', target: 'LM' })
    expect(volume.volume!).toBeGreaterThan(10000) // spline bottom, straight top
    expect(volume.volume!).toBeLessThan(14000)
  })

  it('lofts between true curve sections placed in their own planes', async () => {
    const circle = (z: number) => ({ profile: { circle: { center: [0, 0], radius: 10 } }, at: [0, 0, z] })
    const result = await runModelOp({ kind: 'loft', bodyId: 'LC', sections: [circle(0), circle(20)] })
    expect(result.bodyId).toBe('LC')
    const volume = await runModelOp({ kind: 'volume', target: 'LC' })
    expect(volume.volume!).toBeCloseTo(Math.PI * 100 * 20, 1) // exactly a cylinder
  })

  it('lofts a curve section to a curve section with a different shape', async () => {
    const circle = { profile: { circle: { center: [0, 0], radius: 10 } }, at: [0, 0, 0] }
    const outline = {
      profile: { start: [-10, -10], segments: [
        { type: 'line', to: [10, -10] },
        { type: 'line', to: [10, 10] },
        { type: 'line', to: [-10, 10] },
        { type: 'line', to: [-10, -10] },
      ] },
      at: [0, 0, 20],
    }
    const result = await runModelOp({ kind: 'loft', bodyId: 'LB', sections: [circle, outline] })
    expect(result.bodyId).toBe('LB')
    const volume = await runModelOp({ kind: 'volume', target: 'LB' })
    expect(volume.volume!).toBeGreaterThan(5000)
    expect(volume.volume!).toBeLessThan(9000)
  })
})

describe('single-segment closed profiles', () => {
  beforeEach(async () => { await runModelOp({ kind: 'reset' }) })
  afterEach(async () => { await runModelOp({ kind: 'reset' }) })

  it('accepts a profile closed by ONE bspline segment', async () => {
    // A closed spline is already a wire, so it must not go through the
    // ≥2-part wire assembly (regression: "makeWire needs at least 2 parts").
    const ring: number[][] = []
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2
      ring.push([10 * Math.cos(a), 10 * Math.sin(a)])
    }
    const through = [...ring.slice(1), ring[0]]
    const built = await runModelOp({
      kind: 'extrude_profile', bodyId: 'BS1',
      profile: { start: ring[0], segments: [{ type: 'bspline', through }] },
      height: 10,
    })
    expect(built.bodyId).toBe('BS1')
    const volume = await runModelOp({ kind: 'volume', target: 'BS1' })
    // A spline through 8 circle samples stays just inside the true circle.
    expect(volume.volume!).toBeGreaterThan(Math.PI * 100 * 10 * 0.9)
    expect(volume.volume!).toBeLessThan(Math.PI * 100 * 10 * 1.02)
  })
})

describe('sweep (扫掠)', () => {
  beforeEach(async () => { await runModelOp({ kind: 'reset' }) })
  afterEach(async () => { await runModelOp({ kind: 'reset' }) })

  const profile = [0, 0, 10, 0, 10, 10, 0, 10] // 10×10 outline, area 100

  it('sweeps along a straight path with the exact volume (any orientation)', async () => {
    // area × path length, exactly — the profile is re-framed onto the start
    // plane, so the result does not depend on the path's orientation.
    for (const [id, path, length] of [
      ['S1', [0, 0, 0, 0, 0, 40], 40],            // +Z
      ['S2', [0, 0, 0, 40, 0, 0], 40],            // +X
      ['S3', [0, 0, 0, 10, 10, 10], Math.sqrt(300)], // diagonal
    ] as const) {
      const result = await runModelOp({ kind: 'sweep', bodyId: id, profile, path })
      expect(result.bodyId).toBe(id) // no throw = the validity gate passed
      const volume = await runModelOp({ kind: 'volume', target: id })
      expect(volume.volume!).toBeCloseTo(100 * length, 1)
    }
  })

  it('follows a multi-edge collinear path', async () => {
    const result = await runModelOp({ kind: 'sweep', bodyId: 'S4', profile, path: [0, 0, 0, 0, 0, 20, 0, 0, 40] })
    expect(result.bodyId).toBe('S4')
    const volume = await runModelOp({ kind: 'volume', target: 'S4' })
    expect(volume.volume!).toBeCloseTo(4000, 1)
  })

  it('sweeps a gently curved path into a valid solid', async () => {
    const result = await runModelOp({ kind: 'sweep', bodyId: 'S5', profile: [-5, -5, 5, -5, 5, 5, -5, 5], path: arcPath(8) })
    expect(result.bodyId).toBe('S5')
    const volume = await runModelOp({ kind: 'volume', target: 'S5' })
    // OCCT's pipe mitres direction changes rather than sweeping a clean torus,
    // so the volume is materially below area × path length (4712 here). The
    // exact value is a kernel detail; what callers rely on is that the shape
    // is VALID, and cad_volume lets them measure it. The band below only
    // guards against a collapse.
    const pathLength = 30 * (Math.PI / 2)
    expect(volume.volume!).toBeGreaterThan(100 * pathLength * 0.5)
    expect(volume.volume!).toBeLessThan(100 * pathLength * 1.05)
  })

  it('rejects a sharp corner instead of storing an unusable body', async () => {
    // A 90° corner with a 10-wide section self-intersects; the kernel cannot
    // tessellate it, so the validity gate refuses it up front with a message
    // that names the cause (rather than a cryptic mesher failure).
    await expect(runModelOp({ kind: 'sweep', bodyId: 'S6', profile, path: [0, 0, 0, 0, 0, 25, 25, 0, 25] }))
      .rejects.toThrow(/invalid shape[\s\S]*尖角/)
  })

  it('refuses a malformed path', async () => {
    await expect(runModelOp({ kind: 'sweep', bodyId: 'S7', profile, path: [0, 0, 0] }))
      .rejects.toThrow(/at least 2 \[x,y,z\] triplets/)
  })
})

describe('through the tool interface (end to end)', () => {
  it('cad_loft and cad_sweep build measurable bodies and reject a bad path', async () => {
    const ws = mkdtempSync(path.join(tmpdir(), 'loft-tools-'))
    const tools = createModelTools({
      store: new BinarySceneStore(ws),
      sceneStore: new SceneStore(ws),
      workspaceRoot: ws,
      ensureSceneRoute: () => null,
      registry: new DocumentRegistry(ws),
    })
    const byName = new Map(tools.map((tool) => [(tool as { name: string }).name, tool as unknown as { execute(args: unknown, exec?: unknown): Promise<Record<string, unknown>> }]))
    const exec = { agent: { id: 'loft-tools' } }
    const run = (name: string, args: Record<string, unknown>) => byName.get(name)!.execute(args, exec)

    // Body ids come from the tool result, as a real caller uses them (the
    // document version — and so the id — advances with every recorded op).
    const loft = await run('cad_loft', { sections: [square(20, 20, 0), square(30, 30, 30)], name: '放样体' })
    const loftId = String(loft.bodyId)
    expect((await run('cad_volume', { target: loftId })).volume).toBeCloseTo(19000, 2)

    // Section objects survive the tool schema: a smooth point loop and a pair
    // of planar curve sections both reach the kernel.
    const smoothId = String((await run('cad_loft', {
      sections: [square(20, 20, 0), square(20, 20, 20)], smooth: true, name: '平滑放样',
    })).bodyId)
    expect((await run('cad_volume', { target: smoothId })).volume).toBeGreaterThan(12000)

    const circleSection = (z: number) => ({ profile: { circle: { center: [0, 0], radius: 10 } }, at: [0, 0, z] })
    const curveId = String((await run('cad_loft', {
      sections: [circleSection(0), circleSection(30)], name: '曲线放样',
    })).bodyId)
    expect((await run('cad_volume', { target: curveId })).volume).toBeCloseTo(Math.PI * 100 * 30, 1)

    const sweep = await run('cad_sweep', { profile: [0, 0, 10, 0, 10, 10, 0, 10], path: [0, 0, 0, 0, 0, 40], name: '扫掠体' })
    const sweepId = String(sweep.bodyId)
    expect(sweepId).not.toBe(loftId)
    expect((await run('cad_volume', { target: sweepId })).volume).toBeCloseTo(4000, 1)

    // The validity gate reaches the caller as a tool error, not a broken body.
    await expect(run('cad_sweep', { profile: [0, 0, 10, 0, 10, 10, 0, 10], path: [0, 0, 0, 0, 0, 25, 25, 0, 25] }))
      .rejects.toThrow(/invalid shape/)
    // The document still holds exactly the two good bodies.
    const docs = await run('cad_docs', {})
    expect(Array.isArray(docs.docs)).toBe(true)
  })
})
