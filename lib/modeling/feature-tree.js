const FEATURE_LABEL = {
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
};
const rowKey = (kind, id) => `${kind}:${id}`;
/** Build the feature-tree payload from a restored document. */
export function featureTreePayload(doc) {
    const bodyName = (bodyId) => bodyId === undefined ? undefined : doc.bodyNames[bodyId] ?? bodyId;
    const rows = [];
    let sketchSeq = 0;
    let featureSeq = 0;
    for (const op of doc.ops) {
        if (op.kind === 'sketch_set') {
            sketchSeq += 1;
            rows.push({ key: rowKey('sketch', String(sketchSeq)), kind: 'sketch', label: op.name, sketch: op.name });
            continue;
        }
        if (op.kind === 'sketch_delete') {
            const index = rows.findIndex((row) => row.kind === 'sketch' && row.sketch === op.name);
            if (index !== -1)
                rows.splice(index, 1);
            continue;
        }
        let row = null;
        if (op.kind === 'create_prim' || op.kind === 'extrude_profile' || op.kind === 'revolve' || op.kind === 'loft' || op.kind === 'sweep') {
            const label = op.name ?? bodyName(op.bodyId) ?? op.bodyId;
            const built = { key: '', kind: 'feature', label, feature: FEATURE_LABEL[op.kind] ?? op.kind, body: bodyName(op.bodyId) ?? op.bodyId };
            if ('sketch' in op && op.sketch !== undefined)
                built.uses = op.sketch;
            row = built;
        }
        else if (op.kind === 'boolean') {
            row = { key: '', kind: 'feature', label: `${op.op} → ${bodyName(op.target) ?? op.target}`, feature: FEATURE_LABEL.boolean, body: bodyName(op.target) ?? op.target };
        }
        else if (op.kind === 'fillet' || op.kind === 'chamfer' || op.kind === 'shell' || op.kind === 'draft' || op.kind === 'pattern' || op.kind === 'transform') {
            row = { key: '', kind: 'feature', label: `${FEATURE_LABEL[op.kind]} · ${bodyName(op.target) ?? op.target}`, feature: FEATURE_LABEL[op.kind], body: bodyName(op.target) ?? op.target };
        }
        else if (op.kind === 'drawing') {
            row = { key: '', kind: 'feature', label: op.name ?? bodyName(op.target) ?? op.target, feature: FEATURE_LABEL.drawing };
        }
        if (row !== null) {
            featureSeq += 1;
            row.key = rowKey('feature', String(featureSeq));
            rows.push(row);
        }
    }
    return { docId: doc.docId, version: doc.version, rows };
}
