/**
 * Minimal OBJ parser (v / vn / f with polygon triangulation, o / g groups).
 * Ignores materials, curves, and other entities the viewer cannot show.
 */
import type { CadMesh } from '../types.js';
/** Convert OBJ text into CadMeshes (one per non-empty group). */
export declare function parseOBJ(text: string, fallbackName: string): CadMesh[];
