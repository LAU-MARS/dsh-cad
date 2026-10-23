/**
 * Fallback-tier removal guard (v0.15.1): the opencascade.js backend is gone —
 * the chain is cadorange → direct occt.ts. Spawning the real worker with
 * DSH_CAD_KERNEL=opencascade.js must now fail CLEANLY with the removal
 * message (not silently boot a different kernel, and never hang the main
 * thread waiting for a ready that never comes — the original issue #5 class).
 */
import { describe, expect, it } from 'vitest'
import { Worker } from 'node:worker_threads'

interface WorkerMessage {
  jobId: number
  ok: boolean
  result?: { ready?: boolean; kernel?: string }
  error?: string
}

describe('removed opencascade.js tier', () => {
  it('DSH_CAD_KERNEL=opencascade.js fails with the removal message', { timeout: 60_000 }, async () => {
    const worker = new Worker(new URL('../src/modeling/modeling-worker.cjs', import.meta.url), {
      env: { ...process.env, DSH_CAD_KERNEL: 'opencascade.js' },
    })
    try {
      const message = await new Promise<WorkerMessage>((resolve, reject) => {
        worker.once('message', resolve)
        worker.once('error', reject)
      })
      expect(message.jobId).toBe(0)
      expect(message.ok).toBe(false)
      expect(message.error).toMatch(/opencascade\.js fallback backend was removed in v0\.15\.1/)
      expect(message.error).toMatch(/cadorange/)
    } finally {
      await worker.terminate()
    }
  })
})
