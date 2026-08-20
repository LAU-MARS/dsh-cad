/**
 * cad_image_profile: PNG image → 2D contours → extrusion-ready polygon.
 * Binarizes (Otsu or manual), traces outer contours, simplifies them, and
 * renders a 2D preview card. The largest contour's points are returned so the
 * agent can continue the pipeline with cad_extrude_profile (+ cad_boolean
 * for holes). Never touches the shared modeling worker.
 */
import { defineTool } from '@deepseek-ai/dsh-tools'
import type { ToolDefinition } from '@deepseek-ai/dsh-tools'
import type { SceneStore } from '../store.js'
import type { CadDrawing2D } from '../types.js'
import { decodePng } from '../convert/png.js'
import { extractProfiles } from '../image/profile.js'
import { loadCadFile, resolveWorkspacePath } from './util.js'

export interface CadImageToolDeps {
  store: SceneStore
  workspaceRoot: string
  ensureSceneRoute: () => string | null
}

export function createCadImageTool(deps: CadImageToolDeps): ToolDefinition {
  return defineTool({
    name: 'cad_image_profile',
    description:
      'Extract 2D part contours from a PNG image (sketch, screenshot, or exported drawing): auto-thresholds (Otsu, override with `threshold`; `invert` for light-on-dark), ' +
      'traces and simplifies outer contours, and renders them in a 2D preview card. Returns the largest contour as flat [x,y,…] points (mm, y-up, `scale` px/mm) ' +
      'ready for cad_extrude_profile; pass the points on to continue the modeling pipeline.',
    parameters: {
      path: { type: 'string', required: true, description: 'Path to the PNG image, absolute or relative to the workspace root.' },
      threshold: { type: 'number', description: 'Manual binarization threshold 0–255 (default: Otsu auto).' },
      invert: { type: 'boolean', description: 'Trace light shapes on a dark background.' },
      tolerance: { type: 'number', description: 'Contour simplification tolerance in pixels (default 1.5).' },
      scale: { type: 'number', description: 'Pixels per mm (default 1).' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          viewId: { type: 'string', required: true, description: 'Viewer scene id.' },
          kind: { type: 'string', required: true, description: 'Always "2d".' },
          format: { type: 'string', required: true, description: 'Always "image".' },
          file: { type: 'string', required: true, description: 'Source image path.' },
          entities: { type: 'number', required: true, description: 'Contours extracted.' },
          sceneUrl: { type: 'string', description: 'Viewer URL (web compositions).' },
          points: { type: 'array', items: { type: 'number' }, description: 'Largest contour, flat [x0,y0,x1,y1,…] mm — feed to cad_extrude_profile.' },
        },
      },
      render: (_args, value) => {
        const record = value as unknown as Record<string, unknown>
        const count = Array.isArray(record.points) ? (record.points as number[]).length / 2 : 0
        return [{ type: 'text', text: `image profile: ${String(record.entities)} contour(s); largest = ${count} points (mm, y-up) — extrude with cad_extrude_profile` }]
      },
      presentationMeta: (_args, value) => {
        const record = value as unknown as Record<string, unknown>
        return {
          viewId: String(record.viewId),
          kind: '2d' as const,
          format: 'image',
          file: String(record.file),
          ...(record.sceneUrl === undefined ? {} : { sceneUrl: String(record.sceneUrl) }),
          title: `${String(record.file)} · contours`,
          stats: { entities: Number(record.entities) },
        }
      },
    },
    timeoutMs: 120_000,
    isConcurrencySafe: () => true,
    async execute(args) {
      const resolved = resolveWorkspacePath(args.path, deps.workspaceRoot)
      const buffer = await loadCadFile(resolved)
      const image = decodePng(buffer)
      const profiles = extractProfiles(image, {
        ...(args.threshold === undefined ? {} : { threshold: args.threshold }),
        ...(args.invert === undefined ? {} : { invert: args.invert }),
        ...(args.tolerance === undefined ? {} : { tolerance: args.tolerance }),
        ...(args.scale === undefined ? {} : { scale: args.scale }),
      })
      if (profiles.length === 0) {
        throw new Error('no contours found — try a manual threshold or invert for light-on-dark images')
      }

      const top = profiles.slice(0, 8)
      const scene: CadDrawing2D = {
        kind: '2d',
        format: 'image',
        entities: top.map((profile, index) => ({
          type: 'polyline' as const,
          points: profile.points,
          closed: true,
          layer: index === 0 ? 'OUTER' : 'CONTOUR',
        })),
        bounds: boundsOf(top.map((profile) => profile.points)),
        layers: ['OUTER', 'CONTOUR'],
      }
      const viewId = await deps.store.put(scene)

      const value: Record<string, unknown> = {
        viewId,
        kind: '2d',
        format: 'image',
        file: resolved,
        entities: top.length,
        points: top[0]!.points,
      }
      const sceneUrlBase = deps.ensureSceneRoute()
      if (sceneUrlBase !== null) value.sceneUrl = `${sceneUrlBase}/${viewId}`
      return value as never
    },
    presentCall: (args) => ({ card: 'generic', title: `CAD image profile ${String(args.path)}`, kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: 'CAD image profile' }),
  }) as unknown as ToolDefinition
}

function boundsOf(polygons: number[][]): CadDrawing2D['bounds'] {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const points of polygons) {
    for (let i = 0; i < points.length; i += 2) {
      if (points[i]! < minX) minX = points[i]!
      if (points[i + 1]! < minY) minY = points[i + 1]!
      if (points[i]! > maxX) maxX = points[i]!
      if (points[i + 1]! > maxY) maxY = points[i + 1]!
    }
  }
  return { min: { x: minX, y: minY }, max: { x: maxX, y: maxY } }
}
