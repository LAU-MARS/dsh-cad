/**
 * Ansatz constraint-solver integration: the wasm bridge (package resolution,
 * solve + error envelope), the Euler-degrees ↔ axis-angle-radians pose
 * conversions, solver-model building from assembly instances, and the worker
 * ops (constraints persistence + assembly_list).
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { runModelOp } from '../src/modeling/client.js'
import { ansatzAvailable, resolveAnsatzWasmDir, solveModel } from '../src/modeling/ansatz-bridge.js'
import { buildSolverModel, instanceToRigid3, rigid3ToInstance } from '../src/modeling/constraints.js'
import type { AssemblyInstance } from '../src/modeling/client.js'

const ansatzReady = ansatzAvailable()

const instance = (id: string, translate: [number, number, number], rotate: [number, number, number]): AssemblyInstance =>
  ({ instanceId: id, bodyId: 'b1', name: id, translate, rotate })

describe('ansatz bridge', () => {
  it('resolves the wasm solver from the npm dependency (no Rust toolchain, no native binary)', () => {
    // `ansatz-wasm` is a declared dependency, so installing dsh-cad is enough;
    // its absence would silently disable the constraint tools.
    const dir = resolveAnsatzWasmDir()
    expect(dir).not.toBeNull()
    expect(dir!.split(path.sep).join('/')).toContain('node_modules/ansatz-wasm')
    expect(ansatzAvailable()).toBe(true)
  })

  it('solves the supported point-distance case with full diagnostics', async () => {
    if (!ansatzReady) throw new Error('Ansatz wasm solver not found — npm install ansatz-wasm first')
    const report = await solveModel({
      entities: [{ id: 0, geometry: { type: 'point2', x: 0, y: 0 } }],
      constraints: [{ id: 0, kind: { type: 'distance', a: 0, b: null, value: 10 } }],
    })
    expect(report.outcome).toBe('underconstrained')
    const solved = report.entities[0]!.geometry as { x: number; y: number }
    expect(solved.x).toBeCloseTo(10, 6)
    expect(solved.y).toBeCloseTo(0, 6)
    const diagnostics = report.diagnostics as { dof_remaining: number; dof_total: number; suggestions: unknown[] }
    expect(diagnostics.dof_remaining).toBe(1)
    expect(diagnostics.dof_total).toBe(2)
    expect(diagnostics.suggestions.length).toBeGreaterThan(0)
  })

  it('surfaces the solver tool-error envelope as a thrown Error', async () => {
    if (!ansatzReady) throw new Error('Ansatz wasm solver not found')
    await expect(solveModel({
      entities: [
        { id: 0, geometry: { type: 'point2', x: 0, y: 0 } },
        { id: 1, geometry: { type: 'point2', x: 1, y: 1 } },
      ],
      constraints: [{ id: 0, kind: { type: 'distance', a: 0, b: 1, value: 10 } }],
    })).rejects.toThrow(/unsupported_constraint/)
  })
})

describe('pose conversions (Euler degrees ↔ axis-angle radians)', () => {
  const DEG = Math.PI / 180
  /** Local euler(XYZ, deg)→quaternion for equivalence checks (|q1·q2| ≈ 1). */
  const quat = (rx: number, ry: number, rz: number): number[] => {
    const cx = Math.cos((rx * DEG) / 2), sx = Math.sin((rx * DEG) / 2)
    const cy = Math.cos((ry * DEG) / 2), sy = Math.sin((ry * DEG) / 2)
    const cz = Math.cos((rz * DEG) / 2), sz = Math.sin((rz * DEG) / 2)
    return [sx * cy * cz + cx * sy * sz, cx * sy * cz - sx * cy * sz, cx * cy * sz + sx * sy * cz, cx * cy * cz - sx * sy * sz]
  }

  const roundTrip = (rotate: [number, number, number]): void => {
    const pose = instanceToRigid3(instance('i', [10, 20, 30], rotate))
    expect([pose.translation.x, pose.translation.y, pose.translation.z]).toEqual([10, 20, 30])
    const back = rigid3ToInstance(pose)
    expect(back.translate).toEqual([10, 20, 30])
    // Euler values may wrap (±180° / gimbal); the ROTATION must survive —
    // compare quaternions of the input Euler and the recovered one.
    const a = quat(rotate[0], rotate[1], rotate[2])
    const [ax, ay, az] = pose.rotation.vector
    const b = quat(...rigid3ToInstance({ translation: { x: 0, y: 0, z: 0 }, rotation: { vector: [ax, ay, az] } }).rotate)
    const dot = Math.abs(a[0]! * b[0]! + a[1]! * b[1]! + a[2]! * b[2]! + a[3]! * b[3]!)
    expect(dot).toBeCloseTo(1, 9)
  }

  it('round-trips identity, principal axes, and composite rotations', () => {
    roundTrip([0, 0, 0])
    roundTrip([0, 0, 90])
    roundTrip([90, 0, 0])
    roundTrip([0, 90, 0])
    roundTrip([30, 45, 60])
    roundTrip([-120, 0, 200])
  })

  it('represents a 90° Z rotation as a π-length axis-vector on +Z', () => {
    const pose = instanceToRigid3(instance('i', [0, 0, 0], [0, 0, 90]))
    const [ax, ay, az] = pose.rotation.vector
    expect(Math.hypot(ax, ay, az)).toBeCloseTo(Math.PI / 2, 9)
    expect(az).toBeGreaterThan(0.99)
    expect(ax).toBeCloseTo(0, 9)
    expect(ay).toBeCloseTo(0, 9)
  })
})

describe('solver-model building', () => {
  it('maps instance-bound entities to live rigid3 poses', () => {
    const model = buildSolverModel(
      {
        entities: [{ id: 0, instance: 'a1' }, { id: 1, geometry: { type: 'point2', x: 1, y: 2 } }],
        constraints: [],
      },
      [instance('a1', [5, 0, 0], [0, 0, 0])],
    )
    expect(model.entities[0]!.geometry).toEqual({ type: 'rigid3', pose: { translation: { x: 5, y: 0, z: 0 }, rotation: { vector: [0, 0, 0] } } })
    expect(model.entities[1]!.geometry).toEqual({ type: 'point2', x: 1, y: 2 })
  })

  it('rejects entities bound to unknown instances', () => {
    expect(() => buildSolverModel({ entities: [{ id: 0, instance: 'nope' }], constraints: [] }, [])).toThrow(/unknown assembly instance/)
  })
})

describe('worker ops: constraints + assembly_list', () => {
  beforeEach(async () => {
    await runModelOp({ kind: 'reset' })
  })

  afterEach(async () => {
    await runModelOp({ kind: 'reset' })
  })

  it('stores the constraint model and lists it back via replay-safe ops', async () => {
    const stored = await runModelOp({
      kind: 'constraints',
      model: {
        entities: [{ id: 0, geometry: { type: 'point2', x: 0, y: 0 } }],
        constraints: [{ id: 0, kind: { type: 'distance', a: 0, b: null, value: 10 } }],
      },
    })
    expect(stored.stored).toBe(true)
    expect(stored.entities).toBe(1)
    expect(stored.constraints).toBe(1)
  })

  it('assembly_list returns every placed instance', async () => {
    await runModelOp({ kind: 'create_prim', bodyId: 'b1', prim: 'box', params: { dx: 10, dy: 10, dz: 10 } })
    await runModelOp({ kind: 'assembly_insert', instanceId: 'a1', bodyId: 'b1' })
    await runModelOp({ kind: 'assembly_insert', instanceId: 'a2', bodyId: 'b1', translate: [50, 0, 0], rotate: [0, 0, 90] })
    const list = await runModelOp({ kind: 'assembly_list' })
    expect(list.instances).toHaveLength(2)
    const a2 = list.instances!.find((entry) => entry.instanceId === 'a2')!
    expect(a2.translate).toEqual([50, 0, 0])
    expect(a2.rotate).toEqual([0, 0, 90])
  })
})
