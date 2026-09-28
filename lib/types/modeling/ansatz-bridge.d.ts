/** The solver's solve report (outcome + solved entities + diagnostics). */
export interface AnsatzSolveReport {
    outcome: string;
    entities: Array<{
        id: number;
        geometry?: Record<string, unknown>;
    }>;
    diagnostics?: Record<string, unknown>;
}
/**
 * Resolve the wasm solver package directory, or null when none is present.
 * The npm dependency wins, so `npm install ansatz-wasm@latest` takes effect.
 */
export declare function resolveAnsatzWasmDir(explicit?: string): string | null;
/** Whether the solver is available (diagnostics/tests). */
export declare function ansatzAvailable(): boolean;
/** Solve one model with the wasm solver. */
export declare function solveModel(model: unknown, options?: {
    wasmDir?: string;
}): Promise<AnsatzSolveReport>;
/** Solver version string, or null when the solver is unavailable. */
export declare function ansatzVersion(options?: {
    wasmDir?: string;
}): string | null;
