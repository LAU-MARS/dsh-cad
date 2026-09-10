/**
 * OCCT modeling adapter (plain CJS JavaScript — runs inside the modeling
 * worker). Encapsulates the opencascade.js binding surface verified in M0:
 * overloaded constructors use the `_N` suffix convention and this file is the
 * single place that knows those spellings.
 *
 * Document model: bodyId → TopoDS_Shape, in-memory in the worker. The main
 * thread persists an operation log and replays it for restart recovery.
 */
'use strict'

function createAdapter(occt) {
  // ── verified constructor spellings (see test/m0-kernel-check.cjs) ──────────
  const pnt = (x, y, z) => new occt.gp_Pnt_3(x, y, z)
  const dir = (x, y, z) => new occt.gp_Dir_4(x, y, z)
  const vec = (x, y, z) => new occt.gp_Vec_4(x, y, z)
  const identityTrsf = () => new occt.gp_Trsf_1()
  const ENUM = occt.TopAbs_ShapeEnum

  const shapeOf = (make) => make.Shape()
  const volume = (shape) => {
    const props = new occt.GProp_GProps_2(pnt(0, 0, 0))
    occt.BRepGProp.VolumeProperties_1(shape, props, false, true, false)
    return props.Mass()
  }

  // ── primitives ─────────────────────────────────────────────────────────────
  function makePrim(kind, params) {
    const at = params.at ?? [0, 0, 0]
    const p = params
    switch (kind) {
      case 'box': {
        const dx = p.dx ?? 10, dy = p.dy ?? 10, dz = p.dz ?? 10
        return shapeOf(new occt.BRepPrimAPI_MakeBox_3(pnt(at[0], at[1], at[2]), pnt(at[0] + dx, at[1] + dy, at[2] + dz)))
      }
      case 'cylinder': {
        const axis = p.axis ?? [0, 0, 1]
        const ax2 = new occt.gp_Ax2_3(pnt(at[0], at[1], at[2]), dir(axis[0], axis[1], axis[2]))
        return shapeOf(new occt.BRepPrimAPI_MakeCylinder_3(ax2, p.radius ?? 5, p.height ?? 10))
      }
      case 'sphere': {
        // Verified variants: only the pure-double ctors work in this build;
        // placement (at/axis) is applied by an exact transform below.
        return place(new occt.BRepPrimAPI_MakeSphere_1(p.radius ?? 5).Shape(), at, p.axis)
      }
      case 'cone': {
        return place(new occt.BRepPrimAPI_MakeCone_1(p.radius1 ?? 5, p.radius2 ?? 0, p.height ?? 10).Shape(), at, p.axis)
      }
      case 'torus': {
        return place(new occt.BRepPrimAPI_MakeTorus_1(p.majorRadius ?? 10, p.minorRadius ?? 2).Shape(), at, p.axis)
      }
      default:
        throw new Error(`unknown primitive kind: ${kind}`)
    }
  }

  /**
   * Place an origin-built primitive: rotate +Z onto `axis` (exact axis-angle
   * rotation about the origin), then translate to `at`. Both default to
   * identity when omitted/default.
   */
  function place(shape, at, axis) {
    const ax = axis ?? [0, 0, 1]
    const len = Math.hypot(ax[0], ax[1], ax[2])
    const u = len === 0 ? [0, 0, 1] : [ax[0] / len, ax[1] / len, ax[2] / len]
    // Identity only when the axis IS +Z (e.g. [0,0,-1] must rotate by π).
    const isDefaultAxis = Math.abs(u[0]) + Math.abs(u[1]) < 1e-12 && u[2] > 1 - 1e-9
    let result = shape
    if (!isDefaultAxis) {
      const trsf = identityTrsf()
      trsf.SetRotation_1(new occt.gp_Ax1_2(pnt(0, 0, 0), dir(u[0], u[1], u[2])), Math.acos(Math.min(1, Math.max(-1, u[2]))))
      result = new occt.BRepBuilderAPI_Transform_2(result, trsf, true).Shape()
    }
    if (at !== undefined && (at[0] !== 0 || at[1] !== 0 || at[2] !== 0)) {
      const move = identityTrsf()
      move.SetTranslation_1(vec(at[0], at[1], at[2]))
      result = new occt.BRepBuilderAPI_Transform_2(result, move, true).Shape()
    }
    return result
  }

  // ── profile extrusion ─────────────────────────────────────────────────────
  /** points: flat [x0,y0, x1,y1, ...] closed loop in the XY plane at z = base. */
  function makeExtrudedProfile(points, height, base = 0) {
    if (points.length < 6 || points.length % 2 !== 0) {
      throw new Error('profile needs at least 3 points (6 flat numbers)')
    }
    // Verified path (the 1.1.1 build exposes no direct wire→face ctor):
    // polygon wire → bound an infinite planar face with Add(wire) → extrude.
    const poly = new occt.BRepBuilderAPI_MakePolygon_1()
    for (let i = 0; i + 1 < points.length; i += 2) {
      poly.Add_1(pnt(points[i], points[i + 1], base))
    }
    poly.Close()
    if (!poly.IsDone()) throw new Error('profile polygon is invalid (duplicate or collinear-only points)')
    const planeAx3 = new occt.gp_Ax3_3(pnt(0, 0, base), dir(0, 0, 1), dir(1, 0, 0))
    const faceBuilder = new occt.BRepBuilderAPI_MakeFace_3(new occt.gp_Pln_2(planeAx3))
    faceBuilder.Add(poly.Wire())
    const face = faceBuilder.Face()
    if (!faceBuilder.IsDone() || face.IsNull()) throw new Error('profile face construction failed')
    return shapeOf(new occt.BRepPrimAPI_MakePrism_1(face, vec(0, 0, height), true, false))
  }

  // ── booleans / fillet / transform ──────────────────────────────────────────
  function boolean(op, target, tools) {
    let result = target
    for (const tool of tools) {
      // BRepAlgoAPI_*_3 is the verified (shape, shape) constructor.
      const Ctor = op === 'fuse' ? occt.BRepAlgoAPI_Fuse_3 : op === 'cut' ? occt.BRepAlgoAPI_Cut_3 : occt.BRepAlgoAPI_Common_3
      const algo = new Ctor(result, tool)
      algo.Build()
      if (!algo.IsDone()) throw new Error(`boolean ${op} failed`)
      result = algo.Shape()
    }
    return result
  }

  function filletAll(shape, radius) {
    const algo = new occt.BRepFilletAPI_MakeFillet(shape, 1e-4)
    const explorer = new occt.TopExp_Explorer_2(shape, ENUM.TopAbs_EDGE, ENUM.TopAbs_SHAPE)
    let edges = 0
    while (explorer.More()) {
      algo.Add_2(radius, castEdge(explorer.Current()))
      edges++
      explorer.Next()
    }
    if (edges === 0) throw new Error('no edges to fillet')
    algo.Build()
    if (!algo.IsDone()) throw new Error('fillet failed (radius may exceed the adjacent faces)')
    return { shape: algo.Shape(), edges }
  }

  function castEdge(shape) {
    if (occt.TopoDS.Edge_s) return occt.TopoDS.Edge_s(shape)
    return occt.TopoDS.Edge_2(shape)
  }

  function castFace(shape) {
    if (occt.TopoDS.Face_s) return occt.TopoDS.Face_s(shape)
    return occt.TopoDS.Face_2(shape)
  }

  function transform(shape, { translate, rotate, mirror }) {
    const trsf = identityTrsf()
    if (translate !== undefined) trsf.SetTranslation_1(vec(translate[0], translate[1], translate[2]))
    if (rotate !== undefined) {
      const [rx, ry, rz] = rotate
      if (rx) trsf.Multiply(rotationTrsf([1, 0, 0], rx * Math.PI / 180))
      if (ry) trsf.Multiply(rotationTrsf([0, 1, 0], ry * Math.PI / 180))
      if (rz) trsf.Multiply(rotationTrsf([0, 0, 1], rz * Math.PI / 180))
    }
    if (mirror !== undefined) {
      const [mx, my, mz] = mirror
      const mirrorTrsf = identityTrsf()
      mirrorTrsf.SetMirror_1(new occt.gp_Ax2_3(pnt(0, 0, 0), dir(mx ?? 0, my ?? 0, mz ?? 1)))
      trsf.Multiply(mirrorTrsf)
    }
    const algo = new occt.BRepBuilderAPI_Transform_2(shape, trsf, true)
    return algo.Shape()
  }

  function rotationTrsf(axis, radians) {
    const t = identityTrsf()
    t.SetRotation_1(new occt.gp_Ax1_2(pnt(0, 0, 0), dir(axis[0], axis[1], axis[2])), radians)
    return t
  }

  // ── tessellation ───────────────────────────────────────────────────────────
  function tessellate(shape, linearDeflection = 0.3) {
    const mesher = new occt.BRepMesh_IncrementalMesh_2(shape, linearDeflection, false, 0.5, true)
    mesher.Perform_1()
    const positions = []
    const indices = []
    const loc = new occt.TopLoc_Location_2(identityTrsf())
    const explorer = new occt.TopExp_Explorer_2(shape, ENUM.TopAbs_FACE, ENUM.TopAbs_SHAPE)
    let vertexBase = 0
    while (explorer.More()) {
      const faceShape = explorer.Current()
      const handle = occt.BRep_Tool.Triangulation(castFace(faceShape), loc)
      const tri = handle && handle.IsNull && !handle.IsNull() ? handle.get() : handle
      if (tri) {
        // A REVERSED face renders its surface natural orientation backwards —
        // flip the triangle winding so normals point out of the material.
        const reversed = faceShape.Orientation_1 !== undefined && faceShape.Orientation_1().value === 1
        const nodeCount = tri.NbNodes()
        for (let i = 1; i <= nodeCount; i++) {
          const node = tri.Node(i)
          // Optional location transform on the triangulation.
          const transformed = loc.IsIdentity() ? node : node.Transformed(loc.Transformation())
          positions.push(transformed.X(), transformed.Y(), transformed.Z())
        }
        for (let i = 1; i <= tri.NbTriangles(); i++) {
          const t = tri.Triangle(i)
          // Poly_Triangle.Get() uses out-params embind cannot express; Value(1..3) returns the indices.
          const n1 = vertexBase + t.Value(1) - 1
          const n2 = vertexBase + t.Value(2) - 1
          const n3 = vertexBase + t.Value(3) - 1
          if (reversed) indices.push(n1, n3, n2)
          else indices.push(n1, n2, n3)
        }
        vertexBase += nodeCount
      }
      explorer.Next()
    }
    return { positions: Float32Array.from(positions), indices: Uint32Array.from(indices) }
  }

  /** Flat per-triangle normals (mechanical-CAD look, no smooth-vertex table). */
  function faceNormals(positions, indices) {
    const normals = new Float32Array(positions.length)
    for (let i = 0; i + 2 < indices.length; i += 3) {
      const a = indices[i] * 3, b = indices[i + 1] * 3, c = indices[i + 2] * 3
      const ux = positions[c] - positions[a], uy = positions[c + 1] - positions[a + 1], uz = positions[c + 2] - positions[a + 2]
      const vx = positions[b] - positions[a], vy = positions[b + 1] - positions[a + 1], vz = positions[b + 2] - positions[a + 2]
      let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx
      const len = Math.hypot(nx, ny, nz) || 1
      nx /= len; ny /= len; nz /= len
      for (const corner of [a, b, c]) {
        normals[corner] = nx; normals[corner + 1] = ny; normals[corner + 2] = nz
      }
    }
    return normals
  }

  // ── export: STEP via MEMFS, STL as direct binary bytes ───────────────────
  function exportFile(shape, format) {
    if (format === 'step') {
      const writer = new occt.STEPControl_Writer_1()
      writer.Transfer(shape, 0, true)
      writer.Write('model.step')
      return Buffer.from(occt.FS.readFile('model.step'))
    }
    if (format === 'stl') {
      // StlAPI_Writer intermittently fails inside the WASM filesystem; the
      // tessellated mesh is exact, so emit binary STL bytes directly.
      const { positions, indices } = tessellate(shape, 0.1)
      const normals = faceNormals(positions, indices)
      const triangleCount = indices.length / 3
      const buffer = Buffer.alloc(84 + triangleCount * 50)
      buffer.write('dsh-cad binary STL', 0, 22, 'latin1')
      buffer.writeUInt32LE(triangleCount, 80)
      let offset = 84
      for (let triangle = 0; triangle < triangleCount; triangle++) {
        const a = indices[triangle * 3] * 3
        const b = indices[triangle * 3 + 1] * 3
        const c = indices[triangle * 3 + 2] * 3
        for (let component = 0; component < 3; component++) {
          buffer.writeFloatLE(normals[a + component], offset)
          offset += 4
        }
        for (const vertex of [a, b, c]) {
          buffer.writeFloatLE(positions[vertex], offset)
          buffer.writeFloatLE(positions[vertex + 1], offset + 4)
          buffer.writeFloatLE(positions[vertex + 2], offset + 8)
          offset += 12
        }
        offset += 2 // attribute byte count
      }
      return buffer
    }
    throw new Error(`unsupported export format: ${format}`)
  }

  // ── loft / sweep ───────────────────────────────────────────────────────────
  /**
   * Closed polygon wire from flat [x,y,z, …] triplets. Loft sections carry
   * explicit 3D coordinates (each section sits in its own plane), so unlike
   * makeExtrudedProfile there is no implicit base plane here.
   */
  function closedWire(points) {
    if (points.length < 9 || points.length % 3 !== 0) {
      throw new Error('a section needs at least 3 [x,y,z] triplets (≥9 numbers)')
    }
    const poly = new occt.BRepBuilderAPI_MakePolygon_1()
    for (let i = 0; i + 2 < points.length; i += 3) poly.Add_1(pnt(points[i], points[i + 1], points[i + 2]))
    poly.Close()
    if (!poly.IsDone()) throw new Error('section polygon is invalid (duplicate or collinear-only points)')
    return poly.Wire()
  }

  /** A planar FACE in the given frame's plane (MakePipe needs a face, not a wire). */
  function faceInFrame(ax3, points2d) {
    const poly = new occt.BRepBuilderAPI_MakePolygon_1()
    const xd = ax3.XDirection()
    const yd = ax3.YDirection()
    const o = ax3.Location()
    for (let i = 0; i + 1 < points2d.length; i += 2) {
      const u = points2d[i]
      const v = points2d[i + 1]
      poly.Add_1(pnt(
        o.X() + xd.X() * u + yd.X() * v,
        o.Y() + xd.Y() * u + yd.Y() * v,
        o.Z() + xd.Z() * u + yd.Z() * v,
      ))
    }
    poly.Close()
    if (!poly.IsDone()) throw new Error('profile polygon is invalid')
    const builder = new occt.BRepBuilderAPI_MakeFace_3(new occt.gp_Pln_2(ax3))
    builder.Add(poly.Wire())
    const face = builder.Face()
    if (!builder.IsDone() || face.IsNull()) throw new Error('profile face construction failed')
    return face
  }

  /**
   * Loft: skin a solid through successive closed sections (OCCT ThruSections).
   * `sections` is a list of flat [x,y,z, …] loops, in order along the loft.
   * `solid` caps the ends, `ruled` keeps the sides straight (no smoothing).
   */
  function makeLoft(sections, options = {}) {
    if (!Array.isArray(sections) || sections.length < 2) throw new Error('a loft needs at least 2 sections')
    const solid = options.solid ?? true
    const ruled = options.ruled ?? false
    // Verified spelling: this build binds only the 3-argument constructor.
    const thru = new occt.BRepOffsetAPI_ThruSections(solid, ruled, 1e-6)
    for (const section of sections) thru.AddWire(closedWire(section))
    thru.Build()
    if (!thru.IsDone()) throw new Error('loft failed (check that the sections are closed and non-degenerate)')
    return thru.Shape()
  }

  /**
   * Sweep: pipe a 2D profile along a 3D path (OCCT MakePipe). The profile is
   * placed in the plane PERPENDICULAR TO THE PATH'S START TANGENT, so callers
   * give a plain 2D outline plus a 3D path in any orientation.
   *
   * Note: MakePipeShell (the transition-aware variant) is unusable in this
   * opencascade.js build, so a sharp direction change in the path with a
   * section large relative to the corner yields a self-intersecting solid —
   * `isValid()` reports that, and the tool surfaces it.
   */
  function makeSweep(profile, pathPoints) {
    if (!Array.isArray(profile) || profile.length < 6 || profile.length % 2 !== 0) {
      throw new Error('the profile needs at least 3 [x,y] pairs (≥6 numbers)')
    }
    if (!Array.isArray(pathPoints) || pathPoints.length < 6 || pathPoints.length % 3 !== 0) {
      throw new Error('the path needs at least 2 [x,y,z] triplets (≥6 numbers)')
    }
    const spine = new occt.BRepBuilderAPI_MakePolygon_1()
    for (let i = 0; i + 2 < pathPoints.length; i += 3) {
      spine.Add_1(pnt(pathPoints[i], pathPoints[i + 1], pathPoints[i + 2]))
    }
    if (!spine.IsDone()) throw new Error('path polyline is invalid')
    // Frame at the path start: +Z (the gp_Ax3 normal) along the initial
    // tangent; the in-plane X axis is world X projected perpendicular to it
    // (world Y when that degenerates), so a profile maps onto predictable
    // world axes — for a +Z sweep the 2D outline lands exactly on world XY.
    const tx = pathPoints[3] - pathPoints[0]
    const ty = pathPoints[4] - pathPoints[1]
    const tz = pathPoints[5] - pathPoints[2]
    const tLen = Math.hypot(tx, ty, tz)
    if (tLen < 1e-12) throw new Error('the path starts with a zero-length segment')
    const n = [tx / tLen, ty / tLen, tz / tLen]
    const axis = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]
    const d = axis[0] * n[0] + axis[1] * n[1] + axis[2] * n[2]
    let vx = [axis[0] - n[0] * d, axis[1] - n[1] * d, axis[2] - n[2] * d]
    const vxLen = Math.hypot(vx[0], vx[1], vx[2])
    if (vxLen < 1e-12) throw new Error('could not build a profile frame for the path tangent')
    vx = [vx[0] / vxLen, vx[1] / vxLen, vx[2] / vxLen]
    const ax3 = new occt.gp_Ax3_3(
      pnt(pathPoints[0], pathPoints[1], pathPoints[2]),
      dir(n[0], n[1], n[2]),
      dir(vx[0], vx[1], vx[2]),
    )
    const profileFace = faceInFrame(ax3, profile)
    const pipe = new occt.BRepOffsetAPI_MakePipe_1(spine.Wire(), profileFace)
    pipe.Build()
    if (!pipe.IsDone()) throw new Error('sweep failed (check the path and profile)')
    return pipe.Shape()
  }

  /** BRepCheck_Analyzer verdict, or null when the check itself is unavailable. */
  function isValid(shape) {
    try {
      const analyzer = new occt.BRepCheck_Analyzer(shape, true)
      return analyzer.IsValid_1(shape) === true
    } catch {
      return null
    }
  }

  return {
    pnt, dir, ENUM,
    makePrim, makeExtrudedProfile, makeLoft, makeSweep, isValid,
    boolean, filletAll, transform,
    tessellate, faceNormals, exportFile, volume,
  }
}

module.exports = { createAdapter }
