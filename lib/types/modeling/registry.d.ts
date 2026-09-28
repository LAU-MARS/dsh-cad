import { ModelDocument } from './document.js';
export interface DocMeta {
    id: string;
    name: string;
    /** ISO timestamps; updatedAt drives the file-list ordering. */
    createdAt: string;
    updatedAt: string;
    opCount: number;
    bodyCount: number;
}
export declare class DocumentRegistry {
    readonly root: string;
    private state;
    private loaded;
    constructor(root: string);
    private get base();
    private get docsDir();
    private get file();
    private docFile;
    /** Load the manifest once; migrates the legacy single document on first run. */
    private ensureLoaded;
    /**
     * Adopt the pre-registry single document (`.dsh-cad/model.json`) as a named
     * document so existing work stays openable from the file list.
     */
    private migrateLegacy;
    private persist;
    /** All document metas, most recently updated first. */
    list(): Promise<DocMeta[]>;
    /** Create a named document (empty op log, persisted immediately). */
    create(name?: string): Promise<ModelDocument>;
    private nextUntitledName;
    /** Open a document by id (null when the manifest has no such entry). */
    open(id: string): Promise<ModelDocument | null>;
    /** Resolve by document id or (case-insensitive) exact name. */
    resolve(ref: string): Promise<DocMeta | null>;
    /** Bind a session to its active document. */
    bind(sessionId: string, docId: string): Promise<void>;
    /** The session's active document id (null: unbound — create on first use). */
    bindingOf(sessionId: string): Promise<string | null>;
    /**
     * One-shot upgrade continuity: hand the migrated legacy document to the
     * first unbound session (so continuing an old conversation keeps its
     * bodies) and clear the marker. Returns null once claimed or absent.
     */
    claimLegacyFor(sessionId: string): Promise<string | null>;
    /** Update a document's meta after recorded ops (write-through). */
    touch(docId: string, patch: {
        opCount?: number;
        bodyCount?: number;
        name?: string;
    }): Promise<void>;
    /** Rename a document. */
    rename(id: string, name: string): Promise<DocMeta | null>;
    /**
     * Delete a document: remove its op log, drop every session binding to it.
     * Scene caches (bin mirrors) are inert without the manifest entry and are
     * left for the store's own lifecycle.
     */
    remove(id: string): Promise<boolean>;
}
