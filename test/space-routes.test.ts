/**
 * CAD 空间 (workspace drive) HTTP routes: the netdisk surface behind the
 * left-sidebar panel. Pure route-contract coverage — the document registry
 * itself is covered in doc-registry.test.ts; the modeling worker is not
 * involved in these paths.
 */
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { registerSpaceRoutes } from '../src/space-routes.js'
import { DocumentRegistry } from '../src/modeling/registry.js'
import { BinarySceneStore } from '../src/modeling/bin-store.js'
import { SceneStore } from '../src/store.js'

interface SpacePayload {
  folders: Array<{ id: string; name: string; parentId: string | null }>
  docs: Array<{ id: string; name: string; folderId: string | null; folderPath: string; opCount: number; bodyCount: number; sizeBytes: number; boundSessions: string[] }>
  sessionBindings: Record<string, string>
}

function fakeRes(): { res: unknown; body: () => string; status: () => number; headers: () => Record<string, string> } {
  let payload = ''
  let status = 0
  const headers: Record<string, string> = {}
  const res = {
    writeHead(code: number, values?: Record<string, string>) {
      status = code
      Object.assign(headers, values ?? {})
      return res
    },
    end(chunk?: string | Buffer) {
      payload += chunk === undefined ? '' : String(chunk)
    },
  }
  return { res, body: () => payload, status: () => status, headers: () => headers }
}

async function call(handler: (req: unknown, res: unknown) => unknown, method: string, url: string, body?: unknown): Promise<{ status: number; body: string; headers: Record<string, string> }> {
  const writer = fakeRes()
  const chunks = body === undefined ? [] : [Buffer.from(typeof body === 'string' ? body : JSON.stringify(body))]
  const req = {
    method,
    url,
    headers: {} as Record<string, string>,
    // An own async iterator: spreading a Readable would NOT carry it
    // (Symbol.asyncIterator lives on the prototype, not as an own property).
    [Symbol.asyncIterator]: async function* () {
      for (const chunk of chunks) yield chunk
    },
  }
  await handler(req, writer.res)
  return { status: writer.status(), body: writer.body(), headers: writer.headers() }
}

async function buildRoutes() {
  const workspace = await mkdtemp(path.join(tmpdir(), 'space-routes-'))
  const registry = new DocumentRegistry(workspace)
  const binStore = new BinarySceneStore(workspace)
  const sceneStore = new SceneStore(workspace)
  const routes = new Map<string, (req: unknown, res: unknown) => unknown>()
  const server = {
    register: (route: { path: string; handler: (req: unknown, res: unknown) => unknown }) => {
      routes.set(route.path, route.handler)
      return () => { routes.delete(route.path) }
    },
  }
  registerSpaceRoutes({
    server: server as never,
    registry,
    sceneStore,
    binStore,
    workspaceRoot: workspace,
    ensureSceneRoute: () => '/dsh-cad/scene',
    binStoreHas: (viewId) => binStore.has(viewId),
    sceneStoreHas: (viewId) => sceneStore.has(viewId),
  })
  const handler = routes.get('/dsh-cad/space')
  expect(typeof handler).toBe('function')
  return { workspace, registry, binStore, handler: handler as never }
}

describe('GET /dsh-cad/space/snapshot', () => {
  it('lists documents with a folder path and session bindings', async () => {
    const { registry, handler } = await buildRoutes()
    const folder = await registry.createFolder('齿轮箱')
    const doc = await registry.create('发动机', { folderId: folder.id })
    await registry.bind('session-a', doc.doc.docId)

    const response = await call(handler, 'GET', '/dsh-cad/space/snapshot')
    expect(response.status).toBe(200)
    const payload = JSON.parse(response.body) as SpacePayload
    expect(payload.folders).toHaveLength(1)
    expect(payload.folders[0]!.name).toBe('齿轮箱')
    expect(payload.docs).toHaveLength(1)
    expect(payload.docs[0]).toMatchObject({
      name: '发动机',
      folderId: folder.id,
      folderPath: '齿轮箱',
      opCount: 0,
      bodyCount: 0,
      boundSessions: ['session-a'],
    })
    expect(payload.docs[0]!.sizeBytes).toBeGreaterThan(0)
    expect(payload.sessionBindings['session-a']).toBe(doc.doc.docId)
  })

  it('root-level documents sit under /', async () => {
    const { registry, handler } = await buildRoutes()
    await registry.create('根目录文档')
    const response = await call(handler, 'GET', '/dsh-cad/space/snapshot')
    const payload = JSON.parse(response.body) as SpacePayload
    expect(payload.docs[0]!.folderId).toBeNull()
    expect(payload.docs[0]!.folderPath).toBe('/')
  })
})

describe('POST /dsh-cad/space folders + docs', () => {
  it('creates, renames, moves and duplicates folders and docs', async () => {
    const { registry, handler } = await buildRoutes()

    const folder = JSON.parse((await call(handler, 'POST', '/dsh-cad/space/folders/create', { name: '项目 A' })).body) as { folder: { id: string } }
    const nested = JSON.parse((await call(handler, 'POST', '/dsh-cad/space/folders/create', { parentId: folder.folder.id })).body) as { folder: { id: string; name: string } }
    expect(nested.folder.name).toBe('新建文件夹 1')

    const renamed = JSON.parse((await call(handler, 'POST', '/dsh-cad/space/folders/rename', { id: nested.folder.id, name: '子目录' })).body) as { folder: { name: string } }
    expect(renamed.folder.name).toBe('子目录')

    const created = JSON.parse((await call(handler, 'POST', '/dsh-cad/space/docs/create', { name: '板', folderId: folder.folder.id })).body) as { doc: { id: string } }
    const moved = JSON.parse((await call(handler, 'POST', '/dsh-cad/space/docs/move', { id: created.doc.id, folderId: nested.folder.id })).body) as { doc: { folderId: string } }
    expect(moved.doc.folderId).toBe(nested.folder.id)

    const duplicate = JSON.parse((await call(handler, 'POST', '/dsh-cad/space/docs/duplicate', { id: created.doc.id })).body) as { doc: { name: string } }
    expect(duplicate.doc.name).toBe('板 (副本)')

    const listed = await registry.listFolders()
    expect(listed).toHaveLength(2)
  })

  it('folder delete cascade removes contained docs and bindings', async () => {
    const { registry, handler } = await buildRoutes()
    const folder = JSON.parse((await call(handler, 'POST', '/dsh-cad/space/folders/create', { name: '废纸' })).body) as { folder: { id: string } }
    const doc = await registry.create('草稿', { folderId: folder.folder.id })
    await registry.bind('session-z', doc.doc.docId)

    const removed = JSON.parse((await call(handler, 'POST', '/dsh-cad/space/folders/delete', { id: folder.folder.id, mode: 'cascade' })).body) as { removedFolderIds: string[]; removedDocIds: string[] }
    expect(removed.removedFolderIds).toHaveLength(1)
    expect(removed.removedDocIds).toEqual([doc.doc.docId])
    expect(await registry.list()).toHaveLength(0)
    expect(await registry.bindingOf('session-z')).toBeNull()
  })

  it('rejects moving a folder into its own subtree', async () => {
    const { handler } = await buildRoutes()
    const parent = JSON.parse((await call(handler, 'POST', '/dsh-cad/space/folders/create', { name: '父' })).body) as { folder: { id: string } }
    const child = JSON.parse((await call(handler, 'POST', '/dsh-cad/space/folders/create', { parentId: parent.folder.id })).body) as { folder: { id: string } }
    const moved = await call(handler, 'POST', '/dsh-cad/space/folders/move', { id: parent.folder.id, parentId: child.folder.id })
    expect(moved.status).toBe(400)
    expect(JSON.parse(moved.body).error).toContain('subfolder')
  })
})

describe('POST /dsh-cad/space/docs/delete', () => {
  it('batch-deletes documents', async () => {
    const { registry, handler } = await buildRoutes()
    const a = await registry.create('甲')
    const b = await registry.create('乙')
    const response = await call(handler, 'POST', '/dsh-cad/space/docs/delete', { ids: [a.doc.docId, b.doc.docId] })
    const payload = JSON.parse(response.body) as { removed: string[] }
    expect(payload.removed.sort()).toEqual([a.doc.docId, b.doc.docId].sort())
    expect(await registry.list()).toHaveLength(0)
  })
})
