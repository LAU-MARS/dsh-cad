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
import { randomUUID } from 'node:crypto'
import { writeFile } from 'node:fs/promises'
import { defineTool } from '@deepseek-ai/dsh-tools'
import type { ToolDefinition } from '@deepseek-ai/dsh-tools'
import { runModelOp, workerResetEpoch } from '../modeling/client.js'
import type { DrawingViewSpec, ModelOp, OpResult, WorkerMesh } from '../modeling/client.js'
import { ModelDocument } from '../modeling/document.js'
import type { BinarySceneStore } from '../modeling/bin-store.js'
import type { BinMeshData } from '../modeling/bin-format.js'
import { composeAssemblyMeshes } from '../modeling/assembly.js'
import { buildDrawingSheet, drawingToDxf, drawingToSvg } from '../modeling/drawing.js'
import type { DrawingSheet } from '../modeling/drawing.js'
import type { SceneStore } from '../store.js'
import { resolveWorkspacePath } from './util.js'
import { toDcPrtDocument } from '../feature_script/dc_prt.js'

export interface ModelToolDeps {
  store: BinarySceneStore
  /** JSON scene store (drawing sheets). */
  sceneStore: SceneStore
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
  /** drawingId → rebuilt sheet (backing cad_export .svg/.dxf). */
  const drawingSheets = new Map<string, { sheet: DrawingSheet; partName: string }>()
  let lastDrawingId: string | null = null

  /**
   * Standard drawing views (GB first-angle): 主视图 front, 俯视图 top,
   * 左视图 left, 轴测 iso. Same constants as the worker's fallback.
   */
  const DRAWING_VIEWS: DrawingViewSpec[] = [
    { name: 'front', dir: [0, -1, 0], xDir: [1, 0, 0] },
    { name: 'top', dir: [0, 0, 1], xDir: [1, 0, 0] },
    { name: 'left', dir: [-1, 0, 0], xDir: [0, 1, 0] },
    { name: 'iso', dir: [1, -1, 1], xDir: [1, 1, 0] },
  ]

  /**
   * A second stable UUID derived from the document id (hex reversed + salted
   * version nibble): SceneStore's viewId regex demands UUID shape, while the
   * drawing scene must keep one stable viewId across re-draws/replays.
   */
  const siblingUuid = (salt: string): string => {
    const hex = document.doc.docId.replace(/-/g, '').split('').reverse().join('')
    const salted = (hex.slice(0, 12) + salt + hex.slice(13)).slice(0, 32)
    return `${salted.slice(0, 8)}-${salted.slice(8, 12)}-${salted.slice(12, 16)}-${salted.slice(16, 20)}-${salted.slice(20, 32)}`
  }

  async function restoreOnce(): Promise<void> {
    if (syncedEpoch === workerResetEpoch()) return
    await document.restore()
    if (document.doc.ops.length > 0) {
      await runModelOp({ kind: 'reset' })
      for (const op of document.doc.ops) {
        try {
          const result = await runModelOp(op)
          // A replayed drawing re-generates its sheet and re-publishes the
          // scene so the stable viewId keeps serving after restarts.
          if (op.kind === 'drawing' && op.sceneViewId !== undefined && result.views !== undefined) {
            const sheet = buildDrawingSheet({ partName: op.name ?? op.target, views: result.views, paper: op.paper })
            drawingSheets.set(op.sceneViewId, { sheet, partName: op.name ?? op.target })
            lastDrawingId = op.sceneViewId
            await deps.sceneStore.putAt(op.sceneViewId, {
              kind: '2d',
              format: 'drawing',
              entities: sheet.entities,
              bounds: sheet.bounds,
              layers: sheet.layers,
            })
          }
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
  const nextInstanceId = (): string => `a${document.doc.version + 1}`

  /**
   * Assembly sync: compose instance meshes from the body cache (pure
   * transform math), publish the packed assembly scene under the stable
   * `asm-<docId>` viewId, and record the op. Runs instead of syncScene —
   * body geometry is untouched by assembly ops.
   */
  async function syncAssembly(op: ModelOp, result: OpResult, filePath?: string): Promise<Record<string, unknown>> {
    const instances = result.instances ?? []
    const meshes = composeAssemblyMeshes(meshCache, instances)
    await document.record(op, null)
    const sceneUrlBase = deps.ensureSceneRoute()
    if (sceneUrlBase !== null) {
      // Publish even when empty — removing the last instance must refresh the tab.
      await deps.store.publish(`asm-${document.doc.docId}`, meshes)
    }
    const triangles = meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0)
    const value: Record<string, unknown> = {
      instances: instances.length,
      triangles,
      bodies: meshCache.size,
      version: document.doc.version,
      viewId: `asm-${document.doc.docId}`,
    }
    if (result.instanceId !== undefined) value.instanceId = result.instanceId
    if (filePath !== undefined) value.filePath = filePath
    if (sceneUrlBase !== null) {
      value.sceneUrl = `${sceneUrlBase.replace('/scene', '/bin')}/asm-${document.doc.docId}?v=${document.doc.version}`
    }
    return value
  }

  /** Build + publish the drawing sheet for a replayed/executed drawing op. */
  async function publishDrawing(
    sceneViewId: string,
    partName: string,
    views: OpResult['views'],
    paper: 'A4' | 'A3' | undefined,
  ): Promise<DrawingSheet> {
    const sheet = buildDrawingSheet({
      partName,
      views: views ?? [],
      paper,
      drawingNo: `DSH-${String(document.doc.version).padStart(3, '0')}`,
      date: new Date().toISOString().slice(0, 10),
    })
    drawingSheets.set(sceneViewId, { sheet, partName })
    lastDrawingId = sceneViewId
    await deps.sceneStore.putAt(sceneViewId, {
      kind: '2d',
      format: 'drawing',
      entities: sheet.entities,
      bounds: sheet.bounds,
      layers: sheet.layers,
    })
    return sheet
  }

  /** Most recently created surviving body (default drawing/export target). */
  const lastBodyId = (): string | undefined => {
    const keys = [...meshCache.keys()]
    return keys[keys.length - 1]
  }

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
    doc: 'part' as const,
    ...(value.sceneUrl === undefined ? {} : { sceneUrl: String(value.sceneUrl) }),
    title: `CAD model · ${String(value.bodies)} ${value.bodies === 1 ? 'body' : 'bodies'}`,
    stats: {
      meshes: Number(value.bodies),
      triangles: Number(value.triangles),
    },
  })

  /** Presentation meta for assembly ops (kind 3d, doc assembly). */
  const assemblyMetaOf = (value: Record<string, unknown>) => ({
    viewId: String(value.viewId),
    kind: '3d' as const,
    format: 'assembly',
    file: 'assembly',
    doc: 'assembly' as const,
    ...(value.sceneUrl === undefined ? {} : { sceneUrl: String(value.sceneUrl) }),
    title: `装配体 · ${String(value.instances)} 实例`,
    stats: {
      meshes: Number(value.instances),
      triangles: Number(value.triangles),
    },
  })

  /** Presentation meta for drawing ops (kind 2d, doc drawing). */
  const drawingMetaOf = (value: Record<string, unknown>) => ({
    viewId: String(value.drawingId),
    kind: '2d' as const,
    format: 'drawing',
    file: 'drawing',
    doc: 'drawing' as const,
    ...(value.sceneUrl === undefined ? {} : { sceneUrl: String(value.sceneUrl) }),
    title: `工程图 · ${String(value.name ?? value.target)}`,
    stats: {
      entities: Number(value.entities),
    },
  })

  const renderAssembly = (value: Record<string, unknown>): string => {
    const lines = [
      value.instanceId !== undefined
        ? `instance ${String(value.instanceId)} placed (assembly: ${String(value.instances)} instances, ${String(value.triangles)} triangles)`
        : `assembly: ${String(value.instances)} instances, ${String(value.triangles)} triangles`,
    ]
    if (value.filePath !== undefined) lines.push(`written: ${String(value.filePath)}`)
    return lines.join('\n')
  }

  const renderDrawing = (value: Record<string, unknown>): string => {
    const lines = [
      `工程图 ${String(value.target)}: 主视图/俯视图/左视图/轴测 · OCCT 真实消隐 · 比例 ${String(value.scaleText ?? '')} · ${String(value.entities)} 实体 (version ${String(value.version)})`,
    ]
    if (value.filePath !== undefined) lines.push(`written: ${String(value.filePath)}`)
    return lines.join('\n')
  }

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
  /** Schema shared by the assembly tool family. */
  const assemblySchema = {
    instances: { type: 'number' as const, required: true as const, description: 'Instances in the assembly.' },
    instanceId: { type: 'string' as const, description: 'Affected instance id.' },
    viewId: { type: 'string' as const, description: 'Stable assembly scene viewId.' },
    triangles: { type: 'number' as const, required: true as const, description: 'Assembly triangle count.' },
    bodies: { type: 'number' as const, required: true as const, description: 'Bodies in the document.' },
    version: { type: 'number' as const, required: true as const, description: 'Document version.' },
    filePath: { type: 'string' as const, description: 'Written file path (cad_export).' },
    sceneUrl: { type: 'string' as const, description: 'Versioned assembly scene URL (web compositions).' },
  }
  /** Schema for the drawing tool output. */
  const drawingSchema = {
    target: { type: 'string' as const, required: true as const, description: 'Drawn bodyId.' },
    name: { type: 'string' as const, description: 'Drawing/part display name.' },
    drawingId: { type: 'string' as const, description: 'Stable drawing scene viewId.' },
    entities: { type: 'number' as const, required: true as const, description: 'Sheet entity count.' },
    scale: { type: 'number' as const, required: true as const, description: 'Standard-view scale (1 = full size).' },
    scaleText: { type: 'string' as const, description: 'Scale as titled text (1:2 / 2:1).' },
    bodies: { type: 'number' as const, required: true as const, description: 'Bodies in the document.' },
    triangles: { type: 'number' as const, required: true as const, description: 'Document triangle count.' },
    version: { type: 'number' as const, required: true as const, description: 'Document version.' },
    filePath: { type: 'string' as const, description: 'Written file path (cad_export).' },
    sceneUrl: { type: 'string' as const, description: 'Versioned drawing scene URL (web compositions).' },
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
      'Export to a workspace path (extension selects format): .step / .stl of a body, or .dcprt (the native replayable part document). ' +
      'target "assembly" exports the whole assembly (STEP assembly of transformed instances). ' +
      'target "drawing" exports the latest drawing sheet (.svg vector / .dxf exchange).',
    parameters: {
      target: { type: 'string', description: 'BodyId; "assembly" for the whole assembly; "drawing" for the latest sheet (required for .step/.stl; unused for .dcprt).' },
      path: { type: 'string', required: true, description: 'Destination file path (extension selects format).' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          ...requiredCounts,
          ...commonOptional,
          instances: { type: 'number', description: 'Assembly instance count (assembly export).' },
          viewId: { type: 'string', description: 'Assembly scene viewId (assembly export).' },
          target: { type: 'string', description: 'Exported target: bodyId, "assembly", or "drawing".' },
          drawingId: { type: 'string', description: 'Drawing scene viewId (drawing export).' },
          entities: { type: 'number', description: 'Sheet entity count (drawing export).' },
          scale: { type: 'number', description: 'Standard-view scale (drawing export).' },
          scaleText: { type: 'string', description: 'Scale as titled text (drawing export).' },
          filePath: { type: 'string', required: true, description: 'Written file path.' },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: (value as unknown as Record<string, unknown>).viewId !== undefined && String((value as unknown as Record<string, unknown>).viewId).startsWith('asm-')
          ? renderAssembly(value as unknown as Record<string, unknown>)
          : renderModel(value as unknown as Record<string, unknown>),
      }],
      presentationMeta: (_args, value) => {
        const record = value as unknown as Record<string, unknown>
        if (typeof record.viewId === 'string' && record.viewId.startsWith('asm-')) return assemblyMetaOf(record)
        return metaOf(record)
      },
    },
    isConcurrencySafe: () => true,
    async execute(args) {
      await restoreOnce()
      const resolved = resolveWorkspacePath(args.path, deps.workspaceRoot)
      const lower = args.path.toLowerCase()

      // Assembly export: compound of transformed instances via the worker.
      if (args.target === 'assembly') {
        const format = lower.endsWith('.stl') ? 'stl' : 'step'
        const op: ModelOp = { kind: 'export_assembly', format }
        const result = await runModelOp(op)
        if (result.bytes === undefined) throw new Error('assembly export produced no data')
        await writeFile(resolved, Buffer.from(result.bytes))
        return syncAssembly(op, result, resolved) as never
      }

      // Drawing export: serialize the latest rebuilt sheet — no op recorded
      // (pure export, same convention as .dcprt).
      if (args.target === 'drawing') {
        if (lastDrawingId === null) throw new Error('no drawing yet — call cad_drawing first')
        const entry = drawingSheets.get(lastDrawingId)
        if (entry === undefined) throw new Error('drawing sheet is unavailable')
        if (lower.endsWith('.dxf')) await writeFile(resolved, drawingToDxf(entry.sheet), 'utf8')
        else if (lower.endsWith('.svg')) await writeFile(resolved, drawingToSvg(entry.sheet), 'utf8')
        else throw new Error('drawing export supports .svg and .dxf paths')
        const meshes = [...meshCache.values()]
        const sceneUrlBase = deps.ensureSceneRoute()
        const value: Record<string, unknown> = {
          target: 'drawing',
          name: entry.partName,
          drawingId: lastDrawingId,
          entities: entry.sheet.entityCount,
          scale: entry.sheet.scale,
          scaleText: entry.sheet.scale >= 1 ? `${entry.sheet.scale}:1` : `1:${Math.round(1 / entry.sheet.scale * 100) / 100}`,
          bodies: meshes.length,
          triangles: meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0),
          version: document.doc.version,
          filePath: resolved,
        }
        if (sceneUrlBase !== null) value.sceneUrl = `/dsh-cad/scene/${lastDrawingId}?v=${document.doc.version}`
        return value as never
      }

      // .dcprt serializes the whole document on the main thread — no worker
      // op (that path exports one body's geometry), no entry in the log.
      if (lower.endsWith('.dcprt')) {
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
      const format = lower.endsWith('.stl') ? 'stl' : 'step'
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

  const cadDrawing = defineTool({
    name: 'cad_drawing',
    description:
      'Generate an engineering drawing (工程图) of a body: GB first-angle 主视图/俯视图/左视图 plus an isometric view on an A4/A3 sheet — ' +
      'hidden lines dashed, frame, title block, overall dimensions, standard scale. Renders in the Drawing tab and exports via cad_export target "drawing" (.svg/.dxf).',
    parameters: {
      target: { type: 'string', description: 'BodyId to draw (default: the most recently created surviving body).' },
      paper: { type: 'string', enum: ['A4', 'A3'] as const, description: 'Sheet size (default A4 landscape).' },
      name: { type: 'string', description: 'Part display name for the title block.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: drawingSchema,
      },
      render: (_args, value) => [{ type: 'text', text: renderDrawing(value as unknown as Record<string, unknown>) }],
      presentationMeta: (_args, value) => drawingMetaOf(value as unknown as Record<string, unknown>),
    },
    isConcurrencySafe: () => false,
    async execute(args) {
      await restoreOnce()
      const target = args.target ?? lastBodyId()
      if (target === undefined) throw new Error('nothing to draw — create a body first')
      if (!meshCache.has(target)) throw new Error(`unknown body: ${target}`)
      const partName = args.name ?? document.doc.bodyNames[target] ?? target
      const paper = args.paper === 'A3' ? 'A3' : 'A4'
      const sceneViewId = siblingUuid('d')
      const op: ModelOp = { kind: 'drawing', target, views: DRAWING_VIEWS, sceneViewId, name: partName, paper }
      const result = await runModelOp(op)
      const sheet = await publishDrawing(sceneViewId, partName, result.views, paper)
      const meshes = [...meshCache.values()]
      const sceneUrlBase = deps.ensureSceneRoute()
      const value: Record<string, unknown> = {
        target,
        name: partName,
        drawingId: sceneViewId,
        entities: sheet.entityCount,
        scale: sheet.scale,
        scaleText: sheet.scale >= 1 ? `${sheet.scale}:1` : `1:${Math.round(1 / sheet.scale * 100) / 100}`,
        bodies: meshes.length,
        triangles: meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0),
        version: document.doc.version,
      }
      if (sceneUrlBase !== null) value.sceneUrl = `/dsh-cad/scene/${sceneViewId}?v=${document.doc.version}`
      return value as never
    },
    presentCall: (args) => ({ card: 'generic', title: `工程图 ${String(args.target ?? '')}`.trim(), kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: '工程图' }),
  }) as unknown as ToolDefinition

  const cadAssemblyInsert = defineTool({
    name: 'cad_assembly_insert',
    description:
      'Insert a body into the assembly as a placed instance (mm, degrees, Z-up). `at` positions the instance origin; `rotate` orients it (XYZ Euler). ' +
      'Bodies stay untouched in the Part Studio; the Assembly tab renders every instance. Instances persist in the document op log.',
    parameters: {
      bodyId: { type: 'string', required: true, description: 'BodyId to insert.' },
      at: pointParam('instance position [x,y,z] (mm).'),
      rotate: pointParam('instance rotation [rx,ry,rz] (degrees, XYZ Euler).'),
      name: { type: 'string', description: 'Instance display name (defaults to the body name).' },
    },
    output: {
      schema: { type: 'object', additionalProperties: false, properties: assemblySchema },
      render: (_args, value) => [{ type: 'text', text: renderAssembly(value as unknown as Record<string, unknown>) }],
      presentationMeta: (_args, value) => assemblyMetaOf(value as unknown as Record<string, unknown>),
    },
    isConcurrencySafe: () => false,
    async execute(args) {
      await restoreOnce()
      if (!meshCache.has(args.bodyId)) throw new Error(`unknown body: ${args.bodyId}`)
      const instanceId = nextInstanceId()
      const op: ModelOp = {
        kind: 'assembly_insert',
        instanceId,
        bodyId: args.bodyId,
        name: args.name ?? document.doc.bodyNames[args.bodyId] ?? args.bodyId,
        translate: args.at as [number, number, number] | undefined,
        rotate: args.rotate as [number, number, number] | undefined,
      }
      const result = await runModelOp(op)
      return syncAssembly(op, result) as never
    },
    presentCall: (args) => ({ card: 'generic', title: `装配 ${String(args.bodyId)}`, kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: '装配插入' }),
  }) as unknown as ToolDefinition

  const cadAssemblyMove = defineTool({
    name: 'cad_assembly_move',
    description:
      'Set an assembly instance placement (absolute, not incremental): `at` sets the position, `rotate` the orientation (mm, degrees).',
    parameters: {
      instanceId: { type: 'string', required: true, description: 'InstanceId to move.' },
      at: pointParam('new position [x,y,z] (mm).'),
      rotate: pointParam('new rotation [rx,ry,rz] (degrees, XYZ Euler).'),
    },
    output: {
      schema: { type: 'object', additionalProperties: false, properties: assemblySchema },
      render: (_args, value) => [{ type: 'text', text: renderAssembly(value as unknown as Record<string, unknown>) }],
      presentationMeta: (_args, value) => assemblyMetaOf(value as unknown as Record<string, unknown>),
    },
    isConcurrencySafe: () => false,
    async execute(args) {
      await restoreOnce()
      const op: ModelOp = {
        kind: 'assembly_transform',
        instanceId: args.instanceId,
        translate: args.at as [number, number, number] | undefined,
        rotate: args.rotate as [number, number, number] | undefined,
      }
      const result = await runModelOp(op)
      return syncAssembly(op, result) as never
    },
    presentCall: (args) => ({ card: 'generic', title: `移动 ${String(args.instanceId)}`, kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: '装配移动' }),
  }) as unknown as ToolDefinition

  const cadAssemblyRemove = defineTool({
    name: 'cad_assembly_remove',
    description: 'Remove an instance from the assembly (the body itself stays in the Part Studio).',
    parameters: {
      instanceId: { type: 'string', required: true, description: 'InstanceId to remove.' },
    },
    output: {
      schema: { type: 'object', additionalProperties: false, properties: assemblySchema },
      render: (_args, value) => [{ type: 'text', text: renderAssembly(value as unknown as Record<string, unknown>) }],
      presentationMeta: (_args, value) => assemblyMetaOf(value as unknown as Record<string, unknown>),
    },
    isConcurrencySafe: () => false,
    async execute(args) {
      await restoreOnce()
      const op: ModelOp = { kind: 'assembly_remove', instanceId: args.instanceId }
      const result = await runModelOp(op)
      return syncAssembly(op, result) as never
    },
    presentCall: (args) => ({ card: 'generic', title: `移除 ${String(args.instanceId)}`, kind: 'delete' }),
    presentResult: () => ({ card: 'generic', title: '装配移除' }),
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
    cadDrawing,
    cadAssemblyInsert,
    cadAssemblyMove,
    cadAssemblyRemove,
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
  'cad_drawing',
  'cad_assembly_insert',
  'cad_assembly_move',
  'cad_assembly_remove',
] as const
