/**
 * Joint-driven assembly through the REAL tool family: define joints, connect
 * (pairing solve), drive (motion re-solve), explode, and the assembly info
 * read — then a second session opens the document and sees the identical
 * state (op-log replay restores placements AND joint metadata). Runs the
 * shared modeling worker; joints are kernel-independent placement math.
 */
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { createModelTools } from '../src/tools/cad-model.js'
import { DocumentRegistry } from '../src/modeling/registry.js'
import { BinarySceneStore } from '../src/modeling/bin-store.js'
import { SceneStore } from '../src/store.js'
import { resolveDistDir } from '../src/modeling/occt-bridge.cjs'

const kernelAvailable = resolveDistDir() !== null

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

const closeTo = (actual: unknown, expected: number, epsilon = 1e-6): void => {
  expect(Math.abs(Number(actual) - expected)).toBeLessThan(epsilon)
}

describe('assembly joint tools (integration)', () => {
  it('defines → connects → drives → explodes, and replays for a second session', { timeout: 180_000 }, async () => {
    if (!kernelAvailable) throw new Error('modeling kernel not found — run npm install first')
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-joints-'))
    const tools = await buildTools(workspace)
    const run = (name: string, args: Record<string, unknown>, session: string) =>
      tools.get(name)!.execute(args, { agent: { id: session } })

    await run('cad_doc_new', { name: '关节装配' }, 's1')
    const base = await run('cad_create_prim', { kind: 'box', dx: 40, dy: 40, dz: 10, name: 'base' }, 's1')
    const arm = await run('cad_create_prim', { kind: 'box', dx: 8, dy: 8, dz: 60, name: 'arm' }, 's1')
    const baseId = String(base.bodyId)
    const armId = String(arm.bodyId)

    const baseInstance = await run('cad_assembly_insert', { bodyId: baseId }, 's1')
    const baseInstanceId = String(baseInstance.instanceId)
    const armInstance = await run('cad_assembly_insert', { bodyId: armId, at: [20, 0, 0] }, 's1')
    const armInstanceId = String(armInstance.instanceId)

    // Joints: a hinge on the base (axis +Z at the base's local origin) and a
    // rigid mount on the arm (at the arm's local origin).
    await run('cad_assembly_joint', {
      instanceId: baseInstanceId,
      label: 'hinge',
      joint: { type: 'revolute', axis: [0, 0, 1], angularRange: [-90, 90] },
    }, 's1')
    await run('cad_assembly_joint', {
      instanceId: armInstanceId,
      label: 'mount',
      joint: { type: 'rigid', at: [0, 0, 0] },
    }, 's1')

    // Connect repositions the arm onto the hinge frames (identity placement).
    const connected = await run('cad_assembly_connect', {
      instanceId: armInstanceId,
      parent: baseInstanceId,
      parentLabel: 'hinge',
      childLabel: 'mount',
    }, 's1')
    const placement = connected.placement as { translate: number[]; rotate: number[] }
    closeTo(placement.translate[0], 0)
    closeTo(placement.rotate[2], 0)

    // Drive the hinge to 90°: the arm follows (motion re-solve).
    const driven = await run('cad_assembly_drive', {
      instanceId: baseInstanceId,
      label: 'hinge',
      value: 90,
    }, 's1')
    const moved = driven.moved as Array<{ instanceId: string; rotate: number[] }>
    expect(moved).toHaveLength(1)
    expect(moved[0]!.instanceId).toBe(armInstanceId)
    closeTo(moved[0]!.rotate[2], 90)

    // Range enforcement from the joint's angularRange.
    await expect(run('cad_assembly_drive', {
      instanceId: baseInstanceId,
      label: 'hinge',
      value: 120,
    }, 's1')).rejects.toThrow(/超出范围|outside/)

    // Exploded view factor.
    const exploded = await run('cad_assembly_explode', { factor: 1 }, 's1')
    expect(exploded.explode).toBe(1)

    // The info read mirrors everything.
    const info = await run('cad_assembly_info', {}, 's1')
    const infoJoints = info.joints as Array<{ instance: string; label: string; type: string; value?: string }>
    expect(infoJoints.some((joint) => joint.label === 'hinge' && joint.value === '90°')).toBe(true)
    const infoConnections = info.connections as Array<{ child: string; parent: string }>
    expect(infoConnections).toEqual([{ child: armInstanceId, parent: baseInstanceId, parentLabel: 'hinge', childLabel: 'mount' }])
    expect(info.explode).toBe(1)

    // A second session opens the document: replay restores placements AND
    // joint state (the drive result survives the worker reset).
    const reopened = await run('cad_doc_open', { doc: '关节装配' }, 's2')
    expect(reopened.bodies).toBe(2)
    const replayed = await run('cad_assembly_info', {}, 's2')
    const replayedArm = (replayed.instances as Array<{ instanceId: string; rotate: number[] }>)
      .find((instance) => instance.instanceId === armInstanceId)
    closeTo(replayedArm!.rotate[2], 90)
    expect((replayed.joints as Array<{ label: string; value?: string }>)
      .some((joint) => joint.label === 'hinge' && joint.value === '90°')).toBe(true)
    expect(replayed.explode).toBe(1)
  })

  it('rejects unknown instances, labels and illegal pairings with precise errors', { timeout: 120_000 }, async () => {
    if (!kernelAvailable) throw new Error('modeling kernel not found — run npm install first')
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-joints-errors-'))
    const tools = await buildTools(workspace)
    const run = (name: string, args: Record<string, unknown>, session: string) =>
      tools.get(name)!.execute(args, { agent: { id: session } })

    await run('cad_create_prim', { kind: 'box', dx: 10, dy: 10, dz: 10, name: 'solo' }, 's1')
    const inserted = await run('cad_assembly_insert', { bodyId: 'b1' }, 's1')
    const instanceId = String(inserted.instanceId)

    await expect(run('cad_assembly_joint', {
      instanceId: 'a99', label: 'x', joint: { type: 'rigid' },
    }, 's1')).rejects.toThrow(/unknown instance/)
    await expect(run('cad_assembly_joint', {
      instanceId, label: 'x', joint: { type: 'weld' },
    }, 's1')).rejects.toThrow(/type must be one of/)
    await expect(run('cad_assembly_connect', {
      instanceId, parent: instanceId, parentLabel: 'missing', childLabel: 'also',
    }, 's1')).rejects.toThrow(/no joint "missing"/)

    // revolute parent ↔ revolute child violates the pairing table.
    await run('cad_assembly_joint', { instanceId, label: 'a', joint: { type: 'revolute' } }, 's1')
    await expect(run('cad_assembly_connect', {
      instanceId, parent: instanceId, parentLabel: 'a', childLabel: 'a',
    }, 's1')).rejects.toThrow(/revolute joint connects to rigid/)
  })
})
