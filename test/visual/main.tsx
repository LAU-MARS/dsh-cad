/**
 * Visual verification harness entry: renders the real CadCard component with
 * scenes produced by the real converters, served over a tiny static server.
 */
import { createRoot } from 'react-dom/client'
import { CadCard } from '../../client/card.js'
import { CadDetailsPanel, CadModelView } from '../../client/details.js'
import { rememberLatest } from '../../client/viewport.js'

const style = document.createElement('style')
style.textContent = `
  body { margin: 0; font-family: -apple-system, "Segoe UI", sans-serif; background: #f0f2f5; padding: 16px; }
  h1 { font-size: 15px; color: #333; }
`
document.head.appendChild(style)

function mountCard(id: string, meta: Record<string, unknown>): void {
  const container = document.getElementById(id)!
  createRoot(container).render(
    <CadCard
      callId={`test-${id}`}
      toolName="cad_view"
      block={{ kind: 'tool-result', meta }}
    />,
  )
}

mountCard('card-3d-step', {
  viewId: 'visual-step',
  kind: '3d',
  format: 'step',
  file: 'foot_front_prt.step',
  sceneUrl: '/scene-3d-step.json',
  title: 'foot_front_prt.step · STEP',
  stats: { meshes: 1, triangles: 4096 },
})

mountCard('card-3d-stl', {
  viewId: 'visual-stl',
  kind: '3d',
  format: 'stl',
  file: 'cube.stl',
  sceneUrl: '/scene-3d-stl.json',
  title: 'cube.stl · STL',
  stats: { meshes: 1, triangles: 12 },
})

mountCard('card-3d-model', {
  viewId: 'visual-model',
  kind: '3d',
  format: 'model',
  file: 'modeling document',
  sceneUrl: '/scene-3d-model.json',
  title: 'CAD model · 2 bodies',
  stats: { meshes: 2, triangles: 1564 },
})

// The resident 3D view tab: (a) empty — XYZ triad visible, (b) via a simulated
// conversation snapshot (the authoritative path while the Chat tab is hidden).
const tabRoot = document.getElementById('view-tab')!
tabRoot.style.width = '720px'
tabRoot.style.border = '1px dashed #999'
tabRoot.style.borderRadius = '10px'
tabRoot.style.overflow = 'hidden'
createRoot(tabRoot).render(
  <CadModelView
    useSession={(selector) =>
      selector({
        nodes: [
          { kind: 'tool-result', meta: { viewId: 'snowman', kind: '3d', format: 'model', file: 'snowman', sceneUrl: '/scene-3d-snowman.json', title: 'snowman.step · STEP', stats: { meshes: 6, triangles: 2485 } } },
        ],
      })
    }
  />,
)

const tabRootEmpty = document.getElementById('view-tab-empty')!
tabRootEmpty.style.width = '360px'
tabRootEmpty.style.border = '1px dashed #bbb'
tabRootEmpty.style.borderRadius = '10px'
tabRootEmpty.style.overflow = 'hidden'
createRoot(tabRootEmpty).render(<CadModelView useSession={(selector) => selector({ nodes: [] })} />)

// Simulate the right-side details panel: first a selected CAD call, then a
// non-CAD call (latest model stays pinned + generic info below).
const detailsRoot = document.getElementById('details-panel')!
detailsRoot.style.width = '360px'
detailsRoot.style.border = '1px dashed #999'
detailsRoot.style.borderRadius = '10px'
detailsRoot.style.overflow = 'hidden'
createRoot(detailsRoot).render(
  <CadDetailsPanel
    block={{
      kind: 'tool-result',
      call: { name: 'bash', argsRaw: JSON.stringify({ command: 'ls -la' }) },
      content: [{ type: 'text', text: 'total 8\ndrwxr-xr-x  4 kane staff  128 Aug 16 10:00 src' }],
    }}
  />,
)

mountCard('card-2d-dxf', {
  viewId: 'visual-dxf',
  kind: '2d',
  format: 'dxf',
  file: 'sample.dxf',
  sceneUrl: '/scene-2d-dxf.json',
  title: 'sample.dxf · DXF',
  stats: { entities: 6 },
})
