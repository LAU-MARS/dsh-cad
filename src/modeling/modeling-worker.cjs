/**
 * Modeling worker entry (plain CJS — the emscripten loader must not be pulled
 * through ESM; see the M0 notes on ERR_AMBIGUOUS_MODULE_SYNTAX).
 *
 * Protocol (main → worker): {jobId, op} where op replays one document
 * operation. (worker → main): {jobId, ok, result} with transferable buffers
 * for tessellation data.
 */
'use strict'

const { parentPort } = require('node:worker_threads')
const path = require('node:path')
const fs = require('node:fs')
const { createRequire } = require('node:module')
const { createAdapter } = require('./occt-adapter.cjs')
const { createOcctTsAdapter } = require('./occtts-adapter.cjs')
const { createOcctBridge, loadSharedOcctModule } = require('./occt-bridge.cjs')

const require3 = createRequire(__filename)
// The ES6 emscripten build reads a global __dirname when its factory runs.
if (typeof globalThis.__dirname === 'undefined') globalThis.__dirname = __dirname

const loaderPath = require3.resolve('opencascade.js/dist/opencascade.wasm.js')
const loaderModule = require3(loaderPath)
const wasmBinary = fs.readFileSync(path.join(path.dirname(loaderPath), 'opencascade.wasm.wasm'))

// Kernel selection: occt.ts is the PRIMARY backend (single-kernel modeling,
// true B-splines, shell/draft native, direct HLR); opencascade.js stays as
// the fallback when occt.ts cannot load. `adapter` carries whichever.
let adapter = null
let occt = null
let kernelName = 'occt.ts'

/**
 * Reject a degenerate result BEFORE registering it: the kernel cannot
 * tessellate a self-intersecting BRep (it fails deep inside the mesher with
 * a cryptic error), and an unrenderable body in the document helps no one.
 */
function assertUsable(shape, what, hint) {
  if (adapter.isValid(shape) === false) {
    throw new Error(`the ${what} produced an invalid shape (self-intersecting or degenerate)${hint === undefined ? '' : `: ${hint}`}`)
  }
}

/** bodyId → { shape, name, step? } — the live document. A body whose solid
 * was produced by an occt.ts-only op (shell/draft) is HOSTED: `step` carries
 * the STEP bytes as the source of truth and `shape` is null, because
 * opencascade.js in this build cannot read geometry back. */
const bodies = new Map()
let nextBodyNumber = 1

/** instanceId → { instanceId, bodyId, name, translate, rotate } — the assembly. */
const instances = new Map()

const triplet = (value) => (Array.isArray(value) && value.length === 3 ? value : [0, 0, 0])

function instancesList() {
  const list = []
  for (const instance of instances.values()) {
    list.push({
      instanceId: instance.instanceId,
      bodyId: instance.bodyId,
      name: instance.name,
      translate: triplet(instance.translate),
      rotate: triplet(instance.rotate),
    })
  }
  return list
}

function meshOf(shape, name) {
  const { positions, indices } = adapter.tessellate(shape)
  const normals = adapter.faceNormals(positions, indices)
  return {
    name,
    positions,
    normals,
    indices,
    vertexCount: positions.length / 3,
    triangleCount: indices.length / 3,
  }
}

async function applyOp(op) {
  switch (op.kind) {
    case 'create_prim': {
      const bodyId = op.bodyId
      const shape = adapter.makePrim(op.prim, op.params ?? {})
      bodies.set(bodyId, { shape, name: op.name ?? bodyId })
      return { bodyId, name: bodies.get(bodyId).name, mesh: meshOf(shape, bodies.get(bodyId).name) }
    }
    case 'extrude_profile': {
      const bodyId = op.bodyId
      // `profile` (segments/circle object) supersedes the legacy flat `points`;
      // both forms flow through the same curve-aware builder.
      const profile = op.profile ?? op.points
      const shape = adapter.extrudeProfile2D(profile, op.height ?? 10, op.base ?? 0)
      bodies.set(bodyId, { shape, name: op.name ?? bodyId })
      return { bodyId, name: bodies.get(bodyId).name, mesh: meshOf(shape, bodies.get(bodyId).name) }
    }
    case 'revolve': {
      const bodyId = op.bodyId
      const shape = adapter.makeRevolve(op.profile, { axis: op.axis, at: op.at, angle: op.angle })
      assertUsable(shape, 'revolve', '检查轮廓是否全部位于轴的一侧且共面')
      bodies.set(bodyId, { shape, name: op.name ?? bodyId })
      return { bodyId, name: bodies.get(bodyId).name, mesh: meshOf(shape, bodies.get(bodyId).name) }
    }
    case 'chamfer': {
      const body = requireShape(op.target, 'chamfer')
      const shape = adapter.chamferAll(body.shape, op.distance)
      assertUsable(shape, 'chamfer', '距离可能超出相邻面')
      body.shape = shape
      return { bodyId: op.target, name: body.name, mesh: meshOf(shape, body.name) }
    }
    case 'pattern': {
      const body = bodies.get(op.target)
      if (body === undefined) throw new Error(`unknown body: ${op.target}`)
      const count = Math.max(1, Math.trunc(op.count))
      const created = []
      for (let i = 1; i < count; i++) {
        const id = `${op.target}p${i}`
        let shape
        if (op.mode === 'circular') {
          // Rotation about a principal axis through `at`: translate in, rotate,
          // translate back (transform applies Euler rotations about the origin).
          const axis = op.axis ?? [0, 0, 1]
          const at = op.at ?? [0, 0, 0]
          const step = ((op.angle ?? 360) / count) * i
          const principal = Math.abs(axis[0]) > 0.9 ? [step, 0, 0]
            : Math.abs(axis[1]) > 0.9 ? [0, step, 0]
            : Math.abs(axis[2]) > 0.9 ? [0, 0, step]
            : null
          if (principal === null) throw new Error('circular pattern axes must be principal (+X/+Y/+Z)')
          shape = adapter.transform(adapter.transform(
            adapter.transform(body.shape, { translate: [-at[0], -at[1], -at[2]] }),
            { rotate: principal },
          ), { translate: [at[0], at[1], at[2]] })
        } else {
          shape = adapter.transform(body.shape, {
            translate: [op.delta[0] * i, op.delta[1] * i, op.delta[2] * i],
          })
        }
        const name = `${body.name}·${i}`
        bodies.set(id, { shape, name })
        created.push({ bodyId: id, name, mesh: meshOf(shape, name) })
      }
      return { bodyId: op.target, created }
    }
    case 'loft': {
      const bodyId = op.bodyId
      const shape = adapter.makeLoft(op.sections, { solid: op.solid, ruled: op.ruled })
      assertUsable(shape, 'loft', '检查各截面是否闭合、点数是否合理')
      bodies.set(bodyId, { shape, name: op.name ?? bodyId })
      return { bodyId, name: bodies.get(bodyId).name, mesh: meshOf(shape, bodies.get(bodyId).name) }
    }
    case 'sweep': {
      const bodyId = op.bodyId
      const shape = adapter.makeSweep(op.profile, op.path)
      assertUsable(shape, 'sweep', '路径上的尖角配合较大截面会自交——把拐角改为圆滑/倒角路径')
      bodies.set(bodyId, { shape, name: op.name ?? bodyId })
      return { bodyId, name: bodies.get(bodyId).name, mesh: meshOf(shape, bodies.get(bodyId).name) }
    }
    case 'shell': {
      const body = requireShape(op.target, 'shell')
      if (typeof adapter.shell !== 'function') throw new Error('shell requires the occt.ts kernel backend — it is unavailable, reinstall dsh-cad')
      const faces = Array.isArray(op.faces) && op.faces.length > 0 ? op.faces : matchFacesByNormal(body.shape, op.openNormals)
      const shape = adapter.shell(body.shape, op.thickness, faces)
      assertUsable(shape, 'shell', '检查壁厚是否超出几何允许')
      body.shape = shape
      return { bodyId: op.target, name: body.name, volume: Math.abs(adapter.volume(shape)), mesh: meshOf(shape, body.name) }
    }
    case 'draft': {
      const body = requireShape(op.target, 'draft')
      if (typeof adapter.draft !== 'function') throw new Error('draft requires the occt.ts kernel backend — it is unavailable, reinstall dsh-cad')
      const shape = adapter.draft(body.shape, op.angle, op.direction)
      assertUsable(shape, 'draft', '检查拔模角度是否超出几何允许')
      body.shape = shape
      return { bodyId: op.target, name: body.name, volume: Math.abs(adapter.volume(shape)), mesh: meshOf(shape, body.name) }
    }
    case 'boolean': {
      const target = requireShape(op.target, 'boolean')
      const tools = op.tools.map((id) => requireShape(id, 'boolean').shape)
      const shape = adapter.boolean(op.op, target.shape, tools)
      target.shape = shape
      // Consumed tool bodies are removed from the document (CAD convention).
      const removed = []
      for (const id of op.tools) {
        if (id !== op.target && bodies.delete(id)) removed.push(id)
      }
      return { bodyId: op.target, name: target.name, removed, mesh: meshOf(shape, target.name) }
    }
    case 'fillet': {
      const body = requireShape(op.target, 'fillet')
      const shape = adapter.filletAll(body.shape, op.radius ?? 1)
      assertUsable(shape, 'fillet', '半径可能超出相邻面')
      body.shape = shape
      return { bodyId: op.target, name: body.name, mesh: meshOf(shape, body.name) }
    }
    case 'transform': {
      const body = requireShape(op.target, 'transform')
      const shape = adapter.transform(body.shape, {
        translate: op.translate,
        rotate: op.rotate,
        mirror: op.mirror,
      })
      body.shape = shape
      return { bodyId: op.target, name: body.name, mesh: meshOf(shape, body.name) }
    }
    case 'tessellate_all': {
      const meshes = []
      for (const [bodyId, body] of bodies) {
        if (body.shape === null || body.shape === undefined) continue // hosted bodies re-mesh via their ops
        meshes.push({ bodyId, name: body.name, ...meshOf(body.shape, body.name) })
      }
      return { meshes }
    }
    case 'export': {
      const body = requireShape(op.target, 'export')
      const bytes = adapter.exportFile(body.shape, op.format)
      return { bytes: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) }
    }
    case 'drawing': {
      return drawingViews(op)
    }
    case 'assembly_insert': {
      const body = bodies.get(op.bodyId)
      if (body === undefined) throw new Error(`unknown body: ${op.bodyId}`)
      if (instances.has(op.instanceId)) throw new Error(`instance already exists: ${op.instanceId}`)
      instances.set(op.instanceId, {
        instanceId: op.instanceId,
        bodyId: op.bodyId,
        name: op.name ?? body.name,
        translate: triplet(op.translate),
        rotate: triplet(op.rotate),
      })
      return { instanceId: op.instanceId, bodyId: op.bodyId, instances: instancesList() }
    }
    case 'assembly_transform': {
      const instance = instances.get(op.instanceId)
      if (instance === undefined) throw new Error(`unknown instance: ${op.instanceId}`)
      if (op.translate !== undefined) instance.translate = triplet(op.translate)
      if (op.rotate !== undefined) instance.rotate = triplet(op.rotate)
      return { instanceId: op.instanceId, instances: instancesList() }
    }
    case 'assembly_remove': {
      if (!instances.delete(op.instanceId)) throw new Error(`unknown instance: ${op.instanceId}`)
      return { instanceId: op.instanceId, removed: op.instanceId, instances: instancesList() }
    }
    case 'assembly_list': {
      return { instances: instancesList() }
    }
    case 'constraints': {
      // Persist-only op: the constraint model lives in the document log and
      // is solved on the main thread (Ansatz wasm); the worker stores nothing.
      return { stored: true, entities: op.model.entities.length, constraints: op.model.constraints.length }
    }
    case 'export_assembly': {
      if (instances.size === 0) throw new Error('the assembly is empty')
      // Structured document export (occt.ts >= 0.7.0): one root product plus
      // one named, placed child per instance — instance separation survives
      // the STEP file. Duplicate names get the same ·N suffix the viewer
      // composer uses.
      if (op.format === 'step' && typeof adapter.exportStepDocument === 'function') {
        const nameUse = new Map()
        const nodes = []
        for (const instance of instances.values()) {
          const body = bodies.get(instance.bodyId)
          if (body === undefined || body.shape === null || body.shape === undefined) continue // stale instance of a consumed body
          const seen = nameUse.get(instance.name) ?? 0
          nameUse.set(instance.name, seen + 1)
          const name = seen === 0 ? instance.name : `${instance.name}·${seen + 1}`
          nodes.push({
            name,
            shape: body.shape,
            translate: triplet(instance.translate),
            rotate: triplet(instance.rotate),
          })
        }
        if (nodes.length === 0) throw new Error('no instance references a live body')
        const bytes = adapter.exportStepDocument(nodes)
        return { bytes: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), instances: instancesList() }
      }
      // STL (a single mesh — no structure to keep) and the legacy fallback
      // backend: fuse the placed instances into one solid (the STEP carries
      // the union; instance separation stays in the assembly scene/document).
      let compound = null
      let added = 0
      for (const instance of instances.values()) {
        const body = bodies.get(instance.bodyId)
        if (body === undefined) continue // stale instance of a consumed body
        const placed = adapter.transform(body.shape, {
          translate: instance.translate,
          rotate: instance.rotate,
        })
        compound = compound === null ? placed : adapter.boolean('fuse', compound, [placed])
        added++
      }
      if (added === 0) throw new Error('no instance references a live body')
      const bytes = adapter.exportFile(compound, op.format)
      return { bytes: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), instances: instancesList() }
    }
    case 'volume': {
      const body = requireShape(op.target, 'volume')
      const result = { volume: Math.abs(adapter.volume(body.shape)) }
      if (typeof adapter.centroid === 'function') {
        try { result.centroid = adapter.centroid(body.shape) } catch { /* centroid optional */ }
      }
      return result
    }
    case 'delete': {
      if (!bodies.delete(op.target)) throw new Error(`unknown body: ${op.target}`)
      return { deleted: op.target }
    }
    case 'reset': {
      bodies.clear()
      instances.clear()
      nextBodyNumber = 1
      return { cleared: true }
    }
    default:
      throw new Error(`unknown op: ${op.kind}`)
  }
}

/** Standard third/first-angle drawing views (GB first-angle arrangement). */
const DEFAULT_DRAWING_VIEWS = [
  { name: 'front', dir: [0, -1, 0], xDir: [1, 0, 0] },
  { name: 'top', dir: [0, 0, 1], xDir: [1, 0, 0] },
  { name: 'left', dir: [-1, 0, 0], xDir: [0, 1, 0] },
  { name: 'iso', dir: [1, -1, 1], xDir: [1, 1, 0] },
]

/**
 * The occt.ts kernel (true OCCT hidden-line removal) — the one and only
 * drawing engine. Lazily loaded on the first drawing op and cached,
 * including failures, so a missing dist costs one filesystem probe per
 * worker, not per drawing.
 */
let occtBridge = null
let occtBridgeTried = false
async function getOcctBridge() {
  if (occtBridgeTried) return occtBridge
  occtBridgeTried = true
  try {
    occtBridge = await createOcctBridge()
    if (occtBridge !== null) {
      console.log(`[dsh-cad] occt.ts kernel loaded (OCCT ${occtBridge.occtVersion}) from ${occtBridge.distDir}`)
    }
  } catch (error) {
    console.warn(`[dsh-cad] occt.ts kernel failed to load: ${error instanceof Error ? error.message : error}`)
    occtBridge = null
  }
  return occtBridge
}

/** Faces (1-based) whose outward plane-normal matches the target normals. */
function matchFacesByNormal(shape, openNormals) {
  if (!Array.isArray(openNormals) || openNormals.length === 0) return []
  if (typeof adapter.describe !== 'function') throw new Error('face matching by normal requires the occt.ts kernel backend')
  const desc = adapter.describe(shape)
  const faces = Array.isArray(desc.faces) ? desc.faces : []
  const picked = []
  for (const target of openNormals) {
    const tlen = Math.hypot(target[0], target[1], target[2])
    if (tlen < 1e-12) continue
    const tn = [target[0] / tlen, target[1] / tlen, target[2] / tlen]
    let best = null
    let bestScore = -Infinity
    for (const face of faces) {
      if (face.surface !== 'plane' || !Array.isArray(face.normal)) continue
      const dot = face.normal[0] * tn[0] + face.normal[1] * tn[1] + face.normal[2] * tn[2]
      if (Math.abs(dot) < 0.9) continue
      const outward = dot >= 0 ? 1 : -1
      const proj = (face.origin[0] * tn[0] + face.origin[1] * tn[1] + face.origin[2] * tn[2]) * outward
      const score = Math.abs(dot) + proj * 1e-3
      if (score > bestScore) { bestScore = score; best = face.index }
    }
    if (best !== null) picked.push(best)
  }
  return picked
}

/** Resolve a body's live shape (single-kernel: always present). */
function requireShape(bodyId, what) {
  const body = bodies.get(bodyId)
  if (body === undefined) throw new Error(`unknown body: ${bodyId}`)
  if (body.shape === null || body.shape === undefined) {
    throw new Error(`${bodyId} has no live shape (${what})`)
  }
  return body
}

async function drawingViews(op) {
  const body = bodies.get(op.target)
  if (body === undefined) throw new Error(`unknown body: ${op.target}`)
  const views = Array.isArray(op.views) && op.views.length > 0 ? op.views : DEFAULT_DRAWING_VIEWS
  const bridge = await getOcctBridge()
  if (bridge === null) {
    throw new Error('the occt.ts kernel is required for engineering drawings but was not found — install it (npm i occt.ts) or point DSH_OCCTJS_DIST at a dist directory')
  }
  const stepBytes = adapter.exportFile(body.shape, 'step')
  const projected = await bridge.hiddenLineViews(stepBytes, views)
  return { views: projected.views }
}

async function boot() {
  const mod = await loadSharedOcctModule()
  if (mod !== null) {
    adapter = createOcctTsAdapter(mod)
    kernelName = 'occt.ts'
  } else {
    console.warn('[dsh-cad] occt.ts unavailable — falling back to the opencascade.js backend')
    const initOpenCascade = loaderModule.default ?? loaderModule
    occt = await initOpenCascade({ wasmBinary })
    adapter = createAdapter(occt)
    kernelName = 'opencascade.js'
  }
  parentPort.postMessage({ jobId: 0, ok: true, result: { ready: true, kernel: kernelName } })
  parentPort.on('message', runMessage)
}

async function runMessage(message) {
  {
    const transfers = []
    try {
      const result = await applyOp(message.op)
      const collect = (mesh) => {
        if (mesh === undefined) return
        transfers.push(mesh.positions.buffer, mesh.indices.buffer, mesh.normals.buffer)
      }
      if (result.mesh !== undefined) collect(result.mesh)
      for (const mesh of result.meshes ?? []) collect(mesh)
      if (result.created !== undefined) for (const entry of result.created) if (entry.mesh !== undefined) collect(entry.mesh)
      if (result.bytes !== undefined) transfers.push(result.bytes)
      parentPort.postMessage({ jobId: message.jobId, ok: true, result }, transfers)
    } catch (error) {
      parentPort.postMessage({
        jobId: message.jobId,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }
}

boot().catch((error) => {
  parentPort.postMessage({ jobId: 0, ok: false, error: `modeling kernel init failed: ${error instanceof Error ? error.message : String(error)}` })
})

