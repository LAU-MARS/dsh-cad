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
import { DocumentRegistry } from '../modeling/registry.js'
import type { BinarySceneStore } from '../modeling/bin-store.js'
import type { BinMeshData } from '../modeling/bin-format.js'
import { composeAssemblyMeshes } from '../modeling/assembly.js'
import { buildDrawingSheet, drawingToDxf, drawingToSvg } from '../modeling/drawing.js'
import type { DrawingSheet } from '../modeling/drawing.js'
import type { SceneStore } from '../store.js'
import { resolveWorkspacePath } from './util.js'
import { toDcPrtDocument } from '../feature_script/dc_prt.js'
import { createConstraintTools } from './cad-constraint.js'
import type { ConstraintModel } from '../modeling/constraints.js'

export interface ModelToolDeps {
  store: BinarySceneStore
  /** JSON scene store (drawing sheets). */
  sceneStore: SceneStore
  workspaceRoot: string
  ensureSceneRoute: () => string | null
  /** The workspace document registry (file space + session bindings). */
  registry: DocumentRegistry
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

/** Build the whole tool family over the document registry + worker + stores. */
export function createModelTools(deps: ModelToolDeps): ToolDefinition[] {
  // The active document and its derived caches are swapped as a unit whenever
  // a session's binding points elsewhere (see resolveDoc). meshCache /
  // drawingSheets are cleared and rebuilt by replay.
  let document = new ModelDocument(deps.workspaceRoot)
  /** bodyId → raw worker mesh mirror (binary scene source, zero encoding). */
  const meshCache = new Map<string, BinMeshData>()
  /** Reset epoch after the last sync — out-of-band replays (cad_view on a
   *  .dcprt) bump the epoch and force a re-replay before the next op. */
  let syncedEpoch = -1
  /** drawingId → rebuilt sheet (backing cad_export .svg/.dxf). */
  let drawingSheets = new Map<string, { sheet: DrawingSheet; partName: string }>()
  let lastDrawingId: string | null = null
  /** Live constraint-model state (rebuilt from the op log on replay). */
  const constraintState: { model: ConstraintModel | null; lastSuggestions: string[] } = { model: null, lastSuggestions: [] }

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

  /**
   * Replay a document's ops into the worker and rebuild the derived caches
   * (mesh mirror, drawing sheets, constraint model). The worker is always
   * reset first — also for empty documents, so a previous document's shapes
   * never leak in. Absorbs the old restoreOnce body.
   */
  async function replayActiveDoc(): Promise<void> {
    await runModelOp({ kind: 'reset' })
    // Derived state belongs to the outgoing document: clear before replay so
    // a document without constraints/drawings never inherits the previous one's.
    constraintState.model = null
    for (const op of document.doc.ops) {
      try {
        const result = await runModelOp(op)
        // A replayed constraint model returns to live state.
        if (op.kind === 'constraints') {
          constraintState.model = op.model as unknown as ConstraintModel
        }
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
    if (document.doc.ops.length > 0) {
      const all = await runModelOp({ kind: 'tessellate_all' })
      meshCache.clear()
      for (const mesh of all.meshes ?? []) {
        meshCache.set(mesh.bodyId, mirrorMesh(mesh, mesh.bodyId))
      }
    }
    syncedEpoch = workerResetEpoch()
  }

  /** Swap the active document: restore from disk, reset the worker, replay. */
  async function activateDocument(next: ModelDocument): Promise<void> {
    await next.restore()
    document = next
    meshCache.clear()
    drawingSheets = new Map()
    lastDrawingId = null
    await replayActiveDoc()
  }

  /** Session key from the tool run context (`_default` outside a session). */
  const sessionKeyOf = (exec: unknown): string => {
    const agent = (exec as { agent?: { id?: unknown } | null } | undefined)?.agent
    return typeof agent?.id === 'string' && agent.id !== '' ? agent.id : '_default'
  }

  /**
   * Per-op entry point (replaces restoreOnce): resolve the calling session's
   * active document, switching documents (reset + replay) when its binding
   * points elsewhere, then re-sync when the worker was reset out of band.
   */
  async function resolveDoc(exec: unknown): Promise<void> {
    const sessionId = sessionKeyOf(exec)
    const bound = await deps.registry.bindingOf(sessionId)
    if (bound === null) {
      // Upgrade continuity: the first unbound session inherits the migrated
      // legacy document (if any) instead of starting from scratch.
      const legacy = await deps.registry.claimLegacyFor(sessionId)
      if (legacy !== null) {
        const doc = await deps.registry.open(legacy)
        if (doc !== null) {
          await activateDocument(doc)
          return
        }
      }
      // Unbound session (new conversation): start on a fresh empty document.
      const fresh = await deps.registry.create()
      await deps.registry.bind(sessionId, fresh.doc.docId)
      await activateDocument(fresh)
      return
    }
    if (bound !== document.doc.docId) {
      const next = await deps.registry.open(bound)
      if (next === null) {
        // Manifest entry without a document file — recover with a fresh doc.
        const fresh = await deps.registry.create()
        await deps.registry.bind(sessionId, fresh.doc.docId)
        await activateDocument(fresh)
        return
      }
      await activateDocument(next)
      return
    }
    if (syncedEpoch !== workerResetEpoch()) {
      await document.restore()
      await replayActiveDoc()
    }
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
    await deps.registry.touch(document.doc.docId, { opCount: document.doc.version, bodyCount: meshCache.size })

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
    await deps.registry.touch(document.doc.docId, { opCount: document.doc.version, bodyCount: meshCache.size })
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
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
      'Create a solid by extruding a closed profile in the XY plane along +Z (mm). `profile` accepts CURVE SEGMENTS — {start: [x,y], segments: [{type: "line"|"arc"|"bspline", …}]} (arc: to/center/ccw; bspline: through-points, sampled smooth curve) — or {circle: {center, radius}} for a round profile. ' +
      'The legacy flat `points` polygon loop (≥3 points, auto-closed) still works. Use cad_boolean for holes.',
    parameters: {
      points: { type: 'array', items: { type: 'number' }, description: 'Legacy flat [x0,y0,x1,y1,…] polygon loop (mm).' },
      profile: { type: 'json', description: 'Curve-segment profile: {start:[x,y], segments:[…]} or {circle:{center:[x,y], radius}}.' },
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
      if (args.profile === undefined && (args.points === undefined || args.points.length < 6 || args.points.length % 2 !== 0)) {
        throw new Error('provide a curve-segment `profile` object or a flat points array of ≥3 [x,y] pairs')
      }
      const bodyId = nextBodyId()
      const op: ModelOp = { kind: 'extrude_profile', bodyId, ...(args.profile !== undefined ? { profile: args.profile } : { points: args.points }), height: args.height, base: args.base, name: args.name }
      const result = await runModelOp(op)
      return syncScene(op, result) as never
    },
    presentCall: () => ({ card: 'generic', title: 'CAD extrude profile', kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD extrude' }),
  }) as unknown as ToolDefinition

  const cadLoft = defineTool({
    name: 'cad_loft',
    description:
      'Loft (放样): skin a solid through successive closed sections. `sections` is a list of ≥2 loops, each a flat [x0,y0,z0, x1,y1,z1, …] triplet list in its own plane (≥3 points, auto-closed), ordered along the loft. ' +
      'Sections may differ in shape and point count (e.g. a square lofted to a hexagon). `ruled` keeps the sides straight instead of smoothing. ' +
      'Each result passes a BRepCheck validity gate: a self-intersecting or degenerate loft is rejected with a clear message instead of storing an unusable body.',
    parameters: {
      sections: {
        type: 'array',
        required: true,
        description: 'Ordered sections, each a flat [x,y,z,…] loop (≥9 numbers).',
        items: { type: 'array', items: { type: 'number' }, description: 'One closed section loop.' },
      },
      ruled: { type: 'boolean', description: 'Straight (ruled) sides instead of a smoothed surface (default false).' },
      solid: { type: 'boolean', description: 'Cap the ends into a solid (default true).' },
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
      if (!Array.isArray(args.sections) || args.sections.length < 2) throw new Error('sections must list at least 2 closed loops')
      const bodyId = nextBodyId()
      const op: ModelOp = { kind: 'loft', bodyId, sections: args.sections, solid: args.solid, ruled: args.ruled, name: args.name }
      const result = await runModelOp(op)
      return syncScene(op, result) as never
    },
    presentCall: () => ({ card: 'generic', title: 'CAD loft', kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD loft' }),
  }) as unknown as ToolDefinition

  const cadSweep = defineTool({
    name: 'cad_sweep',
    description:
      'Sweep (扫掠): pipe a closed 2D profile along a 3D path. `profile` is a flat [x0,y0, x1,y1, …] outline (≥3 points, auto-closed) placed in the plane PERPENDICULAR TO THE PATH\'S START TANGENT, so the outline\'s 2D axes map onto that plane — no manual orientation needed. ' +
      '`path` is a flat [x0,y0,z0, …] polyline. Straight, collinear and gently curved paths give exact solids; a SHARP direction change with a section large relative to the corner self-intersects — such a result is REJECTED by the BRepCheck validity gate (the error names the cause), so round or chamfer the corners in the path.',
    parameters: {
      profile: { type: 'json', required: true, description: 'Closed outline on the start plane: flat [x,y,…] array, {start, segments:[…]} curve chain, or {circle:{center,radius}}.' },
      path: { type: 'array', required: true, items: { type: 'number' }, description: 'Sweep path as [x,y,z,…] triplets (≥6 numbers).' },
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
      const bodyId = nextBodyId()
      const op: ModelOp = { kind: 'sweep', bodyId, profile: args.profile, path: args.path, name: args.name }
      const result = await runModelOp(op)
      return syncScene(op, result) as never
    },
    presentCall: () => ({ card: 'generic', title: 'CAD sweep', kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD sweep' }),
  }) as unknown as ToolDefinition

  const cadRevolve = defineTool({
    name: 'cad_revolve',
    description:
      'Revolve (旋转): sweep a closed 2D profile around an axis into a solid of revolution — shafts, wheels, vases, cones, spheres. Profile coordinates are (radius, height) relative to the axis: with the default +Z axis, profile [x,y] means radius x at height y. ' +
      'Accepts the same curve-segment profiles as cad_extrude_profile (lines/arcs/bspline/circle), so rounded rims are exact. `angle` in degrees (default 360).',
    parameters: {
      profile: { type: 'json', required: true, description: 'Profile in (radius, height): flat [r0,h0, r1,h1,…] loop, {start, segments:[…]}, or {circle:{center,radius}}.' },
      angle: { type: 'number', description: 'Sweep angle in degrees (default 360).' },
      axis: { type: 'array', items: { type: 'number' }, description: 'Revolve axis direction [x,y,z] (default +Z).' },
      at: { type: 'array', items: { type: 'number' }, description: 'A point the axis passes through [x,y,z] (default origin).' },
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
      const bodyId = nextBodyId()
      const op: ModelOp = {
        kind: 'revolve', bodyId, profile: args.profile,
        ...(args.angle !== undefined ? { angle: (args.angle * Math.PI) / 180 } : {}),
        ...(Array.isArray(args.axis) ? { axis: args.axis as [number, number, number] } : {}),
        ...(Array.isArray(args.at) ? { at: args.at as [number, number, number] } : {}),
        ...(args.name !== undefined ? { name: args.name } : {}),
      }
      const result = await runModelOp(op)
      return syncScene(op, result) as never
    },
    presentCall: () => ({ card: 'generic', title: 'CAD revolve', kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD revolve' }),
  }) as unknown as ToolDefinition

  const cadChamfer = defineTool({
    name: 'cad_chamfer',
    description: 'Chamfer (倒角): bevel every sharp edge of a body with one equal distance (mm). Fails when the distance exceeds the adjacent faces.',
    parameters: {
      target: bodyTarget,
      distance: { type: 'number', required: true, description: 'Chamfer distance (mm).' },
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
      const op: ModelOp = { kind: 'chamfer', target: args.target, distance: args.distance }
      const result = await runModelOp(op)
      return syncScene(op, result) as never
    },
    presentCall: (args) => ({ card: 'generic', title: `CAD chamfer ${String(args.target)}`, kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD chamfer' }),
  }) as unknown as ToolDefinition

  const cadShell = defineTool({
    name: 'cad_shell',
    description:
      'Shell (抽壳): hollow a solid into a wall of `thickness` mm (the wall grows inward, the outer skin is preserved). `open` lists outward NORMALS [x,y,z] whose faces become openings (e.g. [[0,0,1]] opens the top of a box; empty = sealed hollow). ' +
      'Runs on the occt.ts kernel (>= 0.3.0): the result becomes a HOSTED body — volume/export(.step)/display keep working, but opencascade.js-only edits (fillet/chamfer/loft/sweep/revolve/boolean) on it are refused, so do those before shelling.',
    parameters: {
      target: bodyTarget,
      thickness: { type: 'number', required: true, description: 'Wall thickness (mm, positive).' },
      open: { type: 'array', items: { type: 'array', items: { type: 'number' } }, description: 'Outward normals of the faces to open, e.g. [[0,0,1]].' },
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
      const op: ModelOp = { kind: 'shell', target: args.target, thickness: args.thickness, ...(Array.isArray(args.open) ? { openNormals: args.open as Array<[number, number, number]> } : {}) }
      const result = await runModelOp(op)
      return syncScene(op, result) as never
    },
    presentCall: (args) => ({ card: 'generic', title: `CAD shell ${String(args.target)}`, kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD shell' }),
  }) as unknown as ToolDefinition

  const cadDraft = defineTool({
    name: 'cad_draft',
    description:
      'Draft (拔模): tilt the walls of a solid by `angle` degrees for mold release — faces pivot about a neutral plane, dimensions there unchanged. `direction` is the pull direction (default +Z); by default the faces parallel to it (the walls) are drafted. ' +
      'Runs on the occt.ts kernel (>= 0.3.0): the result becomes a HOSTED body (same caveats as cad_shell).',
    parameters: {
      target: bodyTarget,
      angle: { type: 'number', required: true, description: 'Draft angle in degrees (positive opens the walls toward the pull direction).' },
      direction: { type: 'array', items: { type: 'number' }, description: 'Pull direction [x,y,z] (default +Z).' },
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
      const op: ModelOp = { kind: 'draft', target: args.target, angle: args.angle, ...(Array.isArray(args.direction) ? { direction: args.direction as [number, number, number] } : {}) }
      const result = await runModelOp(op)
      return syncScene(op, result) as never
    },
    presentCall: (args) => ({ card: 'generic', title: `CAD draft ${String(args.target)} ${String(args.angle ?? '')}°`, kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD draft' }),
  }) as unknown as ToolDefinition

  const cadPattern = defineTool({
    name: 'cad_pattern',
    description:
      'Pattern (阵列): replicate a body into `count` total placements. Linear: `delta` [dx,dy,dz] spacing per copy. Circular: rotate copies around a principal axis (+X/+Y/+Z) through `at` over `angle` degrees (default 360). Creates new bodies (target·1 … target·(count−1)); fuse afterwards for a single body.',
    parameters: {
      target: bodyTarget,
      mode: { type: 'string', required: true, enum: ['linear', 'circular'] as const, description: 'Pattern mode.' },
      count: { type: 'number', required: true, description: 'Total placements (≥2).' },
      delta: { type: 'array', items: { type: 'number' }, description: 'linear: spacing [dx,dy,dz] per copy (mm).' },
      axis: { type: 'array', items: { type: 'number' }, description: 'circular: principal axis [x,y,z] (default +Z).' },
      at: { type: 'array', items: { type: 'number' }, description: 'circular: axis point [x,y,z] (default origin).' },
      angle: { type: 'number', description: 'circular: total sweep in degrees (default 360).' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          bodyId: { type: 'string', required: true },
          created: { type: 'array', items: { type: 'string' }, required: true, description: 'Ids of the newly created copy bodies.' },
          ...requiredCounts,
          ...commonOptional,
        },
      },
      render: (_args, value) => [{ type: 'text', text: renderModel(value as unknown as Record<string, unknown>) + '\ncreated: ' + (value.created as string[]).join(', ') }],
      presentationMeta: (_args, value) => metaOf(value as unknown as Record<string, unknown>),
    },
    isConcurrencySafe: () => false,
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
      if (args.mode === 'linear' && !Array.isArray(args.delta)) throw new Error('linear patterns need delta: [dx,dy,dz]')
      const op: ModelOp = {
        kind: 'pattern', target: args.target, mode: args.mode, count: args.count,
        ...(Array.isArray(args.delta) ? { delta: args.delta as [number, number, number] } : {}),
        ...(Array.isArray(args.axis) ? { axis: args.axis as [number, number, number] } : {}),
        ...(Array.isArray(args.at) ? { at: args.at as [number, number, number] } : {}),
        ...(args.angle !== undefined ? { angle: args.angle } : {}),
      }
      const result = await runModelOp(op)
      const created = (result.created ?? []).map((entry) => {
        if (entry.mesh !== undefined) meshCache.set(entry.bodyId, mirrorMesh(entry.mesh, entry.bodyId))
        return entry.bodyId
      })
      await document.record(op, null)
      const meshes = [...meshCache.values()]
      const sceneUrlBase = deps.ensureSceneRoute()
      if (sceneUrlBase !== null && meshes.length > 0) {
        await deps.store.publish(document.doc.docId, meshes)
      }
      const value: Record<string, unknown> = {
        bodyId: args.target,
        created,
        triangles: meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0),
        bodies: meshes.length,
        version: document.doc.version,
        ...(sceneUrlBase !== null ? { sceneUrl: `${sceneUrlBase.replace('/scene', '/bin')}/${document.doc.docId}?v=${document.doc.version}` } : {}),
      }
      return value as never
    },
    presentCall: (args) => ({ card: 'generic', title: `CAD ${String(args.mode ?? '')} pattern ×${String(args.count ?? '')}`, kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD pattern' }),
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
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
    async execute(args, exec: unknown) {
      await resolveDoc(exec)
      const op: ModelOp = { kind: 'assembly_remove', instanceId: args.instanceId }
      const result = await runModelOp(op)
      return syncAssembly(op, result) as never
    },
    presentCall: (args) => ({ card: 'generic', title: `移除 ${String(args.instanceId)}`, kind: 'delete' }),
    presentResult: () => ({ card: 'generic', title: '装配移除' }),
  }) as unknown as ToolDefinition

  // ── document (file space) tools ───────────────────────────────────────────

  const docRefParam = { type: 'string' as const, required: true as const, description: 'Document id or exact name (list with cad_docs).' }

  const renderDocs = (value: Record<string, unknown>): string => {
    const docs = Array.isArray(value.docs) ? (value.docs as Array<Record<string, unknown>>) : []
    const active = typeof value.activeDoc === 'string' ? value.activeDoc : ''
    const lines = docs.map((doc) => `${doc.id === active ? '● ' : '  '}${String(doc.name)} · ${Number(doc.bodies)} 体 · ${String(doc.updatedAt).slice(0, 16).replace('T', ' ')} · ${String(doc.id)}`)
    return lines.length > 0 ? ['工作区文档:', ...lines].join('\n') : '工作区还没有建模文档'
  }

  const cadDocs = defineTool({
    name: 'cad_docs',
    description:
      'List the workspace modeling documents (the file space): id, name, body count and update time, marking the one active for this session. ' +
      'Call before cad_doc_open / cad_doc_delete to discover ids and names.',
    parameters: {},
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          docs: {
            type: 'array',
            required: true,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                id: { type: 'string', required: true },
                name: { type: 'string', required: true },
                bodies: { type: 'number', required: true },
                ops: { type: 'number', required: true },
                updatedAt: { type: 'string', required: true },
                active: { type: 'boolean' },
              },
            },
          },
          activeDoc: { type: 'string', description: 'Active document id for this session (absent: none).' },
        },
      },
      render: (_args, value) => [{ type: 'text', text: renderDocs(value as unknown as Record<string, unknown>) }],
    },
    isConcurrencySafe: () => true,
    async execute(_args, exec: unknown) {
      const sessionId = sessionKeyOf(exec)
      const docs = await deps.registry.list()
      const activeDoc = await deps.registry.bindingOf(sessionId)
      return {
        docs: docs.map((doc) => ({ id: doc.id, name: doc.name, bodies: doc.bodyCount, ops: doc.opCount, updatedAt: doc.updatedAt, ...(doc.id === activeDoc ? { active: true } : {}) })),
        ...(activeDoc === null ? {} : { activeDoc }),
      } as never
    },
    presentCall: () => ({ card: 'generic', title: '文档列表', kind: 'read' }),
    presentResult: () => ({ card: 'generic', title: '文档列表' }),
  }) as unknown as ToolDefinition

  const cadDocNew = defineTool({
    name: 'cad_doc_new',
    description:
      'Create a new modeling document and make it this session\'s active modeling target (previous documents stay in the file space). ' +
      'Name it when the task has a clear subject (e.g. 发动机 / 齿轮箱) — start multi-part projects with this tool so each project keeps its own document.',
    parameters: {
      name: { type: 'string', description: 'Document name (default: 未命名 N).' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          docId: { type: 'string', required: true, description: 'New document id.' },
          name: { type: 'string', required: true, description: 'Document name.' },
          bodies: { type: 'number', required: true, description: 'Bodies (0 for a fresh document).' },
          version: { type: 'number', required: true, description: 'Document version.' },
        },
      },
      render: (_args, value) => [{ type: 'text', text: `新建文档 ${String((value as Record<string, unknown>).name)}（后续建模操作都写入该文档）` }],
    },
    isConcurrencySafe: () => false,
    async execute(args, exec: unknown) {
      const sessionId = sessionKeyOf(exec)
      const doc = await deps.registry.create(args.name)
      await deps.registry.bind(sessionId, doc.doc.docId)
      await activateDocument(doc)
      const name = (await deps.registry.list()).find((meta) => meta.id === doc.doc.docId)?.name ?? doc.doc.docId
      return { docId: doc.doc.docId, name, bodies: 0, version: doc.doc.version } as never
    },
    presentCall: (args) => ({ card: 'generic', title: `新建文档 ${String(args.name ?? '')}`.trim(), kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: '新建文档' }),
  }) as unknown as ToolDefinition

  const cadDocOpen = defineTool({
    name: 'cad_doc_open',
    description:
      'Open an existing modeling document and make it this session\'s active modeling target (its bodies load back exactly). ' +
      'Use when the user asks to continue an earlier model (e.g. “打开发动机文档”) — resolve the id/name with cad_docs first when unsure.',
    parameters: {
      doc: docRefParam,
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          docId: { type: 'string', required: true, description: 'Opened document id.' },
          name: { type: 'string', required: true, description: 'Document name.' },
          bodies: { type: 'number', required: true, description: 'Bodies in the document.' },
          triangles: { type: 'number', required: true, description: 'Document triangle count.' },
          version: { type: 'number', required: true, description: 'Document version.' },
          sceneUrl: { type: 'string', description: 'Versioned viewer URL (web compositions).' },
        },
      },
      render: (_args, value) => [{ type: 'text', text: `打开文档 ${String((value as Record<string, unknown>).name)} · ${Number((value as Record<string, unknown>).bodies)} 体 (version ${Number((value as Record<string, unknown>).version)})` }],
      presentationMeta: (_args, value) => metaOf(value as unknown as Record<string, unknown>),
    },
    isConcurrencySafe: () => false,
    async execute(args, exec: unknown) {
      const sessionId = sessionKeyOf(exec)
      const meta = await deps.registry.resolve(args.doc)
      if (meta === null) {
        const available = (await deps.registry.list()).map((doc) => doc.name).join(' / ')
        throw new Error(`no document matches "${String(args.doc)}" — available: ${available === '' ? '(none)' : available}`)
      }
      await deps.registry.bind(sessionId, meta.id)
      const doc = await deps.registry.open(meta.id)
      if (doc === null) throw new Error(`document file missing: ${meta.id}`)
      await activateDocument(doc)
      const meshes = [...meshCache.values()]
      const triangles = meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0)
      const sceneUrlBase = deps.ensureSceneRoute()
      const value: Record<string, unknown> = {
        docId: meta.id,
        name: meta.name,
        bodies: meshes.length,
        triangles,
        version: document.doc.version,
      }
      if (meshes.length > 0) await deps.store.publish(meta.id, meshes)
      if (meshes.length > 0 && sceneUrlBase !== null) {
        value.sceneUrl = `${sceneUrlBase.replace('/scene', '/bin')}/${meta.id}?v=${document.doc.version}`
      }
      return value as never
    },
    presentCall: (args) => ({ card: 'generic', title: `打开文档 ${String(args.doc)}`, kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: '打开文档' }),
  }) as unknown as ToolDefinition

  const cadDocRename = defineTool({
    name: 'cad_doc_rename',
    description: 'Rename a modeling document in the file space.',
    parameters: {
      doc: docRefParam,
      name: { type: 'string', required: true, description: 'New document name.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          docId: { type: 'string', required: true, description: 'Document id.' },
          name: { type: 'string', required: true, description: 'New name.' },
        },
      },
      render: (_args, value) => [{ type: 'text', text: `文档已重命名为 ${String((value as Record<string, unknown>).name)}` }],
    },
    isConcurrencySafe: () => false,
    async execute(args, exec: unknown) {
      void exec
      const meta = await deps.registry.resolve(args.doc)
      if (meta === null) throw new Error(`no document matches "${String(args.doc)}"`)
      const renamed = await deps.registry.rename(meta.id, args.name)
      if (renamed === null) throw new Error(`rename failed: ${meta.id}`)
      return { docId: renamed.id, name: renamed.name } as never
    },
    presentCall: (args) => ({ card: 'generic', title: `重命名文档 ${String(args.doc)}`, kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: '重命名文档' }),
  }) as unknown as ToolDefinition

  const cadDocDelete = defineTool({
    name: 'cad_doc_delete',
    description:
      'Permanently delete a modeling document from the file space (op log + bodies). Requires confirm=true — ask the user before calling. ' +
      'To delete a single body inside a document, use cad_delete instead.',
    parameters: {
      doc: docRefParam,
      confirm: { type: 'boolean', required: true, description: 'Must be explicitly true to delete.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          deleted: { type: 'string', required: true, description: 'Deleted document id.' },
          name: { type: 'string', required: true, description: 'Deleted document name.' },
        },
      },
      render: (_args, value) => [{ type: 'text', text: `已删除文档 ${String((value as Record<string, unknown>).name)}` }],
    },
    isConcurrencySafe: () => false,
    async execute(args, exec: unknown) {
      void exec
      if (args.confirm !== true) {
        throw new Error('pass confirm=true to delete — this permanently removes the document and its bodies')
      }
      const meta = await deps.registry.resolve(args.doc)
      if (meta === null) throw new Error(`no document matches "${String(args.doc)}"`)
      const removed = await deps.registry.remove(meta.id)
      if (!removed) throw new Error(`delete failed: ${meta.id}`)
      // Drop the active-document state if it was the deleted one; the next
      // modeling op lazily creates a fresh document for its session.
      if (document.doc.docId === meta.id) {
        document = new ModelDocument(deps.workspaceRoot)
        meshCache.clear()
        drawingSheets = new Map()
        lastDrawingId = null
        syncedEpoch = -1
      }
      return { deleted: meta.id, name: meta.name } as never
    },
    presentCall: (args) => ({ card: 'generic', title: `删除文档 ${String(args.doc)}`, kind: 'delete' }),
    presentResult: () => ({ card: 'generic', title: '删除文档' }),
  }) as unknown as ToolDefinition

  // ── constraint tools (Ansatz solver) ──────────────────────────────────────

  const constraintTools = createConstraintTools({
    deps,
    // Read the ACTIVE document per call: multi-document sessions swap it.
    getDocument: () => document,
    meshCache,
    constraintState,
    resolveDoc,
    syncAssembly,
    assemblyMetaOf,
  })

  return [
    cadCreatePrim,
    cadExtrude,
    cadRevolve,
    cadChamfer,
    cadShell,
    cadDraft,
    cadPattern,
    cadLoft,
    cadSweep,
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
    cadDocs,
    cadDocNew,
    cadDocOpen,
    cadDocRename,
    cadDocDelete,
    ...constraintTools,
  ]
}

export const MODEL_TOOL_NAMES = [
  'cad_create_prim',
  'cad_extrude_profile',
  'cad_revolve',
  'cad_chamfer',
  'cad_shell',
  'cad_draft',
  'cad_pattern',
  'cad_loft',
  'cad_sweep',
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
  'cad_docs',
  'cad_doc_new',
  'cad_doc_open',
  'cad_doc_rename',
  'cad_doc_delete',
  'cad_constraint',
  'cad_solve',
  'cad_motion',
] as const
