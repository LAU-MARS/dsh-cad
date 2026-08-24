/**
 * Same-origin scene routes:
 * - GET /dsh-cad/scene/<viewId>  — JSON scenes (cad_view files)
 * - GET /dsh-cad/bin/<viewId>    — packed binary scenes (modeling document)
 * - GET /dsh-cad/demo-scene      — the built-in demo example, parsed from the
 *                                  packaged demo-bracket.brep by OCCT (local
 *                                  file ↔ editor display correspondence)
 */
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { SceneStore } from './store.js'
import type { BinarySceneStore } from './modeling/bin-store.js'
import { convert } from './convert/index.js'

export const SCENE_ROUTE_PATH = '/dsh-cad/scene'
export const BIN_ROUTE_PATH = '/dsh-cad/bin'
export const DEMO_SCENE_ROUTE_PATH = '/dsh-cad/demo-scene'

/** The built-in demo examples (packaged as lib/demo-<part>.brep). */
export const DEMO_PARTS = ['bracket', 'flange', 'shaft'] as const
export type DemoPart = (typeof DEMO_PARTS)[number]

/** Register the scene route on the shared HTTP server. Returns a disposer. */
export function registerSceneRoute(server: { register: (route: SceneRoute) => () => void }, store: SceneStore): () => void {
  return server.register({
    kind: 'prefix',
    path: SCENE_ROUTE_PATH,
    handler: async (req: IncomingMessage, res: ServerResponse) => {
      const url = new URL(req.url ?? '/', 'http://localhost')
      const segments = url.pathname.split('/').filter((segment) => segment !== '')
      // ['/dsh-cad', 'scene', '<viewId>'] → viewId is the 3rd segment.
      const viewId = segments[2]
      if (req.method !== 'GET' || viewId === undefined) {
        res.writeHead(404, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ error: 'not found' }))
        return
      }
      const scene = await store.get(viewId)
      if (scene === null) {
        res.writeHead(404, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ error: 'unknown scene' }))
        return
      }
      const etag = store.etag(scene)
      if (req.headers['if-none-match'] === etag) {
        res.writeHead(304)
        res.end()
        return
      }
      const body = Buffer.from(JSON.stringify(scene))
      res.writeHead(200, {
        'content-type': 'application/json',
        'content-length': body.length,
        'cache-control': 'private, max-age=31536000, immutable',
        etag,
      })
      res.end(body)
    },
  })
}

interface SceneRoute {
  kind: 'prefix' | 'exact'
  path: string
  handler: (req: IncomingMessage, res: ServerResponse) => void | Promise<void>
}

/** Register the binary scene route. Returns a disposer. */
export function registerBinRoute(server: { register: (route: SceneRoute) => () => void }, store: BinarySceneStore): () => void {
  return server.register({
    kind: 'prefix',
    path: BIN_ROUTE_PATH,
    handler: async (req: IncomingMessage, res: ServerResponse) => {
      const url = new URL(req.url ?? '/', 'http://localhost')
      const segments = url.pathname.split('/').filter((segment) => segment !== '')
      // ['/dsh-cad', 'bin', '<viewId>'] → viewId is the 3rd segment.
      const viewId = segments[2]
      if (req.method !== 'GET' || viewId === undefined) {
        res.writeHead(404, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ error: 'not found' }))
        return
      }
      const entry = await store.get(viewId)
      if (entry === null) {
        res.writeHead(404, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ error: 'unknown scene' }))
        return
      }
      if (req.headers['if-none-match'] === entry.etag) {
        res.writeHead(304)
        res.end()
        return
      }
      res.writeHead(200, {
        'content-type': 'application/octet-stream',
        'content-length': entry.buffer.length,
        'cache-control': 'no-store',
        etag: entry.etag,
      })
      res.end(entry.buffer)
    },
  })
}

/** Parse a packaged demo BRep once per part (OCCT import worker), cached. */
const demoCache = new Map<string, Promise<{ body: Buffer; etag: string }>>()

function loadDemoScene(part: string): Promise<{ body: Buffer; etag: string }> {
  let entry = demoCache.get(part)
  if (entry === undefined) {
    entry = (async () => {
      const brepPath = new URL(`./demo-${part}.brep`, import.meta.url)
      const buffer = await readFile(brepPath)
      const scene = await convert(buffer, 'brep', `demo-${part}`)
      const body = Buffer.from(JSON.stringify(scene))
      return { body, etag: `"demo-${part}-${createHash('sha1').update(body).digest('hex')}"` }
    })()
    demoCache.set(part, entry)
    entry.catch(() => demoCache.delete(part))
  }
  return entry
}

/** Register the demo-scene route: GET /dsh-cad/demo-scene?part=<bracket|flange|shaft>. */
export function registerDemoRoute(server: { register: (route: SceneRoute) => () => void }): () => void {
  return server.register({
    kind: 'exact',
    path: DEMO_SCENE_ROUTE_PATH,
    handler: async (req: IncomingMessage, res: ServerResponse) => {
      const url = new URL(req.url ?? '/', 'http://localhost')
      const part = url.searchParams.get('part') ?? 'bracket'
      if (req.method !== 'GET' || !(DEMO_PARTS as readonly string[]).includes(part)) {
        res.writeHead(404, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ error: part === undefined ? 'not found' : `unknown demo part: ${part}` }))
        return
      }
      try {
        const cached = await loadDemoScene(part)
        if (req.headers['if-none-match'] === cached.etag) {
          res.writeHead(304)
          res.end()
          return
        }
        res.writeHead(200, {
          'content-type': 'application/json',
          'content-length': cached.body.length,
          'cache-control': 'private, max-age=31536000, immutable',
          etag: cached.etag,
        })
        res.end(cached.body)
      } catch (cause: unknown) {
        res.writeHead(500, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ error: cause instanceof Error ? cause.message : String(cause) }))
      }
    },
  })
}

export type { SceneRoute }
