/**
 * The cad_view tool card: fetches the scene JSON projected by the tool's
 * presentationMeta and renders the 3D or 2D viewport inline in the chat.
 * Every settled CAD card also feeds the right-side details panel's
 * "latest model" memory.
 */
import type { CadViewMeta } from './scene-types.js'
import { readMeta, rememberLatest, useScene, Viewport, styles } from './viewport.js'

export interface ToolCallBlockLike {
  kind: 'tool-call' | 'tool-result'
  meta?: unknown
  isError?: boolean
  error?: { message?: string }
}

export interface CadCardProps {
  callId: string
  toolName: string
  block: ToolCallBlockLike
  cwd?: string
}

const VIEWPORT_HEIGHT = 360

export function CadCard({ block }: CadCardProps): JSX.Element {
  const meta = block.kind === 'tool-result' ? readMeta(block) : undefined
  const { scene, error } = useScene(meta?.sceneUrl)

  if (meta !== undefined) rememberLatest(meta)

  if (meta === undefined) {
    // Running state or a result without our metadata: show a quiet placeholder.
    return <div style={styles.placeholder}>{block.kind === 'tool-call' ? 'Converting CAD…' : 'CAD result'}</div>
  }

  return (
    <div style={cardStyles.card}>
      <div style={cardStyles.header}>
        <span style={cardStyles.title}>{meta.title}</span>
        <span style={cardStyles.stats}>{statsLine(meta)}</span>
      </div>
      <Viewport scene={scene} error={error} height={VIEWPORT_HEIGHT} />
      <div style={cardStyles.footer}>
        {scene === null
          ? (meta.sceneUrl === undefined ? 'headless composition: viewer unavailable, see summary above' : 'loading geometry…')
          : footerLine(scene)}
      </div>
    </div>
  )
}

function statsLine(meta: CadViewMeta): string {
  if (meta.kind === '3d') {
    const parts: string[] = []
    if (meta.stats.meshes !== undefined) parts.push(`${meta.stats.meshes} part${meta.stats.meshes === 1 ? '' : 's'}`)
    if (meta.stats.triangles !== undefined) parts.push(`${meta.stats.triangles.toLocaleString()} triangles`)
    return parts.join(' · ')
  }
  if (meta.stats.entities !== undefined) return `${meta.stats.entities.toLocaleString()} entities`
  return ''
}

function footerLine(scene: Parameters<typeof Viewport>[0]['scene'] & {}): string {
  if (scene === null) return ''
  if (scene.kind === '3d') {
    const bounds = scene.bounds
    const size = [
      bounds.max.x - bounds.min.x,
      bounds.max.y - bounds.min.y,
      bounds.max.z - bounds.min.z,
    ].map((value) => value.toFixed(2))
    return `size ${size.join(' × ')} ${scene.units === 'unitless' ? '' : scene.units}`.trim()
  }
  const bounds = scene.bounds
  const size = [(bounds.max.x - bounds.min.x).toFixed(2), (bounds.max.y - bounds.min.y).toFixed(2)]
  const layers = scene.layers.length > 0 ? ` · ${scene.layers.length} layers` : ''
  return `extent ${size.join(' × ')}${layers}`
}

const cardStyles: Record<string, React.CSSProperties> = {
  card: {
    border: '1px solid var(--dsw-alias-border-l1, #d7dbe0)',
    borderRadius: 10,
    margin: '6px 0',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 720,
    background: 'var(--dsw-alias-bg-base, #fff)',
  },
  header: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 12,
    padding: '8px 12px',
  },
  title: { fontWeight: 600, fontSize: 13 },
  stats: { fontSize: 12, color: 'var(--dsw-alias-label-tertiary, #6b7280)' },
  footer: {
    borderTop: '1px solid var(--dsw-alias-border-l1, #e5e7eb)',
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    fontSize: 11,
    padding: '5px 12px',
  },
}
