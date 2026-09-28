/**
 * Main-thread modeling client: one lazily spawned OCCT worker per client,
 * job correlation, and transferable buffers — the same shape as
 * convert/step.ts. The module default is a shared singleton (the live
 * modeling session); isolated conversions (e.g. .dcprt replay) spawn their
 * own client via createModelClient() and dispose() it when done, so they
 * never clobber the session state.
 */
import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';
export function createModelClient() {
    let worker = null;
    let ready = null;
    let disposed = false;
    let nextJobId = 1;
    const pending = new Map();
    function spawn() {
        const spawned = new Worker(new URL('./modeling-worker.cjs', import.meta.url));
        const readyPromise = new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('modeling kernel startup timed out')), 60_000);
            const onReady = (message) => {
                clearTimeout(timer);
                if (message.ok)
                    resolve();
                else
                    reject(new Error(message.error ?? 'modeling kernel init failed'));
            };
            spawned.once('message', onReady);
        });
        spawned.on('message', (response) => {
            const job = pending.get(response.jobId);
            if (job === undefined)
                return;
            pending.delete(response.jobId);
            clearTimeout(job.timer);
            if (response.ok && response.result !== undefined)
                job.resolve(response.result);
            else
                job.reject(new Error(response.error ?? 'modeling operation failed'));
        });
        spawned.on('error', (error) => failAll(error));
        spawned.on('exit', (code) => {
            if (code !== 0)
                failAll(new Error(`the modeling worker exited unexpectedly (code ${code})`));
            worker = null;
            ready = null;
        });
        return { worker: spawned, ready: readyPromise };
    }
    function failAll(error) {
        for (const [jobId, job] of pending) {
            pending.delete(jobId);
            clearTimeout(job.timer);
            job.reject(error);
        }
    }
    async function ensureWorker() {
        if (worker !== null && ready !== null) {
            await ready;
            return worker;
        }
        const spawned = spawn();
        worker = spawned.worker;
        ready = spawned.ready;
        await ready;
        return worker;
    }
    return {
        async run(op, timeoutMs = 180_000) {
            if (disposed)
                throw new Error('modeling client has been disposed');
            const active = await ensureWorker();
            const jobId = nextJobId++;
            return new Promise((resolve, reject) => {
                const timer = setTimeout(() => {
                    pending.delete(jobId);
                    reject(new Error(`modeling operation timed out after ${timeoutMs}ms`));
                }, timeoutMs);
                pending.set(jobId, { resolve, reject, timer });
                active.postMessage({ jobId, op });
            });
        },
        dispose() {
            if (disposed)
                return;
            disposed = true;
            failAll(new Error('modeling client disposed'));
            if (worker !== null)
                void worker.terminate();
            worker = null;
            ready = null;
        },
    };
}
const sharedClient = createModelClient();
/**
 * Monotonic count of `reset` ops posted through the shared worker. Any
 * out-of-band replay (e.g. opening a .dcprt) resets the worker and bumps the
 * epoch, so the modeling session owner can detect staleness and re-replay
 * its document before the next op.
 */
let resetEpoch = 0;
/** Run one modeling operation on the shared session worker. */
export async function runModelOp(op, timeoutMs = 180_000) {
    const result = await sharedClient.run(op, timeoutMs);
    if (op.kind === 'reset')
        resetEpoch += 1;
    return result;
}
/** Current reset epoch of the shared worker (see above). */
export function workerResetEpoch() {
    return resetEpoch;
}
/** Test/Dev helper: hard worker file path (used by the vitest suite). */
export function workerEntryPath() {
    return fileURLToPath(new URL('./modeling-worker.cjs', import.meta.url));
}
