/**
 * cad_freecad: run a feature program on an external FreeCAD executor. The
 * program uses the same op shapes as the built-in kernel (create_prim /
 * extrude_profile / boolean / fillet / transform / volume / delete / reset);
 * meshes flow back into the same embedded viewer via the binary scene store.
 * Optionally loads an input CAD file (STEP/BREP/STL) first and/or exports
 * the result (.step/.stl) — the "upload STEP → external-engine pipeline".
 */
import { randomUUID } from 'node:crypto'
import { defineTool } from '@deepseek-ai/dsh-tools'
import type { ToolDefinition } from '@deepseek-ai/dsh-tools'
import type { BinarySceneStore } from '../modeling/bin-store.js'
import type { BinMeshData } from '../modeling/bin-format.js'
import { resolveWorkspacePath } from './util.js'
import { findFreeCad, runFreeCadProgram } from '../cad_connector/freecad-executor.js'

export interface FreeCadToolDeps {
  store: BinarySceneStore
  workspaceRoot: string
  ensureSceneRoute: () => string | null
}

const INPUT_EXTENSIONS = new Set(['step', 'stp', 'brep', 'stl'])
const EXPORT_EXTENSIONS = new Set(['step', 'stp', 'stl'])

export function createFreeCadTool(deps: FreeCadToolDeps): ToolDefinition {
  return defineTool({
    name: 'cad_freecad',
    description:
      'Run a feature program on an external FreeCAD executor (requires FreeCAD installed locally or FREECAD_BIN set). ' +
      '`steps` is an array of the same ops the built-in kernel uses: create_prim (box/cylinder/sphere/cone/torus with at/axis), ' +
      'extrude_profile, boolean (fuse/cut/common), fillet, transform, volume, delete, reset. ' +
      'Optionally `input` loads a STEP/STP/BREP/STL file as body "input" first, and `exportPath` (.step/.stl) writes the final result. ' +
      'The rebuilt meshes render in the same viewer card. Use it for heavyweight jobs or pipelines over uploaded CAD files.',
    parameters: {
      steps: { type: 'array', required: true, description: 'Array of ops (same shapes as the built-in modeling ops), executed in order.' },
      input: { type: 'string', description: 'Optional CAD file to load first (STEP .step/.stp, BREP, STL), absolute or workspace-relative.' },
      exportPath: { type: 'string', description: 'Optional export destination; extension selects .step or .stl.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          viewId: { type: 'string', required: true, description: 'Viewer scene id.' },
          kind: { type: 'string', required: true, description: 'Always "3d".' },
          format: { type: 'string', required: true, description: 'Always "freecad".' },
          file: { type: 'string', required: true, description: 'Source label (input or exported file).' },
          bodies: { type: 'number', required: true, description: 'Bodies produced.' },
          triangles: { type: 'number', required: true, description: 'Total triangles.' },
          sceneUrl: { type: 'string', description: 'Versioned viewer URL (web compositions).' },
          exported: { type: 'string', description: 'Written export path, when requested.' },
          volume: { type: 'number', description: 'Volume in mm³ when exactly one volume was measured.' },
        },
      },
      render: (_args, value) => {
        const record = value as unknown as Record<string, unknown>
        const lines = [`freecad: ${String(record.bodies)} bodies, ${String(record.triangles)} triangles`]
        if (record.volume !== undefined) lines.push(`volume: ${Number(record.volume).toFixed(2)} mm³`)
        if (record.exported !== undefined) lines.push(`written: ${String(record.exported)}`)
        return [{ type: 'text', text: lines.join('\n') }]
      },
      presentationMeta: (_args, value) => {
        const record = value as unknown as Record<string, unknown>
        return {
          viewId: String(record.viewId),
          kind: '3d' as const,
          format: 'freecad',
          file: String(record.file),
          ...(record.sceneUrl === undefined ? {} : { sceneUrl: String(record.sceneUrl) }),
          title: `FreeCAD · ${String(record.bodies)} ${record.bodies === 1 ? 'body' : 'bodies'}`,
          stats: { meshes: Number(record.bodies), triangles: Number(record.triangles) },
        }
      },
    },
    timeoutMs: 300_000,
    isConcurrencySafe: () => false,
    async execute(args) {
      const executable = findFreeCad()
      if (executable === null) {
        throw new Error('FreeCAD was not found — install FreeCAD or point FREECAD_BIN at its console binary (freecadcmd)')
      }
      if (!Array.isArray(args.steps) || args.steps.length === 0) {
        throw new Error('steps must be a non-empty array of ops')
      }
      for (const [index, op] of (args.steps as Array<Record<string, unknown>>).entries()) {
        if (typeof op !== 'object' || op === null || typeof op.kind !== 'string') {
          throw new Error(`steps[${index}] is not an op (missing "kind")`)
        }
      }

      const names: Record<string, string> = {}
      for (const op of args.steps as Array<{ bodyId?: string; name?: string }>) {
        if (typeof op.bodyId === 'string' && typeof op.name === 'string') names[op.bodyId] = op.name
      }

      const program: Parameters<typeof runFreeCadProgram>[0] = { ops: args.steps as Array<Record<string, unknown>>, names }
      if (args.input !== undefined) {
        const resolved = resolveWorkspacePath(args.input, deps.workspaceRoot)
        const extension = resolved.toLowerCase().split('.').pop() ?? ''
        if (!INPUT_EXTENSIONS.has(extension)) throw new Error(`input must be one of .step .stp .brep .stl (got .${extension})`)
        program.input = { format: extension as 'step' | 'stp' | 'brep' | 'stl', path: resolved, bodyId: 'input' }
      }
      if (args.exportPath !== undefined) {
        const resolved = resolveWorkspacePath(args.exportPath, deps.workspaceRoot)
        const extension = resolved.toLowerCase().split('.').pop() ?? ''
        if (!EXPORT_EXTENSIONS.has(extension)) throw new Error(`exportPath must be .step or .stl (got .${extension})`)
        program.export = { format: extension as 'step' | 'stp' | 'stl', path: resolved }
      }

      const result = await runFreeCadProgram(program)
      if (result.meshes.length === 0) {
        throw new Error('the FreeCAD program produced no bodies')
      }

      const viewId = `freecad-${randomUUID().slice(0, 8)}`
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
        format: 'freecad',
        file: result.exported ?? (args.input !== undefined ? args.input : 'freecad program'),
        bodies: meshes.length,
        triangles,
      }
      if (volumeEntries.length === 1) value.volume = volumeEntries[0]![1]
      if (result.exported !== undefined) value.exported = result.exported
      const sceneUrlBase = deps.ensureSceneRoute()
      if (sceneUrlBase !== null) value.sceneUrl = `${sceneUrlBase.replace('/scene', '/bin')}/${viewId}`
      return value as never
    },
    presentCall: () => ({ card: 'generic', title: 'CAD FreeCAD run', kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD FreeCAD' }),
  }) as unknown as ToolDefinition
}
