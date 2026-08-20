import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseSTL } from '../src/convert/stl.js'
import { parseOBJ } from '../src/convert/obj.js'
import { parseDXF } from '../src/convert/dxf.js'
import { parseSVG } from '../src/convert/svg.js'
import { parseOcct } from '../src/convert/step.js'
import { convert } from '../src/convert/index.js'
import { detectFormat } from '../src/convert/detect.js'
import { SceneStore } from '../src/store.js'

const fixturesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures')
const fixture = (name: string): Promise<Buffer> => readFile(path.join(fixturesDir, name))

/** Build a binary STL of a unit cube (12 triangles). */
function binaryCubeSTL(): Buffer {
  const triangleCount = 12
  const buffer = Buffer.alloc(84 + triangleCount * 50)
  buffer.writeUInt32LE(triangleCount, 80)
  const faces: [number[], number[], number[], number[]][] = [
    // [normal, a, b, c] per triangle, covering the 6 cube faces.
    [[0, 0, 1], [0, 0, 1], [1, 0, 1], [1, 1, 1]],
    [[0, 0, 1], [0, 0, 1], [1, 1, 1], [0, 1, 1]],
    [[0, 0, -1], [0, 0, 0], [1, 1, 0], [1, 0, 0]],
    [[0, 0, -1], [0, 0, 0], [0, 1, 0], [1, 1, 0]],
    [[1, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 1]],
    [[1, 0, 0], [1, 0, 0], [1, 0, 1], [1, 1, 1]],
    [[-1, 0, 0], [0, 0, 0], [0, 0, 1], [0, 1, 1]],
    [[-1, 0, 0], [0, 0, 0], [0, 1, 1], [0, 1, 0]],
    [[0, 1, 0], [0, 1, 0], [1, 1, 0], [1, 1, 1]],
    [[0, 1, 0], [0, 1, 0], [1, 1, 1], [0, 1, 1]],
    [[0, -1, 0], [0, 0, 0], [0, 0, 1], [1, 0, 1]],
    [[0, -1, 0], [0, 0, 0], [1, 0, 1], [1, 0, 0]],
  ]
  let offset = 84
  for (const [normal, a, b, c] of faces) {
    for (const vertex of [normal, a, b, c]) {
      for (const component of vertex) {
        buffer.writeFloatLE(component, offset)
        offset += 4
      }
    }
    offset += 2
  }
  return buffer
}

describe('format detection', () => {
  it('maps extensions', () => {
    expect(detectFormat('bracket.STL')).toBe('stl')
    expect(detectFormat('part.step')).toBe('step')
    expect(detectFormat('part.stp')).toBe('step')
    expect(detectFormat('part.igs')).toBe('iges')
    expect(detectFormat('drawing.DXF')).toBe('dxf')
    expect(detectFormat('bracket.dcprt')).toBe('dcprt')
    expect(detectFormat('noext')).toBeNull()
    expect(detectFormat('file.zip')).toBeNull()
  })
})

describe('STL', () => {
  it('parses binary STL into a welded indexed mesh', () => {
    const mesh = parseSTL(binaryCubeSTL(), 'cube')
    expect(mesh.triangleCount).toBe(12)
    expect(mesh.vertexCount).toBe(8) // welded from 36 corners
    const indices = Buffer.from(mesh.indices, 'base64')
    expect(indices.length).toBe(12 * 3 * 4)
  })

  it('parses ASCII STL tetrahedron', () => {
    const mesh = parseSTL(
      Buffer.from(`solid tetra
  facet normal 0 0 -1
    outer loop
      vertex 0 0 0
      vertex 1 0 0
      vertex 0.5 1 0
    endloop
  endfacet
endsolid tetra`),
      'tetra',
    )
    expect(mesh.triangleCount).toBe(1)
    expect(mesh.vertexCount).toBe(3)
  })
})

describe('OBJ', () => {
  it('parses groups, faces, and fan-triangulates quads', async () => {
    const meshes = parseOBJ((await fixture('sample.obj')).toString('utf8'), 'sample')
    expect(meshes.map((mesh) => mesh.name)).toEqual(['tetra', 'cube'])
    const tetra = meshes[0]!
    expect(tetra.triangleCount).toBe(4)
    expect(tetra.normals).toBeDefined()
    const cube = meshes[1]!
    expect(cube.triangleCount).toBe(12) // 6 quads → 12 triangles
    expect(cube.normals).toBeUndefined() // cube faces have no vn
  })
})

describe('DXF', () => {
  it('maps entities, layers, and bounds', async () => {
    const drawing = parseDXF((await fixture('sample.dxf')).toString('utf8'))
    expect(drawing.kind).toBe('2d')
    expect(drawing.format).toBe('dxf')
    expect(drawing.entities).toHaveLength(6)
    expect(drawing.layers).toEqual(['OUTLINE', 'HOLES', 'ANNOTATION'])
    expect(drawing.bounds.min.x).toBeCloseTo(0)
    expect(drawing.bounds.max.x).toBeCloseTo(100)
    const types = drawing.entities.map((entity) => entity.type)
    expect(types).toEqual(['line', 'line', 'circle', 'circle', 'polyline', 'text'])
  })
})

describe('SVG', () => {
  it('scans basic shapes and carries raw text', async () => {
    const drawing = parseSVG((await fixture('sample.svg')).toString('utf8'))
    expect(drawing.kind).toBe('2d')
    expect(drawing.svgText).toContain('<svg')
    const types = drawing.entities.map((entity) => entity.type)
    expect(types).toEqual(['polyline', 'circle', 'line', 'polyline'])
    const rect = drawing.entities[0]!
    if (rect.type === 'polyline') {
      expect(rect.closed).toBe(true)
      expect(rect.points).toHaveLength(8) // 4 corners
    }
  })
})

describe('STEP (occt worker)', () => {
  it('tessellates a STEP part', async () => {
    const buffer = await fixture('sample.step')
    const meshes = await parseOcct(buffer, 'step', 'sample', 60_000)
    expect(meshes.length).toBeGreaterThanOrEqual(1)
    const triangles = meshes.reduce((sum, mesh) => sum + mesh.triangleCount, 0)
    expect(triangles).toBeGreaterThan(100)
    expect(meshes[0]!.positions.length).toBeGreaterThan(0)
  }, 90_000)
})

describe('convert dispatch', () => {
  it('produces a 3D scene with bounds for STL', async () => {
    const scene = await convert(binaryCubeSTL(), 'stl', 'cube.stl')
    expect(scene.kind).toBe('3d')
    if (scene.kind === '3d') {
      expect(scene.bounds.min).toMatchObject({ x: 0, y: 0, z: 0 })
      expect(scene.bounds.max).toMatchObject({ x: 1, y: 1, z: 1 })
    }
  })

  it('produces a 2D scene for DXF', async () => {
    const scene = await convert(await fixture('sample.dxf'), 'dxf', 'sample.dxf')
    expect(scene.kind).toBe('2d')
  })
})

describe('scene store', () => {
  it('round-trips scenes through memory and disk', async () => {
    const store = new SceneStore(fixturesDir)
    const scene = await convert(binaryCubeSTL(), 'stl', 'cube.stl')
    const viewId = await store.put(scene)
    expect(await store.get(viewId)).toEqual(scene)
    // Drop the memory copy; the disk spill restores it.
    ;(store as unknown as { memory: Map<string, unknown> }).memory.clear()
    const restored = await store.get(viewId)
    expect(restored).toEqual(scene)
    await store.delete(viewId)
    expect(await store.get(viewId)).toBeNull()
  })

  it('rejects malformed view ids', async () => {
    const store = new SceneStore(fixturesDir)
    expect(await store.get('../etc/passwd')).toBeNull()
    expect(await store.get('')).toBeNull()
  })
})
