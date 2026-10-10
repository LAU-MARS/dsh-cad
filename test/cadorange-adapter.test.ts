/**
 * cadorange backend seam (cadorange-adapter branch): the adapter maps
 * dsh-cad's 21-verb kernel surface onto cadorange's public API, with loud
 * structured errors for verbs cadorange hasn't reached yet. Tested against a
 * mock cadorange module (the real one's kernel init lands with cadorange M0);
 * plus the worker's kernel-selection wiring against the real resolution
 * chain (DSH_CAD_KERNEL=cadorange).
 */
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { Worker } from 'node:worker_threads'
import { createCadorangeAdapter } from '../src/modeling/cadorange-adapter.cjs'
import { resolveCadorangeEntry } from '../src/modeling/cadorange-bridge.cjs'

/** Minimal cadorange surface double: records calls, returns fake shapes. */
function makeFakeCadorange() {
  const calls: Array<{ fn: string; args: unknown[] }> = []
  const shape = (name: string, vol: number) => ({
    tag: name,
    volume: () => vol,
    describe: () => ({ volume: vol, valid: true, faces: 6, edges: 12 }),
    edges: () => ['e1', 'e2'],
    cut: (tool: unknown) => shape(`${name}-cut`, vol - 1),
    fuse: (tool: unknown) => shape(`${name}-fuse`, vol + 1),
  })
  const cad = {
    calls,
    init: async () => {},
    Box: (...args: unknown[]) => (calls.push({ fn: 'Box', args }), shape('box', 2 * 3 * 4)),
    Cylinder: (opts: { radius: number; height: number }) => shape('cyl', Math.PI * opts.radius ** 2 * opts.height),
    Sphere: () => shape('sphere', 1),
    Cone: () => shape('cone', 1),
    Torus: () => shape('torus', 1),
    fillet: (...args: unknown[]) => (calls.push({ fn: 'fillet', args }), shape('filleted', 1)),
    chamfer: (...args: unknown[]) => (calls.push({ fn: 'chamfer', args }), shape('chamfered', 1)),
    fuse: (a: unknown, b: unknown) => shape('fused', 1),
    cut: (a: unknown, b: unknown) => shape('cutted', 1),
    common: (a: unknown, b: unknown) => shape('commoned', 1),
  }
  return cad
}

describe('cadorange adapter', () => {
  it('delegates prims / booleans / filletAll to the cadorange API', () => {
    const cad = makeFakeCadorange()
    const adapter = createCadorangeAdapter(cad)
    expect(adapter.kernel).toBe('cadorange')

    const box = adapter.makePrim('box', { dx: 2, dy: 3, dz: 4 })
    expect(cad.calls[0]).toEqual({ fn: 'Box', args: [2, 3, 4] })
    expect(adapter.volume(box)).toBe(24)
    expect(adapter.isValid(box)).toBe(true)

    const cyl = adapter.makePrim('cylinder', { radius: 3, height: 10 })
    expect(adapter.volume(cyl)).toBeCloseTo(Math.PI * 9 * 10, 6)

    adapter.boolean('cut', box, [cyl])
    expect((box as { tag: string }).tag).toBe('box')
    adapter.boolean('fuse', box, [cyl])

    adapter.filletAll(box, 3)
    expect(cad.calls.at(-1)).toEqual({ fn: 'fillet', args: [['e1', 'e2'], 3] })
    adapter.chamferAll(box, 1.5)
    expect(cad.calls.at(-1)).toEqual({ fn: 'chamfer', args: [['e1', 'e2'], 1.5] })
  })

  it('unsupported verbs fail loudly with the milestone hint', () => {
    const adapter = createCadorangeAdapter(makeFakeCadorange())
    expect(() => adapter.shell({}, 2, [])).toThrow(/not support shell yet.*M1/)
    expect(() => adapter.makeLoft([], {})).toThrow(/not support loft yet/)
    expect(() => adapter.tessellate({})).toThrow(/tessellate/)
    expect(() => adapter.makePrim('wedge' as never, {})).toThrow(/unknown prim kind/)
  })
})

describe('cadorange bridge resolution', () => {
  it('honors DSH_CADORANGE pointing at a package root', async () => {
    const dir = await mkdtemp(path.join(tmpdir(), 'dsh-cad-cadorange-'))
    await mkdir(path.join(dir, 'dist'), { recursive: true })
    await writeFile(path.join(dir, 'dist', 'index.js'), 'export const ok = true\n')
    process.env.DSH_CADORANGE = dir
    try {
      expect(resolveCadorangeEntry()).toBe(path.join(dir, 'dist', 'index.js'))
    } finally {
      delete process.env.DSH_CADORANGE
    }
  })

  it('DSH_CAD_KERNEL=cadorange boots the worker onto the cadorange branch', { timeout: 60_000 }, async () => {
    const worker = new Worker(new URL('../src/modeling/modeling-worker.cjs', import.meta.url), {
      env: { ...process.env, DSH_CAD_KERNEL: 'cadorange' },
    })
    try {
      const message = await new Promise<{ jobId: number; ok: boolean; result?: { kernel?: string }; error?: string }>((resolve, reject) => {
        worker.once('message', resolve)
        worker.once('error', reject)
      })
      expect(message.jobId).toBe(0)
      if (message.ok) {
        // cadorange's kernel init has landed: the backend reports itself.
        expect(message.result?.kernel).toBe('cadorange')
      } else {
        // Today: init() is a skeleton stub (or cadorange is unresolvable) —
        // either way the failure is clean and names the backend.
        expect(message.error).toMatch(/cadorange/)
      }
    } finally {
      await worker.terminate()
    }
  })
})
