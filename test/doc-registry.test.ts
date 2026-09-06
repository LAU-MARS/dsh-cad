/**
 * Document registry (the file space): named documents under
 * `<root>/.dsh-cad/docs/`, the index.json manifest, session bindings, and the
 * legacy single-document migration — pure fs, no worker.
 */
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { readFile } from 'node:fs/promises'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { DocumentRegistry } from '../src/modeling/registry.js'
import { ModelDocument } from '../src/modeling/document.js'

let workspace = ''

beforeEach(async () => {
  workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-registry-'))
})

afterEach(() => {
  // mkdtemp dirs are left for the OS temp cleanup; nothing to assert on them.
})

describe('document registry', () => {
  it('creates, lists and opens documents', async () => {
    const registry = new DocumentRegistry(workspace)
    const doc = await registry.create('发动机')
    expect(doc.doc.docId).toMatch(/^[0-9a-f-]{36}$/)

    const listed = await registry.list()
    expect(listed).toHaveLength(1)
    expect(listed[0]!.name).toBe('发动机')
    expect(listed[0]!.bodyCount).toBe(0)

    const reopened = await registry.open(doc.doc.docId)
    expect(reopened?.doc.docId).toBe(doc.doc.docId)
    expect(await registry.open('missing-id')).toBeNull()
  })

  it('auto-names untitled documents without collisions', async () => {
    const registry = new DocumentRegistry(workspace)
    const first = await registry.create()
    const second = await registry.create()
    const names = (await registry.list()).map((doc) => doc.name)
    expect(names).toContain('未命名 1')
    expect(names).toContain('未命名 2')
    expect(first.doc.docId).not.toBe(second.doc.docId)
  })

  it('binds sessions and drops bindings to deleted documents', async () => {
    const registry = new DocumentRegistry(workspace)
    const doc = await registry.create('A')
    await registry.bind('session-1', doc.doc.docId)
    expect(await registry.bindingOf('session-1')).toBe(doc.doc.docId)
    expect(await registry.bindingOf('session-2')).toBeNull()

    await registry.remove(doc.doc.docId)
    expect(await registry.bindingOf('session-1')).toBeNull()
    expect(await registry.list()).toHaveLength(0)
  })

  it('renames by id or exact name', async () => {
    const registry = new DocumentRegistry(workspace)
    const doc = await registry.create('旧名')
    const renamed = await registry.rename(doc.doc.docId, '新名')
    expect(renamed?.name).toBe('新名')

    const byName = await registry.resolve('新名')
    expect(byName?.id).toBe(doc.doc.docId)
    expect(await registry.resolve('不存在的名字')).toBeNull()
  })

  it('touch updates op/body counts and persists the manifest', async () => {
    const registry = new DocumentRegistry(workspace)
    const doc = await registry.create('plate')
    await registry.touch(doc.doc.docId, { opCount: 3, bodyCount: 2 })

    const manifest = JSON.parse(await readFile(path.join(workspace, '.dsh-cad', 'index.json'), 'utf8')) as {
      docs: Array<{ opCount: number; bodyCount: number }>
    }
    expect(manifest.docs[0]!.opCount).toBe(3)
    expect(manifest.docs[0]!.bodyCount).toBe(2)
  })

  it('migrates the legacy single model.json into a named document', async () => {
    // Seed a legacy workspace: one pre-registry document at .dsh-cad/model.json.
    const legacy = new ModelDocument(workspace)
    await legacy.record({ kind: 'create_prim', bodyId: 'b1', prim: 'box', params: { dx: 10 } }, { bodyId: 'b1', name: 'cube' })

    const registry = new DocumentRegistry(workspace)
    const listed = await registry.list()
    expect(listed).toHaveLength(1)
    expect(listed[0]!.name).toBe('导入的模型')
    expect(listed[0]!.id).toBe(legacy.doc.docId)
    expect(listed[0]!.opCount).toBe(1)
    expect(listed[0]!.bodyCount).toBe(1)

    // The legacy file moved into docs/<docId>.json and restores intact.
    const opened = await registry.open(legacy.doc.docId)
    await opened!.restore()
    expect(opened!.doc.ops).toHaveLength(1)
    expect(opened!.doc.bodyNames['b1']).toBe('cube')
  })

  it('hands the migrated document to the first unbound session only', async () => {
    const legacy = new ModelDocument(workspace)
    await legacy.record({ kind: 'create_prim', bodyId: 'b1', prim: 'box', params: { dx: 10 } }, { bodyId: 'b1', name: 'cube' })
    const registry = new DocumentRegistry(workspace)

    const claimed = await registry.claimLegacyFor('session-a')
    expect(claimed).toBe(legacy.doc.docId)
    expect(await registry.bindingOf('session-a')).toBe(legacy.doc.docId)

    // Claimed exactly once — the next unbound session gets nothing.
    expect(await registry.claimLegacyFor('session-b')).toBeNull()
  })

  it('keeps state across registry instances (restart)', async () => {
    const first = new DocumentRegistry(workspace)
    const doc = await first.create('持久')
    await first.bind('session-x', doc.doc.docId)

    const second = new DocumentRegistry(workspace)
    expect(await second.bindingOf('session-x')).toBe(doc.doc.docId)
    expect((await second.list())[0]!.name).toBe('持久')
  })
})
