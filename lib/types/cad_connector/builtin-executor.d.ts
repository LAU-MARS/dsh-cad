/**
 * The built-in kernel as a GeometryExecutor: runs a one-shot op program on an
 * ISOLATED OCCT worker (never the shared modeling-session worker), so
 * executor-driven runs can't clobber live session state. This is the same
 * primitive .dcprt replay uses.
 */
import type { GeometryExecutor } from './executor.js';
/** The shared WASM kernel always exists in this build. */
export declare const BUILTIN_EXECUTOR: GeometryExecutor;
