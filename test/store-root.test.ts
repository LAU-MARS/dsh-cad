/**
 * config.root wiring: the document file space and the relative-path fallback
 * root must honor the documented `root` config, not the launch directory.
 *
 * Regression: `apply()` wired `config.root` into the scene stores but built
 * `DocumentRegistry` and `workspaceRoot` from `process.cwd()`. On hosts
 * launched outside the workspace (the issue #6 class — e.g. a container whose
 * entrypoint cds into the install directory, which may not even be writable),
 * `cad_doc_new` wrote `.dsh-cad/` into the launch directory and failed with
 * EACCES while every other store landed in the configured root.
 */
import { mkdtemp, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { apply } from '../src/index.js'
import { resolveDistDir } from '../src/modeling/occt-bridge.cjs'

const occtAvailable = resolveDistDir() !== null

interface ToolLike {
  name: string
  execute: (args: unknown, exec?: unknown) => Promise<Record<string, unknown>>
}

const session = (id: string) => ({ agent: { id } })

/** Minimal host context: capture registered tools, stub the HTTP server. */
function fakeHost(): { ctx: unknown; tools: Map<string, ToolLike> } {
  const tools = new Map<string, ToolLike>()
  const ctx = {
    get: (name: string) =>
      name === 'webServer' || name === 'httpServer' ? { register: () => () => {} } : undefined,
    tools: {
      register: (tool: ToolLike) => {
        tools.set(tool.name, tool)
        return () => {}
      },
    },
    effect: () => {},
  }
  return { ctx, tools }
}

describe('config.root wiring (document store + workspace fallback)', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('cad_doc_new writes the file space under config.root, not the launch directory', { timeout: 120_000 }, async () => {
    if (!occtAvailable) throw new Error('occt.ts kernel not found — run npm install first')
    const workspace = await mkdtemp(path.join(tmpdir(), 'dsh-cad-store-root-'))
    vi.useFakeTimers()
    const { ctx, tools } = fakeHost()
    apply(ctx as never, { root: workspace })
    // The demo-route retry interval self-clears once routes are registered.
    vi.advanceTimersByTime(100)
    vi.useRealTimers()

    const docNew = tools.get('cad_doc_new')
    expect(docNew).toBeDefined()
    const created = await docNew!.execute({ name: 'store-root-regression' }, session('s1'))
    expect(String(created.docId)).toMatch(/^[0-9a-f-]{36}$/)

    // The manifest and the document live under the configured root — the
    // pre-fix code rooted the registry at process.cwd() instead, so this
    // lookup ENOENTs without the fix. (No assertion about the launch
    // directory: sibling suites legitimately exercise the default-root path.)
    await expect(stat(path.join(workspace, '.dsh-cad', 'index.json'))).resolves.toBeTruthy()
    const docs = await stat(path.join(workspace, '.dsh-cad', 'docs'))
    expect(docs.isDirectory()).toBe(true)
  })
})
