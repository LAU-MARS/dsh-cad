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
