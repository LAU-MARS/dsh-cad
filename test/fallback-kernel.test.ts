/**
 * Fallback-kernel regression (issue #5): the modeling worker loaded the
 * opencascade.js emscripten loader with a top-level require(), so an
 * ESM-format resolution crashed the worker at module scope — boot() never
 * ran and the main thread hung waiting for ready. The loader now lazy-loads
 * via dynamic import() in boot()'s fallback branch. This spawns the real
 * worker with DSH_CAD_KERNEL=opencascade.js (the bridge's kernel selector)
 * and models a box on the fallback kernel.
 */
import { describe, expect, it } from 'vitest'
import { Worker } from 'node:worker_threads'

interface WorkerMessage {
  jobId: number
  ok: boolean
  result?: { ready?: boolean; kernel?: string; mesh?: { triangleCount: number; vertexCount: number } }
  error?: string
}

function onceMessage(worker: Worker): Promise<WorkerMessage> {
  return new Promise((resolve, reject) => {
    worker.once('message', resolve)
    worker.once('error', reject)
  })
}

describe('fallback kernel (opencascade.js)', () => {
  it('boots via lazy dynamic import and models a box', async () => {
    const worker = new Worker(new URL('../src/modeling/modeling-worker.cjs', import.meta.url), {
      env: { ...process.env, DSH_CAD_KERNEL: 'opencascade.js' },
    })
    try {
      const ready = await onceMessage(worker)
      expect(ready.jobId).toBe(0)
      expect(ready.ok).toBe(true)
      expect(ready.result?.kernel).toBe('opencascade.js')

      worker.postMessage({
        jobId: 1,
        op: { kind: 'create_prim', bodyId: 'b1', prim: 'box', params: { dx: 40, dy: 30, dz: 15 } },
      })
      const built = await onceMessage(worker)
      expect(built.ok).toBe(true)
      expect(built.result?.mesh?.triangleCount).toBe(12)
    } finally {
      await worker.terminate()
    }
  }, 120_000)
})
