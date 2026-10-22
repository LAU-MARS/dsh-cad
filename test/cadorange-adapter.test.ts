/**
 * cadorange backend (opt-in, DSH_CAD_KERNEL=cadorange): the adapter now
 * implements the FULL verb surface against cadorange 0.9.0's public API plus
 * the supported cadorange/occt escape hatch (tessellation, HLR, wire
 * construction). cadorange is an installed dependency, so the parity gate
 * runs REAL geometry through the actual modeling worker: exact volume
 * assertions (the same analytic values the occt.ts backend is held to),
 * meshes, STEP/STL bytes and true-HLR drawing views.
 */
process.env.DSH_CAD_KERNEL = 'cadorange'

import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterAll, describe, expect, it } from 'vitest'
import { Worker } from 'node:worker_threads'
import { runModelOp } from '../src/modeling/client.js'
import { resolveCadorangeDist } from '../src/modeling/cadorange-bridge.cjs'

afterAll(() => {
  delete process.env.DSH_CAD_KERNEL
})

describe('cadorange bridge resolution', () => {
  it('resolves the installed cadorange dist (core + escape hatch)', () => {
    const dist = resolveCadorangeDist()
    expect(dist).toBeTruthy()
    expect(dist).toMatch(/cadorange/)
  })

  it('honors DSH_CADORANGE pointing at a package root, requiring the escape hatch too', async () => {
    const dir = await mkdtemp(path.join(tmpdir(), 'dsh-cad-cadorange-'))
    await mkdir(path.join(dir, 'dist', 'occt'), { recursive: true })
    await writeFile(path.join(dir, 'dist', 'index.js'), 'export const ok = true\n')
    await writeFile(path.join(dir, 'dist', 'occt', 'index.js'), 'export const ok = true\n')
    process.env.DSH_CADORANGE = dir
    try {
      expect(resolveCadorangeDist()).toBe(path.join(dir, 'dist'))
    } finally {
      delete process.env.DSH_CADORANGE
    }
  })
})

describe('cadorange worker boot', () => {
  it('the DEFAULT chain boots cadorange first (installed dependency)', { timeout: 90_000 }, async () => {
    const env = { ...process.env }
    delete env.DSH_CAD_KERNEL
    const worker = new Worker(new URL('../src/modeling/modeling-worker.cjs', import.meta.url), { env })
    try {
      const message = await new Promise<{ ok: boolean; result?: { kernel?: string } }>((resolve, reject) => {
        worker.once('message', resolve)
        worker.once('error', reject)
      })
      expect(message.ok).toBe(true)
      expect(message.result?.kernel).toBe('cadorange')
    } finally {
      await worker.terminate()
    }
  })

  it('DSH_CAD_KERNEL=cadorange reports kernel: cadorange', { timeout: 90_000 }, async () => {
    const worker = new Worker(new URL('../src/modeling/modeling-worker.cjs', import.meta.url), {
      env: { ...process.env, DSH_CAD_KERNEL: 'cadorange' },
    })
    try {
      const message = await new Promise<{ jobId: number; ok: boolean; result?: { kernel?: string }; error?: string }>((resolve, reject) => {
        worker.once('message', resolve)
        worker.once('error', reject)
      })
      expect(message.jobId).toBe(0)
      expect(message.ok).toBe(true)
      expect(message.result?.kernel).toBe('cadorange')
    } finally {
      await worker.terminate()
    }
  })
})

describe('cadorange backend parity (real kernel)', () => {
  it('creates a box and cuts an exact-volume hole', { timeout: 120_000 }, async () => {
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 'b1', prim: 'box', params: { dx: 100, dy: 60, dz: 10 } })
    await runModelOp({ kind: 'create_prim', bodyId: 'hole', prim: 'cylinder', params: { radius: 10, height: 20, at: [50, 30, 0] } })
    const cut = await runModelOp({ kind: 'boolean', op: 'cut', target: 'b1', tools: ['hole'] })
    expect(cut.bodyId).toBe('b1')
    expect(cut.removed).toContain('hole')
    expect(cut.mesh!.triangleCount).toBeGreaterThanOrEqual(12)
    const volume = await runModelOp({ kind: 'volume', target: 'b1' })
    expect(volume.volume).toBeCloseTo(100 * 60 * 10 - Math.PI * 10 * 10 * 10, 0)
  })

  it('extrudes flat / circle / curve-segment profiles exactly', { timeout: 120_000 }, async () => {
    await runModelOp({ kind: 'reset' })
    const points = [0, 0, 40, 0, 40, 10, 10, 10, 10, 30, 0, 30]
    await runModelOp({ kind: 'extrude_profile', bodyId: 'L', points, height: 5 })
    const lVolume = await runModelOp({ kind: 'volume', target: 'L' })
    expect(lVolume.volume).toBeCloseTo(3000, 0) // (40×10 + 10×20) × 5

    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'extrude_profile', bodyId: 'disc', profile: { circle: { center: [0, 0], radius: 10 } }, height: 5 })
    const disc = await runModelOp({ kind: 'volume', target: 'disc' })
    expect(disc.volume).toBeCloseTo(Math.PI * 100 * 5, 0)

    // Stadium: two lines + two half-circle arcs (exact arcs through the hatch).
    await runModelOp({ kind: 'reset' })
    const stadium = {
      start: [-20, -10],
      segments: [
        { type: 'line', to: [20, -10] },
        { type: 'arc', to: [20, 10], center: [20, 0], ccw: true },
        { type: 'line', to: [-20, 10] },
        { type: 'arc', to: [-20, -10], center: [-20, 0], ccw: true },
      ],
    }
    await runModelOp({ kind: 'extrude_profile', bodyId: 'stadium', profile: stadium, height: 4 })
    const sVolume = await runModelOp({ kind: 'volume', target: 'stadium' })
    expect(sVolume.volume).toBeCloseTo((40 * 20 + Math.PI * 100) * 4, 0)
  })

  it('revolves, lofts (plain/smooth/profile sections) and sweeps valid solids', { timeout: 120_000 }, async () => {
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'revolve', bodyId: 'ring', profile: [20, 0, 30, 0, 30, 5, 20, 5] })
    const ring = await runModelOp({ kind: 'volume', target: 'ring' })
    expect(ring.volume).toBeCloseTo(2500 * Math.PI, 0) // Pappus: 2π·25·50

    await runModelOp({ kind: 'reset' })
    await runModelOp({
      kind: 'loft',
      bodyId: 'loft1',
      sections: [
        [-20, -20, 0, 20, -20, 0, 20, 20, 0, -20, 20, 0],
        [-10, -10, 20, 10, -10, 20, 10, 10, 20, -10, 10, 20],
      ],
    })
    const loftVolume = await runModelOp({ kind: 'volume', target: 'loft1' })
    expect(loftVolume.volume).toBeGreaterThan(0)

    await runModelOp({ kind: 'reset' })
    await runModelOp({
      kind: 'loft',
      bodyId: 'smooth',
      sections: [
        { points: [-20, -20, 0, 20, -20, 0, 20, 20, 0, -20, 20, 0] },
        { points: [-10, -10, 20, 10, -10, 20, 10, 10, 20, -10, 10, 20] },
      ],
      smooth: true,
    })
    const smoothVolume = await runModelOp({ kind: 'volume', target: 'smooth' })
    expect(smoothVolume.volume).toBeGreaterThan(0)

    await runModelOp({ kind: 'reset' })
    await runModelOp({
      kind: 'sweep',
      bodyId: 'pipe',
      profile: { circle: { center: [0, 0], radius: 3 } },
      path: [0, 0, 0, 0, 0, 20],
    })
    const pipe = await runModelOp({ kind: 'volume', target: 'pipe' })
    expect(pipe.volume).toBeCloseTo(Math.PI * 9 * 20, 0)
  })

  it('fillets, shells (open face by normal) and drafts', { timeout: 120_000 }, async () => {
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 'box', prim: 'box', params: { dx: 40, dy: 40, dz: 10 } })
    const filleted = await runModelOp({ kind: 'fillet', target: 'box', radius: 2 })
    expect(filleted.mesh!.triangleCount).toBeGreaterThan(12)
    const fVolume = await runModelOp({ kind: 'volume', target: 'box' })
    expect(fVolume.volume).toBeLessThan(40 * 40 * 10)

    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 'box', prim: 'box', params: { dx: 20, dy: 20, dz: 20 } })
    const shelled = await runModelOp({ kind: 'shell', target: 'box', thickness: 2, openNormals: [[0, 0, 1]] })
    expect(shelled.volume).toBeCloseTo(20 ** 3 - 16 * 16 * 18, 0)

    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 'box', prim: 'box', params: { dx: 20, dy: 20, dz: 20 } })
    const drafted = await runModelOp({ kind: 'draft', target: 'box', angle: 5 })
    expect(drafted.volume).not.toBeCloseTo(20 ** 3, 0)
  })

  it('transforms (translate/rotate/mirror) preserve volume', { timeout: 120_000 }, async () => {
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 'box', prim: 'box', params: { dx: 10, dy: 10, dz: 10 } })
    await runModelOp({ kind: 'transform', target: 'box', translate: [100, 0, 0], rotate: [0, 0, 45], mirror: [1, 0, 0] })
    const moved = await runModelOp({ kind: 'volume', target: 'box' })
    expect(moved.volume).toBeCloseTo(1000, 0)
    expect(moved.centroid).toBeDefined()
  })

  it('exports STEP bytes and structured assembly STEP', { timeout: 120_000 }, async () => {
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 'b1', prim: 'box', params: { dx: 30, dy: 20, dz: 10 } })
    const step = await runModelOp({ kind: 'export', target: 'b1', format: 'step' })
    expect(Buffer.from(step.bytes!).toString('latin1').startsWith('ISO-10303-21')).toBe(true)

    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 'a', prim: 'box', params: { dx: 20, dy: 20, dz: 5 } })
    await runModelOp({ kind: 'create_prim', bodyId: 'b', prim: 'sphere', params: { radius: 5 } })
    await runModelOp({ kind: 'assembly_insert', instanceId: 'i1', bodyId: 'a', name: 'plate' })
    await runModelOp({ kind: 'assembly_insert', instanceId: 'i2', bodyId: 'b', name: 'ball', translate: [10, 10, 5], rotate: [0, 90, 0] })
    const asm = await runModelOp({ kind: 'export_assembly', format: 'step' })
    const text = Buffer.from(asm.bytes!).toString('latin1')
    expect(text.startsWith('ISO-10303-21')).toBe(true)
    expect(text).toContain('plate')
    expect(text).toContain('ball')
  })

  it('projects true hidden-line drawing views (same kernel session)', { timeout: 120_000 }, async () => {
    await runModelOp({ kind: 'reset' })
    await runModelOp({ kind: 'create_prim', bodyId: 'b1', prim: 'box', params: { dx: 100, dy: 60, dz: 10 } })
    await runModelOp({ kind: 'create_prim', bodyId: 'hole', prim: 'cylinder', params: { radius: 10, height: 30, at: [50, 30, -10] } })
    await runModelOp({ kind: 'boolean', op: 'cut', target: 'b1', tools: ['hole'] })
    const drawing = await runModelOp({ kind: 'drawing', target: 'b1' })
    expect(drawing.views!.length).toBe(4)
    const front = drawing.views!.find((view) => view.name === 'front')
    expect(front).toBeDefined()
    expect(front!.visible.length + front!.hidden.length).toBeGreaterThan(0)
  })
})
