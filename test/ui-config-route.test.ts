/**
 * `/dsh-cad/ui-config` payload contract: the cross-runtime channel that carries
 * the host `autoOpen` option to the client half (issue #14). GET returns the
 * resolved mode; anything else is a 404, and a missing/invalid config resolves
 * to the `tool-use` default rather than surfacing a broken value.
 */
import { Readable } from 'node:stream'
import { describe, expect, it } from 'vitest'
import { normalizeAutoOpen, registerUiConfigRoute } from '../src/routes.js'
import type { AutoOpenMode } from '../src/routes.js'

interface UiConfigPayload {
  autoOpen: AutoOpenMode
}

function fakeRes(): { res: unknown; body: () => string; status: () => number } {
  let payload = ''
  let status = 0
  const res = {
    writeHead(code: number) {
      status = code
      return res
    },
    end(chunk?: string | Buffer) {
      payload += chunk === undefined ? '' : String(chunk)
    },
  }
  return { res, body: () => payload, status: () => status }
}

function buildRoute(autoOpen: AutoOpenMode): { handler: (req: unknown, res: unknown) => unknown } {
  const routes = new Map<string, (req: unknown, res: unknown) => unknown>()
  const server = {
    register: (route: { path: string; handler: (req: unknown, res: unknown) => unknown }) => {
      routes.set(route.path, route.handler)
      return () => { routes.delete(route.path) }
    },
  }
  registerUiConfigRoute(server as never, () => ({ autoOpen }))
  const handler = routes.get('/dsh-cad/ui-config')
  expect(typeof handler).toBe('function')
  return { handler: handler! }
}

async function call(handler: (req: unknown, res: unknown) => unknown, method: string): Promise<{ status: number; body: string }> {
  const writer = fakeRes()
  const req = { method, url: '/dsh-cad/ui-config', headers: {}, ...Readable.from([]) }
  await handler(req, writer.res)
  return { status: writer.status(), body: writer.body() }
}

describe('GET /dsh-cad/ui-config', () => {
  it('returns the configured auto-open mode', async () => {
    const { handler } = buildRoute('never')
    const { status, body } = await call(handler, 'GET')
    expect(status).toBe(200)
    expect(JSON.parse(body) as UiConfigPayload).toEqual({ autoOpen: 'never' })
  })

  it('defaults a missing config to tool-use', () => {
    expect(normalizeAutoOpen(undefined)).toBe('tool-use')
    expect(normalizeAutoOpen('bogus')).toBe('tool-use')
  })

  it('rejects non-GET requests', async () => {
    const { handler } = buildRoute('session')
    const { status } = await call(handler, 'POST')
    expect(status).toBe(404)
  })
})
