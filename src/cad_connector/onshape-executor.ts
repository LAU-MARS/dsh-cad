/**
 * Onshape external executor: the cloud-native connector. Everything runs in
 * the Onshape REST API — no local install — so `available()` only checks for
 * API credentials. Each canonical op is compiled into one STANDARD Onshape
 * feature (sketch + extrude for prims and profiles, boolean / fillet /
 * transform features on top), pushed into the target Part Studio, and the
 * result is read back as per-part STL tessellations + mass properties.
 * Standard features carry an empty namespace and are fully documented, which
 * keeps the pipeline free of Feature-Studio compilation and custom-feature
 * namespace resolution entirely. Display happens in Onshape itself (the
 * document URL is returned) — the cloud is the viewer.
 *
 * Payload shapes verified against the official OpenAPI spec
 * (github.com/onshape-public/openapi) and the public API guides.
 */
import { createHmac, randomBytes } from 'node:crypto'
import { writeFile } from 'node:fs/promises'
import { parseSTL } from '../convert/stl.js'
import { parseOcct } from '../convert/step.js'
import type { CadMesh } from '../types.js'
import type { ExecutorMesh, GeometryExecutor, GeometryProgram, GeometryResult, RunOptions } from './executor.js'

export interface OnshapeCredentials {
  /** https://cad.onshape.com or a chamber host (url.kea.onshape.com, …). */
  baseUrl: string
  accessKey: string
  secretKey: string
}

/** API base path the REST calls hang off. */
const API_BASE = '/api/v6'

/**
 * Credentials from the environment: DSH_ONSHAPE_ACCESS_KEY / SECRET_KEY
 * (Onshape API keys), with the unprefixed ONSHAPE_* spellings as fallback;
 * DSH_ONSHAPE_BASE_URL overrides the host (private chambers).
 */
export function onshapeCredentials(): OnshapeCredentials | null {
  const accessKey = process.env.DSH_ONSHAPE_ACCESS_KEY ?? process.env.ONSHAPE_ACCESS_KEY
  const secretKey = process.env.DSH_ONSHAPE_SECRET_KEY ?? process.env.ONSHAPE_SECRET_KEY
  if (accessKey === undefined || accessKey === '' || secretKey === undefined || secretKey === '') return null
  const raw = process.env.DSH_ONSHAPE_BASE_URL ?? 'https://cad.onshape.com'
  const baseUrl = raw.replace(/\/+$/, '')
  return { baseUrl, accessKey, secretKey }
}

/** Whether an Onshape executor is usable with the current environment. */
export function onshapeAvailable(): boolean {
  return onshapeCredentials() !== null
}

/** Install guidance shown when the credentials are missing. */
export function onshapeUnavailableReason(): string {
  return 'Onshape API credentials are not configured — set DSH_ONSHAPE_ACCESS_KEY and DSH_ONSHAPE_SECRET_KEY (create API keys in Onshape: Account → Developer tools)'
}

/**
 * The Onshape request signature: HMAC-SHA256 over the lowercased, newline-
 * terminated concatenation of method, nonce, date, content type, path and
 * query; encoded base64. See the API keys page in the Onshape docs.
 */
export function signOnshapeRequest(
  method: string,
  nonce: string,
  date: string,
  contentType: string,
  pathname: string,
  query: string,
  secretKey: string,
): string {
  const payload = `${method}\n${nonce}\n${date}\n${contentType}\n${pathname}\n${query}\n`.toLowerCase()
  return createHmac('sha256', secretKey).update(payload).digest('base64')
}

interface OnshapeRequestOptions {
  query?: Record<string, string | number | boolean | undefined>
  json?: unknown
  raw?: boolean
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** Signed REST client over the v6 API (fetch-based, zero dependencies). */
export class OnshapeClient {
  private readonly creds: OnshapeCredentials

  constructor(creds: OnshapeCredentials) {
    this.creds = creds
  }

  /** Full URL of a document in this account (surfaced in tool output). */
  documentUrl(documentId: string): string {
    return `${this.creds.baseUrl}/documents/${documentId}`
  }

  async request<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', pathname: string, options: OnshapeRequestOptions = {}): Promise<T> {
    for (let attempt = 0; ; attempt++) {
      const response = await this.rawRequest(method, pathname, options, attempt)
      if (response === null) continue // rate-limited; rawRequest already waited
      if (options.raw === true) return Buffer.from(await response.arrayBuffer()) as unknown as T
      return (await response.json()) as T
    }
  }

  /** One signed HTTP round trip; null = rate-limited and should be retried. */
  private async rawRequest(method: 'GET' | 'POST' | 'PUT' | 'DELETE', pathname: string, options: OnshapeRequestOptions, attempt: number): Promise<Response | null> {
    const queryEntries = Object.entries(options.query ?? {}).filter(([, value]) => value !== undefined)
    const query = queryEntries.map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`).join('&')
    const pathWithBase = `${API_BASE}${pathname}`
    const url = `${this.creds.baseUrl}${pathWithBase}${query === '' ? '' : `?${query}`}`
    const contentType = 'application/json'
    const date = new Date().toUTCString()
    const nonce = randomBytes(16).toString('hex')
    const signature = signOnshapeRequest(method, nonce, date, contentType, pathWithBase, query, this.creds.secretKey)

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `On ${this.creds.accessKey}:HmacSHA256:${signature}`,
        Date: date,
        'On-Nonce': nonce,
        'Content-Type': contentType,
        Accept: 'application/vnd.onshape.v2+json;charset=UTF-8;qs=0.2',
      },
      ...(options.json === undefined ? {} : { body: JSON.stringify(options.json) }),
      signal: AbortSignal.timeout(60_000),
    })
    if (response.status === 429 && attempt < 4) {
      const retryAfter = Number(response.headers.get('retry-after'))
      await sleep((Number.isFinite(retryAfter) && retryAfter > 0 ? Math.min(retryAfter, 15) : Math.min(15, 2 ** attempt)) * 1000)
      return null
    }
    if (!response.ok) {
      let message = `${response.status} ${response.statusText}`
      try {
        const parsed = (await response.json()) as { message?: string }
        if (parsed.message !== undefined) message = parsed.message
      } catch {
        /* non-JSON error body — keep the status line */
      }
      if (response.status === 401 || response.status === 403) {
        // The Onshape API answers quota exhaustion with a misleading 401
        // ("Unauthenticated API request") instead of 402 — distinguish the two
        // by whether any call in this process has ever succeeded.
        throw new Error(
          quotaState.lastSuccessAt === 0
            ? `Onshape rejected the API credentials (${message}) — check DSH_ONSHAPE_ACCESS_KEY / DSH_ONSHAPE_SECRET_KEY`
            : `Onshape API quota exhausted or rate-limit cooldown (${message}) — the free plan caps API calls tightly; wait for the window to reset (usually within the day) or upgrade`,
        )
      }
      throw new Error(`Onshape API ${method} ${pathname} failed: ${message}`)
    }
    quotaState.lastSuccessAt = Date.now()
    return response
  }
}

/** Process-local record of whether the Onshape account has ever accepted a call. */
const quotaState = { lastSuccessAt: 0 }

// ── op program → standard BTM feature compilation ───────────────────────────

type OpRecord = Record<string, unknown>

/**
 * The canonical program accepted by codegenProgram after normalizeOps.
 * Each op becomes one or more standard feature payloads pushed in order.
 */
export interface OnshapeProgram {
  ops: OpRecord[]
}

export interface BTFeaturePayload {
  btType?: string
  featureType: string
  /** Client-side token; the server assigns the final featureId on push. */
  featureId?: string
  name: string
  parameters: Array<Record<string, unknown>>
  suppressed: boolean
  /** Sketch-only: the sketch geometry entities. */
  entities?: Array<Record<string, unknown>>
  /** Sketch-only: constraints (always empty for generated sketches). */
  constraints?: Array<Record<string, unknown>>
  namespace?: string
}

function num(op: OpRecord, key: string, fallback: number): number {
  const value = op[key]
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function paramsOf(op: OpRecord): OpRecord {
  const params = op.params
  return typeof params === 'object' && params !== null ? (params as OpRecord) : {}
}

function arrayOf(value: unknown, fallback: number[]): number[] {
  if (!Array.isArray(value)) return fallback
  const numbers = value.map((entry) => Number(entry))
  return numbers.some((entry) => !Number.isFinite(entry)) ? fallback : numbers
}

/** A validated length-3 vector (noUncheckedIndexedAccess-friendly). */
function triple(value: unknown, fallback: [number, number, number]): [number, number, number] {
  const numbers = arrayOf(value, [...fallback])
  return [numbers[0] ?? fallback[0], numbers[1] ?? fallback[1], numbers[2] ?? fallback[2]]
}

// BTM payload builders (schema names from the official OpenAPI spec).

function quantityParam(parameterId: string, expression: string): Record<string, unknown> {
  return { btType: 'BTMParameterQuantity-147', parameterId, expression, isInteger: false }
}

function enumParam(parameterId: string, enumName: string, value: string): Record<string, unknown> {
  return { btType: 'BTMParameterEnum-145', parameterId, enumName, value, namespace: '' }
}

function queryStringParam(parameterId: string, queryString: string): Record<string, unknown> {
  return {
    btType: 'BTMParameterQueryList-148',
    parameterId,
    queries: [{ btType: 'BTMIndividualQuery-138', queryString }],
  }
}

function sketchRegionParam(parameterId: string, featureId: string): Record<string, unknown> {
  return {
    btType: 'BTMParameterQueryList-148',
    parameterId,
    queries: [{ btType: 'BTMIndividualSketchRegionQuery-140', featureId }],
  }
}

/**
 * FeatureScript query EXPRESSION selecting the bodies a pushed feature id
 * created (no `query = ...;` wrapper — parameter builders add it once). The
 * id is the CLIENT token; the pipeline rewrites it to the server-assigned
 * feature id before each push.
 */
function bodiesCreatedBy(featureId: string): string {
  return `qCreatedBy(makeId("${featureId}"), EntityType.BODY)`
}

/** Query expression selecting the edges a pushed feature id created. */
function edgesCreatedBy(featureId: string): string {
  return `qCreatedBy(makeId("${featureId}"), EntityType.EDGE)`
}

/**
 * Sketch geometry is expressed in METERS on the wire (the docs' examples use
 * 0.025 for a 1-inch radius), so mm inputs are scaled here.
 */
const MM = 0.001

function lineCurve(entityId: string, x1: number, y1: number, x2: number, y2: number): Record<string, unknown> {
  const dx = x2 - x1
  const dy = y2 - y1
  const length = Math.hypot(dx, dy) || 1
  return {
    btType: 'BTMSketchCurve-4',
    entityId,
    geometry: {
      btType: 'BTCurveGeometryLine-117',
      pntX: x1 * MM,
      pntY: y1 * MM,
      dirX: dx / length,
      dirY: dy / length,
      length: length * MM,
    },
  }
}

function circleCurve(entityId: string, cx: number, cy: number, radius: number): Record<string, unknown> {
  return {
    btType: 'BTMSketchCurve-4',
    entityId,
    centerId: `${entityId}.center`,
    geometry: {
      btType: 'BTCurveGeometryCircle-115',
      xCenter: cx * MM,
      yCenter: cy * MM,
      xDir: 1,
      yDir: 0,
      radius: radius * MM,
      clockwise: false,
    },
  }
}

function sketchFeature(name: string, entities: Array<Record<string, unknown>>): BTFeaturePayload {
  return {
    btType: 'BTMSketch-151',
    featureType: 'newSketch',
    name,
    parameters: [queryStringParam('sketchPlane', 'query=qCreatedBy(makeId("Top"), EntityType.FACE);')],
    entities,
    constraints: [],
    suppressed: false,
  }
}

interface ExtrudeOptions {
  depth: string
  /** Parameter ids verified against real feature dumps; kept in one place. */
  extraParams?: Array<Record<string, unknown>>
}

function extrudeFeature(featureId: string, name: string, sketchId: string, options: ExtrudeOptions): BTFeaturePayload {
  return {
    btType: 'BTMFeature-134',
    featureType: 'extrude',
    featureId,
    name,
    parameters: [
      enumParam('bodyType', 'ExtendedToolBodyType', 'SOLID'),
      enumParam('operationType', 'NewBodyOperationType', 'NEW'),
      sketchRegionParam('entities', sketchId),
      enumParam('endBound', 'BoundingType', 'BLIND'),
      quantityParam('depth', options.depth),
      ...(options.extraParams ?? []),
    ],
    suppressed: false,
  }
}

function booleanFeature(featureId: string, name: string, operation: string, targets: string[], tools: string[]): BTFeaturePayload {
  const fsOperation = operation === 'cut' ? 'SUBTRACTION' : operation === 'common' ? 'INTERSECTION' : 'UNION'
  // targets/tools arrive as body EXPRESSIONS; each becomes one `query = ...;`
  // statement (single body direct, several wrapped in qUnion).
  const statement = (exprs: string[]): string =>
    `query = ${exprs.length === 1 ? exprs[0]! : `qUnion([${exprs.join(', ')}])`};`
  return {
    // The std boolean feature is registered as "booleanBodies" (verified
    // against the account's feature-specs list; "boolean" is rejected). It
    // takes separate "targets" and "tools" query parameters.
    btType: 'BTMFeature-134',
    featureType: 'booleanBodies',
    featureId,
    name,
    parameters: [
      enumParam('operationType', 'BooleanOperationType', fsOperation),
      queryStringParam('targets', statement(targets)),
      queryStringParam('tools', statement(tools)),
    ],
    suppressed: false,
  }
}

function filletFeature(featureId: string, name: string, entities: string, radiusMm: number): BTFeaturePayload {
  return {
    btType: 'BTMFeature-134',
    featureType: 'fillet',
    featureId,
    name,
    parameters: [queryStringParam('entities', `query = ${entities};`), quantityParam('radius', `${radiusMm} mm`)],
    suppressed: false,
  }
}

/**
 * Compile one canonical op into one or more standard feature payloads.
 * `bodies` maps bodyId → the query string producing that body (each pushed
 * feature re-creates its result body, so the query always points at the
 * newest creator).
 * @throws on ops the Onshape executor does not support (reset, mirror).
 */
export function codegenOp(op: OpRecord, featureId: string, label: string, bodies: Map<string, string>): CompiledFeature[] {
  const kind = String(op.kind)
  const bodyId = typeof op.bodyId === 'string' ? op.bodyId : `body${featureId}`
  switch (kind) {
    case 'create_prim': {
      const prim = String(op.prim ?? 'box')
      const params = paramsOf(op)
      const at = triple(params.at, [0, 0, 0])
      if (prim === 'box') {
        const dx = num(params, 'dx', 10)
        const dy = num(params, 'dy', 10)
        const dz = num(params, 'dz', 10)
        const [ax, ay] = [at[0], at[1]]
        const sketchId = `${featureId}sk`
        const rect = [
          lineCurve(`${sketchId}l1`, ax, ay, ax + dx, ay),
          lineCurve(`${sketchId}l2`, ax + dx, ay, ax + dx, ay + dy),
          lineCurve(`${sketchId}l3`, ax + dx, ay + dy, ax, ay + dy),
          lineCurve(`${sketchId}l4`, ax, ay + dy, ax, ay),
        ]
        bodies.set(bodyId, bodiesCreatedBy(featureId))
        return [
          { feature: sketchFeature(`${label} sketch`, rect), produces: sketchId },
          { feature: extrudeFeature(featureId, label, sketchId, {
            depth: `${dz} mm`,
            ...(at[2] !== 0 ? { extraParams: [enumParam('startBound', 'BoundingType', 'BLIND'), quantityParam('startDepth', `${at[2]} mm`)] } : {}),
          }), produces: featureId },
        ]
      }
      if (prim === 'cylinder') {
        const radius = num(params, 'radius', 5)
        const height = num(params, 'height', 10)
        const [ax, ay] = [at[0], at[1]]
        const sketchId = `${featureId}sk`
        bodies.set(bodyId, bodiesCreatedBy(featureId))
        return [
          { feature: sketchFeature(`${label} sketch`, [circleCurve(`${sketchId}c1`, ax, ay, radius)]), produces: sketchId },
          { feature: extrudeFeature(featureId, label, sketchId, {
            depth: `${height} mm`,
            ...(at[2] !== 0 ? { extraParams: [enumParam('startBound', 'BoundingType', 'BLIND'), quantityParam('startDepth', `${at[2]} mm`)] } : {}),
          }), produces: featureId },
        ]
      }
      throw new Error(`the Onshape executor supports box/cylinder create_prim in this build (got "${prim}") — sphere/cone/torus need the transform/revolve mapping`)
    }
    case 'extrude_profile': {
      const points = arrayOf(op.points, [])
      if (points.length < 6 || points.length % 2 !== 0) throw new Error('extrude_profile needs at least 3 [x, y] pairs')
      const height = num(op, 'height', 10)
      const corners: number[][] = []
      for (let i = 0; i + 1 < points.length; i += 2) corners.push([points[i]!, points[i + 1]!])
      const first = corners[0]!
      const last = corners[corners.length - 1]!
      if (first[0] !== last[0] || first[1] !== last[1]) corners.push([...first])
      const entities: Array<Record<string, unknown>> = []
      for (let i = 0; i + 1 < corners.length; i++) {
        const [x1 = 0, y1 = 0] = corners[i]!
        const [x2 = 0, y2 = 0] = corners[i + 1]!
        entities.push(lineCurve(`${featureId}sl${i}`, x1, y1, x2, y2))
      }
      const sketchId = `${featureId}sk`
      bodies.set(bodyId, bodiesCreatedBy(featureId))
      return [
        { feature: sketchFeature(`${label} sketch`, entities), produces: sketchId },
        { feature: extrudeFeature(featureId, label, sketchId, { depth: `${height} mm` }), produces: featureId },
      ]
    }
    case 'boolean': {
      const targetId = typeof op.target === 'string' ? op.target : ''
      const target = bodies.get(targetId)
      if (target === undefined) throw new Error(`boolean target "${targetId}" was never created`)
      const tools = Array.isArray(op.tools) ? (op.tools as unknown[]) : []
      if (tools.length === 0) throw new Error('boolean needs at least one tool body')
      const toolQueries: string[] = []
      for (const tool of tools) {
        const tracked = bodies.get(String(tool))
        if (tracked === undefined) throw new Error(`boolean tool "${String(tool)}" was never created`)
        toolQueries.push(tracked)
        bodies.delete(String(tool))
      }
      bodies.set(targetId, bodiesCreatedBy(featureId))
      return [{ feature: booleanFeature(featureId, label, String(op.op ?? 'fuse'), [target], toolQueries), produces: featureId }]
    }
    case 'fillet': {
      const targetId = typeof op.target === 'string' ? op.target : ''
      const target = bodies.get(targetId)
      if (target === undefined) throw new Error(`fillet target "${targetId}" was never created`)
      const radius = num(op, 'radius', 1)
      bodies.set(targetId, bodiesCreatedBy(featureId))
      return [{ feature: filletFeature(featureId, label, edgesCreatedBy(extractFeatureId(target)), radius), produces: featureId }]
    }
    case 'transform':
      throw new Error('transform is not mapped to Onshape standard features in this build')
    case 'delete':
      throw new Error('delete is not mapped to Onshape standard features in this build (previous dsh-cad features are replaced per run)')
    case 'volume':
      // Volumes come from the mass properties REST call after the recompute.
      return []
    case 'reset':
      throw new Error('reset is not supported by the Onshape executor — each run starts from the target Part Studio as-is')
    default:
      throw new Error(`the Onshape executor does not support op "${kind}"`)
  }
}

/** The feature id a body query string points at (for edge queries of the same creator). */
function extractFeatureId(bodyQuery: string): string {
  const match = bodyQuery.match(/makeId\("([^"]+)"\)/)
  if (match === null) throw new Error(`internal: cannot derive the creator id from query ${bodyQuery}`)
  return match[1]!
}

/** One compiled feature: the payload plus the client token its assigned id will replace. */
export interface CompiledFeature {
  feature: BTFeaturePayload
  /** The client token that this feature's server-assigned id will replace. */
  produces?: string
}

/** Change codegenOp's return type reference and the program compiler together. */
export function codegenProgram(program: OnshapeProgram, token: string): CompiledFeature[] {
  const bodies = new Map<string, string>()
  const features: CompiledFeature[] = []
  for (const [index, rawOp] of program.ops.entries()) {
    const op = rawOp as OpRecord
    const featureId = `f${index}_${token}`
    const label = `dsh-cad f${index}`
    features.push(...codegenOp(op, featureId, label, bodies))
  }
  return features
}

// ── run pipeline ────────────────────────────────────────────────────────────

interface BTElementInfo {
  id: string
  name: string
  elementType?: string
}

interface BTDocumentInfo {
  id: string
  name?: string
  defaultWorkspace?: { id?: string }
}

interface BTFeatureListItem {
  feature?: { featureId?: string; name?: string }
  featureState?: { featureStatus?: string; message?: string }
}

interface BTFeatureListResponse {
  features?: BTFeatureListItem[]
}

interface BTPartInfo {
  partId?: string
  name?: string
  bodyType?: string
}

interface BTMassPropertiesBulkInfo {
  bodies?: Record<string, { volume?: number[] }>
}

interface BTTranslationRequestInfo {
  id?: string
  requestState?: 'ACTIVE' | 'DONE' | 'FAILED'
  resultExternalDataIds?: string[]
  failureReason?: string
}

/**
 * Translate the whole Part Studio to STEP server-side and return the file
 * bytes: POST a translation job, poll it to DONE, then fetch the produced
 * external-data file. ~3 REST calls + a few seconds of Onshape-side work.
 */
async function translateToStep(
  client: OnshapeClient,
  did: string,
  wid: string,
  eid: string,
  documentName: string,
  deadline: number,
): Promise<Buffer> {
  const request = await client.request<BTTranslationRequestInfo>(
    'POST',
    `/partstudios/d/${did}/w/${wid}/e/${eid}/translations`,
    {
      json: {
        formatName: 'STEP',
        destinationName: `${documentName === '' ? 'dsh-cad' : documentName}.step`,
        unit: 'millimeter',
        specifyUnits: true,
        storeInDocument: false,
      },
    },
  )
  const tid = request.id
  if (tid === undefined) throw new Error('Onshape did not return a translation id for the STEP export')
  let info: BTTranslationRequestInfo = request
  while (Date.now() < deadline) {
    if (info.requestState === 'FAILED') {
      throw new Error(`the Onshape STEP translation failed: ${info.failureReason ?? 'unknown reason'}`)
    }
    if (info.requestState === 'DONE') break
    await sleep(1000)
    info = await client.request<BTTranslationRequestInfo>('GET', `/translations/${tid}`)
  }
  if (info.requestState !== 'DONE') throw new Error('the Onshape STEP translation did not finish before the timeout')
  const fileId = info.resultExternalDataIds?.[0]
  if (fileId === undefined) throw new Error('the Onshape STEP translation produced no downloadable file')
  return client.request<Buffer>('GET', `/documents/d/${did}/externaldata/${fileId}`, { raw: true })
}

export interface OnshapeTarget {
  documentId?: string
  workspaceId?: string
  elementId?: string
  documentName?: string
}

function elementTypeOf(element: BTElementInfo): string {
  return String(element.elementType ?? '').replace(/[_\s-]/g, '').toLowerCase()
}

/** Minimal binary STL encoder (test fixture + no-network round trips). */
export function encodeBinaryStl(triangles: Array<[number[], number[], number[]]>): Buffer {
  const buffer = Buffer.alloc(84 + triangles.length * 50)
  buffer.writeUInt32LE(triangles.length, 80)
  let offset = 84
  for (const [a, b, c] of triangles) {
    offset += 12 // facet normal — zeros, the parser re-derives flat normals
    for (const corner of [a, b, c]) {
      buffer.writeFloatLE(corner[0]!, offset)
      buffer.writeFloatLE(corner[1]!, offset + 4)
      buffer.writeFloatLE(corner[2]!, offset + 8)
      offset += 12
    }
    offset += 2
  }
  return buffer
}

function f32FromBase64(base64: string): Float32Array {
  const buffer = Buffer.from(base64, 'base64')
  const out = new Float32Array(Math.floor(buffer.byteLength / 4))
  for (let i = 0; i < out.length; i++) out[i] = buffer.readFloatLE(i * 4)
  return out
}

function u32FromBase64(base64: string): Uint32Array {
  const buffer = Buffer.from(base64, 'base64')
  const out = new Uint32Array(Math.floor(buffer.byteLength / 4))
  for (let i = 0; i < out.length; i++) out[i] = buffer.readUInt32LE(i * 4)
  return out
}

/** Decode a parsed CadMesh (base64 form) into the executor mesh currency. */
export function cadMeshToExecutorMesh(mesh: CadMesh, bodyId: string): ExecutorMesh {
  const positions = f32FromBase64(mesh.positions)
  const indices = u32FromBase64(mesh.indices)
  let normals = mesh.normals !== undefined ? f32FromBase64(mesh.normals) : new Float32Array(0)
  let usable = normals.length === positions.length
  if (usable) {
    let nonZero = false
    for (const value of normals) {
      if (!Number.isFinite(value)) {
        usable = false
        break
      }
      if (value !== 0) nonZero = true
    }
    if (!nonZero) usable = false
  }
  if (!usable) {
    // Flat per-corner normals derived from the triangle geometry.
    normals = new Float32Array(positions.length)
    for (let t = 0; t + 2 < indices.length; t += 3) {
      const ia = indices[t]! * 3
      const ib = indices[t + 1]! * 3
      const ic = indices[t + 2]! * 3
      const ux = positions[ib]! - positions[ia]!
      const uy = positions[ib + 1]! - positions[ia + 1]!
      const uz = positions[ib + 2]! - positions[ia + 2]!
      const vx = positions[ic]! - positions[ia]!
      const vy = positions[ic + 1]! - positions[ia + 1]!
      const vz = positions[ic + 2]! - positions[ia + 2]!
      const nx = uy * vz - uz * vy
      const ny = uz * vx - ux * vz
      const nz = ux * vy - uy * vx
      const length = Math.hypot(nx, ny, nz) || 1
      for (const base of [ia, ib, ic]) {
        normals[base] = nx / length
        normals[base + 1] = ny / length
        normals[base + 2] = nz / length
      }
    }
  }
  return {
    bodyId,
    name: mesh.name,
    positions,
    normals,
    indices,
    vertexCount: mesh.vertexCount,
    triangleCount: mesh.triangleCount,
  }
}

export interface OnshapeRunResult extends GeometryResult {
  /** Browser URL of the Onshape document holding the result. */
  documentUrl: string
  documentId: string
  documentName: string
}

/**
 * Run one op program against Onshape: compile to standard features → push
 * into the Part Studio → wait for the recompute → per-part STL + mass
 * properties. When no target document is given, a fresh document is created
 * (and linked in the result).
 */
export async function runOnshapeProgram(program: GeometryProgram, options: RunOptions = {}): Promise<OnshapeRunResult> {
  const creds = onshapeCredentials()
  if (creds === null) {
    throw new Error('Onshape API credentials are not configured — set DSH_ONSHAPE_ACCESS_KEY and DSH_ONSHAPE_SECRET_KEY')
  }
  const client = new OnshapeClient(creds)
  const deadline = Date.now() + (options.timeoutMs ?? 300_000)

  // 1. Resolve the target document + workspace.
  const target: OnshapeTarget = (program as { target?: OnshapeTarget }).target ?? {}
  let did = target.documentId ?? ''
  let documentName = target.documentName ?? ''
  let wid = target.workspaceId ?? ''
  let documentCreated = false
  if (did === '') {
    const name = target.documentName ?? `dsh-cad ${new Date().toISOString().replace(/\.\d+Z$/, '')}`
    const createDocument = async (isPublic: boolean): Promise<BTDocumentInfo> =>
      client.request<BTDocumentInfo>('POST', '/documents', { json: isPublic ? { name, isPublic } : { name } })
    let created: BTDocumentInfo
    try {
      created = await createDocument(false)
    } catch (error) {
      // Free accounts may only create public documents — retry once as public.
      if (!/public documents/i.test(error instanceof Error ? error.message : String(error))) throw error
      created = await createDocument(true)
    }
    did = created.id
    documentName = created.name ?? documentName
    wid = created.defaultWorkspace?.id ?? ''
    if (wid === '') throw new Error('the created Onshape document has no default workspace')
    documentCreated = true
  } else {
    const info = await client.request<BTDocumentInfo>('GET', `/documents/${did}`)
    documentName = info.name ?? documentName
    if (wid === '') wid = info.defaultWorkspace?.id ?? ''
    if (wid === '') throw new Error('the target document has no default workspace — pass workspaceId')
  }

  // 2. Resolve the Part Studio.
  const listElements = async (): Promise<BTElementInfo[]> =>
    client.request<BTElementInfo[]>('GET', `/documents/d/${did}/w/${wid}/elements`)
  let elements = await listElements()
  let partStudio = elements.find((element) => elementTypeOf(element) === 'partstudio')
  if (partStudio === undefined) {
    await client.request('POST', `/partstudios/d/${did}/w/${wid}`, { json: { name: 'dsh-cad' } })
    elements = await listElements()
    partStudio = elements.find((element) => elementTypeOf(element) === 'partstudio')
    if (partStudio === undefined) throw new Error('the Onshape document has no Part Studio element')
  }
  const psEid = target.elementId ?? partStudio.id

  // 3. Compile the program. For a document we just created the Part Studio is
  //    empty (origin planes only), so the previous-run cleanup is skipped —
  //    every REST call counts against the (small) free-plan API quota.
  const token = Date.now().toString(36)
  const features = codegenProgram({ ops: program.ops }, token)
  if (features.length === 0) {
    throw new Error('the program compiled to no Onshape features (nothing to build)')
  }
  const featureListPath = `/partstudios/d/${did}/w/${wid}/e/${psEid}/features`
  if (!documentCreated) {
    const previous = await client.request<BTFeatureListResponse>('GET', featureListPath)
    for (const entry of previous.features ?? []) {
      const fid = entry.feature?.featureId
      if (fid !== undefined && (entry.feature?.name ?? '').startsWith('dsh-cad')) {
        await client.request('DELETE', `${featureListPath}/featureid/${fid}`)
      }
    }
  }

  // 4. Push the features in order; microversion skew is accepted between
  //    pushes because each feature references its predecessors by query.
  //    The server ASSIGNS the final featureId on push, so every reference to
  //    a predecessor's client-side id is rewritten to the assigned id first.
  const assignedIds = new Map<string, string>()
  interface BTPushResponse {
    featureState?: BTFeatureListItem['featureState']
    feature?: { featureId?: string }
  }
  /**
   * Rewrite client id tokens to server-assigned ids EVERYWHERE they appear —
   * including inside queryString values, where JSON escaping hides them from
   * plain-text replacement (makeId(\"token\") vs "token").
   */
  const rewriteTokens = (node: unknown): unknown => {
    if (typeof node === 'string') {
      let text = node
      for (const [token, assigned] of assignedIds) {
        text = text.split(token).join(assigned)
      }
      return text
    }
    if (Array.isArray(node)) return node.map(rewriteTokens)
    if (typeof node === 'object' && node !== null) {
      const out: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(node)) out[key] = rewriteTokens(value)
      return out
    }
    return node
  }
  for (const compiled of features) {
    const payload = rewriteTokens({ btType: 'BTFeatureDefinitionCall-1406', feature: compiled.feature }) as Record<string, unknown>
    const pushed = await client.request<BTPushResponse>('POST', featureListPath, { json: payload })
    if (compiled.produces !== undefined && pushed.feature?.featureId !== undefined) {
      assignedIds.set(compiled.produces, pushed.feature.featureId)
    }
    if (pushed.featureState?.featureStatus === 'ERROR') {
      throw new Error(`Onshape failed to evaluate "${compiled.feature.name}": ${pushed.featureState.message ?? 'unknown feature error'}`)
    }
  }

  // 5. Read the parts the program produced (the per-push featureState already
  //    reported OK, so no feature-list polling is needed — quota-friendly).
  const readback = (program as { readback?: 'stl' | 'step' | 'none' }).readback ?? 'stl'
  let parts: BTPartInfo[] = []
  if (readback !== 'none') {
    for (let attempt = 0; attempt < 4 && Date.now() < deadline; attempt++) {
      await sleep(attempt === 0 ? 1500 : 2500)
      parts = (await client.request<BTPartInfo[]>('GET', `/parts/d/${did}/w/${wid}/e/${psEid}`).catch(() => [])).filter(
        (part) => typeof part.partId === 'string' && part.partId !== '',
      )
      if (parts.length > 0) break
    }
    if (parts.length === 0) {
      throw new Error('the Onshape program produced no parts (every feature reported OK — check the document in the Onshape UI)')
    }
  }

  // 7. Readback. `stl` (default): per-part binary tessellation — one cheap
  //    synchronous call per part. `step`: server-side translation to STEP,
  //    downloaded and parsed through the local OCCT importer, so the local
  //    viewer gets exact-BRep-derived geometry with part names. `none`: skip
  //    geometry download entirely — the run's deliverable is the Onshape
  //    document link alone (3 calls; the cheapest channel-2-only mode).
  const meshes: ExecutorMesh[] = []
  if (readback === 'step') {
    const step = await translateToStep(client, did, wid, psEid, documentName, deadline)
    const parsed = await parseOcct(step, 'step', documentName === '' ? 'onshape' : documentName)
    if (parsed.length === 0) throw new Error('the Onshape STEP translation parsed to no bodies')
    for (const [index, mesh] of parsed.entries()) {
      meshes.push(cadMeshToExecutorMesh(mesh, `part${index + 1}`))
    }
  } else if (readback === 'stl') {
    for (const part of parts) {
      const stl = await client.request<Buffer>('GET', `/parts/d/${did}/w/${wid}/e/${psEid}/partid/${part.partId}/stl`, {
        query: { mode: 'binary', units: 'millimeter', angleTolerance: 0.3, chordTolerance: 0.0005 },
        raw: true,
      })
      const parsed = parseSTL(stl, part.name ?? part.partId!)
      meshes.push(cadMeshToExecutorMesh(parsed, part.partId!))
    }
  }
  // 'none': no geometry fetched — volumes also skipped (channel 2 only).
  const volumes: Record<string, number> = {}
  if (readback !== 'none') {
    const mass = await client
      .request<BTMassPropertiesBulkInfo>('GET', `/partstudios/d/${did}/w/${wid}/e/${psEid}/massproperties`)
      .catch(() => null)
    if (mass?.bodies !== undefined) {
      // The bulk key "-all-" carries the aggregate; per-part keys carry each.
      const allVolume = mass.bodies['-all-']?.volume?.[0]
      for (const part of parts) {
        const volume = mass.bodies[part.partId!]?.volume?.[0] ?? (parts.length === 1 ? allVolume : undefined)
        if (typeof volume === 'number') volumes[part.name ?? part.partId!] = volume * 1e9 // m³ → mm³
      }
    }
  }

  // 8. Optional local export — STL (tessellation), STEP (translation), or
  //    Parasolid (.x_t/.x_b — Onshape's native kernel BRep, one direct GET).
  //    'none' readback forbids export: it would be the only geometry path.
  let exported: string | undefined
  const exportSpec = program.export
  if (exportSpec !== undefined && readback === 'none') {
    throw new Error('export is not supported with readback "none" (it would be the only geometry path)')
  }
  if (exportSpec !== undefined) {
    const extension = exportSpec.path.toLowerCase().split('.').pop() ?? ''
    if (extension === 'stl') {
      const studio = await client.request<Buffer>('GET', `/partstudios/d/${did}/w/${wid}/e/${psEid}/stl`, {
        query: { mode: 'binary', units: 'millimeter', angleTolerance: 0.3, chordTolerance: 0.0005 },
        raw: true,
      })
      await writeFile(exportSpec.path, studio)
      exported = exportSpec.path
    } else if (extension === 'step' || extension === 'stp') {
      const step = await translateToStep(client, did, wid, psEid, documentName, deadline)
      await writeFile(exportSpec.path, step)
      exported = exportSpec.path
    } else if (extension === 'x_t' || extension === 'x_b' || extension === 'xmt_txt') {
      const parasolid = await client.request<Buffer>('GET', `/partstudios/d/${did}/w/${wid}/e/${psEid}/parasolid`, { raw: true })
      await writeFile(exportSpec.path, parasolid)
      exported = exportSpec.path
    } else {
      throw new Error('the Onshape executor exports .stl / .step / .stp / .x_t / .x_b (Parasolid)')
    }
  }

  return {
    meshes,
    volumes,
    ...(exported === undefined ? {} : { exported }),
    documentUrl: client.documentUrl(did),
    documentId: did,
    documentName,
  }
}

/** The GeometryExecutor contract over the Onshape REST API. */
export const ONSHAPE_EXECUTOR: GeometryExecutor = {
  id: 'onshape',
  label: 'Onshape',
  available: onshapeAvailable,
  unavailableReason: onshapeUnavailableReason,
  run(program: GeometryProgram, options: RunOptions = {}): Promise<GeometryResult> {
    return runOnshapeProgram(program, options)
  },
}
