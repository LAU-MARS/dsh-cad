/**
 * dsh-cad engineering drawing document (`.dceng`) — a 2D sheet referencing 3D
 * models through projected views, plus dimensions. Views are projections of
 * referenced parts/bodies, so the drawing stays in sync with the geometry.
 *
 * Default sheet is A4 landscape (297 × 210 mm), matching the DXF/SVG 2D
 * pipeline's true-drawing-units convention.
 */
export const DC_ENG_FORMAT = 'dceng';
export const DC_ENG_EXTENSION = '.dceng';
export const DC_ENG_SHEET_A4 = { width: 297, height: 210 };
export function isDcEngDocument(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    const doc = value;
    return (doc.header?.format === DC_ENG_FORMAT &&
        typeof doc.sheet === 'object' && doc.sheet !== null &&
        Array.isArray(doc.views));
}
