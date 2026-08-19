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

function applyOp(op) {
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
      nextBodyNumber = 1
      return { cleared: true }
    }
    default:
      throw new Error(`unknown op: ${op.kind}`)
  }
}

const initOpenCascade = loaderModule.default ?? loaderModule
initOpenCascade({ wasmBinary }).then((instance) => {
  occt = instance
  adapter = createAdapter(occt)
  parentPort.on('message', (message) => {
    const transfers = []
    try {
      const result = applyOp(message.op)
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
