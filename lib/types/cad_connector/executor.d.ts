/**
 * GeometryExecutor — the unified backend access contract.
 *
 * The display layer is one WebGL pipeline and never changes; what varies is
 * HOW geometry is produced. Every backend (the built-in OCCT/WASM kernel,
 * FreeCAD, Fusion 360, a future SolidWorks bridge…) implements this one
 * interface over the same op program shape, so swapping executors changes
 * only the quality of the produced geometry — never the frontend.
 */
/** The mesh currency shared by every executor and the binary scene store. */
export interface ExecutorMesh {
    bodyId: string;
    name: string;
    positions: Float32Array;
    normals: Float32Array;
    indices: Uint32Array;
    vertexCount: number;
    triangleCount: number;
}
/** A CAD file loaded as the initial body before the ops run. */
export interface ExecutorInput {
    format: 'step' | 'stp' | 'brep' | 'stl';
    path: string;
    bodyId?: string;
}
export interface ExecutorExport {
    format: 'step' | 'stp' | 'stl';
    path: string;
}
/** The canonical op program every executor understands. */
export interface GeometryProgram {
    ops: Array<Record<string, unknown>>;
    /** bodyId → display name (from create ops). */
    names?: Record<string, string>;
    input?: ExecutorInput;
    export?: ExecutorExport;
    /** Keep the result on screen in the engine's own window, when supported. */
    display?: boolean;
    /** Cloud executors: drive an existing document/element instead of a new one. */
    target?: {
        documentId?: string;
        workspaceId?: string;
        elementId?: string;
        documentName?: string;
    };
    /** Cloud readback flavor: 'stl' (default, cheapest) or 'step' (server-side
     *  translation parsed locally into exact-BRep-derived meshes), or 'none'
     *  (build only, return the document link — the cheapest possible run). */
    readback?: 'stl' | 'step' | 'none';
}
export interface GeometryResult {
    meshes: ExecutorMesh[];
    volumes: Record<string, number>;
    exported?: string;
    /** Cloud executors (Onshape) link the holding document. */
    documentUrl?: string;
    documentId?: string;
    documentName?: string;
}
export interface RunOptions {
    timeoutMs?: number;
}
export interface GeometryExecutor {
    id: string;
    label: string;
    /** Whether this executor is usable on the current machine right now. */
    available(): boolean;
    /** Human-readable reason when unavailable (install guidance). */
    unavailableReason?(): string;
    /** Run one op program; rejects on any executor failure. */
    run(program: GeometryProgram, options?: RunOptions): Promise<GeometryResult>;
}
/**
 * LLM callers emit op shapes liberally. Normalize the common variants onto
 * the canonical op shape before validation/execution:
 *  - {op:"cut", target, tools}              → {kind:"boolean", op:"cut", ...}
 *  - {op:"create_prim", kind:"box", dx:...} → {kind:"create_prim", prim:"box", params:{dx:...}}
 *  - {kind:"create_prim", prim, dx:...}     → params folded in
 */
export declare function normalizeOps(raw: unknown[]): Array<Record<string, unknown>>;
/** Op discriminators the canonical program accepts. */
export declare function isKnownOpKind(kind: unknown): boolean;
export declare const EXECUTORS: readonly GeometryExecutor[];
export declare function executorById(id: string): GeometryExecutor | undefined;
