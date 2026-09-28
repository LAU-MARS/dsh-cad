/**
 * In-memory binary scene store: viewId → packed buffer + version. The binary
 * route serves straight from memory; a debounced disk mirror keeps restart
 * replay working without paying a file write on every modeling step.
 */
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { packBinaryScene } from './bin-format.js';
const DISK_MIRROR_DELAY_MS = 1500;
export class BinarySceneStore {
    root;
    memory = new Map();
    diskTimers = new Map();
    constructor(root) {
        this.root = root;
    }
    get directory() {
        return path.join(this.root, '.dsh-cad', 'bins');
    }
    /** Publish a new version under a stable viewId; returns the version. */
    async publish(viewId, meshes) {
        const previous = this.memory.get(viewId);
        const version = (previous?.version ?? 0) + 1;
        const buffer = packBinaryScene(meshes);
        const etag = `"v${version}-${buffer.length}"`;
        this.memory.set(viewId, { buffer, version, etag });
        this.scheduleDiskMirror(viewId, buffer);
        return version;
    }
    /** Fetch for serving: memory first, disk mirror as the restart fallback. */
    async get(viewId) {
        if (!/^[0-9a-zA-Z_-]{1,64}$/.test(viewId))
            return null;
        const memoryHit = this.memory.get(viewId);
        if (memoryHit !== undefined)
            return memoryHit;
        try {
            const buffer = await readFile(path.join(this.directory, `${viewId}.bin`));
            // Mirror entries serve replay; the version rides in the etag only.
            const entry = { buffer, version: 1, etag: `"d${buffer.length}"` };
            this.memory.set(viewId, entry);
            return entry;
        }
        catch {
            return null;
        }
    }
    /** Existence check without loading the buffer into memory. */
    async has(viewId) {
        if (!/^[0-9a-zA-Z_-]{1,64}$/.test(viewId))
            return false;
        if (this.memory.has(viewId))
            return true;
        try {
            await access(path.join(this.directory, `${viewId}.bin`));
            return true;
        }
        catch {
            return false;
        }
    }
    /** Debounced disk mirror: one write after modeling quiesces, not per step. */
    scheduleDiskMirror(viewId, buffer) {
        const existing = this.diskTimers.get(viewId);
        if (existing !== undefined)
            clearTimeout(existing);
        const timer = setTimeout(() => {
            this.diskTimers.delete(viewId);
            void (async () => {
                try {
                    await mkdir(this.directory, { recursive: true });
                    await writeFile(path.join(this.directory, `${viewId}.bin`), buffer);
                }
                catch {
                    // The mirror is best-effort; the in-memory copy keeps serving.
                }
            })();
        }, DISK_MIRROR_DELAY_MS);
        this.diskTimers.set(viewId, timer);
    }
}
