/**
 * The packaged demo examples: assets/demo-<part>.brep must parse through the
 * real OCCT import pipeline (the same path /dsh-cad/demo-scene?part=… serves)
 * and reproduce each part's exact analytic geometry.
 */
import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { convert } from '../src/convert/index.js'

const asset = (part: string): string => fileURLToPath(new URL(`../assets/demo-${part}.brep`, import.meta.url))

interface Bounds { min: [number, number, number]; max: [number, number, number] }

/** Analytic part expectations (must match scripts/make-demo-brep.py). */
const PARTS: Array<{ part: string; volume: number; bounds: Bounds; tolerance: number }> = [
  {
    part: 'bracket',
    volume: (60 * 60 - 48 * 48 - Math.PI * 25) * 100,
    bounds: { min: [-30, -30, 0], max: [30, 30, 100] },
    tolerance: 0.01,
  },
  {
    part: 'flange',
    volume: Math.PI * (40 ** 2 * 12 + 22 ** 2 * 22 - 12 ** 2 * 34) - 6 * Math.PI * 3.5 ** 2 * 12,
    bounds: { min: [-40, -40, 0], max: [40, 40, 34] },
    tolerance: 0.02,
  },
  {
    part: 'shaft',
    // π(12²·80 + 16²·30) − keyway(30.654 mm² × 18); see the generator script.
    volume: Math.PI * 12 ** 2 * 80 + Math.PI * 16 ** 2 * 30 - 30.654 * 18,
    bounds: { min: [-16, -16, 0], max: [16, 16, 110] },
    tolerance: 0.02,
  },
]

/** Signed tetrahedron volume of the tessellation (mm³). */
function meshVolume(positions: Buffer, indices: Buffer): number {
  const at = (i: number): [number, number, number] => [
    positions.readFloatLE(i * 12),
    positions.readFloatLE(i * 12 + 4),
    positions.readFloatLE(i * 12 + 8),
  ]
  const indexAt = (i: number): number => indices.readUInt32LE(i * 4)
  let volume = 0
  for (let t = 0; t < indices.length / 4 / 3; t++) {
    const a = at(indexAt(t * 3))
    const b = at(indexAt(t * 3 + 1))
    const c = at(indexAt(t * 3 + 2))
    volume += (a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])) / 6
  }
  return Math.abs(volume)
}

describe('demo BRep parts (the editor demo files)', () => {
  for (const { part, volume, bounds, tolerance } of PARTS) {
    it(`${part}: parses through OCCT and matches analytic bounds + volume`, async () => {
      const buffer = await readFile(asset(part))
      expect(buffer.length).toBeGreaterThan(1000)
      const scene = await convert(buffer, 'brep', `demo-${part}`)
      if (scene.kind !== '3d') throw new Error('expected a 3D scene')
      expect(scene.meshes.length).toBeGreaterThanOrEqual(1)
      expect(scene.meshes[0]?.triangleCount ?? 0).toBeGreaterThan(50)

      const { min, max } = scene.bounds
      for (const axis of [0, 1, 2]) {
        expect(min[['x', 'y', 'z'][axis] as 'x']).toBeCloseTo(bounds.min[axis], 0)
        expect(max[['x', 'y', 'z'][axis] as 'x']).toBeCloseTo(bounds.max[axis], 0)
      }

      let tessellated = 0
      for (const mesh of scene.meshes) {
        tessellated += meshVolume(Buffer.from(mesh.positions, 'base64'), Buffer.from(mesh.indices, 'base64'))
      }
      expect(Math.abs(tessellated - volume) / volume).toBeLessThan(tolerance)
    })
  }

  it('shaft keyway cross-section matches the generator integral', () => {
    // ∫₋₄⁴ (√(256−x²) − 12) dx ≈ 30.654 mm² (numerically integrated in the script).
    const steps = 200_000
    const h = 8 / steps
    let area = 0
    for (let i = 0; i < steps; i++) {
      const x = -4 + (i + 0.5) * h
      area += (Math.sqrt(256 - x * x) - 12) * h
    }
    expect(Math.abs(area - 30.654)).toBeLessThan(0.01)
  })
})
