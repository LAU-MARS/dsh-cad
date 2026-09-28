/**
 * File buffer → CadScene: format dispatch, bounds computation, unit handling.
 */
import type { CadScene, CadScene3D, CadMesh } from '../types.js';
import type { CadFormat } from './detect.js';
/** Scan a set of CadMeshes for their axis-aligned bounds. */
export declare function computeMeshBounds(meshes: CadMesh[]): CadScene3D['bounds'];
/** Convert a supported CAD file buffer into a renderable scene. */
export declare function convert(buffer: Buffer, format: CadFormat, fileName: string): Promise<CadScene>;
