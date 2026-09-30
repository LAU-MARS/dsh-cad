/**
 * cad_script: deterministic script evaluation for geometry math. The js path
 * runs in a fresh Node vm realm (no require/process, hard timeout), which is
 * the only execution path available when the host shell tool is broken; the
 * py path is environment-dependent, so its assertions accept either a working
 * interpreter or the clear "no interpreter" guidance.
 */
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createCadScriptTool } from '../src/tools/cad-script.js'

interface ToolLike {
  execute: (args: Record<string, unknown>) => Promise<Record<string, unknown>>
}

let root: string
let tool: ToolLike

beforeEach(async () => {
  root = await mkdtemp(path.join(tmpdir(), 'dsh-cad-eval-'))
  tool = createCadScriptTool({ workspaceRoot: root }) as unknown as ToolLike
})

afterEach(async () => {
  await rm(root, { recursive: true, force: true })
})

describe('cad_script js', () => {
  it('returns the completion value as resultJson and captures console.log', async () => {
    // The motivating use case: generating a rounded-corner profile arc.
    const out = await tool.execute({
      language: 'js',
      code: `
        const pts = []
        const cx = 72, cy = 52, r = 8
        for (let i = 0; i <= 6; i++) {
          const a = (i / 6) * Math.PI / 2
          pts.push(+(cx + r * Math.cos(a)).toFixed(3), +(cy + r * Math.sin(a)).toFixed(3))
        }
        console.log('points:', pts.length / 2)
        pts
      `,
    })
    expect(out.ok).toBe(true)
    expect(out.stdout).toBe('points: 7')
    const pts = JSON.parse(String(out.resultJson)) as number[]
    expect(pts).toHaveLength(14)
    // First point on the arc: (cx + r, cy); last: (cx, cy + r).
    expect(pts[0]).toBeCloseTo(80, 6)
    expect(pts[12]).toBeCloseTo(72, 6)
    // Every point exactly r from the corner center — the property the agent
    // kept missing by hand ("arc endpoints are not equidistant"). 3-decimal
    // rounding in the script allows ~1e-3 radial error.
    for (let i = 0; i < pts.length; i += 2) {
      expect(Math.hypot(pts[i] - 72, pts[i + 1] - 52)).toBeCloseTo(8, 2)
    }
  })

  it('reports syntax errors without throwing', async () => {
    const out = await tool.execute({ language: 'js', code: 'const = nope' })
    expect(out.ok).toBe(false)
    expect(String(out.error)).toMatch(/Unexpected token|Unexpected identifier/)
  })

  it('kills infinite loops at the timeout', async () => {
    const out = await tool.execute({ language: 'js', code: 'while (true) {}', timeoutMs: 500 })
    expect(out.ok).toBe(false)
    expect(String(out.error)).toMatch(/timed out/i)
  })

  it('has no require/process in the vm realm', async () => {
    const out = await tool.execute({ language: 'js', code: 'typeof require + "/" + typeof process' })
    expect(out.ok).toBe(true)
    expect(out.resultJson).toBe('"undefined/undefined"')
  })

  it('rejects asynchronous completion values', async () => {
    const out = await tool.execute({ language: 'js', code: 'Promise.resolve(1)' })
    expect(out.ok).toBe(false)
    expect(String(out.error)).toMatch(/synchronous/)
  })
})

describe('cad_script py', () => {
  it('runs print output when an interpreter exists, otherwise says so clearly', async () => {
    const out = await tool.execute({ language: 'py', code: 'print(6 * 7)' })
    if (out.ok === true) {
      expect(String(out.stdout).trim()).toBe('42')
    } else {
      expect(String(out.error)).toMatch(/no runnable Python interpreter|failed to launch|exited with code/)
    }
  })
})
