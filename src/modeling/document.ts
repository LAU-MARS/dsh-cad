/**
 * Modeling document: an operation log (JSON) per workspace that both persists
 * across restarts and is the unit of replay — restart recovery re-applies the
 * log to a fresh worker, which is what makes the worker's in-memory shapes
 * disposable.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import type { ModelOp } from './client.js'

export interface ModelDoc {
  /** Stable document id; doubles as the viewer scene viewId. */
  docId: string
  /** Monotonic operation counter; the viewer uses it as a cache-busting version. */
  version: number
  ops: ModelOp[]
  /** Body display names, kept in the manifest for cad_list without a worker round-trip. */
  bodyNames: Record<string, string>
}

export class ModelDocument {
  readonly root: string
  doc: ModelDoc = { docId: randomUUID(), version: 0, ops: [], bodyNames: {} }

  constructor(root: string) {
    this.root = root
  }

  private get directory(): string {
    return path.join(this.root, '.dsh-cad')
  }

  private get file(): string {
    return path.join(this.directory, 'model.json')
  }

  /** Load the persisted document if one exists. */
  async restore(): Promise<void> {
    try {
      const text = await readFile(this.file, 'utf8')
      const parsed = JSON.parse(text) as ModelDoc
      if (typeof parsed.docId === 'string' && Array.isArray(parsed.ops)) {
        this.doc = { ...parsed, version: parsed.version ?? 0, bodyNames: parsed.bodyNames ?? {} }
      }
    } catch {
      // No document yet — a fresh one stays in memory until the first op.
    }
  }

  /** Append an applied operation and persist. */
  async record(op: ModelOp, bodyName: { bodyId: string; name: string } | null): Promise<void> {
    this.doc.ops.push(op)
    this.doc.version += 1
    if (bodyName !== null) this.doc.bodyNames[bodyName.bodyId] = bodyName.name
    if (op.kind === 'delete' || op.kind === 'boolean') {
      const removed = op.kind === 'delete' ? [op.target] : op.tools
      for (const id of removed) delete this.doc.bodyNames[id]
    }
    await mkdir(this.directory, { recursive: true })
    await writeFile(this.file, JSON.stringify(this.doc))
  }

  /** Clear the document (cad_new / tests). */
  async clear(): Promise<void> {
    this.doc = { docId: randomUUID(), version: 0, ops: [], bodyNames: {} }
    await mkdir(this.directory, { recursive: true })
    await writeFile(this.file, JSON.stringify(this.doc))
  }
}
