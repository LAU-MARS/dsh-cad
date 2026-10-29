/**
 * STEP assembly import (worker integration, cadorange backend): the
 * probe → materialize pipeline, part dedupe (N instances of one body), and
 * the dsh-cad export → import round-trip. Real kernel shapes through the
 * shared modeling worker.
 */
import { copyFile, mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { runModelOp } from '../src/modeling/client.js'
import { resolveCadorangeDist } from '../src/modeling/cadorange-bridge.cjs'

/** import_step needs the cadorange backend (structured XCAF read). */
const cadorangeAvailable = resolveCadorangeDist() !== null
const SAMPLE = fileURLToPath(new URL('../简单装配体.step', import.meta.url))

describe('modeling worker: import_step (integration)', () => {
  beforeEach(async () => {
    await runModelOp({ kind: 'reset' })
  })

  afterEach(async () => {
    await runModelOp({ kind: 'reset' })
  })

  it('round-trips an exported assembly: N leaves, deduped parts, placements back', { timeout: 180_000 }, async () => {
    if (!cadorangeAvailable) throw new Error('cadorange not resolvable — run npm install first (or check the sibling checkout)')
    // Two distinct bodies, three instances — the gear-array shape.
    await runModelOp({ kind: 'create_prim', bodyId: 'b1', prim: 'box', params: { dx: 10, dy: 10, dz: 10 }, name: 'bolt' })
    await runModelOp({ kind: 'create_prim', bodyId: 'b2', prim: 'box', params: { dx: 5, dy: 5, dz: 5 }, name: 'plate' })
    await runModelOp({ kind: 'assembly_insert', instanceId: 'a1', bodyId: 'b1', name: 'bolt', translate: [0, 0, 0] })
    await runModelOp({ kind: 'assembly_insert', instanceId: 'a2', bodyId: 'b1', name: 'bolt', translate: [30, 0, 0] })
    await runModelOp({ kind: 'assembly_insert', instanceId: 'a3', bodyId: 'b2', name: 'plate', translate: [0, 0, 20] })
    const exported = await runModelOp({ kind: 'export_assembly', format: 'step' })
    expect(exported.bytes).toBeDefined()

    const dir = await mkdtemp(path.join(tmpdir(), 'dsh-cad-step-'))
    const asset = path.join(dir, 'assembly.step')
    await writeFile(asset, Buffer.from(exported.bytes))

    // Import standalone: the built assembly above is gone (fresh worker
    // state) — everything below comes from the STEP file alone.
    await runModelOp({ kind: 'reset' })

    // Probe: two unique parts (the two bolts dedupe), three placed leaves.
    const probe = await runModelOp({ kind: 'import_step', path: asset })
    const structure = probe.stepStructure
    expect(structure).toBeDefined()
    expect(structure!.parts).toHaveLength(2)
    expect(structure!.leaves).toHaveLength(3)

    // Materialize with caller-assigned ids: bodies = unique parts, instances
    // = leaves referencing them.
    const bodies = structure!.parts.map((part, index) => ({ bodyId: `imp${index + 1}`, name: part.name }))
    const instances = structure!.leaves.map((leaf, index) => ({
      instanceId: `ia${index + 1}`,
      bodyId: bodies[leaf.part]!.bodyId,
      name: leaf.name,
      translate: leaf.translate,
      rotate: leaf.rotate,
    }))
    const done = await runModelOp({ kind: 'import_step', path: asset, bodies, instances })
    expect(done.meshes).toHaveLength(2)
    expect(done.instances).toHaveLength(3)
    // Every leaf maps back onto its original placement (translate tolerance:
    // Euler round-trips are exact for these principal rotations).
    const byId = new Map(done.instances!.map((instance) => [instance.instanceId, instance]))
    expect(byId.get('ia2')!.translate[0]).toBeCloseTo(30, 3)
    expect(byId.get('ia3')!.translate[2]).toBeCloseTo(20, 3)
    for (const instance of done.instances!) {
      expect(instance.translate.every(Number.isFinite)).toBe(true)
      expect(instance.rotate.every(Number.isFinite)).toBe(true)
    }
  })

  it('probes a real-world STEP file (简单装配体.step)', { timeout: 120_000 }, async () => {
    if (!cadorangeAvailable) throw new Error('cadorange not resolvable — run npm install first (or check the sibling checkout)')
    const dir = await mkdtemp(path.join(tmpdir(), 'dsh-cad-step-sample-'))
    const asset = path.join(dir, 'sample.step')
    await copyFile(SAMPLE, asset)
    const probe = await runModelOp({ kind: 'import_step', path: asset })
    expect(probe.stepStructure!.parts.length).toBeGreaterThanOrEqual(1)
    expect(probe.stepStructure!.leaves.length).toBeGreaterThanOrEqual(probe.stepStructure!.parts.length)
    for (const leaf of probe.stepStructure!.leaves) {
      expect(leaf.translate.every(Number.isFinite)).toBe(true)
      expect(leaf.part).toBeGreaterThanOrEqual(0)
      expect(leaf.part).toBeLessThan(probe.stepStructure!.parts.length)
    }
  })
})
