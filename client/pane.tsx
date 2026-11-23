/**
 * The host-rightbar-pane registration (the panel's only mounting mode,
 * dsh ≥0.2.x): the CAD panel is a first-class pane — the host's docking kit
 * owns width, collapse, float, fullscreen, and the per-session open state,
 * with zero self-measured positioning (the bug class behind issue #6 P0-1
 * retired for good).
 *
 * Registration mirrors the host's own pane plugins (@deepseek-ai/
 * dsh-client-ui-sidebar-files): one tab type through the `sidebarRightTabs`
 * service plus keyed entries on the `sidebar.right.pane.tab` body and
 * `sidebar.right.pane.tab.title` chip seats. The `guide` entry puts CAD in
 * the new-tab menu.
 *
 * Auto-open is configurable through the host plugin `autoOpen` option (read
 * from the same-origin `/dsh-cad/ui-config` route — see ./auto-open.ts). The
 * default `tool-use` only opens the panel where CAD is actually used, so a
 * session switch no longer forces the rightbar open in CAD-unrelated
 * conversations (issue #14).
 *
 * Timing: this plugin declares only `slots`, so its client half activates
 * BEFORE the sidebar-right package provides `sidebarRightTabs` (itself
 * waiting on the frame's layout services) — a single apply-time lookup loses
 * that race (verified live: the type never reached the new-tab menu). So the
 * mount retries the lookup over the first ~1.6s; a partial registration
 * (type in, body out) is rolled back on any throw. Hosts without the pane
 * system (dsh < 0.2.x) mount no panel — the chat cards remain the CAD
 * surface there.
 */
import React from 'react'
import type { JSX } from 'react'
import { makeCadPaneBody } from './sidepanel.js'
import type { SessionsLike } from './sidepanel.js'
import { DEFAULT_AUTO_OPEN, normalizeAutoOpen, resolveAutoOpen, snapshotHasCad } from './auto-open.js'
import type { AutoOpenMode } from './auto-open.js'

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
 * Steer the rightbar presentation by replaying the host's own chrome button
 * (collapse: the strip button inside [data-sidebar-right-panel]; expand: the
 * banner's open button). The `layout` service an undeclared plugin gets via
 * the optional lookup is a detached facade — closeRightbar/openRightbar there
 * are verified no-ops live — while the chrome button goes through the host's
 * real handler. Matched across locales, best-effort: a host markup change
 * just leaves the host's own default presentation standing.
 */
function steerRightbar(shown: boolean, delayMs: number): void {
  const press = (): void => {
    try {
      const scope: Document | Element | null = shown
        ? document
        : document.querySelector('[data-sidebar-right-panel]')
      if (scope === null) return
      const pattern = shown
        ? /(打开|展开|open|show|expand).*(右侧边栏|right|sidebar)/i
        : /(收起|折叠|collapse|hide).*(右侧边栏|right|sidebar)/i
      const button = Array.from(scope.querySelectorAll('button'))
        .find((candidate) => pattern.test(candidate.getAttribute('aria-label') ?? ''))
      if (button instanceof HTMLElement) button.click()
    } catch { /* best-effort; the host's default presentation stands */ }
  }
  setTimeout(press, delayMs)
}

/** Run `fn` after `ms` through the host timer when available (falls back to the platform one). */
function after(ctx: PaneClientContext, ms: number, fn: () => void): void {
  try {
    if (typeof ctx.setTimeout === 'function') ctx.setTimeout(fn, ms)
    else setTimeout(fn, ms)
  } catch {
    setTimeout(fn, ms)
  }
}

/**
 * Read the host's `autoOpen` option from our same-origin config route. The
 * client half has no config of its own; the host route is the cross-runtime
 * channel (same origin as the existing `/dsh-cad/docs` fetch). Any failure or
 * timeout falls back to the default so the panel still works without it.
 */
function readAutoOpenMode(): Promise<AutoOpenMode> {
  try {
    const doFetch = (globalThis as { fetch?: typeof fetch }).fetch
    if (typeof doFetch !== 'function') return Promise.resolve(DEFAULT_AUTO_OPEN)
    const request = doFetch('/dsh-cad/ui-config', { headers: { accept: 'application/json' } })
      .then((response) => (response.ok ? response.json() : null))
      .then((config: { autoOpen?: unknown } | null) => normalizeAutoOpen(config?.autoOpen))
      .catch(() => DEFAULT_AUTO_OPEN)
    const timeout = new Promise<AutoOpenMode>((resolve) => { setTimeout(() => resolve(DEFAULT_AUTO_OPEN), 1200) })
    return Promise.race([request, timeout])
  } catch {
    return Promise.resolve(DEFAULT_AUTO_OPEN)
  }
}

/** Does the CURRENT session already carry a CAD result? (Drives `tool-use` on switch.) */
function currentSessionHasCad(ctx: PaneClientContext, sessions: SessionsLike | undefined): boolean {
  if (sessions === undefined) return false
  const uiSession = ctx.get?.('uiSession') as UiSessionLike | undefined
  const key = uiSession?.adapter?.current?.getSnapshot()?.key
  if (key === undefined || key === null) return false
  try {
    const face = sessions.binding?.(String(key))?.session
    return face !== undefined && snapshotHasCad(face.getSnapshot())
  } catch {
    return false
  }
}

/**
 * Auto-open the CAD tab according to `mode` (see ./auto-open.ts).
 *
 * `session` keeps the legacy behaviour: the pane system starts every session
 * with an empty rightbar, so boot places the tab then collapses (the host
 * boots the rightbar open); every later session transition places the tab and
 * expands. `tool-use` (default) opens only where CAD is used: a transition
 * expands only when the target session already has a CAD result, and the
 * first CAD result in the current session expands it without a switch.
 * `never` leaves only the "+ → CAD 视图" entry.
 *
 * While a session STAYS current, a deliberate close stays closed; the next
 * transition re-evaluates (and, for `tool-use`, only re-opens where CAD
 * exists).
 *
 * Session source: the host `uiSession` service's `adapter.current` store
 * (the same signal sidebar-right watches). `openTab` throws until the host
 * mounted the switched-to session's surface, so each transition runs a
 * bounded retry chain, and a newer transition supersedes the older chain.
 * The FIRST subscriber event is still boot (the current session's
 * establishment lands after our subscribe), so it runs non-revealing like
 * the boot itself.
 */
function watchSessionsAndAutoOpen(
  ctx: PaneClientContext,
  mode: AutoOpenMode,
  sessions: SessionsLike | undefined,
): void {
  if (mode === 'never') return
  const generation = { current: 0 }
  const revealed = { current: false }
  const attempt = (reveal: boolean, index: number): void => {
    if (index === 0) generation.current += 1
    const generationAtStart = generation.current
    const action = resolveAutoOpen(mode, reveal, currentSessionHasCad(ctx, sessions))
    if (action === 'skip') return
    const controller = ctx.get?.('sidebarRight') as PaneControllerLike | undefined
    if (controller != null && typeof controller.openTab === 'function') {
      try {
        controller.openTab(CAD_TAB_KIND)
        // Boot: wait out the host's post-placement presentation reactions
        // before collapsing; transitions: nudge the bar open only if it is
        // currently collapsed (the expand button is absent when shown).
        steerRightbar(action === 'reveal', action === 'reveal' ? 150 : 900)
        if (action === 'reveal') revealed.current = true
        return
      } catch { /* session surface not mounted yet — retry */ }
    }
    if (index >= AUTO_OPEN_DELAYS_MS.length) return
    const retry = (): void => {
      if (generationAtStart !== generation.current) return
      attempt(reveal, index + 1)
    }
    after(ctx, AUTO_OPEN_DELAYS_MS[index] as number, retry)
  }
  // Transitions after the boot load reveal; the first subscriber event is
  // the boot-time session establishment, so it collapses like the boot.
  let booted = false
  const onTransition = (): void => {
    const reveal = booted
    booted = true
    revealed.current = false
    attempt(reveal, 0)
    // `tool-use`: the switched-to session's feed may bind a beat after the
    // switch, so re-check shortly after rather than missing an existing model.
    if (mode === 'tool-use' && reveal) {
      const recheck = (): void => {
        if (revealed.current) return
        if (currentSessionHasCad(ctx, sessions)) {
          revealed.current = true
          attempt(true, 0)
        }
      }
      after(ctx, 300, recheck)
      after(ctx, 900, recheck)
    }
  }
  const uiSession = ctx.get?.('uiSession') as UiSessionLike | undefined
  const current = uiSession?.adapter?.current
  if (current != null && typeof current.subscribe === 'function' && typeof current.getSnapshot === 'function') {
    const unsubscribe = current.subscribe(onTransition)
    ctx.effect?.(() => unsubscribe, 'dsh-cad: session auto-open watcher')
  }
  // `tool-use`: also reveal the first time a CAD result appears in the current
  // session (a fresh session that starts modeling gets its panel without a
  // switch). Once revealed for a session, a deliberate close stays closed.
  if (mode === 'tool-use' && sessions !== undefined) {
    let faceUnsub: (() => void) | undefined
    const bindCurrent = (): void => {
      try { faceUnsub?.() } catch { /* noop */ }
      faceUnsub = undefined
      try {
        const key = current?.getSnapshot?.()?.key
        if (key === undefined || key === null) return
        const face = sessions.binding?.(String(key))?.session
        if (face === undefined) return
        faceUnsub = face.subscribe(() => {
          if (revealed.current) return
          if (snapshotHasCad(face.getSnapshot())) {
            revealed.current = true
            attempt(true, 0)
          }
        })
      } catch { /* fall back to switch-driven evidence */ }
    }
    const stopBind = current?.subscribe?.(bindCurrent)
    bindCurrent()
    ctx.effect?.(() => {
      try { stopBind?.() } catch { /* noop */ }
      try { faceUnsub?.() } catch { /* noop */ }
    }, 'dsh-cad: cad-appearance watcher')
  }
  // The boot load itself: tab in place, rightbar collapsed.
  attempt(false, 0)
}

/**
 * Mount the CAD panel: the rightbar pane once `sidebarRightTabs` shows up
 * (retried over the first ~1.6s — this plugin activates before the
 * sidebar-right package provides its services). Hosts without the pane
 * system (dsh < 0.2.x) mount no panel — the chat cards remain the CAD
 * surface there.
 */
export function mountCadPanel(ctx: PaneClientContext, sessions: SessionsLike | undefined): void {
  const modePromise = readAutoOpenMode()
  const start = (mode: AutoOpenMode): void => { watchSessionsAndAutoOpen(ctx, mode, sessions) }
  if (tryRegisterCadPane(ctx, sessions)) {
    void modePromise.then(start)
    return
  }
  const attempt = (index: number): void => {
    if (tryRegisterCadPane(ctx, sessions)) {
      void modePromise.then(start)
      return
    }
    if (index >= SERVICE_RETRY_DELAYS_MS.length) return
    after(ctx, SERVICE_RETRY_DELAYS_MS[index] as number, () => { attempt(index + 1) })
  }
  attempt(0)
}
