/**
 * Issue #6 regression batch (P0-2/P0-3/P1-4/P1-5/P2-6/P2-7/P3-10):
 * pattern copy id uniqueness, bodyNames completeness + the fold-derived
 * missing flag, the shell no-op guard, session-workspace path resolution with
 * auto-created export directories, non-finite bounds sanitization, docId on
 * assembly/drawing metas, and sketch rows in cad_sketch_list's render.
 * Worker-level items run the real occt.ts kernel through the tool harness.
 */
import { mkdtemp, readFile, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { createModelTools } from '../src/tools/cad-model.js'
import { DocumentRegistry } from '../src/modeling/registry.js'
import { BinarySceneStore } from '../src/modeling/bin-store.js'
import { SceneStore } from '../src/store.js'
import { resolveDistDir } from '../src/modeling/occt-bridge.cjs'
import { assemblyTreePayload } from '../src/modeling/assembly.js'
import type { ModelDoc } from '../src/modeling/document.js'
import { sceneStats } from '../src/types.js'
import { resolveSessionPath } from '../src/tools/util.js'

const occtAvailable = resolveDistDir() !== null

interface ToolLike {
  name: string
  execute: (args: unknown, exec?: unknown) => Promise<Record<string, unknown>>
  output?: {
    presentationMeta?: (args: unknown, value: unknown) => Record<string, unknown>
    render?: (args: unknown, value: unknown) => Array<{ type: string; text?: string }>
  }
}

async function buildTools(workspace: string): Promise<Map<string, ToolLike>> {
  const registry = new DocumentRegistry(workspace)
  const tools = createModelTools({
    store: new BinarySceneStore(workspace),
    sceneStore: new SceneStore(workspace),
    workspaceRoot: workspace,
    ensureSceneRoute: () => null,
    registry,
  })
  return new Map(tools.map((tool) => [tool.name, tool as unknown as ToolLike]))
}

const session = (id: string) => ({ agent: { id } })

describe('issue #6 regressions', () => {
  it('P0-2/P0-3: repeat patterns uniquify copy ids and record every copy name', { timeout: 120_000 }, async () => {
    if (!occtAvailable) throw new Error('occt.ts kernel not found — run npm install first')
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-issue6-'))
    const tools = await buildTools(workspace)
    const run = (name: string, args: Record<string, unknown>) => tools.get(name)!.execute(args, session('s1'))

    await run('cad_create_prim', { kind: 'box', dx: 10, dy: 10, dz: 5, name: 'bolt' })
    const first = await run('cad_pattern', { target: 'b1', mode: 'linear', count: 2, delta: [104, 0, 0] })
    const second = await run('cad_pattern', { target: 'b1', mode: 'linear', count: 2, delta: [0, 54, 0] })

    const firstIds = first.created as string[]
    const secondIds = second.created as string[]
    expect(firstIds).toEqual(['b1p1'])
    // The second pattern must NOT overwrite b1p1 — the copy moves to b1p2.
    expect(secondIds).toEqual(['b1p2'])
    expect(second.bodies).toBe(3)

    // Every copy's name is recorded in the persisted bodyNames manifest.
    const registry = new DocumentRegistry(workspace)
    const docs = await registry.list()
    expect(docs).toHaveLength(1)
    const doc = await registry.open(docs[0]!.id)
    expect(doc).not.toBeNull()
    await doc!.restore()
    expect(Object.keys(doc!.doc.bodyNames).sort()).toEqual(['b1', 'b1p1', 'b1p2'])
  })

  it('P0-3: the missing flag folds live body ids from the op log (no bodyNames needed)', () => {
    // A document written before copy-name recording: bodyNames lacks the
    // pattern copy, yet the instance referencing it is NOT missing.
    const doc: ModelDoc = {
      docId: 'doc-x',
      version: 3,
      ops: [
        { kind: 'create_prim', bodyId: 'b1', prim: 'box', params: { dx: 10, dy: 10, dz: 5 } },
        { kind: 'pattern', target: 'b1', mode: 'linear', count: 3, delta: [20, 0, 0] },
        { kind: 'assembly_insert', instanceId: 'i1', bodyId: 'b1p2' },
      ],
      bodyNames: { b1: 'bolt' }, // no b1p1/b1p2 entries — the pre-fix shape
    }
    const payload = assemblyTreePayload(doc)
    expect(payload.parts).toHaveLength(1)
    expect(payload.parts[0]!.missing).toBe(false)

    // A reference to a truly consumed body still reports missing.
    const doc2: ModelDoc = {
      docId: 'doc-y',
      version: 3,
      ops: [
        { kind: 'create_prim', bodyId: 'b1', prim: 'box', params: { dx: 10, dy: 10, dz: 5 } },
        { kind: 'create_prim', bodyId: 'b2', prim: 'box', params: { dx: 4, dy: 4, dz: 4 } },
        { kind: 'boolean', op: 'fuse', target: 'b1', tools: ['b2'] },
        { kind: 'assembly_insert', instanceId: 'i1', bodyId: 'b2' },
      ],
      bodyNames: { b1: 'plate' },
    }
    expect(assemblyTreePayload(doc2).parts[0]!.missing).toBe(true)
  })

  it('P1-4: shell on a chamfered solid fails loudly instead of a silent no-op', { timeout: 120_000 }, async () => {
    if (!occtAvailable) throw new Error('occt.ts kernel not found')
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-issue6-'))
    const tools = await buildTools(workspace)
    const run = (name: string, args: Record<string, unknown>) => tools.get(name)!.execute(args, session('s1'))

    await run('cad_create_prim', { kind: 'box', dx: 30, dy: 30, dz: 30, name: 'cube' })
    await run('cad_chamfer', { target: 'b1', distance: 2 })
    const before = await run('cad_volume', { target: 'b1' })
    expect(Number(before.volume)).toBeCloseTo(26322.67, 1)
    // The reporter's repro: this shell reported success with an unchanged solid.
    await expect(run('cad_shell', { target: 'b1', thickness: 2, open: [[0, 0, 1]] })).rejects.toThrow(/unchanged solid/)
  })

  it('P1-5: paths resolve against the session workspace and exports create directories', { timeout: 120_000 }, async () => {
    if (!occtAvailable) throw new Error('occt.ts kernel not found')
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-issue6-'))
    const sessionRoot = await mkdtemp(path.join(tmpdir(), 'dsh-cad-issue6-session-'))
    const tools = await buildTools(workspace)
    // The host runtime carries the session cwd in the agent's session header.
    const exec = { agent: { id: 's1', session: { header: { cwd: sessionRoot } } } }

    await tools.get('cad_create_prim')!.execute({ kind: 'box', dx: 40, dy: 30, dz: 15 }, exec)
    const exported = await tools.get('cad_export')!.execute({ target: 'b1', path: 'nested/deep/plate.stl' }, exec)
    const written = path.join(sessionRoot, 'nested', 'deep', 'plate.stl')
    expect(String(exported.filePath)).toBe(written)
    expect((await stat(written)).isFile()).toBe(true)
    // …and NOT under the launch-time workspace root.
    await expect(stat(path.join(workspace, 'nested', 'deep', 'plate.stl'))).rejects.toThrow()
  })

  it('P1-5 (unit): resolveSessionPath prefers the session cwd, falls back cleanly', () => {
    const exec = { agent: { session: { header: { cwd: 'D:\\session-root' } } } }
    expect(resolveSessionPath('a/b.step', exec, 'D:\\process-root')).toBe(path.join('D:\\session-root', 'a', 'b.step'))
    expect(resolveSessionPath('C:\\abs\\x.stl', exec, 'D:\\process-root')).toBe(path.join('C:\\abs', 'x.stl'))
    expect(resolveSessionPath('a.step', { agent: { id: 'no-session' } }, 'D:\\process-root')).toBe(path.join('D:\\process-root', 'a.step'))
    expect(resolveSessionPath('a.step', undefined, 'D:\\process-root')).toBe(path.join('D:\\process-root', 'a.step'))
  })

  it('P2-6: sceneStats drops non-finite bounds instead of breaking lossless JSON', async () => {
    const hostile = {
      kind: '2d' as const,
      format: 'svg',
      entities: [],
      layers: [],
      bounds: { min: { x: Number.NaN, y: 0 }, max: { x: 100, y: 50 } },
    }
    const stats = sceneStats(hostile)
    expect(stats.boundsMin).toBeUndefined()
    expect(stats.boundsMax).toBeUndefined()
    expect(() => JSON.parse(JSON.stringify(stats))).not.toThrow()

    // A real drawing SVG keeps its finite bounds.
    const { convert } = await import('../src/convert/index.js')
    const scene = await convert(await readFile(path.join(process.cwd(), 'gear_m3_z12_drawing.svg')), 'svg', 'gear.svg')
    const real = sceneStats(scene)
    expect(real.boundsMin).toBeDefined()
    expect(real.boundsMin!.every((v) => Number.isFinite(v))).toBe(true)
  })

  it('P2-7: assembly meta carries docId (viewId stays the scene id)', { timeout: 120_000 }, async () => {
    if (!occtAvailable) throw new Error('occt.ts kernel not found')
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-issue6-'))
    const tools = await buildTools(workspace)
    const run = (name: string, args: Record<string, unknown>) => tools.get(name)!.execute(args, session('s1'))

    await run('cad_create_prim', { kind: 'box', dx: 10, dy: 10, dz: 10 })
    const value = await run('cad_assembly_insert', { bodyId: 'b1', at: [0, 0, 0] })
    const tool = tools.get('cad_assembly_insert')!
    const meta = tool.output?.presentationMeta?.({}, value)
    expect(meta).toBeDefined()
    expect(String(meta!.viewId)).toMatch(/^asm-/)
    // docId is the owning document — the feature tree fetches with this id.
    expect(typeof meta!.docId).toBe('string')
    expect(String(meta!.docId)).not.toMatch(/^asm-/)

    const registry = new DocumentRegistry(workspace)
    const docs = await registry.list()
    expect(meta!.docId).toBe(docs[0]!.id)
  })

  it('P3-10: cad_sketch_list renders one row per sketch', { timeout: 120_000 }, async () => {
    if (!occtAvailable) throw new Error('occt.ts kernel not found')
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-issue6-'))
    const tools = await buildTools(workspace)
    const run = (name: string, args: Record<string, unknown>) => tools.get(name)!.execute(args, session('s1'))

    await run('cad_sketch_new', { name: '底座轮廓', profile: [0, 0, 40, 0, 40, 20, 0, 20] })
    const value = await run('cad_sketch_list', {})
    const sketches = value.sketches as Array<{ name: string; type: string }>
    expect(sketches).toHaveLength(1)
    expect(sketches[0]!.name).toBe('底座轮廓')

    const tool = tools.get('cad_sketch_list')!
    const rendered = tool.output?.render?.({}, value)
    const text = (rendered ?? []).map((block) => block.text ?? '').join('\n')
    expect(text).toContain('底座轮廓')
    expect(text).toContain('polygon')
  })
})
