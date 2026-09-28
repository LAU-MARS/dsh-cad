/**
 * Minimal STL parser (binary and ASCII) producing indexed triangle meshes.
 * Written by hand so the host side carries no Three.js dependency.
 */
import type { CadMesh } from '../types.js';
/** Convert an STL buffer into one indexed CadMesh. */
export declare function parseSTL(buffer: Buffer, name: string): CadMesh;
