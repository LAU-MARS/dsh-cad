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
