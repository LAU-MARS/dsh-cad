/**
 * The resident CAD display panel — the right-hand part of the conversation
 * (center) column. Registered as an additive `shell.overlay` entry (the frame's
 * floating layer, root scope): the panel docks itself to the center column's
 * right edge and, while expanded, writes an inline padding-right on the center
 * column so the chat content and composer re-flow left instead of being
 * covered — the panel reads as a real fourth region of the frame.
 *
 * Lifecycle per the product contract: expanded by default from launch, an
 * empty placeholder while the conversation has produced no CAD yet, then a
 * live-syncing viewport tracking the newest CAD model of the CURRENT session
 * (session snapshot scan; the card-fed latest-memory is the no-sessions
 * fallback).
 */
import React, { useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState, useSyncExternalStore } from 'react'
import type { CadViewMeta } from './scene-types.js'
import { readLatest, subscribeLatest, useScene, Viewport } from './viewport.js'

// ── harness services (structural, defensive) ────────────────────────────────

/**
 * The slice of `ctx.sessions` the panel needs: resolving the current session's
 * conversation observable. Structural so a missing service degrades to the
 * latest-memory fallback instead of throwing.
 */
export interface SessionsLike {
  binding?(id: string): { session: { getSnapshot(): unknown; subscribe(fn: () => void): () => void } } | undefined
}

/** Root-scope standard kit: the useSessions selector hook arrives as a prop. */
export interface CadSidePanelProps {
  useSessions?: <S>(selector: (state: { current?: string }) => S) => S
}

/** Newest CAD presentation meta in a conversation snapshot, or undefined. */
function scanNewestCadMeta(snapshot: unknown): CadViewMeta | undefined {
  const nodes = (snapshot as { nodes?: Array<Record<string, unknown>> } | null)?.nodes ?? []
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i]
    if (node === undefined) continue
    const meta = node.meta as Partial<CadViewMeta> | null | undefined
    if (node.kind === 'tool-result' && typeof meta?.viewId === 'string' && (meta.kind === '3d' || meta.kind === '2d')) {
      return meta as CadViewMeta
    }
  }
  return undefined
}

const noopSubscribe = (): (() => void) => () => {}

/**
 * The freshest CAD meta of the current session. The session observable is
 * authoritative (reactive whatever tab is visible); the card-fed latest-memory
 * only drives the panel when the sessions service is unreachable.
 */
function useLatestCadMeta(
  useSessions: CadSidePanelProps['useSessions'],
  sessions: SessionsLike | undefined,
): CadViewMeta | null {
  const current = useSessions?.((state) => state.current)
  const face = useMemo(() => {
    if (sessions === undefined || current === undefined) return undefined
    return sessions.binding?.(current)?.session
  }, [sessions, current])

  const subscribe = useMemo(() => {
    if (face === undefined) return noopSubscribe
    return (onChange: () => void): (() => void) => face.subscribe(onChange)
  }, [face])
  const getMeta = useMemo(() => {
    if (face === undefined) return (): undefined => undefined
    return (): CadViewMeta | undefined => scanNewestCadMeta(face.getSnapshot())
  }, [face])
  const sessionMeta = useSyncExternalStore(subscribe, getMeta)

  // Card-driven memory keeps the no-sessions fallback current.
  const [, forceUpdate] = useReducer((tick: number) => tick + 1, 0)
  useEffect(() => subscribeLatest(() => { forceUpdate() }), [])

  if (sessions !== undefined) return sessionMeta ?? null
  return readLatest()?.meta ?? null
}

// ── frame geometry (docking + yielding) ──────────────────────────────────────

interface Anchors {
  frame: HTMLElement | null
  detailsCol: HTMLElement | null
  centerCol: HTMLElement | null
}

/**
 * Locate the AppFrame columns from the panel's own overlay root. The frame's
 * DOM child order is [sidebarCol, centerCol, detailsCol, overlayLayer] and the
 * overlay layer carries the stable `data-shell-overlay` marker (hashed class
 * names are never relied on); every hop is checked, missing anchors degrade.
 */
function findAnchors(root: HTMLElement): Anchors {
  const layer = root.closest('[data-shell-overlay]')
  if (!(layer instanceof HTMLElement)) return { frame: null, detailsCol: null, centerCol: null }
  const frame = layer.parentElement instanceof HTMLElement ? layer.parentElement : null
  const detailsCol = layer.previousElementSibling instanceof HTMLElement ? layer.previousElementSibling : null
  const centerCol =
    detailsCol?.previousElementSibling instanceof HTMLElement ? detailsCol.previousElementSibling : null
  return { frame, detailsCol, centerCol }
}

interface DockGeometry {
  /** Distance from the frame's right edge to the center column's right edge. */
  right: number
  /** Live center-column width (clamps the panel on narrow frames). */
  centerWidth: number
}

function measureGeometry({ frame, detailsCol, centerCol }: Anchors): DockGeometry {
  if (detailsCol !== null && centerCol !== null) {
    return {
      right: detailsCol.getBoundingClientRect().width,
      centerWidth: centerCol.getBoundingClientRect().width,
    }
  }
  // Fallback: the frame grid's resolved tracks are [sidebar, center, details].
  if (frame !== null) {
    const tracks = getComputedStyle(frame).gridTemplateColumns.trim().split(/\s+/).map(Number.parseFloat)
    const center = tracks[1]
    const details = tracks[2]
    if (Number.isFinite(center) && Number.isFinite(details)) {
      return { right: details, centerWidth: center }
    }
  }
  return { right: 0, centerWidth: 0 }
}

/** Track the dock position: details open/close/drag, sidebar drag, resizes. */
function useDockGeometry(rootRef: React.RefObject<HTMLDivElement | null>): DockGeometry {
  const [geometry, setGeometry] = useState<DockGeometry>({ right: 0, centerWidth: 0 })

  useLayoutEffect(() => {
    const root = rootRef.current
    if (root === null) return
    const anchors = findAnchors(root)
    let raf = 0
    const remeasure = (): void => {
      raf = 0
      const next = measureGeometry(anchors)
      setGeometry((previous) =>
        Math.abs(previous.right - next.right) < 0.5 && Math.abs(previous.centerWidth - next.centerWidth) < 0.5
          ? previous
          : next,
      )
    }
    const schedule = (): void => {
      if (raf === 0) raf = requestAnimationFrame(remeasure)
    }
    const observer = new ResizeObserver(schedule)
    for (const column of [anchors.frame, anchors.detailsCol, anchors.centerCol]) {
      if (column !== null) observer.observe(column)
    }
    window.addEventListener('resize', schedule)
    remeasure()
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', schedule)
      if (raf !== 0) cancelAnimationFrame(raf)
    }
  }, [rootRef])

  return geometry
}

// ── panel sizes ──────────────────────────────────────────────────────────────

const PANEL_MIN = 280
const PANEL_MAX = 640
const PANEL_DEFAULT = 420
/** Breathing room between the re-flowed chat column and the panel. */
const PANEL_GAP = 20
/** Never let the panel eat more than this share of the center column. */
const CENTER_SHARE = 0.42

// ── the panel ────────────────────────────────────────────────────────────────

/** Build the overlay entry component with the host sessions service in scope. */
export function makeCadSidePanel(sessions: SessionsLike | undefined): (props: CadSidePanelProps) => JSX.Element {
  return function CadSidePanel(props: CadSidePanelProps): JSX.Element {
    const rootRef = useRef<HTMLDivElement | null>(null)
    const [expanded, setExpanded] = useState(true)
    const [width, setWidth] = useState(PANEL_DEFAULT)
    const geometry = useDockGeometry(rootRef)
    const meta = useLatestCadMeta(props.useSessions, sessions)
    const { scene, error } = useScene(meta?.sceneUrl)

    const panelWidth = useMemo(() => {
      const cap = geometry.centerWidth > 0 ? Math.max(PANEL_MIN, geometry.centerWidth * CENTER_SHARE) : PANEL_MAX
      return Math.round(Math.min(width, cap))
    }, [width, geometry.centerWidth])

    useCenterColumnYield(rootRef, expanded, panelWidth)

    // Left-edge width drag: pointer-captured on the resizer, live-clamped.
    const dragRef = useRef<{ startX: number; startWidth: number } | null>(null)
    const onResizeDown = (event: React.PointerEvent<HTMLDivElement>): void => {
      event.preventDefault()
      // Drag from the effective (clamped) width so a capped panel grows
      // smoothly instead of jumping back to the raw preference.
      dragRef.current = { startX: event.clientX, startWidth: panelWidth }
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    const onResizeMove = (event: React.PointerEvent<HTMLDivElement>): void => {
      const drag = dragRef.current
      if (drag === null) return
      const next = drag.startWidth + (drag.startX - event.clientX)
      setWidth(Math.round(Math.min(PANEL_MAX, Math.max(PANEL_MIN, next))))
    }
    const onResizeUp = (): void => {
      dragRef.current = null
    }

    return (
      <div ref={rootRef} data-cad-side-panel="" style={panelStyles.root}>
        {expanded ? (
          <div style={{ ...panelStyles.panel, right: geometry.right, width: panelWidth }}>
            <div
              style={panelStyles.resizer}
              onPointerDown={onResizeDown}
              onPointerMove={onResizeMove}
              onPointerUp={onResizeUp}
              onPointerCancel={onResizeUp}
              role="separator"
              aria-orientation="vertical"
              aria-label="调整 CAD 面板宽度"
            />
            <div style={panelStyles.header}>
              <span style={panelStyles.headerTitle}>{meta?.title ?? '三维模型'}</span>
              <span style={panelStyles.headerStats}>{meta === null ? '' : statsLine(meta)}</span>
              <button
                type="button"
                style={panelStyles.iconButton}
                onClick={() => { setExpanded(false) }}
                aria-label="收起 CAD 面板"
                title="收起"
              >
                »
              </button>
            </div>
            <div style={panelStyles.body}>
              {meta === null ? (
                <EmptyState />
              ) : (
                <div key={meta.sceneUrl ?? meta.viewId} style={panelStyles.sceneFill}>
                  <Viewport scene={scene} error={error} fill />
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            type="button"
            style={{ ...panelStyles.rail, right: geometry.right + 10 }}
            onClick={() => { setExpanded(true) }}
            aria-label="展开 CAD 面板"
            title="展开 3D 视图"
          >
            «&nbsp;&nbsp;3D 模型
          </button>
        )}
      </div>
    )
  }
}

/**
 * Yield the center column while expanded: an inline padding-right sized to the
 * panel re-centers the chat column (content + composer are max-width flow, so
 * they reflow automatically). React renders the column with className only, so
 * the inline style survives AppFrame re-renders; collapse and unmount restore
 * the empty value.
 */
function useCenterColumnYield(
  rootRef: React.RefObject<HTMLDivElement | null>,
  expanded: boolean,
  panelWidth: number,
): void {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (root === null) return
    const centerCol = findAnchors(root).centerCol
    if (centerCol === null) return
    centerCol.style.paddingRight = expanded ? `${PANEL_GAP + panelWidth}px` : ''
    return () => {
      centerCol.style.paddingRight = ''
    }
  }, [rootRef, expanded, panelWidth])
}

// ── pieces ───────────────────────────────────────────────────────────────────

function statsLine(meta: CadViewMeta): string {
  const parts: string[] = []
  if (meta.kind === '3d') {
    if (meta.stats.meshes !== undefined) parts.push(`${meta.stats.meshes} 体`)
    if (meta.stats.triangles !== undefined) parts.push(`${meta.stats.triangles.toLocaleString()} 三角面`)
  } else if (meta.stats.entities !== undefined) {
    parts.push(`${meta.stats.entities.toLocaleString()} 实体`)
  }
  return parts.join(' · ')
}

/** Quiet empty placeholder — the pre-modeling state of the display area. */
function EmptyState(): JSX.Element {
  return (
    <div style={panelStyles.empty}>
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" style={panelStyles.emptyIcon} aria-hidden="true">
        <path d="M12 2.6 21 7.3v9.4L12 21.4 3 16.7V7.3Z" />
        <path d="M3 7.3 12 12l9-4.7M12 12v9.4" />
      </svg>
      <div style={panelStyles.emptyTitle}>暂无三维模型</div>
      <div style={panelStyles.emptyHint}>在对话中执行 CAD 建模后，此处将实时同步最新模型</div>
    </div>
  )
}

const panelStyles: Record<string, React.CSSProperties> = {
  // The overlay layer's direct children are pointer-auto; keep the full-size
  // root see-through so only the panel/rail intercept clicks.
  root: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    pointerEvents: 'auto',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    background: 'var(--dsw-alias-bg-base, #fff)',
    borderLeft: '1px solid var(--dsw-alias-border-l2, #c4c9d0)',
    boxShadow: '-16px 0 28px -20px rgba(16,24,40,0.18)',
  },
  resizer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 7,
    marginLeft: -3,
    cursor: 'col-resize',
    zIndex: 6,
    touchAction: 'none',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '9px 10px 9px 14px',
    flex: 'none',
    borderBottom: '1px solid var(--dsw-alias-border-l1, #eceff3)',
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: 12,
    color: 'var(--dsw-alias-label-secondary, #374151)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: 0,
  },
  headerStats: {
    flex: '1 1 auto',
    fontSize: 11,
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'right',
    minWidth: 0,
  },
  iconButton: {
    flex: 'none',
    border: 'none',
    background: 'transparent',
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    fontSize: 15,
    lineHeight: '20px',
    width: 26,
    height: 26,
    borderRadius: 6,
    cursor: 'pointer',
    padding: 0,
  },
  body: {
    flex: '1 1 auto',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  sceneFill: {
    flex: '1 1 auto',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  empty: {
    flex: '1 1 auto',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    padding: 24,
    background: 'var(--dsh-cad-bg, linear-gradient(#f5f6f8, #e9ecf0))',
  },
  emptyIcon: {
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    opacity: 0.65,
    flex: 'none',
  },
  emptyTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--dsw-alias-label-secondary, #6b7280)',
  },
  emptyHint: {
    fontSize: 11,
    lineHeight: '17px',
    textAlign: 'center',
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
  },
  rail: {
    position: 'absolute',
    top: 72,
    pointerEvents: 'auto',
    writingMode: 'vertical-rl',
    padding: '12px 6px',
    borderRadius: 10,
    border: '1px solid var(--dsw-alias-border-l2, #c4c9d0)',
    background: 'var(--dsw-alias-bg-base, #fff)',
    color: 'var(--dsw-alias-label-secondary, #374151)',
    fontSize: 11,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    boxShadow: '4px 4px 12px -6px rgba(16,24,40,0.2)',
  },
}
