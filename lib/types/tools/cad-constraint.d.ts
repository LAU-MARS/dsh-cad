import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
import type { ModelOp, OpResult } from '../modeling/client.js';
import type { ConstraintModel } from '../modeling/constraints.js';
import type { ModelDocument } from '../modeling/document.js';
import type { BinMeshData } from '../modeling/bin-format.js';
import type { ModelToolDeps } from './cad-model.js';
/**
 * State shared with createModelTools. The active document is read through
 * `getDocument()` (multi-document sessions swap it per call), and
 * `resolveDoc(exec)` binds the calling session's document + replays it —
 * the multi-document successor of the old restoreOnce.
 */
export interface ConstraintToolCtx {
    deps: ModelToolDeps;
    getDocument(): ModelDocument;
    meshCache: Map<string, BinMeshData>;
    constraintState: {
        model: ConstraintModel | null;
        lastSuggestions: string[];
    };
    resolveDoc(exec: unknown): Promise<void>;
    syncAssembly(op: ModelOp, result: OpResult, filePath?: string): Promise<Record<string, unknown>>;
    assemblyMetaOf(value: Record<string, unknown>): Record<string, unknown>;
}
export declare function createConstraintTools(ctx: ConstraintToolCtx): ToolDefinition[];
