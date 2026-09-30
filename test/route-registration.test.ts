/**
 * Route lifecycle regression: hosts that hot-reload plugins (the desktop
 * runtime) re-run apply() within one process, and the shared webServer throws
 * on duplicate (kind, path). apply()'s cleanup must unregister every route it
 * added — a leaked batch made the next apply() throw "duplicate prefix route"
 * and broke every viewer-dependent tool call until a process restart.
 */
import { describe, expect, it, vi } from 'vitest'
import type { Context } from '@deepseek-ai/cordis'
import { apply } from '../src/index.js'

interface FakeRoute {
  kind: 'prefix' | 'exact'
  path: string
  handler: unknown
}

/** Mirrors the host contract: duplicate (kind, path) throws; the disposer removes the route. */
function makeFakeServer(poisonPath?: string) {
  const table = new Map<string, FakeRoute>()
  let poisoned = poisonPath
  return {
    table,
    cure: () => {
      poisoned = undefined
    },
    register(route: FakeRoute): () => void {
      if (route.path === poisoned) throw new Error('webserver: injected failure')
      if (table.has(route.path)) throw new Error(`webserver: duplicate ${route.kind} route "${route.path}"`)
      table.set(route.path, route)
      return () => {
        table.delete(route.path)
      }
    },
  }
}

function makeCtx(server: ReturnType<typeof makeFakeServer>) {
  const cleanups: Array<() => void> = []
  const tools: string[] = []
  const ctx = {
    get: (name: string) => (name === 'webServer' ? server : undefined),
    tools: {
      register: (tool: { name: string }) => {
        tools.push(tool.name)
        return () => {}
      },
    },
    effect: (fn: () => () => void) => {
      cleanups.push(fn())
    },
  }
  return { ctx: ctx as unknown as Context, cleanups, tools }
}

function disposeAll(cleanups: Array<() => void>): void {
  for (const cleanup of cleanups.splice(0)) cleanup()
}

describe('route registration lifecycle', () => {
  it('re-apply after disposal re-registers cleanly (no duplicate-route error)', () => {
    const server = makeFakeServer()
    const first = makeCtx(server)
    apply(first.ctx)
    expect(server.table.size).toBe(7)
    expect(first.tools.length).toBeGreaterThan(0)
    disposeAll(first.cleanups)
    expect(server.table.size).toBe(0)

    const second = makeCtx(server)
    expect(() => apply(second.ctx)).not.toThrow()
    expect(server.table.size).toBe(7)
    disposeAll(second.cleanups)
    expect(server.table.size).toBe(0)
  })

  it('rolls back the partial batch when a mid-sequence registration fails, then recovers on retry', async () => {
    // Poison the 4th registration in the batch: the first three must not
    // linger, or the retry would trip the duplicate guard on them.
    const server = makeFakeServer('/dsh-cad/docs')
    const inst = makeCtx(server)
    apply(inst.ctx)
    expect(server.table.size).toBe(0)

    server.cure()
    await vi.waitFor(() => expect(server.table.size).toBe(7), { timeout: 2000, interval: 50 })
    disposeAll(inst.cleanups)
    expect(server.table.size).toBe(0)
  })
})
