/**
 * GeometryExecutor — the unified backend access contract.
 *
 * The display layer is one WebGL pipeline and never changes; what varies is
 * HOW geometry is produced. Every backend (the built-in OCCT/WASM kernel,
 * FreeCAD, Fusion 360, a future SolidWorks bridge…) implements this one
 * interface over the same op program shape, so swapping executors changes
 * only the quality of the produced geometry — never the frontend.
 */
// ── LLM op normalization (executor-agnostic) ────────────────────────────────
const OP_KINDS = new Set(['create_prim', 'extrude_profile', 'boolean', 'fillet', 'transform', 'volume', 'delete', 'reset']);
const BOOLEANS = new Set(['cut', 'fuse', 'common']);
const PRIMITIVES = new Set(['box', 'cylinder', 'sphere', 'cone', 'torus']);
const PRIM_FIELDS = ['dx', 'dy', 'dz', 'radius', 'radius1', 'radius2', 'height', 'majorRadius', 'minorRadius', 'at', 'axis'];
/**
 * LLM callers emit op shapes liberally. Normalize the common variants onto
 * the canonical op shape before validation/execution:
 *  - {op:"cut", target, tools}              → {kind:"boolean", op:"cut", ...}
 *  - {op:"create_prim", kind:"box", dx:...} → {kind:"create_prim", prim:"box", params:{dx:...}}
 *  - {kind:"create_prim", prim, dx:...}     → params folded in
 */
export function normalizeOps(raw) {
    return raw.map((step) => {
        if (typeof step !== 'object' || step === null)
            return step;
        const source = { ...step };
        // {op:"cut"|"fuse"|"common", ...} without a kind
        if (typeof source.op === 'string' && BOOLEANS.has(source.op) && source.kind === undefined) {
            return { kind: 'boolean', op: source.op, target: source.target, tools: source.tools };
        }
        // {op:"<opKind>", ...} — op as the discriminator (kind may name the primitive)
        if (typeof source.op === 'string' && OP_KINDS.has(source.op) && !OP_KINDS.has(source.kind)) {
            const kind = source.op;
            delete source.op;
            if (kind === 'create_prim') {
                const prim = typeof source.prim === 'string' ? source.prim : PRIMITIVES.has(source.kind) ? source.kind : undefined;
                if (source.kind !== undefined && !OP_KINDS.has(source.kind))
                    delete source.kind;
                if (prim !== undefined)
                    source.prim = prim;
            }
            source.kind = kind;
        }
        // fold inline primitive fields into params
        if (source.kind === 'create_prim') {
            const params = typeof source.params === 'object' && source.params !== null ? { ...source.params } : {};
            let folded = false;
            for (const field of PRIM_FIELDS) {
                if (source[field] !== undefined) {
                    params[field] = source[field];
                    delete source[field];
                    folded = true;
                }
            }
            if (folded)
                source.params = params;
        }
        return source;
    });
}
/** Op discriminators the canonical program accepts. */
export function isKnownOpKind(kind) {
    return typeof kind === 'string' && OP_KINDS.has(kind);
}
/** Registry of the executors compiled into this build (display order). */
import { FREECAD_EXECUTOR } from './freecad-executor.js';
import { FUSION360_EXECUTOR } from './fusion360-executor.js';
import { ONSHAPE_EXECUTOR } from './onshape-executor.js';
import { BUILTIN_EXECUTOR } from './builtin-executor.js';
export const EXECUTORS = [
    BUILTIN_EXECUTOR,
    FREECAD_EXECUTOR,
    FUSION360_EXECUTOR,
    ONSHAPE_EXECUTOR,
];
export function executorById(id) {
    return EXECUTORS.find((executor) => executor.id === id);
}
