import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
import type { BinarySceneStore } from '../modeling/bin-store.js';
export interface OnshapeToolDeps {
    store: BinarySceneStore;
    workspaceRoot: string;
    ensureSceneRoute: () => string | null;
}
export declare function createOnshapeTool(deps: OnshapeToolDeps): ToolDefinition;
