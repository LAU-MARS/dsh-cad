/**
 * Shared viewport components + scene fetching for the chat card and the
 * resident details-panel viewer, plus the "latest CAD scene" memory that keeps
 * the right-side panel showing the most recent model even while another tool
 * call is selected.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import type { CadScene, CadViewMeta } from './scene-types.js'
import { mountViewer3D } from './viewer3d.js'
import type { RenderMode, Viewer3DHandle } from './viewer3d.js'
import { entityNodes, fitViewBox } from './viewer2d.js'
import type { ViewBox } from './viewer2d.js'

/** Render-mode cycle order + button labels (shared by editor and cards). */
export const RENDER_MODES: RenderMode[] = ['shaded-edges', 'shaded', 'wireframe']
export const RENDER_MODE_LABELS: Record<RenderMode, string> = {
  'shaded-edges': 'Faces+Edges',
  shaded: 'Faces',
  wireframe: 'Wireframe',
}

// ── latest-CAD memory ───────────────────────────────────────────────────────

let latest: { meta: CadViewMeta; at: number } | null = null
const latestListeners = new Set<() => void>()

/** Record the freshest CAD result (called whenever a CAD card settles). */
export function rememberLatest(meta: CadViewMeta): void {
  latest = { meta, at: Date.now() }
  for (const listener of latestListeners) listener()
}

/** The freshest CAD result, if any tool has produced one. */
export function readLatest(): { meta: CadViewMeta; at: number } | null {
  return latest
}

/**
 * Subscribe to latest-CAD changes (the resident 3D view tab re-renders through
 * this so a finished model appears without leaving the tab).
 */
export function subscribeLatest(listener: () => void): () => void {
  latestListeners.add(listener)
  return () => {
    latestListeners.delete(listener)
  }
}

// ── scene fetching ───────────────────────────────────────────────────────────

/** Read a block's CAD presentation metadata, or null when it is not CAD. */
export function readMeta(block: { meta?: unknown }): CadViewMeta | null {
  const meta = block.meta
  if (meta === null || typeof meta !== 'object') return null
  const candidate = meta as Partial<CadViewMeta>
  return typeof candidate.viewId === 'string' && (candidate.kind === '3d' || candidate.kind === '2d')
    ? (candidate as CadViewMeta)
    : null
}

/** Decoded binary scene — the same shape viewer3d consumes as CadScene3D. */
export interface BinaryScene3D {
  kind: '3d'
  format: string
  meshes: Array<{ name: string; color?: number; positions: Float32Array; normals?: Float32Array; indices: Uint32Array; vertexCount: number; triangleCount: number }>
  bounds: { min: { x: number; y: number; z: number }; max: { x: number; y: number; z: number } }
  units: string
}

interface BinMeshDesc2 {
  name: string
  color?: number
  vertexCount: number
  triangleCount: number
  posOffset: number
  posBytes: number
  nrmOffset?: number
  nrmBytes?: number
  idxOffset: number
  idxBytes: number
}

/** Decode the packed binary scene (header JSON + raw f32/u32 payloads). */
export function decodeBinaryScene(buffer: ArrayBuffer): BinaryScene3D {
  const view = new DataView(buffer)
  const magic = view.getUint32(0, true)
  if (magic !== 0x31424344) throw new Error('bad scene magic')
  const headerLength = view.getUint32(4, true)
  // The header length is padded to 8 bytes; strip the NUL padding before JSON.
  const headerText = new TextDecoder().decode(new Uint8Array(buffer, 8, headerLength)).replace(/\u0000+$/, '')
  const header = JSON.parse(headerText) as {
    meshes: BinMeshDesc2[]
    bounds: { min: [number, number, number]; max: [number, number, number] }
    units: string
  }
  const payloadStart = 8 + headerLength
  const meshes = header.meshes.map((desc) => ({
    name: desc.name,
    ...(desc.color === undefined ? {} : { color: desc.color }),
    positions: new Float32Array(buffer, payloadStart + desc.posOffset, desc.posBytes / 4),
    ...(desc.nrmOffset === undefined ? {} : { normals: new Float32Array(buffer, payloadStart + desc.nrmOffset, (desc.nrmBytes ?? 0) / 4) }),
    indices: new Uint32Array(buffer, payloadStart + desc.idxOffset, desc.idxBytes / 4),
    vertexCount: desc.vertexCount,
    triangleCount: desc.triangleCount,
  }))
  return {
    kind: '3d',
    format: 'model',
    meshes,
    bounds: {
      min: { x: header.bounds.min[0], y: header.bounds.min[1], z: header.bounds.min[2] },
      max: { x: header.bounds.max[0], y: header.bounds.max[1], z: header.bounds.max[2] },
    },
    units: header.units,
  }
}

export interface SceneState {
  scene: CadScene | BinaryScene3D | null
  error: string | null
}

/** Fetch a scene JSON by URL (re-fetches when the URL changes). */
export function useScene(sceneUrl: string | undefined): SceneState {
  const [scene, setScene] = useState<CadScene | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (sceneUrl === undefined) return
    let cancelled = false
    setScene(null)
    setError(null)
    const isBinary = sceneUrl.includes('/dsh-cad/bin/')
    fetch(sceneUrl)
      .then(async (response) => {
        if (!response.ok) throw new Error(`scene fetch failed: HTTP ${response.status}`)
        if (isBinary) return decodeBinaryScene(await response.arrayBuffer()) as CadScene | BinaryScene3D
        return (await response.json()) as CadScene
      })
      .then((loaded) => {
        if (!cancelled) setScene(loaded)
      })
      .catch((cause: unknown) => {
        if (!cancelled) setError(cause instanceof Error ? cause.message : String(cause))
      })
    return () => {
      cancelled = true
    }
  }, [sceneUrl])

  return { scene, error }
}

// ── viewports ────────────────────────────────────────────────────────────────

export function Viewport({ scene, error, height }: SceneState & { height?: number | string }): JSX.Element {
  if (error !== null) return <div style={styles.error}>{error}</div>
  if (scene === null) return <div style={styles.placeholder}>loading…</div>
  if (scene.kind === '3d') return <Viewport3D scene={scene} height={height} />
  return <Viewport2D scene={scene} height={height} />
}

function Viewport3D({ scene, height }: { scene: Extract<CadScene, { kind: '3d' }>; height?: number | string }): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const handleRef = useRef<Viewer3DHandle | null>(null)
  const [renderMode, setRenderMode] = useState<RenderMode>('shaded-edges')

  useEffect(() => {
    const container = containerRef.current
    if (container === null) return
    const handle = mountViewer3D(container, scene)
    handleRef.current = handle
    handle.setRenderMode(renderMode)
    return () => {
      handle.dispose()
      handleRef.current = null
    }
    // scene identity is stable for a viewId.
  }, [scene])

  useEffect(() => {
    handleRef.current?.setRenderMode(renderMode)
  }, [renderMode])

  const cycleRenderMode = useCallback(() => {
    setRenderMode((previous) => RENDER_MODES[(RENDER_MODES.indexOf(previous) + 1) % RENDER_MODES.length])
  }, [])

  const resetView = useCallback(() => {
    handleRef.current?.resetView()
  }, [])

  return (
    <div style={styles.viewportWrap}>
      <div ref={containerRef} style={{ ...styles.viewport, height: height ?? 360 }} />
      <div style={styles.toolbar}>
        <button type="button" style={styles.button} onClick={cycleRenderMode} aria-pressed={renderMode === 'wireframe'}>
          {RENDER_MODE_LABELS[renderMode]}
        </button>
        <button type="button" style={styles.button} onClick={resetView}>
          Reset view
        </button>
      </div>
    </div>
  )
}

function Viewport2D({ scene, height }: { scene: Extract<CadScene, { kind: '2d' }>; height?: number | string }): JSX.Element {
  const [viewBox, setViewBox] = useState<ViewBox>(() => fitViewBox(scene))
  const dragRef = useRef<{ x: number; y: number; viewBox: ViewBox } | null>(null)
  const fit = useCallback(() => setViewBox(fitViewBox(scene)), [scene])

  const onWheel = useCallback((event: React.WheelEvent<SVGSVGElement>) => {
    event.preventDefault()
    const svg = event.currentTarget
    const rect = svg.getBoundingClientRect()
    const cursorX = viewBox.x + ((event.clientX - rect.left) / rect.width) * viewBox.width
    const cursorY = viewBox.y + ((event.clientY - rect.top) / rect.height) * viewBox.height
    const zoom = event.deltaY < 0 ? 0.85 : 1.18
    setViewBox({
      x: cursorX - (cursorX - viewBox.x) * zoom,
      y: cursorY - (cursorY - viewBox.y) * zoom,
      width: viewBox.width * zoom,
      height: viewBox.height * zoom,
    })
  }, [viewBox])

  const onPointerDown = useCallback((event: React.PointerEvent<SVGSVGElement>) => {
    dragRef.current = { x: event.clientX, y: event.clientY, viewBox }
    event.currentTarget.setPointerCapture(event.pointerId)
  }, [viewBox])

  const onPointerMove = useCallback((event: React.PointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current
    if (drag === null) return
    const svg = event.currentTarget
    const rect = svg.getBoundingClientRect()
    const scaleX = drag.viewBox.width / rect.width
    const scaleY = drag.viewBox.height / rect.height
    setViewBox({
      ...drag.viewBox,
      x: drag.viewBox.x - (event.clientX - drag.x) * scaleX,
      y: drag.viewBox.y - (event.clientY - drag.y) * scaleY,
    })
  }, [])

  const onPointerUp = useCallback(() => {
    dragRef.current = null
  }, [])

  if (scene.format === 'svg' && scene.svgText !== undefined) {
    const dataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(scene.svgText)))}`
    return (
      <div style={styles.viewportWrap}>
        <div style={{ ...styles.viewport, height: height ?? 360, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff' }}>
          <img src={dataUrl} alt={scene.format} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
        <div style={styles.toolbar} />
      </div>
    )
  }

  return (
    <div style={styles.viewportWrap}>
      <svg
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        style={{ ...styles.viewport, height: height ?? 360, cursor: dragRef.current === null ? 'default' : 'grabbing', touchAction: 'none' }}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <g transform="scale(1 -1)">{entityNodes(scene)}</g>
      </svg>
      <div style={styles.toolbar}>
        <button type="button" style={styles.button} onClick={fit}>
          Fit
        </button>
      </div>
    </div>
  )
}

export const styles: Record<string, React.CSSProperties> = {
  viewportWrap: { position: 'relative' },
  viewport: {
    width: '100%',
    background: 'var(--dsh-cad-bg, linear-gradient(#f5f6f8, #e9ecf0))',
    display: 'block',
  },
  toolbar: {
    position: 'absolute',
    top: 8,
    left: 8,
    display: 'flex',
    gap: 6,
    zIndex: 5,
  },
  button: {
    border: '1px solid var(--dsw-alias-border-l2, #c4c9d0)',
    borderRadius: 999,
    background: 'var(--dsw-alias-bg-base, #fff)',
    color: 'var(--dsw-alias-label-secondary, #374151)',
    fontSize: 11,
    lineHeight: '16px',
    padding: '3px 10px',
    cursor: 'pointer',
  },
  placeholder: {
    color: 'var(--dsw-alias-label-tertiary, #6b7280)',
    fontSize: 12,
    padding: '10px 12px',
  },
  error: {
    color: 'var(--dsw-alias-state-error-primary, #b91c1c)',
    fontSize: 12,
    padding: '10px 12px',
  },
}
