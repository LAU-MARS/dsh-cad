/**
 * Scene store: viewId → CadScene JSON. Scenes live in memory with an LRU cap
 * and are spilled to <root>/.dsh-cad/scenes/<viewId>.json so replayed cards
 * still fetch their geometry after a process restart.
 */
import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
const MAX_MEMORY_SCENES = 16;
export class SceneStore {
    root;
    memory = new Map();
    constructor(root) {
        this.root = root;
    }
    get directory() {
        return path.join(this.root, '.dsh-cad', 'scenes');
    }
    /** Persist a scene and return its viewId. */
    async put(scene) {
        const viewId = randomUUID();
        await this.putAt(viewId, scene);
        return viewId;
    }
    /** Persist a scene under a stable viewId (overwrites; used by the modeling
     *  document so every operation refreshes the same viewer card). */
    async putAt(viewId, scene) {
        this.memory.set(viewId, scene);
        if (this.memory.size > MAX_MEMORY_SCENES) {
            const oldest = this.memory.keys().next().value;
            if (oldest !== undefined)
                this.memory.delete(oldest);
        }
        await mkdir(this.directory, { recursive: true });
        await writeFile(path.join(this.directory, `${viewId}.json`), JSON.stringify(scene));
    }
    /** Fetch a scene by viewId, restoring from disk when the memory copy aged out. */
    async get(viewId) {
        if (!/^[0-9a-f-]{36}$/i.test(viewId))
            return null;
        const memoryHit = this.memory.get(viewId);
        if (memoryHit !== undefined)
            return memoryHit;
        try {
            const text = await readFile(path.join(this.directory, `${viewId}.json`), 'utf8');
            const scene = JSON.parse(text);
            this.memory.set(viewId, scene);
            return scene;
        }
        catch {
            return null;
        }
    }
    /** Best-effort removal (unused for now; kept for completeness of the API). */
    async delete(viewId) {
        this.memory.delete(viewId);
        try {
            await unlink(path.join(this.directory, `${viewId}.json`));
        }
        catch {
            // Already gone.
        }
    }
    /** ETag for a scene payload (cache helper for the route handler). */
    etag(scene) {
        return `"${createHash('sha1').update(JSON.stringify(scene)).digest('hex').slice(0, 16)}"`;
    }
}
