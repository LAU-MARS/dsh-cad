import type { ModelOp } from './client.js';
export interface ModelDoc {
    /** Stable document id; doubles as the viewer scene viewId. */
    docId: string;
    /** Monotonic operation counter; the viewer uses it as a cache-busting version. */
    version: number;
    ops: ModelOp[];
    /** Body display names, kept in the manifest for cad_list without a worker round-trip. */
    bodyNames: Record<string, string>;
}
export declare class ModelDocument {
    readonly root: string;
    doc: ModelDoc;
    /**
     * @param docId Registry-assigned document id. With an id the document lives
     *   at `<root>/.dsh-cad/docs/<docId>.json`; without one it keeps the legacy
     *   single-document path `<root>/.dsh-cad/model.json` (tests, migration).
     */
    constructor(root: string, docId?: string);
    /** True when this instance owns the legacy single-document path. */
    private readonly legacy;
    private get base();
    private get directory();
    private get file();
    /** Load the persisted document if one exists. */
    restore(): Promise<void>;
    /** Append an applied operation and persist. */
    record(op: ModelOp, bodyName: {
        bodyId: string;
        name: string;
    } | null): Promise<void>;
    /** Persist the current state without appending an op (registry creation). */
    save(): Promise<void>;
    /**
     * Replace the defining op of a named sketch IN PLACE (cad_sketch_edit).
     * Replay order is preserved — the definition still precedes its consumers —
     * so a full replay rebuilds every feature referencing the sketch with the
     * new profile. Returns false when no sketch with that name exists.
     */
    rewriteSketch(name: string, profile: unknown): Promise<boolean>;
    /** Clear the document (cad_new / tests). */
    clear(): Promise<void>;
}
