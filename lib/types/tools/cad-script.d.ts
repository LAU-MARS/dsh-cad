import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
export interface CadScriptToolDeps {
    workspaceRoot: string;
}
/** Build the cad_script tool definition. */
export declare function createCadScriptTool(deps: CadScriptToolDeps): ToolDefinition;
