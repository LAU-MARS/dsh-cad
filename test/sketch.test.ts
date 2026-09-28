/**
 * Named sketches (Sketch1…): worker-side profile resolution by name for the
 * profile-driven features, and the tool-level parametric loop — cad_sketch_edit
 * rewrites the defining op in place and the full replay rebuilds every
 * referencing feature. Volumes are asserted analytically so a broken replay
 * (stale profile, wrong op order) cannot pass.
 */
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { runModelOp } from '../src/modeling/client.js'
import { createModelTools } from '../src/tools/cad-model.js'
import { DocumentRegistry } from '../src/modeling/registry.js'
import { BinarySceneStore } from '../src/modeling/bin-store.js'
import { SceneStore } from '../src/store.js'
import { featureTreePayload } from '../src/modeling/feature-tree.js'
import { resolveDistDir } from '../src/modeling/occt-bridge.cjs'

const occtAvailable = resolveDistDir() !== null

const RECT_10X10 = [0, 0, 10, 0, 10, 10, 0, 10]
const RECT_20X10 = [0, 0, 20, 0, 20, 10, 0, 10]
/** Rect radius 5→10, height 0→10: Pappus volume = 2π·7.5·50 when revolved. */
const RECT_RING = [5, 0, 10, 0, 10, 10, 5, 10]

interface ExecutableTool {
  name: string
  execute: (args: unknown, exec?: unknown) => Promise<Record<string, unknown>>
}

async function buildTools(workspace: string): Promise<Map<string, ExecutableTool>> {
  const registry = new DocumentRegistry(workspace)
  const tools = createModelTools({
    store: new BinarySceneStore(workspace),
    sceneStore: new SceneStore(workspace),
    workspaceRoot: workspace,
    ensureSceneRoute: () => null,
    registry,
  })
  return new Map(tools.map((tool) => {
    const entry = tool as unknown as ExecutableTool
    return [entry.name, entry]
  }))
}

describe('named sketches (worker: features resolve profiles by name)', () => {
  beforeEach(async () => {
    await runModelOp({ kind: 'reset' })
  })

  afterEach(async () => {
    await runModelOp({ kind: 'reset' })
  })

  it('extrude references a sketch by name; a redefinition affects later features', async () => {
    if (!occtAvailable) throw new Error('occt.ts kernel not found — run npm install first')
    const set = await runModelOp({ kind: 'sketch_set', name: 'Sketch1', profile: RECT_10X10 })
    expect(set.sketch).toBe('Sketch1')

    const extruded = await runModelOp({ kind: 'extrude_profile', bodyId: 'b1', sketch: 'Sketch1', height: 5 })
    expect(extruded.bodyId).toBe('b1')
    const before = await runModelOp({ kind: 'volume', target: 'b1' })
    expect(before.volume).toBeCloseTo(500, 5)

    // Redefine → a feature built AFTER the edit resolves the new profile.
    await runModelOp({ kind: 'sketch_set', name: 'Sketch1', profile: RECT_20X10 })
    await runModelOp({ kind: 'extrude_profile', bodyId: 'b2', sketch: 'Sketch1', height: 5 })
    const after = await runModelOp({ kind: 'volume', target: 'b2' })
    expect(after.volume).toBeCloseTo(1000, 5)
  })

  it('revolve and sweep also resolve named sketches', async () => {
    if (!occtAvailable) throw new Error('occt.ts kernel not found — run npm install first')
    await runModelOp({ kind: 'sketch_set', name: 'ring', profile: RECT_RING })
    await runModelOp({ kind: 'revolve', bodyId: 'r1', sketch: 'ring' })
    const revolved = await runModelOp({ kind: 'volume', target: 'r1' })
    expect(revolved.volume).toBeCloseTo(2 * Math.PI * 7.5 * 50, 2) // Pappus: 2π·x̄·A

    await runModelOp({ kind: 'sketch_set', name: 'disc', profile: { circle: { center: [0, 0], radius: 2 } } })
    await runModelOp({ kind: 'sweep', bodyId: 's1', sketch: 'disc', path: [0, 0, 0, 0, 0, 10] })
    const swept = await runModelOp({ kind: 'volume', target: 's1' })
    expect(swept.volume).toBeCloseTo(Math.PI * 4 * 10, 2)
  })

  it('unknown names, delete semantics, and reset clearing', async () => {
    if (!occtAvailable) throw new Error('occt.ts kernel not found — run npm install first')
    await expect(runModelOp({ kind: 'extrude_profile', bodyId: 'b1', sketch: 'nope', height: 5 })).rejects.toThrow(/unknown sketch: nope/)

    await runModelOp({ kind: 'sketch_set', name: 'temp', profile: RECT_10X10 })
    await runModelOp({ kind: 'sketch_delete', name: 'temp' })
    await expect(runModelOp({ kind: 'sketch_delete', name: 'temp' })).rejects.toThrow(/unknown sketch: temp/)

    // reset (document switch / restart replay) clears the sketch store too.
    await runModelOp({ kind: 'sketch_set', name: 'gone', profile: RECT_10X10 })
    await runModelOp({ kind: 'reset' })
    await expect(runModelOp({ kind: 'extrude_profile', bodyId: 'b1', sketch: 'gone', height: 5 })).rejects.toThrow(/unknown sketch: gone/)
  })

  it('sketch_set discretizes display payload: curves, vertex dots, region fill', async () => {
    if (!occtAvailable) throw new Error('occt.ts kernel not found — run npm install first')
    const polygon = await runModelOp({ kind: 'sketch_set', name: 'p', profile: RECT_10X10 })
    expect(polygon.wire).toBeDefined()
    expect(polygon.wire!.length % 3).toBe(0)
    expect(polygon.wire!.length / 3).toBeGreaterThanOrEqual(5) // 4 corners + closure
    expect(polygon.wire![0]).toBeCloseTo(0, 6)
    expect(polygon.wire![polygon.wire!.length - 3]).toBeCloseTo(polygon.wire![0], 6) // closed
    // TRUE vertex dots: the 4 polygon corners (never sampling points).
    expect(polygon.points).toBeDefined()
    expect(polygon.points!.length).toBe(12) // 4 corners × xyz
    // Enclosed region: the kernel-triangulated face (rect → 2 triangles).
    expect(polygon.fill).toBeDefined()
    expect(polygon.fill!.indices.length % 3).toBe(0)
    expect(polygon.fill!.indices.length).toBeGreaterThanOrEqual(6)

    const circle = await runModelOp({ kind: 'sketch_set', name: 'c', profile: { circle: { center: [0, 0], radius: 5 } } })
    expect(circle.wire!.length / 3).toBeGreaterThanOrEqual(65) // 96-segment sampling
    // Circle radius preserved through discretization.
    expect(Math.hypot(circle.wire![0]!, circle.wire![1]!)).toBeCloseTo(5, 3)
    // A circle carries no vertex dots, but its region still fills.
    expect(circle.points).toBeUndefined()
    expect(circle.fill!.indices.length).toBeGreaterThanOrEqual(30) // disc fan

    const chained = await runModelOp({
      kind: 'sketch_set', name: 's',
      profile: { start: [0, 0], segments: [{ type: 'line', to: [10, 0] }, { type: 'arc', to: [10, 10], center: [10, 5] }, { type: 'line', to: [0, 10] }, { type: 'line', to: [0, 0] }] },
    })
    expect(chained.wire).toBeDefined()
    expect(chained.wire!.length / 3).toBeGreaterThan(8) // lines + arc samples
    expect(chained.points!.length).toBe(15) // 5 true vertices (start + 4 ends)
    expect(chained.fill).toBeDefined()
  })
})

describe('feature tree fold (server-side payload)', () => {
  it('orders rows chronologically and resolves sketch references', () => {
    const doc = {
      docId: 'd1',
      version: 4,
      bodyNames: { b1: 'plate' },
      ops: [
        { kind: 'sketch_set', name: 'Sketch1', profile: RECT_10X10 },
        { kind: 'extrude_profile', bodyId: 'b1', sketch: 'Sketch1', height: 5 },
        { kind: 'fillet', target: 'b1', radius: 1 },
        { kind: 'sketch_set', name: 'temp', profile: RECT_10X10 },
        { kind: 'sketch_delete', name: 'temp' },
      ],
    }
    const payload = featureTreePayload(doc)
    expect(payload.rows.map((row) => row.kind)).toEqual(['sketch', 'feature', 'feature'])
    expect(payload.rows[0]).toMatchObject({ kind: 'sketch', label: 'Sketch1', sketch: 'Sketch1' })
    expect(payload.rows[1]).toMatchObject({ kind: 'feature', feature: '拉伸', label: 'plate', body: 'plate', uses: 'Sketch1' })
    expect(payload.rows[2]).toMatchObject({ kind: 'feature', feature: '圆角', label: '圆角 · plate', body: 'plate' })
    // sketch_delete drops the row (temp is gone).
    expect(payload.rows.some((row) => row.sketch === 'temp')).toBe(false)
  })
})

describe('named sketches (tools: the parametric edit loop)', () => {
  it('cad_sketch_edit rebuilds referencing features and survives a restart replay', { timeout: 180_000 }, async () => {
    if (!occtAvailable) throw new Error('occt.ts kernel not found — run npm install first')
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-sketch-'))
    const tools = await buildTools(workspace)
    const run = (name: string, args: Record<string, unknown>) =>
      tools.get(name)!.execute(args, { agent: { id: 's1' } })

    // Auto-named Sketch1, referenced by an extrusion (10×10×5 = 500 mm³).
    const created = await run('cad_sketch_new', { profile: RECT_10X10 })
    expect(created.sketch).toBe('Sketch1')
    const extruded = await run('cad_extrude_profile', { sketch: 'Sketch1', height: 5 })
    const bodyId = String(extruded.bodyId)
    let volume = await run('cad_volume', { target: bodyId })
    expect(volume.volume).toBeCloseTo(500, 5)

    // 回改: 10×10 → 20×10 — the referencing extrusion rebuilds (volume doubles).
    const edited = await run('cad_sketch_edit', { name: 'Sketch1', profile: RECT_20X10 })
    expect(edited.dependents).toEqual([bodyId])
    volume = await run('cad_volume', { target: bodyId })
    expect(volume.volume).toBeCloseTo(1000, 5)

    // Restart recovery: a fresh tool family replays the document (with the
    // REWRITTEN sketch op) and the body keeps the edited volume.
    const restarted = await buildTools(workspace)
    const reVolume = await restarted.get('cad_volume')!.execute({ target: bodyId }, { agent: { id: 's1' } })
    expect(reVolume.volume).toBeCloseTo(1000, 5)

    // Guard rails: duplicate creation, delete-while-referenced, list, clean delete.
    await expect(run('cad_sketch_new', { name: 'Sketch1', profile: RECT_10X10 })).rejects.toThrow(/already exists/)
    await expect(run('cad_sketch_delete', { name: 'Sketch1' })).rejects.toThrow(/referenced by/)

    const listed = await run('cad_sketch_list', {})
    expect(listed.sketches).toEqual([{ name: 'Sketch1', type: 'polygon', points: 4 }])

    const second = await run('cad_sketch_new', { profile: { circle: { center: [0, 0], radius: 3 } } })
    expect(second.sketch).toBe('Sketch2')
    const deleted = await run('cad_sketch_delete', { name: 'Sketch2' })
    expect(deleted.sketch).toBe('Sketch2')
    const afterDelete = await run('cad_sketch_list', {})
    expect(afterDelete.sketches).toEqual([{ name: 'Sketch1', type: 'polygon', points: 4 }])
  })
})
