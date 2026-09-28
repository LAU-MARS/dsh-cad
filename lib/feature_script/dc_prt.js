export const DC_PRT_FORMAT = 'dcprt';
export const DC_PRT_EXTENSION = '.dcprt';
/** Serialize a live workspace modeling document into the shareable .dcprt form. */
export function toDcPrtDocument(doc) {
    return {
        header: { format: DC_PRT_FORMAT, version: 1, units: 'mm', upAxis: 'Z' },
        docId: doc.docId,
        version: doc.version,
        features: doc.ops,
        bodies: Object.entries(doc.bodyNames).map(([bodyId, name]) => ({ bodyId, name })),
    };
}
export function isDcPrtDocument(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    const doc = value;
    return (doc.header?.format === DC_PRT_FORMAT &&
        typeof doc.docId === 'string' &&
        Array.isArray(doc.features) &&
        Array.isArray(doc.bodies));
}
