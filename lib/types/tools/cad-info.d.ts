import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
export interface CadInfoToolDeps {
    workspaceRoot: string;
}
/** Build the cad_info tool definition. */
export declare function createCadInfoTool(deps: CadInfoToolDeps): ToolDefinition;
