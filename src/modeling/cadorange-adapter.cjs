/**
 * cadorange-backed kernel adapter: maps dsh-cad's 21-verb adapter surface
 * onto cadorange's public API. cadorange is at the walking-skeleton stage
 * (M0), so verbs without a cadorange counterpart throw a structured
 * "unsupported yet" error — capability gaps fail loudly at call time instead
 * of silently misbehaving, and light up as cadorange's milestones land.
 *
 * Opt-in backend: `DSH_CAD_KERNEL=cadorange`. The default chain stays
 * occt.ts → opencascade.js until cadorange reaches parity.
 */
'use strict'

function createCadorangeAdapter(cad) {
  /** Loud, actionable capability gap. */
  const unsupported = (verb, milestone) => {
    throw new Error(
      `cadorange backend does not support ${verb} yet` +
        (milestone === undefined ? '' : ` (cadorange milestone ${milestone})`) +
        ' — unset DSH_CAD_KERNEL to use the occt.ts backend',
    )
  }

  /** Locate transform/rotation semantics once cadorange exposes placement. */
  const withAt = (shape, at) => {
    if (at === undefined) return shape
    if (typeof shape.translate === 'function') return shape.translate(at[0], at[1], at[2])
    unsupported('prim placement (`at`)', 'M0 loc')
    return shape
  }

  function makePrim(kind, params) {
    const at = params.at
    switch (kind) {
      case 'box':
        return withAt(cad.Box(params.dx ?? 10, params.dy ?? 10, params.dz ?? 10), at)
      case 'cylinder':
        return withAt(cad.Cylinder({ radius: params.radius ?? 5, height: params.height ?? 10 }), at)
      case 'sphere':
        return withAt(cad.Sphere({ radius: params.radius ?? 5 }), at)
      case 'cone':
        return withAt(cad.Cone({ radius1: params.radius1 ?? 5, radius2: params.radius2 ?? 0, height: params.height ?? 10 }), at)
      case 'torus':
        return withAt(cad.Torus({ radius1: params.radius1 ?? 8, radius2: params.radius2 ?? 2 }), at)
      default:
        throw new Error(`unknown prim kind: ${String(kind)}`)
    }
  }

  function boolean(op, target, tools) {
    let result = target
    for (const tool of tools) {
      if (op === 'fuse') result = typeof result.fuse === 'function' ? result.fuse(tool) : cad.fuse(result, tool)
      else if (op === 'cut') result = typeof result.cut === 'function' ? result.cut(tool) : cad.cut(result, tool)
      else if (op === 'common') result = typeof result.common === 'function' ? result.common(tool) : cad.common(result, tool)
      else throw new Error(`unknown boolean op: ${String(op)}`)
    }
    return result
  }

  /** All-edges fillet/chamfer via cadorange's selector surface. */
  const allEdges = (shape) => {
    if (typeof shape.edges === 'function') return shape.edges()
    unsupported('edge selection (shape.edges())')
    return null
  }

  function volume(shape) {
    if (typeof shape.volume === 'function') return shape.volume()
    const info = describe(shape)
    if (typeof info.volume === 'number') return info.volume
    unsupported('volume')
    return 0
  }

  function describe(shape) {
    if (typeof shape.describe === 'function') return shape.describe()
    unsupported('describe')
    return {}
  }

  function isValid(shape) {
    const info = describe(shape)
    return info.valid !== false
  }

  return {
    kernel: 'cadorange',

    makePrim,
    boolean,
    filletAll: (shape, radius) => cad.fillet(allEdges(shape), radius),
    chamferAll: (shape, distance) => cad.chamfer(allEdges(shape), distance),

    // cadorange M1 lands extrude/revolve/loft/sweep/shell/draft with the
    // sketch system — dsh-cad's curve-segment profiles map onto it then.
    extrudeProfile2D: () => unsupported('extrude_profile', 'M1'),
    makeLoft: () => unsupported('loft', 'M1'),
    makeSweep: () => unsupported('sweep', 'M1'),
    makeRevolve: () => unsupported('revolve', 'M1'),
    shell: () => unsupported('shell', 'M1'),
    draft: () => unsupported('draft', 'M1'),
    transform: () => unsupported('transform', 'M0 (loc)'),
    centroid: () => unsupported('centroid'),

    isValid,
    volume,
    describe,

    // The viewer pipeline needs mesh tessellation; cadorange's exportShape
    // (STL bytes) is the planned bridge once implemented.
    tessellate: () => unsupported('tessellate (viewer mesh)'),
    faceNormals: () => unsupported('faceNormals'),
    exportFile: (shape, format) => {
      if (typeof cad.exportShape === 'function') return cad.exportShape(shape, format)
      unsupported('exportFile', 'M0')
      return null
    },
    exportStepDocument: () => unsupported('structured assembly STEP export'),
    profileWire: () => unsupported('profileWire (sketch rendering)'),
    sketchWirePoints: () => unsupported('sketchWirePoints (sketch rendering)'),
    sketchFaceMesh: () => unsupported('sketchFaceMesh (sketch rendering)'),
  }
}

module.exports = { createCadorangeAdapter }
