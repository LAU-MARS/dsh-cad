/**
 * cad_fusion: run a feature program on an external Fusion 360 executor
 * (GUI bridge — Fusion has no headless mode, so the window opens with the
 * bodies loaded, doubling as a viewer). Same op shapes as the built-in
 * kernel and cad_freecad; meshes flow back into the same embedded WebGL
 * viewer via the binary scene store.
 */
import { randomUUID } from 'node:crypto'
import { defineTool } from '@deepseek-ai/dsh-tools'
import type { ToolDefinition } from '@deepseek-ai/dsh-tools'
import type { BinarySceneStore } from '../modeling/bin-store.js'
import type { BinMeshData } from '../modeling/bin-format.js'
import { resolveWorkspacePath } from './util.js'
import { isKnownOpKind, normalizeOps } from '../cad_connector/executor.js'
import { FUSION360_EXECUTOR } from '../cad_connector/fusion360-executor.js'

export interface FusionToolDeps {
  store: BinarySceneStore
  workspaceRoot: string
  ensureSceneRoute: () => string | null
}

export function createFusionTool(deps: FusionToolDeps): ToolDefinition {
  return defineTool({
    name: 'cad_fusion',
    description:
      'Run a feature program on an external Fusion 360 executor (requires Fusion installed locally; native on Apple Silicon macOS and Windows). ' +
      'Fusion has no headless mode, so its window opens with the result loaded — it doubles as a viewer. ' +
      '`steps` uses the same ops as the built-in kernel and cad_freecad: create_prim (box/cylinder/sphere/cone/torus), extrude_profile, ' +
      'boolean (fuse/cut/common), transform, volume, delete, reset. `exportPath` (.step/.stl) writes the result. ' +
      'First use installs the DshCadBridge add-in into the user Fusion API folder and needs Fusion signed in once.',
    parameters: {
      steps: {
        type: 'array',
        required: true,
        description:
          'Ops executed in order. Canonical shapes: ' +
          '{kind:"create_prim", bodyId, prim:"box|cylinder|sphere|cone|torus", params:{dx,dy,dz | radius,height | radius1,radius2,height | majorRadius,minorRadius, at:[x,y,z], axis:[x,y,z]}}, ' +
          '{kind:"extrude_profile", bodyId, points:[x0,y0,x1,y1,...], height}, ' +
          '{kind:"boolean", op:"cut|fuse|common", target, tools:[bodyIds]}, ' +
          '{kind:"transform", target, translate:[x,y,z], rotate:[rx,ry,rz] deg}, ' +
          '{kind:"volume", target}, {kind:"delete", target}, {kind:"reset"}.',
      },
      exportPath: { type: 'string', description: 'Optional export destination; extension selects .step or .stl.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          viewId: { type: 'string', required: true, description: 'Viewer scene id.' },
          kind: { type: 'string', required: true, description: 'Always "3d".' },
          format: { type: 'string', required: true, description: 'Always "fusion".' },
          file: { type: 'string', required: true, description: 'Source label (exported file or program).' },
          bodies: { type: 'number', required: true, description: 'Bodies produced.' },
          triangles: { type: 'number', required: true, description: 'Total triangles.' },
          sceneUrl: { type: 'string', description: 'Versioned viewer URL (web compositions).' },
          exported: { type: 'string', description: 'Written export path, when requested.' },
          volume: { type: 'number', description: 'Volume in mm³ when exactly one volume was measured.' },
          opened: { type: 'boolean', description: 'Fusion window opened with the result.' },
        },
      },
      render: (_args, value) => {
        const record = value as unknown as Record<string, unknown>
        const lines = [`fusion360: ${String(record.bodies)} bodies, ${String(record.triangles)} triangles`]
        if (record.volume !== undefined) lines.push(`volume: ${Number(record.volume).toFixed(2)} mm³`)
        if (record.exported !== undefined) lines.push(`written: ${String(record.exported)}`)
        lines.push('Fusion window opened — it stays open for inspection')
        return [{ type: 'text', text: lines.join('\n') }]
      },
      presentationMeta: (_args, value) => {
        const record = value as unknown as Record<string, unknown>
        return {
          viewId: String(record.viewId),
          kind: '3d' as const,
          format: 'fusion',
          file: String(record.file),
          ...(record.sceneUrl === undefined ? {} : { sceneUrl: String(record.sceneUrl) }),
          title: `Fusion 360 · ${String(record.bodies)} ${record.bodies === 1 ? 'body' : 'bodies'}`,
          stats: { meshes: Number(record.bodies), triangles: Number(record.triangles) },
        }
      },
    },
    timeoutMs: 300_000,
    isConcurrencySafe: () => false,
    async execute(args) {
      if (!FUSION360_EXECUTOR.available()) {
        throw new Error(FUSION360_EXECUTOR.unavailableReason?.() ?? 'Fusion 360 is not available on this machine')
      }
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

      const program: Parameters<typeof FUSION360_EXECUTOR.run>[0] = { ops: steps, names, display: true }
      if (args.exportPath !== undefined) {
        const resolved = resolveWorkspacePath(args.exportPath, deps.workspaceRoot)
        const extension = resolved.toLowerCase().split('.').pop() ?? ''
        if (extension !== 'step' && extension !== 'stp' && extension !== 'stl') {
          throw new Error(`exportPath must be .step or .stl (got .${extension})`)
        }
        program.export = { format: extension as 'step' | 'stp' | 'stl', path: resolved }
      }

      const result = await FUSION360_EXECUTOR.run(program)
      if (result.meshes.length === 0) {
        throw new Error('the Fusion program produced no bodies')
      }

      const viewId = `fusion-${randomUUID().slice(0, 8)}`
      const meshes: BinMeshData[] = result.meshes.map((mesh) => ({
        name: mesh.name === '' ? mesh.bodyId : mesh.name,
        positions: mesh.positions,
        normals: mesh.normals,
        indices: mesh.indices,
      }))
      await deps.store.publish(viewId, meshes)

      const triangles = meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0)
      const volumeEntries = Object.entries(result.volumes)
      const value: Record<string, unknown> = {
        viewId,
        kind: '3d',
        format: 'fusion',
        file: result.exported ?? 'fusion program',
        bodies: meshes.length,
        triangles,
        opened: true,
      }
      if (volumeEntries.length === 1) value.volume = volumeEntries[0]![1]
      if (result.exported !== undefined) value.exported = result.exported
      const sceneUrlBase = deps.ensureSceneRoute()
      if (sceneUrlBase !== null) value.sceneUrl = `${sceneUrlBase.replace('/scene', '/bin')}/${viewId}`
      return value as never
    },
    presentCall: () => ({ card: 'generic', title: 'CAD Fusion 360 run', kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD Fusion 360' }),
  }) as unknown as ToolDefinition
}
