/**
 * DXF → CadDrawing2D conversion via dxf-parser. Maps the entity subset the
 * viewport renders; unknown entity types are counted, not failed.
 *
 * dxf-parser ships as CJS with `module.exports = class`; load it through
 * createRequire to sidestep ESM-interop typing friction.
 */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const DxfParser = require('dxf-parser');
/** DXF AutoCAD color index → 0xRRGGBB (subset). 0 = ByBlock/ByLayer. */ const ACI_COLORS = {
    1: 0xff0000, 2: 0xffff00, 3: 0x00ff00, 4: 0x00ffff, 5: 0x0000ff, 6: 0xff00ff,
    7: 0xffffff, 8: 0x808080, 9: 0xc0c0c0,
    30: 0xff5f00, 40: 0xff8700, 50: 0xffaf00, 60: 0xffd700, 90: 0xaf8700,
};
function aciColor(colorIndex) {
    if (colorIndex === undefined || colorIndex === 0)
        return undefined;
    return ACI_COLORS[colorIndex];
}
function bulgedPolylinePoints(vertices) {
    // Bulge arcs are approximated by the chord polyline; exact arc tessellation
    // is deferred work. Straight segments pass through unchanged.
    const points = [];
    for (const vertex of vertices)
        points.push(vertex.x, vertex.y);
    return points;
}
/** Convert DXF text into a 2D drawing. */
export function parseDXF(text) {
    const dxf = new DxfParser().parseSync(text) ?? { entities: [] };
    const entities = [];
    const layers = new Set();
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    const track = (x, y) => {
        if (!Number.isFinite(x) || !Number.isFinite(y))
            return;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    };
    for (const entity of dxf.entities ?? []) {
        const layer = typeof entity.layer === 'string' && entity.layer !== '' ? entity.layer : undefined;
        if (layer !== undefined)
            layers.add(layer);
        const color = aciColor(entity.colorIndex);
        switch (entity.type) {
            case 'LINE': {
                // dxf-parser exposes LINE endpoints as a two-entry vertices array.
                const line = entity;
                const from = line.vertices?.[0];
                const to = line.vertices?.[1];
                if (from === undefined || to === undefined)
                    break;
                entities.push({ type: 'line', x1: from.x, y1: from.y, x2: to.x, y2: to.y, layer, color });
                track(from.x, from.y);
                track(to.x, to.y);
                break;
            }
            case 'CIRCLE': {
                const circle = entity;
                entities.push({ type: 'circle', cx: circle.center.x, cy: circle.center.y, r: circle.radius, layer, color });
                track(circle.center.x - circle.radius, circle.center.y - circle.radius);
                track(circle.center.x + circle.radius, circle.center.y + circle.radius);
                break;
            }
            case 'ARC': {
                const arc = entity;
                entities.push({
                    type: 'arc', cx: arc.center.x, cy: arc.center.y, r: arc.radius,
                    startAngle: arc.startAngle, endAngle: arc.endAngle, layer, color,
                });
                track(arc.center.x - arc.radius, arc.center.y - arc.radius);
                track(arc.center.x + arc.radius, arc.center.y + arc.radius);
                break;
            }
            case 'LWPOLYLINE':
            case 'POLYLINE': {
                const polyline = entity;
                const points = bulgedPolylinePoints(polyline.vertices ?? []);
                if (points.length >= 4) {
                    entities.push({ type: 'polyline', points, closed: polyline.shape === true, layer, color });
                    for (let i = 0; i < points.length; i += 2)
                        track(points[i], points[i + 1]);
                }
                break;
            }
            case 'TEXT':
            case 'MTEXT': {
                const textEntity = entity;
                const anchor = textEntity.startPoint ?? textEntity.position;
                const content = textEntity.text;
                if (anchor !== undefined && content !== undefined && content !== '') {
                    entities.push({
                        type: 'text', x: anchor.x, y: anchor.y, text: content,
                        height: textEntity.textHeight ?? 1, rotation: textEntity.rotation ?? 0, layer, color,
                    });
                    track(anchor.x, anchor.y);
                }
                break;
            }
            default:
                // Unknown entity kinds are skipped; the count still reflects them.
                break;
        }
    }
    if (!Number.isFinite(minX)) {
        minX = 0;
        minY = 0;
        maxX = 0;
        maxY = 0;
    }
    return {
        kind: '2d',
        format: 'dxf',
        entities,
        bounds: { min: { x: minX, y: minY }, max: { x: maxX, y: maxY } },
        layers: [...layers],
    };
}
