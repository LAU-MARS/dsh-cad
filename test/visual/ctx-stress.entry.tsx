/**
 * WebGL context-pressure stress: one persistent "panel" viewer that swaps
 * scenes over time (the live side-panel pattern) plus card viewers appearing
 * one by one (chat CAD results — each viewer costs TWO contexts: main canvas
 * + ViewCube). Browsers cap active WebGL contexts (~16) and kill the OLDEST
 * when exceeded, which blanks the persistent panel.
 *
 * The page only runs the sequence and exposes diagnostics on
 * `window.__ctxStress` — verdicts are driven from the automation side,
 * because rAF-synced sampling never resolves while the tab is hidden.
 */
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Viewport } from '../../client/viewport.js'

type AnyScene = NonNullable<Parameters<typeof Viewport>[0]['scene']>

// ── global context-loss instrumentation ──────────────────────────────────────

interface LossEntry { at: string; owner: string }

const losses: LossEntry[] = []

function ownerOf(element: Element | null): string {
  const owner = element?.closest('[data-owner]') as HTMLElement | null
  return owner?.dataset.owner ?? 'unknown'
}

document.addEventListener('webglcontextlost', (event) => {
  losses.push({ at: new Date().toISOString().slice(14, 23), owner: ownerOf(event.target as Element) })
}, true)

/** Sample a canvas: count non-background pixels (is anything being drawn?).
 *  Must run inside requestAnimationFrame — a WebGL canvas without
 *  preserveDrawingBuffer is cleared after compositing, so reading it from a
 *  timer always sees an empty buffer. */
function sampleDrawn(canvas: HTMLCanvasElement): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false
    const finish = (value: boolean): void => {
      if (!settled) {
        settled = true
        resolve(value)
      }
    }
    // rAF may be paused (hidden tab): time out instead of hanging forever.
    const timer = window.setTimeout(() => finish(false), 2000)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.clearTimeout(timer)
        try {
          const probe = document.createElement('canvas')
          probe.width = canvas.width
          probe.height = canvas.height
          const ctx = probe.getContext('2d')
          if (ctx === null) {
            finish(false)
            return
          }
          ctx.drawImage(canvas, 0, 0)
          const data = ctx.getImageData(0, 0, probe.width, probe.height).data
          let painted = 0
          for (let i = 0; i < data.length; i += 160) {
            if (data[i] !== 0 || data[i + 1] !== 0 || data[i + 2] !== 0) painted++
          }
          finish(painted > 50)
        } catch {
          finish(false)
        }
      })
    })
  })
}

function statusLines(): string[] {
  const panelCanvas = document.querySelector('#panel canvas') as HTMLCanvasElement | null
  return [
    `cards mounted: ${document.querySelectorAll('[data-owner^="card-"]').length}`,
    `webgl canvases alive: ${document.querySelectorAll('canvas').length}`,
    `context lost events: ${losses.length}${losses.length === 0 ? '' : ' → ' + losses.map((l) => `${l.owner}@${l.at}`).join(', ')}`,
    `panel canvas present: ${panelCanvas !== null ? 'yes' : 'NO'}`,
  ]
}

// Automation-side diagnostics (kept deliberately separate from React state).
;(window as unknown as { __ctxStress: unknown }).__ctxStress = {
  losses,
  statusLines,
  /** Sample the panel's main canvas (rAF-synced, false on timeout). */
  async panelDrawing(): Promise<boolean> {
    const canvas = document.querySelector('#panel canvas') as HTMLCanvasElement | null
    if (canvas === null) return false
    return await sampleDrawn(canvas)
  },
  /** Force-lose the panel's main WebGL context (WEBGL_lose_context). */
  killPanelContext(): boolean {
    const canvas = document.querySelector('#panel canvas') as HTMLCanvasElement | null
    if (canvas === null) return false
    const gl = canvas.getContext('webgl2') as (WebGL2RenderingContext & { getExtension(name: 'WEBGL_lose_context'): { loseContext(): void } | null }) | null
    const ext = gl?.getExtension('WEBGL_lose_context') ?? null
    if (ext === null) return false
    ext.loseContext()
    return true
  },
}

// ── components ───────────────────────────────────────────────────────────────

function Panel({ scenes }: { scenes: [AnyScene, AnyScene] }): JSX.Element {
  const [scene, setScene] = useState<AnyScene>(scenes[0])
  useEffect(() => {
    let i = 0
    const id = window.setInterval(() => { i++; setScene(scenes[i % 2]) }, 2000)
    return () => window.clearInterval(id)
  }, [scenes])
  return (
    <div id="panel" data-owner="panel" style={{ width: 640, height: 300 }}>
      <Viewport scene={scene} error={null} height={300} />
    </div>
  )
}

function Card({ scene, index }: { scene: AnyScene; index: number }): JSX.Element {
  return (
    <div data-owner={`card-${index}`} style={{ height: 140 }}>
      <Viewport scene={scene} error={null} height={140} lazy />
    </div>
  )
}

const CARD_INTERVAL_MS = 1200
const CARD_COUNT = 14

function App({ scenes }: { scenes: [AnyScene, AnyScene] }): JSX.Element {
  const [cards, setCards] = useState(0)
  const [lines, setLines] = useState<string[]>(['running: adding cards…'])

  useEffect(() => {
    const add = window.setInterval(() => { setCards((c) => Math.min(c + 1, CARD_COUNT)) }, CARD_INTERVAL_MS)
    return () => window.clearInterval(add)
  }, [])

  // Timer-driven status refresh (no rAF — survives hidden tabs).
  useEffect(() => {
    const id = window.setInterval(() => { setLines(statusLines()) }, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div>
      <Panel scenes={scenes} />
      {Array.from({ length: cards }, (_, i) => <Card key={i} scene={scenes[i % 2]} index={i} />)}
      <pre id="result" style={{ font: '600 13px/20px ui-monospace, monospace', position: 'sticky', top: 0, background: '#fff' }}>{lines.join('\n')}</pre>
    </div>
  )
}

const style = document.createElement('style')
style.textContent = 'body { margin: 0; font-family: -apple-system, "Segoe UI", sans-serif; padding: 16px; } h1 { font-size: 15px; color: #333; }'
document.head.appendChild(style)

void (async (): Promise<void> => {
  const [step, stl] = await Promise.all([
    fetch('/scene-3d-step.json').then((response) => response.json()),
    fetch('/scene-3d-stl.json').then((response) => response.json()),
  ])
  createRoot(document.getElementById('app')!).render(<App scenes={[step, stl]} />)
})()
