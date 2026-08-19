/**
 * Same-origin scene routes:
 * - GET /dsh-cad/scene/<viewId>  — JSON scenes (cad_view files)
 * - GET /dsh-cad/bin/<viewId>    — packed binary scenes (modeling document)
 */
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { SceneStore } from './store.js'
import type { BinarySceneStore } from './modeling/bin-store.js'

export const SCENE_ROUTE_PATH = '/dsh-cad/scene'
export const BIN_ROUTE_PATH = '/dsh-cad/bin'

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

export type { SceneRoute }
