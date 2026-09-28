import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
import type { BinarySceneStore } from '../modeling/bin-store.js';
import { normalizeOps } from '../cad_connector/executor.js';
export declare const normalizeFreeCadSteps: typeof normalizeOps;
export interface FreeCadToolDeps {
    store: BinarySceneStore;
    workspaceRoot: string;
    ensureSceneRoute: () => string | null;
}
export declare function createFreeCadTool(deps: FreeCadToolDeps): ToolDefinition;
