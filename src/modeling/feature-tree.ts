/**
 * Feature-tree fold: the Part tab's Onshape-style structure panel — one row
 * per sketch / feature in op-log order, folded from the persisted document
 * (no worker round-trip, so it keeps serving after restarts and for
 * non-active documents; same pattern as assemblyTreePayload).
 */
import type { ModelOp } from './client.js'
import type { ModelDoc } from './document.js'

/** One tree row (mirrored client-side in feature-tree.tsx). */
export interface FeatureTreeRow {
  key: string
  kind: 'sketch' | 'feature'
  /** Row label: sketch name or body display name. */
  label: string
  /** Sketch name (sketch rows) — drives the wire visibility toggles. */
  sketch?: string
  /** Body display name (feature rows) — drives mesh visibility/highlight. */
  body?: string
  /** Chinese feature label (拉伸 / 旋转 / 圆角 …). */
  feature?: string
  /** Referenced sketch name (profile-driven feature rows). */
  uses?: string
}

/** GET /dsh-cad/tree/<docId> response body. */
export interface FeatureTreePayload {
  docId: string
  version: number
  rows: FeatureTreeRow[]
}

const FEATURE_LABEL: Record<string, string> = {
  create_prim: '基本体',
  extrude_profile: '拉伸',
  revolve: '旋转',
  loft: '放样',
  sweep: '扫掠',
  boolean: '布尔',
  fillet: '圆角',
  chamfer: '倒角',
  shell: '抽壳',
  draft: '拔模',
  pattern: '阵列',
  transform: '变换',
  drawing: '工程图',
}

const rowKey = (kind: string, id: string): string => `${kind}:${id}`

/** Build the feature-tree payload from a restored document. */
export function featureTreePayload(doc: ModelDoc): FeatureTreePayload {
  const bodyName = (bodyId: string | undefined): string | undefined =>
    bodyId === undefined ? undefined : doc.bodyNames[bodyId] ?? bodyId

  const rows: FeatureTreeRow[] = []
  let sketchSeq = 0
  let featureSeq = 0
  for (const op of doc.ops as ModelOp[]) {
    if (op.kind === 'sketch_set') {
      sketchSeq += 1
      rows.push({ key: rowKey('sketch', String(sketchSeq)), kind: 'sketch', label: op.name, sketch: op.name })
      continue
    }
    if (op.kind === 'sketch_delete') {
      const index = rows.findIndex((row) => row.kind === 'sketch' && row.sketch === op.name)
      if (index !== -1) rows.splice(index, 1)
      continue
    }
    let row: FeatureTreeRow | null = null
    if (op.kind === 'create_prim' || op.kind === 'extrude_profile' || op.kind === 'revolve' || op.kind === 'loft' || op.kind === 'sweep') {
      const label = op.name ?? bodyName(op.bodyId) ?? op.bodyId
      const built: FeatureTreeRow = { key: '', kind: 'feature', label, feature: FEATURE_LABEL[op.kind] ?? op.kind, body: bodyName(op.bodyId) ?? op.bodyId }
      if ('sketch' in op && op.sketch !== undefined) built.uses = op.sketch
      row = built
    } else if (op.kind === 'boolean') {
      row = { key: '', kind: 'feature', label: `${op.op} → ${bodyName(op.target) ?? op.target}`, feature: FEATURE_LABEL.boolean, body: bodyName(op.target) ?? op.target }
    } else if (op.kind === 'fillet' || op.kind === 'chamfer' || op.kind === 'shell' || op.kind === 'draft' || op.kind === 'pattern' || op.kind === 'transform') {
      row = { key: '', kind: 'feature', label: `${FEATURE_LABEL[op.kind]} · ${bodyName(op.target) ?? op.target}`, feature: FEATURE_LABEL[op.kind], body: bodyName(op.target) ?? op.target }
    } else if (op.kind === 'drawing') {
      row = { key: '', kind: 'feature', label: op.name ?? bodyName(op.target) ?? op.target, feature: FEATURE_LABEL.drawing }
    }
    if (row !== null) {
      featureSeq += 1
      row.key = rowKey('feature', String(featureSeq))
      rows.push(row)
    }
  }
  return { docId: doc.docId, version: doc.version, rows }
}
