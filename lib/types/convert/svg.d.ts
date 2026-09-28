/**
 * SVG → CadDrawing2D. The raw SVG source is carried through and rendered in a
 * sandboxed <img>; entities/bounds are a best-effort scan of basic shapes for
 * the stats line.
 */
import type { CadDrawing2D } from '../types.js';
/** Extract the renderable entity subset from an SVG document. */
export declare function parseSVG(text: string): CadDrawing2D;
