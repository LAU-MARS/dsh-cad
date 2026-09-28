import type { CadMesh } from '../types.js';
import type { ExecutorMesh, GeometryExecutor, GeometryProgram, GeometryResult, RunOptions } from './executor.js';
export interface OnshapeCredentials {
    /** https://cad.onshape.com or a chamber host (url.kea.onshape.com, …). */
    baseUrl: string;
    accessKey: string;
    secretKey: string;
}
/**
 * Credentials from the environment: DSH_ONSHAPE_ACCESS_KEY / SECRET_KEY
 * (Onshape API keys), with the unprefixed ONSHAPE_* spellings as fallback;
 * DSH_ONSHAPE_BASE_URL overrides the host (private chambers).
 */
export declare function onshapeCredentials(): OnshapeCredentials | null;
/** Whether an Onshape executor is usable with the current environment. */
export declare function onshapeAvailable(): boolean;
/** Install guidance shown when the credentials are missing. */
export declare function onshapeUnavailableReason(): string;
/**
 * The Onshape request signature: HMAC-SHA256 over the lowercased, newline-
 * terminated concatenation of method, nonce, date, content type, path and
 * query; encoded base64. See the API keys page in the Onshape docs.
 */
export declare function signOnshapeRequest(method: string, nonce: string, date: string, contentType: string, pathname: string, query: string, secretKey: string): string;
interface OnshapeRequestOptions {
    query?: Record<string, string | number | boolean | undefined>;
    json?: unknown;
    raw?: boolean;
}
/** Signed REST client over the v6 API (fetch-based, zero dependencies). */
export declare class OnshapeClient {
    private readonly creds;
    constructor(creds: OnshapeCredentials);
    /** Full URL of a document in this account (surfaced in tool output). */
    documentUrl(documentId: string): string;
    request<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', pathname: string, options?: OnshapeRequestOptions): Promise<T>;
    /** One signed HTTP round trip; null = rate-limited and should be retried. */
    private rawRequest;
}
type OpRecord = Record<string, unknown>;
/**
 * The canonical program accepted by codegenProgram after normalizeOps.
 * Each op becomes one or more standard feature payloads pushed in order.
 */
export interface OnshapeProgram {
    ops: OpRecord[];
}
export interface BTFeaturePayload {
    btType?: string;
    featureType: string;
    /** Client-side token; the server assigns the final featureId on push. */
    featureId?: string;
    name: string;
    parameters: Array<Record<string, unknown>>;
    suppressed: boolean;
    /** Sketch-only: the sketch geometry entities. */
    entities?: Array<Record<string, unknown>>;
    /** Sketch-only: constraints (always empty for generated sketches). */
    constraints?: Array<Record<string, unknown>>;
    namespace?: string;
}
/**
 * Compile one canonical op into one or more standard feature payloads.
 * `bodies` maps bodyId → the query string producing that body (each pushed
 * feature re-creates its result body, so the query always points at the
 * newest creator).
 * @throws on ops the Onshape executor does not support (reset, mirror).
 */
export declare function codegenOp(op: OpRecord, featureId: string, label: string, bodies: Map<string, string>): CompiledFeature[];
/** One compiled feature: the payload plus the client token its assigned id will replace. */
export interface CompiledFeature {
    feature: BTFeaturePayload;
    /** The client token that this feature's server-assigned id will replace. */
    produces?: string;
}
/** Change codegenOp's return type reference and the program compiler together. */
export declare function codegenProgram(program: OnshapeProgram, token: string): CompiledFeature[];
export interface OnshapeTarget {
    documentId?: string;
    workspaceId?: string;
    elementId?: string;
    documentName?: string;
}
/** Minimal binary STL encoder (test fixture + no-network round trips). */
export declare function encodeBinaryStl(triangles: Array<[number[], number[], number[]]>): Buffer;
/** Decode a parsed CadMesh (base64 form) into the executor mesh currency. */
export declare function cadMeshToExecutorMesh(mesh: CadMesh, bodyId: string): ExecutorMesh;
export interface OnshapeRunResult extends GeometryResult {
    /** Browser URL of the Onshape document holding the result. */
    documentUrl: string;
    documentId: string;
    documentName: string;
}
/**
 * Run one op program against Onshape: compile to standard features → push
 * into the Part Studio → wait for the recompute → per-part STL + mass
 * properties. When no target document is given, a fresh document is created
 * (and linked in the result).
 */
export declare function runOnshapeProgram(program: GeometryProgram, options?: RunOptions): Promise<OnshapeRunResult>;
/** The GeometryExecutor contract over the Onshape REST API. */
export declare const ONSHAPE_EXECUTOR: GeometryExecutor;
export {};
