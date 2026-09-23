/**
 * cad_onshape: run a feature program on the Onshape cloud (public REST API).
 * The program uses the same op shapes as the built-in kernel (create_prim /
 * extrude_profile / boolean / fillet / transform / volume / delete); each run
 * compiles to a FeatureScript custom feature in the target document, and the
 * rebuilt meshes flow back into the same embedded viewer via the binary scene
 * store. A run without `documentId` creates a fresh Onshape document; the
 * document URL is always returned — Onshape itself is the viewer.
 */
import { randomUUID } from 'node:crypto'
import { defineTool } from '@deepseek-ai/dsh-tools'
import type { ToolDefinition } from '@deepseek-ai/dsh-tools'
import type { BinarySceneStore } from '../modeling/bin-store.js'
import type { BinMeshData } from '../modeling/bin-format.js'
import { resolveWorkspacePath } from './util.js'
import { onshapeAvailable, onshapeUnavailableReason, runOnshapeProgram } from '../cad_connector/onshape-executor.js'
import { isKnownOpKind, normalizeOps } from '../cad_connector/executor.js'

export interface OnshapeToolDeps {
  store: BinarySceneStore
  workspaceRoot: string
  ensureSceneRoute: () => string | null
}

const EXPORT_EXTENSIONS = new Set(['stl', 'step', 'stp', 'x_t', 'x_b'])

export function createOnshapeTool(deps: OnshapeToolDeps): ToolDefinition {
  return defineTool({
    name: 'cad_onshape',
    description:
      'Run a feature program on Onshape (cloud CAD; requires DSH_ONSHAPE_ACCESS_KEY / DSH_ONSHAPE_SECRET_KEY, no local install). ' +
      '`steps` uses the same op shapes as the built-in kernel. Supported in this build: create_prim box/cylinder (at honored; ' +
      'at[2] lifts the extrude start), extrude_profile, boolean (fuse/cut/common), fillet, volume. ' +
      'sphere/cone/torus/transform/delete/reset report explicit unsupported errors for now. ' +
      'Each op compiles to a standard Onshape feature pushed into the target Part Studio: without `documentId` a fresh ' +
      'Onshape document is created (linked in the result; public when the account is a free plan), with `documentId` ' +
      '(+ optional `workspaceId`/`elementId`) an existing document is driven and previous dsh-cad features are replaced. ' +
      'Three readback flavors: `stl` (default — per-part tessellation into the local viewer card), ' +
      '`step` (server-side STEP translation parsed locally into exact-BRep-derived meshes), ' +
      '`none` (no geometry download — the deliverable is just the Onshape document link; ~3 API calls, quota-friendliest). ' +
      'exportPath: .stl (tessellation) / .step .stp (translation) / .x_t .x_b (Parasolid — Onshape native kernel BRep).',
    parameters: {
      steps: {
        type: 'array',
        required: true,
        description:
          'Ops executed in order. Canonical shapes: ' +
          '{kind:"create_prim", bodyId, prim:"box|cylinder|sphere|cone|torus", params:{dx,dy,dz | radius,height | radius1,radius2,height | majorRadius,minorRadius, at:[x,y,z], axis:[x,y,z]}}, ' +
          '{kind:"extrude_profile", bodyId, points:[x0,y0,x1,y1,...], height, base}, ' +
          '{kind:"boolean", op:"cut|fuse|common", target, tools:[bodyIds]}, ' +
          '{kind:"fillet", target, radius}, ' +
          '{kind:"transform", target, translate:[x,y,z], rotate:[rx,ry,rz] deg}, ' +
          '{kind:"volume", target}, {kind:"delete", target}.',
      },
      documentId: { type: 'string', description: 'Optional Onshape document to drive; omit to create a new document.' },
      workspaceId: { type: 'string', description: 'Optional workspace within the target document (defaults to the document default workspace).' },
      elementId: { type: 'string', description: 'Optional Part Studio element id to run in (defaults to the first Part Studio).' },
      documentName: { type: 'string', description: 'Name for a newly created document (defaults to "dsh-cad <timestamp>").' },
      readback: { type: 'string', description: 'Geometry readback flavor: "stl" (default), "step" (exact BRep via STEP translation), or "none" (build only, return the document link).' },
      exportPath: { type: 'string', description: 'Optional export destination: .stl / .step / .stp / .x_t / .x_b (Parasolid).' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          viewId: { type: 'string', required: true, description: 'Viewer scene id.' },
          kind: { type: 'string', required: true, description: 'Always "3d".' },
          format: { type: 'string', required: true, description: 'Always "onshape".' },
          file: { type: 'string', required: true, description: 'Onshape document name.' },
          bodies: { type: 'number', required: true, description: 'Parts produced.' },
          triangles: { type: 'number', required: true, description: 'Total triangles.' },
          sceneUrl: { type: 'string', description: 'Versioned viewer URL (web compositions).' },
          exported: { type: 'string', description: 'Written export path, when requested.' },
          volume: { type: 'number', description: 'Volume in mm³ when the program produced exactly one part.' },
          documentId: { type: 'string', description: 'Onshape document id.' },
          documentUrl: { type: 'string', description: 'Browser URL of the Onshape document.' },
        },
      },
      render: (_args, value) => {
        const record = value as unknown as Record<string, unknown>
        const lines = [`onshape: ${String(record.bodies)} parts, ${String(record.triangles)} triangles`]
        if (record.volume !== undefined) lines.push(`volume: ${Number(record.volume).toFixed(2)} mm³`)
        if (record.exported !== undefined) lines.push(`written: ${String(record.exported)}`)
        if (record.documentUrl !== undefined) lines.push(`document: ${String(record.documentUrl)}`)
        return [{ type: 'text', text: lines.join('\n') }]
      },
      presentationMeta: (_args, value) => {
        const record = value as unknown as Record<string, unknown>
        return {
          viewId: String(record.viewId),
          kind: '3d' as const,
          format: 'onshape',
          file: String(record.file),
          ...(record.sceneUrl === undefined ? {} : { sceneUrl: String(record.sceneUrl) }),
          title: `Onshape · ${String(record.bodies)} ${record.bodies === 1 ? 'part' : 'parts'}`,
          stats: { meshes: Number(record.bodies), triangles: Number(record.triangles) },
        }
      },
    },
    timeoutMs: 300_000,
    isConcurrencySafe: () => false,
    async execute(args) {
      if (!onshapeAvailable()) throw new Error(onshapeUnavailableReason())
      if (!Array.isArray(args.steps) || args.steps.length === 0) {
        throw new Error('steps must be a non-empty array of ops')
      }
      const steps = normalizeOps(args.steps)
      for (const [index, op] of steps.entries()) {
        if (typeof op !== 'object' || op === null || !isKnownOpKind(op.kind)) {
          throw new Error(`steps[${index}] is not an op (missing "kind")`)
        }
      }

      const names: Record<string, string> = {}
      for (const op of steps as Array<{ bodyId?: string; name?: string }>) {
        if (typeof op.bodyId === 'string' && typeof op.name === 'string') names[op.bodyId] = op.name
      }

      const program: Parameters<typeof runOnshapeProgram>[0] = {
        ops: steps,
        names,
        target: {
          ...(typeof args.documentId === 'string' && args.documentId !== '' ? { documentId: args.documentId } : {}),
          ...(typeof args.workspaceId === 'string' && args.workspaceId !== '' ? { workspaceId: args.workspaceId } : {}),
          ...(typeof args.elementId === 'string' && args.elementId !== '' ? { elementId: args.elementId } : {}),
          ...(typeof args.documentName === 'string' && args.documentName !== '' ? { documentName: args.documentName } : {}),
        },
        ...(typeof args.readback === 'string' && (args.readback === 'step' || args.readback === 'stl' || args.readback === 'none')
          ? { readback: args.readback }
          : {}),
      }
      if (args.exportPath !== undefined) {
        const resolved = resolveWorkspacePath(args.exportPath, deps.workspaceRoot)
        const extension = resolved.toLowerCase().split('.').pop() ?? ''
        if (!EXPORT_EXTENSIONS.has(extension)) {
          throw new Error(`exportPath must be one of ${[...EXPORT_EXTENSIONS].map((ext) => `.${ext}`).join(' ')} (got .${extension})`)
        }
        program.export = { format: extension === 'stl' ? 'stl' : 'step', path: resolved }
      }

      const result = await runOnshapeProgram(program)
      if (result.meshes.length === 0 && program.readback !== 'none') {
        throw new Error('the Onshape program produced no parts')
      }

      const viewId = `onshape-${randomUUID().slice(0, 8)}`
      const meshes: BinMeshData[] = result.meshes.map((mesh) => ({
        name: mesh.name === '' ? mesh.bodyId : mesh.name,
        positions: mesh.positions,
        normals: mesh.normals,
        indices: mesh.indices,
      }))
      // Pure-link mode carries no geometry — publish an empty scene so the
      // viewer card still refreshes (and links the Onshape document).
      if (meshes.length > 0) await deps.store.publish(viewId, meshes)

      const triangles = meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0)
      const value: Record<string, unknown> = {
        viewId,
        kind: '3d',
        format: 'onshape',
        file: result.documentName === '' ? 'onshape document' : result.documentName,
        bodies: meshes.length,
        triangles,
        documentId: result.documentId,
        documentUrl: result.documentUrl,
        readback: program.readback ?? 'stl',
      }
      const volumeEntries = Object.entries(result.volumes)
      if (volumeEntries.length === 1) value.volume = volumeEntries[0]![1]
      if (result.exported !== undefined) value.exported = result.exported
      const sceneUrlBase = deps.ensureSceneRoute()
      if (sceneUrlBase !== null) value.sceneUrl = `${sceneUrlBase.replace('/scene', '/bin')}/${viewId}`
      return value as never
    },
    presentCall: () => ({ card: 'generic', title: 'CAD Onshape run', kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD Onshape' }),
  }) as unknown as ToolDefinition
}
