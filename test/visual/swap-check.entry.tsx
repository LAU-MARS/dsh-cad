/**
 * Incremental-swap check for the live viewport: mounts the real Viewport and
 * swaps scenes exactly the way live tracking does (each tool result = a fresh
 * scene object prop). PASS requires the WebGL canvas to survive every swap
 * (same DOM node, never unmounted) and no "loading…" placeholder to appear
 * after the initial load — the two symptoms of the old full-rebuild refresh.
 */
import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Viewport } from '../../client/viewport.js'

type AnyScene = NonNullable<Parameters<typeof Viewport>[0]['scene']>

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

function canvasNode(root: HTMLElement): HTMLCanvasElement | null {
  return root.querySelector('canvas')
}

function App({ scenes }: { scenes: [AnyScene, AnyScene] }): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [scene, setScene] = useState<AnyScene>(scenes[0])
  const [lines, setLines] = useState<string[]>(['mounted, loading first scene…'])

  useEffect(() => {
    const root = rootRef.current
    if (root === null) return
    let alive = true

    // Any canvas removal or "loading…" insertion after mount = a flash.
    let flash = ''
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.removedNodes) {
          if (node instanceof HTMLCanvasElement) flash = 'canvas removed from DOM'
        }
        for (const node of record.addedNodes) {
          if (node.textContent !== null && node.textContent.includes('loading')) flash = '"loading…" placeholder shown'
        }
      }
    })
    observer.observe(root, { childList: true, subtree: true })

    const step = async (): Promise<void> => {
      await sleep(1500)
      if (!alive) return
      const before = canvasNode(root)
      setScene(scenes[1])
      await sleep(1500)
      if (!alive) return
      const afterB = canvasNode(root)
      setScene(scenes[0])
      await sleep(1500)
      if (!alive) return
      const afterA = canvasNode(root)
      observer.disconnect()
      setLines([
        `swap 1 (a→b) canvas preserved: ${before !== null && before === afterB ? 'PASS' : 'FAIL'}`,
        `swap 2 (b→a) canvas preserved: ${afterB !== null && afterB === afterA ? 'PASS' : 'FAIL'}`,
        `no flash during swaps: ${flash === '' ? 'PASS' : `FAIL (${flash})`}`,
      ])
    }
    void step()
    return () => {
      alive = false
      observer.disconnect()
    }
  }, [scenes])

  return (
    <div>
      <div ref={rootRef} style={{ width: 720, height: 380 }}>
        <Viewport scene={scene} error={null} height={380} />
      </div>
      <pre id="result" style={{ font: '600 13px/20px ui-monospace, monospace' }}>
        {lines.join('\n')}
      </pre>
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
