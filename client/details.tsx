/**
 * The resident CAD panel in the details (right) column:
 * - a selected CAD tool call renders its full-height viewport;
 * - any other selection keeps the LATEST CAD model pinned on top plus the
 *   generic call information below, so the side panel always shows what the
 *   model currently looks like.
 *
 * CadDetailsShell (below) additionally replaces the details panel body: with
 * no selection it still mounts the always-on CAD viewport — labeled XYZ triad
 * and ground grid, slowly rotating — so the right column is a 3D display from
 * the moment dsh opens.
 */
import React, { useEffect, useReducer, useRef, useState } from 'react'
import type { CadScene } from './scene-types.js'
import { mountCadEditor3D } from './viewer3d.js'
import type { CadEditorHandle, RenderMode } from './viewer3d.js'
import { readLatest, readMeta, rememberLatest, subscribeLatest, useScene, Viewport, styles, RENDER_MODES, RENDER_MODE_LABELS } from './viewport.js'

/** Demo BRep parts offered in the editor switcher (files: demo-<id>.brep). */
const DEMO_PARTS: Array<{ id: 'bracket' | 'flange' | 'shaft'; label: string }> = [
  { id: 'bracket', label: 'Bracket' },
  { id: 'flange', label: 'Flange' },
  { id: 'shaft', label: 'Shaft' },
]

export interface DetailsBlockLike {
  kind: 'tool-call' | 'tool-result'
  meta?: unknown
  isError?: boolean
  error?: { name?: string; code?: string }
  content?: ReadonlyArray<{ type: string; text?: string }>
  call?: { name: string; argsRaw: string } | null
  callId?: string
  name?: string
  argsRaw?: string
}

export interface CadDetailsProps {
  block: DetailsBlockLike
  cwd?: string
}

export function CadDetailsPanel({ block }: CadDetailsProps): JSX.Element {
  const selectedMeta = readMeta(block)
  if (selectedMeta !== undefined && block.kind === 'tool-result') rememberLatest(selectedMeta)
  const latest = readLatest()

  // Prefer the selected call when it is CAD; otherwise pin the latest model.
  const shown = selectedMeta ?? latest?.meta
  const isGenericSelection = selectedMeta === null

  return (
    <div style={panelStyles.root}>
      {shown !== undefined ? (
        <div style={panelStyles.viewportSection}>
          <div style={panelStyles.caption}>
            {selectedMeta !== null ? 'CAD viewport' : 'Latest CAD model'}
          </div>
          <LatestScene meta={shown} height={isGenericSelection ? 300 : undefined} />
        </div>
      ) : null}
      {isGenericSelection ? (
        <GenericCallInfo block={block} />
      ) : (
        <SceneSummary meta={shown} />
      )}
    </div>
  )
}

/** Viewport for a meta, keyed by sceneUrl so the refetch path stays simple. */
function LatestScene({ meta, height }: { meta: NonNullable<ReturnType<typeof readLatest>>['meta']; height?: number }): JSX.Element {
  const { scene, error } = useScene(meta.sceneUrl)
  return (
    <div key={meta.sceneUrl ?? meta.viewId} style={{ flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={panelStyles.titleRow}>
        <span style={panelStyles.title}>{meta.title}</span>
      </div>
      <Viewport scene={scene} error={error} height={height ?? 'calc(100vh - 210px)'} />
    </div>
  )
}

function SceneSummary({ meta }: { meta: { stats: { meshes?: number; triangles?: number; entities?: number } } | undefined }): JSX.Element {
  if (meta === undefined) return <></>
  const stats = meta.stats
  const parts: string[] = []
  if (stats.meshes !== undefined) parts.push(`${stats.meshes} bodies`)
  if (stats.triangles !== undefined) parts.push(`${stats.triangles.toLocaleString()} triangles`)
  if (stats.entities !== undefined) parts.push(`${stats.entities.toLocaleString()} entities`)
  return <div style={panelStyles.summary}>{parts.join(' · ')}</div>
}

/** Generic (non-CAD) call information, so replacing the default details view loses nothing. */
function GenericCallInfo({ block }: { block: DetailsBlockLike }): JSX.Element {
  const name = block.call?.name ?? block.name ?? 'tool call'
  const argsRaw = block.call?.argsRaw ?? block.argsRaw
  const texts = (block.content ?? [])
    .filter((content): content is { type: 'text'; text: string } => content.type === 'text')
    .map((content) => content.text)
  return (
    <div style={panelStyles.infoSection}>
      <div style={panelStyles.caption}>{name}</div>
      {argsRaw !== undefined ? (
        <details style={panelStyles.infoBlock}>
          <summary style={panelStyles.summaryLine}>Arguments</summary>
          <pre style={panelStyles.pre}>{prettyJson(argsRaw)}</pre>
        </details>
      ) : null}
      {texts.length > 0 ? (
        <details open style={panelStyles.infoBlock}>
          <summary style={panelStyles.summaryLine}>Result</summary>
          <pre style={panelStyles.pre}>{texts.join('\n').slice(0, 20_000)}</pre>
        </details>
      ) : null}
      {block.isError === true ? (
        <div style={{ ...styles.error }}>
          {block.error?.code !== undefined ? `${block.error.code}: ` : ''}call failed
        </div>
      ) : null}
    </div>
  )
}

function prettyJson(argsRaw: string): string {
  try {
    return JSON.stringify(JSON.parse(argsRaw), null, 2)
  } catch {
    return argsRaw
  }
}

const panelStyles: Record<string, React.CSSProperties> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    padding: '8px 10px 12px',
    gap: 10,
  },
  viewportSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  caption: {
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  titleRow: { display: 'flex', alignItems: 'baseline', gap: 8 },
  title: { fontWeight: 600, fontSize: 13 },
  summary: {
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    fontSize: 12,
    padding: '0 2px',
  },
  infoSection: { display: 'flex', flexDirection: 'column', gap: 8 },
  infoBlock: { fontSize: 12 },
  summaryLine: { cursor: 'pointer', color: 'var(--dsw-alias-label-secondary, #374151)' },
  pre: {
    margin: '6px 0 0',
    padding: 8,
    borderRadius: 8,
    background: 'var(--dsw-alias-markdown-code-block, #f6f8fa)',
    fontSize: 11,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    maxHeight: 240,
    overflow: 'auto',
  },
  shellRoot: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
  },
  shellHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    flex: 'none',
  },
  shellTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--dsw-alias-label-secondary, #374151)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  closeButton: {
    border: 'none',
    background: 'transparent',
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    fontSize: 13,
    cursor: 'pointer',
    padding: '2px 6px',
    borderRadius: 6,
  },
  emptyViewport: {
    width: '100%',
    height: 'calc(100vh - 190px)',
    minHeight: 260,
    background: 'var(--dsh-cad-bg, linear-gradient(#f5f6f8, #e9ecf0))',
    borderRadius: 10,
    overflow: 'hidden',
  },
  emptyHint: {
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    fontSize: 11,
    padding: '6px 2px 0',
  },
  viewRoot: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
    padding: '10px 12px 12px',
    gap: 8,
  },
}

// ── details panel body (shadows the default Details shell) ─────────────────

/**
 * The CAD editor viewport: the demo example L-bracket loads by default with
 * face + edge rendering; the mode toggle cycles Faces+Edges / Faces /
 * Wireframe, and the ViewCube home button resets the view.
 */
function CadEditorViewport({ caption }: { caption?: string }): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const handleRef = useRef<CadEditorHandle | null>(null)
  const [mode, setMode] = useState<RenderMode>('shaded-edges')
  const [source, setSource] = useState<'brep' | 'fallback' | 'loading'>('loading')
  const [part, setPart] = useState<'bracket' | 'flange' | 'shaft'>('bracket')

  useEffect(() => {
    const container = containerRef.current
    if (container === null) return
    const handle = mountCadEditor3D(container, { onSource: setSource, part: 'bracket' })
    handleRef.current = handle
    return () => {
      handle.dispose()
      handleRef.current = null
    }
  }, [])

  useEffect(() => {
    handleRef.current?.setRenderMode(mode)
  }, [mode])

  const selectPart = (next: 'bracket' | 'flange' | 'shaft'): void => {
    if (next === part) return
    setPart(next)
    setSource('loading')
    handleRef.current?.loadPart(next)
  }

  const cycleMode = () => {
    setMode((previous) => RENDER_MODES[(RENDER_MODES.indexOf(previous) + 1) % RENDER_MODES.length])
  }

  return (
    <div style={panelStyles.viewportSection}>
      <div style={panelStyles.caption}>
        {caption ?? 'CAD editor'}
        {source === 'brep' ? ` · demo-${part}.brep` : source === 'fallback' ? ' · 本地兜底' : ' · 加载中…'}
      </div>
      <div style={{ ...panelStyles.emptyViewport, position: 'relative' }}>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        <div style={styles.toolbar}>
          {DEMO_PARTS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              style={{ ...styles.button, ...(part === entry.id ? { background: 'var(--dsw-alias-label-primary,#4d6bfe)', color: '#fff', borderColor: 'transparent' } : {}) }}
              onClick={() => { selectPart(entry.id) }}
              aria-pressed={part === entry.id}
            >
              {entry.label}
            </button>
          ))}
          <button type="button" style={styles.button} onClick={cycleMode} aria-pressed={mode === 'wireframe'}>
            {RENDER_MODE_LABELS[mode]}
          </button>
        </div>
      </div>
      <div style={panelStyles.emptyHint}>
        CAD 编辑器就绪——示例件（支架 / 法兰 / 轴）均由本地 .brep 文件经 OCCT 解析（文件与显示一一对应），可切换；悬停/点选面与边可查看测量；运行 CAD 工具后自动跟踪最新模型
      </div>
    </div>
  )
}

interface DetailsShellProps {
  /** Details store selector (selection state). */
  useStore?: <S>(selector: (state: { selection: unknown }) => S) => S
  /** Conversation snapshot selector (session standard kit). */
  useSession?: <S>(selector: (snapshot: unknown) => S) => S
  closeDetails?: () => void
}

/**
 * The details panel body: header with the panel close button, then either the
 * selected tool's CAD/generic panel or — with nothing selected — the always-on
 * empty CAD viewport.
 */
export function CadDetailsShell(props: DetailsShellProps): JSX.Element {
  const selection = props.useStore?.((state) => state.selection) ?? null
  const callId = (selection as { callId?: string } | null)?.callId
  // Hooks must run unconditionally: call the selector every render and let it
  // return undefined while nothing is selected.
  const block = props.useSession?.((snapshot) => {
    if (callId === undefined) return undefined
    const nodes = (snapshot as { nodes?: Array<Record<string, unknown>> }).nodes ?? []
    const settled = nodes.find(
      (node) => node.kind === 'tool-result' && node.callId === callId,
    )
    if (settled !== undefined) return settled
    const running = (snapshot as { runningCalls?: Array<Record<string, unknown>> }).runningCalls ?? []
    return running.find((call) => call.callId === callId)
  })

  return (
    <div style={panelStyles.shellRoot}>
      <div style={panelStyles.shellHeader}>
        <span style={panelStyles.shellTitle}>Details</span>
        {props.closeDetails !== undefined ? (
          <button type="button" style={panelStyles.closeButton} onClick={props.closeDetails} aria-label="Close details">
            ✕
          </button>
        ) : null}
      </div>
      {callId !== undefined && block !== undefined && block !== null ? (
        <CadDetailsPanel block={block as DetailsBlockLike} />
      ) : (
        <CadEditorViewport />
      )}
    </div>
  )
}

// ── development error surfacing ─────────────────────────────────────────────

interface BoundaryProps { children: React.ReactNode }
interface BoundaryState { error: Error | null }

/** Catches render errors (a crashing slot entry abdicates silently otherwise). */
export class CadErrorBoundary extends React.Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { error: null }
  static getDerivedStateFromError(error: Error): BoundaryState {
    try {
      document.documentElement.setAttribute('data-cad-err', String(error?.message ?? error).slice(0, 300))
    } catch { /* ignore */ }
    return { error }
  }
  render(): React.ReactNode {
    if (this.state.error !== null) {
      return (
        <div style={{ color: '#b91c1c', fontSize: 11, padding: 12 }}>
          CAD panel error: {String(this.state.error.message ?? this.state.error)}
        </div>
      )
    }
    return this.props.children
  }
}

// ── the resident "3D" conversation view tab ────────────────────────────────

/**
 * Content of the "3D" tab in the conversation view ring: the always-on CAD
 * viewport. Before any CAD operation it shows the labeled XYZ triad and grid
 * (slowly rotating, Z-up); once a CAD tool produces a scene it tracks the
 * latest model live.
 */
interface CadModelViewProps {
  /** Conversation snapshot selector (session standard kit on view-slot entries). */
  useSession?: <S>(selector: (snapshot: unknown) => S) => S
}

export function CadModelView(props: CadModelViewProps = {}): JSX.Element {
  // Authoritative source: the newest CAD presentationMeta in the conversation
  // snapshot (reactive — works while the Chat tab is hidden, when CAD cards
  // are not rendered). Card-driven memory is the fallback.
  const sessionMeta = props.useSession?.((snapshot) => {
    const nodes = (snapshot as { nodes?: Array<Record<string, unknown>> } | null)?.nodes ?? []
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i]
      if (node === undefined) continue
      const meta = node.meta as { viewId?: string; kind?: string } | undefined
      if (node.kind === 'tool-result' && typeof meta?.viewId === 'string' && (meta.kind === '3d' || meta.kind === '2d')) {
        return node.meta
      }
    }
    return undefined
  })
  const [, forceUpdate] = useReducer((tick: number) => tick + 1, 0)
  useEffect(() => subscribeLatest(() => { forceUpdate() }), [])
  const latest = sessionMeta !== undefined ? { meta: sessionMeta as never } : readLatest()
  return (
    <div style={panelStyles.viewRoot}>
      {latest !== null ? (
        <div style={panelStyles.viewportSection}>
          <div style={panelStyles.caption}>Latest CAD model · {latest.meta.title}</div>
          <LatestScene meta={latest.meta} height="calc(100vh - 250px)" />
        </div>
      ) : (
        <CadEditorViewport />
      )}
    </div>
  )
}
