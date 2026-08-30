/**
 * The GeometryExecutor contract: op normalization is executor-agnostic and
 * shared by every backend; the registry exposes exactly the executors this
 * build ships; the Fusion probe degrades cleanly when Fusion is absent.
 */
import { describe, expect, it } from 'vitest'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { normalizeOps, EXECUTORS, executorById, isKnownOpKind } from '../src/cad_connector/executor.js'
import { findFusion360, installFusionBridge } from '../src/cad_connector/fusion360-executor.js'

describe('normalizeOps (shared across executors)', () => {
  it('maps liberal LLM shapes onto canonical ops', () => {
    const normalized = normalizeOps([
      { op: 'cut', target: 'plate', tools: ['hole'] },
      { op: 'create_prim', kind: 'box', bodyId: 'b', dx: 10 },
      { kind: 'create_prim', bodyId: 'c', prim: 'cylinder', radius: 5, height: 10 },
    ])
    expect(normalized[0]).toEqual({ kind: 'boolean', op: 'cut', target: 'plate', tools: ['hole'] })
    expect(normalized[1]).toEqual({ kind: 'create_prim', bodyId: 'b', prim: 'box', params: { dx: 10 } })
    expect(normalized[2]).toEqual({ kind: 'create_prim', bodyId: 'c', prim: 'cylinder', params: { radius: 5, height: 10 } })
  })

  it('leaves canonical ops untouched', () => {
    const canonical = [{ kind: 'boolean', op: 'fuse', target: 'a', tools: ['b'] }]
    expect(normalizeOps(canonical)[0]).toEqual(canonical[0])
  })

  it('exposes the known op kinds', () => {
    expect(isKnownOpKind('create_prim')).toBe(true)
    expect(isKnownOpKind('explode')).toBe(false)
  })
})

describe('executor registry', () => {
  it('ships builtin, freecad and fusion360 over the one contract', () => {
    expect(EXECUTORS.map((executor) => executor.id)).toEqual(['builtin', 'freecad', 'fusion360'])
    expect(executorById('builtin')?.available()).toBe(true)
    expect(typeof executorById('freecad')?.available()).toBe('boolean')
  })

  it('builtin runs a one-shot program on an isolated worker', async () => {
    const executor = executorById('builtin')
    if (executor === undefined) throw new Error('missing builtin executor')
    const result = await executor.run({
      ops: [
        { kind: 'create_prim', bodyId: 'a', prim: 'box', params: { dx: 20, dy: 20, dz: 20 } },
        { kind: 'volume', target: 'a' },
      ],
    })
    expect(result.meshes.length).toBeGreaterThanOrEqual(1)
    expect(result.meshes[0]?.triangleCount ?? 0).toBeGreaterThan(0)
    expect(Math.abs((result.volumes.a ?? 0) - 8000)).toBeLessThan(1)
  }, 60_000)
})

describe('fusion360 executor', () => {
  it('probes without throwing (null or an app path)', () => {
    const probed = findFusion360()
    expect(probed === null || probed.length > 0).toBe(true)
  })

  it('installs the resident bridge add-in idempotently with a manifest', async () => {
    const directory = await installFusionBridge()
    const manifest = JSON.parse(await readFile(path.join(directory, 'DshCadBridge.manifest'), 'utf8')) as { id: string }
    expect(manifest.id).toBe('DshCadBridge')
    const script = await readFile(path.join(directory, 'DshCadBridge.py'), 'utf8')
    expect(script).toContain('TemporaryBRepManager')
    expect(script).toContain('fusion-spool')
    // Second install overwrites cleanly (idempotent).
    await installFusionBridge()
  })
})
