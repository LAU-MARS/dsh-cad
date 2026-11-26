/**
 * Auto-open policy contract for the resident CAD pane (issue #14): the pure
 * decision helpers must keep `session` legacy-compatible, make `tool-use`
 * open only where CAD exists, and make `never` inert. They are React-free so
 * the policy is unit-tested without a browser.
 */
import { describe, expect, it } from 'vitest'
import { DEFAULT_AUTO_OPEN, normalizeAutoOpen, resolveAutoOpen, snapshotHasCad } from '../client/auto-open.js'

describe('auto-open policy', () => {
  it('defaults to tool-use and rejects unknown values', () => {
    expect(DEFAULT_AUTO_OPEN).toBe('tool-use')
    expect(normalizeAutoOpen(undefined)).toBe('tool-use')
    expect(normalizeAutoOpen('nonsense')).toBe('tool-use')
    expect(normalizeAutoOpen('never')).toBe('never')
    expect(normalizeAutoOpen('session')).toBe('session')
    expect(normalizeAutoOpen('tool-use')).toBe('tool-use')
  })

  it('session keeps the legacy boot-collapse / switch-reveal behaviour', () => {
    expect(resolveAutoOpen('session', false, false)).toBe('collapse')
    expect(resolveAutoOpen('session', true, false)).toBe('reveal')
  })

  it('tool-use opens only where CAD exists', () => {
    // Boot still places + collapses the tab (clean launch).
    expect(resolveAutoOpen('tool-use', false, false)).toBe('collapse')
    expect(resolveAutoOpen('tool-use', false, true)).toBe('collapse')
    // A CAD-unrelated session switch is left alone.
    expect(resolveAutoOpen('tool-use', true, false)).toBe('skip')
    // A session that already used CAD opens on switch.
    expect(resolveAutoOpen('tool-use', true, true)).toBe('reveal')
  })

  it('never skips every attempt', () => {
    expect(resolveAutoOpen('never', true, true)).toBe('skip')
    expect(resolveAutoOpen('never', false, true)).toBe('skip')
  })

  it('detects a CAD result node in a conversation snapshot', () => {
    expect(snapshotHasCad(null)).toBe(false)
    expect(snapshotHasCad({ nodes: [] })).toBe(false)
    expect(snapshotHasCad({ nodes: [{ kind: 'message' }] })).toBe(false)
    expect(snapshotHasCad({ nodes: [{ kind: 'tool-result', meta: { viewId: 'v1', kind: '3d' } }] })).toBe(true)
    expect(snapshotHasCad({ nodes: [{ kind: 'tool-result', meta: { viewId: 'v1', kind: '2d' } }] })).toBe(true)
    // A result without a viewId is not a CAD presentation.
    expect(snapshotHasCad({ nodes: [{ kind: 'tool-result', meta: { kind: '3d' } }] })).toBe(false)
  })
})
