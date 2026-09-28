/**
 * Modeling document: an operation log (JSON) that both persists
 * across restarts and is the unit of replay — restart recovery re-applies the
 * log to a fresh worker, which is what makes the worker's in-memory shapes
 * disposable.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
export class ModelDocument {
    root;
    doc;
    /**
     * @param docId Registry-assigned document id. With an id the document lives
     *   at `<root>/.dsh-cad/docs/<docId>.json`; without one it keeps the legacy
     *   single-document path `<root>/.dsh-cad/model.json` (tests, migration).
     */
    constructor(root, docId) {
        this.root = root;
        this.legacy = docId === undefined;
        this.doc = { docId: docId ?? randomUUID(), version: 0, ops: [], bodyNames: {} };
    }
    /** True when this instance owns the legacy single-document path. */
    legacy;
    get base() {
        return path.join(this.root, '.dsh-cad');
    }
    get directory() {
        return this.legacy ? this.base : path.join(this.base, 'docs');
    }
    get file() {
        return this.legacy ? path.join(this.base, 'model.json') : path.join(this.base, 'docs', `${this.doc.docId}.json`);
    }
    /** Load the persisted document if one exists. */
    async restore() {
        try {
            const text = await readFile(this.file, 'utf8');
            const parsed = JSON.parse(text);
            if (typeof parsed.docId === 'string' && Array.isArray(parsed.ops)) {
                this.doc = { ...parsed, version: parsed.version ?? 0, bodyNames: parsed.bodyNames ?? {} };
            }
        }
        catch {
            // No document yet — a fresh one stays in memory until the first op.
        }
    }
    /** Append an applied operation and persist. */
    async record(op, bodyName) {
        this.doc.ops.push(op);
        this.doc.version += 1;
        if (bodyName !== null)
            this.doc.bodyNames[bodyName.bodyId] = bodyName.name;
        if (op.kind === 'delete' || op.kind === 'boolean') {
            const removed = op.kind === 'delete' ? [op.target] : op.tools;
            for (const id of removed)
                delete this.doc.bodyNames[id];
        }
        await mkdir(this.directory, { recursive: true });
        await writeFile(this.file, JSON.stringify(this.doc));
    }
    /** Persist the current state without appending an op (registry creation). */
    async save() {
        await mkdir(this.directory, { recursive: true });
        await writeFile(this.file, JSON.stringify(this.doc));
    }
    /**
     * Replace the defining op of a named sketch IN PLACE (cad_sketch_edit).
     * Replay order is preserved — the definition still precedes its consumers —
     * so a full replay rebuilds every feature referencing the sketch with the
     * new profile. Returns false when no sketch with that name exists.
     */
    async rewriteSketch(name, profile) {
        const index = this.doc.ops.findIndex((op) => op.kind === 'sketch_set' && op.name === name);
        if (index === -1)
            return false;
        this.doc.ops[index] = { kind: 'sketch_set', name, profile };
        this.doc.version += 1;
        await mkdir(this.directory, { recursive: true });
        await writeFile(this.file, JSON.stringify(this.doc));
        return true;
    }
    /** Clear the document (cad_new / tests). */
    async clear() {
        this.doc = { docId: randomUUID(), version: 0, ops: [], bodyNames: {} };
        await mkdir(this.directory, { recursive: true });
        await writeFile(this.file, JSON.stringify(this.doc));
    }
}
