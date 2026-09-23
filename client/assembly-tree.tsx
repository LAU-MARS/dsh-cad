/**
 * The assembly tree — a floating card over the Assembly tab's viewport (it
 * overlays the 3D area, never displaces it), modeled after the classic CAD
 * structure panel: a PARTS section listing every placed instance with the
 * color chip matching its 3D solid plus an eye toggle hiding/showing it, and
 * a CONSTRAINTS section listing the declared mates (同轴 Concentric a ↔ b).
 *
 * Data comes from GET /dsh-cad/asm/<docId> (folded from the document op log
 * server-side); the pane refetches whenever the document version bumps (any
 * assembly/constraint tool run), keyed off the scene URL's ?v= counter.
 */
import React, { useEffect, useState } from 'react'

/** One PARTS row (mirrors AssemblyTreePart server-side). */
export interface AssemblyTreePart {
  instanceId: string
  bodyId: string
  name: string
  color: number
  missing: boolean
}

/** One CONSTRAINTS row (mirrors AssemblyTreeConstraint server-side). */
export interface AssemblyTreeConstraint {
  id: number
  type: string
  label?: string
  a?: string
  b?: string
}

/** GET /dsh-cad/asm/<docId> response. */
export interface AssemblyTreeData {
  docId: string
  version: number
  name?: string
  parts: AssemblyTreePart[]
  constraints: AssemblyTreeConstraint[]
}

/** Fetch the assembly tree; re-fetches when the document version changes. */
export function useAssemblyTree(docId: string | null, version: number): { tree: AssemblyTreeData | null } {
  const [tree, setTree] = useState<AssemblyTreeData | null>(null)
  useEffect(() => {
    if (docId === null) {
      setTree(null)
      return
    }
    let cancelled = false
    fetch(`/dsh-cad/asm/${docId}`)
      .then((response) => (response.ok ? (response.json() as Promise<AssemblyTreeData>) : Promise.reject(new Error(`HTTP ${response.status}`))))
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

/** Chinese labels for the constraint kinds (Ansatz solver vocabulary). */
const TYPE_ZH: Record<string, string> = {
  concentric: '同轴',
  coaxial: '同轴',
  coincident: '重合',
  collinear: '共线',
  parallel: '平行',
  perpendicular: '垂直',
  tangent: '相切',
  distance: '距离',
  angle: '角度',
  symmetric: '对称',
  fixed: '固定',
  mate: '贴合',
}

/** "同轴 Concentric" — the bold lead of a constraint row. */
function constraintTitle(constraint: AssemblyTreeConstraint): string {
  const zh = TYPE_ZH[constraint.type.toLowerCase()]
  const en = constraint.type.charAt(0).toUpperCase() + constraint.type.slice(1)
  return zh === undefined ? en : `${zh} ${en}`
}

/** The "sun_gear ↔ input_shaft" tail of a constraint row. */
function constraintRefs(constraint: AssemblyTreeConstraint): string {
  if (constraint.a !== undefined && constraint.b !== undefined) return `${constraint.a} ↔ ${constraint.b}`
  return constraint.a ?? constraint.b ?? ''
}

function LinkIcon(): JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6.5 9.5 9.5 6.5M5 8 3.6 9.4a2.3 2.3 0 0 0 3.2 3.2L8 11.4M8 4.6l1.2-1.2a2.3 2.3 0 0 1 3.2 3.2L11 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
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

function SectionHeader({ title, open, onToggle }: { title: string; open: boolean; onToggle: () => void }): JSX.Element {
  return (
    <button type="button" style={styles.sectionHeader} onClick={onToggle} aria-expanded={open}>
      <span style={{ ...styles.sectionChevron, transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
      <span style={styles.sectionTitle}>{title}</span>
    </button>
  )
}

export interface AssemblyTreeProps {
  tree: AssemblyTreeData | null
  /** Selected part's mesh name (highlighted in the viewport). */
  selected: string | null
  onSelect(name: string | null): void
  /** Part names currently hidden in the viewport (eye toggles). */
  hidden: ReadonlySet<string>
  onToggleHidden(part: AssemblyTreePart): void
  /** Fold the whole pane away (a slim reopen rail remains). */
  onCollapse(): void
}

export function AssemblyTree({ tree, selected, onSelect, hidden, onToggleHidden, onCollapse }: AssemblyTreeProps): JSX.Element {
  const [partsOpen, setPartsOpen] = useState(true)
  const [constraintsOpen, setConstraintsOpen] = useState(true)
  const parts = tree?.parts ?? []
  const constraints = tree?.constraints ?? []

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <span style={styles.headerIcon}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M5.5 1.5 10 4v4L5.5 10.5 1 8V4l4.5-2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" opacity="0.75" />
            <path d="M10.5 5.5 15 8v4l-4.5 2.5L6 12V8l4.5-2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        </span>
        <span style={styles.headerTitle} title={tree?.name}>Assembly</span>
        <span style={styles.headerStats}>
          {parts.length} parts · {constraints.length} mates
        </span>
        <button type="button" style={styles.collapse} onClick={onCollapse} aria-label="收起装配树" title="收起装配树">
          ‹
        </button>
      </div>
      <div style={styles.scroll}>
        <SectionHeader title="PARTS" open={partsOpen} onToggle={() => { setPartsOpen((open) => !open) }} />
        {partsOpen ? (
          parts.length === 0 ? (
            <div style={styles.emptyRow}>还没有实例 — 用 cad_assembly_insert 插入</div>
          ) : (
            parts.map((part) => {
              const isSelected = part.name === selected
              const isHidden = hidden.has(part.name)
              return (
                <div
                  key={part.instanceId}
                  style={{
                    ...styles.partRow,
                    ...(isSelected ? styles.partRowActive : {}),
                    ...(part.missing ? styles.partRowMissing : {}),
                    ...(isHidden ? styles.partRowHidden : {}),
                  }}
                >
                  <button
                    type="button"
                    style={styles.partMain}
                    title={part.missing ? `${part.name}（引用的体已被布尔消耗）` : part.name}
                    onClick={() => { onSelect(isSelected ? null : part.name) }}
                  >
                    <span style={{ ...styles.swatch, background: `#${part.color.toString(16).padStart(6, '0')}` }} />
                    <span style={styles.partName}>{part.name}</span>
                  </button>
                  {part.missing ? null : (
                    <button
                      type="button"
                      aria-label={isHidden ? `显示 ${part.name}` : `隐藏 ${part.name}`}
                      title={isHidden ? '显示' : '隐藏'}
                      style={{ ...styles.eye, ...(isHidden ? styles.eyeHidden : {}) }}
                      onClick={() => { onToggleHidden(part) }}
                    >
                      {isHidden ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  )}
                </div>
              )
            })
          )
        ) : null}
        <SectionHeader title="CONSTRAINTS" open={constraintsOpen} onToggle={() => { setConstraintsOpen((open) => !open) }} />
        {constraintsOpen ? (
          constraints.length === 0 ? (
            <div style={styles.emptyRow}>还没有约束 — 用 cad_constraint 声明</div>
          ) : (
            constraints.map((constraint) => (
              <div key={constraint.id} style={styles.constraintRow} title={constraint.label ?? constraintRefs(constraint)}>
                <span style={styles.constraintIcon}><LinkIcon /></span>
                <span style={styles.constraintText}>
                  <span style={styles.constraintTitle}>{constraint.label ?? constraintTitle(constraint)}</span>
                  {constraintRefs(constraint) !== '' ? (
                    <span style={styles.constraintRefs}> {constraintRefs(constraint)}</span>
                  ) : null}
                </span>
              </div>
            ))
          )
        ) : null}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  // Floating card over the viewport (see the Assembly tab): the parent
  // positions it absolutely; it never displaces the 3D area.
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
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    width: '100%',
    border: 'none',
    background: 'transparent',
    padding: '9px 12px 3px',
    cursor: 'pointer',
    font: 'inherit',
    textAlign: 'left',
  },
  sectionChevron: {
    fontSize: 9,
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    transition: 'transform 120ms',
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 600,
    letterSpacing: '0.06em',
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
  },
  emptyRow: {
    fontSize: 11,
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    padding: '4px 12px 4px 24px',
  },
  partRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    borderRadius: 6,
    margin: '0 6px',
    paddingLeft: 16,
  },
  partMain: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
    border: 'none',
    background: 'transparent',
    padding: '4px 0',
    cursor: 'pointer',
    font: 'inherit',
    fontSize: 12,
    color: 'var(--dsw-alias-label-primary, #1f2937)',
    textAlign: 'left',
  },
  partRowActive: {
    background: 'var(--dsw-alias-bg-selected, rgba(77,107,254,0.1))',
    boxShadow: 'inset 0 0 0 1px var(--dsw-alias-label-primary, rgba(77,107,254,0.45))',
  },
  partRowMissing: {
    opacity: 0.45,
    fontStyle: 'italic',
  },
  partRowHidden: {
    opacity: 0.55,
  },
  swatch: {
    flex: 'none',
    width: 10,
    height: 10,
    borderRadius: 3,
    boxShadow: 'inset 0 0 0 1px rgba(16,24,40,0.18)',
  },
  partName: {
    flex: '1 1 auto',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
  constraintRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 7,
    padding: '4px 10px 4px 22px',
    fontSize: 11.5,
    color: 'var(--dsw-alias-label-secondary, #374151)',
  },
  constraintIcon: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    marginTop: 1,
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
  },
  constraintText: {
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  constraintTitle: {
    fontWeight: 600,
  },
  constraintRefs: {
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
  },
}
