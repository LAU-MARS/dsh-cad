import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
import type { SceneStore } from '../store.js';
export interface CadImageToolDeps {
    store: SceneStore;
    workspaceRoot: string;
    ensureSceneRoute: () => string | null;
}
export declare function createCadImageTool(deps: CadImageToolDeps): ToolDefinition;
