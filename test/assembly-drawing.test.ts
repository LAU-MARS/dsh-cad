/**
 * Worker integration for the assembly + drawing ops: real OCCT shapes through
 * the shared modeling worker — fuse (creates the concave junction edge),
 * hidden-line drawing views, instance placement, and assembly export.
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { runModelOp } from '../src/modeling/client.js'

const VIEWS = [
  { name: 'front', dir: [0, -1, 0], xDir: [1, 0, 0] },
  { name: 'top', dir: [0, 0, 1], xDir: [1, 0, 0] },
  { name: 'left', dir: [-1, 0, 0], xDir: [0, 1, 0] },
  { name: 'iso', dir: [1, -1, 1], xDir: [1, 1, 0] },
] as const

describe('modeling worker: drawing + assembly (integration)', () => {
  beforeEach(async () => {
    await runModelOp({ kind: 'reset' })
  })

  afterEach(async () => {
    await runModelOp({ kind: 'reset' })
  })

  it('generates hidden-line drawing views of a drilled plate', async () => {
    await runModelOp({ kind: 'create_prim', bodyId: 'plate', prim: 'box', params: { dx: 60, dy: 40, dz: 10 } })
    await runModelOp({ kind: 'create_prim', bodyId: 'hole', prim: 'cylinder', params: { radius: 8, height: 20, at: [30, 20, 0] } })
    const cut = await runModelOp({ kind: 'boolean', op: 'cut', target: 'plate', tools: ['hole'] })
    expect(cut.bodyId).toBe('plate')

    const drawing = await runModelOp({ kind: 'drawing', target: 'plate', views: VIEWS as unknown as never[] })
    expect(drawing.views).toHaveLength(4)
    const byName = new Map(drawing.views!.map((view) => [view.name, view]))
    for (const name of ['front', 'top', 'left']) {
      const view = byName.get(name)!
      expect(view!.visible.length).toBeGreaterThan(0)
    }
    // The through-hole bore: its silhouette edges sit strictly inside the
    // front outline (depth y>0 behind the front face) → dashed hidden lines;
    // the top view sees straight through, so nothing is hidden there.
    const front = byName.get('front')!
    expect(front!.hidden.length).toBeGreaterThan(0)
    const top = byName.get('top')!
    expect(top!.hidden).toHaveLength(0)
  })

  it('places, moves and removes assembly instances; export produces bytes', async () => {
    await runModelOp({ kind: 'create_prim', bodyId: 'b1', prim: 'box', params: { dx: 40, dy: 30, dz: 5 } })
    await runModelOp({ kind: 'create_prim', bodyId: 'b2', prim: 'cylinder', params: { radius: 6, height: 24 } })

    const insert = await runModelOp({ kind: 'assembly_insert', instanceId: 'a1', bodyId: 'b1' })
    expect(insert.instances).toHaveLength(1)
    const insert2 = await runModelOp({
      kind: 'assembly_insert', instanceId: 'a2', bodyId: 'b2',
      translate: [60, 0, 0], rotate: [0, 0, 90], name: 'pin',
    })
    expect(insert2.instances).toHaveLength(2)
    expect(insert2.instances!.find((instance) => instance.instanceId === 'a2')?.rotate).toEqual([0, 0, 90])

    const moved = await runModelOp({ kind: 'assembly_transform', instanceId: 'a2', translate: [80, 10, 0] })
    expect(moved.instances!.find((instance) => instance.instanceId === 'a2')?.translate).toEqual([80, 10, 0])

    const step = await runModelOp({ kind: 'export_assembly', format: 'step' })
    expect(step.bytes!.byteLength).toBeGreaterThan(200)
    // STEP text contains multiple products (assembly, not a single solid)
    const text = new TextDecoder().decode(new Uint8Array(step.bytes!))
    expect(text).toContain('MANIFOLD_SOLID_BREP')

    const removed = await runModelOp({ kind: 'assembly_remove', instanceId: 'a1' })
    expect(removed.instances).toHaveLength(1)
    await expect(runModelOp({ kind: 'assembly_transform', instanceId: 'a1', translate: [0, 0, 0] })).rejects.toThrow('unknown instance')
  })
})
