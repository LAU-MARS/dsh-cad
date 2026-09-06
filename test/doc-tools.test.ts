/**
 * Document tools integration: the file space through the real tool family —
 * per-session document isolation (switch = reset + replay), cad_doc_new /
 * cad_doc_open round-trips, and cad_doc_delete with its confirm guard.
 * Runs the shared OCCT worker; every assertion is exact where geometry is
 * involved so a broken replay cannot pass.
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

const occtAvailable = resolveDistDir() !== null

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

describe('document tools (integration)', () => {
  it('isolates documents per session and replays on switch', { timeout: 120_000 }, async () => {
    if (!occtAvailable) throw new Error('occt.ts kernel not found — run npm install first')
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-doctools-'))
    const tools = await buildTools(workspace)
    const run = (name: string, args: Record<string, unknown>, session: string) =>
      tools.get(name)!.execute(args, { agent: { id: session } })

    // Session 1 models a 100 mm cube (volume exactly 1e6 mm³).
    const created = await run('cad_create_prim', { kind: 'box', dx: 100, dy: 100, dz: 100, name: 'cube' }, 's1')
    expect(created.bodies).toBe(1)

    // Session 2's first op lands on its own fresh document.
    const cylinder = await run('cad_create_prim', { kind: 'cylinder', radius: 10, height: 50 }, 's2')
    expect(cylinder.bodies).toBe(1)
    const s2Volume = await run('cad_volume', { target: String(cylinder.bodyId) }, 's2')
    expect(s2Volume.volume).toBeCloseTo(Math.PI * 100 * 50, 1)

    // Back in session 1: the switch replays document 1 and b1 is the cube again.
    const s1Volume = await run('cad_volume', { target: String(created.bodyId) }, 's1')
    expect(s1Volume.volume).toBeCloseTo(1_000_000, 1)
    expect(s1Volume.bodies).toBe(1)
  })

  it('cad_doc_new / cad_docs / cad_doc_open round-trip by name', { timeout: 120_000 }, async () => {
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-doctools-'))
    const tools = await buildTools(workspace)
    const run = (name: string, args: Record<string, unknown>, session: string) =>
      tools.get(name)!.execute(args, { agent: { id: session } })

    const created = await run('cad_doc_new', { name: '发动机' }, 's1')
    expect(created.name).toBe('发动机')
    await run('cad_create_prim', { kind: 'box', dx: 60, dy: 40, dz: 10, name: 'plate' }, 's1')

    // Another session lists the file space and opens the named document.
    const listing = await run('cad_docs', {}, 's2')
    const docs = listing.docs as Array<{ name: string; bodies: number; active?: boolean }>
    expect(docs.some((doc) => doc.name === '发动机' && doc.bodies === 1)).toBe(true)

    const opened = await run('cad_doc_open', { doc: '发动机' }, 's2')
    expect(opened.bodies).toBe(1)
    const volume = await run('cad_volume', { target: 'b1' }, 's2')
    expect(volume.volume).toBeCloseTo(60 * 40 * 10, 1)
  })

  it('cad_doc_delete requires confirm and drops the document', { timeout: 120_000 }, async () => {
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-doctools-'))
    const tools = await buildTools(workspace)
    const run = (name: string, args: Record<string, unknown>, session: string) =>
      tools.get(name)!.execute(args, { agent: { id: session } })

    await run('cad_doc_new', { name: '草稿' }, 's1')
    await run('cad_create_prim', { kind: 'sphere', radius: 20 }, 's1')

    await expect(run('cad_doc_delete', { doc: '草稿' }, 's1')).rejects.toThrow('confirm')
    const deleted = await run('cad_doc_delete', { doc: '草稿', confirm: true }, 's1')
    expect(deleted.name).toBe('草稿')

    const listing = await run('cad_docs', {}, 's1')
    expect((listing.docs as unknown[])).toHaveLength(0)

    // The session whose document vanished lazily starts a fresh one.
    const next = await run('cad_create_prim', { kind: 'box', dx: 5, dy: 5, dz: 5 }, 's1')
    expect(next.bodies).toBe(1)
  })

  it('restores the session document after a process restart', { timeout: 120_000 }, async () => {
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-doctools-'))
    const first = await buildTools(workspace)
    await first.get('cad_doc_new')!.execute({ name: '重启测试' }, { agent: { id: 's1' } })
    await first.get('cad_create_prim')!.execute({ kind: 'cylinder', radius: 10, height: 30 }, { agent: { id: 's1' } })

    // A "new process": fresh tool instance over the same workspace root.
    const second = await buildTools(workspace)
    const volume = await second.get('cad_volume')!.execute({ target: 'b1' }, { agent: { id: 's1' } })
    expect(volume.volume).toBeCloseTo(Math.PI * 100 * 30, 1)
  })
})
