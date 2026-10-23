/**
 * cadorange-backed kernel adapter: maps dsh-cad's adapter surface onto
 * cadorange's public API (build123d algebra mode), with the supported
 * `cadorange/occt` escape hatch (ADR-0001) covering what the public API does
 * not expose yet:
 *
 *   - viewer tessellation        `getOcc().tessellate(shape.wrapped)`
 *   - drawing HLR                `getOcc().hiddenLines(shape.wrapped, …)`
 *   - wire/face construction     `makeLine/makeArc/makeBsplineThrough/…`
 *     for dsh-cad's raw inputs (3D point loops, arbitrary-plane profiles,
 *     periodic smooth sections, 3D sweep spines) — built as occt.ts shapes,
 *     then adopted into cadorange via `fromRaw` (a session-owned copy).
 *
 * Everything expressible in the public API goes through it: primitives,
 * booleans (cleaned by default), fillet/chamfer, extrude/revolve/loft/sweep,
 * shell/draft, transforms (native mirror — no scale(-1) composition),
 * describe/volume/centroid and STEP/STL/STEP-assembly export.
 *
 * Opt-in backend: `DSH_CAD_KERNEL=cadorange`. The default chain stays
 * direct-occt.ts tier as the fallback (the opencascade.js tier was removed in v0.15.1).
 */
'use strict'

const { chainSegments, simplify } = require('./occt-bridge.cjs')

const vec3 = {
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  norm: (a) => {
    const len = Math.hypot(a[0], a[1], a[2]) || 1
    return [a[0] / len, a[1] / len, a[2] / len]
  },
}

const RAD2DEG = 180 / Math.PI

/** Row-major 3×3 rotation from XYZ Euler degrees — the assembly export
 *  convention p' = T + Rx·(Ry·(Rz·p)). */
function eulerMatrix(rotate) {
  const [rx, ry, rz] = rotate
  const cx = Math.cos(rx / RAD2DEG), sx = Math.sin(rx / RAD2DEG)
  const cy = Math.cos(ry / RAD2DEG), sy = Math.sin(ry / RAD2DEG)
  const cz = Math.cos(rz / RAD2DEG), sz = Math.sin(rz / RAD2DEG)
  return [
    cy * cz, -cy * sz, sy,
    cx * sz + sx * sy * cz, cx * cz - sx * sy * sz, -sx * cy,
    sx * sz - cx * sy * cz, sx * cz + cx * sy * sz, cx * cy,
  ]
}

/** Stable rounding key for one flattened [x,y,…] polyline. */
function polylineKey(points) {
  const keys = []
  for (let i = 0; i + 1 < points.length; i += 2) {
    keys.push(`${Math.round(points[i] * 100)}|${Math.round(points[i + 1] * 100)}`)
  }
  keys.sort()
  return keys.join(';')
}

function createCadorangeAdapter(mods) {
  const C = mods.core
  const CO = mods.occt
  const occ = CO.getOcc()

  const wrapError = (what, e) => new Error(`${what}: ${e instanceof Error ? e.message : String(e)}`)

  // ── escape-hatch plumbing ───────────────────────────────────────────────────

  /** Adopt an occt.ts shape into cadorange (session-owned copy), freeing the
   *  original — the JS-owned raw wrapper from toRaw is ours to delete. */
  function adopt(occShape) {
    const raw = occ.toRaw(occShape)
    try {
      const shape = CO.fromRaw(raw)
      occShape.dispose()
      return shape
    } finally {
      if (typeof raw.delete === 'function') raw.delete()
    }
  }

  const asOcc = (shape) => CO.asOccShape(shape.wrapped)

  // ── primitives ─────────────────────────────────────────────────────────────

  const alongZ = (axis) => {
    const n = vec3.norm(Array.isArray(axis) ? axis : [0, 0, 1])
    return Math.abs(n[0]) < 1e-9 && Math.abs(n[1]) < 1e-9 && n[2] > 1 - 1e-9
  }

  function makePrim(kind, params) {
    const p = params ?? {}
    const at = Array.isArray(p.at) ? p.at : [0, 0, 0]
    const axis = vec3.norm(Array.isArray(p.axis) ? p.axis : [0, 0, 1])
    switch (kind) {
      case 'box':
        return C.Box(p.dx ?? 10, p.dy ?? 10, p.dz ?? 10, { origin: at })
      case 'cylinder':
        // The public Cylinder takes loc {origin, zDir} — arbitrary axes included.
        return C.Cylinder({ radius: p.radius ?? 5, height: p.height ?? 10, loc: { origin: at, zDir: axis } })
      case 'sphere':
        return C.Sphere({ radius: p.radius ?? 5, loc: { origin: at } })
      case 'cone':
        // Public Cone has no direction yet — non-default axes go via the hatch.
        if (alongZ(p.axis)) return C.Cone({ radius1: p.radius1 ?? 5, radius2: p.radius2 ?? 0, height: p.height ?? 10, loc: { origin: at } })
        return adopt(occ.makeCone(p.radius1 ?? 5, p.radius2 ?? 0, p.height ?? 10, { origin: at, direction: axis }))
      case 'torus':
        if (alongZ(p.axis)) return C.Torus({ radius1: p.majorRadius ?? 10, radius2: p.minorRadius ?? 2, loc: { origin: at } })
        return adopt(occ.makeTorus(p.majorRadius ?? 10, p.minorRadius ?? 2, { origin: at, direction: axis }))
      default:
        throw new Error(`unknown primitive kind: ${String(kind)}`)
    }
  }

  // ── profile wires (line / arc / bspline / circle chains, any plane) ────────
  //
  // Segments are built in world XY (local (x,y), z=0) — where occt.ts circle
  // parameter 0 = +X, CCW toward +Y, matching the profile's local coordinates
  // by construction — then the finished wire is RIGIDLY MOVED into the
  // caller's frame via `located()` (rotate Z onto n = u×v with X onto u,
  // translate to o). Angles therefore never depend on occt.ts's internal
  // in-plane reference for arbitrary normals.

  const profileToXYZ = (points) => {
    const xyz = []
    for (let i = 0; i + 1 < points.length; i += 2) xyz.push([points[i], points[i + 1], 0])
    return xyz
  }

  /** Segment-chain wire (line/arc/bspline) built in world XY. */
  function segmentWireXY(profile) {
    const segs = Array.isArray(profile.segments) ? profile.segments : []
    if (segs.length === 0) throw new Error('a segment profile needs at least one segment')
    if (!Array.isArray(profile.start) || profile.start.length !== 2) throw new Error('profile.start must be [x,y]')
    const parts = []
    let keep = null
    let cur = [profile.start[0], profile.start[1]]
    const push = (shape) => {
      if (shape.isNull()) throw wrapError('segment edge', new Error('null edge'))
      parts.push(shape)
    }
    const lineTo = (to) => occ.makeLine([cur[0], cur[1], 0], [to[0], to[1], 0])
    try {
      for (const seg of segs) {
        if (seg === null || typeof seg !== 'object') throw new Error('each profile segment must be an object')
        if (seg.type === 'line') {
          if (!Array.isArray(seg.to) || seg.to.length !== 2) throw new Error("line segment needs 'to: [x,y]'")
          push(lineTo(seg.to))
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
          // CCW around +Z over an increasing span — ccw/cw is resolved by
          // which endpoint leads (occt.ts wants start < end < start + 360).
          const a0 = Math.atan2(cur[1] - c[1], cur[0] - c[0])
          const a1 = Math.atan2(seg.to[1] - c[1], seg.to[0] - c[0])
          const span = seg.ccw !== false
            ? (a1 > a0 ? a1 - a0 : a1 + 2 * Math.PI - a0)
            : (a1 < a0 ? a0 - a1 : a0 + 2 * Math.PI - a1)
          const start = seg.ccw !== false ? a0 : a1
          push(occ.makeArc(r0, {
            origin: [c[0], c[1], 0],
            normal: [0, 0, 1],
            startDegrees: start * RAD2DEG,
            endDegrees: (start + span) * RAD2DEG,
          }))
          cur = seg.to
        } else if (seg.type === 'bspline') {
          const through = Array.isArray(seg.through) ? seg.through : []
          if (through.length < 2) throw new Error("bspline segment needs 'through: [[x,y],…]' (≥2 points)")
          // True interpolation through the points, current point included.
          const pts = [[cur[0], cur[1], 0], ...through.map((pt) => [pt[0], pt[1], 0])]
          push(occ.makeBsplineThrough(pts, { periodic: false, tolerance: 1e-6 }))
          cur = through[through.length - 1]
        } else {
          throw new Error(`unknown profile segment type: ${String(seg.type)}`)
        }
      }
      if (Math.hypot(cur[0] - profile.start[0], cur[1] - profile.start[1]) > 1e-9) push(lineTo(profile.start))
      if (parts.length === 1) {
        // A single closed B-spline already IS a wire; makeWire needs ≥2 parts.
        if (parts[0].shapeType() === 'Wire') {
          keep = parts[0]
          return keep
        }
        throw new Error('a segment profile needs at least 2 segments (a single open edge cannot close a loop)')
      }
      const wire = occ.makeWire(parts)
      if (wire.isNull()) throw wrapError('makeWire', new Error('null wire'))
      return wire
    } finally {
      for (const part of parts) if (part !== keep) part.dispose()
    }
  }

  /** One profile form → a closed wire in world XY (an occt.ts shape). */
  function occWireXY(profile) {
    if (Array.isArray(profile)) {
      if (profile.length < 6 || profile.length % 2 !== 0) throw new Error('a flat profile needs ≥3 [x,y] pairs')
      return occ.makePolygon(profileToXYZ(profile), { close: true })
    }
    if (profile === null || typeof profile !== 'object') throw new Error('a profile must be a flat [x,y,…] loop, {circle} or {start, segments}')
    if (profile.circle !== undefined) {
      const c = profile.circle
      if (!Array.isArray(c.center) || typeof c.radius !== 'number' || !(c.radius > 0)) throw new Error('profile.circle needs center [x,y] and a positive radius')
      return occ.makeCircle(c.radius, { origin: [c.center[0], c.center[1], 0], normal: [0, 0, 1] })
    }
    return segmentWireXY(profile)
  }

  const identityFrame = (o, u, v) =>
    Math.abs(o[0]) < 1e-9 && Math.abs(o[1]) < 1e-9 && Math.abs(o[2]) < 1e-9 &&
    Math.abs(u[0] - 1) < 1e-9 && Math.abs(u[1]) < 1e-9 && Math.abs(u[2]) < 1e-9 &&
    Math.abs(v[0]) < 1e-9 && Math.abs(v[1] - 1) < 1e-9 && Math.abs(v[2]) < 1e-9

  /**
   * Build the profile's closed wire, rigidly moved so local X→u, Y→v,
   * origin→o (u×v is the plane normal). The move is `located()`: rotate Z
   * onto n with X onto u, then translate — local profile coordinates map
   * exactly onto the requested plane.
   */
  function wireAtFrame(profile, o, u, v) {
    const built = adopt(occWireXY(profile))
    if (identityFrame(o, u, v)) return built
    return built.located(new C.Location(o, vec3.cross(u, v), u))
  }

  // ── solid ops ───────────────────────────────────────────────────────────────

  /** Extrude any 2D profile form from z = base along +Z. */
  function extrudeProfile2D(profile, height, base = 0) {
    if (!(height > 0)) throw new Error('the extrusion height must be positive')
    const wire = wireAtFrame(profile, [0, 0, base], [1, 0, 0], [0, 1, 0])
    return C.extrude(wire, height, { dir: [0, 0, 1] })
  }

  /** Plane frame (origin, in-plane X, in-plane Y) for a planar curve section. */
  function sectionFrame(section) {
    const at = section.at ?? [0, 0, 0]
    if (!Array.isArray(at) || at.length !== 3) throw new Error('section.at must be [x,y,z]')
    const n = vec3.norm(Array.isArray(section.normal) ? section.normal : [0, 0, 1])
    const seed = Array.isArray(section.xAxis) ? section.xAxis : [1, 0, 0]
    const d = vec3.dot(seed, n)
    let u = [seed[0] - n[0] * d, seed[1] - n[1] * d, seed[2] - n[2] * d]
    if (Math.hypot(u[0], u[1], u[2]) < 1e-9) {
      const alt = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]
      const d2 = vec3.dot(alt, n)
      u = [alt[0] - n[0] * d2, alt[1] - n[1] * d2, alt[2] - n[2] * d2]
    }
    u = vec3.norm(u)
    // v = n × u so that u × v = n — profile +Y follows the plane normal cross X.
    return [at, u, vec3.cross(n, u)]
  }

  /**
   * Closed wire through a flat [x,y,z, …] loop: a polygon (the historical
   * section) or — with `smooth` — a PERIODIC B-spline interpolating every
   * point, so a loft skinned over it carries no crease lines.
   */
  function loopWire(xyz, smooth) {
    if (!Array.isArray(xyz) || xyz.length < 9 || xyz.length % 3 !== 0) {
      throw new Error('a section needs at least 3 [x,y,z] triplets (≥9 numbers)')
    }
    const pts = []
    for (let i = 0; i + 2 < xyz.length; i += 3) pts.push([xyz[i], xyz[i + 1], xyz[i + 2]])
    if (!smooth) return adopt(occ.makePolygon(pts, { close: true }))
    return adopt(occ.makeBsplineThrough(pts, { periodic: true, tolerance: 1e-6 }))
  }

  /**
   * One loft section → a closed wire.
   *   [x,y,z, …]                        flat point loop (polygon, or smooth B-spline)
   *   { points: […], smooth?: bool }    same, with a per-section override
   *   { through: [x,y,z, …] }           periodic B-spline through the points
   *   { profile, at?, normal?, xAxis? } 2D curve profile placed in a plane
   */
  function sectionWire(section, smoothDefault) {
    if (Array.isArray(section)) return loopWire(section, smoothDefault)
    if (section === null || typeof section !== 'object') {
      throw new Error('a loft section must be a flat [x,y,z,…] loop or a {points|through|profile, …} object')
    }
    if (section.profile !== undefined) {
      const [o, u, v] = sectionFrame(section)
      return wireAtFrame(section.profile, o, u, v)
    }
    if (section.through !== undefined) return loopWire(section.through, true)
    if (section.points !== undefined) return loopWire(section.points, section.smooth ?? smoothDefault)
    throw new Error('a section object needs `points`, `through` or `profile`')
  }

  function makeLoft(sections, options = {}) {
    if (!Array.isArray(sections) || sections.length < 2) throw new Error('a loft needs at least 2 sections')
    const smooth = options.smooth === true
    const wires = sections.map((section) => sectionWire(section, smooth))
    // solid:false (an open shell) has no public cadorange option yet — the
    // hatch reaches occt.ts's LoftOptions.solid directly.
    const solid = options.solid === false
      ? adopt(occ.loft(wires.map(asOcc), { ruled: options.ruled === true, solid: false }))
      : C.loft(wires, { ruled: options.ruled === true })
    if (Math.abs(solid.volume()) < 1e-9) {
      throw new Error('loft produced an empty solid (sections must be closed, planar, non-degenerate loops)')
    }
    return solid
  }

  /** Sweep a 2D profile along a 3D polyline path (auto-oriented on the start tangent). */
  function makeSweep(profile, pathPoints) {
    if (!Array.isArray(pathPoints) || pathPoints.length < 6 || pathPoints.length % 3 !== 0) {
      throw new Error('the path needs at least 2 [x,y,z] triplets (≥6 numbers)')
    }
    const at = (i) => [pathPoints[i], pathPoints[i + 1], pathPoints[i + 2]]
    const tLen = Math.hypot(pathPoints[3] - pathPoints[0], pathPoints[4] - pathPoints[1], pathPoints[5] - pathPoints[2])
    if (tLen < 1e-12) throw new Error('the path starts with a zero-length segment')
    const t = [(pathPoints[3] - pathPoints[0]) / tLen, (pathPoints[4] - pathPoints[1]) / tLen, (pathPoints[5] - pathPoints[2]) / tLen]
    const seed = Math.abs(t[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]
    const d = vec3.dot(seed, t)
    const vx = vec3.norm([seed[0] - t[0] * d, seed[1] - t[1] * d, seed[2] - t[2] * d])
    const vy = vec3.cross(t, vx)
    const wire = wireAtFrame(profile, at(0), vx, vy)
    const spine = adopt(occ.makePolygon(
      Array.from({ length: pathPoints.length / 3 }, (_, i) => at(i * 3)),
      { close: false },
    ))
    return C.sweep(wire, spine)
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
    const wire = wireAtFrame(profile, at, radial, n)
    return C.revolve(wire, { origin: at, direction: n }, angle * RAD2DEG)
  }

  function boolean(op, target, tools) {
    let result = target
    for (const tool of tools) {
      if (op === 'fuse') result = result.fuse(tool)
      else if (op === 'cut') result = result.cut(tool)
      else if (op === 'common') result = result.common(tool)
      else throw new Error(`unknown boolean op: ${String(op)}`)
    }
    return result
  }

  function filletAll(shape, radius) {
    try {
      return C.fillet(shape, shape.edges(), radius)
    } catch (error) {
      throw wrapError('fillet', error instanceof Error && /radius|exceed/i.test(error.message) ? error : new Error('radius may exceed the adjacent faces'))
    }
  }

  function chamferAll(shape, distance) {
    try {
      return C.chamfer(shape, shape.edges(), distance)
    } catch (error) {
      throw wrapError('chamfer', error instanceof Error && /distance|exceed/i.test(error.message) ? error : new Error('distance may exceed the adjacent faces'))
    }
  }

  /**
   * Shell: hollow to a wall thickness; `openFaces` are 1-based indices as
   * listed by describe() (empty = sealed). Face matching by normal lives in
   * the worker (it has describe output) — this takes indices directly.
   */
  function shell(shape, thickness, openFaces) {
    const indices = Array.isArray(openFaces) ? openFaces : []
    const faces = shape.faces().items
    const open = indices.map((i) => faces[i - 1]).filter((f) => f !== undefined)
    const next = C.shell(shape, Math.abs(thickness), open.length > 0 ? { open } : {})
    // The kernel can return the input unchanged on chamfered/tangent faces
    // (issue #6) — fail loudly with an actionable hint instead of reporting
    // success.
    if (Math.abs(next.volume() - shape.volume()) < 1e-6) {
      throw wrapError('shell', new Error('kernel returned an unchanged solid — shell 未生效（倒角/相切面是已知诱因），请减小壁厚或先抽壳后倒角'))
    }
    return next
  }

  /** Draft: tilt walls by angle degrees toward `direction` (auto wall select). */
  function draft(shape, angleDegrees, direction) {
    const next = C.draft(shape, angleDegrees, { direction: direction ?? [0, 0, 1] })
    if (Math.abs(next.volume() - shape.volume()) < 1e-6) {
      throw wrapError('draft', new Error('kernel returned an unchanged solid — draft 未生效（没有可倾斜的壁面？），请检查拔模方向或改用显式面选择'))
    }
    return next
  }

  /** Mirror here is the native plane mirror — no scale(-1)+rotation composition. */
  function transform(shape, { translate, rotate, mirror } = {}) {
    let result = shape
    if (translate !== undefined) result = result.translate(translate)
    if (rotate !== undefined) {
      const [rx, ry, rz] = rotate
      if (rx) result = result.rotate(new C.Axis([0, 0, 0], [1, 0, 0]), rx)
      if (ry) result = result.rotate(new C.Axis([0, 0, 0], [0, 1, 0]), ry)
      if (rz) result = result.rotate(new C.Axis([0, 0, 0], [0, 0, 1]), rz)
    }
    if (mirror !== undefined) {
      result = result.mirror({ plane: { origin: [0, 0, 0], normal: vec3.norm(mirror) } })
    }
    return result
  }

  function isValid(shape) {
    try { return shape.isValid() === true } catch { return null }
  }

  // ── tessellation (viewer pipeline, via the escape hatch) ───────────────────

  /** Mesh {positions, indices} — occt.ts copies the wasm buffers for us. */
  function tessellate(shape, linearDeflection = 0.3) {
    const mesh = occ.tessellate(asOcc(shape), { linearDeflection: linearDeflection })
    return { positions: mesh.positions, indices: mesh.indices }
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

  // ── describe (agent eyes / face matching) ──────────────────────────────────

  /** The dsh-cad describe shape, normalized from cadorange's cached meta().
   *  `origin` mirrors `center` — the worker's normal-matching scores faces by
   *  their position along the target normal through it. */
  function describe(shape) {
    const m = shape.meta()
    return {
      shapeType: m.shapeType,
      volume: m.volume,
      area: m.area,
      bbox: m.bbox,
      center: m.center,
      valid: m.valid,
      faces: m.faces.map((f) => ({
        index: f.index,
        surface: f.surface,
        area: f.area,
        center: f.center,
        origin: f.center,
        ...(f.normal !== undefined ? { normal: [...f.normal] } : {}),
        ...(f.axis !== undefined ? { axis: [...f.axis] } : {}),
        ...(f.radius !== undefined ? { radius: f.radius } : {}),
      })),
      edges: m.edges.map((e) => ({
        index: e.index,
        curve: e.curve,
        length: e.length,
        center: e.center,
        origin: e.center,
        ...(e.axis !== undefined ? { axis: [...e.axis] } : {}),
        ...(e.radius !== undefined ? { radius: e.radius } : {}),
      })),
      vertices: m.vertices.map((v) => ({ index: v.index, position: [...v.position] })),
    }
  }

  // ── sketch display wires ───────────────────────────────────────────────────

  /**
   * Discretize a sketch profile for viewport display: ONE flat polyline
   * [x,y,z,…] on z=0 plus the TRUE vertex points (polygon corners / segment
   * endpoints — never arc or B-spline sampling points; circles carry no
   * vertices). Polygons/circles/arcs are analytic in JS; B-spline segments
   * round-trip through the kernel's edge tessellator. Returns null when the
   * profile is not discretizable (never throws — display-only).
   */
  function sketchWirePoints(profile) {
    const polyline = []
    const vertices = []
    try {
      if (Array.isArray(profile)) {
        if (profile.length < 6 || profile.length % 2 !== 0) return null
        for (let i = 0; i + 1 < profile.length; i += 2) {
          polyline.push(profile[i], profile[i + 1], 0)
          vertices.push(profile[i], profile[i + 1], 0)
        }
        polyline.push(profile[0], profile[1], 0)
        return { polyline, vertices }
      }
      if (profile === null || typeof profile !== 'object') return null
      if (profile.circle !== undefined) {
        const c = profile.circle
        if (!Array.isArray(c.center) || typeof c.radius !== 'number' || !(c.radius > 0)) return null
        const steps = 96
        for (let i = 0; i <= steps; i++) {
          const a = (i / steps) * 2 * Math.PI
          polyline.push(c.center[0] + c.radius * Math.cos(a), c.center[1] + c.radius * Math.sin(a), 0)
        }
        return { polyline, vertices }
      }
      const segs = Array.isArray(profile.segments) ? profile.segments : []
      if (segs.length === 0 || !Array.isArray(profile.start) || profile.start.length !== 2) return null
      let cur = [profile.start[0], profile.start[1]]
      polyline.push(cur[0], cur[1], 0)
      vertices.push(cur[0], cur[1], 0)
      for (const seg of segs) {
        if (seg === null || typeof seg !== 'object') continue
        if (seg.type === 'line') {
          if (!Array.isArray(seg.to)) continue
          cur = [seg.to[0], seg.to[1]]
          polyline.push(cur[0], cur[1], 0)
          vertices.push(cur[0], cur[1], 0)
        } else if (seg.type === 'arc') {
          if (!Array.isArray(seg.to) || !Array.isArray(seg.center)) continue
          const c = seg.center
          const r = Math.hypot(cur[0] - c[0], cur[1] - c[1])
          const a0 = Math.atan2(cur[1] - c[1], cur[0] - c[0])
          const a1 = Math.atan2(seg.to[1] - c[1], seg.to[0] - c[0])
          const span = seg.ccw !== false ? (a1 > a0 ? a1 - a0 : a1 + 2 * Math.PI - a0) : (a1 < a0 ? a0 - a1 : a0 + 2 * Math.PI - a1)
          const start = seg.ccw !== false ? a0 : a1
          const steps = Math.max(2, Math.ceil((Math.abs(span) / (Math.PI / 2)) * 12))
          for (let i = 1; i <= steps; i++) {
            const a = start + (span * i) / steps
            polyline.push(c[0] + r * Math.cos(a), c[1] + r * Math.sin(a), 0)
          }
          cur = [seg.to[0], seg.to[1]]
          vertices.push(cur[0], cur[1], 0)
        } else if (seg.type === 'bspline' && Array.isArray(seg.through) && seg.through.length >= 2) {
          const pts = [[cur[0], cur[1], 0], ...seg.through.map((p) => [p[0], p[1], 0])]
          const spline = occ.makeBsplineThrough(pts, { periodic: false, tolerance: 1e-6 })
          try {
            const mesh = occ.tessellate(spline, { linearDeflection: 0.1 })
            for (let i = 0; i + 2 < mesh.edges.length; i += 3) polyline.push(mesh.edges[i] ?? 0, mesh.edges[i + 1] ?? 0, 0)
          } finally {
            spline.dispose()
          }
          const last = seg.through[seg.through.length - 1]
          cur = [last[0], last[1]]
          vertices.push(cur[0], cur[1], 0)
        }
      }
      if (Math.hypot(cur[0] - profile.start[0], cur[1] - profile.start[1]) > 1e-9) {
        polyline.push(profile.start[0], profile.start[1], 0)
      }
      return polyline.length >= 9 ? { polyline, vertices } : null
    } catch {
      return null
    }
  }

  /**
   * Triangulate the sketch's enclosed region (the translucent Onshape-style
   * fill): face the exact profile wire through the kernel and tessellate.
   * Returns { positions, indices } as plain arrays, or null when the profile
   * does not bound a face (display-only, never throws).
   */
  function sketchFaceMesh(profile) {
    let wire = null
    let face = null
    try {
      wire = occWireXY(profile)
      face = occ.makeFace(wire, [])
      if (face.isNull()) return null
      const mesh = occ.tessellate(face, { linearDeflection: 0.1 })
      if (mesh.indices.length < 3) return null
      return { positions: Array.from(mesh.positions), indices: Array.from(mesh.indices) }
    } catch {
      return null
    } finally {
      if (face !== null && typeof face.dispose === 'function') face.dispose()
      if (wire !== null && typeof wire.dispose === 'function') wire.dispose()
    }
  }

  // ── export ─────────────────────────────────────────────────────────────────

  function exportFile(shape, format) {
    if (format === 'step' || format === 'stp') return C.exportStep(shape)
    if (format === 'stl') {
      // cadorange's exportStl is ASCII-first; dsh-cad's export contract is the
      // BINARY STL the direct backend emits (byte-identical format, smaller
      // files, and the STL parser stays kernel-agnostic) — so pack it here
      // from the tessellation, exactly like the occt.ts backend does.
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
    throw new Error(`unsupported export format: ${String(format)}`)
  }

  /**
   * Structured assembly STEP: one root product plus one named, placed child
   * per instance — instance separation survives the file (cadorange's
   * exportStepAssembly writes an XCAF document). `nodes`:
   * [{ name, shape, translate?, rotate? }] with unplaced body shapes; the
   * node transform carries the instance placement (identity → null).
   */
  function exportStepDocument(nodes, rootName = 'assembly') {
    const children = nodes.map((node) => {
      let transform = null
      if (node.translate !== undefined || node.rotate !== undefined) {
        const r = eulerMatrix(node.rotate ?? [0, 0, 0])
        const t = node.translate ?? [0, 0, 0]
        transform = [r[0], r[1], r[2], t[0], r[3], r[4], r[5], t[1], r[6], r[7], r[8], t[2]]
      }
      return { name: String(node.name ?? 'part'), color: null, transform, solid: node.shape }
    })
    return C.exportStepAssembly([{ name: rootName, color: null, transform: null, children }])
  }

  // ── engineering-drawing HLR (same kernel session, no STEP round-trip) ──────

  /**
   * True hidden-line views through the escape hatch — the exact pipeline the
   * occt.ts bridge runs, minus the STEP export/re-import: the projection
   * frame comes back with the result and is remapped onto the requested
   * (xDir, up) frame before segment chaining. views: [{ name, dir, xDir }].
   */
  function hiddenLineViewsOf(shape, views) {
    const occShape = asOcc(shape)
    return {
      hlr: 'cadorange',
      views: views.map((view) => {
        const w = vec3.norm(view.dir)
        const u = vec3.norm(view.xDir)
        const v = vec3.norm(vec3.cross(w, u)) // screen-up in model space
        const result = occ.hiddenLines(occShape, { direction: w, up: v, deflection: 0.1 })
        // Remap the engine's (xAxis, yAxis) frame → drawing (u, v).
        const a = vec3.dot(result.xAxis, u)
        const b = vec3.dot(result.yAxis, u)
        const c = vec3.dot(result.xAxis, v)
        const d = vec3.dot(result.yAxis, v)
        const remap = (arr) => {
          const xyz = []
          for (let i = 0; i + 2 < arr.length; i += 3) {
            xyz.push(arr[i] * a + arr[i + 1] * b, arr[i] * c + arr[i + 1] * d, 0)
          }
          return xyz
        }
        const toPolylines = (xyz) =>
          chainSegments(
            Array.from({ length: xyz.length / 6 }, (_, s) => [
              xyz[s * 6], xyz[s * 6 + 1], xyz[s * 6 + 3], xyz[s * 6 + 4],
            ]),
          ).map((chain) => simplify(chain, 0.02)).filter((chain) => chain.length >= 4)
        const visiblePolylines = toPolylines(remap(result.visible))
        const visibleKeys = new Set(visiblePolylines.map(polylineKey))
        // An outline edge hidden behind a face whose projection coincides with
        // its visible twin is already drawn — drop the dashed duplicate.
        const hiddenPolylines = toPolylines(remap(result.hidden)).filter(
          (chain) => !visibleKeys.has(polylineKey(chain)),
        )
        return { name: view.name, visible: visiblePolylines, hidden: hiddenPolylines }
      }),
    }
  }

  return {
    kernel: 'cadorange',

    makePrim,
    extrudeProfile2D,
    makeLoft,
    makeSweep,
    makeRevolve,
    filletAll,
    chamferAll,
    shell,
    draft,
    boolean,
    transform,
    isValid,
    volume: (shape) => shape.volume(),
    centroid: (shape) => [...shape.center()],
    describe,
    tessellate,
    faceNormals,
    exportFile,
    exportStepDocument,
    hiddenLineViewsOf,
    sketchWirePoints,
    sketchFaceMesh,
    /** Free a superseded shape (cadorange owns the wasm lifetime). */
    dispose(shape) {
      if (shape !== null && shape !== undefined && typeof shape.dispose === 'function') {
        try { shape.dispose() } catch { /* already freed */ }
      }
    },
  }
}

module.exports = { createCadorangeAdapter }
