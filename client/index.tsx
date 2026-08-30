/**
 * dsh-cad client plugin:
 * - the cad_* tool-view cards in the chat flow;
 * - the resident "3D" tab in the conversation view ring (list slot: composes
 *   alongside Chat/Trajectory) — the always-on CAD viewport with the labeled
 *   XYZ triad, Z-up, live-tracking the latest model;
 * - dormant single-slot shadows for the details panel (see notes);
 * - the right details panel is opened by default at startup.
 */
import type { CadCardProps } from './card.js'
import { CadCard } from './card.js'
import { CadDetailsPanel, CadDetailsShell, CadModelView } from './details.js'

export const inject = ['slots']

interface SlotsService {
  inject(slot: string, register: () => unknown): unknown
  register(options: { name: string; key?: string; id?: string; label?: string; priority?: number }, component: (props: never) => JSX.Element): unknown
}

interface LayoutService {
  openDetails(): void
}

interface ClientContext {
  slots: SlotsService
  get?: (name: string) => unknown
  layout?: LayoutService
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
]

/** Open the right details panel once the layout store is wired (startup default). */
function openDetailsOnce(ctx: ClientContext): void {
  let attempts = 0
  const attempt = (): void => {
    attempts += 1
    const layout = (ctx.get?.('layout') ?? ctx.layout) as LayoutService | undefined
    if (layout !== undefined) {
      try {
        // Throws while the ui-layout root entry hasn't attached its store yet.
        layout.openDetails()
      } catch {
        if (attempts < 60) setTimeout(attempt, 500)
      }
      return
    }
    if (attempts < 60) setTimeout(attempt, 500)
  }
  attempt()
}

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

  // The resident 3D view tab (list slot — composes, no shadowing needed).
  ctx.slots.inject('conversation.view', () =>
    ctx.slots.register(
      { name: 'conversation.view', id: 'cad-3d', label: '3D' },
      CadModelView as unknown as (props: never) => JSX.Element,
    ),
  )

  // Dormant shadows: runtime-verified that already-mounted single-slot render
  // sites do not re-dispatch to later registrations, so these only activate
  // if a future dsh re-dispatches. Harmless today, additive then.
  ctx.slots.inject('conversation.details.tool', () =>
    ctx.slots.register(
      { name: 'conversation.details.tool', priority: -100 },
      CadDetailsPanel as unknown as (props: never) => JSX.Element,
    ),
  )
  ctx.slots.inject('details', () =>
    ctx.slots.register(
      { name: 'details', priority: -100 },
      CadDetailsShell as unknown as (props: never) => JSX.Element,
    ),
  )

  openDetailsOnce(ctx)
}
