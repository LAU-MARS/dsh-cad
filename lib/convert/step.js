/**
 * Main-thread wrapper around the occt-import-js worker: one lazily spawned
 * worker, job correlation, transferable buffers, and cooperative timeouts.
 */
import { Worker } from 'node:worker_threads';
import { encodeF32B64, encodeU32B64 } from '../b64.js';
let worker = null;
let nextJobId = 1;
const pending = new Map();
function ensureWorker() {
    if (worker !== null)
        return worker;
    const spawned = new Worker(new URL('./step-worker.mjs', import.meta.url));
    spawned.on('message', (response) => {
        const job = pending.get(response.jobId);
        if (job === undefined)
            return;
        pending.delete(response.jobId);
        clearTimeout(job.timer);
        if (response.ok)
            job.resolve(response.meshes);
        else
            job.reject(new Error(response.error));
    });
    spawned.on('error', (error) => {
        failAll(error instanceof Error ? error : new Error(String(error)));
    });
    spawned.on('exit', (code) => {
        if (code !== 0)
            failAll(new Error(`the geometry worker exited unexpectedly (code ${code})`));
        worker = null;
    });
    worker = spawned;
    return spawned;
}
function failAll(error) {
    for (const [jobId, job] of pending) {
        pending.delete(jobId);
        clearTimeout(job.timer);
        job.reject(error);
    }
}
/** Convert a STEP/IGES/BREP buffer to indexed CadMeshes. */
export async function parseOcct(buffer, format, fallbackName, timeoutMs = 120_000) {
    const active = ensureWorker();
    const jobId = nextJobId++;
    const copy = new Uint8Array(buffer.byteLength);
    copy.set(buffer);
    const meshes = await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            pending.delete(jobId);
            reject(new Error(`${format.toUpperCase()} conversion timed out after ${timeoutMs}ms`));
        }, timeoutMs);
        pending.set(jobId, { resolve, reject, timer });
        active.postMessage({ jobId, format, buffer: copy.buffer }, [copy.buffer]);
    });
    return meshes.map((mesh, index) => ({
        name: mesh.name === '' || mesh.name === undefined ? `${fallbackName} #${index + 1}` : mesh.name,
        positions: encodeF32B64(mesh.positions),
        normals: mesh.normals === undefined ? undefined : encodeF32B64(mesh.normals),
        indices: encodeU32B64(mesh.indices),
        vertexCount: mesh.positions.length / 3,
        triangleCount: mesh.indices.length / 3,
        color: mesh.color,
    }));
}
