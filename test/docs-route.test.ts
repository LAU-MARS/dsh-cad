/**
 * `/dsh-cad/docs` payload contract: the panel's host-independent liveness
 * channel. Each document entry must carry its op count as `version` (the
 * panel polls the list and re-fetches the scene when the tracked document's
 * version moves), and `?session=<id>` must report that session's bound
 * document with a versioned scene URL.
 */
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { Readable } from 'node:stream'
import { describe, expect, it } from 'vitest'
import { registerDocsRoute } from '../src/routes.js'
import { DocumentRegistry } from '../src/modeling/registry.js'
import { BinarySceneStore } from '../src/modeling/bin-store.js'

interface DocsPayload {
  docs: Array<{ id: string; name: string; bodies: number; updatedAt: string; version: number; sceneUrl?: string }>
  active?: { id: string; name: string; version: number; sceneUrl?: string }
}

/** Minimal Node HTTP doubles for the raw route contract. */
function fakeRes(): { res: unknown; body: () => string; status: () => number } {
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
  return { res, body: () => payload, status: () => status }
}

async function callDocs(handler: (req: unknown, res: unknown) => unknown, url: string): Promise<DocsPayload> {
  const writer = fakeRes()
  const req = { method: 'GET', url, headers: {}, ...Readable.from([]) }
  await handler(req, writer.res)
  expect(writer.status()).toBe(200)
  return JSON.parse(writer.body()) as DocsPayload
}

async function buildRoute(): Promise<(req: unknown, res: unknown) => unknown> {
  const workspace = await mkdtemp(path.join(tmpdir(), 'docs-route-'))
  const registry = new DocumentRegistry(workspace)
  const binStore = new BinarySceneStore(workspace)
  const created = await registry.create('叶片')
  await registry.touch(created.doc.docId, { opCount: 7, bodyCount: 1 })
  await registry.bind('session-1', created.doc.docId)

  const routes = new Map<string, (req: unknown, res: unknown) => unknown>()
  const server = { register: (route: { path: string; handler: (req: unknown, res: unknown) => unknown }) => { routes.set(route.path, route.handler); return () => { routes.delete(route.path) } } }
  registerDocsRoute(server as never, registry, binStore)
  const handler = routes.get('/dsh-cad/docs')
  expect(typeof handler).toBe('function')
  return (req, res) => handler!(req, res)
}

describe('GET /dsh-cad/docs', () => {
  it('carries each document op count as `version`', async () => {
    const handler = await buildRoute()
    const payload = await callDocs(handler, '/dsh-cad/docs')
    expect(payload.docs).toHaveLength(1)
    expect(payload.docs[0]).toMatchObject({ name: '叶片', bodies: 1, version: 7 })
    expect(payload.active).toBeUndefined()
  })

  it('reports the session-bound document with a versioned scene URL', async () => {
    const handler = await buildRoute()
    const payload = await callDocs(handler, '/dsh-cad/docs?session=session-1')
    expect(payload.active).toMatchObject({ name: '叶片', version: 7 })
    // No scene published in this fixture: the URL is omitted, not invented.
    expect(payload.active?.sceneUrl).toBeUndefined()
  })

  it('has no active block for an unbound session', async () => {
    const handler = await buildRoute()
    const payload = await callDocs(handler, '/dsh-cad/docs?session=unknown')
    expect(payload.active).toBeUndefined()
  })
})
