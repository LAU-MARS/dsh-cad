import type { GeometryExecutor, GeometryProgram, GeometryResult, RunOptions } from './executor.js';
/** Locate a Fusion 360 application bundle/binary, or null when absent. */
export declare function findFusion360(): string | null;
/** Whether the Fusion executor is usable on this machine. */
export declare function fusion360Available(): boolean;
/** Idempotently install the resident bridge add-in next to its manifest. */
export declare function installFusionBridge(): Promise<string>;
/** Write a job, make sure Fusion is running, poll for the bridge result. */
export declare function runFusionProgram(program: GeometryProgram, options?: RunOptions): Promise<GeometryResult>;
/** The GeometryExecutor contract over the Fusion GUI bridge. */
export declare const FUSION360_EXECUTOR: GeometryExecutor;
