/**
 * Shared tool helpers: path resolution and file loading. CAD payloads are
 * binary, so reads go through node:fs (the platform fs service exposes only
 * UTF-8 text reads); relative paths resolve against the workspace root like
 * every other model-facing path.
 */
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

/** Resolve a model-supplied path against the workspace root. */
export function resolveWorkspacePath(input: string, workspaceRoot: string): string {
  return path.isAbsolute(input) ? input : path.join(workspaceRoot, input)
}

/**
 * The calling session's workspace cwd, when the host's agent runtime exposes
 * it (`exec.agent.session.header.cwd`). dsh web/desktop launch the host with
 * cwd = workspace, but a host started from another directory (e.g. a dsh
 * source checkout) breaks that assumption — issue #6: exports landed in the
 * launch directory instead of the session's workspace.
 */
export function sessionCwdOf(exec: unknown): string | null {
  const cwd = (exec as { agent?: { session?: { header?: { cwd?: unknown } } | null } | undefined })?.agent?.session?.header?.cwd
  return typeof cwd === 'string' && path.isAbsolute(cwd) ? cwd : null
}

/**
 * Resolve a model-supplied path against the SESSION workspace first, falling
 * back to the process-cwd workspace root on hosts without session metadata.
 */
export function resolveSessionPath(input: string, exec: unknown, fallbackRoot: string): string {
  if (path.isAbsolute(input)) return input
  return path.join(sessionCwdOf(exec) ?? fallbackRoot, input)
}

/** Load a CAD file buffer, failing with model-friendly errors. */
export async function loadCadFile(resolvedPath: string): Promise<Buffer> {
  let info
  try {
    info = await stat(resolvedPath)
  } catch {
    throw new Error(`CAD file not found: ${resolvedPath}`)
  }
  if (!info.isFile()) throw new Error(`not a file: ${resolvedPath}`)
  return readFile(resolvedPath)
}
