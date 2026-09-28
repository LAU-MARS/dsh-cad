import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
import type { BinarySceneStore } from '../modeling/bin-store.js';
export interface FusionToolDeps {
    store: BinarySceneStore;
    workspaceRoot: string;
    ensureSceneRoute: () => string | null;
}
export declare function createFusionTool(deps: FusionToolDeps): ToolDefinition;
