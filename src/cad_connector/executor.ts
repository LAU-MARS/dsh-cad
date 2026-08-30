/**
 * GeometryExecutor — the unified backend access contract.
 *
 * The display layer is one WebGL pipeline and never changes; what varies is
 * HOW geometry is produced. Every backend (the built-in OCCT/WASM kernel,
 * FreeCAD, Fusion 360, a future SolidWorks bridge…) implements this one
 * interface over the same op program shape, so swapping executors changes
 * only the quality of the produced geometry — never the frontend.
 */

/** The mesh currency shared by every executor and the binary scene store. */
export interface ExecutorMesh {
  bodyId: string
  name: string
  positions: Float32Array
  normals: Float32Array
  indices: Uint32Array
  vertexCount: number
  triangleCount: number
}

/** A CAD file loaded as the initial body before the ops run. */
export interface ExecutorInput {
  format: 'step' | 'stp' | 'brep' | 'stl'
  path: string
  bodyId?: string
}

export interface ExecutorExport {
  format: 'step' | 'stp' | 'stl'
  path: string
}

/** The canonical op program every executor understands. */
export interface GeometryProgram {
  ops: Array<Record<string, unknown>>
  /** bodyId → display name (from create ops). */
  names?: Record<string, string>
  input?: ExecutorInput
  export?: ExecutorExport
  /** Keep the result on screen in the engine's own window, when supported. */
  display?: boolean
}

export interface GeometryResult {
  meshes: ExecutorMesh[]
  volumes: Record<string, number>
  exported?: string
}

export interface RunOptions {
  timeoutMs?: number
}

export interface GeometryExecutor {
  id: string
  label: string
  /** Whether this executor is usable on the current machine right now. */
  available(): boolean
  /** Human-readable reason when unavailable (install guidance). */
  unavailableReason?(): string
  /** Run one op program; rejects on any executor failure. */
  run(program: GeometryProgram, options?: RunOptions): Promise<GeometryResult>
}

// ── LLM op normalization (executor-agnostic) ────────────────────────────────

const OP_KINDS = new Set(['create_prim', 'extrude_profile', 'boolean', 'fillet', 'transform', 'volume', 'delete', 'reset'])
const BOOLEANS = new Set(['cut', 'fuse', 'common'])
const PRIMITIVES = new Set(['box', 'cylinder', 'sphere', 'cone', 'torus'])
const PRIM_FIELDS = ['dx', 'dy', 'dz', 'radius', 'radius1', 'radius2', 'height', 'majorRadius', 'minorRadius', 'at', 'axis']

/**
 * LLM callers emit op shapes liberally. Normalize the common variants onto
 * the canonical op shape before validation/execution:
 *  - {op:"cut", target, tools}              → {kind:"boolean", op:"cut", ...}
 *  - {op:"create_prim", kind:"box", dx:...} → {kind:"create_prim", prim:"box", params:{dx:...}}
 *  - {kind:"create_prim", prim, dx:...}     → params folded in
 */
export function normalizeOps(raw: unknown[]): Array<Record<string, unknown>> {
  return raw.map((step) => {
    if (typeof step !== 'object' || step === null) return step as Record<string, unknown>
    const source = { ...(step as Record<string, unknown>) }

    // {op:"cut"|"fuse"|"common", ...} without a kind
    if (typeof source.op === 'string' && BOOLEANS.has(source.op) && source.kind === undefined) {
      return { kind: 'boolean', op: source.op, target: source.target, tools: source.tools }
    }

    // {op:"<opKind>", ...} — op as the discriminator (kind may name the primitive)
    if (typeof source.op === 'string' && OP_KINDS.has(source.op) && !OP_KINDS.has(source.kind as string)) {
      const kind = source.op
      delete source.op
      if (kind === 'create_prim') {
        const prim = typeof source.prim === 'string' ? source.prim : PRIMITIVES.has(source.kind as string) ? (source.kind as string) : undefined
        if (source.kind !== undefined && !OP_KINDS.has(source.kind as string)) delete source.kind
        if (prim !== undefined) source.prim = prim
      }
      source.kind = kind
    }

    // fold inline primitive fields into params
    if (source.kind === 'create_prim') {
      const params = typeof source.params === 'object' && source.params !== null ? { ...(source.params as Record<string, unknown>) } : {}
      let folded = false
      for (const field of PRIM_FIELDS) {
        if (source[field] !== undefined) {
          params[field] = source[field]
          delete source[field]
          folded = true
        }
      }
      if (folded) source.params = params
    }
    return source
  })
}

/** Op discriminators the canonical program accepts. */
export function isKnownOpKind(kind: unknown): boolean {
  return typeof kind === 'string' && OP_KINDS.has(kind)
}

/** Registry of the executors compiled into this build (display order). */
import { FREECAD_EXECUTOR } from './freecad-executor.js'
import { FUSION360_EXECUTOR } from './fusion360-executor.js'
import { BUILTIN_EXECUTOR } from './builtin-executor.js'

export const EXECUTORS: readonly GeometryExecutor[] = [
  BUILTIN_EXECUTOR,
  FREECAD_EXECUTOR,
  FUSION360_EXECUTOR,
]

export function executorById(id: string): GeometryExecutor | undefined {
  return EXECUTORS.find((executor) => executor.id === id)
}
