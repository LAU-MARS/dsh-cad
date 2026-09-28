import type { ModelDoc } from './document.js';
/** One tree row (mirrored client-side in feature-tree.tsx). */
export interface FeatureTreeRow {
    key: string;
    kind: 'sketch' | 'feature';
    /** Row label: sketch name or body display name. */
    label: string;
    /** Sketch name (sketch rows) — drives the wire visibility toggles. */
    sketch?: string;
    /** Body display name (feature rows) — drives mesh visibility/highlight. */
    body?: string;
    /** Chinese feature label (拉伸 / 旋转 / 圆角 …). */
    feature?: string;
    /** Referenced sketch name (profile-driven feature rows). */
    uses?: string;
}
/** GET /dsh-cad/tree/<docId> response body. */
export interface FeatureTreePayload {
    docId: string;
    version: number;
    rows: FeatureTreeRow[];
}
/** Build the feature-tree payload from a restored document. */
export declare function featureTreePayload(doc: ModelDoc): FeatureTreePayload;
