/**
 * dsh-cad client plugin:
 * - the cad_* tool-view cards in the chat flow (inline viewports; every settled
 *   card also feeds the latest-CAD memory);
 * - the resident CAD display panel docked to the right of the conversation
 *   (center) column via the additive `shell.overlay` seat: expanded by default
 *   from launch, an empty placeholder before any CAD modeling, then tracking
 *   the newest model of the current session live. It yields the chat column
 *   (inline padding-right on the center column) instead of covering it.
 */
import type { CadCardProps } from './card.js'
import { CadCard } from './card.js'
import { makeCadSidePanel } from './sidepanel.js'
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

  // Chat tool cards: keyed toolview entries (a keyed hit replaces the generic
  // row). `locale` tags the entry for the conversation namespace's `t` seat.
  for (const key of CAD_TOOL_KEYS) {
    ctx.slots.inject('tool.call.toolview', () =>
      ctx.slots.register({ name: 'tool.call.toolview', key, locale: 'conversation' }, CadCard as unknown as (props: never) => JSX.Element),
    )
  }

  // The resident side panel (additive overlay seat — composes, never shadows
  // the frame). `ctx.get('sessions')` is the optional-service convention: the
  // live conversation feed behind the panel's model tracking; without it the
  // panel falls back to the card-fed latest-CAD memory. (Direct `ctx.sessions`
  // access would throw — the property requires declaring an inject.)
  const sessions = ctx.get?.('sessions') as SessionsLike | undefined
  ctx.slots.inject('shell.overlay', () =>
    ctx.slots.register(
      { name: 'shell.overlay', id: 'cad-side-panel', order: 100, label: 'CAD' },
      makeCadSidePanel(sessions) as unknown as (props: never) => JSX.Element,
    ),
  )
}
