/**
 * The host-rightbar-pane registration (preferred mounting mode on hosts that
 * ship the sidebar-right tab system, dsh ≥0.2.x): the CAD panel becomes a
 * first-class pane — the host's docking kit owns width, collapse, float,
 * fullscreen, and the per-session open state, which retires the overlay's
 * self-measured positioning entirely (the class of bug behind issue #6 P0-1)
 * and makes narrow-screen behavior the host's own.
 *
 * Registration mirrors the host's own pane plugins (@deepseek-ai/
 * dsh-client-ui-sidebar-files): one tab type through the `sidebarRightTabs`
 * service plus keyed entries on the `sidebar.right.pane.tab` body and
 * `sidebar.right.pane.tab.title` chip seats. The `guide` entry puts CAD in
 * the new-tab menu.
 *
 * Timing: this plugin declares only `slots`, so its client half activates
 * BEFORE the sidebar-right package provides `sidebarRightTabs` (itself
 * waiting on the frame's layout services) — a single apply-time lookup loses
 * that race (verified live: the type never reached the new-tab menu). So the
 * mount retries the lookup over the first ~1.6s and only then falls back to
 * the `shell.overlay` panel for hosts without the pane system; a partial
 * registration (type in, body out) is rolled back on any throw.
 */
import React from 'react'
import type { JSX } from 'react'
import { makeCadPaneBody } from './sidepanel.js'
import { makeCadSidePanel } from './sidepanel.js'
import type { SessionsLike } from './sidepanel.js'

/** The tab type's registry identity AND the keyed seat key (the id is what the seat dispatches on). */
const CAD_TAB_ID = 'dsh-cad'
/** The kind openTab() / session layouts record. */
const CAD_TAB_KIND = 'cad'

/** Retry cadence for the sidebarRightTabs lookup: ~1.6s window, sub-second engagement on modern hosts. */
const SERVICE_RETRY_DELAYS_MS = [100, 300, 600, 1200]

/**
 * Auto-open retry cadence: the session surface the controller acts on mounts
 * a beat after the services appear (and after any session switch settles).
 */
const AUTO_OPEN_DELAYS_MS = [300, 900, 1800, 3000, 5000]

/** The structural slice of the host's SidebarRightTabRegistry this plugin needs. */
export interface PaneTabRegistryLike {
  register(definition: {
    id: string
    kind: string
    priority?: string
    title: () => string
    guide?: Array<{
      order: number
      title: () => string
      description: () => string
      icon: (props: { size?: number; className?: string }) => JSX.Element
    }>
    patterns?: unknown[]
  }): () => void
}

/** The plugin context surface the mounting reads (timer/effect are whitelisted verbs; optional for old hosts). */
export interface PaneClientContext {
  slots: { inject(slot: string, register: () => unknown): unknown }
  get?: (name: string) => unknown
  effect?: (fn: () => () => void, label?: string) => () => void
  setTimeout?: (fn: () => void, ms: number) => unknown
}

/** The `sidebarRight` controller slice auto-open needs (openTab throws until a session surface is mounted). */
interface PaneControllerLike {
  openTab(kind: string, options?: Record<string, unknown>): void
}

/** The `uiSession` service slice: an observable of the current session (what sidebar-right itself watches). */
interface UiSessionLike {
  adapter?: {
    current?: {
      getSnapshot(): { key?: unknown }
      subscribe(fn: () => void): () => void
    }
  }
}

/** Isometric cube outline — the tab chip and the new-tab-guide glyph. */
function CubeGlyph({ size = 16, className }: { size?: number; className?: string }): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 1.5 14 5v6L8 14.5 2 11V5L8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M2 5l6 3.2L14 5M8 8.2v6.3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

/** The tab chip: cube glyph + the tab's captured title (「CAD」 when none). */
function CadPaneTitle(props: { useTabInfo?: () => { tab?: { title?: string } } }): JSX.Element {
  const tab = props.useTabInfo?.().tab
  return (
    <>
      <CubeGlyph size={16} />
      {tab?.title ?? 'CAD'}
    </>
  )
}

/**
 * One registration attempt. Returns false (registering nothing, rolling back
 * anything partial) when the sidebar-right tab system is absent or rejects
 * the registration — the caller then retries or falls back to the overlay.
 */
function tryRegisterCadPane(ctx: PaneClientContext, sessions: SessionsLike | undefined): boolean {
  const tabs = ctx.get?.('sidebarRightTabs') as PaneTabRegistryLike | undefined
  if (tabs == null || typeof tabs.register !== 'function') return false
  const effect = ctx.effect ?? ((fn: () => () => void) => fn())
  const disposers: Array<() => void> = []
  const track = (dispose: unknown): void => {
    if (typeof dispose === 'function') disposers.push(dispose)
  }
  try {
    track(tabs.register({
      id: CAD_TAB_ID,
      kind: CAD_TAB_KIND,
      title: () => 'CAD',
      guide: [{
        order: 20,
        title: () => 'CAD 视图',
        description: () => '三维模型 · 装配体 · 工程图，实时跟踪本会话的建模结果',
        icon: CubeGlyph,
      }],
    }))
    track(effect(() => ctx.slots.inject('sidebar.right.pane.tab', () =>
      ctx.slots.register(
        { name: 'sidebar.right.pane.tab', key: CAD_TAB_ID },
        makeCadPaneBody(sessions) as unknown as (props: never) => JSX.Element,
      )), 'dsh-cad: rightbar pane body'))
    track(effect(() => ctx.slots.inject('sidebar.right.pane.tab.title', () =>
      ctx.slots.register(
        { name: 'sidebar.right.pane.tab.title', key: CAD_TAB_ID },
        CadPaneTitle as unknown as (props: never) => JSX.Element,
      )), 'dsh-cad: rightbar pane title'))
    return true
  } catch {
    for (const dispose of disposers.reverse()) {
      try { dispose() } catch { /* best-effort rollback */ }
    }
    return false
  }
}

/**
 * Auto-open the CAD tab whenever a session becomes current: the boot load,
 * every new session, and every switch back to an old conversation. The pane
 * system starts every session with an empty rightbar — without this a fresh
 * install shows no display area at all and the + menu is the only
 * (undiscoverable) way in. While a session STAYS current, a deliberate close
 * stays closed; the next switch re-opens — the display area is the default
 * view of a session.
 *
 * Session source: the host `uiSession` service's `adapter.current` store
 * (the same signal sidebar-right watches). `openTab` throws until the host
 * mounted the switched-to session's surface, so each switch runs a bounded
 * retry chain, and a newer switch supersedes the older chain. Hosts without
 * `uiSession` degrade to the boot-time open only.
 */
function watchSessionsAndAutoOpen(ctx: PaneClientContext): void {
  const generation = { current: 0 }
  const attempt = (index: number): void => {
    if (index === 0) generation.current += 1
    const generationAtStart = generation.current
    const controller = ctx.get?.('sidebarRight') as PaneControllerLike | undefined
    if (controller != null && typeof controller.openTab === 'function') {
      try {
        controller.openTab(CAD_TAB_KIND)
        try {
          const layout = ctx.get?.('layout') as { openRightbar?: (track?: unknown, fullscreen?: unknown) => void } | undefined
          layout?.openRightbar?.()
        } catch { /* reveal is best-effort; placement already succeeded */ }
        return
      } catch { /* session surface not mounted yet — retry */ }
    }
    if (index >= AUTO_OPEN_DELAYS_MS.length) return
    const retry = (): void => {
      if (generationAtStart !== generation.current) return
      attempt(index + 1)
    }
    try {
      if (typeof ctx.setTimeout === 'function') ctx.setTimeout(retry, AUTO_OPEN_DELAYS_MS[index])
      else setTimeout(retry, AUTO_OPEN_DELAYS_MS[index])
    } catch {
      setTimeout(retry, AUTO_OPEN_DELAYS_MS[index])
    }
  }
  const open = (): void => { attempt(0) }
  const uiSession = ctx.get?.('uiSession') as UiSessionLike | undefined
  const current = uiSession?.adapter?.current
  if (current != null && typeof current.subscribe === 'function' && typeof current.getSnapshot === 'function') {
    const unsubscribe = current.subscribe(open)
    ctx.effect?.(() => unsubscribe, 'dsh-cad: session auto-open watcher')
  }
  open()
}

/**
 * Mount the CAD panel: the rightbar pane once `sidebarRightTabs` shows up
 * (retried over the first ~1.6s — this plugin activates before the
 * sidebar-right package provides its services), else the `shell.overlay`
 * panel for hosts without the pane system.
 */
export function mountCadPanel(ctx: PaneClientContext, sessions: SessionsLike | undefined): void {
  if (tryRegisterCadPane(ctx, sessions)) {
    watchSessionsAndAutoOpen(ctx)
    return
  }
  let settled = false
  const attempt = (index: number): void => {
    if (settled) return
    if (tryRegisterCadPane(ctx, sessions)) {
      settled = true
      watchSessionsAndAutoOpen(ctx)
      return
    }
    if (index >= SERVICE_RETRY_DELAYS_MS.length) {
      settled = true
      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register(
          { name: 'shell.overlay', id: 'cad-side-panel', order: 100, label: 'CAD' },
          makeCadSidePanel(sessions) as unknown as (props: never) => JSX.Element,
        ))
      return
    }
    const retry = (): void => { attempt(index + 1) }
    try {
      if (typeof ctx.setTimeout === 'function') ctx.setTimeout(retry, SERVICE_RETRY_DELAYS_MS[index])
      else setTimeout(retry, SERVICE_RETRY_DELAYS_MS[index])
    } catch {
      setTimeout(retry, SERVICE_RETRY_DELAYS_MS[index])
    }
  }
  attempt(0)
}
