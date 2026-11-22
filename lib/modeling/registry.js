/**
 * Document registry: the workspace's file space of named modeling documents
 * (`.dsh-cad/docs/<docId>.json`) plus virtual folders (netdisk hierarchy) and
 * the session→document bindings that give every chat session its own active
 * document. Sessions see all documents (the file space is workspace-scoped) but
 * new sessions start on a fresh document instead of inheriting leftovers from
 * earlier conversations.
 *
 * `index.json` is the write-through manifest: document metadata, folder tree,
 * and bindings persist across service restarts alongside the documents.
 */
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { ModelDocument } from './document.js';
const nowIso = () => new Date().toISOString();
/** Fold lightweight structural counts from a document's op log (no worker needed). */
export function summarizeModelDoc(doc) {
    const liveBodies = new Set();
    const instances = new Set();
    const sketches = new Set();
    let drawingCount = 0;
    let latestDrawingId;
    for (const op of doc.ops) {
        switch (op.kind) {
            case 'create_prim':
            case 'extrude_profile':
            case 'loft':
            case 'revolve':
            case 'sweep':
                liveBodies.add(op.bodyId);
                break;
            case 'pattern': {
                const count = Math.max(1, Math.trunc(op.count));
                for (let i = 1; i < count; i++) {
                    let seq = i;
                    let id = `${op.target}p${seq}`;
                    while (liveBodies.has(id))
                        id = `${op.target}p${++seq}`;
                    liveBodies.add(id);
                }
                break;
            }
            case 'delete':
                liveBodies.delete(op.target);
                break;
            case 'boolean':
                for (const tool of op.tools)
                    liveBodies.delete(tool);
                break;
            case 'import_step':
                for (const b of op.bodies ?? [])
                    liveBodies.add(b.bodyId);
                for (const inst of op.instances ?? [])
                    instances.add(inst.instanceId);
                break;
            case 'import_mesh':
                liveBodies.add(op.bodyId);
                break;
            case 'assembly_insert':
                instances.add(op.instanceId);
                break;
            case 'assembly_remove':
                instances.delete(op.instanceId);
                break;
            case 'sketch_set':
                sketches.add(op.name);
                break;
            case 'sketch_delete':
                sketches.delete(op.name);
                break;
            case 'drawing':
                drawingCount += 1;
                if (op.sceneViewId !== undefined)
                    latestDrawingId = op.sceneViewId;
                break;
            default:
                break;
        }
    }
    const bodyNames = [];
    for (const id of liveBodies) {
        bodyNames.push(doc.bodyNames[id] ?? id);
    }
    return {
        bodyCount: liveBodies.size > 0 ? liveBodies.size : Object.keys(doc.bodyNames).length,
        instanceCount: instances.size,
        drawingCount,
        ...(latestDrawingId === undefined ? {} : { latestDrawingId }),
        sketchCount: sketches.size,
        bodyNames,
    };
}
export class DocumentRegistry {
    root;
    state = { version: 1, docs: [], folders: [], sessionBindings: {} };
    loaded = false;
    constructor(root) {
        this.root = root;
    }
    get base() {
        return path.join(this.root, '.dsh-cad');
    }
    get docsDir() {
        return path.join(this.base, 'docs');
    }
    get file() {
        return path.join(this.base, 'index.json');
    }
    docFile(id) {
        return path.join(this.docsDir, `${id}.json`);
    }
    /** Load the manifest once; migrates the legacy single document on first run. */
    async ensureLoaded() {
        if (this.loaded)
            return;
        this.loaded = true;
        try {
            const text = await readFile(this.file, 'utf8');
            const parsed = JSON.parse(text);
            if (Array.isArray(parsed.docs)) {
                this.state = {
                    version: 1,
                    docs: parsed.docs,
                    folders: Array.isArray(parsed.folders) ? parsed.folders : [],
                    sessionBindings: parsed.sessionBindings ?? {},
                    legacyDocId: parsed.legacyDocId ?? null,
                };
            }
            return;
        }
        catch {
            /* no manifest yet — try the legacy migration below */
        }
        await this.migrateLegacy();
    }
    get foldersList() {
        if (!Array.isArray(this.state.folders))
            this.state.folders = [];
        return this.state.folders;
    }
    /**
     * Adopt the pre-registry single document (`.dsh-cad/model.json`) as a named
     * document so existing work stays openable from the file list.
     */
    async migrateLegacy() {
        const legacyPath = path.join(this.base, 'model.json');
        try {
            const text = await readFile(legacyPath, 'utf8');
            const parsed = JSON.parse(text);
            if (typeof parsed.docId !== 'string' || parsed.docId === '')
                return;
            await mkdir(this.docsDir, { recursive: true });
            await rename(legacyPath, this.docFile(parsed.docId));
            const stamped = nowIso();
            this.state.docs.push({
                id: parsed.docId,
                name: '导入的模型',
                folderId: null,
                createdAt: stamped,
                updatedAt: stamped,
                opCount: parsed.ops?.length ?? 0,
                bodyCount: Object.keys(parsed.bodyNames ?? {}).length,
            });
            // Upgrade continuity: the first session that models after the upgrade
            // inherits the pre-registry document instead of a fresh empty one.
            this.state.legacyDocId = parsed.docId;
            await this.persist();
        }
        catch {
            /* nothing to migrate — a fresh workspace */
        }
    }
    async persist() {
        await mkdir(this.base, { recursive: true });
        await writeFile(this.file, JSON.stringify(this.state));
    }
    /** All document metas, most recently updated first. */
    async list() {
        await this.ensureLoaded();
        return [...this.state.docs].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    }
    /** All folders, sorted alphabetically by name. */
    async listFolders() {
        await this.ensureLoaded();
        return [...this.foldersList].sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
    }
    /** Read and summarize a document's op log from disk (safe fallback on missing/corrupt files). */
    async summarize(id) {
        const doc = await this.open(id);
        if (doc === null) {
            return { bodyCount: 0, instanceCount: 0, drawingCount: 0, sketchCount: 0, bodyNames: [] };
        }
        await doc.restore();
        return summarizeModelDoc(doc.doc);
    }
    /** Create a named document (empty op log, persisted immediately). */
    async create(name, options) {
        await this.ensureLoaded();
        const document = new ModelDocument(this.root, randomUUID());
        await document.save();
        const stamped = nowIso();
        const trimmed = typeof name === 'string' ? name.trim() : '';
        const resolved = trimmed !== '' ? trimmed : this.nextUntitledName();
        const folderId = this.validFolderId(options?.folderId);
        this.state.docs.push({
            id: document.doc.docId,
            name: resolved,
            folderId,
            createdAt: stamped,
            updatedAt: stamped,
            opCount: 0,
            bodyCount: 0,
            ...(options?.sourceKind === undefined ? {} : { sourceKind: options.sourceKind }),
        });
        await this.persist();
        return document;
    }
    /** Persist an imported/cloned ModelDoc into the registry with a fresh id. */
    async importDoc(name, payload, options) {
        await this.ensureLoaded();
        const id = randomUUID();
        const document = new ModelDocument(this.root, id);
        document.doc = {
            docId: id,
            version: payload.version,
            ops: payload.ops,
            bodyNames: { ...payload.bodyNames },
        };
        await document.save();
        const stamped = nowIso();
        const trimmed = name.trim();
        const resolved = trimmed !== '' ? trimmed : this.nextUntitledName();
        const summary = summarizeModelDoc(document.doc);
        const meta = {
            id,
            name: resolved,
            folderId: this.validFolderId(options?.folderId),
            createdAt: stamped,
            updatedAt: stamped,
            opCount: payload.version,
            bodyCount: summary.bodyCount,
            ...(options?.sourceKind === undefined ? {} : { sourceKind: options.sourceKind }),
        };
        this.state.docs.push(meta);
        await this.persist();
        return { document, meta };
    }
    validFolderId(folderId) {
        if (folderId === undefined || folderId === null || folderId === '')
            return null;
        return this.foldersList.some((folder) => folder.id === folderId) ? folderId : null;
    }
    nextUntitledName() {
        let n = 1;
        const names = new Set(this.state.docs.map((doc) => doc.name));
        while (names.has(`未命名 ${n}`))
            n += 1;
        return `未命名 ${n}`;
    }
    nextUntitledFolderName(parentId) {
        let n = 1;
        const names = new Set(this.foldersList.filter((f) => f.parentId === parentId).map((f) => f.name));
        while (names.has(`新建文件夹 ${n}`))
            n += 1;
        return `新建文件夹 ${n}`;
    }
    /** Create a virtual folder in the CAD space. */
    async createFolder(name, parentId) {
        await this.ensureLoaded();
        const resolvedParent = this.validFolderId(parentId);
        const trimmed = typeof name === 'string' ? name.trim() : '';
        const resolved = trimmed !== '' ? trimmed : this.nextUntitledFolderName(resolvedParent);
        const stamped = nowIso();
        const folder = {
            id: randomUUID(),
            name: resolved,
            parentId: resolvedParent,
            createdAt: stamped,
            updatedAt: stamped,
        };
        this.foldersList.push(folder);
        await this.persist();
        return folder;
    }
    /** Rename a folder. */
    async renameFolder(id, name) {
        await this.ensureLoaded();
        const folder = this.foldersList.find((entry) => entry.id === id);
        if (folder === undefined)
            return null;
        const trimmed = name.trim();
        if (trimmed === '')
            return folder;
        folder.name = trimmed;
        folder.updatedAt = nowIso();
        await this.persist();
        return folder;
    }
    /** Check whether `candidateDescendant` is `ancestorId` or inside its subtree. */
    isFolderDescendant(ancestorId, candidateDescendant) {
        let current = candidateDescendant;
        const visited = new Set();
        while (current !== null) {
            if (current === ancestorId)
                return true;
            if (visited.has(current))
                return true;
            visited.add(current);
            const parent = this.foldersList.find((f) => f.id === current)?.parentId ?? null;
            current = parent;
        }
        return false;
    }
    /** Move a folder under another folder (or null for root); rejects cycles. */
    async moveFolder(id, parentId) {
        await this.ensureLoaded();
        const folder = this.foldersList.find((entry) => entry.id === id);
        if (folder === undefined)
            return null;
        const targetParent = this.validFolderId(parentId);
        if (targetParent !== null && this.isFolderDescendant(id, targetParent)) {
            throw new Error('cannot move a folder into itself or its subfolder');
        }
        folder.parentId = targetParent;
        folder.updatedAt = nowIso();
        await this.persist();
        return folder;
    }
    /** Delete a folder; `cascade` (default) recursively removes contained folders and docs. */
    async removeFolder(id, mode = 'cascade') {
        await this.ensureLoaded();
        const target = this.foldersList.find((entry) => entry.id === id);
        if (target === undefined)
            return null;
        if (mode === 'move-to-parent') {
            const parentId = target.parentId;
            for (const child of this.foldersList) {
                if (child.parentId === id)
                    child.parentId = parentId;
            }
            for (const doc of this.state.docs) {
                if ((doc.folderId ?? null) === id)
                    doc.folderId = parentId;
            }
            this.state.folders = this.foldersList.filter((entry) => entry.id !== id);
            await this.persist();
            return { removedFolderIds: [id], removedDocIds: [] };
        }
        // Collect folder subtree (BFS).
        const folderIds = new Set([id]);
        let expanded = true;
        while (expanded) {
            expanded = false;
            for (const entry of this.foldersList) {
                if (entry.parentId !== null && folderIds.has(entry.parentId) && !folderIds.has(entry.id)) {
                    folderIds.add(entry.id);
                    expanded = true;
                }
            }
        }
        const removedDocIds = this.state.docs
            .filter((doc) => doc.folderId != null && folderIds.has(doc.folderId))
            .map((doc) => doc.id);
        this.state.folders = this.foldersList.filter((entry) => !folderIds.has(entry.id));
        this.state.docs = this.state.docs.filter((doc) => !removedDocIds.includes(doc.id));
        for (const docId of removedDocIds) {
            for (const [sessionId, boundId] of Object.entries(this.state.sessionBindings)) {
                if (boundId === docId)
                    delete this.state.sessionBindings[sessionId];
            }
            if (this.state.legacyDocId === docId)
                this.state.legacyDocId = null;
        }
        await this.persist();
        await Promise.all(removedDocIds.map(async (docId) => {
            try {
                await rm(this.docFile(docId), { force: true });
            }
            catch {
                /* ignore */
            }
        }));
        return { removedFolderIds: [...folderIds], removedDocIds };
    }
    /** Move a document into a folder (or null for root). */
    async moveDoc(id, folderId) {
        await this.ensureLoaded();
        const meta = this.state.docs.find((doc) => doc.id === id);
        if (meta === undefined)
            return null;
        meta.folderId = this.validFolderId(folderId);
        meta.updatedAt = nowIso();
        await this.persist();
        return meta;
    }
    /** Duplicate an existing document (copies its persisted op log under a new docId). */
    async duplicateDoc(id, name, folderId) {
        await this.ensureLoaded();
        const sourceMeta = this.state.docs.find((doc) => doc.id === id);
        if (sourceMeta === undefined)
            return null;
        const sourceDoc = new ModelDocument(this.root, id);
        await sourceDoc.restore();
        const targetName = typeof name === 'string' && name.trim() !== '' ? name.trim() : this.nextDuplicateName(sourceMeta.name);
        const targetFolder = folderId === undefined ? (sourceMeta.folderId ?? null) : this.validFolderId(folderId);
        const { meta } = await this.importDoc(targetName, {
            version: sourceDoc.doc.version,
            ops: structuredClone(sourceDoc.doc.ops),
            bodyNames: { ...sourceDoc.doc.bodyNames },
        }, { folderId: targetFolder, sourceKind: sourceMeta.sourceKind });
        return meta;
    }
    nextDuplicateName(baseName) {
        const names = new Set(this.state.docs.map((doc) => doc.name));
        const first = `${baseName} (副本)`;
        if (!names.has(first))
            return first;
        let n = 2;
        while (names.has(`${baseName} (副本 ${n})`))
            n += 1;
        return `${baseName} (副本 ${n})`;
    }
    /** Open a document by id (null when the manifest has no such entry). */
    async open(id) {
        await this.ensureLoaded();
        if (!this.state.docs.some((doc) => doc.id === id))
            return null;
        return new ModelDocument(this.root, id);
    }
    /** Resolve by document id or (case-insensitive) exact name. */
    async resolve(ref) {
        await this.ensureLoaded();
        const trimmed = ref.trim();
        const byId = this.state.docs.find((doc) => doc.id === trimmed);
        if (byId !== undefined)
            return byId;
        const lowered = trimmed.toLowerCase();
        return this.state.docs.find((doc) => doc.name.toLowerCase() === lowered) ?? null;
    }
    /** Bind a session to its active document. */
    async bind(sessionId, docId) {
        await this.ensureLoaded();
        this.state.sessionBindings[sessionId] = docId;
        await this.persist();
    }
    /** Snapshot of all session bindings (sessionId → docId). */
    async bindings() {
        await this.ensureLoaded();
        return { ...this.state.sessionBindings };
    }
    /** The session's active document id (null: unbound — create on first use). */
    async bindingOf(sessionId) {
        await this.ensureLoaded();
        const bound = this.state.sessionBindings[sessionId];
        if (bound === undefined)
            return null;
        // Drop bindings whose document vanished (deleted out of band).
        return this.state.docs.some((doc) => doc.id === bound) ? bound : null;
    }
    /**
     * One-shot upgrade continuity: hand the migrated legacy document to the
     * first unbound session (so continuing an old conversation keeps its
     * bodies) and clear the marker. Returns null once claimed or absent.
     */
    async claimLegacyFor(sessionId) {
        await this.ensureLoaded();
        const legacyId = this.state.legacyDocId ?? null;
        if (legacyId === null)
            return null;
        if (!this.state.docs.some((doc) => doc.id === legacyId)) {
            this.state.legacyDocId = null;
            await this.persist();
            return null;
        }
        this.state.legacyDocId = null;
        this.state.sessionBindings[sessionId] = legacyId;
        await this.persist();
        return legacyId;
    }
    /** Update a document's meta after recorded ops (write-through). */
    async touch(docId, patch) {
        await this.ensureLoaded();
        const meta = this.state.docs.find((doc) => doc.id === docId);
        if (meta === undefined)
            return;
        if (patch.opCount !== undefined)
            meta.opCount = patch.opCount;
        if (patch.bodyCount !== undefined)
            meta.bodyCount = patch.bodyCount;
        if (patch.name !== undefined && patch.name.trim() !== '')
            meta.name = patch.name.trim();
        meta.updatedAt = nowIso();
        await this.persist();
    }
    /** Rename a document. */
    async rename(id, name) {
        await this.ensureLoaded();
        const meta = this.state.docs.find((doc) => doc.id === id);
        if (meta === undefined)
            return null;
        const trimmed = name.trim();
        if (trimmed === '')
            return meta;
        meta.name = trimmed;
        meta.updatedAt = nowIso();
        await this.persist();
        return meta;
    }
    /**
     * Delete a document: remove its op log, drop every session binding to it.
     * Scene caches (bin mirrors) are inert without the manifest entry and are
     * left for the store's own lifecycle.
     */
    async remove(id) {
        await this.ensureLoaded();
        const index = this.state.docs.findIndex((doc) => doc.id === id);
        if (index === -1)
            return false;
        this.state.docs.splice(index, 1);
        for (const [sessionId, docId] of Object.entries(this.state.sessionBindings)) {
            if (docId === id)
                delete this.state.sessionBindings[sessionId];
        }
        if (this.state.legacyDocId === id)
            this.state.legacyDocId = null;
        await this.persist();
        try {
            await rm(this.docFile(id), { force: true });
        }
        catch {
            /* the manifest no longer references it either way */
        }
        return true;
    }
}
