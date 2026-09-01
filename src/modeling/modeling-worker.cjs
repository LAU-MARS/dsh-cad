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
const { createOcctBridge } = require('./occt-bridge.cjs')

const require3 = createRequire(__filename)
// The ES6 emscripten build reads a global __dirname when its factory runs.
if (typeof globalThis.__dirname === 'undefined') globalThis.__dirname = __dirname

const loaderPath = require3.resolve('opencascade.js/dist/opencascade.wasm.js')
const loaderModule = require3(loaderPath)
const wasmBinary = fs.readFileSync(path.join(path.dirname(loaderPath), 'opencascade.wasm.wasm'))

let adapter = null
let occt = null

/** bodyId → { shape, name } — the live document. */
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
      const shape = adapter.makeExtrudedProfile(op.points, op.height ?? 10, op.base ?? 0)
      bodies.set(bodyId, { shape, name: op.name ?? bodyId })
      return { bodyId, name: bodies.get(bodyId).name, mesh: meshOf(shape, bodies.get(bodyId).name) }
    }
    case 'boolean': {
      const target = bodies.get(op.target)
      if (target === undefined) throw new Error(`unknown body: ${op.target}`)
      const tools = op.tools.map((id) => {
        const tool = bodies.get(id)
        if (tool === undefined) throw new Error(`unknown body: ${id}`)
        return tool.shape
      })
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
      const body = bodies.get(op.target)
      if (body === undefined) throw new Error(`unknown body: ${op.target}`)
      const { shape, edges } = adapter.filletAll(body.shape, op.radius ?? 1)
      body.shape = shape
      return { bodyId: op.target, name: body.name, edges, mesh: meshOf(shape, body.name) }
    }
    case 'transform': {
      const body = bodies.get(op.target)
      if (body === undefined) throw new Error(`unknown body: ${op.target}`)
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
        meshes.push({ bodyId, name: body.name, ...meshOf(body.shape, body.name) })
      }
      return { meshes }
    }
    case 'export': {
      const body = bodies.get(op.target)
      if (body === undefined) throw new Error(`unknown body: ${op.target}`)
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
    case 'export_assembly': {
      if (instances.size === 0) throw new Error('the assembly is empty')
      const builder = new occt.BRep_Builder()
      const compound = new occt.TopoDS_Compound()
      builder.MakeCompound(compound)
      let added = 0
      for (const instance of instances.values()) {
        const body = bodies.get(instance.bodyId)
        if (body === undefined) continue // stale instance of a consumed body
        builder.Add(compound, adapter.transform(body.shape, {
          translate: instance.translate,
          rotate: instance.rotate,
        }))
        added++
      }
      if (added === 0) throw new Error('no instance references a live body')
      const bytes = adapter.exportFile(compound, op.format)
      return { bytes: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), instances: instancesList() }
    }
    case 'volume': {
      const body = bodies.get(op.target)
      if (body === undefined) throw new Error(`unknown body: ${op.target}`)
      return { volume: adapter.volume(body.shape) }
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

const initOpenCascade = loaderModule.default ?? loaderModule
initOpenCascade({ wasmBinary }).then((instance) => {
  occt = instance
  adapter = createAdapter(occt)
  parentPort.on('message', async (message) => {
    const transfers = []
    try {
      const result = await applyOp(message.op)
      // Collect transferable mesh buffers.
      const collect = (mesh) => {
        if (mesh === undefined) return
        transfers.push(mesh.positions.buffer, mesh.indices.buffer, mesh.normals.buffer)
      }
      if (result.mesh !== undefined) collect(result.mesh)
      for (const mesh of result.meshes ?? []) collect(mesh)
      if (result.bytes !== undefined) transfers.push(result.bytes)
      parentPort.postMessage({ jobId: message.jobId, ok: true, result }, transfers)
    } catch (error) {
      parentPort.postMessage({
        jobId: message.jobId,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  })
  parentPort.postMessage({ jobId: 0, ok: true, result: { ready: true } })
}).catch((error) => {
  parentPort.postMessage({ jobId: 0, ok: false, error: `modeling kernel init failed: ${error.message}` })
})
