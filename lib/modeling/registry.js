/**
 * Document registry: the workspace's file space of named modeling documents
 * (`.dsh-cad/docs/<docId>.json`) plus the session→document bindings that give
 * every chat session its own active document. Sessions see all documents (the
 * file space is workspace-scoped) but new sessions start on a fresh document
 * instead of inheriting leftovers from earlier conversations.
 *
 * `index.json` is the write-through manifest: document metadata and bindings
 * persist across service restarts alongside the documents themselves.
 */
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { ModelDocument } from './document.js';
const nowIso = () => new Date().toISOString();
export class DocumentRegistry {
    root;
    state = { version: 1, docs: [], sessionBindings: {} };
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
                this.state = { version: 1, docs: parsed.docs, sessionBindings: parsed.sessionBindings ?? {}, legacyDocId: parsed.legacyDocId ?? null };
            }
            return;
        }
        catch {
            /* no manifest yet — try the legacy migration below */
        }
        await this.migrateLegacy();
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
    /** Create a named document (empty op log, persisted immediately). */
    async create(name) {
        await this.ensureLoaded();
        const document = new ModelDocument(this.root, randomUUID());
        await document.save();
        const stamped = nowIso();
        const trimmed = typeof name === 'string' ? name.trim() : '';
        const resolved = trimmed !== '' ? trimmed : this.nextUntitledName();
        this.state.docs.push({ id: document.doc.docId, name: resolved, createdAt: stamped, updatedAt: stamped, opCount: 0, bodyCount: 0 });
        await this.persist();
        return document;
    }
    nextUntitledName() {
        let n = 1;
        const names = new Set(this.state.docs.map((doc) => doc.name));
        while (names.has(`未命名 ${n}`))
            n += 1;
        return `未命名 ${n}`;
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
