import { ModelDocument } from './document.js';
import type { ModelDoc } from './document.js';
import type { ModelOp } from './client.js';
export type DocSourceKind = 'model' | 'step' | 'dcprt';
export interface FolderMeta {
    id: string;
    name: string;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
}
export interface DocMeta {
    id: string;
    name: string;
    /** Parent folder id (null/absent = workspace root). */
    folderId?: string | null;
    /** ISO timestamps; updatedAt drives the file-list ordering. */
    createdAt: string;
    updatedAt: string;
    opCount: number;
    bodyCount: number;
    sourceKind?: DocSourceKind;
}
export interface DocOpsSummary {
    bodyCount: number;
    instanceCount: number;
    drawingCount: number;
    latestDrawingId?: string;
    sketchCount: number;
    bodyNames: string[];
}
/** Fold lightweight structural counts from a document's op log (no worker needed). */
export declare function summarizeModelDoc(doc: ModelDoc): DocOpsSummary;
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
    private get foldersList();
    /**
     * Adopt the pre-registry single document (`.dsh-cad/model.json`) as a named
     * document so existing work stays openable from the file list.
     */
    private migrateLegacy;
    private persist;
    /** All document metas, most recently updated first. */
    list(): Promise<DocMeta[]>;
    /** All folders, sorted alphabetically by name. */
    listFolders(): Promise<FolderMeta[]>;
    /** Read and summarize a document's op log from disk (safe fallback on missing/corrupt files). */
    summarize(id: string): Promise<DocOpsSummary>;
    /** Create a named document (empty op log, persisted immediately). */
    create(name?: string, options?: {
        folderId?: string | null;
        sourceKind?: DocSourceKind;
    }): Promise<ModelDocument>;
    /** Persist an imported/cloned ModelDoc into the registry with a fresh id. */
    importDoc(name: string, payload: {
        version: number;
        ops: ModelOp[];
        bodyNames: Record<string, string>;
    }, options?: {
        folderId?: string | null;
        sourceKind?: DocSourceKind;
    }): Promise<{
        document: ModelDocument;
        meta: DocMeta;
    }>;
    private validFolderId;
    private nextUntitledName;
    private nextUntitledFolderName;
    /** Create a virtual folder in the CAD space. */
    createFolder(name?: string, parentId?: string | null): Promise<FolderMeta>;
    /** Rename a folder. */
    renameFolder(id: string, name: string): Promise<FolderMeta | null>;
    /** Check whether `candidateDescendant` is `ancestorId` or inside its subtree. */
    private isFolderDescendant;
    /** Move a folder under another folder (or null for root); rejects cycles. */
    moveFolder(id: string, parentId: string | null): Promise<FolderMeta | null>;
    /** Delete a folder; `cascade` (default) recursively removes contained folders and docs. */
    removeFolder(id: string, mode?: 'cascade' | 'move-to-parent'): Promise<{
        removedFolderIds: string[];
        removedDocIds: string[];
    } | null>;
    /** Move a document into a folder (or null for root). */
    moveDoc(id: string, folderId: string | null): Promise<DocMeta | null>;
    /** Duplicate an existing document (copies its persisted op log under a new docId). */
    duplicateDoc(id: string, name?: string, folderId?: string | null): Promise<DocMeta | null>;
    private nextDuplicateName;
    /** Open a document by id (null when the manifest has no such entry). */
    open(id: string): Promise<ModelDocument | null>;
    /** Resolve by document id or (case-insensitive) exact name. */
    resolve(ref: string): Promise<DocMeta | null>;
    /** Bind a session to its active document. */
    bind(sessionId: string, docId: string): Promise<void>;
    /** Snapshot of all session bindings (sessionId → docId). */
    bindings(): Promise<Record<string, string>>;
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
