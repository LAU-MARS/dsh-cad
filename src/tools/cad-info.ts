/**
 * The `cad_info` tool: geometry metadata without rendering — format, counts,
 * bounds, units, and DXF layer names.
 */
import { defineTool } from '@deepseek-ai/dsh-tools'
import type { ToolDefinition } from '@deepseek-ai/dsh-tools'
import { detectFormat } from '../convert/detect.js'
import { convert } from '../convert/index.js'
import { sceneStats } from '../types.js'
import { loadCadFile, resolveWorkspacePath } from './util.js'

export interface CadInfoToolDeps {
  workspaceRoot: string
}

/** Build the cad_info tool definition. */
export function createCadInfoTool(deps: CadInfoToolDeps): ToolDefinition {
  return defineTool({
    name: 'cad_info',
    description:
      'Inspect a CAD file and return geometry metadata only (no viewer): format, part/triangle or entity counts, ' +
      'axis-aligned bounds, units (STEP/IGES/DCPRT), and layer names (DXF). Cheaper than cad_view when only numbers are needed.',
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
          format: { type: 'string', required: true, description: 'Detected source format.' },
          file: { type: 'string', required: true, description: 'Resolved file path.' },
          kind: { type: 'string', enum: ['3d', '2d'] as const, required: true },
          meshes: { type: 'number', description: 'Part count (3D).' },
          triangles: { type: 'number', description: 'Total triangle count (3D).' },
          entities: { type: 'number', description: 'Drawing entity count (2D).' },
          layers: { type: 'array', items: { type: 'string' }, description: 'Layer names (DXF).' },
          units: { type: 'string', description: 'Source units (3D).' },
          boundsMin: { type: 'array', items: { type: 'number' }, description: 'Bounds minimum (xyz for 3D, xy for 2D).' },
          boundsMax: { type: 'array', items: { type: 'number' }, description: 'Bounds maximum (xyz for 3D, xy for 2D).' },
        },
      },
      render: (_args, value) => {
        const lines = [`${value.file} — ${value.format.toUpperCase()} (${value.kind.toUpperCase()})`]
        if (value.kind === '3d') {
          lines.push(`parts: ${value.meshes ?? 0}`)
          lines.push(`triangles: ${value.triangles ?? 0}`)
          if (value.units !== undefined) lines.push(`units: ${value.units}`)
        } else {
          lines.push(`entities: ${value.entities ?? 0}`)
          if ((value.layers ?? []).length > 0) lines.push(`layers: ${(value.layers ?? []).join(', ')}`)
        }
        if (value.boundsMin !== undefined && value.boundsMax !== undefined) {
          lines.push(
            `bounds: [${value.boundsMin.map((v) => v.toFixed(3)).join(', ')}] → [${value.boundsMax.map((v) => v.toFixed(3)).join(', ')}]`,
          )
        }
        return [{ type: 'text', text: lines.join('\n') }]
      },
    },
    timeoutMs: 180_000,
    isConcurrencySafe: () => true,
    async execute(args) {
      const resolved = resolveWorkspacePath(args.path, deps.workspaceRoot)
      const name = resolved.split('/').pop() ?? resolved
      const format = detectFormat(name)
      if (format === null) {
        throw new Error(
          `unsupported CAD format: ${name} — supported extensions are .stl .obj .step .stp .iges .igs .brep .dcprt .dxf .svg`,
        )
      }
      const buffer = await loadCadFile(resolved)
      const scene = await convert(buffer, format, name)
      const stats = sceneStats(scene)
      // Optional fields spread conditionally: an explicit undefined value
      // would fail the registry's lossless-JSON output validation.
      return {
        format: stats.format,
        file: resolved,
        kind: scene.kind,
        ...(stats.meshes === undefined ? {} : { meshes: stats.meshes }),
        ...(stats.triangles === undefined ? {} : { triangles: stats.triangles }),
        ...(stats.entities === undefined ? {} : { entities: stats.entities }),
        ...(stats.layers === undefined ? {} : { layers: stats.layers }),
        ...(stats.units === undefined ? {} : { units: stats.units }),
        ...(stats.boundsMin === undefined ? {} : { boundsMin: stats.boundsMin }),
        ...(stats.boundsMax === undefined ? {} : { boundsMax: stats.boundsMax }),
      }
    },
    presentCall: (args) => ({
      card: 'generic',
      title: `CAD info ${args.path}`,
      kind: 'read',
    }),
  }) as ToolDefinition
}
