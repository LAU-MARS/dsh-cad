/**
 * Main-thread modeling client: one lazily spawned OCCT worker per client,
 * job correlation, and transferable buffers — the same shape as
 * convert/step.ts. The module default is a shared singleton (the live
 * modeling session); isolated conversions (e.g. .dcprt replay) spawn their
 * own client via createModelClient() and dispose() it when done, so they
 * never clobber the session state.
 */
import { Worker } from 'node:worker_threads'
import { fileURLToPath } from 'node:url'

export interface WorkerMesh {
  name: string
  positions: Float32Array
  normals: Float32Array
  indices: Uint32Array
  vertexCount: number
  triangleCount: number
}

export interface OpResult {
  bodyId?: string
  name?: string
  removed?: string[]
  edges?: number
  mesh?: WorkerMesh
  meshes?: Array<WorkerMesh & { bodyId: string }>
  bytes?: ArrayBuffer
  volume?: number
  deleted?: string
  cleared?: boolean
}

export type ModelOp =
  | { kind: 'create_prim'; bodyId: string; prim: string; params?: Record<string, unknown>; name?: string }
  | { kind: 'extrude_profile'; bodyId: string; points: number[]; height?: number; base?: number; name?: string }
  | { kind: 'boolean'; op: 'fuse' | 'cut' | 'common'; target: string; tools: string[] }
  | { kind: 'fillet'; target: string; radius: number }
  | { kind: 'transform'; target: string; translate?: [number, number, number]; rotate?: [number, number, number]; mirror?: [number, number, number] }
  | { kind: 'tessellate_all' }
  | { kind: 'export'; target: string; format: 'step' | 'stl' }
  | { kind: 'volume'; target: string }
  | { kind: 'delete'; target: string }
  | { kind: 'reset' }

interface Pending {
  resolve: (result: OpResult) => void
  reject: (error: Error) => void
  timer: NodeJS.Timeout
}

export interface ModelClient {
  /** Run one modeling operation on this client's worker. */
  run(op: ModelOp, timeoutMs?: number): Promise<OpResult>
  /** Terminate the worker and fail any in-flight jobs. */
  dispose(): void
}

export function createModelClient(): ModelClient {
  let worker: Worker | null = null
  let ready: Promise<void> | null = null
  let disposed = false
  let nextJobId = 1
  const pending = new Map<number, Pending>()

  function spawn(): { worker: Worker; ready: Promise<void> } {
    const spawned = new Worker(
      new URL('./modeling-worker.cjs', import.meta.url),
    )
    const readyPromise = new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('modeling kernel startup timed out')), 60_000)
      const onReady = (message: { jobId: number; ok: boolean; error?: string }): void => {
        clearTimeout(timer)
        if (message.ok) resolve()
        else reject(new Error(message.error ?? 'modeling kernel init failed'))
      }
      ;(spawned as unknown as { once: (event: string, listener: typeof onReady) => void }).once('message', onReady)
    })

    spawned.on('message', (response: { jobId: number; ok: boolean; result?: OpResult; error?: string }) => {
      const job = pending.get(response.jobId)
      if (job === undefined) return
      pending.delete(response.jobId)
      clearTimeout(job.timer)
      if (response.ok && response.result !== undefined) job.resolve(response.result)
      else job.reject(new Error(response.error ?? 'modeling operation failed'))
    })
    spawned.on('error', (error: Error) => failAll(error))
    spawned.on('exit', (code: number) => {
      if (code !== 0) failAll(new Error(`the modeling worker exited unexpectedly (code ${code})`))
      worker = null
      ready = null
    })

    return { worker: spawned, ready: readyPromise }
  }

  function failAll(error: Error): void {
    for (const [jobId, job] of pending) {
      pending.delete(jobId)
      clearTimeout(job.timer)
      job.reject(error)
    }
  }

  async function ensureWorker(): Promise<Worker> {
    if (worker !== null && ready !== null) {
      await ready
      return worker
    }
    const spawned = spawn()
    worker = spawned.worker
    ready = spawned.ready
    await ready
    return worker
  }

  return {
    async run(op: ModelOp, timeoutMs = 180_000): Promise<OpResult> {
      if (disposed) throw new Error('modeling client has been disposed')
      const active = await ensureWorker()
      const jobId = nextJobId++
      return new Promise<OpResult>((resolve, reject) => {
        const timer = setTimeout(() => {
          pending.delete(jobId)
          reject(new Error(`modeling operation timed out after ${timeoutMs}ms`))
        }, timeoutMs)
        pending.set(jobId, { resolve, reject, timer })
        active.postMessage({ jobId, op })
      })
    },
    dispose(): void {
      if (disposed) return
      disposed = true
      failAll(new Error('modeling client disposed'))
      if (worker !== null) void worker.terminate()
      worker = null
      ready = null
    },
  }
}

const sharedClient = createModelClient()

/**
 * Monotonic count of `reset` ops posted through the shared worker. Any
 * out-of-band replay (e.g. opening a .dcprt) resets the worker and bumps the
 * epoch, so the modeling session owner can detect staleness and re-replay
 * its document before the next op.
 */
let resetEpoch = 0

/** Run one modeling operation on the shared session worker. */
export async function runModelOp(op: ModelOp, timeoutMs = 180_000): Promise<OpResult> {
  const result = await sharedClient.run(op, timeoutMs)
  if (op.kind === 'reset') resetEpoch += 1
  return result
}

/** Current reset epoch of the shared worker (see above). */
export function workerResetEpoch(): number {
  return resetEpoch
}

/** Test/Dev helper: hard worker file path (used by the vitest suite). */
export function workerEntryPath(): string {
  return fileURLToPath(new URL('./modeling-worker.cjs', import.meta.url))
}
