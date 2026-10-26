/**
 * dsh-cad client plugin:
 * - compact one-line rows for the cad_* tool calls in the chat flow (the
 *   resident panel is the single CAD display area; every settled row also
 *   feeds the latest-CAD memory behind the panel's fallback channel);
 * - the resident CAD display panel, mounted as a host rightbar PANE when the
 *   sidebar-right tab system is available (dsh ≥0.2.x — the host's docking
 *   kit owns width/collapse/float/fullscreen and remembers the open tab per
 *   session), falling back to the additive `shell.overlay` seat on older
 *   hosts (self-docked beside the center column, expanded by default). Both
 *   modes track the newest model of the current session live.
 */
import type { CadCardProps } from './card.js'
import { CadCallRow } from './card.js'
import { mountCadPanel } from './pane.js'
import type { SessionsLike } from './sidepanel.js'

export const inject = ['slots']

interface SlotsService {
  inject(slot: string, register: () => unknown): unknown
  register(options: { name: string; key?: string; id?: string; label?: string; priority?: number }, component: (props: never) => JSX.Element): unknown
}

interface ClientContext {
  slots: SlotsService
  get?: (name: string) => unknown
}

/** Every tool whose chat card is the CAD viewport. */
const CAD_TOOL_KEYS = [
  'cad_view',
  'cad_create_prim',
  'cad_extrude_profile',
  'cad_revolve',
  'cad_chamfer',
  'cad_shell',
  'cad_draft',
  'cad_pattern',
  'cad_loft',
  'cad_sweep',
  'cad_boolean',
  'cad_fillet',
  'cad_transform',
  'cad_export',
  'cad_delete',
  'cad_volume',
  'cad_freecad',
  'cad_image_profile',
  'cad_drawing',
  'cad_assembly_insert',
  'cad_assembly_move',
  'cad_assembly_remove',
  'cad_doc_open',
  'cad_constraint',
  'cad_solve',
  'cad_motion',
]

export function apply(ctx: ClientContext): void {
  // Entry-crash supervision (the slots' onEntryError seam): render-time
  // failures abdicate an entry silently, so mirror them on the document —
  // the CadErrorBoundary data-cad-err pattern — for diagnosable drift.
  const supervised = ctx.slots as typeof ctx.slots & {
    onEntryError?: (fn: (key: string, entry: unknown, error: unknown, info: { abdicated: boolean }) => void) => () => void
  }
  supervised.onEntryError?.((key, _entry, error, info) => {
    try {
      document.documentElement.setAttribute(
        'data-cad-slot-crash',
        `${key}:${String(error instanceof Error ? error.message : error).slice(0, 160)}:abd=${String(info.abdicated)}`,
      )
    } catch { /* non-DOM host */ }
  })

  // Chat tool rows: keyed toolview entries (a keyed hit replaces the generic
  // row). `locale` tags the entry for the conversation namespace's `t` seat.
  for (const key of CAD_TOOL_KEYS) {
    ctx.slots.inject('tool.call.toolview', () =>
      ctx.slots.register({ name: 'tool.call.toolview', key, locale: 'conversation' }, CadCallRow as unknown as (props: never) => JSX.Element),
    )
  }

  // The resident CAD panel. `ctx.get(name)` is the optional-service
  // convention. Preferred: the host rightbar pane (sidebar-right tab system)
  // — layout, collapse, float, fullscreen, and per-session open state are the
  // host's, with zero self-measured positioning; the service lookup retries
  // over the first ~1.6s because this plugin activates before the
  // sidebar-right package provides it. Fallback: the additive `shell.overlay`
  // seat — the panel docks itself beside the rightbar and yields the chat
  // column (inline padding-right on the center column) instead of covering
  // it. (`ctx.get('sessions')` stays the live feed for both; without it the
  // panel falls back to the card-fed latest-CAD memory. Direct `ctx.sessions`
  // access would throw — the property requires declaring an inject.)
  const sessions = ctx.get?.('sessions') as SessionsLike | undefined
  mountCadPanel(ctx, sessions)
}
