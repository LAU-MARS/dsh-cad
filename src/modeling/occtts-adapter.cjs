/**
 * occt.ts modeling adapter — the PRIMARY kernel backend (plain CJS, runs in
 * the modeling worker). Mirrors the occt-adapter.cjs interface so the worker
 * is kernel-agnostic; opencascade.js stays installed only as the fallback
 * backend for environments where occt.ts cannot load.
 *
 * Shape representation: opaque occt.ts WasmShape handles. Geometry lives in
 * the occt.ts wasm heap; STEP/BRep exchange and true B-splines
 * (makeBsplineThrough) are native here, and every op the worker needs is
 * bound — including mirror, composed as scale(-1) point reflection followed
 * by a π rotation about the mirror normal (verified against bounds).
 *
 * Profiles are built in the world XY plane (where occt.ts circle parameter
 * 0 = +X, CCW toward +Y — matching the profileWire (u,v) convention) and then
 * RIGIDLY MOVED into the caller's frame (origin + basis u/v). The frame move
 * is a two-rotation decomposition: first align Z onto n = u×v (about Z×n),
 * then roll about n until X lands on u — so local profile coordinates map
 * exactly onto the requested plane for extrude/sweep/revolve alike.
 */
'use strict'

const vec3 = {
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  norm: (a) => {
    const len = Math.hypot(a[0], a[1], a[2]) || 1
    return [a[0] / len, a[1] / len, a[2] / len]
  },
}

function createOcctTsAdapter(mod) {
  const wrapError = (what, e) => new Error(`${what}: ${mod.hasError() ? mod.lastError() : e instanceof Error ? e.message : String(e)}`)

  /** std::vector<double>-like return (bounds/centroid) → plain JS array. */
  const vecOf = (v) => Array.from({ length: v.size() }, (_, i) => v.get(i))

  /** Heap helpers for the ptr/count style bindings. */
  const mallocF64 = (values) => {
    const ptr = mod._malloc(values.length * 8)
    const view = new Float64Array(mod.HEAPU8.buffer, ptr, values.length)
    for (let i = 0; i < values.length; i++) view[i] = values[i]
    return { ptr, free: () => mod._free(ptr) }
  }

  // ── primitives ─────────────────────────────────────────────────────────────
  function makePrim(kind, params) {
    const p = params ?? {}
    const at = p.at ?? [0, 0, 0]
    const axis = p.axis ?? [0, 0, 1]
    switch (kind) {
      case 'box': {
        // makeBox builds from the origin; translate for `at`.
        const s = mod.makeBox(p.dx ?? 10, p.dy ?? 10, p.dz ?? 10)
        if (at.some((v) => v !== 0)) return mod.translate(s, at[0], at[1], at[2])
        return s
      }
      case 'cylinder':
        return mod.makeCylinder(p.radius ?? 5, p.height ?? 10, axis[0], axis[1], axis[2], at[0], at[1], at[2])
      case 'sphere':
        return mod.makeSphere(p.radius ?? 5, at[0], at[1], at[2])
      case 'cone':
        return mod.makeCone(p.radius1 ?? 5, p.radius2 ?? 0, p.height ?? 10, axis[0], axis[1], axis[2], at[0], at[1], at[2])
      case 'torus':
        return mod.makeTorus(p.majorRadius ?? 10, p.minorRadius ?? 2, axis[0], axis[1], axis[2], at[0], at[1], at[2])
      default:
        throw new Error(`unknown primitive kind: ${kind}`)
    }
  }

  // ── frame move (XY-built profile → caller's frame) ─────────────────────────
  /**
   * Rigidly move a shape built in world XY so that local X→u, Y→v,
   * Z→u×v, origin→o3. Two rotations about the ORIGIN, then one translation.
   */
  function moveToFrame(shape, o3, u3, v3) {
    const n = vec3.norm(vec3.cross(u3, v3))
    const un = vec3.norm(u3)
    let moved = shape
    // Step 1: rotate Z onto n (about axis = Z×n, angle = acos(Z·n)).
    const zAxis = [0, 0, 1]
    if (Math.abs(n[2] - 1) > 1e-9) {
      if (Math.abs(n[2] + 1) < 1e-9) {
        // n = −Z: rotate π about X.
        moved = mod.rotate(moved, 1, 0, 0, Math.PI)
      } else {
        const axis = vec3.norm(vec3.cross(zAxis, n))
        const angle = Math.acos(Math.min(1, Math.max(-1, n[2])))
        moved = mod.rotate(moved, axis[0], axis[1], axis[2], angle)
      }
    }
    // Step 2: roll about n until X lands on u (u ⊥ n). After step 1 X sits at
    // x' = R1·X = cosθ·X + sinθ·(a×X) + (a·X)(1−cosθ)·a  (a = norm(Z×n), θ = ∠(Z,n));
    // the roll angle is signed by (x'×u)·n.
    const cosT = n[2]
    const sinT = Math.sin(Math.acos(Math.min(1, Math.max(-1, n[2]))))
    let xp
    if (Math.abs(n[2] - 1) < 1e-9 || Math.abs(n[2] + 1) < 1e-9) {
      // θ = 0 or π about X: X stays X (π about X keeps X fixed).
      xp = [1, 0, 0]
    } else {
      const a = vec3.norm(vec3.cross(zAxis, n))
      const axX = vec3.cross(a, [1, 0, 0])
      const aDotX = a[0]
      xp = [
        cosT * 1 + sinT * axX[0] + aDotX * (1 - cosT) * a[0],
        cosT * 0 + sinT * axX[1] + aDotX * (1 - cosT) * a[1],
        cosT * 0 + sinT * axX[2] + aDotX * (1 - cosT) * a[2],
      ]
    }
    const cosPhi = Math.min(1, Math.max(-1, vec3.dot(xp, un)))
    let phi = Math.acos(cosPhi)
    if (vec3.dot(vec3.cross(xp, un), n) < 0) phi = -phi
    if (Math.abs(phi) > 1e-9) {
      moved = mod.rotate(moved, n[0], n[1], n[2], phi)
    }
    // Step 3: translate to o3.
    if (o3[0] !== 0 || o3[1] !== 0 || o3[2] !== 0) {
      moved = mod.translate(moved, o3[0], o3[1], o3[2])
    }
    return moved
  }

  // ── profile wires (line / arc / bspline / circle chains) ───────────────────
  /**
   * Build a CLOSED wire for a profile in the caller's (o3, u3, v3) frame.
   * Local 2D coordinates are interpreted in the XY plane, then the wire is
   * moved to the frame — arc angles (atan2 in (u,v)) match the XY circle
   * parameterization by construction.
   */
  function profileWire(profile, o3, u3, v3) {
    const parts = new mod.VectorShape()
    try {
      let built
      if (Array.isArray(profile)) {
        if (profile.length < 6 || profile.length % 2 !== 0) throw new Error('a flat profile needs ≥3 [x,y] pairs')
        const xyz = []
        for (let i = 0; i + 1 < profile.length; i += 2) xyz.push(profile[i], profile[i + 1], 0)
        built = polygonWireXY(xyz)
      } else if (profile !== null && typeof profile === 'object') {
        if (profile.circle !== undefined) {
          const c = profile.circle
          if (!Array.isArray(c.center) || typeof c.radius !== 'number') throw new Error("circle profile needs 'center: [x,y]' and 'radius'")
          built = mod.makeCircle(c.radius, 0, 0, 1, c.center[0], c.center[1], 0)
        } else {
          built = segmentWireXY(profile)
        }
      } else {
        throw new Error('a profile must be a flat points array or a {start, segments}/{circle} object')
      }
      if (built === undefined || built.isNull()) throw wrapError('profile wire construction', new Error('null wire'))
      const moved = moveToFrame(built, o3, vec3.norm(u3), vec3.norm(v3))
      if (moved.isNull()) throw wrapError('profile frame move', new Error('null shape'))
      return moved
    } finally {
      parts.delete()
    }
  }

  /** Closed polygon wire from flat world-XY triplets. */
  function polygonWireXY(xyz) {
    const { ptr, free } = mallocF64(xyz)
    try {
      return mod.makePolygon(ptr, xyz.length / 3, true)
    } finally {
      free()
    }
  }

  /** Segment-chain wire (line/arc/bspline) built in world XY. */
  function segmentWireXY(profile) {
    const segs = Array.isArray(profile.segments) ? profile.segments : []
    if (segs.length === 0) throw new Error('a segment profile needs at least one segment')
    if (!Array.isArray(profile.start) || profile.start.length !== 2) throw new Error('profile.start must be [x,y]')
    const parts = new mod.VectorShape()
    try {
      let cur = [profile.start[0], profile.start[1]]
      const push = (shape) => {
        if (shape.isNull()) throw wrapError('segment edge', new Error('null edge'))
        parts.push_back(shape)
      }
      for (const seg of segs) {
        if (seg === null || typeof seg !== 'object') throw new Error('each profile segment must be an object')
        if (seg.type === 'line') {
          if (!Array.isArray(seg.to) || seg.to.length !== 2) throw new Error("line segment needs 'to: [x,y]'")
          push(mod.makeLine(cur[0], cur[1], 0, seg.to[0], seg.to[1], 0))
          cur = seg.to
        } else if (seg.type === 'arc') {
          if (!Array.isArray(seg.to) || seg.to.length !== 2 || !Array.isArray(seg.center) || seg.center.length !== 2) {
            throw new Error("arc segment needs 'to: [x,y]' and 'center: [cx,cy]'")
          }
          const c = seg.center
          const r0 = Math.hypot(cur[0] - c[0], cur[1] - c[1])
          const r1 = Math.hypot(seg.to[0] - c[0], seg.to[1] - c[1])
          if (Math.abs(r0 - r1) > 1e-4 * Math.max(r0, r1) + 1e-6) {
            throw new Error(`arc endpoints are not equidistant from the center (r=${r0.toFixed(4)} vs ${r1.toFixed(4)})`)
          }
          const a0 = Math.atan2(cur[1] - c[1], cur[0] - c[0])
          let a1 = Math.atan2(seg.to[1] - c[1], seg.to[0] - c[0])
          // occt.ts makeArc wants u1 < u2 on the circle parameterization
          // (0 = +X, CCW); resolve ccw/cw into an increasing span.
          const span = seg.ccw !== false ? (a1 > a0 ? a1 - a0 : a1 + 2 * Math.PI - a0) : (a1 < a0 ? a0 - a1 : a0 + 2 * Math.PI - a1)
          const start = seg.ccw !== false ? a0 : a1
          push(mod.makeArc(r0, 0, 0, 1, c[0], c[1], 0, start, start + span))
          cur = seg.to
        } else if (seg.type === 'bspline') {
          const through = Array.isArray(seg.through) ? seg.through : []
          if (through.length < 2) throw new Error("bspline segment needs 'through: [[x,y],…]' (≥2 points)")
          // True interpolation through the points (kernel-side B-spline).
          const pts = [cur[0], cur[1], 0]
          for (const p of through) pts.push(p[0], p[1], 0)
          const { ptr, free } = mallocF64(pts)
          try {
            push(mod.makeBsplineThrough(ptr, pts.length / 3, false, 1e-6))
          } finally {
            free()
          }
          cur = through[through.length - 1]
        } else {
          throw new Error(`unknown profile segment type: ${String(seg.type)}`)
        }
      }
      if (Math.hypot(cur[0] - profile.start[0], cur[1] - profile.start[1]) > 1e-9) {
        push(mod.makeLine(cur[0], cur[1], 0, profile.start[0], profile.start[1], 0))
      }
      const wire = mod.makeWire(parts)
      if (wire.isNull()) throw wrapError('makeWire', new Error('null wire'))
      return wire
    } finally {
      parts.delete()
    }
  }

  // ── solid ops ───────────────────────────────────────────────────────────────

  /** Extrude any 2D profile form from z = base along +Z. */
  function extrudeProfile2D(profile, height, base = 0) {
    if (!(height > 0)) throw new Error('the extrusion height must be positive')
    const wire = profileWire(profile, [0, 0, base], [1, 0, 0], [0, 1, 0])
    const solid = mod.extrude(wire, 0, 0, height, true)
    if (solid.isNull()) throw wrapError('extrude', new Error('null shape'))
    return solid
  }

  /** Loft through closed 3D section wires. */
  function makeLoft(sections, options = {}) {
    if (!Array.isArray(sections) || sections.length < 2) throw new Error('a loft needs at least 2 sections')
    const v = new mod.VectorShape()
    try {
      for (const section of sections) {
        if (!Array.isArray(section) || section.length < 9 || section.length % 3 !== 0) {
          throw new Error('each section must be a flat [x,y,z,…] loop (≥9 numbers)')
        }
        v.push_back(polygonWireXY(section))
      }
      const solid = mod.loft(v, options.ruled ?? false, options.solid ?? true)
      if (solid.isNull()) throw wrapError('loft', new Error('null shape'))
      if (Math.abs(volume(solid)) < 1e-9) {
        throw new Error('loft produced an empty solid (sections must be closed, planar, non-degenerate loops)')
      }
      return solid
    } finally {
      v.delete()
    }
  }

  /** Sweep a 2D profile along a 3D polyline path (auto-oriented on the start tangent). */
  function makeSweep(profile, pathPoints) {
    if (!Array.isArray(pathPoints) || pathPoints.length < 6 || pathPoints.length % 3 !== 0) {
      throw new Error('the path needs at least 2 [x,y,z] triplets (≥6 numbers)')
    }
    const tx = pathPoints[3] - pathPoints[0]
    const ty = pathPoints[4] - pathPoints[1]
    const tz = pathPoints[5] - pathPoints[2]
    const tLen = Math.hypot(tx, ty, tz)
    if (tLen < 1e-12) throw new Error('the path starts with a zero-length segment')
    const n = [tx / tLen, ty / tLen, tz / tLen]
    const axis = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]
    const d = vec3.dot(axis, n)
    const vx = vec3.norm([axis[0] - n[0] * d, axis[1] - n[1] * d, axis[2] - n[2] * d])
    const vy = vec3.cross(n, vx)
    const wire = profileWire(profile, [pathPoints[0], pathPoints[1], pathPoints[2]], vx, vy)
    const spinePts = []
    for (let i = 0; i + 2 < pathPoints.length; i += 3) spinePts.push(pathPoints[i], pathPoints[i + 1], pathPoints[i + 2])
    const spine = (() => {
      const { ptr, free } = mallocF64(spinePts)
      try {
        return mod.makePolygon(ptr, spinePts.length / 3, false)
      } finally {
        free()
      }
    })()
    const solid = mod.sweep(wire, spine, true)
    if (solid.isNull()) throw wrapError('sweep', new Error('null shape'))
    return solid
  }

  /** Revolve a 2D profile (local x = radial, y = along the axis) about the axis. */
  function makeRevolve(profile, options = {}) {
    const axis = options.axis ?? [0, 0, 1]
    const at = options.at ?? [0, 0, 0]
    const angle = options.angle ?? Math.PI * 2
    const alen = Math.hypot(axis[0], axis[1], axis[2])
    if (alen < 1e-12) throw new Error('the revolve axis must be a non-zero direction')
    const n = [axis[0] / alen, axis[1] / alen, axis[2] / alen]
    const helper = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]
    const d = vec3.dot(helper, n)
    const radial = vec3.norm([helper[0] - n[0] * d, helper[1] - n[1] * d, helper[2] - n[2] * d])
    const wire = profileWire(profile, at, radial, n)
    const solid = mod.revolve(wire, n[0], n[1], n[2], at[0], at[1], at[2], angle, true)
    if (solid.isNull()) throw wrapError('revolve', new Error('null shape'))
    return solid
  }

  function boolean(op, target, tools) {
    let result = target
    for (const tool of tools) {
      const fn = op === 'fuse' ? mod.fuse : op === 'cut' ? mod.cut : mod.common
      const next = fn(result, tool)
      if (next.isNull()) throw wrapError(`boolean ${op}`, new Error('null shape'))
      result = next
    }
    return result
  }

  function filletAll(shape, radius) {
    const next = mod.fillet(shape, radius, 0, 0)
    if (next.isNull()) throw wrapError('fillet', new Error('null shape (radius may exceed the adjacent faces)'))
    return next
  }

  function chamferAll(shape, distance) {
    const next = mod.chamfer(shape, distance, 0, 0)
    if (next.isNull()) throw wrapError('chamfer', new Error('null shape (distance may exceed the adjacent faces)'))
    return next
  }

  /**
   * Shell: hollow to a wall thickness; `openFaces` are 1-based indices as
   * listed by describe() (empty = sealed). Face matching by normal lives in
   * the worker (it has describe output) — this takes indices directly.
   */
  function shell(shape, thickness, openFaces) {
    const faces = Array.isArray(openFaces) && openFaces.length > 0 ? openFaces : []
    let ptr = 0
    try {
      if (faces.length > 0) {
        ptr = mod._malloc(faces.length * 4)
        for (let i = 0; i < faces.length; i++) mod.HEAPU32[ptr / 4 + i] = faces[i]
      }
      const next = mod.shell(shape, Math.abs(thickness), ptr, faces.length)
      if (next.isNull()) throw wrapError('shell', new Error('null shape'))
      return next
    } finally {
      if (ptr !== 0) mod._free(ptr)
    }
  }

  /** Draft: tilt walls by angle degrees toward `direction` (auto wall select). */
  function draft(shape, angleDegrees, direction) {
    const d = direction ?? [0, 0, 1]
    const next = mod.draft(shape, (angleDegrees * Math.PI) / 180, d[0], d[1], d[2], 0, 0, 1, 0, 0, true)
    if (next.isNull()) throw wrapError('draft', new Error('null shape'))
    return next
  }

  function transform(shape, { translate, rotate, mirror }) {
    let result = shape
    if (translate !== undefined) result = mod.translate(result, translate[0], translate[1], translate[2])
    if (rotate !== undefined) {
      const [rx, ry, rz] = rotate
      if (rx) result = mod.rotate(result, 1, 0, 0, (rx * Math.PI) / 180)
      if (ry) result = mod.rotate(result, 0, 1, 0, (ry * Math.PI) / 180)
      if (rz) result = mod.rotate(result, 0, 0, 1, (rz * Math.PI) / 180)
    }
    if (mirror !== undefined) {
      const n = vec3.norm(mirror)
      // Plane mirror = point reflection (scale −1) + π rotation about the
      // mirror normal — the only improper transform composable from the
      // bound primitives (verified against bounds).
      result = mod.scale(result, -1)
      result = mod.rotate(result, n[0], n[1], n[2], Math.PI)
    }
    if (result.isNull()) throw wrapError('transform', new Error('null shape'))
    return result
  }

  function isValid(shape) {
    try { return shape.isValid() === true } catch { return null }
  }

  function volume(shape) {
    return shape.volume()
  }

  function centroid(shape) {
    return vecOf(shape.centroid())
  }

  // ── tessellation ───────────────────────────────────────────────────────────
  function tessellate(shape, linearDeflection = 0.3) {
    const data = mod.tessellate(shape, linearDeflection, 20, false)
    try {
      const positions = new Float32Array(mod.HEAPU8.buffer, data.positionsPtr(), data.positionCount() * 3).slice()
      const indices = new Uint32Array(mod.HEAPU8.buffer, data.indicesPtr(), data.indexCount()).slice()
      return { positions, indices }
    } finally {
      data.delete()
    }
  }

  /** Flat per-triangle normals (the mechanical-CAD look the viewer expects). */
  function faceNormals(positions, indices) {
    const normals = new Float32Array(positions.length)
    for (let i = 0; i + 2 < indices.length; i += 3) {
      const a = indices[i] * 3
      const b = indices[i + 1] * 3
      const c = indices[i + 2] * 3
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

  // ── export ─────────────────────────────────────────────────────────────────
  function exportFile(shape, format) {
    if (format === 'step') {
      return Buffer.from(mod.writeStep(shape, 'mm'), 'utf8')
    }
    if (format === 'stl') {
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
        offset += 2
      }
      return buffer
    }
    throw new Error(`unsupported export format: ${format}`)
  }

  // ── describe (agent eyes / face matching) ──────────────────────────────────
  function describe(shape) {
    return JSON.parse(mod.describe(shape))
  }

  return {
    kernel: 'occt.ts',
    pnt: null, dir: null, ENUM: null, // legacy adapter surface (unused on this backend)
    makePrim, extrudeProfile2D, makeLoft, makeSweep, makeRevolve,
    filletAll, chamferAll, shell, draft, boolean, transform,
    isValid, volume, centroid,
    tessellate, faceNormals, exportFile, describe,
    profileWire,
  }
}

module.exports = { createOcctTsAdapter }
