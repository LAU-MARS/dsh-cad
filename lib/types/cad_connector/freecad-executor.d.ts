import type { GeometryExecutor } from './executor.js';
/** Mesh shape shared with the WASM worker pipeline. */
export interface FreeCadMesh {
    bodyId: string;
    name: string;
    positions: Float32Array;
    normals: Float32Array;
    indices: Uint32Array;
    vertexCount: number;
    triangleCount: number;
}
export interface FreeCadProgram {
    ops: Array<Record<string, unknown>>;
    /** bodyId → display name (from create ops). */
    names?: Record<string, string>;
    input?: {
        format: 'step' | 'stp' | 'brep' | 'stl';
        path: string;
        bodyId?: string;
    };
    export?: {
        format: 'step' | 'stp' | 'stl';
        path: string;
    };
    /** Put the final bodies into a FreeCAD document so the GUI shows them. */
    display?: boolean;
}
export interface FreeCadResult {
    meshes: FreeCadMesh[];
    volumes: Record<string, number>;
    exported?: string;
}
/**
 * Locate a FreeCAD console executable: FREECAD_BIN env → PATH candidates →
 * common install directories. Cached after the first probe. Pass
 * `{ gui: true }` for the GUI binary (windowed) variant.
 */
export declare function findFreeCad(options?: {
    gui?: boolean;
}): string | null;
/** Whether an external FreeCAD executor is usable on this machine. */
export declare function freecadAvailable(): boolean;
export interface RunFreeCadOptions {
    timeoutMs?: number;
    /** Run in the FreeCAD GUI (detached window that stays open, showing the bodies). */
    gui?: boolean;
}
/**
 * Run a feature program in an external FreeCAD process and return tessellated
 * meshes + volumes (+ exported file path). Console mode waits for exit; GUI
 * mode detaches the windowed process and polls for the result file.
 */
export declare function runFreeCadProgram(program: FreeCadProgram, options?: RunFreeCadOptions): Promise<FreeCadResult>;
/** The GeometryExecutor contract over the FreeCAD console/GUI bridge. */
export declare const FREECAD_EXECUTOR: GeometryExecutor;
