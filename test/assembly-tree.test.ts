/**
 * Assembly tree data: the op-log fold behind GET /dsh-cad/asm/<docId>, the
 * per-instance palette (tree swatch = scene color), display-name dedup, and
 * constraint entity→instance name resolution. Pure functions + the route
 * handler against a temp registry — no worker.
 */
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  assemblyDisplayNames,
  assemblyTreePayload,
  composeAssemblyMeshes,
  foldAssemblyState,
  instanceColor,
  INSTANCE_PALETTE,
} from '../src/modeling/assembly.js'
import type { ModelOp } from '../src/modeling/client.js'
import type { BinMeshData } from '../src/modeling/bin-format.js'
import { DocumentRegistry } from '../src/modeling/registry.js'
import { registerAssemblyRoute } from '../src/routes.js'

const OPS: ModelOp[] = [
  { kind: 'assembly_insert', instanceId: 'a1', bodyId: 'b1', name: 'ring_gear' },
  { kind: 'assembly_insert', instanceId: 'a2', bodyId: 'b2', name: 'sun_gear', translate: [10, 0, 0], rotate: [0, 0, 90] },
  { kind: 'assembly_insert', instanceId: 'a3', bodyId: 'b2', name: 'sun_gear', translate: [20, 0, 0] },
  { kind: 'assembly_transform', instanceId: 'a3', translate: [30, 5, 0] },
  {
    kind: 'constraints',
    model: {
      entities: [
        { id: 0, instance: 'a1' },
        { id: 1, instance: 'a2' },
      ],
      constraints: [{ id: 0, kind: { type: 'concentric', a: 0, b: 1 } }],
    },
  },
]

describe('foldAssemblyState', () => {
  it('folds insert/transform/remove in order with defaults', () => {
    const folded = foldAssemblyState(OPS, {})
    expect(folded.instances).toHaveLength(3)
    expect(folded.instances[0]).toMatchObject({ instanceId: 'a1', name: 'ring_gear', translate: [0, 0, 0], rotate: [0, 0, 0] })
    expect(folded.instances[2]!.translate).toEqual([30, 5, 0])
    expect(folded.instances[2]!.rotate).toEqual([0, 0, 0])
    expect(folded.constraints).toHaveLength(1)
  })

  it('falls back to body names (then bodyId) for unnamed instances', () => {
    const folded = foldAssemblyState([{ kind: 'assembly_insert', instanceId: 'a9', bodyId: 'b7' }], { b7: '曲轴' })
    expect(folded.instances[0]!.name).toBe('曲轴')
    const anonymous = foldAssemblyState([{ kind: 'assembly_insert', instanceId: 'a9', bodyId: 'b7' }], {})
    expect(anonymous.instances[0]!.name).toBe('b7')
  })

  it('removes instances and keeps the latest constraint model', () => {
    const folded = foldAssemblyState(
      [
        ...OPS,
        { kind: 'assembly_remove', instanceId: 'a2' },
        { kind: 'constraints', model: { entities: [], constraints: [] } },
      ],
      {},
    )
    expect(folded.instances.map((instance) => instance.instanceId)).toEqual(['a1', 'a3'])
    expect(folded.constraints).toHaveLength(0)
  })
})

describe('display names + palette', () => {
  it('dedups duplicate names with a ·N suffix', () => {
    const names = assemblyDisplayNames(foldAssemblyState(OPS, {}).instances)
    expect(names).toEqual(['ring_gear', 'sun_gear', 'sun_gear·2'])
  })

  it('assigns palette colors by position and cycles past the palette', () => {
    expect(instanceColor(0)).toBe(INSTANCE_PALETTE[0])
    expect(instanceColor(INSTANCE_PALETTE.length)).toBe(INSTANCE_PALETTE[0])
    expect(new Set(INSTANCE_PALETTE).size).toBe(INSTANCE_PALETTE.length)
  })
})

describe('composeAssemblyMeshes colors', () => {
  const body = (name: string): BinMeshData => ({
    name,
    positions: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
    normals: new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1]),
    indices: new Uint32Array([0, 1, 2]),
  })

  it('colors every instance by its list position and names meshes for the tree', () => {
    const bodies = new Map([
      ['b1', body('b1')],
      ['b2', body('b2')],
    ])
    const meshes = composeAssemblyMeshes(bodies, foldAssemblyState(OPS, {}).instances)
    expect(meshes.map((mesh) => mesh.name)).toEqual(['ring_gear', 'sun_gear', 'sun_gear·2'])
    expect(meshes.map((mesh) => mesh.color)).toEqual([instanceColor(0), instanceColor(1), instanceColor(2)])
  })

  it('skips instances whose body was consumed, keeping colors by position', () => {
    const bodies = new Map([['b2', body('b2')]])
    const meshes = composeAssemblyMeshes(bodies, foldAssemblyState(OPS, {}).instances)
    expect(meshes.map((mesh) => mesh.color)).toEqual([instanceColor(1), instanceColor(2)])
  })
})

describe('assemblyTreePayload', () => {
  it('resolves constraint entity ids to instance display names', () => {
    const payload = assemblyTreePayload({ docId: 'doc-1', version: 5, ops: OPS, bodyNames: { b1: 'ring_gear', b2: 'sun_gear' } })
    expect(payload.version).toBe(5)
    expect(payload.parts.map((part) => [part.name, part.color, part.missing])).toEqual([
      ['ring_gear', instanceColor(0), false],
      ['sun_gear', instanceColor(1), false],
      ['sun_gear·2', instanceColor(2), false],
    ])
    expect(payload.constraints).toEqual([{ id: 0, type: 'concentric', a: 'ring_gear', b: 'sun_gear' }])
  })

  it('flags parts whose body was consumed and keeps unresolved entities raw', () => {
    const payload = assemblyTreePayload({
      docId: 'doc-1',
      version: 6,
      ops: [
        { kind: 'assembly_insert', instanceId: 'a1', bodyId: 'gone', name: 'old_part' },
        { kind: 'constraints', model: { entities: [{ id: 2, geometry: { type: 'point2', x: 0, y: 0 } }], constraints: [{ id: 1, kind: { type: 'distance', a: 2 }, label: 'gap' }] } },
      ],
      bodyNames: {},
    })
    expect(payload.parts[0]!.missing).toBe(true)
    expect(payload.constraints[0]).toEqual({ id: 1, type: 'distance', label: 'gap', a: '#2' })
  })
})

describe('GET /dsh-cad/asm/<docId>', () => {
  /** Minimal IncomingMessage/ServerResponse stand-ins for the route handler. */
  function invoke(handler: (req: never, res: never) => Promise<void>, url: string): Promise<{ status: number; body: string }> {
    return new Promise((resolve, reject) => {
      const res = {
        writeHead: (status: number) => {
          result.status = status
        },
        end: (body: string) => {
          result.body = body
          resolve(result)
        },
      }
      const result = { status: 0, body: '' }
      handler({ url, method: 'GET', headers: {} } as never, res as never).catch(reject)
    })
  }

  it('serves the tree folded from the persisted document', async () => {
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-asm-route-'))
    const registry = new DocumentRegistry(workspace)
    const document = await registry.create('行星齿轮箱')
    for (const op of OPS) await document.record(op, null)

    const routes: Array<{ kind: string; path: string; handler: (req: never, res: never) => Promise<void> }> = []
    registerAssemblyRoute({ register: (route) => { routes.push(route); return () => {} } }, registry)
    const route = routes[0]!

    const hit = await invoke(route.handler, `/dsh-cad/asm/${document.doc.docId}`)
    expect(hit.status).toBe(200)
    const payload = JSON.parse(hit.body) as { name: string; parts: unknown[]; constraints: unknown[] }
    expect(payload.name).toBe('行星齿轮箱')
    expect(payload.parts).toHaveLength(3)
    expect(payload.constraints).toHaveLength(1)

    const missing = await invoke(route.handler, '/dsh-cad/asm/nope')
    expect(missing.status).toBe(404)
  })
})
