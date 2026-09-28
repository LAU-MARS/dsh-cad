/** Resolve a model-supplied path against the workspace root. */
export declare function resolveWorkspacePath(input: string, workspaceRoot: string): string;
/** Load a CAD file buffer, failing with model-friendly errors. */
export declare function loadCadFile(resolvedPath: string): Promise<Buffer>;
