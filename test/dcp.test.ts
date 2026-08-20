/**
 * .dcprt native part-document round-trip: model → serialize → reopen via the
 * converter (dedicated worker replay) → scene assertions.
 */
import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { runModelOp } from '../src/modeling/client.js'
import type { ModelOp } from '../src/modeling/client.js'
import { ModelDocument } from '../src/modeling/document.js'
import { convert } from '../src/convert/index.js'
import { toDcPrtDocument, isDcPrtDocument } from '../src/feature_script/dc_prt.js'

let workspace: string

beforeAll(async () => {
  workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-dcp-'))
})

afterAll(async () => {
  await rm(workspace, { recursive: true, force: true })
})

describe('dcprt document format', () => {
  it('serializes a modeling document with header, version and bodies', async () => {
    const document = new ModelDocument(workspace)
    const ops: ModelOp[] = [
      { kind: 'create_prim', bodyId: 'plate', prim: 'box', params: { dx: 100, dy: 60, dz: 5 }, name: 'plate' },
    ]
    await runModelOp({ kind: 'reset' })
    await runModelOp(ops[0]!)
    await document.record(ops[0]!, { bodyId: 'plate', name: 'plate' })

    const dcprt = toDcPrtDocument(document.doc)
    expect(dcprt.header.format).toBe('dcprt')
    expect(dcprt.version).toBe(1)
    expect(dcprt.features).toEqual(ops)
    expect(dcprt.bodies).toEqual([{ bodyId: 'plate', name: 'plate' }])
    expect(isDcPrtDocument(JSON.parse(JSON.stringify(dcprt)))).toBe(true)
    expect(isDcPrtDocument({ header: { format: 'dcasm' }, features: [] })).toBe(false)
  }, 120_000)

  it('round-trips through the converter with exact bounds', async () => {
    // Plate with a center hole — bounds stay 0..100 × 0..60 × 0..5 after the cut.
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 'plate', prim: 'box', params: { dx: 100, dy: 60, dz: 5 } })
    await runModelOp({ kind: 'create_prim', bodyId: 'hole', prim: 'cylinder', params: { radius: 10, height: 20, at: [50, 30, 0] } })
    await runModelOp({ kind: 'boolean', op: 'cut', target: 'plate', tools: ['hole'] })

    const document = new ModelDocument(workspace)
    const ops: ModelOp[] = [
      { kind: 'create_prim', bodyId: 'plate', prim: 'box', params: { dx: 100, dy: 60, dz: 5 } },
      { kind: 'create_prim', bodyId: 'hole', prim: 'cylinder', params: { radius: 10, height: 20, at: [50, 30, 0] } },
      { kind: 'boolean', op: 'cut', target: 'plate', tools: ['hole'] },
    ]
    for (const op of ops) await document.record(op, null)

    const buffer = Buffer.from(JSON.stringify(toDcPrtDocument(document.doc)))
    const scene = await convert(buffer, 'dcprt', 'plate.dcprt')
    if (scene.kind !== '3d') throw new Error('expected a 3D scene')
    expect(scene.format).toBe('dcprt')
    expect(scene.units).toBe('mm')
    expect(scene.meshes).toHaveLength(1)
    expect(scene.meshes[0]!.triangleCount).toBeGreaterThan(12)
    expect(scene.bounds.min.x).toBeCloseTo(0, 1)
    expect(scene.bounds.min.y).toBeCloseTo(0, 1)
    expect(scene.bounds.min.z).toBeCloseTo(0, 1)
    expect(scene.bounds.max.x).toBeCloseTo(100, 1)
    expect(scene.bounds.max.y).toBeCloseTo(60, 1)
    expect(scene.bounds.max.z).toBeCloseTo(5, 1)
  }, 120_000)

  it('reports the failing feature index on a broken history', async () => {
    const broken = {
      header: { format: 'dcprt', version: 1, units: 'mm', upAxis: 'Z' },
      docId: 'broken',
      features: [{ kind: 'create_prim', bodyId: 'x', prim: 'nonexistent' }],
      bodies: [],
    }
    await expect(convert(Buffer.from(JSON.stringify(broken)), 'dcprt', 'broken.dcprt')).rejects.toThrow(/replay failed at feature 0/)
  }, 120_000)

  it('rejects non-dcprt JSON', async () => {
    await expect(convert(Buffer.from('{"hello":1}'), 'dcprt', 'fake.dcprt')).rejects.toThrow(/not a DCPRT part document/)
  })
})
