/**
 * Bridge to the Ansatz geometric constraint solver — the `ansatz-wasm` npm
 * dependency (a wasm-bindgen build: no Rust toolchain, no native binary,
 * platform independent, synchronous once loaded).
 *
 * Resolution for the wasm package directory, first hit wins:
 *   1. an explicit `wasmDir` option
 *   2. `DSH_ANSATZ_WASM` (any built pkg-node / package directory)
 *   3. the `ansatz-wasm` npm dependency in node_modules
 *   4. a sibling Ansatz checkout's wasm-pack output (solver development)
 *   5. Node's own resolution (hoisted/nested installs)
 *
 * The solver answers through a JSON envelope
 * `{ok:true,result} | {ok:false,error:{kind,message}}`. A tool-layer error
 * (e.g. `unsupported_constraint`) is thrown as an Error carrying the solver's
 * own message, so the LLM sees its "never just says failed" diagnostics
 * verbatim.
 */
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/** The solver's solve report (outcome + solved entities + diagnostics). */
export interface AnsatzSolveReport {
  outcome: string
  entities: Array<{ id: number; geometry?: Record<string, unknown> }>
  diagnostics?: Record<string, unknown>
}

/** The wasm shell's surface (wasm-pack nodejs target). */
interface AnsatzWasmModule {
  solveJson(modelJson: string): string
  version(): string
}

const require_ = createRequire(import.meta.url)

/** Repo root, derived from this module's URL (__dirname is absent in ESM). */
function repoRoot(): string {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
}

/** A directory holding the built wasm package (ansatz_wasm.js + _bg.wasm). */
function isWasmDir(dir: string | undefined): boolean {
  if (!dir) return false
  return fs.existsSync(path.join(dir, 'ansatz_wasm.js')) && fs.existsSync(path.join(dir, 'ansatz_wasm_bg.wasm'))
}

/**
 * Resolve the wasm solver package directory, or null when none is present.
 * The npm dependency wins, so `npm install ansatz-wasm@latest` takes effect.
 */
export function resolveAnsatzWasmDir(explicit?: string): string | null {
  const root = repoRoot()
  const candidates = [
    explicit,
    process.env.DSH_ANSATZ_WASM,
    // The declared npm dependency — the primary, version-respecting path.
    path.join(root, 'node_modules', 'ansatz-wasm'),
    // Solver development: a sibling checkout's wasm-pack output.
    path.join(root, '..', 'Ansatz', 'crates', 'ansatz-wasm', 'pkg-node'),
  ]
  for (const dir of candidates) {
    if (dir !== undefined && isWasmDir(dir)) return dir
  }
  // Fall back to Node's own resolution (hoisted/nested installs).
  try {
    return path.dirname(require_.resolve('ansatz-wasm/package.json'))
  } catch {
    return null
  }
}

/** Whether the solver is available (diagnostics/tests). */
export function ansatzAvailable(): boolean {
  return resolveAnsatzWasmDir() !== null
}

let cachedWasm: { dir: string; module: AnsatzWasmModule } | null = null

function loadWasm(dir: string): AnsatzWasmModule {
  if (cachedWasm !== null && cachedWasm.dir === dir) return cachedWasm.module
  // The wasm-pack nodejs target is CJS and reads its .wasm sibling from
  // __dirname, so it must be required (not imported) with the dir intact.
  const module = require_(path.join(dir, 'ansatz_wasm.js')) as AnsatzWasmModule
  cachedWasm = { dir, module }
  return module
}

/** Unwrap the envelope: report on ok, Error carrying the solver text otherwise. */
function unwrapEnvelope(envelopeJson: string): AnsatzSolveReport {
  let envelope: { ok?: boolean; result?: AnsatzSolveReport; error?: { kind?: string; message?: string } }
  try {
    envelope = JSON.parse(envelopeJson)
  } catch {
    throw new Error(`ansatz returned a non-JSON envelope: ${envelopeJson.slice(0, 200)}`)
  }
  if (envelope.ok === true && envelope.result !== undefined) return envelope.result
  const kind = envelope.error?.kind ?? 'solver_error'
  const message = envelope.error?.message ?? 'the solver returned an unspecified error'
  throw new Error(`ansatz ${kind}: ${message}`)
}

/** Solve one model with the wasm solver. */
export async function solveModel(model: unknown, options: { wasmDir?: string } = {}): Promise<AnsatzSolveReport> {
  const wasmDir = options.wasmDir ?? resolveAnsatzWasmDir()
  if (wasmDir === null) {
    throw new Error('the Ansatz solver is unavailable — install it (npm install ansatz-wasm) or point DSH_ANSATZ_WASM at a built wasm package')
  }
  return unwrapEnvelope(loadWasm(wasmDir).solveJson(JSON.stringify(model)))
}

/** Solver version string, or null when the solver is unavailable. */
export function ansatzVersion(options: { wasmDir?: string } = {}): string | null {
  const wasmDir = options.wasmDir ?? resolveAnsatzWasmDir()
  if (wasmDir === null) return null
  try {
    return loadWasm(wasmDir).version()
  } catch {
    return null
  }
}
