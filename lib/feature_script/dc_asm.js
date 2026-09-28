/**
 * dsh-cad assembly document (`.dcasm`) — instances of parts placed in one
 * coordinate system. Parts are referenced, never embedded, so an assembly
 * stays small and part edits propagate on reload.
 *
 * Placement mirrors the `cad_transform` op semantics (mm, Z-up, Euler degrees)
 * so an instance can be materialized by replaying a transform on the
 * referenced body.
 */
export const DC_ASM_FORMAT = 'dcasm';
export const DC_ASM_EXTENSION = '.dcasm';
export function isDcAsmDocument(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    const doc = value;
    return doc.header?.format === DC_ASM_FORMAT && Array.isArray(doc.instances);
}
