/**
 * Engineering-drawing sheet assembly (main thread, pure geometry — unit
 * tested). Takes projected hidden-line views (from the modeling worker's mesh
 * HLR) and lays them out on a GB-flavoured first-angle sheet: 主视图 front,
 * 左视图 right of front, 俯视图 below front, 轴测 in the free corner; frame,
 * title block, overall-dimension annotations, and a uniform standard scale
 * for the three standard views.
 *
 * Output is the plain 2D entity subset the client viewport already renders
 * (polylines + text, layer-classified), plus SVG/DXF serializations for
 * cad_export.
 */
import type { CadBounds2, CadEntity2D } from '../types.js';
import type { DrawingView } from './client.js';
export type PaperSize = 'A4' | 'A3';
export interface DrawingSheetInput {
    partName: string;
    views: DrawingView[];
    paper?: PaperSize;
    drawingNo?: string;
    date?: string;
}
export interface DrawingSheet {
    entities: CadEntity2D[];
    bounds: CadBounds2;
    layers: string[];
    width: number;
    height: number;
    /** Standard scale of the three standard views (iso is fit independently). */
    scale: number;
    entityCount: number;
}
/** Build the full drawing sheet (frame, title block, views, dimensions). */
export declare function buildDrawingSheet(input: DrawingSheetInput): DrawingSheet;
/** Serialize the sheet to a standalone SVG (paper mm = user units, Y flipped). */
export declare function drawingToSvg(sheet: DrawingSheet): string;
/** Minimal R12 ASCII DXF (LINE + TEXT entities; polylines expand to lines). */
export declare function drawingToDxf(sheet: DrawingSheet): string;
