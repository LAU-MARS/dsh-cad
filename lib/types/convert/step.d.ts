import type { CadMesh } from '../types.js';
export type OcctFormat = 'step' | 'iges' | 'brep';
/** Convert a STEP/IGES/BREP buffer to indexed CadMeshes. */
export declare function parseOcct(buffer: Buffer, format: OcctFormat, fallbackName: string, timeoutMs?: number): Promise<CadMesh[]>;
