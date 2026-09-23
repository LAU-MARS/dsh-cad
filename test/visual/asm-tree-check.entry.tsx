/**
 * Assembly-tree visual check: mounts the real AssemblyTree component next to
 * a real Viewport with palette-colored box meshes (the same instanceColor
 * values the server bakes into the assembly scene). Click a part row → its
 * solid glows. Served by serve-asm.mjs.
 */
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AssemblyTree } from '../../client/assembly-tree.js'
import type { AssemblyTreeData } from '../../client/assembly-tree.js'
import { Viewport } from '../../client/viewport.js'
import type { BinaryScene3D } from '../../client/viewport.js'
import { instanceColor, INSTANCE_PALETTE } from '../../src/modeling/assembly.js'

const style = document.createElement('style')
style.textContent = `
  body { margin: 0; font-family: -apple-system, "Segoe UI", sans-serif; background: #f0f2f5; padding: 16px; }
  h1 { font-size: 15px; color: #333; }
  #asm { width: 900px; height: 560px; display: flex; border: 1px dashed #999; border-radius: 10px; overflow: hidden; background: #fff; }
`
document.head.appendChild(style)

const PART_NAMES = [
  'ring_gear', 'sun_gear', 'planet_gear_1', 'planet_gear_2', 'planet_gear_3',
  'carrier', 'planet_pin_1', 'planet_pin_2', 'planet_pin_3', 'input_shaft', 'output_shaft',
]

const tree: AssemblyTreeData = {
  docId: 'demo',
  version: 11,
  name: '行星齿轮箱',
  parts: PART_NAMES.map((name, index) => ({
    instanceId: `a${index + 1}`,
    bodyId: `b${index + 1}`,
    name,
    color: instanceColor(index),
    missing: name === 'planet_pin_3', // one consumed-body row, greyed out
  })),
  constraints: [
    { id: 0, type: 'concentric', a: 'sun_gear', b: 'input_shaft' },
    { id: 1, type: 'concentric', a: 'planet_gear_1', b: 'planet_pin_1' },
    { id: 2, type: 'concentric', a: 'planet_gear_2', b: 'planet_pin_2' },
    { id: 3, type: 'concentric', a: 'planet_gear_3', b: 'planet_pin_3' },
    { id: 4, type: 'concentric', a: 'carrier', b: 'planet_pin_1' },
    { id: 5, type: 'concentric', a: 'carrier', b: 'planet_pin_2' },
    { id: 6, type: 'concentric', a: 'carrier', b: 'planet_pin_3' },
    { id: 7, type: 'concentric', a: 'carrier', b: 'output_shaft' },
    { id: 8, type: 'concentric', label: '同轴 Concentric', a: 'ring_gear', b: 'sun_gear' },
  ],
}

/** Axis-aligned box mesh (24 verts, per-face normals) at a grid slot. */
function boxMesh(name: string, cx: number, cy: number, color: number) {
  const s = 14
  const faces: Array<[number[], number[]]> = [
    [[1, 0, 0], [[s, -s, -s], [s, s, -s], [s, s, s], [s, -s, s]]],
    [[-1, 0, 0], [[-s, -s, -s], [-s, -s, s], [-s, s, s], [-s, s, -s]]],
    [[0, 1, 0], [[-s, s, -s], [-s, s, s], [s, s, s], [s, s, -s]]],
    [[0, -1, 0], [[-s, -s, -s], [s, -s, -s], [s, -s, s], [-s, -s, s]]],
    [[0, 0, 1], [[-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s]]],
    [[0, 0, -1], [[-s, -s, -s], [-s, s, -s], [s, s, -s], [s, -s, -s]]],
  ]
  const positions: number[] = []
  const normals: number[] = []
  const indices: number[] = []
  for (const [normal, corners] of faces) {
    const base = positions.length / 3
    for (const corner of corners) {
      positions.push(corner[0]! + cx, corner[1]! + cy, corner[2]!)
      normals.push(normal[0]!, normal[1]!, normal[2]!)
    }
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3)
  }
  return {
    name,
    color,
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    indices: new Uint32Array(indices),
    vertexCount: positions.length / 3,
    triangleCount: indices.length / 3,
  }
}

const meshes = PART_NAMES.slice(0, 6).map((name, index) =>
  boxMesh(name, (index % 3) * 40 - 40, Math.floor(index / 3) * 40 - 20, INSTANCE_PALETTE[index]!),
)
const scene: BinaryScene3D = {
  kind: '3d',
  format: 'assembly',
  meshes,
  bounds: { min: { x: -60, y: -40, z: -14 }, max: { x: 60, y: 40, z: 14 } },
  units: 'mm',
}

function App(): JSX.Element {
  const [selected, setSelected] = useState<string | null>(null)
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set())
  return (
    <div style={{ position: 'relative', flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <Viewport scene={scene} error={null} fill highlight={selected} hidden={[...hidden]} />
      </div>
      <div style={{ position: 'absolute', top: 8, left: 8, zIndex: 6, maxHeight: 'calc(100% - 16px)', display: 'flex', flexDirection: 'column' }}>
        <AssemblyTree
          tree={tree}
          selected={selected}
          onSelect={setSelected}
          hidden={hidden}
          onToggleHidden={(part) => {
            setHidden((previous) => {
              const next = new Set(previous)
              if (next.has(part.name)) next.delete(part.name)
              else next.add(part.name)
              return next
            })
          }}
          onCollapse={() => {}}
        />
      </div>
    </div>
  )
}

createRoot(document.getElementById('asm')!).render(<App />)
