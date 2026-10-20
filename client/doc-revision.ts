/**
 * Host-independent document liveness for the resident CAD panel.
 *
 * The conversation meta pipeline normally delivers a versioned scene URL per
 * tool result, and the panel follows it. On hosts where that channel goes
 * stale (UI drift, cold start, a resident tab that is not re-scanned), the
 * viewer then keeps showing the previous body until the user re-selects the
 * document from the file list.
 *
 * This module closes that gap from the server side: `GET /dsh-cad/docs` lists
 * every document with its op count (`version`), so the panel polls it at a
 * low rate while visible and re-fetches the scene when the tracked document's
 * version moves. Polling is shared across tabs, paused while the page is
 * hidden, and never downgrades the version carried by the tool result.
 */
import { useCallback, useSyncExternalStore } from 'react'

interface DocsPayload {
  docs?: Array<{ id?: unknown; version?: unknown }>
  active?: ActiveDoc
}

/** The session's bound (active) document, as reported by the docs route. */
export interface ActiveDoc {
  id: string
  name: string
  version: number
  sceneUrl?: string
}

/** Poll cadence: fast enough to feel live, cheap enough for an idle panel. */
const POLL_MS = 1500

const versions = new Map<string, number>()
const listeners = new Set<() => void>()
/** Session whose bound document is tracked (set by the resident panel). */
let pollSession: string | null = null
/** Last `active` block seen for `pollSession` (stable reference for React). */
let activeDoc: ActiveDoc | null = null
let timer: ReturnType<typeof setInterval> | null = null
let inflight = false

function notify(): void {
  for (const listener of [...listeners]) listener()
}

async function fetchVersions(): Promise<void> {
  if (inflight) return
  inflight = true
  try {
    const url = pollSession === null ? '/dsh-cad/docs' : `/dsh-cad/docs?session=${encodeURIComponent(pollSession)}`
    const response = await fetch(url, { cache: 'no-store' })
    if (!response.ok) return
    const payload = (await response.json()) as DocsPayload
    let changed = false
    for (const doc of payload.docs ?? []) {
      if (typeof doc?.id !== 'string' || typeof doc?.version !== 'number') continue
      if (versions.get(doc.id) !== doc.version) {
        versions.set(doc.id, doc.version)
        changed = true
      }
    }
    const nextActive = payload.active !== undefined && typeof payload.active?.id === 'string' ? payload.active : null
    if (nextActive !== null && typeof nextActive.version === 'number') versions.set(nextActive.id, nextActive.version)
    if (!sameActive(activeDoc, nextActive)) {
      activeDoc = nextActive
      changed = true
    }
    if (changed) notify()
  } catch {
    // No route / offline: keep whatever the meta pipeline provided.
  } finally {
    inflight = false
  }
}

function sameActive(a: ActiveDoc | null, b: ActiveDoc | null): boolean {
  if (a === b) return true
  if (a === null || b === null) return false
  return a.id === b.id && a.version === b.version && a.name === b.name && a.sceneUrl === b.sceneUrl
}

/** Point the poller at a session (the panel mounts/remounts); null = no session. */
export function setPollSession(sessionId: string | null): void {
  if (pollSession === sessionId) return
  pollSession = sessionId
  activeDoc = null
  notify()
  void fetchVersions()
}

function onVisibility(): void {
  if (typeof document !== 'undefined' && !document.hidden) void fetchVersions()
}

function start(): void {
  if (timer !== null) return
  void fetchVersions()
  timer = setInterval(() => {
    if (typeof document !== 'undefined' && document.hidden) return
    void fetchVersions()
  }, POLL_MS)
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('focus', onVisibility)
  }
}

function stop(): void {
  if (timer === null) return
  clearInterval(timer)
  timer = null
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('focus', onVisibility)
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  if (listeners.size === 1) start()
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) stop()
  }
}

export function docVersion(docId: string | null): number | null {
  return docId === null ? null : versions.get(docId) ?? null
}

/** The session's bound document (null when unknown / no session). */
export function useActiveDoc(): ActiveDoc | null {
  const getSnapshot = useCallback((): ActiveDoc | null => activeDoc, [])
  return useSyncExternalStore(subscribe, getSnapshot)
}

/**
 * The polled op count of `docId`, or null before the first successful poll.
 * Re-renders whenever any tracked document changes.
 */
export function useDocVersion(docId: string | null): number | null {
  const getSnapshot = useCallback((): number | null => docVersion(docId), [docId])
  return useSyncExternalStore(subscribe, getSnapshot)
}

/** `/path?x=1&v=7` → its `?v=` value, or 0 when absent. */
export function sceneVersion(url: string | undefined): number {
  const match = /[?&]v=(\d+)/.exec(url ?? '')
  return match === null ? 0 : Number(match[1])
}

/**
 * Apply a polled version to a scene URL without ever downgrading it (the tool
 * result may already be newer than the last poll): the result carries the
 * larger of the URL's own version and `polled`.
 */
export function withDocVersion(url: string | undefined, polled: number | null): string | undefined {
  if (url === undefined || polled === null) return url
  const current = sceneVersion(url)
  if (current >= polled) return url
  if (current > 0) return url.replace(/([?&])v=\d+/, `$1v=${polled}`)
  return `${url}${url.includes('?') ? '&' : '?'}v=${polled}`
}
