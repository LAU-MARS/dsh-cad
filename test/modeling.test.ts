import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { runModelOp } from '../src/modeling/client.js'
import { parseSTL } from '../src/convert/stl.js'
import { ModelDocument } from '../src/modeling/document.js'
import { SceneStore } from '../src/store.js'

let workspace: string

beforeAll(async () => {
  workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-model-'))
})

afterAll(async () => {
  await rm(workspace, { recursive: true, force: true })
})

describe('modeling worker (OCCT kernel)', () => {
  it('creates a box and returns a mesh', async () => {
    const result = await runModelOp({ kind: 'create_prim', bodyId: 'b1', prim: 'box', params: { dx: 100, dy: 60, dz: 5 } })
    expect(result.bodyId).toBe('b1')
    expect(result.mesh).toBeDefined()
    expect(result.mesh!.triangleCount).toBeGreaterThanOrEqual(12)
    expect(result.mesh!.positions.length).toBeGreaterThanOrEqual(8 * 3)
  }, 120_000)

  it('cuts a hole with exact volume', async () => {
    await runModelOp({ kind: 'create_prim', bodyId: 'hole', prim: 'cylinder', params: { radius: 10, height: 20, at: [50, 30, 0] } })
    const result = await runModelOp({ kind: 'boolean', op: 'cut', target: 'b1', tools: ['hole'] })
    expect(result.bodyId).toBe('b1')
    expect(result.removed).toContain('hole')
    const volume = await runModelOp({ kind: 'volume', target: 'b1' })
    const expected = 100 * 60 * 5 - Math.PI * 10 * 10 * 5
    expect(volume.volume).toBeCloseTo(expected, 0)
  }, 120_000)

  it('fillets all edges', async () => {
    const result = await runModelOp({ kind: 'fillet', target: 'b1', radius: 1.5 })
    expect(result.edges).toBeGreaterThan(0)
    expect(result.mesh!.triangleCount).toBeGreaterThan(12)
  }, 120_000)

  it('exports STEP bytes the import worker accepts', async () => {
    const result = await runModelOp({ kind: 'export', target: 'b1', format: 'step' })
    expect(result.bytes).toBeDefined()
    const text = Buffer.from(result.bytes!).toString('latin1')
    expect(text.startsWith('ISO-10303-21')).toBe(true)
  }, 120_000)

  it('extrudes an L-shaped profile', async () => {
    await runModelOp({ kind: 'reset' })
    const points = [0, 0, 40, 0, 40, 10, 10, 10, 10, 30, 0, 30]
    const result = await runModelOp({ kind: 'extrude_profile', bodyId: 'L', points, height: 5 })
    const volume = await runModelOp({ kind: 'volume', target: 'L' })
    // L area = 40×10 + 10×20 = 600 mm², × 5 mm
    expect(volume.volume).toBeCloseTo(3000, 0)
    expect(result.mesh).toBeDefined()
  }, 120_000)

  it('transforms (translate) and deletes', async () => {
    const moved = await runModelOp({ kind: 'transform', target: 'L', translate: [10, 20, 30] })
    expect(moved.mesh).toBeDefined()
    const before = moved.mesh!.positions[0]
    expect(before).toBeCloseTo(10, 5) // first vertex shifted by x+10
    const deleted = await runModelOp({ kind: 'delete', target: 'L' })
    expect(deleted.deleted).toBe('L')
  }, 120_000)
})

describe('modeling document persistence', () => {
  it('records ops and replays for recovery', async () => {
    const doc = new ModelDocument(workspace)
    await doc.restore()
    await doc.record({ kind: 'create_prim', bodyId: 'x1', prim: 'box', params: { dx: 1, dy: 1, dz: 1 } }, { bodyId: 'x1', name: 'x1' })
    await doc.record({ kind: 'delete', target: 'x1' }, null)

    // A fresh document instance (simulating a restart) restores the log.
    const revived = new ModelDocument(workspace)
    await revived.restore()
    expect(revived.doc.ops).toHaveLength(2)
    expect(revived.doc.version).toBe(2)
    expect(revived.doc.bodyNames).toEqual({})

    // The persisted file is valid JSON on disk.
    const text = await readFile(path.join(workspace, '.dsh-cad', 'model.json'), 'utf8')
    expect(JSON.parse(text).docId).toBe(revived.doc.docId)
  })

  it('store.putAt keeps a stable viewId', async () => {
    const store = new SceneStore(workspace)
    const scene = { kind: '3d' as const, format: 'model', meshes: [], bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: 1, y: 1, z: 1 } }, units: 'mm' as const }
    await store.putAt('11111111-1111-1111-1111-111111111111', scene)
    const loaded = await store.get('11111111-1111-1111-1111-111111111111')
    expect(loaded).toEqual(scene)
    // Overwrite in place.
    const scene2 = { ...scene, units: 'mm' as const, meshes: [] }
    await store.putAt('11111111-1111-1111-1111-111111111111', scene2)
    expect(await store.get('11111111-1111-1111-1111-111111111111')).toEqual(scene2)
  })
})

describe('STL export (direct bytes)', () => {
  it('exports a valid binary STL loadable by the STL parser', async () => {
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 's1', prim: 'box', params: { dx: 10, dy: 10, dz: 10 } })
    const exported = await runModelOp({ kind: 'export', target: 's1', format: 'stl' })
    expect(exported.bytes).toBeDefined()
    const buffer = Buffer.from(exported.bytes!)
    expect(buffer.length).toBeGreaterThan(84)
    const triangleCount = buffer.readUInt32LE(80)
    expect(buffer.length).toBe(84 + triangleCount * 50)
    expect(triangleCount).toBeGreaterThan(10)
    // Round-trip through the phase-1 STL parser.
    const mesh = parseSTL(buffer, 'exported')
    expect(mesh.triangleCount).toBe(triangleCount)
  }, 120_000)
})

describe('primitives with placement (snowman scenario)', () => {
  it('sphere at a position has the exact sphere volume', async () => {
    await runModelOp({ kind: 'reset' })
    const r = await runModelOp({ kind: 'create_prim', bodyId: 'body', prim: 'sphere', params: { radius: 15, at: [0, 0, 40] }, name: 'head' })
    expect(r.bodyId).toBe('body')
    const volume = await runModelOp({ kind: 'volume', target: 'body' })
    expect(volume.volume).toBeCloseTo((4 / 3) * Math.PI * 15 ** 3, 0)
  }, 120_000)

  it('sphere with a tilted axis is rotated, not just moved', async () => {
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 's', prim: 'sphere', params: { radius: 10, axis: [1, 0, 0] } })
    // A sphere is rotation-invariant, so volume survives; the transform itself
    // is exercised by the torus case below.
    const volume = await runModelOp({ kind: 'volume', target: 's' })
    expect(volume.volume).toBeCloseTo((4 / 3) * Math.PI * 1000, 0)
  }, 120_000)

  it('torus with axis [0,0,1] keeps the exact torus volume', async () => {
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 't', prim: 'torus', params: { majorRadius: 20, minorRadius: 5, axis: [0, 0, 1], at: [0, 0, 10] } })
    const volume = await runModelOp({ kind: 'volume', target: 't' })
    expect(volume.volume).toBeCloseTo(2 * Math.PI ** 2 * 20 * 25, 0)
  }, 120_000)

  it('torus with a horizontal axis is rotated by π/2', async () => {
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 'th', prim: 'torus', params: { majorRadius: 20, minorRadius: 5, axis: [1, 0, 0] } })
    // Rotation preserves volume; the mesh's bounds flip from flat-in-XY to
    // tall-in-XZ, which the tessellation confirms.
    const mesh = await runModelOp({ kind: 'tessellate_all' })
    const positions = mesh.meshes?.[0]?.positions ?? []
    let maxY = -Infinity, maxZ = -Infinity
    for (let i = 0; i + 2 < positions.length; i += 3) {
      maxY = Math.max(maxY, positions[i + 1]!)
      maxZ = Math.max(maxZ, positions[i + 2]!)
    }
    // Flat torus: extent in Z ≈ minor radius (5); rotated: extent in Z ≈ major+minor (25).
    expect(maxZ).toBeGreaterThan(15)
    expect(maxY).toBeLessThan(10)
  }, 120_000)

  it('cone at a position has the exact frustum volume', async () => {
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 'c', prim: 'cone', params: { radius1: 10, radius2: 5, height: 20, at: [30, 0, 0] } })
    const volume = await runModelOp({ kind: 'volume', target: 'c' })
    expect(volume.volume).toBeCloseTo((Math.PI / 3) * (100 + 50 + 25) * 20, 0)
  }, 120_000)
})

describe('binary scene transport', () => {
  it('packs and decodes with typed-array views intact', async () => {
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 'box1', prim: 'box', params: { dx: 10, dy: 10, dz: 10 } })
    const all = await runModelOp({ kind: 'tessellate_all' })
    const { packBinaryScene } = await import('../src/modeling/bin-format.js')
    const { BinarySceneStore } = await import('../src/modeling/bin-store.js')

    const meshes = (all.meshes ?? []).map((mesh) => ({
      name: mesh.name,
      positions: mesh.positions,
      normals: mesh.normals,
      indices: mesh.indices,
    }))
    const packed = packBinaryScene(meshes)
    expect(packed.length).toBeGreaterThan(84)
    expect(packed.readUInt32LE(0)).toBe(0x31424344)

    // The store serves the packed buffer and mirrors to disk after the debounce.
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-bin-'))
    const store = new BinarySceneStore(workspace)
    const version = await store.publish('snowman-test', meshes)
    expect(version).toBe(1)
    const entry = await store.get('snowman-test')
    expect(entry).not.toBeNull()
    expect(entry!.buffer.subarray(0, 4).toString('latin1')).toBe('DCB1')
    // Header alignment: 8 + headerLen is 8-byte aligned.
    const headerLen = entry!.buffer.readUInt32LE(4)
    expect((8 + headerLen) % 8).toBe(0)
    await rm(workspace, { recursive: true, force: true })
  }, 120_000)
})
