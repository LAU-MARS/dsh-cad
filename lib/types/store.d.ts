import type { CadScene } from './types.js';
export declare class SceneStore {
    private readonly root;
    private readonly memory;
    constructor(root: string);
    private get directory();
    /** Persist a scene and return its viewId. */
    put(scene: CadScene): Promise<string>;
    /** Persist a scene under a stable viewId (overwrites; used by the modeling
     *  document so every operation refreshes the same viewer card). */
    putAt(viewId: string, scene: CadScene): Promise<void>;
    /** Fetch a scene by viewId, restoring from disk when the memory copy aged out. */
    get(viewId: string): Promise<CadScene | null>;
    /** Best-effort removal (unused for now; kept for completeness of the API). */
    delete(viewId: string): Promise<void>;
    /** ETag for a scene payload (cache helper for the route handler). */
    etag(scene: CadScene): string;
}
