/**
 * Auto-open policy for the resident CAD pane.
 *
 * Issue #14: the pane used to force itself open on *every* session switch —
 * including conversations that never touched CAD — and a deliberate close was
 * overridden on the next switch. The behaviour is now driven by the host
 * plugin config `autoOpen`, read through the same-origin `/dsh-cad/ui-config`
 * route (the client half has no config of its own).
 *
 * Modes:
 * - `session`   — legacy behaviour: on boot place the tab and collapse the
 *                 rightbar; on every session transition place it and expand.
 * - `tool-use`  — default. Open only where CAD is actually used: on a
 *                 transition expand only when the target session already has a
 *                 CAD result, and expand the first time a CAD result appears in
 *                 the current session. Boot still places + collapses the tab
 *                 (clean launch, the host boots the rightbar open).
 * - `never`     — never auto-place or auto-open; the new-tab menu
 *                 ("+ → CAD 视图") is the only entry.
 *
 * The decision helpers are pure so the policy is unit-tested without React.
 */

export type AutoOpenMode = 'session' | 'tool-use' | 'never'

/** All accepted modes, in documentation order. */
export const AUTO_OPEN_MODES: readonly AutoOpenMode[] = ['session', 'tool-use', 'never']

/** Default when the host config is absent or invalid. Fixes #14 by default. */
export const DEFAULT_AUTO_OPEN: AutoOpenMode = 'tool-use'

/** Coerce an arbitrary config value to a known mode (invalid → default). */
export function normalizeAutoOpen(value: unknown): AutoOpenMode {
  return value === 'session' || value === 'tool-use' || value === 'never' ? value : DEFAULT_AUTO_OPEN
}

/** What one auto-open attempt should do. */
export type AutoOpenAction = 'reveal' | 'collapse' | 'skip'

/**
 * Decide one attempt. `reveal` is the attempt's intent (boot asks to collapse,
 * a session switch asks to reveal); `hasCad` says whether the target session
 * already carries a CAD result.
 */
export function resolveAutoOpen(mode: AutoOpenMode, reveal: boolean, hasCad: boolean): AutoOpenAction {
  if (mode === 'never') return 'skip'
  if (mode === 'session') return reveal ? 'reveal' : 'collapse'
  // tool-use: the boot load still places + collapses the tab (the host boots
  // the rightbar open, so an active collapse keeps the launch view clean);
  // a transition only expands where CAD already exists.
  if (!reveal) return 'collapse'
  return hasCad ? 'reveal' : 'skip'
}

/** Structural check: does a conversation snapshot contain a CAD result node? */
export function snapshotHasCad(snapshot: unknown): boolean {
  const nodes = (snapshot as { nodes?: unknown } | null | undefined)?.nodes
  if (!Array.isArray(nodes)) return false
  for (const node of nodes) {
    const entry = node as { kind?: unknown; meta?: { viewId?: unknown; kind?: unknown } | null } | null
    if (entry === null || entry === undefined) continue
    const meta = entry.meta
    if (
      entry.kind === 'tool-result' &&
      meta != null &&
      typeof meta.viewId === 'string' &&
      (meta.kind === '3d' || meta.kind === '2d')
    ) {
      return true
    }
  }
  return false
}
