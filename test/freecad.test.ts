/**
 * FreeCAD external executor tests. End-to-end cases run only when a local
 * FreeCAD is discoverable (it.runIf); the availability probe itself always
 * runs so the registry claim stays honest on any machine.
 */
import { describe, expect, it } from 'vitest'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { findFreeCad, freecadAvailable, runFreeCadProgram } from '../src/cad_connector/freecad-executor.js'

describe('freecad availability', () => {
  it('probes without throwing', () => {
    const found = findFreeCad()
    expect(found === null || path.isAbsolute(found)).toBe(true)
    expect(typeof freecadAvailable()).toBe('boolean')
  })
})

describe.skipIf(!freecadAvailable())('freecad executor (end-to-end)', () => {
  let dir: string

  it.beforeAll(async () => {
    dir = await mkdtemp(path.join(tmpdir(), 'dsh-cad-freecad-'))
  })

  it.afterAll(async () => {
    await rm(dir, { recursive: true, force: true })
  })

  it('cuts a hole with the exact analytic volume', async () => {
    const result = await runFreeCadProgram({
      ops: [
        { kind: 'create_prim', bodyId: 'plate', prim: 'box', params: { dx: 100, dy: 60, dz: 10 } },
        { kind: 'create_prim', bodyId: 'hole', prim: 'cylinder', params: { radius: 10, height: 30, at: [50, 30, 0] } },
        { kind: 'boolean', op: 'cut', target: 'plate', tools: ['hole'] },
        { kind: 'volume', target: 'plate' },
      ],
    })
    expect(result.meshes).toHaveLength(1)
    expect(result.meshes[0]!.triangleCount).toBeGreaterThan(12)
    expect(result.volumes.plate).toBeCloseTo(100 * 60 * 10 - Math.PI * 100 * 10, 0)
  }, 120_000)

  it('round-trips STEP export → input reload → STL export', async () => {
    const stepPath = path.join(dir, 'boss.step')
    const built = await runFreeCadProgram({
      ops: [
        { kind: 'create_prim', bodyId: 'block', prim: 'box', params: { dx: 40, dy: 40, dz: 8 } },
        { kind: 'create_prim', bodyId: 'boss', prim: 'cylinder', params: { radius: 10, height: 20, at: [20, 20, 8] } },
        { kind: 'boolean', op: 'fuse', target: 'block', tools: ['boss'] },
      ],
      export: { format: 'step', path: stepPath },
    })
    expect(built.exported).toBe(stepPath)
    expect((await readFile(stepPath, 'utf8')).startsWith('ISO-10303-21')).toBe(true)

    const stlPath = path.join(dir, 'boss.stl')
    const reloaded = await runFreeCadProgram({
      input: { format: 'step', path: stepPath },
      ops: [{ kind: 'transform', target: 'input', translate: [0, 0, 2] }, { kind: 'volume', target: 'input' }],
      export: { format: 'stl', path: stlPath },
    })
    // The boss sits entirely above the block (z 8..28), so the fused volume
    // is the full block + full cylinder.
    expect(reloaded.volumes.input).toBeCloseTo(40 * 40 * 8 + Math.PI * 100 * 20, 0)
    const stl = await readFile(stlPath)
    const triangles = stl.readUInt32LE(80)
    expect(triangles).toBeGreaterThan(12)
    expect(stl.length).toBe(84 + triangles * 50)
  }, 120_000)

  it('extrudes a profile and reports a failing op with its kind', async () => {
    const result = await runFreeCadProgram({
      ops: [{ kind: 'extrude_profile', bodyId: 'L', points: [0, 0, 40, 0, 40, 10, 10, 10, 10, 30, 0, 30], height: 5 }],
    })
    expect(result.meshes).toHaveLength(1)

    await expect(
      runFreeCadProgram({ ops: [{ kind: 'create_prim', bodyId: 'x', prim: 'nonexistent' }] }),
    ).rejects.toThrow(/unknown primitive/)
  }, 120_000)
})
