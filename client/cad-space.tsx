/**
 * The CAD 空间 (workspace CAD drive) — a host-global main panel registered in
 * the left sidebar's `sidebar.panellist` (below 插件, above 自动化任务) plus the
 * matching `main` keyed entry (the same two-stage path ui-plugin-manager and
 * ui-schedule use).
 *
 * The drive owns: a virtual multi-level folder tree, list/grid views, search,
 * sort, rename, duplicate, batch move/delete, one-click exports (.dcprt /
 * .step / .stl / .svg / .dxf), imports (.dcprt / .step / .stl / .obj /
 * .iges / .brep), and a right detail drawer with live Part / Assembly /
 * Drawing previews plus the jumps that bind a doc to the current session and
 * open it in the chat or the right CAD pane.
 *
 * Every byte is served by the /dsh-cad/space/* routes; on hosts whose server
 * half is absent the drive stays a quiet empty shell instead of crashing.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import type { JSX } from 'react'
import { Viewport } from './viewport.js'
import { cadCanvasBackground, useCadTheme } from './theme.js'

/** The registry id of the sidebar row AND the `main` keyed entry. */
export const CAD_SPACE_PANEL_ID = 'cad-space'

// ── data model ───────────────────────────────────────────────────────────────

export interface SpaceFolder {
  id: string
  name: string
  parentId: string | null
  createdAt: string
  updatedAt: string
}

export interface SpaceDoc {
  id: string
  name: string
  folderId: string | null
  folderPath: string
  createdAt: string
  updatedAt: string
  opCount: number
  sourceKind?: 'model' | 'step' | 'dcprt'
  bodyCount: number
  instanceCount: number
  sketchCount: number
  drawingCount: number
  latestDrawingId?: string
  bodyNames: string[]
  sizeBytes: number
  partSceneUrl?: string
  assemblySceneUrl?: string
  drawingSceneUrl?: string
  boundSessions: string[]
}

export interface SpaceSnapshot {
  folders: SpaceFolder[]
  docs: SpaceDoc[]
  sessionBindings: Record<string, string>
}

type ViewKind = 'grid' | 'list'
type SortKey = 'updatedAt' | 'name' | 'size'
type FilterKind = 'all' | 'part' | 'assembly' | 'drawing'
type FileBadge = 'part' | 'assembly' | 'drawing' | 'empty'
type PreviewTab = 'part' | 'assembly' | 'drawing'

// ── shared snapshot store (polls /dsh-cad/space/snapshot) ────────────────────

let snapshotState: SpaceSnapshot | null = null
const snapshotListeners = new Set<() => void>()
let snapshotInflight: Promise<void> | null = null
let snapshotTimer: ReturnType<typeof setInterval> | null = null

function emitSnapshot(): void {
  for (const listener of [...snapshotListeners]) listener()
}

async function fetchSnapshot(): Promise<void> {
  try {
    const response = await fetch('/dsh-cad/space/snapshot', { cache: 'no-store' })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const payload = (await response.json()) as SpaceSnapshot
    snapshotState = {
      folders: payload.folders ?? [],
      docs: payload.docs ?? [],
      sessionBindings: payload.sessionBindings ?? {},
    }
    emitSnapshot()
  } catch {
    /* keep the previous snapshot; the poller retries */
  }
}

function ensureSnapshotPolling(): void {
  if (snapshotTimer !== null) return
  void fetchSnapshot()
  snapshotTimer = setInterval(() => {
    if (typeof document !== 'undefined' && document.hidden) return
    void fetchSnapshot()
  }, 2000)
}

function stopSnapshotPolling(): void {
  if (snapshotTimer === null) return
  clearInterval(snapshotTimer)
  snapshotTimer = null
}

/** Refresh the snapshot after a mutation (fire-and-forget, deduped). */
export function refreshSpaceSnapshot(): Promise<void> {
  if (snapshotInflight === null) snapshotInflight = fetchSnapshot().finally(() => { snapshotInflight = null })
  return snapshotInflight
}

function useSpaceSnapshot(): SpaceSnapshot | null {
  const subscribe = useCallback((onChange: () => void): (() => void) => {
    ensureSnapshotPolling()
    snapshotListeners.add(onChange)
    return () => {
      snapshotListeners.delete(onChange)
      if (snapshotListeners.size === 0) stopSnapshotPolling()
    }
  }, [])
  const getSnapshot = useCallback((): SpaceSnapshot | null => snapshotState, [])
  return useSyncExternalStore(subscribe, getSnapshot, () => snapshotState)
}

// ── API helpers ──────────────────────────────────────────────────────────────

async function postSpace(path: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
  const response = await fetch(`/dsh-cad/space/${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>
  if (!response.ok) throw new Error(typeof payload.error === 'string' ? payload.error : `HTTP ${response.status}`)
  await refreshSpaceSnapshot()
  return payload
}

/** Import a file: base64 JSON envelope (same-origin, no multipart parser). */
async function importFile(file: File, folderId: string | null): Promise<void> {
  const buffer = await file.arrayBuffer()
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }
  const response = await fetch(
    `/dsh-cad/space/import?filename=${encodeURIComponent(file.name)}${folderId !== null ? `&folderId=${encodeURIComponent(folderId)}` : ''}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ data: btoa(binary) }),
    },
  )
  const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>
  if (!response.ok) throw new Error(typeof payload.error === 'string' ? payload.error : `HTTP ${response.status}`)
  await refreshSpaceSnapshot()
}

/** Trigger a browser download of one document in the requested format. */
function downloadDoc(doc: SpaceDoc, format: 'dcprt' | 'step' | 'stl' | 'svg' | 'dxf'): void {
  const anchor = document.createElement('a')
  anchor.href = `/dsh-cad/space/export?id=${encodeURIComponent(doc.id)}&format=${format}`
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

// ── badges + formatters ──────────────────────────────────────────────────────

function badgeOf(doc: SpaceDoc): FileBadge {
  if (doc.drawingCount > 0 && doc.bodyCount === 0 && doc.instanceCount === 0) return 'drawing'
  if (doc.instanceCount > 0) return 'assembly'
  if (doc.bodyCount > 0) return 'part'
  return 'empty'
}

const BADGE_LABEL: Record<FileBadge, string> = {
  part: '零件',
  assembly: '装配',
  drawing: '工程图',
  empty: '空',
}

const BADGE_COLOR: Record<FileBadge, string> = {
  part: 'var(--dsw-alias-state-business-primary, #4d6bfe)',
  assembly: 'var(--dsw-alias-state-success-primary, #079455)',
  drawing: 'var(--dsw-alias-state-warn-primary, #dc6803)',
  empty: 'var(--dsw-alias-label-tertiary, #9ca3af)',
}

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

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function folderPathOf(folder: SpaceFolder, folders: SpaceFolder[]): string {
  const byId = new Map(folders.map((entry) => [entry.id, entry]))
  const parts: string[] = []
  let current: string | null = folder.id
  while (current !== null) {
    const entry = byId.get(current)
    if (entry === undefined) break
    parts.unshift(entry.name)
    current = entry.parentId
  }
  return parts.join('/')
}

// ── icons ────────────────────────────────────────────────────────────────────

const ICON_STROKE = 'currentColor'

export function CadSpaceGlyph({ size = 16 }: { size?: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1.5 4.5A1 1 0 0 1 2.5 3.5h3.2l1.4 1.8h6.4a1 1 0 0 1 1 1v6.2a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4.5Z" stroke={ICON_STROKE} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8 8.2 5.2 9.9v2.2L8 13.8l2.8-1.7V9.9L8 8.2Z" stroke={ICON_STROKE} strokeWidth="1" strokeLinejoin="round" opacity="0.8" />
    </svg>
  )
}

function PartGlyph(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 1.5 14 5v6L8 14.5 2 11V5l6-3.5Z" stroke={ICON_STROKE} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M2 5l6 3.5L14 5M8 8.5v6" stroke={ICON_STROKE} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

function AssemblyGlyph(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M5.5 1.5 10 4v4L5.5 10.5 1 8V4l4.5-2.5Z" stroke={ICON_STROKE} strokeWidth="1.2" strokeLinejoin="round" opacity="0.75" />
      <path d="M10.5 5.5 15 8v4l-4.5 2.5L6 12V8l4.5-2.5Z" stroke={ICON_STROKE} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

function DrawingGlyph(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 1.5h7l3 3V14.5H3V1.5Z" stroke={ICON_STROKE} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5.5 7h5M5.5 9.5h5M5.5 12h3" stroke={ICON_STROKE} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function FolderGlyph(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M1.5 4.5A1 1 0 0 1 2.5 3.5h3.2l1.4 1.8h6.4a1 1 0 0 1 1 1v6.2a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4.5Z" stroke={ICON_STROKE} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

function SearchGlyph(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.6" stroke={ICON_STROKE} strokeWidth="1.3" />
      <path d="M10.4 10.4 14 14" stroke={ICON_STROKE} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function GridGlyph(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="2" width="5" height="5" rx="1" stroke={ICON_STROKE} strokeWidth="1.2" />
      <rect x="9" y="2" width="5" height="5" rx="1" stroke={ICON_STROKE} strokeWidth="1.2" />
      <rect x="2" y="9" width="5" height="5" rx="1" stroke={ICON_STROKE} strokeWidth="1.2" />
      <rect x="9" y="9" width="5" height="5" rx="1" stroke={ICON_STROKE} strokeWidth="1.2" />
    </svg>
  )
}

function ListGlyph(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 4h12M2 8h12M2 12h12" stroke={ICON_STROKE} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function DotsGlyph(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="3" cy="8" r="1.2" fill={ICON_STROKE} />
      <circle cx="8" cy="8" r="1.2" fill={ICON_STROKE} />
      <circle cx="13" cy="8" r="1.2" fill={ICON_STROKE} />
    </svg>
  )
}

function ChevronRight(): JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 3.5 10.5 8 6 12.5" stroke={ICON_STROKE} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseGlyph(): JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 4l8 8M12 4l-8 8" stroke={ICON_STROKE} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

// ── styles (host tokens; mirrors the host pages' look) ───────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    background: 'var(--dsw-alias-bg-base, #fff)',
    fontSize: 14,
  },
  rail: {
    flex: 'none',
    width: 210,
    display: 'flex',
    flexDirection: 'column',
    padding: '18px 10px 12px',
    borderRight: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    overflowY: 'auto',
    gap: 2,
  },
  railTitle: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '2px 8px 12px',
    fontSize: 17,
    fontWeight: 600,
  },
  railPrimary: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    height: 36,
    margin: '0 2px 8px',
    border: 'none',
    borderRadius: 'var(--dsw-radius-md, 8px)',
    background: 'var(--dsw-alias-button-primary-fill, #4d6bfe)',
    color: 'var(--dsw-alias-label-primary-foreground, #fff)',
    font: 'inherit',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    padding: '0 12px',
  },
  railAction: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    height: 30,
    margin: '0 2px 8px',
    border: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    borderRadius: 15,
    background: 'transparent',
    color: 'var(--dsw-alias-label-secondary, #374151)',
    font: 'inherit',
    fontSize: 12,
    cursor: 'pointer',
    padding: '0 10px',
  },
  railRow: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    height: 32,
    margin: '0 2px',
    padding: '0 8px',
    border: 'none',
    borderRadius: 'var(--dsw-radius-md, 8px)',
    background: 'transparent',
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    font: 'inherit',
    fontSize: 13.5,
    textAlign: 'left',
    cursor: 'pointer',
  },
  railRowActive: {
    background: 'var(--dsw-alias-interactive-bg-hover, #eceef2)',
  },
  railCount: {
    marginLeft: 'auto',
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    fontSize: 11.5,
  },
  railSection: {
    flex: 'none',
    margin: '10px 8px 4px',
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    fontSize: 11,
    letterSpacing: '0.02em',
  },
  folderRow: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    height: 30,
    margin: '0 2px',
    padding: '0 6px 0 8px',
    border: 'none',
    borderRadius: 'var(--dsw-radius-md, 8px)',
    background: 'transparent',
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    font: 'inherit',
    fontSize: 13,
    textAlign: 'left',
    cursor: 'pointer',
  },
  folderName: {
    flex: '1 1 auto',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  folderDots: {
    flex: 'none',
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: 5,
    background: 'transparent',
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    cursor: 'pointer',
    padding: 0,
  },
  railFoot: {
    marginTop: 'auto',
    padding: '10px 8px 2px',
    borderTop: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    fontSize: 11.5,
    lineHeight: '18px',
  },
  main: {
    flex: '1 1 auto',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '16px 20px 10px',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 600,
    flex: 'none',
  },
  headerSub: {
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    fontSize: 12.5,
    flex: '1 1 auto',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  headerButton: {
    flex: 'none',
    height: 32,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '0 12px',
    border: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    borderRadius: 'var(--dsw-radius-md, 8px)',
    background: 'var(--dsw-alias-button-elevated-fill, #fff)',
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    font: 'inherit',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
  },
  headerPrimary: {
    flex: 'none',
    height: 32,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '0 14px',
    border: 'none',
    borderRadius: 'var(--dsw-radius-md, 8px)',
    background: 'var(--dsw-alias-button-primary-fill, #4d6bfe)',
    color: 'var(--dsw-alias-label-primary-foreground, #fff)',
    font: 'inherit',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
  },
  toolbar: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '4px 20px 10px',
    borderBottom: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    position: 'relative',
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    flex: '1 1 auto',
    minWidth: 0,
    overflow: 'hidden',
  },
  crumb: {
    border: 'none',
    background: 'transparent',
    color: 'var(--dsw-alias-label-secondary, #374151)',
    font: 'inherit',
    fontSize: 12.5,
    cursor: 'pointer',
    padding: '2px 5px',
    borderRadius: 6,
    whiteSpace: 'nowrap',
  },
  crumbActive: {
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    fontWeight: 600,
  },
  searchBox: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    height: 32,
    padding: '0 10px',
    border: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    borderRadius: 'var(--dsw-radius-md, 8px)',
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    width: 210,
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    font: 'inherit',
    fontSize: 13,
    outline: 'none',
    width: '100%',
  },
  toolButton: {
    flex: 'none',
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: '0 8px',
    border: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    borderRadius: 'var(--dsw-radius-md, 8px)',
    background: 'transparent',
    color: 'var(--dsw-alias-label-secondary, #374151)',
    font: 'inherit',
    fontSize: 11.5,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  toolButtonActive: {
    background: 'var(--dsw-alias-interactive-bg-hover, #eceef2)',
    color: 'var(--dsw-alias-label-primary, #1f2937)',
  },
  scroll: {
    flex: '1 1 auto',
    minHeight: 0,
    overflow: 'auto',
    padding: '14px 20px 32px',
    position: 'relative',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(216px, 1fr))',
    gap: 10,
  },
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 12,
    borderRadius: 'var(--dsw-radius-lg, 12px)',
    border: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    background: 'var(--dsw-alias-bg-base, #fff)',
    cursor: 'pointer',
    textAlign: 'left',
    font: 'inherit',
  },
  cardActive: {
    borderColor: 'var(--dsw-alias-state-business-primary, #4d6bfe)',
    boxShadow: '0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary, #4d6bfe) 22%, transparent)',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
  },
  cardIcon: {
    flex: 'none',
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--dsw-radius-md, 8px)',
    border: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    color: 'var(--dsw-alias-label-secondary, #374151)',
  },
  cardName: {
    flex: '1 1 auto',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  cardTitle: {
    fontSize: 13.5,
    fontWeight: 500,
    lineHeight: '19px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  cardMeta: {
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    fontSize: 11.5,
    lineHeight: '17px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardStats: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  statChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 3,
    height: 19,
    padding: '0 7px',
    borderRadius: 10,
    background: 'var(--dsw-alias-bg-layer-1, #f2f4f7)',
    color: 'var(--dsw-alias-label-secondary, #374151)',
    fontSize: 10.5,
    whiteSpace: 'nowrap',
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  cardBadge: {
    fontSize: 10.5,
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  cardMenu: {
    marginLeft: 'auto',
    flex: 'none',
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: 6,
    background: 'transparent',
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    cursor: 'pointer',
    padding: 0,
  },
  listTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 13,
  },
  listHead: {
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    fontSize: 11.5,
    fontWeight: 500,
    textAlign: 'left',
    padding: '6px 10px',
    borderBottom: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    whiteSpace: 'nowrap',
  },
  listRow: {
    borderBottom: '0.5px solid var(--dsw-alias-border-l2, #eceff3)',
    cursor: 'pointer',
  },
  listRowActive: {
    background: 'var(--dsw-alias-interactive-bg-hover, #eceef2)',
  },
  listCell: {
    padding: '9px 10px',
    whiteSpace: 'nowrap',
  },
  listName: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
  },
  listNameText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 500,
    maxWidth: 280,
  },
  listMeta: {
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    fontSize: 12,
  },
  checkbox: {
    accentColor: 'var(--dsw-alias-brand-primary, #4d6bfe)',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    textAlign: 'center',
    padding: 40,
  },
  emptyTitle: {
    color: 'var(--dsw-alias-label-secondary, #6b7280)',
    fontSize: 14,
    fontWeight: 500,
  },
  emptyHint: {
    fontSize: 12.5,
    lineHeight: '20px',
    maxWidth: 340,
  },
  batchBar: {
    position: 'sticky',
    left: '50%',
    bottom: 12,
    transform: 'translateX(-50%)',
    zIndex: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 12px',
    borderRadius: 'var(--dsw-radius-lg, 12px)',
    background: 'var(--dsw-alias-bg-base, #fff)',
    border: '0.5px solid var(--dsw-alias-border-l2, #eceff3)',
    boxShadow: 'var(--dsw-elevation-prominent, 0 12px 32px -12px rgba(16,24,40,0.28))',
    width: 'fit-content',
  },
  batchButton: {
    height: 28,
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '0 10px',
    border: 'none',
    borderRadius: 'var(--dsw-radius-sm, 6px)',
    background: 'transparent',
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    font: 'inherit',
    fontSize: 12.5,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  batchButtonDanger: {
    color: 'var(--dsw-alias-state-error-primary, #d92d20)',
  },
  drawer: {
    flex: 'none',
    width: 372,
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    background: 'var(--dsw-alias-bg-base, #fff)',
    overflow: 'hidden',
  },
  drawerHead: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 14px 10px',
  },
  drawerTitle: {
    flex: '1 1 auto',
    minWidth: 0,
    fontSize: 14,
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  drawerIconBtn: {
    flex: 'none',
    width: 26,
    height: 26,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: 6,
    background: 'transparent',
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    cursor: 'pointer',
    padding: 0,
  },
  previewPane: {
    flex: '1 1 auto',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: '0 14px',
  },
  drawerTabs: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '8px 0',
  },
  drawerTab: {
    height: 26,
    padding: '0 10px',
    border: 'none',
    borderRadius: 13,
    background: 'transparent',
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    font: 'inherit',
    fontSize: 12,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  drawerTabActive: {
    background: 'var(--dsw-alias-interactive-bg-hover, #eceef2)',
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    fontWeight: 500,
  },
  previewStage: {
    flex: '1 1 auto',
    minHeight: 180,
    borderRadius: 'var(--dsw-radius-lg, 12px)',
    border: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  previewFill: {
    flex: '1 1 auto',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  drawerFacts: {
    flex: 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 0 6px',
  },
  factRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: '7px 2px',
    borderBottom: '0.5px solid var(--dsw-alias-border-l2, #eceff3)',
    fontSize: 12.5,
  },
  factKey: {
    color: 'var(--dsw-alias-label-secondary, #374151)',
    flex: 'none',
  },
  factValue: {
    textAlign: 'right',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: 'var(--dsw-alias-label-primary, #1f2937)',
  },
  drawerActions: {
    flex: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: '10px 14px 16px',
    borderTop: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
  },
  drawerPrimary: {
    height: 34,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    border: 'none',
    borderRadius: 'var(--dsw-radius-md, 8px)',
    background: 'var(--dsw-alias-button-primary-fill, #4d6bfe)',
    color: 'var(--dsw-alias-label-primary-foreground, #fff)',
    font: 'inherit',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
  },
  drawerSecondary: {
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    border: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    borderRadius: 'var(--dsw-radius-md, 8px)',
    background: 'transparent',
    color: 'var(--dsw-alias-label-secondary, #374151)',
    font: 'inherit',
    fontSize: 12,
    cursor: 'pointer',
  },
  exportRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  exportChip: {
    height: 26,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '0 9px',
    border: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    borderRadius: 13,
    background: 'transparent',
    color: 'var(--dsw-alias-label-secondary, #374151)',
    font: 'inherit',
    fontSize: 11.5,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  menu: {
    position: 'fixed',
    zIndex: 40,
    minWidth: 180,
    padding: 5,
    background: 'var(--dsw-alias-bg-base, #fff)',
    border: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    borderRadius: 10,
    boxShadow: 'var(--dsw-elevation-prominent, 0 12px 32px -12px rgba(16,24,40,0.28))',
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
    whiteSpace: 'nowrap',
  },
  menuItemDanger: {
    color: 'var(--dsw-alias-state-error-primary, #d92d20)',
  },
  menuHint: {
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    fontSize: 11,
    marginLeft: 'auto',
  },
  dialogOverlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    background: 'color-mix(in srgb, #101828 32%, transparent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    width: 340,
    padding: 18,
    borderRadius: 'var(--dsw-radius-lg, 12px)',
    background: 'var(--dsw-alias-bg-base, #fff)',
    border: '0.5px solid var(--dsw-alias-border-l2, #eceff3)',
    boxShadow: 'var(--dsw-elevation-prominent, 0 12px 32px -12px rgba(16,24,40,0.28))',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  dialogTitle: {
    fontSize: 14,
    fontWeight: 600,
  },
  dialogInput: {
    height: 34,
    border: '0.5px solid var(--dsw-alias-border-l4, #c4c9d0)',
    borderRadius: 'var(--dsw-radius-md, 8px)',
    background: 'var(--dsw-alias-bg-layer-3, #fff)',
    padding: '0 10px',
    font: 'inherit',
    fontSize: 13,
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    outline: 'none',
  },
  dialogHint: {
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    fontSize: 11.5,
    lineHeight: '17px',
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
  },
  dialogButton: {
    height: 30,
    padding: '0 12px',
    border: '0.5px solid var(--dsw-alias-border-l3, #e2e5ea)',
    borderRadius: 'var(--dsw-radius-md, 8px)',
    background: 'transparent',
    color: 'var(--dsw-alias-label-secondary, #374151)',
    font: 'inherit',
    fontSize: 12.5,
    cursor: 'pointer',
  },
  dialogButtonPrimary: {
    border: 'none',
    background: 'var(--dsw-alias-button-primary-fill, #4d6bfe)',
    color: 'var(--dsw-alias-label-primary-foreground, #fff)',
    fontWeight: 500,
  },
  dialogButtonDanger: {
    border: 'none',
    background: 'var(--dsw-alias-state-error-primary, #d92d20)',
    color: 'var(--dsw-alias-label-primary-foreground, #fff)',
    fontWeight: 500,
  },
  dropOverlay: {
    position: 'absolute',
    inset: 8,
    zIndex: 30,
    border: '2px dashed var(--dsw-alias-state-business-primary, #4d6bfe)',
    borderRadius: 'var(--dsw-radius-lg, 12px)',
    background: 'color-mix(in srgb, var(--dsw-alias-state-business-primary, #4d6bfe) 6%, transparent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--dsw-alias-state-business-primary, #4d6bfe)',
    fontSize: 13,
    fontWeight: 500,
    pointerEvents: 'none',
  },
  toast: {
    position: 'fixed',
    left: '50%',
    bottom: 64,
    transform: 'translateX(-50%)',
    zIndex: 60,
    padding: '9px 16px',
    borderRadius: 'var(--dsw-radius-md, 8px)',
    background: 'var(--dsw-alias-tooltip-bg, #101828)',
    color: 'var(--dsw-alias-tooltip-label, #fff)',
    fontSize: 12.5,
    boxShadow: 'var(--dsw-elevation-prominent, 0 12px 32px -12px rgba(16,24,40,0.28))',
    maxWidth: 420,
    lineHeight: '18px',
  },
}

// ── cross-component request bus (right-pane preview + drawer selection) ──────

export interface SpaceOpenRequest {
  docId: string
  sceneUrl?: string
  name: string
}

let openRequest: SpaceOpenRequest | null = null
const openRequestListeners = new Set<() => void>()

function emitOpenRequest(): void {
  for (const listener of [...openRequestListeners]) listener()
}

/** Ask the right CAD pane to preview a document (праview bar in the Part tab). */
export function requestCadPanePreview(request: SpaceOpenRequest): void {
  openRequest = request
  emitOpenRequest()
}

function consumeCadPanePreview(): SpaceOpenRequest | null {
  return openRequest
}

/** Subscribe (and take) the latest pane-preview request. */
export function subscribeCadPanePreview(listener: () => void): () => void {
  openRequestListeners.add(listener)
  return () => {
    openRequestListeners.delete(listener)
  }
}

function useCadPanePreviewRequest(): SpaceOpenRequest | null {
  const getSnapshot = useCallback((): SpaceOpenRequest | null => consumeCadPanePreview(), [])
  return useSyncExternalStore(subscribeCadPanePreview, getSnapshot, getSnapshot)
}

// ── host service faces ───────────────────────────────────────────────────────

interface LayoutLike {
  selectPanel?: (panelId: string | null) => void
}

interface UiWorkspaceLike {
  startSession?: () => void
}

export interface CadSpacePageProps {
  ctx?: {
    get?: (name: string) => unknown
  }
  /** Standard root `useSessions` hook (fallback when `uiSession` is absent). */
  useSessions?: <S>(selector: (state: unknown) => S) => S
  [extra: string]: unknown
}

/** Resolve the current main-view session id, uiSession first, hook second. */
function useCurrentSessionId(props: CadSpacePageProps): string | null {
  const fromUiSession = useMemo(() => {
    const uiSession = props.ctx?.get?.('uiSession') as {
      adapter?: { current?: { getSnapshot?: () => { key?: unknown } } }
    } | undefined
    const key = uiSession?.adapter?.current?.getSnapshot?.().key
    return typeof key === 'string' && key !== '' ? key : null
  }, [props.ctx])
  const fromHook = props.useSessions?.((state: unknown) => {
    const record = state as { byId?: Record<string, { retainedBy?: { mainView?: number } }> } | null
    const byId = record?.byId
    if (byId === undefined) return null
    for (const [id, session] of Object.entries(byId)) {
      if ((session.retainedBy?.mainView ?? 0) > 0) return id
    }
    return null
  })
  if (fromUiSession !== null) return fromUiSession
  return typeof fromHook === 'string' && fromHook !== '' ? fromHook : null
}

// ── the page ─────────────────────────────────────────────────────────────────

export function CadSpacePage(props: CadSpacePageProps): JSX.Element {
  const snapshot = useSpaceSnapshot()
  const sessionId = useCurrentSessionId(props)
  const [filter, setFilter] = useState<FilterKind>('all')
  const [folderId, setFolderId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [view, setView] = useState<ViewKind>('grid')
  const [sort, setSort] = useState<SortKey>('updatedAt')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [checked, setChecked] = useState<ReadonlySet<string>>(new Set())
  const [menu, setMenu] = useState<{ x: number; y: number; doc?: SpaceDoc; folder?: SpaceFolder } | null>(null)
  const [dialog, setDialog] = useState<'new-doc' | 'new-folder' | 'rename-doc' | 'rename-folder' | 'delete-doc' | 'delete-folder' | null>(null)
  const [dialogTarget, setDialogTarget] = useState<SpaceDoc | SpaceFolder | null>(null)
  const [dialogText, setDialogText] = useState('')
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const notify = useCallback((message: string): void => {
    setToast(message)
    window.setTimeout(() => setToast(null), 2600)
  }, [])

  const folders = snapshot?.folders ?? []
  const docs = snapshot?.docs ?? []

  const folderChildren = useMemo(() => {
    const map = new Map<string | null, SpaceFolder[]>()
    for (const folder of folders) {
      const key = folder.parentId ?? null
      const list = map.get(key) ?? []
      list.push(folder)
      map.set(key, list)
    }
    for (const list of map.values()) list.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
    return map
  }, [folders])

  const breadcrumb = useMemo(() => {
    const byId = new Map(folders.map((folder) => [folder.id, folder]))
    const crumbs: SpaceFolder[] = []
    let current = folderId
    while (current !== null) {
      const folder = byId.get(current)
      if (folder === undefined) break
      crumbs.unshift(folder)
      current = folder.parentId
    }
    return crumbs
  }, [folders, folderId])

  const visibleDocs = useMemo(() => {
    const query = search.trim().toLowerCase()
    const matched = docs.filter((doc) => {
      if ((doc.folderId ?? null) !== folderId) return false
      if (filter === 'part' && badgeOf(doc) !== 'part') return false
      if (filter === 'assembly' && badgeOf(doc) !== 'assembly') return false
      if (filter === 'drawing' && badgeOf(doc) !== 'drawing') return false
      if (query !== '' && !doc.name.toLowerCase().includes(query)) return false
      return true
    })
    const sorted = [...matched]
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
    else if (sort === 'size') sorted.sort((a, b) => b.sizeBytes - a.sizeBytes)
    else sorted.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    return sorted
  }, [docs, folderId, filter, search, sort])

  const visibleFolders = useMemo(() => {
    const query = search.trim().toLowerCase()
    const children = folderChildren.get(folderId) ?? []
    return query === '' ? children : children.filter((folder) => folder.name.toLowerCase().includes(query))
  }, [folderChildren, folderId, search])

  const selectedDoc = useMemo(
    () => docs.find((doc) => doc.id === selectedId) ?? null,
    [docs, selectedId],
  )

  const counts = useMemo(() => {
    const result = { part: 0, assembly: 0, drawing: 0 }
    for (const doc of docs) {
      const badge = badgeOf(doc)
      if (badge === 'part') result.part += 1
      else if (badge === 'assembly') result.assembly += 1
      else if (badge === 'drawing') result.drawing += 1
    }
    return result
  }, [docs])

  useEffect(() => {
    if (menu === null) return
    const onPointerDown = (event: PointerEvent): void => {
      const target = event.target as Element | null
      if (target !== null && target.closest?.('[data-space-menu="true"]') !== null) return
      setMenu(null)
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setMenu(null)
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menu])

  const runAction = useCallback(async (fn: () => Promise<unknown>, successMessage?: string): Promise<boolean> => {
    setBusy(true)
    try {
      await fn()
      if (successMessage !== undefined) notify(successMessage)
      return true
    } catch (error) {
      notify(error instanceof Error ? error.message : String(error))
      return false
    } finally {
      setBusy(false)
    }
  }, [notify])

  const openDialog = useCallback((kind: typeof dialog, target?: SpaceDoc | SpaceFolder): void => {
    setDialog(kind)
    setDialogTarget(target ?? null)
    setDialogText(target !== undefined && 'name' in target ? target.name : '')
  }, [])

  const submitDialog = useCallback(async (): Promise<void> => {
    if (dialog === null || busy) return
    const ok = await runAction(async () => {
      if (dialog === 'new-doc') {
        await postSpace('docs/create', { name: dialogText.trim(), folderId })
      } else if (dialog === 'new-folder') {
        await postSpace('folders/create', { name: dialogText.trim(), parentId: folderId })
      } else if (dialog === 'rename-doc' && dialogTarget !== null && 'opCount' in dialogTarget) {
        await postSpace('docs/rename', { id: dialogTarget.id, name: dialogText.trim() })
      } else if (dialog === 'rename-folder' && dialogTarget !== null && !('opCount' in dialogTarget)) {
        await postSpace('folders/rename', { id: dialogTarget.id, name: dialogText.trim() })
      } else if (dialog === 'delete-doc' && dialogTarget !== null) {
        await postSpace('docs/delete', { ids: [dialogTarget.id] })
        if (selectedId === dialogTarget.id) setSelectedId(null)
      } else if (dialog === 'delete-folder' && dialogTarget !== null) {
        await postSpace('folders/delete', { id: dialogTarget.id, mode: 'cascade' })
        if (folderId === dialogTarget.id) setFolderId(dialogTarget.parentId ?? null)
      }
    })
    if (ok) {
      setDialog(null)
      setDialogTarget(null)
    }
  }, [dialog, busy, runAction, dialogText, folderId, dialogTarget, selectedId])

  const activateInSession = useCallback(async (doc: SpaceDoc): Promise<void> => {
    const response = await fetch('/dsh-cad/space/activate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: doc.id, sessionId: sessionId ?? '_default' }),
    })
    const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>
    if (!response.ok) throw new Error(typeof payload.error === 'string' ? payload.error : `HTTP ${response.status}`)
    await refreshSpaceSnapshot()
  }, [sessionId])

  const openInConversation = useCallback(async (doc: SpaceDoc): Promise<void> => {
    const ok = await runAction(() => activateInSession(doc), `已将「${doc.name}」设为当前会话文档`)
    if (!ok) return
    if (sessionId === null) {
      const workspace = props.ctx?.get?.('uiWorkspace') as UiWorkspaceLike | undefined
      workspace?.startSession?.()
    }
    const layout = props.ctx?.get?.('layout') as LayoutLike | undefined
    try {
      layout?.selectPanel?.(null)
    } catch {
      /* a host without layout keeps the drive open */
    }
  }, [activateInSession, runAction, sessionId, props.ctx])

  const openInCadPane = useCallback(async (doc: SpaceDoc): Promise<void> => {
    await runAction(() => activateInSession(doc))
    requestCadPanePreview({ docId: doc.id, name: doc.name, sceneUrl: doc.partSceneUrl })
    const layout = props.ctx?.get?.('layout') as LayoutLike | undefined
    try {
      layout?.selectPanel?.(null)
    } catch {
      /* host without layout keeps the drive open */
    }
  }, [activateInSession, runAction, props.ctx])

  const exportDoc = useCallback((doc: SpaceDoc, format: 'dcprt' | 'step' | 'stl' | 'svg' | 'dxf'): void => {
    downloadDoc(doc, format)
    notify(`正在导出 ${doc.name}.${format}`)
  }, [notify])

  const moveChecked = useCallback(async (targetFolderId: string | null): Promise<void> => {
    if (checked.size === 0) return
    const ok = await runAction(async () => {
      for (const id of checked) {
        await postSpace('docs/move', { id, folderId: targetFolderId })
      }
    }, `已移动 ${checked.size} 个文档`)
    if (ok) setChecked(new Set())
  }, [checked, runAction])

  const deleteChecked = useCallback(async (): Promise<void> => {
    if (checked.size === 0) return
    const target = new Set(checked)
    const ok = await runAction(async () => {
      await postSpace('docs/delete', { ids: [...target] })
    }, `已删除 ${target.size} 个文档`)
    if (ok) {
      setChecked(new Set())
      if (selectedId !== null && target.has(selectedId)) setSelectedId(null)
    }
  }, [checked, runAction, selectedId])

  const onDrop = useCallback(async (event: React.DragEvent): Promise<void> => {
    event.preventDefault()
    setDragging(false)
    const files = Array.from(event.dataTransfer?.files ?? [])
    if (files.length === 0) return
    await runAction(async () => {
      for (const file of files) {
        await importFile(file, folderId)
      }
    }, files.length === 1 ? `已导入 ${files[0]!.name}` : `已导入 ${files.length} 个文件`)
  }, [folderId, runAction])

  const folderTree = useCallback((parentId: string | null, depth: number): JSX.Element[] => {
    const children = folderChildren.get(parentId) ?? []
    return children.map((folder) => (
      <React.Fragment key={folder.id}>
        <button
          type="button"
          style={{
            ...styles.folderRow,
            paddingLeft: 8 + depth * 14,
            ...(folderId === folder.id ? styles.railRowActive : {}),
          }}
          onClick={() => { setFolderId(folder.id) }}
          onContextMenu={(event) => {
            event.preventDefault()
            setMenu({ x: event.clientX, y: event.clientY, folder })
          }}
        >
          <FolderGlyph />
          <span style={styles.folderName}>{folder.name}</span>
          <span
            style={styles.folderDots}
            role="button"
            tabIndex={-1}
            onClick={(event) => {
              event.stopPropagation()
              setMenu({ x: event.clientX, y: event.clientY, folder })
            }}
          >
            <DotsGlyph />
          </span>
        </button>
        {folderTree(folder.id, depth + 1)}
      </React.Fragment>
    ))
  }, [folderChildren, folderId])

  const railRow = useCallback((kind: FilterKind, label: string, count?: number): JSX.Element => (
    <button
      type="button"
      style={{ ...styles.railRow, ...(filter === kind ? styles.railRowActive : {}) }}
      onClick={() => { setFilter(kind) }}
    >
      <span>{label}</span>
      {count !== undefined ? <span style={styles.railCount}>{count}</span> : null}
    </button>
  ), [filter])

  const statChip = useCallback((label: string): JSX.Element => <span style={styles.statChip}>{label}</span>, [])

  const docBadge = useCallback((badge: FileBadge): JSX.Element => (
    <span style={{ ...styles.cardBadge, color: BADGE_COLOR[badge] }}>{BADGE_LABEL[badge]}</span>
  ), [])

  const docIcon = useCallback((badge: FileBadge): JSX.Element => (
    <span style={styles.cardIcon}>
      {badge === 'assembly' ? <AssemblyGlyph /> : badge === 'drawing' ? <DrawingGlyph /> : <PartGlyph />}
    </span>
  ), [])

  const docCard = useCallback((doc: SpaceDoc): JSX.Element => {
    const badge = badgeOf(doc)
    const isSelected = selectedId === doc.id
    return (
      <button
        key={doc.id}
        type="button"
        style={{ ...styles.card, ...(isSelected ? styles.cardActive : {}) }}
        onClick={() => { setSelectedId(doc.id) }}
        onDoubleClick={() => { void openInConversation(doc) }}
        onContextMenu={(event) => {
          event.preventDefault()
          setSelectedId(doc.id)
          setMenu({ x: event.clientX, y: event.clientY, doc })
        }}
      >
        <span style={styles.cardTop}>
          {docIcon(badge)}
          <span style={styles.cardName}>
            <span style={styles.cardTitle}>{doc.name}</span>
            <span style={styles.cardMeta}>{relTime(doc.updatedAt)} · {humanSize(doc.sizeBytes)}</span>
          </span>
        </span>
        <span style={styles.cardStats}>
          {doc.bodyCount > 0 ? statChip(`${doc.bodyCount} 体`) : null}
          {doc.instanceCount > 0 ? statChip(`${doc.instanceCount} 实例`) : null}
          {doc.sketchCount > 0 ? statChip(`${doc.sketchCount} 草图`) : null}
          {doc.drawingCount > 0 ? statChip(`${doc.drawingCount} 图`) : null}
        </span>
        <span style={styles.cardFooter}>
          {docBadge(badge)}
          {sessionId !== null && doc.boundSessions.includes(sessionId) ? <span style={styles.cardBadge}>· 当前</span> : null}
          <span
            style={styles.cardMenu}
            role="button"
            tabIndex={-1}
            onClick={(event) => {
              event.stopPropagation()
              setMenu({ x: event.clientX, y: event.clientY, doc })
            }}
          >
            <DotsGlyph />
          </span>
        </span>
      </button>
    )
  }, [selectedId, openInConversation, docIcon, statChip, docBadge, sessionId])

  const docRow = useCallback((doc: SpaceDoc): JSX.Element => {
    const badge = badgeOf(doc)
    const isSelected = selectedId === doc.id
    return (
      <tr
        key={doc.id}
        style={{ ...styles.listRow, ...(isSelected ? styles.listRowActive : {}) }}
        onClick={() => { setSelectedId(doc.id) }}
        onDoubleClick={() => { void openInConversation(doc) }}
        onContextMenu={(event) => {
          event.preventDefault()
          setSelectedId(doc.id)
          setMenu({ x: event.clientX, y: event.clientY, doc })
        }}
      >
        <td style={styles.listCell}>
          <input
            type="checkbox"
            style={styles.checkbox}
            checked={checked.has(doc.id)}
            onChange={(event) => {
              const next = new Set(checked)
              if (event.target.checked) next.add(doc.id)
              else next.delete(doc.id)
              setChecked(next)
            }}
            onClick={(event) => event.stopPropagation()}
          />
        </td>
        <td style={styles.listCell}>
          <span style={styles.listName}>
            {docIcon(badge)}
            <span style={styles.listNameText}>{doc.name}</span>
            {docBadge(badge)}
            {sessionId !== null && doc.boundSessions.includes(sessionId) ? <span style={styles.cardBadge}>· 当前</span> : null}
          </span>
        </td>
        <td style={{ ...styles.listCell, ...styles.listMeta }}>{doc.folderPath}</td>
        <td style={{ ...styles.listCell, ...styles.listMeta }}>
          {doc.bodyCount > 0 ? `${doc.bodyCount} 体` : '—'}
          {doc.instanceCount > 0 ? ` · ${doc.instanceCount} 实例` : ''}
          {doc.drawingCount > 0 ? ` · ${doc.drawingCount} 图` : ''}
        </td>
        <td style={{ ...styles.listCell, ...styles.listMeta }}>{humanSize(doc.sizeBytes)}</td>
        <td style={{ ...styles.listCell, ...styles.listMeta }}>{relTime(doc.updatedAt)}</td>
        <td style={styles.listCell}>
          <span
            style={styles.cardMenu}
            role="button"
            tabIndex={-1}
            onClick={(event) => {
              event.stopPropagation()
              setMenu({ x: event.clientX, y: event.clientY, doc })
            }}
          >
            <DotsGlyph />
          </span>
        </td>
      </tr>
    )
  }, [checked, selectedId, openInConversation, docIcon, docBadge, sessionId])

  const menuItems: JSX.Element[] = []
  if (menu?.doc !== undefined) {
    const doc = menu.doc
    menuItems.push(
      <button key="open" type="button" style={styles.menuItem} onClick={() => { setMenu(null); void openInConversation(doc) }}>
        <span>在对话中打开</span>
        <span style={styles.menuHint}>设为当前文档</span>
      </button>,
      <button key="pane" type="button" style={styles.menuItem} onClick={() => { setMenu(null); void openInCadPane(doc) }}>
        <span>在右侧 CAD 面板预览</span>
      </button>,
      <button key="rename" type="button" style={styles.menuItem} onClick={() => { setMenu(null); openDialog('rename-doc', doc) }}>
        <span>重命名</span>
      </button>,
      <button key="duplicate" type="button" style={styles.menuItem} onClick={() => { setMenu(null); void runAction(() => postSpace('docs/duplicate', { id: doc.id }), '已创建副本') }}>
        <span>创建副本</span>
      </button>,
      <button key="export-dcprt" type="button" style={styles.menuItem} onClick={() => { setMenu(null); exportDoc(doc, 'dcprt') }}>
        <span>导出 .dcprt</span>
        <span style={styles.menuHint}>可再编辑</span>
      </button>,
      <button key="export-step" type="button" style={styles.menuItem} onClick={() => { setMenu(null); exportDoc(doc, 'step') }}>
        <span>导出 .step</span>
      </button>,
      <button key="export-stl" type="button" style={styles.menuItem} onClick={() => { setMenu(null); exportDoc(doc, 'stl') }}>
        <span>导出 .stl</span>
      </button>,
      <button key="export-svg" type="button" style={styles.menuItem} onClick={() => { setMenu(null); exportDoc(doc, 'svg') }}>
        <span>导出 .svg</span>
      </button>,
      <button key="export-dxf" type="button" style={styles.menuItem} onClick={() => { setMenu(null); exportDoc(doc, 'dxf') }}>
        <span>导出 .dxf</span>
      </button>,
      <button key="delete" type="button" style={{ ...styles.menuItem, ...styles.menuItemDanger }} onClick={() => { setMenu(null); openDialog('delete-doc', doc) }}>
        <span>删除</span>
      </button>,
    )
  }
  if (menu?.folder !== undefined) {
    const folder = menu.folder
    menuItems.push(
      <button key="fdoc" type="button" style={styles.menuItem} onClick={() => { setMenu(null); setFolderId(folder.id); openDialog('new-doc') }}>
        <span>在此新建文档</span>
      </button>,
      <button key="fnew" type="button" style={styles.menuItem} onClick={() => { setMenu(null); setFolderId(folder.id); openDialog('new-folder') }}>
        <span>在此新建文件夹</span>
      </button>,
      <button key="frename" type="button" style={styles.menuItem} onClick={() => { setMenu(null); openDialog('rename-folder', folder) }}>
        <span>重命名</span>
      </button>,
      <button key="fdelete" type="button" style={{ ...styles.menuItem, ...styles.menuItemDanger }} onClick={() => { setMenu(null); openDialog('delete-folder', folder) }}>
        <span>删除文件夹</span>
        <span style={styles.menuHint}>含子内容</span>
      </button>,
    )
  }

  return (
    <div style={styles.page} data-cad-space="">
      <aside style={styles.rail}>
        <div style={styles.railTitle}>
          <CadSpaceGlyph size={17} />
          CAD 空间
        </div>
        <button type="button" style={styles.railPrimary} onClick={() => openDialog('new-doc')}>
          ＋ 新建模文档
        </button>
        <button type="button" style={styles.railAction} onClick={() => openDialog('new-folder')}>
          ＋ 新建文件夹
        </button>
        <button
          type="button"
          style={styles.railAction}
          onClick={() => {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '.stl,.obj,.step,.stp,.iges,.igs,.brep,.dcprt'
            input.multiple = true
            input.onchange = () => {
              const files = Array.from(input.files ?? [])
              if (files.length === 0) return
              void runAction(async () => {
                for (const file of files) await importFile(file, folderId)
              }, `已导入 ${files.length} 个文件`)
            }
            input.click()
          }}
        >
          ⬆ 导入 CAD 文件
        </button>
        {railRow('all', '全部文件', docs.length)}
        {railRow('part', '零件', counts.part)}
        {railRow('assembly', '装配体', counts.assembly)}
        {railRow('drawing', '工程图', counts.drawing)}
        <div style={styles.railSection}>文件夹</div>
        <button
          type="button"
          style={{ ...styles.folderRow, ...(folderId === null ? styles.railRowActive : {}) }}
          onClick={() => { setFolderId(null) }}
        >
          <FolderGlyph />
          <span style={styles.folderName}>全部文件</span>
        </button>
        {folderTree(null, 1)}
        <div style={styles.railFoot}>
          {docs.length} 文档 · {folders.length} 文件夹
          <br />
          {counts.part} 零件 · {counts.assembly} 装配 · {counts.drawing} 工程图
        </div>
      </aside>

      <div style={styles.main}>
        <div style={styles.header}>
          <span style={styles.headerTitle}>CAD 空间</span>
          <span style={styles.headerSub}>
            {sessionId !== null
              ? '工作区建模文档 · 双击在当前会话中打开，右键有完整操作'
              : '当前没有活动会话 · 打开文档会先新建一个会话'}
          </span>
          <button type="button" style={styles.headerButton} onClick={() => openDialog('new-folder')}>
            新建文件夹
          </button>
          <button type="button" style={styles.headerPrimary} onClick={() => openDialog('new-doc')}>
            新建模文档
          </button>
        </div>
        <div style={styles.toolbar}>
          <div style={styles.breadcrumb}>
            <button type="button" style={{ ...styles.crumb, ...(folderId === null ? styles.crumbActive : {}) }} onClick={() => setFolderId(null)}>
              全部文件
            </button>
            {breadcrumb.map((folder) => (
              <React.Fragment key={folder.id}>
                <ChevronRight />
                <button
                  type="button"
                  style={{ ...styles.crumb, ...(folderId === folder.id ? styles.crumbActive : {}) }}
                  onClick={() => setFolderId(folder.id)}
                >
                  {folder.name}
                </button>
              </React.Fragment>
            ))}
          </div>
          <span style={styles.searchBox}>
            <SearchGlyph />
            <input
              style={styles.searchInput}
              value={search}
              placeholder="搜索文档…"
              onChange={(event) => setSearch(event.target.value)}
            />
          </span>
          <button
            type="button"
            style={{ ...styles.toolButton, ...(sort === 'updatedAt' ? styles.toolButtonActive : {}) }}
            title="按更新时间排序"
            onClick={() => setSort('updatedAt')}
          >
            时间
          </button>
          <button
            type="button"
            style={{ ...styles.toolButton, ...(sort === 'name' ? styles.toolButtonActive : {}) }}
            title="按名称排序"
            onClick={() => setSort('name')}
          >
            名
          </button>
          <button
            type="button"
            style={{ ...styles.toolButton, ...(sort === 'size' ? styles.toolButtonActive : {}) }}
            title="按大小排序"
            onClick={() => setSort('size')}
          >
            大小
          </button>
          <button
            type="button"
            style={{ ...styles.toolButton, ...(view === 'grid' ? styles.toolButtonActive : {}) }}
            title="网格视图"
            onClick={() => setView('grid')}
          >
            <GridGlyph />
          </button>
          <button
            type="button"
            style={{ ...styles.toolButton, ...(view === 'list' ? styles.toolButtonActive : {}) }}
            title="列表视图"
            onClick={() => setView('list')}
          >
            <ListGlyph />
          </button>
        </div>
        <div
          style={styles.scroll}
          onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
          onDragLeave={(event) => {
            if (event.currentTarget === event.target) setDragging(false)
          }}
          onDrop={(event) => { void onDrop(event) }}
        >
          {dragging ? <div style={styles.dropOverlay}>松开以导入到「{breadcrumb.at(-1)?.name ?? '全部文件'}」</div> : null}
          {visibleFolders.length === 0 && visibleDocs.length === 0 ? (
            <div style={{ ...styles.empty, paddingTop: 80 }}>
              <div style={styles.emptyTitle}>
                {search !== '' ? '没有匹配的文档' : '这里还是空的'}
              </div>
              <div style={styles.emptyHint}>
                {search !== ''
                  ? '试试其他关键词，或切换到其他文件夹。'
                  : '在对话中让 AI 建模，或在左栏导入 .dcprt / .step / .stl 文件，也可以直接把文件拖进来。'}
              </div>
            </div>
          ) : view === 'grid' ? (
            <>
              {visibleFolders.length > 0 ? (
                <div style={{ ...styles.grid, marginBottom: 12 }}>
                  {visibleFolders.map((folder) => (
                    <button
                      key={folder.id}
                      type="button"
                      style={styles.card}
                      onClick={() => setFolderId(folder.id)}
                      onContextMenu={(event) => {
                        event.preventDefault()
                        setMenu({ x: event.clientX, y: event.clientY, folder })
                      }}
                    >
                      <span style={styles.cardTop}>
                        <span style={styles.cardIcon}><FolderGlyph /></span>
                        <span style={styles.cardName}>
                          <span style={styles.cardTitle}>{folder.name}</span>
                          <span style={styles.cardMeta}>{relTime(folder.updatedAt)}</span>
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
              {visibleDocs.length > 0 ? <div style={styles.grid}>{visibleDocs.map((doc) => docCard(doc))}</div> : null}
            </>
          ) : (
            <table style={styles.listTable}>
              <thead>
                <tr>
                  <th style={{ ...styles.listHead, width: 32 }} />
                  <th style={styles.listHead}>名称</th>
                  <th style={styles.listHead}>位置</th>
                  <th style={styles.listHead}>内容</th>
                  <th style={styles.listHead}>大小</th>
                  <th style={styles.listHead}>更新</th>
                  <th style={{ ...styles.listHead, width: 32 }} />
                </tr>
              </thead>
              <tbody>
                {visibleFolders.map((folder) => (
                  <tr
                    key={folder.id}
                    style={styles.listRow}
                    onClick={() => setFolderId(folder.id)}
                    onContextMenu={(event) => {
                      event.preventDefault()
                      setMenu({ x: event.clientX, y: event.clientY, folder })
                    }}
                  >
                    <td style={styles.listCell} />
                    <td style={styles.listCell}>
                      <span style={styles.listName}>
                        <span style={styles.cardIcon}><FolderGlyph /></span>
                        <span style={styles.listNameText}>{folder.name}</span>
                        <span style={styles.cardBadge}>文件夹</span>
                      </span>
                    </td>
                    <td style={{ ...styles.listCell, ...styles.listMeta }}>{folderPathOf(folder, folders)}</td>
                    <td style={{ ...styles.listCell, ...styles.listMeta }}>—</td>
                    <td style={{ ...styles.listCell, ...styles.listMeta }}>—</td>
                    <td style={{ ...styles.listCell, ...styles.listMeta }}>{relTime(folder.updatedAt)}</td>
                    <td style={styles.listCell} />
                  </tr>
                ))}
                {visibleDocs.map((doc) => docRow(doc))}
              </tbody>
            </table>
          )}
          {checked.size > 0 ? (
            <div style={styles.batchBar} data-space-batch="">
              <span style={styles.listMeta}>已选 {checked.size} 项</span>
              <button type="button" style={styles.batchButton} onClick={() => { void moveChecked(folderId) }}>
                移到此文件夹
              </button>
              <button type="button" style={styles.batchButton} onClick={() => { void moveChecked(null) }}>
                移到根目录
              </button>
              <button type="button" style={{ ...styles.batchButton, ...styles.batchButtonDanger }} onClick={() => { void deleteChecked() }}>
                删除
              </button>
              <button type="button" style={styles.batchButton} onClick={() => setChecked(new Set())}>
                取消选择
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {selectedDoc !== null ? (
        <DetailDrawer
          doc={selectedDoc}
          onClose={() => setSelectedId(null)}
          onOpenConversation={openInConversation}
          onOpenCadPane={openInCadPane}
          notify={notify}
        />
      ) : null}

      {menu !== null ? (
        <div
          style={{ ...styles.menu, left: Math.min(menu.x, window.innerWidth - 210), top: Math.min(menu.y, window.innerHeight - 340) }}
          data-space-menu="true"
        >
          {menuItems}
        </div>
      ) : null}

      {dialog !== null ? (
        <div style={styles.dialogOverlay} onPointerDown={(event) => { if (event.target === event.currentTarget) setDialog(null) }}>
          <div style={styles.dialog}>
            <div style={styles.dialogTitle}>
              {dialog === 'new-doc' ? '新建建模文档'
                : dialog === 'new-folder' ? '新建文件夹'
                : dialog === 'rename-doc' ? '重命名文档'
                : dialog === 'rename-folder' ? '重命名文件夹'
                : dialog === 'delete-doc' ? '删除文档'
                : '删除文件夹'}
            </div>
            {dialog === 'delete-doc' || dialog === 'delete-folder' ? (
              <>
                <div style={styles.dialogHint}>
                  {dialog === 'delete-doc'
                    ? `确定删除「${dialogTarget !== null && 'name' in dialogTarget ? dialogTarget.name : ''}」？该操作不可撤销。`
                    : `确定删除文件夹「${dialogTarget !== null && 'name' in dialogTarget ? dialogTarget.name : ''}」及其中的全部文档与子文件夹？该操作不可撤销。`}
                </div>
                <div style={styles.dialogActions}>
                  <button type="button" style={styles.dialogButton} onClick={() => setDialog(null)}>取消</button>
                  <button type="button" style={{ ...styles.dialogButton, ...styles.dialogButtonDanger }} disabled={busy} onClick={() => { void submitDialog() }}>
                    删除
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  style={styles.dialogInput}
                  value={dialogText}
                  autoFocus
                  placeholder={dialog === 'new-doc' ? '文档名称（留空自动命名）' : '文件夹名称（留空自动命名）'}
                  onChange={(event) => setDialogText(event.target.value)}
                  onKeyDown={(event) => { if (event.key === 'Enter') void submitDialog() }}
                />
                {dialog === 'new-doc' ? <div style={styles.dialogHint}>新建后可在右侧 CAD 面板或对话里继续建模。</div> : null}
                <div style={styles.dialogActions}>
                  <button type="button" style={styles.dialogButton} onClick={() => setDialog(null)}>取消</button>
                  <button type="button" style={{ ...styles.dialogButton, ...styles.dialogButtonPrimary }} disabled={busy} onClick={() => { void submitDialog() }}>
                    确定
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}

      {toast !== null ? <div style={styles.toast}>{toast}</div> : null}
    </div>
  )
}

// ── detail drawer (live CAD previews) ────────────────────────────────────────

interface DetailDrawerProps {
  doc: SpaceDoc
  onClose(): void
  onOpenConversation(doc: SpaceDoc): Promise<void>
  onOpenCadPane(doc: SpaceDoc): Promise<void>
  notify(message: string): void
}

/** Minimal scene fetcher (mirrors viewport.tsx's useScene + binary decode). */
function useScene(sceneUrl: string | undefined): { scene: Parameters<typeof Viewport>[0]['scene'] & (object | null); error: string | null } {
  const [scene, setScene] = useState<Parameters<typeof Viewport>[0]['scene'] & (object | null)>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (sceneUrl === undefined) {
      setScene(null)
      setError(null)
      return
    }
    let cancelled = false
    setError(null)
    const isBinary = sceneUrl.includes('/dsh-cad/bin/')
    fetch(sceneUrl)
      .then(async (response) => {
        if (!response.ok) throw new Error(`scene fetch failed: HTTP ${response.status}`)
        if (isBinary) {
          const buffer = await response.arrayBuffer()
          const view = new DataView(buffer)
          const magic = view.getUint32(0, true)
          if (magic !== 0x31424344) throw new Error('bad scene magic')
          const headerLength = view.getUint32(4, true)
          const headerText = new TextDecoder().decode(new Uint8Array(buffer, 8, headerLength)).replace(/\u0000+$/, '')
          const header = JSON.parse(headerText) as {
            meshes: Array<{ name: string; color?: number; mode?: 'wire' | 'fill' | 'points'; vertexCount: number; triangleCount: number; posOffset: number; posBytes: number; nrmOffset?: number; nrmBytes?: number; idxOffset: number; idxBytes: number }>
            bounds: { min: [number, number, number]; max: [number, number, number] }
            units: string
          }
          const payloadStart = 8 + headerLength
          const meshes = header.meshes.map((desc) => ({
            name: desc.name,
            ...(desc.color === undefined ? {} : { color: desc.color }),
            ...(desc.mode === undefined ? {} : { mode: desc.mode }),
            positions: new Float32Array(buffer, payloadStart + desc.posOffset, desc.posBytes / 4),
            ...(desc.nrmOffset === undefined ? {} : { normals: new Float32Array(buffer, payloadStart + desc.nrmOffset, (desc.nrmBytes ?? 0) / 4) }),
            indices: new Uint32Array(buffer, payloadStart + desc.idxOffset, desc.idxBytes / 4),
            vertexCount: desc.vertexCount,
            triangleCount: desc.triangleCount,
          }))
          return {
            kind: '3d',
            format: 'model',
            meshes,
            bounds: {
              min: { x: header.bounds.min[0], y: header.bounds.min[1], z: header.bounds.min[2] },
              max: { x: header.bounds.max[0], y: header.bounds.max[1], z: header.bounds.max[2] },
            },
            units: header.units,
          } as Parameters<typeof Viewport>[0]['scene'] & object
        }
        return (await response.json()) as Parameters<typeof Viewport>[0]['scene'] & object
      })
      .then((loaded) => {
        if (!cancelled) setScene(loaded)
      })
      .catch((cause: unknown) => {
        if (!cancelled) setError(cause instanceof Error ? cause.message : String(cause))
      })
    return () => {
      cancelled = true
    }
  }, [sceneUrl])
  return { scene, error }
}

function DetailDrawer({ doc, onClose, onOpenConversation, onOpenCadPane, notify }: DetailDrawerProps): JSX.Element {
  const theme = useCadTheme()
  const [tab, setTab] = useState<PreviewTab>(doc.instanceCount > 0 ? 'assembly' : 'part')
  const [materializing, setMaterializing] = useState(false)

  const ensureScene = useCallback(async (): Promise<void> => {
    if (doc.partSceneUrl !== undefined || doc.opCount === 0) return
    setMaterializing(true)
    try {
      await postSpace('preview', { id: doc.id })
    } catch (error) {
      notify(error instanceof Error ? error.message : String(error))
    } finally {
      setMaterializing(false)
    }
  }, [doc.id, doc.opCount, doc.partSceneUrl, notify])

  useEffect(() => {
    void ensureScene()
  }, [ensureScene])

  const partScene = useScene(doc.partSceneUrl)
  const assemblyScene = useScene(doc.assemblySceneUrl)
  const drawingScene = useScene(doc.drawingSceneUrl)
  const tabScene = tab === 'part' ? partScene : tab === 'assembly' ? assemblyScene : drawingScene
  const tabUrl = tab === 'part' ? doc.partSceneUrl : tab === 'assembly' ? doc.assemblySceneUrl : doc.drawingSceneUrl

  const factRow = useCallback((key: string, value: string): JSX.Element => (
    <div style={styles.factRow}>
      <span style={styles.factKey}>{key}</span>
      <span style={styles.factValue}>{value}</span>
    </div>
  ), [])

  return (
    <aside style={styles.drawer} data-cad-space-drawer="">
      <div style={styles.drawerHead}>
        <span style={{ ...styles.cardIcon, width: 28, height: 28 }}>
          {badgeOf(doc) === 'assembly' ? <AssemblyGlyph /> : badgeOf(doc) === 'drawing' ? <DrawingGlyph /> : <PartGlyph />}
        </span>
        <span style={styles.drawerTitle}>{doc.name}</span>
        <button type="button" style={styles.drawerIconBtn} onClick={onClose} aria-label="关闭预览" title="关闭预览">
          <CloseGlyph />
        </button>
      </div>
      <div style={styles.previewPane}>
        <div style={styles.drawerTabs}>
          <button type="button" style={{ ...styles.drawerTab, ...(tab === 'part' ? styles.drawerTabActive : {}) }} onClick={() => setTab('part')}>
            <PartGlyph /> 零件
          </button>
          <button
            type="button"
            style={{ ...styles.drawerTab, ...(tab === 'assembly' ? styles.drawerTabActive : {}), ...(doc.instanceCount === 0 ? { opacity: 0.4, cursor: 'default' } : {}) }}
            onClick={() => { if (doc.instanceCount > 0) setTab('assembly') }}
          >
            <AssemblyGlyph /> 装配
          </button>
          <button
            type="button"
            style={{ ...styles.drawerTab, ...(tab === 'drawing' ? styles.drawerTabActive : {}), ...(doc.drawingCount === 0 ? { opacity: 0.4, cursor: 'default' } : {}) }}
            onClick={() => { if (doc.drawingCount > 0) setTab('drawing') }}
          >
            <DrawingGlyph /> 工程图
          </button>
        </div>
        <div style={{ ...styles.previewStage, background: cadCanvasBackground(theme) }}>
          {tabUrl === undefined ? (
            <div style={{ ...styles.empty, flex: '1 1 auto' }}>
              <div style={styles.emptyTitle}>{materializing ? '正在生成预览…' : '暂无此视图'}</div>
              <div style={styles.emptyHint}>
                {doc.opCount === 0
                  ? '这是一个空文档，建模后即可预览。'
                  : materializing
                    ? '正在重放建模历史并生成网格…'
                    : '该文档还没有生成这种视图；可以导出 .svg/.dxf 或在对话里让 AI 生成工程图。'}
              </div>
            </div>
          ) : (
            <div style={styles.previewFill}>
              <Viewport scene={tabScene.scene} error={tabScene.error} fill />
            </div>
          )}
        </div>
      </div>
      <div style={styles.drawerFacts}>
        {factRow('位置', doc.folderPath)}
        {factRow('建模步数', String(doc.opCount))}
        {factRow('体 / 实例 / 草图', `${doc.bodyCount} / ${doc.instanceCount} / ${doc.sketchCount}`)}
        {factRow('工程图', doc.drawingCount > 0 ? `${doc.drawingCount} 张` : '未生成')}
        {factRow('文件大小', humanSize(doc.sizeBytes))}
        {factRow('更新时间', relTime(doc.updatedAt))}
        {factRow('关联会话', doc.boundSessions.length > 0 ? `${doc.boundSessions.length} 个` : '无')}
      </div>
      <div style={styles.drawerActions}>
        <button type="button" style={styles.drawerPrimary} onClick={() => { void onOpenConversation(doc) }}>
          在对话中打开（设为当前文档）
        </button>
        <button type="button" style={styles.drawerSecondary} onClick={() => { void onOpenCadPane(doc) }}>
          在右侧 CAD 面板预览
        </button>
        <div style={styles.exportRow}>
          <span style={styles.factKey}>导出</span>
          {(['dcprt', 'step', 'stl', 'svg', 'dxf'] as const).map((format) => (
            <button key={format} type="button" style={styles.exportChip} onClick={() => downloadDoc(doc, format)}>
              .{format}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
