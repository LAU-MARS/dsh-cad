/**
 * The resident CAD display panel — the right-hand part of the conversation
 * (center) column, restyled after Codex's tabbed document area: a tab strip
 * with closable tabs and a "+" menu offering three document kinds —
 * 零件 (Part Studio, the default), 装配体 (Assembly), 工程图 (Drawing).
 *
 * Registered as an additive `shell.overlay` entry (the frame's floating
 * layer, root scope): the panel docks itself to the center column's right
 * edge and, while expanded, writes an inline padding-right on the center
 * column so the chat content and composer re-flow left instead of being
 * covered.
 *
 * Tabs are singletons per kind (Onshape-style document structure, minimal
 * chrome): the "+" menu activates the existing tab or creates it. Tab state
 * lives in a module store so collapsing the panel never loses it.
 */
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState, useSyncExternalStore } from 'react'
import type { CadViewMeta } from './scene-types.js'
import { mountCadEditor3D } from './viewer3d.js'
import { readKind, readLatest, subscribeLatest, useScene, Viewport } from './viewport.js'
import type { DocKind } from './viewport.js'

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

/** Newest CAD presentation meta per panel tab kind in a conversation snapshot. */
function scanNewestCadMetas(snapshot: unknown): Record<DocKind, CadViewMeta | undefined> {
  const empty: Record<DocKind, CadViewMeta | undefined> = { part: undefined, assembly: undefined, drawing: undefined }
  const nodes = (snapshot as { nodes?: Array<Record<string, unknown>> } | null)?.nodes ?? []
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i]
    if (node === undefined) continue
    const meta = node.meta as Partial<CadViewMeta> | null | undefined
    if (node.kind === 'tool-result' && typeof meta?.viewId === 'string' && (meta.kind === '3d' || meta.kind === '2d')) {
      const kind: DocKind = meta.doc ?? 'part'
      if (empty[kind] === undefined) empty[kind] = meta as CadViewMeta
    }
  }
  return empty
}

const noopSubscribe = (): (() => void) => () => {}

const EMPTY_METAS: Record<DocKind, CadViewMeta | undefined> = { part: undefined, assembly: undefined, drawing: undefined }

/** Stable-snapshot cache: useSyncExternalStore forbids fresh objects per call. */
let lastScanned: Record<DocKind, CadViewMeta | undefined> = EMPTY_METAS

/**
 * The freshest CAD meta per tab kind of the current session. The session
 * observable is authoritative (reactive whatever tab is visible); the
 * card-fed latest-memory only drives the panel when the sessions service is
 * unreachable.
 */
function useKindMetas(useSessions: CadSidePanelProps['useSessions'], sessions: SessionsLike | undefined): Record<DocKind, CadViewMeta | null> {
  const current = useSessions?.((state) => state.current)
  const face = useMemo(() => {
    if (sessions === undefined || current === undefined) return undefined
    return sessions.binding?.(current)?.session
  }, [sessions, current])

  const subscribe = useMemo(() => {
    if (face === undefined) return noopSubscribe
    return (onChange: () => void): (() => void) => face.subscribe(onChange)
  }, [face])
  const getMetas = useMemo(() => {
    if (face === undefined) return (): Record<DocKind, CadViewMeta | undefined> => EMPTY_METAS
    return (): Record<DocKind, CadViewMeta | undefined> => {
      const next = scanNewestCadMetas(face.getSnapshot())
      if (lastScanned !== EMPTY_METAS && lastScanned.part === next.part && lastScanned.assembly === next.assembly && lastScanned.drawing === next.drawing) {
        return lastScanned
      }
      lastScanned = next
      return next
    }
  }, [face])
  const sessionMetas = useSyncExternalStore(subscribe, getMetas)

  // Card-driven memory keeps the no-sessions fallback current.
  const [, forceUpdate] = useReducer((tick: number) => tick + 1, 0)
  useEffect(() => subscribeLatest(() => { forceUpdate() }), [])

  if (sessions !== undefined) {
    return {
      part: sessionMetas.part ?? null,
      assembly: sessionMetas.assembly ?? readKind('assembly')?.meta ?? null,
      drawing: sessionMetas.drawing ?? readKind('drawing')?.meta ?? null,
    }
  }
  return { part: readLatest()?.meta ?? null, assembly: readKind('assembly')?.meta ?? null, drawing: readKind('drawing')?.meta ?? null }
}

// ── tab store (module level: survives collapse/expand and remounts) ─────────

interface PanelTab {
  id: DocKind
}

const TAB_TITLES: Record<DocKind, string> = {
  part: 'Part Studio',
  assembly: '装配体',
  drawing: '工程图',
}

let tabsState: PanelTab[] = [{ id: 'part' }]
let activeTab: DocKind | null = 'part'
/**
 * Cached snapshot for useSyncExternalStore: getSnapshot must return a stable
 * reference until the store actually changes, or React re-renders forever
 * (error #185, surfaced by the entry-crash supervision).
 */
let tabsSnapshot: { tabs: PanelTab[]; active: DocKind | null } = { tabs: tabsState, active: activeTab }
const tabListeners = new Set<() => void>()

function emitTabs(): void {
  tabsSnapshot = { tabs: tabsState, active: activeTab }
  for (const listener of tabListeners) listener()
}

function ensureTab(kind: DocKind): void {
  if (!tabsState.some((tab) => tab.id === kind)) {
    tabsState = [...tabsState, { id: kind }]
  }
  activeTab = kind
  emitTabs()
}

function closeTab(kind: DocKind): void {
  const index = tabsState.findIndex((tab) => tab.id === kind)
  if (index === -1) return
  tabsState = tabsState.filter((tab) => tab.id !== kind)
  if (activeTab === kind) {
    const next = tabsState[index - 1] ?? tabsState[index]
    activeTab = next?.id ?? null
  }
  emitTabs()
}

function activateTab(kind: DocKind): void {
  activeTab = kind
  emitTabs()
}

function useTabs(): { tabs: PanelTab[]; active: DocKind | null } {
  return useSyncExternalStore(
    (onChange) => {
      tabListeners.add(onChange)
      return () => {
        tabListeners.delete(onChange)
      }
    },
    () => tabsSnapshot,
    () => tabsSnapshot,
  )
}

// ── preview document store (module level, same pattern as the tab store) ────

/** A document picked from the file list, previewed in the Part tab. */
interface PreviewDoc {
  docId: string
  name: string
  sceneUrl: string
}

let previewDocState: PreviewDoc | null = null
let previewSnapshot: PreviewDoc | null = previewDocState
const previewListeners = new Set<() => void>()

function setPreviewDoc(next: PreviewDoc | null): void {
  previewDocState = next
  previewSnapshot = next
  for (const listener of previewListeners) listener()
}

function usePreviewDoc(): PreviewDoc | null {
  return useSyncExternalStore(
    (onChange) => {
      previewListeners.add(onChange)
      return () => {
        previewListeners.delete(onChange)
      }
    },
    () => previewSnapshot,
    () => previewSnapshot,
  )
}

// ── icons (inline SVG, 14px) ─────────────────────────────────────────────────

const ICON_STROKE = 'currentColor'

function PartIcon(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 1.5 14 5v6L8 14.5 2 11V5l6-3.5Z" stroke={ICON_STROKE} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M2 5l6 3.5L14 5M8 8.5v6" stroke={ICON_STROKE} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

function AssemblyIcon(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M5.5 1.5 10 4v4L5.5 10.5 1 8V4l4.5-2.5Z" stroke={ICON_STROKE} strokeWidth="1.2" strokeLinejoin="round" opacity="0.75" />
      <path d="M10.5 5.5 15 8v4l-4.5 2.5L6 12V8l4.5-2.5Z" stroke={ICON_STROKE} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

function DrawingIcon(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 1.5h7l3 3V14.5H3V1.5Z" stroke={ICON_STROKE} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5.5 7h5M5.5 9.5h5M5.5 12h3" stroke={ICON_STROKE} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function TabIcon({ kind }: { kind: DocKind }): JSX.Element {
  if (kind === 'assembly') return <AssemblyIcon />
  if (kind === 'drawing') return <DrawingIcon />
  return <PartIcon />
}

/** Folder glyph for the file-space (document list) button. */
function FolderIcon(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M1.5 4.5A1 1 0 0 1 2.5 3.5h3.2l1.4 1.8h6.4a1 1 0 0 1 1 1v6.2a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4.5Z" stroke={ICON_STROKE} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

/** Document glyph for file-list rows. */
function DocIcon(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 1.5h5l3 3v10H4v-13Z" stroke={ICON_STROKE} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M9 1.5v3h3" stroke={ICON_STROKE} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
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
const PANEL_MAX = 720
const PANEL_DEFAULT = 460
/** Breathing room between the re-flowed chat column and the panel. */
const PANEL_GAP = 20
/** Never let the panel eat more than this share of the center column. */
const CENTER_SHARE = 0.42

// ── the "+" menu ─────────────────────────────────────────────────────────────

const MENU_ITEMS: Array<{ kind: DocKind; label: string; hint: string }> = [
  { kind: 'part', label: '零件', hint: 'Part Studio · 三维建模' },
  { kind: 'assembly', label: '装配体', hint: 'Assembly · 实例装配' },
  { kind: 'drawing', label: '工程图', hint: 'Drawing · 图纸输出' },
]

function NewTabMenu({ onPick, onClose }: { onPick: (kind: DocKind) => void; onClose: () => void }): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const onPointerDown = (event: PointerEvent): void => {
      if (ref.current !== null && event.target instanceof Node && ref.current.contains(event.target)) return
      onClose()
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <div ref={ref} style={panelStyles.menu} role="menu" aria-label="新建文档">
      {MENU_ITEMS.map((item) => (
        <button
          key={item.kind}
          type="button"
          role="menuitem"
          style={panelStyles.menuItem}
          onClick={() => { onPick(item.kind) }}
        >
          <span style={panelStyles.menuIcon}><TabIcon kind={item.kind} /></span>
          <span style={panelStyles.menuLabel}>{item.label}</span>
          <span style={panelStyles.menuHint}>{item.hint}</span>
        </button>
      ))}
    </div>
  )
}

// ── the file-space (documents) menu ─────────────────────────────────────────

interface DocsEntry {
  id: string
  name: string
  bodies: number
  updatedAt: string
  sceneUrl?: string
}

/** Compact relative time for the file list (刚刚 / 5 分钟前 / 3 天前). */
function relTime(iso: string): string {
  const ms = Date.now() - Date.parse(iso)
  if (!Number.isFinite(ms)) return ''
  const minutes = Math.floor(ms / 60_000)
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes} 分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} 小时前`
  return `${Math.floor(hours / 24)} 天前`
}

function DocsMenu({ activeDocId, onClose }: { activeDocId: string | null; onClose: () => void }): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null)
  const [entries, setEntries] = useState<DocsEntry[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  useEffect(() => {
    const onPointerDown = (event: PointerEvent): void => {
      if (ref.current !== null && event.target instanceof Node && ref.current.contains(event.target)) return
      onClose()
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  const refresh = useCallback((): void => {
    setEntries(null)
    setError(null)
    fetch('/dsh-cad/docs')
      .then((response) => (response.ok ? (response.json() as Promise<{ docs?: DocsEntry[] }>) : Promise.reject(new Error(`HTTP ${response.status}`))))
      .then((payload) => { setEntries(payload.docs ?? []) })
      .catch((cause: unknown) => { setError(cause instanceof Error ? cause.message : String(cause)) })
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const deleteDoc = (id: string): void => {
    setBusyId(id)
    fetch(`/dsh-cad/docs/delete?id=${encodeURIComponent(id)}`, { method: 'POST' })
      .then(() => {
        setConfirmingId(null)
        if (previewSnapshot?.docId === id) setPreviewDoc(null)
        refresh()
      })
      .catch((cause: unknown) => { setError(cause instanceof Error ? cause.message : String(cause)) })
      .finally(() => { setBusyId(null) })
  }

  return (
    <div ref={ref} style={panelStyles.menu} role="menu" aria-label="文档列表">
      <div style={panelStyles.docsHeader}>工作区文档</div>
      {error !== null ? <div style={panelStyles.docsError}>{error}</div> : null}
      {entries === null && error === null ? <div style={panelStyles.docsHintRow}>加载中…</div> : null}
      {entries !== null && entries.length === 0 ? (
        <div style={panelStyles.docsHintRow}>还没有建模文档 — 在对话中建模后会出现在这里</div>
      ) : null}
      {entries?.map((doc) => {
        const isActive = doc.id === activeDocId
        return (
          <div key={doc.id} style={panelStyles.docRow}>
            <button
              type="button"
              role="menuitem"
              style={panelStyles.docRowMain}
              onClick={() => {
                if (doc.sceneUrl !== undefined) {
                  setPreviewDoc({ docId: doc.id, name: doc.name, sceneUrl: doc.sceneUrl })
                  ensureTab('part')
                  onClose()
                }
              }}
              title={doc.sceneUrl === undefined ? '空文档（无场景）' : '点击预览'}
            >
              <span style={panelStyles.menuIcon}><DocIcon /></span>
              <span style={{ ...panelStyles.menuLabel, ...(isActive ? { color: 'var(--dsw-alias-label-primary,#4d6bfe)', fontWeight: 600 } : {}) }}>
                {doc.name}
                {isActive ? ' · 当前' : ''}
              </span>
              <span style={panelStyles.menuHint}>{doc.bodies} 体 · {relTime(doc.updatedAt)}</span>
            </button>
            {confirmingId === doc.id ? (
              <span style={panelStyles.docConfirm}>
                <button type="button" style={panelStyles.docConfirmYes} disabled={busyId === doc.id} onClick={() => { deleteDoc(doc.id) }}>
                  删除
                </button>
                <button type="button" style={panelStyles.docConfirmNo} onClick={() => { setConfirmingId(null) }}>
                  取消
                </button>
              </span>
            ) : (
              <button
                type="button"
                style={panelStyles.docDelete}
                aria-label={`删除文档 ${doc.name}`}
                title="删除文档"
                onClick={() => { setConfirmingId(doc.id) }}
              >
                ×
              </button>
            )}
          </div>
        )
      })}
      <div style={panelStyles.docsFooter}>点击预览 · 切换建模目标请在对话中说「打开 xx 文档」</div>
    </div>
  )
}

// ── the panel ────────────────────────────────────────────────────────────────

/** Build the overlay entry component with the host sessions service in scope. */
export function makeCadSidePanel(sessions: SessionsLike | undefined): (props: CadSidePanelProps) => JSX.Element {
  return function CadSidePanel(props: CadSidePanelProps): JSX.Element {
    const rootRef = useRef<HTMLDivElement | null>(null)
    const [expanded, setExpanded] = useState(true)
    const [width, setWidth] = useState(PANEL_DEFAULT)
    const [menuOpen, setMenuOpen] = useState(false)
    const [docsOpen, setDocsOpen] = useState(false)
    const geometry = useDockGeometry(rootRef)
    const metas = useKindMetas(props.useSessions, sessions)
    const { tabs, active } = useTabs()

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

    const activeMeta = active === null ? null : metas[active]

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
            <div style={panelStyles.tabStripRow}>
              <div style={panelStyles.tabStrip} role="tablist" aria-label="CAD 文档">
                {tabs.map((tab) => {
                  const isActive = tab.id === active
                  return (
                    <div
                      key={tab.id}
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={0}
                      style={{ ...panelStyles.tab, ...(isActive ? panelStyles.tabActive : {}) }}
                      onClick={() => { activateTab(tab.id) }}
                      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') activateTab(tab.id) }}
                    >
                      <span style={isActive ? panelStyles.tabIconActive : panelStyles.tabIcon}><TabIcon kind={tab.id} /></span>
                      <span style={panelStyles.tabLabel}>{TAB_TITLES[tab.id]}</span>
                      <button
                        type="button"
                        style={panelStyles.tabClose}
                        aria-label={`关闭 ${TAB_TITLES[tab.id]}`}
                        title="关闭"
                        onClick={(event) => {
                          event.stopPropagation()
                          closeTab(tab.id)
                        }}
                      >
                        ×
                      </button>
                    </div>
                  )
                })}
                <button
                  type="button"
                  style={panelStyles.addTab}
                  aria-label="新建文档"
                  title="新建：零件 / 装配体 / 工程图"
                  onClick={() => { setDocsOpen(false); setMenuOpen((open) => !open) }}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                style={panelStyles.fileButton}
                aria-label="文档列表"
                aria-expanded={docsOpen}
                title="工作区文档列表（预览 / 删除）"
                onClick={() => { setMenuOpen(false); setDocsOpen((open) => !open) }}
              >
                <FolderIcon />
              </button>
              <span style={panelStyles.headerStats}>{activeMeta === null ? '' : statsLine(activeMeta)}</span>
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
            {menuOpen ? (
              <NewTabMenu
                onPick={(kind) => {
                  setMenuOpen(false)
                  ensureTab(kind)
                }}
                onClose={() => { setMenuOpen(false) }}
              />
            ) : null}
            {docsOpen ? (
              <DocsMenu
                activeDocId={metas.part?.viewId ?? null}
                onClose={() => { setDocsOpen(false) }}
              />
            ) : null}
            <div style={panelStyles.body}>
              {active === 'part' ? <PartTabBody meta={metas.part} /> : null}
              {active === 'assembly' ? <AssemblyTabBody meta={metas.assembly} /> : null}
              {active === 'drawing' ? <DrawingTabBody meta={metas.drawing} /> : null}
            </div>
          </div>
        ) : (
          <button
            type="button"
            style={{ ...panelStyles.rail, right: geometry.right + 10 }}
            onClick={() => { setExpanded(true) }}
            aria-label="展开 CAD 面板"
            title="展开 CAD 视图"
          >
            «&nbsp;&nbsp;CAD
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

// ── tab bodies ───────────────────────────────────────────────────────────────

/** 零件 (Part Studio): an empty editor before any model, then live tracking.
 * A document picked in the file list overrides the tab until the session
 * produces a new CAD result (auto-return to live tracking). */
function PartTabBody({ meta }: { meta: CadViewMeta | null }): JSX.Element {
  const preview = usePreviewDoc()
  const live = useScene(meta?.sceneUrl)
  const previewScene = useScene(preview?.sceneUrl)

  useEffect(() => {
    if (meta !== null && previewSnapshot !== null) setPreviewDoc(null)
  }, [meta?.sceneUrl])

  if (preview !== null) {
    return (
      <div style={panelStyles.sceneFill}>
        <div style={panelStyles.previewBar}>
          <span style={panelStyles.previewLabel}>预览: {preview.name}</span>
          <button type="button" style={panelStyles.previewBack} onClick={() => { setPreviewDoc(null) }}>
            返回跟踪
          </button>
        </div>
        <Viewport scene={previewScene.scene} error={previewScene.error} fill />
      </div>
    )
  }
  if (meta === null) return <EmptyPartStudio />
  return (
    <div style={panelStyles.sceneFill}>
      <Viewport scene={live.scene} error={live.error} fill />
    </div>
  )
}

/** 装配体: composed instance scene, or an empty state with a chat hint. */
function AssemblyTabBody({ meta }: { meta: CadViewMeta | null }): JSX.Element {
  const { scene, error } = useScene(meta?.sceneUrl)
  if (meta === null) {
    return (
      <EmptyTabState
        icon={<AssemblyIcon />}
        title="装配体为空"
        hint="在对话中说「把 b1 和 b2 装配起来，b2 放到 (60, 0, 0)」，或使用 cad_assembly_insert 工具插入实例"
      />
    )
  }
  return (
    <div style={panelStyles.sceneFill}>
      <Viewport scene={scene} error={error} fill />
    </div>
  )
}

/** 工程图: the drawing sheet (pan/zoom SVG), or an empty state. */
function DrawingTabBody({ meta }: { meta: CadViewMeta | null }): JSX.Element {
  const { scene, error } = useScene(meta?.sceneUrl)
  if (meta === null) {
    return (
      <EmptyTabState
        icon={<DrawingIcon />}
        title="还没有工程图"
        hint="在对话中说「给 b1 出一张 A3 工程图」，或使用 cad_drawing 工具生成三视图 + 轴测图"
      />
    )
  }
  return (
    <div style={{ ...panelStyles.sceneFill, background: '#fff' }}>
      <Viewport scene={scene} error={error} fill />
    </div>
  )
}

function EmptyTabState({ icon, title, hint }: { icon: JSX.Element; title: string; hint: string }): JSX.Element {
  return (
    <div style={panelStyles.emptyState}>
      <div style={panelStyles.emptyIcon}>{icon}</div>
      <div style={panelStyles.emptyTitle}>{title}</div>
      <div style={panelStyles.emptyHint}>{hint}</div>
    </div>
  )
}

// ── pieces ───────────────────────────────────────────────────────────────────

function statsLine(meta: CadViewMeta): string {
  const parts: string[] = []
  if (meta.kind === '3d') {
    const unit = meta.doc === 'assembly' ? ' 实例' : ' 体'
    if (meta.stats.meshes !== undefined) parts.push(`${meta.stats.meshes}${unit}`)
    if (meta.stats.triangles !== undefined) parts.push(`${meta.stats.triangles.toLocaleString()} 三角面`)
  } else if (meta.stats.entities !== undefined) {
    parts.push(`${meta.stats.entities.toLocaleString()} 实体`)
  }
  return parts.join(' · ')
}

/**
 * The pre-modeling state: an empty CAD editor — grid, XYZ axes and the
 * ViewCube, but no geometry. No demo parts are loaded by default; once the
 * session produces a CAD result the panel swaps to live model tracking.
 */
function EmptyPartStudio(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (container === null) return
    const handle = mountCadEditor3D(container, { part: null })
    return () => {
      handle.dispose()
    }
  }, [])

  return (
    <div style={panelStyles.demoRoot}>
      <div style={panelStyles.demoCaption}>Part Studio</div>
      <div style={panelStyles.demoViewport}>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={panelStyles.demoHint}>
        建模区为空 · 在对话中描述零件（如「建一个 100×60×10 的板，中间打 ⌀20 孔」），建模后此页签实时跟踪最新模型
      </div>
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
  // ── tab strip (Codex-style) ──────────────────────────────────────────────
  tabStripRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 8px 6px 12px',
    flex: 'none',
    borderBottom: '1px solid var(--dsw-alias-border-l1, #eceff3)',
    background: 'var(--dsw-alias-bg-subtle, #f7f8fa)',
    position: 'relative',
  },
  tabStrip: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flex: '1 1 auto',
    minWidth: 0,
    overflow: 'hidden',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '4px 6px 4px 9px',
    borderRadius: 7,
    border: '1px solid transparent',
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    cursor: 'pointer',
    userSelect: 'none',
    flex: 'none',
    maxWidth: 150,
    lineHeight: '18px',
  },
  tabActive: {
    background: 'var(--dsw-alias-bg-base, #fff)',
    borderColor: 'var(--dsw-alias-border-l1, #e2e5ea)',
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    boxShadow: '0 1px 2px rgba(16,24,40,0.06)',
  },
  tabIcon: {
    display: 'flex',
    alignItems: 'center',
    opacity: 0.75,
    flex: 'none',
  },
  tabIconActive: {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--dsw-alias-label-primary, #4d6bfe)',
    flex: 'none',
  },
  tabLabel: {
    fontSize: 12,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tabClose: {
    border: 'none',
    background: 'transparent',
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    fontSize: 13,
    lineHeight: '16px',
    width: 16,
    height: 16,
    borderRadius: 4,
    cursor: 'pointer',
    padding: 0,
    flex: 'none',
    textAlign: 'center',
  },
  addTab: {
    flex: 'none',
    width: 24,
    height: 24,
    marginLeft: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--dsw-alias-border-l1, #e2e5ea)',
    borderRadius: 7,
    background: 'var(--dsw-alias-bg-base, #fff)',
    color: 'var(--dsw-alias-label-secondary, #374151)',
    fontSize: 15,
    lineHeight: '18px',
    cursor: 'pointer',
    padding: 0,
  },
  menu: {
    position: 'absolute',
    top: 40,
    left: 12,
    zIndex: 20,
    minWidth: 230,
    padding: 5,
    background: 'var(--dsw-alias-bg-base, #fff)',
    border: '1px solid var(--dsw-alias-border-l1, #e2e5ea)',
    borderRadius: 10,
    boxShadow: '0 12px 32px -12px rgba(16,24,40,0.24)',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '7px 9px',
    border: 'none',
    borderRadius: 7,
    background: 'transparent',
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    cursor: 'pointer',
    textAlign: 'left',
    font: 'inherit',
    fontSize: 12.5,
  },
  menuIcon: {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--dsw-alias-label-secondary, #374151)',
    flex: 'none',
  },
  menuLabel: {
    fontWeight: 600,
    flex: 'none',
  },
  menuHint: {
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    fontSize: 11,
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
  },
  // ── file space (documents) ───────────────────────────────────────────────
  fileButton: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    marginLeft: 4,
    border: '1px solid var(--dsw-alias-border-l2, #c4c9d0)',
    borderRadius: 6,
    background: 'transparent',
    color: 'var(--dsw-alias-label-secondary, #374151)',
    cursor: 'pointer',
    padding: 0,
  },
  docsHeader: {
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    padding: '5px 9px 3px',
    letterSpacing: '0.02em',
  },
  docsHintRow: {
    fontSize: 12,
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    padding: '8px 9px',
  },
  docsError: {
    fontSize: 12,
    color: 'var(--dsw-alias-state-error-primary, #d92d20)',
    padding: '4px 9px',
  },
  docsFooter: {
    fontSize: 11,
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    padding: '5px 9px 3px',
    borderTop: '1px solid var(--dsw-alias-border-l1, #e2e5ea)',
    marginTop: 3,
  },
  docRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  docRowMain: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flex: '1 1 auto',
    minWidth: 0,
    padding: '7px 9px',
    border: 'none',
    borderRadius: 7,
    background: 'transparent',
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    cursor: 'pointer',
    textAlign: 'left',
    font: 'inherit',
    fontSize: 12.5,
  },
  docDelete: {
    flex: 'none',
    width: 22,
    height: 22,
    border: 'none',
    borderRadius: 6,
    background: 'transparent',
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    fontSize: 14,
    lineHeight: '20px',
    cursor: 'pointer',
    padding: 0,
  },
  docConfirm: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flex: 'none',
    padding: '0 4px 0 0',
  },
  docConfirmYes: {
    border: 'none',
    borderRadius: 6,
    background: 'var(--dsw-alias-state-error-primary, #d92d20)',
    color: '#fff',
    fontSize: 11,
    padding: '3px 8px',
    cursor: 'pointer',
  },
  docConfirmNo: {
    border: '1px solid var(--dsw-alias-border-l2, #c4c9d0)',
    borderRadius: 6,
    background: 'transparent',
    color: 'var(--dsw-alias-label-secondary, #374151)',
    fontSize: 11,
    padding: '3px 8px',
    cursor: 'pointer',
  },
  previewBar: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '5px 10px',
    borderBottom: '1px solid var(--dsw-alias-border-l1, #e2e5ea)',
    background: 'var(--dsw-alias-bg-subtle, #f5f6f8)',
  },
  previewLabel: {
    flex: '1 1 auto',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 12,
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    fontWeight: 600,
  },
  previewBack: {
    flex: 'none',
    border: '1px solid var(--dsw-alias-border-l2, #c4c9d0)',
    borderRadius: 6,
    background: 'transparent',
    color: 'var(--dsw-alias-label-secondary, #374151)',
    fontSize: 11,
    padding: '2px 8px',
    cursor: 'pointer',
  },
  headerStats: {
    flex: 'none',
    fontSize: 11,
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '30%',
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
  emptyState: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 24,
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    textAlign: 'center',
  },
  emptyIcon: {
    display: 'flex',
    color: 'var(--dsw-alias-label-tertiary, #c0c6cf)',
    transform: 'scale(2)',
    marginBottom: 6,
  },
  emptyTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--dsw-alias-label-secondary, #6b7280)',
  },
  emptyHint: {
    fontSize: 11.5,
    lineHeight: '18px',
    maxWidth: 300,
  },
  demoRoot: {
    flex: '1 1 auto',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    padding: '10px 10px 12px',
  },
  demoCaption: {
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 'none',
  },
  demoViewport: {
    position: 'relative',
    flex: '1 1 auto',
    minHeight: 0,
    borderRadius: 10,
    overflow: 'hidden',
    background: 'var(--dsh-cad-bg, linear-gradient(#f5f6f8, #e9ecf0))',
  },
  demoHint: {
    flex: 'none',
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    fontSize: 11,
    lineHeight: '17px',
    textAlign: 'center',
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
