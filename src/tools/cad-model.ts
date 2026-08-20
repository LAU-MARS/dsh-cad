/**
 * The native modeling tool family (phase 2). Every tool mutates the shared
 * workspace modeling document, then refreshes the same viewer card through a
 * stable viewId and a version-parameterized scene URL.
 *
 * Schema notes: every optional field syncScene may emit (`name`, `removed`,
 * `volume`, `filePath`, `sceneUrl`) is declared on every tool
 * (additionalProperties:false rejects undeclared keys), and execute returns
 * only defined keys (an explicit undefined fails the registry's
 * lossless-JSON validation).
 */
import { writeFile } from 'node:fs/promises'
import { defineTool } from '@deepseek-ai/dsh-tools'
import type { ToolDefinition } from '@deepseek-ai/dsh-tools'
import { runModelOp, workerResetEpoch } from '../modeling/client.js'
import type { ModelOp, OpResult, WorkerMesh } from '../modeling/client.js'
import { ModelDocument } from '../modeling/document.js'
import type { BinarySceneStore } from '../modeling/bin-store.js'
import type { BinMeshData } from '../modeling/bin-format.js'
import { resolveWorkspacePath } from './util.js'
import { toDcPrtDocument } from '../feature_script/dc_prt.js'

export interface ModelToolDeps {
  store: BinarySceneStore
  workspaceRoot: string
  ensureSceneRoute: () => string | null
}

/** Mirror a worker mesh with its raw typed arrays (binary-transport ready). */
function mirrorMesh(mesh: WorkerMesh, bodyId: string): BinMeshData {
  return {
    name: mesh.name === '' ? bodyId : mesh.name,
    positions: mesh.positions,
    normals: mesh.normals,
    indices: mesh.indices,
  }
}

/** Build the whole tool family over one document + worker + scene store. */
export function createModelTools(deps: ModelToolDeps): ToolDefinition[] {
  const document = new ModelDocument(deps.workspaceRoot)
  /** bodyId → raw worker mesh mirror (binary scene source, zero encoding). */
  const meshCache = new Map<string, BinMeshData>()
  /** Reset epoch after the last sync — out-of-band replays (cad_view on a
   *  .dcprt) bump the epoch and force a re-replay before the next op. */
  let syncedEpoch = -1

  async function restoreOnce(): Promise<void> {
    if (syncedEpoch === workerResetEpoch()) return
    await document.restore()
    if (document.doc.ops.length > 0) {
      await runModelOp({ kind: 'reset' })
      for (const op of document.doc.ops) {
        try {
          await runModelOp(op)
        } catch {
          // A single stale op must not block recovery; later ops may be independent.
        }
      }
      const all = await runModelOp({ kind: 'tessellate_all' })
      meshCache.clear()
      for (const mesh of all.meshes ?? []) {
        meshCache.set(mesh.bodyId, mirrorMesh(mesh, mesh.bodyId))
      }
    }
    syncedEpoch = workerResetEpoch()
  }

  async function syncScene(op: ModelOp, result: OpResult, filePath?: string): Promise<Record<string, unknown>> {
    if (result.mesh !== undefined && result.bodyId !== undefined) {
      meshCache.set(result.bodyId, mirrorMesh(result.mesh, result.bodyId))
    }
    for (const mesh of result.meshes ?? []) {
      meshCache.set(mesh.bodyId, mirrorMesh(mesh, mesh.bodyId))
    }
    const removed = [...(result.removed ?? []), ...(result.deleted !== undefined ? [result.deleted] : [])]
    for (const id of removed) meshCache.delete(id)

    const nameEntry = result.bodyId !== undefined && result.name !== undefined ? { bodyId: result.bodyId, name: result.name } : null
    await document.record(op, nameEntry)

    const meshes = [...meshCache.values()]
    const triangles = meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0)
    const sceneUrlBase = deps.ensureSceneRoute()
    if (meshes.length > 0) {
      // Direct worker→three.js transport: packed binary, in-memory, no file
      // write per step (a debounced disk mirror keeps restart replay).
      await deps.store.publish(document.doc.docId, meshes)
    }
    const value: Record<string, unknown> = {
      triangles,
      bodies: meshes.length,
      version: document.doc.version,
    }
    if (result.bodyId !== undefined) value.bodyId = result.bodyId
    if (result.name !== undefined) value.name = result.name
    if (removed.length > 0) value.removed = removed
    if (result.volume !== undefined) value.volume = result.volume
    if (filePath !== undefined) value.filePath = filePath
    if (sceneUrlBase !== null) {
      value.sceneUrl = `${sceneUrlBase.replace('/scene', '/bin')}/${document.doc.docId}?v=${document.doc.version}`
    }
    return value
  }

  const nextBodyId = (): string => `b${document.doc.version + 1}`

  // The model-facing render text: bodyId visibility is the load-bearing part.
  const renderModel = (value: Record<string, unknown>): string => {
    const lines = [
      value.bodyId !== undefined
        ? `${String(value.name ?? value.bodyId)} → ${String(value.bodyId)} (version ${String(value.version)}, document: ${String(value.bodies)} bodies, ${String(value.triangles)} triangles)`
        : `document: ${String(value.bodies)} bodies, ${String(value.triangles)} triangles (version ${String(value.version)})`,
    ]
    if (Array.isArray(value.removed) && value.removed.length > 0) lines.push(`consumed bodies: ${(value.removed as string[]).join(', ')}`)
    if (value.volume !== undefined) lines.push(`volume: ${Number(value.volume).toFixed(2)} mm³`)
    if (value.filePath !== undefined) lines.push(`written: ${String(value.filePath)}`)
    return lines.join('\n')
  }

  const metaOf = (value: Record<string, unknown>) => ({
    viewId: document.doc.docId,
    kind: '3d' as const,
    format: 'model',
    file: 'modeling document',
    ...(value.sceneUrl === undefined ? {} : { sceneUrl: String(value.sceneUrl) }),
    title: `CAD model · ${String(value.bodies)} ${value.bodies === 1 ? 'body' : 'bodies'}`,
    stats: {
      meshes: Number(value.bodies),
      triangles: Number(value.triangles),
    },
  })

  const numberParam = (description: string) => ({ type: 'number' as const, description })
  const pointParam = (description: string) => ({ type: 'array' as const, items: { type: 'number' as const }, description })
  const bodyTarget = { type: 'string' as const, required: true as const, description: 'BodyId to operate on.' }
  /** Optional fields every tool's schema declares (syncScene emits any subset). */
  const commonOptional = {
    name: { type: 'string' as const, description: 'Body display name.' },
    removed: { type: 'array' as const, items: { type: 'string' as const }, description: 'Bodies consumed by a boolean.' },
    volume: { type: 'number' as const, description: 'Body volume in mm³.' },
    filePath: { type: 'string' as const, description: 'Written file path (cad_export).' },
    sceneUrl: { type: 'string' as const, description: 'Versioned viewer URL (web compositions).' },
  }
  const requiredCounts = {
    triangles: { type: 'number' as const, required: true as const, description: 'Document triangle count.' },
    bodies: { type: 'number' as const, required: true as const, description: 'Bodies in the document.' },
    version: { type: 'number' as const, required: true as const, description: 'Document version (increments per op).' },
  }

  const cadCreatePrim = defineTool({
    name: 'cad_create_prim',
    description:
      'Create a parametric primitive in the shared modeling document (mm, Z-up). Kinds: box (dx,dy,dz), cylinder (radius,height), sphere (radius), cone (radius1,radius2,height), torus (majorRadius,minorRadius). ' +
      '`at` places the origin; `axis` orients cylinder/cone/torus (default +Z). Returns the bodyId other CAD tools reference. The viewer card updates after every call.',
    parameters: {
      kind: { type: 'string', required: true, enum: ['box', 'cylinder', 'sphere', 'cone', 'torus'] as const, description: 'Primitive kind.' },
      dx: numberParam('box: size X (mm).'),
      dy: numberParam('box: size Y (mm).'),
      dz: numberParam('box: size Z (mm).'),
      radius: numberParam('cylinder/sphere: radius (mm).'),
      radius1: numberParam('cone: base radius (mm).'),
      radius2: numberParam('cone: top radius (mm, 0 = pointed).'),
      height: numberParam('cylinder/cone: height (mm).'),
      majorRadius: numberParam('torus: center radius (mm).'),
      minorRadius: numberParam('torus: tube radius (mm).'),
      at: pointParam('origin [x,y,z] (mm).'),
      axis: pointParam('axis direction [x,y,z] for cylinder/cone/torus.'),
      name: { type: 'string', description: 'Optional display name.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          bodyId: { type: 'string', required: true, description: 'Stable body reference.' },
          ...requiredCounts,
          ...commonOptional,
        },
      },
      render: (_args, value) => [{ type: 'text', text: renderModel(value as unknown as Record<string, unknown>) }],
      presentationMeta: (_args, value) => metaOf(value as unknown as Record<string, unknown>),
    },
    isConcurrencySafe: () => false,
    async execute(args) {
      await restoreOnce()
      const bodyId = nextBodyId()
      const params = args as unknown as Record<string, unknown>
      const op: ModelOp = { kind: 'create_prim', bodyId, prim: args.kind, params, name: args.name }
      const result = await runModelOp(op)
      return syncScene(op, result) as never
    },
    presentCall: (args) => ({ card: 'generic', title: `CAD create ${String(args.kind)}`, kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD create' }),
  }) as unknown as ToolDefinition

  const cadExtrude = defineTool({
    name: 'cad_extrude_profile',
    description:
      'Create a solid by extruding a closed polygon profile in the XY plane along +Z (mm). `points` is a flat [x0,y0, x1,y1, …] loop (≥3 points, auto-closed). Use cad_boolean with cylinders for holes.',
    parameters: {
      points: { type: 'array', required: true, items: { type: 'number' }, description: 'Flat [x0,y0,x1,y1,…] loop (mm).' },
      height: { type: 'number', description: 'Extrusion height (mm, default 10).' },
      base: { type: 'number', description: 'Z of the profile plane (mm, default 0).' },
      name: { type: 'string', description: 'Optional display name.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          bodyId: { type: 'string', required: true },
          ...requiredCounts,
          ...commonOptional,
        },
      },
      render: (_args, value) => [{ type: 'text', text: renderModel(value as unknown as Record<string, unknown>) }],
      presentationMeta: (_args, value) => metaOf(value as unknown as Record<string, unknown>),
    },
    isConcurrencySafe: () => false,
    async execute(args) {
      await restoreOnce()
      if (args.points.length < 6 || args.points.length % 2 !== 0) {
        throw new Error('points must be a flat array of ≥3 [x,y] pairs (≥6 numbers)')
      }
      const bodyId = nextBodyId()
      const op: ModelOp = { kind: 'extrude_profile', bodyId, points: args.points, height: args.height, base: args.base, name: args.name }
      const result = await runModelOp(op)
      return syncScene(op, result) as never
    },
    presentCall: () => ({ card: 'generic', title: 'CAD extrude profile', kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD extrude' }),
  }) as unknown as ToolDefinition

  const cadBoolean = defineTool({
    name: 'cad_boolean',
    description:
      'Boolean-combine bodies: fuse (union), cut (subtract tools from target), common (intersection). Consumed tool bodies are removed; the result keeps the target bodyId. Classic pattern for holes: cut a cylinder from a plate.',
    parameters: {
      op: { type: 'string', required: true, enum: ['fuse', 'cut', 'common'] as const, description: 'Boolean operation.' },
      target: { type: 'string', required: true, description: 'BodyId kept as the result.' },
      tools: { type: 'array', required: true, items: { type: 'string' }, description: 'BodyIds combined into the target.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          bodyId: { type: 'string', required: true },
          ...requiredCounts,
          ...commonOptional,
        },
      },
      render: (_args, value) => [{ type: 'text', text: renderModel(value as unknown as Record<string, unknown>) }],
      presentationMeta: (_args, value) => metaOf(value as unknown as Record<string, unknown>),
    },
    isConcurrencySafe: () => false,
    async execute(args) {
      await restoreOnce()
      const op: ModelOp = { kind: 'boolean', op: args.op, target: args.target, tools: args.tools }
      const result = await runModelOp(op)
      return syncScene(op, result) as never
    },
    presentCall: (args) => ({ card: 'generic', title: `CAD ${String(args.op)} ${String(args.target)}`, kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD boolean' }),
  }) as unknown as ToolDefinition

  const cadFillet = defineTool({
    name: 'cad_fillet',
    description: 'Round every sharp edge of a body with one radius (mm). Fails when the radius exceeds the adjacent faces.',
    parameters: {
      target: bodyTarget,
      radius: { type: 'number', required: true, description: 'Fillet radius (mm).' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          bodyId: { type: 'string', required: true },
          ...requiredCounts,
          ...commonOptional,
        },
      },
      render: (_args, value) => [{ type: 'text', text: renderModel(value as unknown as Record<string, unknown>) }],
      presentationMeta: (_args, value) => metaOf(value as unknown as Record<string, unknown>),
    },
    isConcurrencySafe: () => false,
    async execute(args) {
      await restoreOnce()
      const op: ModelOp = { kind: 'fillet', target: args.target, radius: args.radius }
      const result = await runModelOp(op)
      return syncScene(op, result) as never
    },
    presentCall: (args) => ({ card: 'generic', title: `CAD fillet ${String(args.target)}`, kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD fillet' }),
  }) as unknown as ToolDefinition

  const cadTransform = defineTool({
    name: 'cad_transform',
    description:
      'Move/rotate/mirror a body (mm, degrees, Z-up). Applies in order: translate → rotate (XYZ Euler degrees) → mirror (plane through the origin by normal).',
    parameters: {
      target: bodyTarget,
      translate: pointParam('translation [x,y,z] (mm).'),
      rotate: pointParam('rotation [rx,ry,rz] (degrees, XYZ Euler).'),
      mirror: pointParam('mirror plane normal [x,y,z] through the origin.'),
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          bodyId: { type: 'string', required: true },
          ...requiredCounts,
          ...commonOptional,
        },
      },
      render: (_args, value) => [{ type: 'text', text: renderModel(value as unknown as Record<string, unknown>) }],
      presentationMeta: (_args, value) => metaOf(value as unknown as Record<string, unknown>),
    },
    isConcurrencySafe: () => false,
    async execute(args) {
      await restoreOnce()
      const op: ModelOp = {
        kind: 'transform',
        target: args.target,
        translate: args.translate as [number, number, number] | undefined,
        rotate: args.rotate as [number, number, number] | undefined,
        mirror: args.mirror as [number, number, number] | undefined,
      }
      const result = await runModelOp(op)
      return syncScene(op, result) as never
    },
    presentCall: (args) => ({ card: 'generic', title: `CAD transform ${String(args.target)}`, kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD transform' }),
  }) as unknown as ToolDefinition

  const cadExport = defineTool({
    name: 'cad_export',
    description:
      'Export to a workspace path (extension selects format): .step (parametric body), .stl (mesh body), or .dcprt (the native part document — the whole replayable feature history, openable with cad_view).',
    parameters: {
      target: { type: 'string', description: 'BodyId to export (required for .step/.stl; unused for .dcprt).' },
      path: { type: 'string', required: true, description: 'Destination file path (extension selects format).' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          ...requiredCounts,
          ...commonOptional,
          filePath: { type: 'string', required: true, description: 'Written file path.' },
        },
      },
      render: (_args, value) => [{ type: 'text', text: renderModel(value as unknown as Record<string, unknown>) }],
      presentationMeta: (_args, value) => metaOf(value as unknown as Record<string, unknown>),
    },
    isConcurrencySafe: () => true,
    async execute(args) {
      await restoreOnce()
      const resolved = resolveWorkspacePath(args.path, deps.workspaceRoot)

      // .dcprt serializes the whole document on the main thread — no worker
      // op (that path exports one body's geometry), no entry in the log.
      if (args.path.toLowerCase().endsWith('.dcprt')) {
        if (document.doc.ops.length === 0) throw new Error('nothing to export — the modeling document is empty')
        await writeFile(resolved, JSON.stringify(toDcPrtDocument(document.doc)))
        const meshes = [...meshCache.values()]
        const value: Record<string, unknown> = {
          triangles: meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0),
          bodies: meshes.length,
          version: document.doc.version,
          filePath: resolved,
        }
        const sceneUrlBase = deps.ensureSceneRoute()
        if (sceneUrlBase !== null) {
          value.sceneUrl = `${sceneUrlBase.replace('/scene', '/bin')}/${document.doc.docId}?v=${document.doc.version}`
        }
        return value as never
      }

      if (args.target === undefined) throw new Error('target is required for .step/.stl exports')
      const format = args.path.toLowerCase().endsWith('.stl') ? 'stl' : 'step'
      const op: ModelOp = { kind: 'export', target: args.target, format }
      const result = await runModelOp(op)
      if (result.bytes === undefined) throw new Error('export produced no data')
      await writeFile(resolved, Buffer.from(result.bytes))
      return syncScene(op, result, resolved) as never
    },
    presentCall: (args) => ({ card: 'generic', title: `CAD export ${String(args.path)}`, kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD export' }),
  }) as unknown as ToolDefinition

  const cadDelete = defineTool({
    name: 'cad_delete',
    description: 'Delete a body from the modeling document.',
    parameters: {
      target: bodyTarget,
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          ...requiredCounts,
          ...commonOptional,
        },
      },
      render: (_args, value) => [{ type: 'text', text: renderModel(value as unknown as Record<string, unknown>) }],
      presentationMeta: (_args, value) => metaOf(value as unknown as Record<string, unknown>),
    },
    isConcurrencySafe: () => false,
    async execute(args) {
      await restoreOnce()
      const op: ModelOp = { kind: 'delete', target: args.target }
      const result = await runModelOp(op)
      return syncScene(op, result) as never
    },
    presentCall: (args) => ({ card: 'generic', title: `CAD delete ${String(args.target)}`, kind: 'delete' }),
    presentResult: () => ({ card: 'generic', title: 'CAD delete' }),
  }) as unknown as ToolDefinition

  const cadVolume = defineTool({
    name: 'cad_volume',
    description: "Report a body's exact BRep volume in mm³.",
    parameters: {
      target: bodyTarget,
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          ...requiredCounts,
          ...commonOptional,
          volume: { type: 'number', required: true, description: 'Volume (mm³).' },
        },
      },
      render: (_args, value) => [{ type: 'text', text: renderModel(value as unknown as Record<string, unknown>) }],
      presentationMeta: (_args, value) => metaOf(value as unknown as Record<string, unknown>),
    },
    isConcurrencySafe: () => true,
    async execute(args) {
      await restoreOnce()
      const op: ModelOp = { kind: 'volume', target: args.target }
      const result = await runModelOp(op)
      return syncScene(op, result) as never
    },
    presentCall: (args) => ({ card: 'generic', title: `CAD volume ${String(args.target)}`, kind: 'read' }),
    presentResult: () => ({ card: 'generic', title: 'CAD volume' }),
  }) as unknown as ToolDefinition

  return [
    cadCreatePrim,
    cadExtrude,
    cadBoolean,
    cadFillet,
    cadTransform,
    cadExport,
    cadDelete,
    cadVolume,
  ]
}

export const MODEL_TOOL_NAMES = [
  'cad_create_prim',
  'cad_extrude_profile',
  'cad_boolean',
  'cad_fillet',
  'cad_transform',
  'cad_export',
  'cad_delete',
  'cad_volume',
] as const
