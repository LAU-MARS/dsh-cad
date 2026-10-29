/**
 * Joint algebra for the assembly (main thread, pure math — kernel-independent).
 *
 * Mirrors cadorange 0.10.0's runtime assembly model (build123d joint family)
 * in dsh-cad's placement convention: flat world-placed instances with
 * translate + XYZ-Euler rotate (degrees, p' = T + Rx·(Ry·(Rz·p))). Joints are
 * placement data — a frame in the owner's LOCAL coordinates plus a motion
 * value; connecting pairs solves the child's world placement:
 *
 * ```text
 * childWorld = parentWorld ∘ Fp ∘ Mp(valueP) ∘ Mc(valueC) ∘ Fc⁻¹
 * ```
 *
 * `connect` is a one-time solve (the tool layer writes the result back through
 * an `assembly_transform` op, so the op log replays without this module);
 * driving a joint value or re-solving replays every recorded connection at
 * current values — the motion-study path. The worker never computes any of
 * this: joint specs and connections are persisted as ops and folded here.
 */
import type { AssemblyInstance } from './client.js'
import type { BinMeshData } from './bin-format.js'

export type JointType = 'rigid' | 'revolute' | 'linear' | 'cylindrical' | 'ball' | 'planar' | 'polar'

export const JOINT_TYPES: readonly JointType[] = ['rigid', 'revolute', 'linear', 'cylindrical', 'ball', 'planar', 'polar']

/**
 * A joint definition persisted in the op log. The frame (`at` + `axis`/`xDir`)
 * lives in the OWNER instance's local coordinates; `value` is the joint's
 * current motion (a bare number drives single-DOF joints).
 */
export interface JointSpec {
  type: JointType
  /** Frame origin in the owner's local coordinates (mm). */
  at?: [number, number, number]
  /** Joint axis / frame Z (default +Z). */
  axis?: [number, number, number]
  /** Pins the zero-position orientation (the frame's local X). */
  xDir?: [number, number, number]
  value?: JointValue
  angularRange?: [number, number]
  linearRange?: [number, number]
}

export type JointValue =
  | number
  | {
      angle?: number
      linear?: number
      radial?: number
      position?: [number, number]
      angles?: [number, number, number]
    }

/** One recorded joint pairing (child placed against parent). */
export interface AssemblyConnection {
  /** The child instance that was placed. */
  child: string
  /** The parent (fixed side) instance. */
  parent: string
  parentLabel: string
  childLabel: string
}

/** build123d's pairing table: parent (fixed) joint kind → allowed child kinds. */
const PAIRINGS: Record<JointType, readonly JointType[]> = {
  rigid: ['rigid'],
  revolute: ['rigid'],
  linear: ['rigid', 'revolute'],
  cylindrical: ['rigid'],
  ball: ['rigid'],
  planar: ['rigid'],
  polar: ['rigid'],
}

const VALUE_KEYS: Record<JointType, readonly string[]> = {
  rigid: [],
  revolute: ['angle'],
  linear: ['linear'],
  cylindrical: ['angle', 'linear'],
  ball: ['angles'],
  planar: ['angle', 'position'],
  polar: ['angle', 'radial'],
}

/** The per-type motion keys a bare number routes to (undefined = object only). */
const BARE_KEY: Partial<Record<JointType, string>> = { revolute: 'angle', linear: 'linear' }

type Vec3 = [number, number, number]

// ── placement algebra (translate + XYZ-Euler degrees) ────────────────────────

/** Rigid transform as a row-major 3×3 rotation + translation. */
export interface RigidMat {
  /** Row-major [r00,r01,r02, r10,r11,r12, r20,r21,r22]. */
  r: readonly number[]
  t: Vec3
}

const DEG = Math.PI / 180

/** Row-major rotation of XYZ Euler degrees — Rx·Ry·Rz (cad_transform). */
export function eulerMatrix(rotate: Vec3): number[] {
  const [rx, ry, rz] = rotate
  const cx = Math.cos(rx * DEG), sx = Math.sin(rx * DEG)
  const cy = Math.cos(ry * DEG), sy = Math.sin(ry * DEG)
  const cz = Math.cos(rz * DEG), sz = Math.sin(rz * DEG)
  return [
    cy * cz, -cy * sz, sy,
    cx * sz + sx * sy * cz, cx * cz - sx * sy * sz, -sx * cy,
    sx * sz - cx * sy * cz, sx * cz + cx * sy * sz, cx * cy,
  ]
}

/** Euler degrees back out of a row-major Rx·Ry·Rz rotation (gimbal at ±90° ry). */
export function matrixEuler(r: readonly number[]): Vec3 {
  const sy = Math.min(1, Math.max(-1, r[2] ?? 0))
  const ry = Math.asin(sy) / DEG
  if (Math.abs(Math.abs(sy) - 1) < 1e-9) {
    // Gimbal lock (ry = ±90°): rx and rz share one axis — fold rz into rx.
    // At +90° rx + rz = atan2(r10, r11); at −90° rz − rx = atan2(r10, r11).
    const rx = ((sy > 0 ? 1 : -1) * Math.atan2(r[3] ?? 0, r[4] ?? 0)) / DEG
    return [rx, ry, 0]
  }
  const rx = Math.atan2(-(r[5] ?? 0), (r[8] ?? 0)) / DEG
  const rz = Math.atan2(-(r[1] ?? 0), (r[0] ?? 0)) / DEG
  return [rx, ry, rz]
}

/** a ∘ b — apply b first, then a. */
export function composeMat(a: RigidMat, b: RigidMat): RigidMat {
  const r = new Array<number>(9)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      r[row * 3 + col] =
        (a.r[row * 3] ?? 0) * (b.r[col] ?? 0) +
        (a.r[row * 3 + 1] ?? 0) * (b.r[3 + col] ?? 0) +
        (a.r[row * 3 + 2] ?? 0) * (b.r[6 + col] ?? 0)
    }
  }
  const t: Vec3 = [
    (a.r[0] ?? 0) * b.t[0] + (a.r[1] ?? 0) * b.t[1] + (a.r[2] ?? 0) * b.t[2] + a.t[0],
    (a.r[3] ?? 0) * b.t[0] + (a.r[4] ?? 0) * b.t[1] + (a.r[5] ?? 0) * b.t[2] + a.t[1],
    (a.r[6] ?? 0) * b.t[0] + (a.r[7] ?? 0) * b.t[1] + (a.r[8] ?? 0) * b.t[2] + a.t[2],
  ]
  return { r, t }
}

export function invertMat(a: RigidMat): RigidMat {
  // Rotation transpose + −Rᵀt.
  const r = [
    a.r[0] ?? 0, a.r[3] ?? 0, a.r[6] ?? 0,
    a.r[1] ?? 0, a.r[4] ?? 0, a.r[7] ?? 0,
    a.r[2] ?? 0, a.r[5] ?? 0, a.r[8] ?? 0,
  ]
  const t: Vec3 = [
    -((r[0] ?? 0) * (a.t[0] ?? 0) + (r[1] ?? 0) * (a.t[1] ?? 0) + (r[2] ?? 0) * (a.t[2] ?? 0)),
    -((r[3] ?? 0) * (a.t[0] ?? 0) + (r[4] ?? 0) * (a.t[1] ?? 0) + (r[5] ?? 0) * (a.t[2] ?? 0)),
    -((r[6] ?? 0) * (a.t[0] ?? 0) + (r[7] ?? 0) * (a.t[1] ?? 0) + (r[8] ?? 0) * (a.t[2] ?? 0)),
  ]
  return { r, t }
}

export interface Placement {
  translate: Vec3
  rotate: Vec3
}

export function placementMat(p: Placement): RigidMat {
  return { r: eulerMatrix(p.rotate), t: [...p.translate] as Vec3 }
}

export function matPlacement(m: RigidMat): Placement {
  return { translate: [...m.t] as Vec3, rotate: matrixEuler(m.r) }
}

// ── frames & motions ─────────────────────────────────────────────────────────

const normalize3 = (v: readonly number[]): Vec3 => {
  const len = Math.hypot(v[0] ?? 0, v[1] ?? 0, v[2] ?? 0)
  if (len < 1e-12) throw new Error('方向向量为零 — 需要非零轴')
  return [(v[0] ?? 0) / len, (v[1] ?? 0) / len, (v[2] ?? 0) / len]
}

const cross3 = (a: readonly number[], b: readonly number[]): Vec3 => [
  (a[1] ?? 0) * (b[2] ?? 0) - (a[2] ?? 0) * (b[1] ?? 0),
  (a[2] ?? 0) * (b[0] ?? 0) - (a[0] ?? 0) * (b[2] ?? 0),
  (a[0] ?? 0) * (b[1] ?? 0) - (a[1] ?? 0) * (b[0] ?? 0),
]

const dot3 = (a: readonly number[], b: readonly number[]): number =>
  (a[0] ?? 0) * (b[0] ?? 0) + (a[1] ?? 0) * (b[1] ?? 0) + (a[2] ?? 0) * (b[2] ?? 0)

/** A unit vector ⊥ z, seeded deterministically (the frame fallback X). */
function perpendicularSeed(z: readonly number[]): Vec3 {
  const seed: Vec3 = Math.abs(z[0] ?? 0) < 0.9 ? [1, 0, 0] : [0, 1, 0]
  const d = dot3(seed, z)
  return normalize3([seed[0] - (z[0] ?? 0) * d, seed[1] - (z[1] ?? 0) * d, seed[2] - (z[2] ?? 0) * d])
}

/**
 * The joint's frame in the owner's local coordinates: local X → xDir (or the
 * deterministic fallback), local Z → axis, origin → at. Columns are the frame
 * axes, so frameMat maps joint-local coordinates onto owner-local ones.
 */
export function jointFrameMat(spec: JointSpec): RigidMat {
  const z = normalize3(spec.axis ?? [0, 0, 1])
  let x: Vec3
  if (spec.xDir === undefined) {
    x = perpendicularSeed(z)
  } else {
    const raw = normalize3(spec.xDir)
    const d = dot3(raw, z)
    const ortho = [(raw[0] ?? 0) - (z[0] ?? 0) * d, (raw[1] ?? 0) - (z[1] ?? 0) * d, (raw[2] ?? 0) - (z[2] ?? 0) * d]
    x = Math.hypot(ortho[0] ?? 0, ortho[1] ?? 0, ortho[2] ?? 0) < 1e-9 ? perpendicularSeed(z) : normalize3(ortho)
  }
  const y = cross3(z, x)
  const at = spec.at ?? [0, 0, 0]
  return { r: [x[0], y[0], z[0], x[1], y[1], z[1], x[2], y[2], z[2]], t: [...at] as Vec3 }
}

const translationMat = (t: Vec3): RigidMat => ({ r: [1, 0, 0, 0, 1, 0, 0, 0, 1], t: [...t] as Vec3 })

/** The joint's motion at its current value, in joint-local coordinates. */
export function jointMotionMat(spec: JointSpec): RigidMat {
  const value = valueOf(spec)
  switch (spec.type) {
    case 'rigid':
      return translationMat([0, 0, 0])
    case 'revolute':
      return { r: eulerMatrix([0, 0, value.angle ?? 0]), t: [0, 0, 0] }
    case 'linear':
      return translationMat([0, 0, value.linear ?? 0])
    case 'cylindrical':
      // Spin after the axial slide (both about local Z — the screw).
      return composeMat({ r: eulerMatrix([0, 0, value.angle ?? 0]), t: [0, 0, 0] }, translationMat([0, 0, value.linear ?? 0]))
    case 'ball':
      return { r: eulerMatrix(value.angles ?? [0, 0, 0]), t: [0, 0, 0] }
    case 'planar':
      // Spin, then slide [u,v] in the joint frame's plane.
      return composeMat(translationMat([value.position?.[0] ?? 0, value.position?.[1] ?? 0, 0]), { r: eulerMatrix([0, 0, value.angle ?? 0]), t: [0, 0, 0] })
    case 'polar':
      // Spin, then slide `radial` along local X.
      return composeMat(translationMat([value.radial ?? 0, 0, 0]), { r: eulerMatrix([0, 0, value.angle ?? 0]), t: [0, 0, 0] })
    default:
      throw new Error(`unknown joint type: ${String(spec.type)}`)
  }
}

/** The spec's value as an object (a bare number routed per type). */
export function valueOf(spec: JointSpec): Exclude<JointValue, number> {
  if (spec.value === undefined) return {}
  if (typeof spec.value === 'number') {
    const key = BARE_KEY[spec.type]
    if (key === undefined) {
      throw new Error(`"${spec.type}" joints need an object value ({ ${VALUE_KEYS[spec.type].join(', ')} }), not a bare number`)
    }
    return { [key]: spec.value } as Exclude<JointValue, number>
  }
  return spec.value
}

// ── validation ───────────────────────────────────────────────────────────────

function checkRange(value: number, range: [number, number] | undefined, what: string): number {
  if (range !== undefined && (value < range[0] || value > range[1])) {
    throw new Error(`${what} = ${value} 超出范围 [${range[0]}, ${range[1]}]`)
  }
  return value
}

function validateValue(type: JointType, value: JointValue, angularRange: [number, number] | undefined, linearRange: [number, number] | undefined, where: string): void {
  const allowed = VALUE_KEYS[type]
  const keys = typeof value === 'number' ? (BARE_KEY[type] === undefined ? [] : [BARE_KEY[type]]) : Object.keys(value)
  if (typeof value === 'number' && BARE_KEY[type] === undefined && type !== 'rigid') {
    throw new Error(`${where}: "${type}" needs an object value ({ ${allowed.join(', ')} }), not a bare number`)
  }
  for (const key of keys) {
    if (!(allowed as readonly string[]).includes(key)) {
      throw new Error(`${where}: "${type}" joints do not take "${key}" — allowed: ${allowed.join(', ') || 'none (rigid)'}`)
    }
  }
  if (type === 'rigid' && (typeof value !== 'number' ? Object.keys(value).length > 0 : true)) {
    throw new Error(`${where}: rigid joints take no motion value`)
  }
  if (typeof value === 'number') {
    if (type === 'revolute') checkRange(value, angularRange, `${where}.angle`)
    if (type === 'linear') checkRange(value, linearRange, `${where}.linear`)
    return
  }
  if (value.angle !== undefined && ['revolute', 'cylindrical', 'planar', 'polar'].includes(type)) {
    checkRange(value.angle, angularRange, `${where}.angle`)
  }
  if (value.linear !== undefined && (type === 'cylindrical' || type === 'linear')) {
    checkRange(value.linear, linearRange, `${where}.linear`)
  }
  if (value.angles !== undefined && type === 'ball') {
    if (!Array.isArray(value.angles) || value.angles.length !== 3) throw new Error(`${where}.angles must be [ax,ay,az] degrees`)
  }
  if (value.position !== undefined && type === 'planar') {
    if (!Array.isArray(value.position) || value.position.length !== 2) throw new Error(`${where}.position must be [u,v] mm`)
  }
}

const tuple3 = (raw: unknown, what: string): [number, number, number] => {
  if (!Array.isArray(raw) || raw.length !== 3 || !(raw as unknown[]).every((v) => typeof v === 'number' && Number.isFinite(v))) {
    throw new Error(`${what} must be [x,y,z] numbers`)
  }
  return raw as [number, number, number]
}

/** Validate + normalize a raw cad_assembly_joint payload into a JointSpec. */
export function normalizeJointSpec(raw: unknown, where: string): JointSpec {
  if (raw === null || typeof raw !== 'object') throw new Error(`${where}: a joint must be an object { type, at?, axis?, xDir?, value?, … }`)
  const input = raw as Record<string, unknown>
  if (typeof input.type !== 'string' || !(JOINT_TYPES as readonly string[]).includes(input.type)) {
    throw new Error(`${where}.type must be one of ${JOINT_TYPES.join(' / ')}`)
  }
  const type = input.type as JointType
  const spec: JointSpec = { type }
  if (input.at !== undefined) spec.at = tuple3(input.at, `${where}.at`)
  if (input.axis !== undefined) {
    spec.axis = tuple3(input.axis, `${where}.axis`)
    if (Math.hypot(...spec.axis) < 1e-9) throw new Error(`${where}.axis must be a non-zero direction`)
  }
  if (input.xDir !== undefined) spec.xDir = tuple3(input.xDir, `${where}.xDir`)
  if (input.angularRange !== undefined) {
    const r = input.angularRange
    if (!Array.isArray(r) || r.length !== 2 || !(r as unknown[]).every((v) => typeof v === 'number')) throw new Error(`${where}.angularRange must be [min,max] degrees`)
    spec.angularRange = r as [number, number]
  }
  if (input.linearRange !== undefined) {
    const r = input.linearRange
    if (!Array.isArray(r) || r.length !== 2 || !(r as unknown[]).every((v) => typeof v === 'number')) throw new Error(`${where}.linearRange must be [min,max] mm`)
    spec.linearRange = r as [number, number]
  }
  if (input.value !== undefined) validateValue(type, input.value as JointValue, spec.angularRange, spec.linearRange, `${where}.value`)
  if (input.value !== undefined) spec.value = input.value as JointValue
  return spec
}

/**
 * Merge a motion value into a spec (driving a joint): object values overlay
 * their keys onto the current value, a bare number replaces the single DOF.
 */
export function mergeJointValue(spec: JointSpec, value: JointValue, where: string): JointSpec {
  const previous = valueOf(spec)
  const next: JointValue = typeof value === 'number'
    ? value
    : { ...previous, ...value }
  validateValue(spec.type, next, spec.angularRange, spec.linearRange, where)
  return { ...spec, value: next }
}

/** Check a parent↔child pairing (build123d's table). */
export function checkPairing(parentType: JointType, childType: JointType, where: string): void {
  const allowed = PAIRINGS[parentType]
  if (!(allowed as readonly string[]).includes(childType)) {
    throw new Error(`${where}: a ${parentType} joint connects to ${allowed.join('/')}, but the child joint is ${childType}`)
  }
}

/**
 * Merge a connect-time value into the pairing (build123d semantics): the
 * value drives the PARENT joint — except a linear→revolute pair, where
 * `angle` routes to the child revolute and the rest goes to the parent.
 */
export function applyConnectValue(
  parentSpec: JointSpec,
  childSpec: JointSpec,
  value: JointValue,
  where: string,
): { parent: JointSpec; child: JointSpec } {
  if (parentSpec.type === 'linear' && childSpec.type === 'revolute' && typeof value === 'object' && value !== null && 'angle' in value) {
    const { angle, ...rest } = value as { angle?: number } & Record<string, unknown>
    const parent = Object.keys(rest).length > 0 ? mergeJointValue(parentSpec, rest as JointValue, `${where} (parent)`) : parentSpec
    const child = angle !== undefined ? mergeJointValue(childSpec, { angle }, `${where} (child)`) : childSpec
    return { parent, child }
  }
  return { parent: mergeJointValue(parentSpec, value, where), child: childSpec }
}

// ── connect & solve ──────────────────────────────────────────────────────────

/**
 * Solve the child's world placement so the two joint frames coincide (with
 * both motions applied) — cadorange's `connectTo` in the flat world-placed
 * model. The parent stays fixed; the child is repositioned.
 */
export function solveConnection(parent: Placement, parentSpec: JointSpec, childSpec: JointSpec): Placement {
  const world = composeMat(
    composeMat(
      composeMat(
        composeMat(placementMat(parent), jointFrameMat(parentSpec)),
        jointMotionMat(parentSpec),
      ),
      jointMotionMat(childSpec),
    ),
    invertMat(jointFrameMat(childSpec)),
  )
  return matPlacement(world)
}

/**
 * Replay every connection at the joints' CURRENT values (recorded order — a
 * connection whose parent was itself placed by an earlier connection chains
 * through its fresh placement). Returns the solved placement per child.
 */
export function solveConnections(
  instances: AssemblyInstance[],
  joints: ReadonlyMap<string, Readonly<Record<string, JointSpec>>>,
  connections: readonly AssemblyConnection[],
): Map<string, Placement> {
  const placements = new Map<string, Placement>(instances.map((instance) => [instance.instanceId, {
    translate: [...instance.translate] as Vec3,
    rotate: [...instance.rotate] as Vec3,
  }]))
  for (const connection of connections) {
    const parentInstance = instances.find((instance) => instance.instanceId === connection.parent)
    const parentSpec = joints.get(connection.parent)?.[connection.parentLabel]
    const childSpec = joints.get(connection.child)?.[connection.childLabel]
    if (parentInstance === undefined || parentSpec === undefined || childSpec === undefined) continue // stale edge (instance/joint gone)
    const current = placements.get(connection.parent) ?? {
      translate: [...parentInstance.translate] as Vec3,
      rotate: [...parentInstance.rotate] as Vec3,
    }
    placements.set(connection.child, solveConnection(current, parentSpec, childSpec))
  }
  return placements
}

// ── exploded view ────────────────────────────────────────────────────────────

/** Axis-aligned bbox of a body mesh (local coordinates). */
function meshBBox(mesh: BinMeshData): { min: Vec3; max: Vec3 } | null {
  const p = mesh.positions
  if (p === undefined || p.length < 3) return null
  const min: Vec3 = [Infinity, Infinity, Infinity]
  const max: Vec3 = [-Infinity, -Infinity, -Infinity]
  for (let i = 0; i + 2 < p.length; i += 3) {
    for (let axis = 0; axis < 3; axis++) {
      const v = p[i + axis] ?? 0
      if (v < (min[axis] ?? Infinity)) min[axis] = v
      if (v > (max[axis] ?? -Infinity)) max[axis] = v
    }
  }
  return Number.isFinite(min[0]) ? { min, max } : null
}

/**
 * Exploded-view offsets per instance (cadorange's `explode` in the flat
 * model): every instance is pushed radially away from the assembly's world
 * bbox center — direction = instance world center − assembly center,
 * magnitude = factor × that distance. Returns instanceId → world offset
 * (empty when factor is 0 or no two centers differ).
 */
export function explodeOffsets(
  bodies: ReadonlyMap<string, BinMeshData>,
  instances: readonly AssemblyInstance[],
  factor: number,
): Map<string, Vec3> {
  const offsets = new Map<string, Vec3>()
  if (!Number.isFinite(factor) || Math.abs(factor) < 1e-12 || instances.length === 0) return offsets
  const centers: Array<{ instanceId: string; center: Vec3 }> = []
  const worldMin: Vec3 = [Infinity, Infinity, Infinity]
  const worldMax: Vec3 = [-Infinity, -Infinity, -Infinity]
  for (const instance of instances) {
    const body = bodies.get(instance.bodyId)
    const local = body === undefined ? null : meshBBox(body)
    if (local === null) continue
    const m = placementMat(instance)
    // World bbox corners of the placed local box.
    const corner = (i: number): Vec3 => {
      const p: Vec3 = [
        i & 1 ? local.max[0] : local.min[0],
        i & 2 ? local.max[1] : local.min[1],
        i & 4 ? local.max[2] : local.min[2],
      ]
      return [
        (m.r[0] ?? 0) * p[0] + (m.r[1] ?? 0) * p[1] + (m.r[2] ?? 0) * p[2] + m.t[0],
        (m.r[3] ?? 0) * p[0] + (m.r[4] ?? 0) * p[1] + (m.r[5] ?? 0) * p[2] + m.t[1],
        (m.r[6] ?? 0) * p[0] + (m.r[7] ?? 0) * p[1] + (m.r[8] ?? 0) * p[2] + m.t[2],
      ]
    }
    const instanceMin: Vec3 = [Infinity, Infinity, Infinity]
    const instanceMax: Vec3 = [-Infinity, -Infinity, -Infinity]
    for (let i = 0; i < 8; i++) {
      const c = corner(i)
      for (let axis = 0; axis < 3; axis++) {
        const v = c[axis] ?? 0
        if (v < (instanceMin[axis] ?? Infinity)) instanceMin[axis] = v
        if (v > (instanceMax[axis] ?? -Infinity)) instanceMax[axis] = v
        if (v < (worldMin[axis] ?? Infinity)) worldMin[axis] = v
        if (v > (worldMax[axis] ?? -Infinity)) worldMax[axis] = v
      }
    }
    centers.push({
      instanceId: instance.instanceId,
      center: [(instanceMin[0] + instanceMax[0]) / 2, (instanceMin[1] + instanceMax[1]) / 2, (instanceMin[2] + instanceMax[2]) / 2],
    })
  }
  if (centers.length === 0) return offsets
  const assemblyCenter: Vec3 = [
    (worldMin[0] + worldMax[0]) / 2,
    (worldMin[1] + worldMax[1]) / 2,
    (worldMin[2] + worldMax[2]) / 2,
  ]
  for (const entry of centers) {
    const delta: Vec3 = [
      entry.center[0] - assemblyCenter[0],
      entry.center[1] - assemblyCenter[1],
      entry.center[2] - assemblyCenter[2],
    ]
    const dist = Math.hypot(delta[0], delta[1], delta[2])
    if (dist < 1e-9) continue // centered parts stay put
    offsets.set(entry.instanceId, [delta[0] * factor, delta[1] * factor, delta[2] * factor])
  }
  return offsets
}

// ── display ──────────────────────────────────────────────────────────────────

/** Human value text ("30°", "12mm", "30° · 5mm") — for tool renders and the panel. */
export function jointValueText(spec: JointSpec): string {
  const v = valueOf(spec)
  const parts: string[] = []
  if (v.angle !== undefined) parts.push(`${round(v.angle)}°`)
  if (v.linear !== undefined) parts.push(`${round(v.linear)}mm`)
  if (v.radial !== undefined) parts.push(`r${round(v.radial)}`)
  if (v.position !== undefined) parts.push(`[${round(v.position[0] ?? 0)}, ${round(v.position[1] ?? 0)}]`)
  if (v.angles !== undefined) parts.push(v.angles.map((a) => `${round(a)}°`).join(' '))
  return parts.join(' · ')
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000
}

/** Chinese labels for the joint kinds (panel display). */
export const JOINT_TYPE_ZH: Record<JointType, string> = {
  rigid: '刚性',
  revolute: '旋转',
  linear: '滑动',
  cylindrical: '圆柱',
  ball: '球面',
  planar: '平面',
  polar: '极坐标',
}
