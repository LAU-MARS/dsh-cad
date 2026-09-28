import type { BinMeshData } from './bin-format.js';
interface Entry {
    buffer: Buffer;
    version: number;
    etag: string;
}
export declare class BinarySceneStore {
    private readonly root;
    private readonly memory;
    private readonly diskTimers;
    constructor(root: string);
    private get directory();
    /** Publish a new version under a stable viewId; returns the version. */
    publish(viewId: string, meshes: BinMeshData[]): Promise<number>;
    /** Fetch for serving: memory first, disk mirror as the restart fallback. */
    get(viewId: string): Promise<Entry | null>;
    /** Existence check without loading the buffer into memory. */
    has(viewId: string): Promise<boolean>;
    /** Debounced disk mirror: one write after modeling quiesces, not per step. */
    private scheduleDiskMirror;
}
export {};
