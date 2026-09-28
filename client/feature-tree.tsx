/**
 * The feature tree — the Part tab's structure panel (mirrors the assembly
 * tree's floating-card pattern): one chronological row per sketch / feature,
 * folded server-side from the document op log (GET /dsh-cad/tree/<docId>).
 * Sketch rows (✏️ blue) toggle the viewport's sketch curves + plane frame;
 * feature rows highlight their body's solid and toggle its visibility.
 */
import React, { useEffect, useState } from 'react'

/** One tree row (mirrors FeatureTreeRow server-side). */
export interface FeatureTreeRow {
  key: string
  kind: 'sketch' | 'feature'
  label: string
  sketch?: string
  body?: string
  feature?: string
  uses?: string
}

/** GET /dsh-cad/tree/<docId> response. */
export interface FeatureTreeData {
  docId: string
  version: number
  rows: FeatureTreeRow[]
}

/** Fetch the feature tree; re-fetches when the document version changes. */
export function useFeatureTree(docId: string | null, version: number): { tree: FeatureTreeData | null } {
  const [tree, setTree] = useState<FeatureTreeData | null>(null)
  useEffect(() => {
    if (docId === null) {
      setTree(null)
      return
    }
    let cancelled = false
    fetch(`/dsh-cad/tree/${docId}`)
      .then((response) => (response.ok ? (response.json() as Promise<FeatureTreeData>) : Promise.reject(new Error(`HTTP ${response.status}`))))
      .then((data) => {
        if (!cancelled) setTree(data)
      })
      .catch(() => {
        // A missing route/document is not fatal — the pane just stays empty.
        if (!cancelled) setTree(null)
      })
    return () => {
      cancelled = true
    }
  }, [docId, version])
  return { tree }
}

function SketchIcon(): JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2.5 12.2 11 3.7a1.8 1.8 0 0 1 2.5 2.5L5 14.7l-3.2.7.7-3.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M9.6 5.1l1.8 1.8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function FeatureIcon(): JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 3h7.5L13 5.5V13H3V3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" opacity="0.8" />
      <path d="M3 10.5 6.5 7l3 3L13 6.7" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

function EyeIcon(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M1.5 8S4 4.2 8 4.2 14.5 8 14.5 8 12 11.8 8 11.8 1.5 8 1.5 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1.9" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function EyeOffIcon(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 2.5 13 13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path
        d="M6.4 4.7A5.6 5.6 0 0 1 8 4.2c4 0 6.5 3.8 6.5 3.8a11.6 11.6 0 0 1-1.9 2.3M4 5.6A10.9 10.9 0 0 0 1.5 8S4 11.8 8 11.8c.7 0 1.4-.1 2-.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export interface FeatureTreeProps {
  tree: FeatureTreeData | null
  /** Selected body's mesh name (highlighted in the viewport). */
  selected: string | null
  onSelect(name: string | null): void
  /** Mesh names not drawn (eye toggles: bodies + sketch wires + plane frames). */
  hidden: ReadonlySet<string>
  onToggleHidden(names: string[]): void
  onCollapse(): void
}

export function FeatureTree({ tree, selected, onSelect, hidden, onToggleHidden, onCollapse }: FeatureTreeProps): JSX.Element {
  const rows = tree?.rows ?? []
  const sketches = rows.filter((row) => row.kind === 'sketch').length

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <span style={styles.headerIcon}><FeatureIcon /></span>
        <span style={styles.headerTitle}>特征树</span>
        <span style={styles.headerStats}>
          {sketches} 草图 · {rows.length - sketches} 特征
        </span>
        <button type="button" style={styles.collapse} onClick={onCollapse} aria-label="收起特征树" title="收起特征树">
          ‹
        </button>
      </div>
      <div style={styles.scroll}>
        {rows.length === 0 ? (
          <div style={styles.emptyRow}>还没有特征 — 用 cad_sketch_new / cad_extrude_profile 建模</div>
        ) : (
          rows.map((row) => {
            const isSketch = row.kind === 'sketch'
            const meshNames = isSketch
              ? [`sketch:${row.sketch}`, `sketch:${row.sketch}:plane`, `sketch:${row.sketch}:fill`, `sketch:${row.sketch}:pts`]
              : row.body !== undefined ? [row.body] : []
            const isHidden = meshNames.length > 0 && meshNames.every((name) => hidden.has(name))
            const isSelected = !isSketch && row.body !== undefined && row.body === selected
            return (
              <div
                key={row.key}
                style={{
                  ...styles.row,
                  ...(isSelected ? styles.rowActive : {}),
                  ...(isHidden ? styles.rowHidden : {}),
                }}
              >
                <button
                  type="button"
                  style={{ ...styles.rowMain, ...(isSketch ? styles.sketchMain : {}) }}
                  title={isSketch ? `草图 ${row.label}（拉伸/旋转/扫掠可引用）` : row.label}
                  onClick={() => { if (!isSketch && row.body !== undefined) onSelect(isSelected ? null : row.body) }}
                >
                  <span style={isSketch ? styles.sketchIcon : styles.featureIcon}>
                    {isSketch ? <SketchIcon /> : <FeatureIcon />}
                  </span>
                  <span style={styles.rowText}>
                    {isSketch ? row.label : (
                      <>
                        <span style={styles.featureLabel}>{row.feature}</span>
                        <span style={styles.featureName}> {row.label}</span>
                        {row.uses !== undefined ? <span style={styles.uses}> ⟵ {row.uses}</span> : null}
                      </>
                    )}
                  </span>
                </button>
                {meshNames.length > 0 ? (
                  <button
                    type="button"
                    aria-label={isHidden ? `显示 ${row.label}` : `隐藏 ${row.label}`}
                    title={isHidden ? '显示' : '隐藏'}
                    style={{ ...styles.eye, ...(isHidden ? styles.eyeHidden : {}) }}
                    onClick={() => { onToggleHidden(meshNames) }}
                  >
                    {isHidden ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                ) : null}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  // Floating card over the viewport (see the Part tab): the parent positions
  // it absolutely; it never displaces the 3D area.
  root: {
    width: 218,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    maxHeight: '100%',
    borderRadius: 10,
    border: '1px solid var(--dsw-alias-border-l1, #e2e5ea)',
    boxShadow: '0 10px 28px -12px rgba(16,24,40,0.28)',
    background: 'var(--dsw-alias-bg-base, #fff)',
    overflow: 'hidden',
  },
  header: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 8px 7px 12px',
    borderBottom: '1px solid var(--dsw-alias-border-l1, #eceff3)',
  },
  headerIcon: {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--dsw-alias-label-primary, #4d6bfe)',
  },
  headerTitle: {
    fontSize: 12.5,
    fontWeight: 600,
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    whiteSpace: 'nowrap',
  },
  headerStats: {
    marginLeft: 'auto',
    fontSize: 10.5,
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    whiteSpace: 'nowrap',
  },
  collapse: {
    flex: 'none',
    width: 18,
    height: 18,
    border: 'none',
    borderRadius: 5,
    background: 'transparent',
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    fontSize: 13,
    lineHeight: '16px',
    cursor: 'pointer',
    padding: 0,
    textAlign: 'center',
  },
  scroll: {
    flex: '1 1 auto',
    minHeight: 0,
    overflowY: 'auto',
    paddingBottom: 8,
  },
  emptyRow: {
    fontSize: 11,
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    padding: '4px 12px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    borderRadius: 6,
    margin: '0 6px',
  },
  rowMain: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    minWidth: 0,
    border: 'none',
    background: 'transparent',
    padding: '4px 0 4px 10px',
    cursor: 'pointer',
    font: 'inherit',
    fontSize: 12,
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    textAlign: 'left',
  },
  sketchMain: {
    color: '#2f80d6',
  },
  sketchIcon: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    color: '#2f80d6',
  },
  featureIcon: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
  },
  rowText: {
    flex: '1 1 auto',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  featureLabel: {
    fontWeight: 600,
    color: 'var(--dsw-alias-label-secondary, #374151)',
  },
  featureName: {
    color: 'var(--dsw-alias-label-primary, #1f2937)',
  },
  uses: {
    color: '#2f80d6',
    fontSize: 11,
  },
  rowActive: {
    background: 'var(--dsw-alias-bg-selected, rgba(77,107,254,0.1))',
    boxShadow: 'inset 0 0 0 1px var(--dsw-alias-label-primary, rgba(77,107,254,0.45))',
  },
  rowHidden: {
    opacity: 0.55,
  },
  eye: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 20,
    borderRadius: 5,
    border: 'none',
    background: 'transparent',
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    cursor: 'pointer',
    padding: 0,
  },
  eyeHidden: {
    color: 'var(--dsw-alias-label-primary, #4d6bfe)',
  },
}
