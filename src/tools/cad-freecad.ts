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

const OP_KINDS = new Set(['create_prim', 'extrude_profile', 'boolean', 'fillet', 'transform', 'volume', 'delete', 'reset'])
const BOOLEANS = new Set(['cut', 'fuse', 'common'])
const PRIMITIVES = new Set(['box', 'cylinder', 'sphere', 'cone', 'torus'])
const PRIM_FIELDS = ['dx', 'dy', 'dz', 'radius', 'radius1', 'radius2', 'height', 'majorRadius', 'minorRadius', 'at', 'axis']

/**
 * LLM callers emit op shapes liberally. Normalize the common variants onto
 * the canonical op shape before validation/execution:
 *  - {op:"cut", target, tools}              → {kind:"boolean", op:"cut", ...}
 *  - {op:"create_prim", kind:"box", dx:...} → {kind:"create_prim", prim:"box", params:{dx:...}}
 *  - {kind:"create_prim", prim, dx:...}     → params folded in
 */
export function normalizeFreeCadSteps(raw: unknown[]): Array<Record<string, unknown>> {
  return raw.map((step) => {
    if (typeof step !== 'object' || step === null) return step as Record<string, unknown>
    const source = { ...(step as Record<string, unknown>) }

    // {op:"cut"|"fuse"|"common", ...} without a kind
    if (typeof source.op === 'string' && BOOLEANS.has(source.op) && source.kind === undefined) {
      return { kind: 'boolean', op: source.op, target: source.target, tools: source.tools }
    }

    // {op:"<opKind>", ...} — op as the discriminator (kind may name the primitive)
    if (typeof source.op === 'string' && OP_KINDS.has(source.op) && !OP_KINDS.has(source.kind as string)) {
      const kind = source.op
      delete source.op
      if (kind === 'create_prim') {
        const prim = typeof source.prim === 'string' ? source.prim : PRIMITIVES.has(source.kind as string) ? (source.kind as string) : undefined
        if (source.kind !== undefined && !OP_KINDS.has(source.kind as string)) delete source.kind
        if (prim !== undefined) source.prim = prim
      }
      source.kind = kind
    }

    // fold inline primitive fields into params
    if (source.kind === 'create_prim') {
      const params = typeof source.params === 'object' && source.params !== null ? { ...(source.params as Record<string, unknown>) } : {}
      let folded = false
      for (const field of PRIM_FIELDS) {
        if (source[field] !== undefined) {
          params[field] = source[field]
          delete source[field]
          folded = true
        }
      }
      if (folded) source.params = params
    }
    return source
  })
}

export function createFreeCadTool(deps: FreeCadToolDeps): ToolDefinition {
  return defineTool({
    name: 'cad_freecad',
    description:
      'Run a feature program on an external FreeCAD executor (requires FreeCAD installed locally or FREECAD_BIN set). ' +
      '`steps` is an array of the same ops the built-in kernel uses: create_prim (box/cylinder/sphere/cone/torus with at/axis), ' +
      'extrude_profile, boolean (fuse/cut/common), fillet, transform, volume, delete, reset. ' +
      'Optionally `input` loads a STEP/STP/BREP/STL file as body "input" first, and `exportPath` (.step/.stl) writes the final result. ' +
      'The rebuilt meshes render in the same viewer card, and by default the program also runs in the FreeCAD GUI — the window ' +
      'opens with the bodies loaded and stays open, so the user can inspect the model in FreeCAD itself (it doubles as a viewer). ' +
      'Set `headless: true` only for pure exports/automation where no window is wanted.',
    parameters: {
      steps: {
        type: 'array',
        required: true,
        description:
          'Ops executed in order. Canonical shapes: ' +
          '{kind:"create_prim", bodyId, prim:"box|cylinder|sphere|cone|torus", params:{dx,dy,dz | radius,height | radius1,radius2,height | majorRadius,minorRadius, at:[x,y,z], axis:[x,y,z]}}, ' +
          '{kind:"extrude_profile", bodyId, points:[x0,y0,x1,y1,...], height}, ' +
          '{kind:"boolean", op:"cut|fuse|common", target, tools:[bodyIds]}, ' +
          '{kind:"fillet", target, radius}, ' +
          '{kind:"transform", target, translate:[x,y,z], rotate:[rx,ry,rz] deg, mirror:[x,y,z]}, ' +
          '{kind:"volume", target}, {kind:"delete", target}, {kind:"reset"}.',
      },
      input: { type: 'string', description: 'Optional CAD file to load first (STEP .step/.stp, BREP, STL), absolute or workspace-relative.' },
      exportPath: { type: 'string', description: 'Optional export destination; extension selects .step or .stl.' },
      headless: { type: 'boolean', description: 'Run in the console binary without opening the FreeCAD window (pure exports/automation).' },
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
          opened: { type: 'boolean', description: 'FreeCAD GUI opened with the result.' },
        },
      },
      render: (_args, value) => {
        const record = value as unknown as Record<string, unknown>
        const lines = [`freecad: ${String(record.bodies)} bodies, ${String(record.triangles)} triangles`]
        if (record.volume !== undefined) lines.push(`volume: ${Number(record.volume).toFixed(2)} mm³`)
        if (record.exported !== undefined) lines.push(`written: ${String(record.exported)}`)
        if (record.opened === true) lines.push('FreeCAD GUI opened — the window stays open for inspection')
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
      const steps = normalizeFreeCadSteps(args.steps)
      for (const [index, op] of steps.entries()) {
        if (typeof op !== 'object' || op === null || !OP_KINDS.has(String(op.kind))) {
          throw new Error(`steps[${index}] is not an op (missing "kind")`)
        }
      }

      const names: Record<string, string> = {}
      for (const op of steps as Array<{ bodyId?: string; name?: string }>) {
        if (typeof op.bodyId === 'string' && typeof op.name === 'string') names[op.bodyId] = op.name
      }

      const program: Parameters<typeof runFreeCadProgram>[0] = { ops: steps, names }
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

      const gui = args.headless !== true
      if (gui) program.display = true
      const result = await runFreeCadProgram(program, gui ? { gui: true } : {})
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
      if (args.headless !== true) value.opened = true
      const sceneUrlBase = deps.ensureSceneRoute()
      if (sceneUrlBase !== null) value.sceneUrl = `${sceneUrlBase.replace('/scene', '/bin')}/${viewId}`
      return value as never
    },
    presentCall: () => ({ card: 'generic', title: 'CAD FreeCAD run', kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD FreeCAD' }),
  }) as unknown as ToolDefinition
}
