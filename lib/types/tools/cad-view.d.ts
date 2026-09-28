import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
import type { SceneStore } from '../store.js';
export interface CadViewToolDeps {
    store: SceneStore;
    workspaceRoot: string;
    /** Idempotent lazy route registration; returns the scene URL base or null. */
    ensureSceneRoute: () => string | null;
}
/** Build the cad_view tool definition over the scene store. */
export declare function createCadViewTool(deps: CadViewToolDeps): ToolDefinition;
