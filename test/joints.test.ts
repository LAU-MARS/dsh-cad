/**
 * Joint algebra (src/modeling/joints.ts): frames, motions, pairing rules,
 * connect solving, solve replay (motion studies) and exploded-view offsets —
 * the cadorange 0.10.0 assembly semantics in dsh-cad's translate + XYZ-Euler
 * placement convention. Pure math, no kernel.
 */
import { describe, expect, it } from 'vitest'
import {
  applyConnectValue,
  checkPairing,
  eulerMatrix,
  explodeOffsets,
  jointValueText,
  matPlacement,
  mergeJointValue,
  normalizeJointSpec,
  placementMat,
  solveConnection,
  solveConnections,
} from '../src/modeling/joints.js'
import { composeAssemblyMeshes, foldAssemblyState } from '../src/modeling/assembly.js'
import type { ModelOp } from '../src/modeling/client.js'
import type { BinMeshData } from '../src/modeling/bin-format.js'

const closeTo = (actual: readonly number[], expected: readonly number[], epsilon = 1e-9): void => {
  expect(actual).toHaveLength(expected.length)
  for (let i = 0; i < expected.length; i++) {
    expect(Math.abs((actual[i] ?? 0) - (expected[i] ?? 0))).toBeLessThan(epsilon)
  }
}

describe('placement algebra', () => {
  it('round-trips Euler ↔ matrix (same rotation, even when Euler differs)', () => {
    const rotations: Array<[number, number, number]> = [
      [0, 0, 0],
      [30, 0, 0],
      [0, 45, 0],
      [0, 0, 90],
      [10, -20, 30],
      [179, -179, 179],
    ]
    for (const rotate of rotations) {
      // Euler extraction is not unique globally (±180 wraps, gimbal
      // degeneracies) — the contract is that the recovered angles reproduce
      // the SAME matrix.
      const back = matPlacement(placementMat({ translate: [1, 2, 3], rotate })).rotate
      closeTo(eulerMatrix(back), eulerMatrix(rotate), 1e-6)
    }
  })

  it('extracts Euler at gimbal lock (ry = ±90°)', () => {
    const rotate: [number, number, number] = [35, 90, 0]
    const r = eulerMatrix(rotate)
    const back = matPlacement({ r, t: [0, 0, 0] }).rotate
    // The recovered (rx, ry, rz) must reproduce the SAME matrix.
    closeTo(eulerMatrix(back), r, 1e-6)
    expect(back[1]).toBeCloseTo(90, 6)
  })
})

describe('solveConnection (connect)', () => {
  it('places the child so two rigid frames coincide', () => {
    const placement = solveConnection(
      { translate: [0, 0, 0], rotate: [0, 0, 0] },
      { type: 'rigid', at: [10, 0, 0] },
      { type: 'rigid', at: [0, 0, 5] },
    )
    closeTo(placement.translate, [10, 0, -5])
    closeTo(placement.rotate, [0, 0, 0])
  })

  it('rotates the child by a revolute parent at 90°', () => {
    const placement = solveConnection(
      { translate: [0, 0, 0], rotate: [0, 0, 0] },
      { type: 'revolute', value: 90 },
      { type: 'rigid' },
    )
    closeTo(placement.translate, [0, 0, 0])
    closeTo(placement.rotate, [0, 0, 90])
  })

  it('slides along the parent axis for a linear parent (axis +X)', () => {
    const placement = solveConnection(
      { translate: [0, 0, 0], rotate: [0, 0, 0] },
      { type: 'linear', axis: [1, 0, 0], value: 12 },
      { type: 'rigid' },
    )
    closeTo(placement.translate, [12, 0, 0])
    // The child also inherits the joint frame's orientation — assert via the
    // matrix round-trip rather than a specific Euler gimbal branch.
    const frame = placementMat(placement)
    closeTo(matPlacement(frame).translate, [12, 0, 0])
  })

  it('honors the parent instance\'s own placement', () => {
    const placement = solveConnection(
      { translate: [100, 0, 0], rotate: [0, 90, 0] },
      { type: 'revolute', at: [0, 0, 0], value: 0 },
      { type: 'rigid', at: [5, 0, 0] },
    )
    // childWorld = P ∘ Fp ∘ Fc⁻¹ with P = translate(100,0,0)·Ry(90):
    // t = Ry90·(−5,0,0) + (100,0,0) = (100,0,5), rotation inherited from P.
    closeTo(placement.translate, [100, 0, 5])
    closeTo(placement.rotate, [0, 90, 0], 1e-9)
    // The child's joint anchor [5,0,0] lands on the parent joint's world
    // position P·(0,0,0) = (100,0,0) — the connect invariant.
    const world = placementMat(placement)
    const anchor = [
      (world.r[0] ?? 0) * 5 + world.t[0],
      (world.r[3] ?? 0) * 5 + world.t[1],
      (world.r[6] ?? 0) * 5 + world.t[2],
    ]
    closeTo(anchor, [100, 0, 0])
  })
})

describe('pairing + value validation', () => {
  it('enforces the build123d pairing table', () => {
    checkPairing('revolute', 'rigid', 'ok')
    checkPairing('linear', 'revolute', 'ok')
    expect(() => checkPairing('revolute', 'revolute', 'x')).toThrow(/revolute joint connects to rigid/)
    expect(() => checkPairing('rigid', 'revolute', 'x')).toThrow(/rigid joint connects to rigid/)
  })

  it('rejects foreign keys, rigid values and out-of-range drives', () => {
    expect(() => normalizeJointSpec({ type: 'rigid', value: 5 }, 'j')).toThrow(/rigid joints take no motion value/)
    expect(() => normalizeJointSpec({ type: 'ball', value: 30 }, 'j')).toThrow(/needs an object value/)
    expect(() => normalizeJointSpec({ type: 'cylindrical', value: { radial: 1 } }, 'j')).toThrow(/do(es)? not take "radial"/)
    expect(() => normalizeJointSpec({ type: 'revolute', angularRange: [-90, 90], value: 100 }, 'j')).toThrow(/outside|超出/)
    expect(() => normalizeJointSpec({ type: 'nope' }, 'j')).toThrow(/type must be one of/)
    expect(() => normalizeJointSpec({ type: 'revolute', axis: [0, 0, 0] }, 'j')).toThrow(/non-zero/)
    expect(() => normalizeJointSpec({ type: 'revolute', at: [1, 2] }, 'j')).toThrow(/must be \[x,y,z\]/)
    expect(normalizeJointSpec({ type: 'planar', value: { angle: 10, position: [1, 2] } }, 'j').type).toBe('planar')
  })

  it('merges drive values key-wise and keeps the other DOFs', () => {
    const base = normalizeJointSpec({ type: 'cylindrical', value: { angle: 10, linear: 2 } }, 'j')
    const driven = mergeJointValue(base, { linear: 5 }, 'drive')
    expect(driven.value).toEqual({ angle: 10, linear: 5 })
    expect(jointValueText(driven)).toBe('10° · 5mm')
  })

  it('routes connect `angle` to the child revolute in a linear→revolute pair', () => {
    const parent = normalizeJointSpec({ type: 'linear' }, 'p')
    const child = normalizeJointSpec({ type: 'revolute' }, 'c')
    const applied = applyConnectValue(parent, child, { linear: 3, angle: 45 }, 'connect')
    expect(applied.parent.value).toEqual({ linear: 3 })
    expect(applied.child.value).toEqual({ angle: 45 })
  })
})

describe('solveConnections (fold + replay)', () => {
  /** Base + two chained children: base hinge drives everything downstream. */
  const CHAIN: ModelOp[] = [
    { kind: 'assembly_insert', instanceId: 'a1', bodyId: 'b1', name: 'base' },
    { kind: 'assembly_insert', instanceId: 'a2', bodyId: 'b2', name: 'arm' },
    { kind: 'assembly_insert', instanceId: 'a3', bodyId: 'b3', name: 'hand' },
    { kind: 'assembly_joint', instanceId: 'a1', label: 'hinge', joint: { type: 'revolute', axis: [0, 0, 1] } },
    { kind: 'assembly_joint', instanceId: 'a2', label: 'mount', joint: { type: 'rigid' } },
    { kind: 'assembly_connect', instanceId: 'a2', parent: 'a1', parentLabel: 'hinge', childLabel: 'mount' },
    { kind: 'assembly_transform', instanceId: 'a2', translate: [0, 0, 0], rotate: [0, 0, 0] },
    { kind: 'assembly_joint', instanceId: 'a2', label: 'arm', joint: { type: 'rigid', at: [5, 0, 0] } },
    { kind: 'assembly_joint', instanceId: 'a3', label: 'mount', joint: { type: 'rigid' } },
    { kind: 'assembly_connect', instanceId: 'a3', parent: 'a2', parentLabel: 'arm', childLabel: 'mount' },
    { kind: 'assembly_transform', instanceId: 'a3', translate: [5, 0, 0], rotate: [0, 0, 0] },
  ]

  it('keeps placements at value 0 (identity motion)', () => {
    const state = foldAssemblyState(CHAIN, {})
    const solved = solveConnections(state.instances, state.joints, state.connections)
    closeTo(solved.get('a2')!.translate, [0, 0, 0])
    closeTo(solved.get('a3')!.translate, [5, 0, 0])
  })

  it('propagates a driven hinge through the chain', () => {
    const state = foldAssemblyState([
      ...CHAIN,
      { kind: 'assembly_joint_value', instanceId: 'a1', label: 'hinge', value: 90 },
    ], {})
    expect(state.joints.get('a1')!.hinge.value).toBe(90)
    const solved = solveConnections(state.instances, state.joints, state.connections)
    closeTo(solved.get('a2')!.translate, [0, 0, 0])
    closeTo(solved.get('a2')!.rotate, [0, 0, 90], 1e-6)
    // a3's anchor [5,0,0] on the rotated arm lands on [0,5,0].
    closeTo(solved.get('a3')!.translate, [0, 5, 0], 1e-6)
    closeTo(solved.get('a3')!.rotate, [0, 0, 90], 1e-6)
  })

  it('drops connections whose instances were removed', () => {
    const state = foldAssemblyState([...CHAIN, { kind: 'assembly_remove', instanceId: 'a2' }], {})
    expect(state.connections.map((connection) => connection.child)).toEqual([])
    expect(state.joints.has('a2')).toBe(false)
  })
})

describe('explodeOffsets + composition', () => {
  /** A 2×2×2 cube mesh centered at the origin. */
  const cube = (): BinMeshData => ({
    name: 'cube',
    positions: new Float32Array([-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1]),
    normals: new Float32Array(72),
    indices: new Uint32Array([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]),
  })

  const bodies = new Map([
    ['b1', cube()],
    ['b2', cube()],
  ])
  const instances = [
    { instanceId: 'a1', bodyId: 'b1', name: 'left', translate: [0, 0, 0] as [number, number, number], rotate: [0, 0, 0] as [number, number, number] },
    { instanceId: 'a2', bodyId: 'b2', name: 'right', translate: [10, 0, 0] as [number, number, number], rotate: [0, 0, 0] as [number, number, number] },
  ]

  it('pushes every instance radially by factor × distance', () => {
    const offsets = explodeOffsets(bodies, instances, 1)
    closeTo(offsets.get('a1')!, [-5, 0, 0])
    closeTo(offsets.get('a2')!, [5, 0, 0])
    expect(explodeOffsets(bodies, instances, 0).size).toBe(0)
  })

  it('the composed scene carries the offsets (fold → compose pipeline)', () => {
    const ops: ModelOp[] = [
      { kind: 'assembly_insert', instanceId: 'a1', bodyId: 'b1', name: 'left' },
      { kind: 'assembly_insert', instanceId: 'a2', bodyId: 'b2', name: 'right', translate: [10, 0, 0] },
      { kind: 'assembly_explode', factor: 0.5 },
    ]
    const state = foldAssemblyState(ops, {})
    expect(state.explode).toBe(0.5)
    const offsets = explodeOffsets(bodies, state.instances, state.explode)
    const meshes = composeAssemblyMeshes(bodies, state.instances, offsets)
    // right cube at translate 10 + offset 2.5 → world x ∈ [11.5, 13.5].
    const xs = meshes[1]!.positions.filter((_, i) => i % 3 === 0)
    expect(Math.min(...xs)).toBeCloseTo(11.5, 6)
    expect(Math.max(...xs)).toBeCloseTo(13.5, 6)
  })
})
