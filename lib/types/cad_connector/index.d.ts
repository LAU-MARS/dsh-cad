/**
 * Connector registry, ordered like the README table: the built-in kernel
 * first, then external CAD executors by support status.
 */
import type { CadConnector } from './types.js';
export declare const CONNECTORS: readonly CadConnector[];
export declare function connectorById(id: string): CadConnector | undefined;
export * from './types.js';
