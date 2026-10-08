/** Resolve a model-supplied path against the workspace root. */
export declare function resolveWorkspacePath(input: string, workspaceRoot: string): string;
/**
 * The calling session's workspace cwd, when the host's agent runtime exposes
 * it (`exec.agent.session.header.cwd`). dsh web/desktop launch the host with
 * cwd = workspace, but a host started from another directory (e.g. a dsh
 * source checkout) breaks that assumption — issue #6: exports landed in the
 * launch directory instead of the session's workspace.
 */
export declare function sessionCwdOf(exec: unknown): string | null;
/**
 * Resolve a model-supplied path against the SESSION workspace first, falling
 * back to the process-cwd workspace root on hosts without session metadata.
 */
export declare function resolveSessionPath(input: string, exec: unknown, fallbackRoot: string): string;
/** Load a CAD file buffer, failing with model-friendly errors. */
export declare function loadCadFile(resolvedPath: string): Promise<Buffer>;
