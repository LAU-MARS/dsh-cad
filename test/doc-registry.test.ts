/**
 * Document registry (the file space): named documents under
 * `<root>/.dsh-cad/docs/`, the index.json manifest, session bindings, the
 * virtual folder tree (CAD 空间), duplicate/move, and the legacy
 * single-document migration — pure fs, no worker.
 */
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { readFile } from 'node:fs/promises'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { DocumentRegistry, summarizeModelDoc } from '../src/modeling/registry.js'
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

  // ── CAD 空间 (folder tree) ────────────────────────────────────────────────

  it('creates folders with auto names and a stable hierarchy', async () => {
    const registry = new DocumentRegistry(workspace)
    const parent = await registry.createFolder('项目')
    const child = await registry.createFolder(undefined, parent.id)
    expect(child.parentId).toBe(parent.id)
    expect(child.name).toBe('新建文件夹 1')

    const siblings = (await registry.listFolders()).filter((f) => f.parentId === parent.id)
    expect(siblings).toHaveLength(1)
  })

  it('moves documents into folders and validates the target', async () => {
    const registry = new DocumentRegistry(workspace)
    const folder = await registry.createFolder('归档')
    const doc = await registry.create('板')
    const moved = await registry.moveDoc(doc.doc.docId, folder.id)
    expect(moved?.folderId).toBe(folder.id)

    const listed = (await registry.list()).find((meta) => meta.id === doc.doc.docId)
    expect(listed?.folderId).toBe(folder.id)

    // A bogus folder id falls back to the root (validated folder id).
    const bogus = await registry.moveDoc(doc.doc.docId, 'no-such-folder')
    expect(bogus?.folderId).toBeNull()
  })

  it('rejects moving a folder into its own subtree', async () => {
    const registry = new DocumentRegistry(workspace)
    const parent = await registry.createFolder('父')
    const child = await registry.createFolder('子', parent.id)
    await expect(registry.moveFolder(parent.id, child.id)).rejects.toThrow(/subfolder/)
    // Moving to the root is fine.
    const moved = await registry.moveFolder(child.id, null)
    expect(moved?.parentId).toBeNull()
  })

  it('cascades folder deletes: subtree folders + docs + bindings', async () => {
    const registry = new DocumentRegistry(workspace)
    const parent = await registry.createFolder('父')
    const child = await registry.createFolder('子', parent.id)
    const doc = await registry.create('草稿', { folderId: child.id })
    await registry.bind('s1', doc.doc.docId)

    const removed = await registry.removeFolder(parent.id, 'cascade')
    expect(removed).not.toBeNull()
    expect(removed!.removedFolderIds.sort()).toEqual([parent.id, child.id].sort())
    expect(removed!.removedDocIds).toEqual([doc.doc.docId])
    expect(await registry.listFolders()).toHaveLength(0)
    expect(await registry.list()).toHaveLength(0)
    expect(await registry.bindingOf('s1')).toBeNull()
  })

  it('move-to-parent mode keeps documents when removing a folder', async () => {
    const registry = new DocumentRegistry(workspace)
    const parent = await registry.createFolder('父')
    const doc = await registry.create('活文档', { folderId: parent.id })

    const removed = await registry.removeFolder(parent.id, 'move-to-parent')
    expect(removed!.removedDocIds).toHaveLength(0)
    expect((await registry.list())[0]!.folderId).toBeNull()
  })

  it('duplicates a document with its op log under a new id', async () => {
    const registry = new DocumentRegistry(workspace)
    // Create through the registry (so the doc lives at the registry's docs path),
    // record through the SAME instance, then re-sync the manifest counts.
    const created = await registry.create('原型', { folderId: null })
    await created.record({ kind: 'create_prim', bodyId: 'b1', prim: 'box', params: { dx: 10, dy: 10, dz: 10 }, name: 'cube' }, { bodyId: 'b1', name: 'cube' })
    await registry.touch(created.doc.docId, { opCount: created.doc.version, bodyCount: 1 })

    const duplicate = await registry.duplicateDoc(created.doc.docId)
    expect(duplicate?.name).toBe('原型 (副本)')
    expect(duplicate?.id).not.toBe(created.doc.docId)

    const reopened = await registry.open(duplicate!.id)
    await reopened!.restore()
    expect(reopened!.doc.ops).toHaveLength(1)
    expect(reopened!.doc.bodyNames['b1']).toBe('cube')
  })

  it('summarizes a document\'s op log without a worker', async () => {
    const registry = new DocumentRegistry(workspace)
    const doc = await registry.create('装配')
    const id = doc.doc.docId
    await doc.record({ kind: 'create_prim', bodyId: 'b1', prim: 'box', params: { dx: 10 }, name: 'base' }, { bodyId: 'b1', name: 'base' })
    await doc.record({ kind: 'create_prim', bodyId: 'b2', prim: 'cylinder', params: { radius: 3, height: 8 }, name: 'pin' }, { bodyId: 'b2', name: 'pin' })
    await doc.record({ kind: 'sketch_set', name: 'S1', profile: { circle: { center: [0, 0], radius: 2 } } }, null)
    await doc.record({ kind: 'assembly_insert', instanceId: 'a1', bodyId: 'b2' }, null)
    await doc.record({ kind: 'assembly_insert', instanceId: 'a2', bodyId: 'b2' }, null)

    const reopened = await registry.open(id)
    await reopened!.restore()
    const summary = summarizeModelDoc(reopened!.doc)
    expect(summary.bodyCount).toBe(2)
    expect(summary.instanceCount).toBe(2)
    expect(summary.sketchCount).toBe(1)
    expect(summary.drawingCount).toBe(0)
  })
})
