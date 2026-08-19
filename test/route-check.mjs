/**
 * HTTP-layer verification: mount the compiled scene route on a bare
 * node:http server with a real SceneStore, then exercise the GET flow.
 */
import { createServer } from 'node:http'
import { mkdir, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { registerSceneRoute } from '../lib/routes.js'
import { SceneStore } from '../lib/store.js'
import { convert } from '../lib/convert/index.js'
import { readFile } from 'node:fs/promises'

const root = path.join(process.cwd(), '.tmp-route-check')
await rm(root, { recursive: true, force: true })
const store = new SceneStore(root)

const cubeSTL = await convert(await readFile('test/fixtures/sample.step'), 'step', 'sample.step')
const viewId = await store.put(cubeSTL)

const routes = []
registerSceneRoute({ register: (route) => { routes.push(route); return () => {} } }, store)

const server = createServer((req, res) => {
  for (const route of routes) {
    const url = new URL(req.url ?? '/', 'http://localhost')
    if (route.kind === 'prefix' ? url.pathname.startsWith(route.path) : url.pathname === route.path) {
      void route.handler(req, res)
      return
    }
  }
  res.writeHead(404)
  res.end('fallback')
})

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const port = server.address().port

const good = await fetch(`http://127.0.0.1:${port}/dsh-cad/scene/${viewId}`)
const goodBody = await good.json()
console.log('GET scene:', good.status, good.headers.get('content-type'), 'kind=', goodBody.kind, 'meshes=', goodBody.meshes?.length)

const etag = good.headers.get('etag')
const cached = await fetch(`http://127.0.0.1:${port}/dsh-cad/scene/${viewId}`, { headers: { 'if-none-match': etag } })
console.log('ETag revalidate:', cached.status)

const missing = await fetch(`http://127.0.0.1:${port}/dsh-cad/scene/00000000-0000-0000-0000-000000000000`)
console.log('unknown id:', missing.status, (await missing.json()).error)

const traversal = await fetch(`http://127.0.0.1:${port}/dsh-cad/scene/..%2f..%2fetc%2fpasswd`)
console.log('path traversal:', traversal.status)

const post = await fetch(`http://127.0.0.1:${port}/dsh-cad/scene/${viewId}`, { method: 'POST' })
console.log('non-GET:', post.status)

server.close()
await rm(root, { recursive: true, force: true })
console.log('OK')
// The lazily spawned occt worker (from the STEP conversion) keeps the loop
// alive; this script has nothing left to wait for.
process.exit(0)
