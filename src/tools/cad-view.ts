/**
 * The `cad_view` tool: load a CAD file, convert it to a renderable scene, and
 * project presentation metadata the Web UI card renders as a 3D/2D viewer.
 */
import { basename } from 'node:path'
import { defineTool } from '@deepseek-ai/dsh-tools'
import type { ToolDefinition } from '@deepseek-ai/dsh-tools'
import { detectFormat, is3DFormat } from '../convert/detect.js'
import { convert } from '../convert/index.js'
import { sceneStats } from '../types.js'
import type { SceneStore } from '../store.js'
import { loadCadFile, resolveWorkspacePath } from './util.js'

export interface CadViewToolDeps {
  store: SceneStore
  workspaceRoot: string
  /** Idempotent lazy route registration; returns the scene URL base or null. */
  ensureSceneRoute: () => string | null
}

function formatBounds(stats: ReturnType<typeof sceneStats>): string {
  if (stats.boundsMin === undefined || stats.boundsMax === undefined) return ''
  const min = stats.boundsMin
  const max = stats.boundsMax
  return `bounds [${min.map((v) => v.toFixed(2)).join(', ')}] → [${max.map((v) => v.toFixed(2)).join(', ')}]`
}

/** Build the cad_view tool definition over the scene store. */
export function createCadViewTool(deps: CadViewToolDeps): ToolDefinition {
  return defineTool({
    name: 'cad_view',
    description:
      'Open a CAD file in the interactive viewer embedded in the chat UI. ' +
      '3D: STL, OBJ, STEP (.step/.stp), IGES (.iges/.igs), BREP, DCPRT (.dcprt native part document). 2D: DXF, SVG. ' +
      'The card shows the geometry (orbit/zoom for 3D, pan/zoom for 2D) plus a geometry summary. ' +
      'Use it whenever the user wants to see, inspect, or verify CAD geometry; the returned summary carries bounds and counts.',
    parameters: {
      path: {
        type: 'string',
        required: true,
        description: 'Path to the CAD file, absolute or relative to the workspace root.',
      },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          viewId: { type: 'string', required: true, description: 'Viewer scene id.' },
          kind: { type: 'string', enum: ['3d', '2d'] as const, required: true, description: 'Viewer kind.' },
          format: { type: 'string', required: true, description: 'Detected source format.' },
          file: { type: 'string', required: true, description: 'Resolved file path.' },
          sceneUrl: { type: 'string', description: 'Same-origin JSON scene URL (web compositions only).' },
          triangles: { type: 'number', description: 'Total triangle count (3D).' },
          meshes: { type: 'number', description: 'Part count (3D).' },
          entities: { type: 'number', description: 'Drawing entity count (2D).' },
        },
      },
      render: (_args, value) => {
        const lines = [`CAD viewer: ${value.file} (${value.format.toUpperCase()}, ${value.kind.toUpperCase()})`]
        if (value.kind === '3d') {
          lines.push(`${value.meshes ?? 0} part(s), ${value.triangles ?? 0} triangles`)
        } else {
          lines.push(`${value.entities ?? 0} entities`)
        }
        return [{ type: 'text', text: lines.join('\n') }]
      },
      presentationMeta: (_args, value) => ({
        viewId: value.viewId,
        kind: value.kind,
        format: value.format,
        file: basename(value.file),
        ...(value.sceneUrl === undefined ? {} : { sceneUrl: value.sceneUrl }),
        title: `${basename(value.file)} · ${value.format.toUpperCase()}`,
        stats: {
          ...(value.meshes === undefined ? {} : { meshes: value.meshes }),
          ...(value.triangles === undefined ? {} : { triangles: value.triangles }),
          ...(value.entities === undefined ? {} : { entities: value.entities }),
        },
      }),
    },
    timeoutMs: 180_000,
    isConcurrencySafe: () => true,
    async execute(args) {
      const resolved = resolveWorkspacePath(args.path, deps.workspaceRoot)
      const name = basename(resolved)
      const format = detectFormat(name)
      if (format === null) {
        throw new Error(
          `unsupported CAD format: ${name} — supported extensions are .stl .obj .step .stp .iges .igs .brep .dcprt .dxf .svg`,
        )
      }
      const buffer = await loadCadFile(resolved)
      const scene = await convert(buffer, format, name)
      const stats = sceneStats(scene)
      const viewId = await deps.store.put(scene)
      const kind: '3d' | '2d' = is3DFormat(format) ? '3d' : '2d'
      const sceneUrlBase = deps.ensureSceneRoute()
      // Optional fields spread conditionally: an explicit undefined value
      // would fail the registry's lossless-JSON output validation.
      return {
        viewId,
        kind,
        format,
        file: resolved,
        ...(sceneUrlBase === null ? {} : { sceneUrl: `${sceneUrlBase}/${viewId}` }),
        ...(stats.triangles === undefined ? {} : { triangles: stats.triangles }),
        ...(stats.meshes === undefined ? {} : { meshes: stats.meshes }),
        ...(stats.entities === undefined ? {} : { entities: stats.entities }),
      }
    },
    presentCall: (args) => ({
      card: 'generic',
      title: `CAD view ${args.path}`,
      kind: 'other',
    }),
    presentResult: (args, result) => ({
      card: 'generic',
      title: result.isError
        ? `CAD view ${args.path} failed`
        : `CAD viewer: ${args.path}`,
    }),
  }) as ToolDefinition
}
