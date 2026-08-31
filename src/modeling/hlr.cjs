/**
 * Mesh-based hidden-line-removal projection (plain CJS — runs inside the
 * modeling worker). The opencascade.js build exposes no HLRBRep bindings, so
 * engineering-drawing views are computed from the tessellation instead:
 *
 *   1. candidate edges = sharp feature edges (dihedral > threshold, view
 *      independent) ∪ silhouette edges (one adjacent face front-facing, one
 *      back-facing — per view), which is what traces curved outlines;
 *   2. each candidate is occlusion-tested against the projected triangle soup
 *      via a uniform 2D grid (depth-interpolated barycentric coverage);
 *   3. surviving edges are chained into polylines and simplified (RDP), so
 *      the caller gets compact flat [x,y, x,y, …] paths per visibility class.
 *
 * Projected coordinates stay in model units (mm): u along the view's xDir,
 * v = w × u (w = view direction toward the observer), so screen y is "up".
 */
'use strict'

/**
 * Build the edge table keyed by quantized endpoint COORDINATES (not vertex
 * indices): OCCT triangulations are per-face, so the same topological edge
 * appears once per adjacent face under different indices — only coordinates
 * merge them. Values accumulate adjacent face normals for the dihedral test.
 */
function edgeTable(positions, indices) {
  const q = (v) => Math.round(v * 1e4)
  const edges = new Map()
  const triCount = indices.length / 3
  for (let t = 0; t < triCount; t++) {
    const a = indices[t * 3]
    const b = indices[t * 3 + 1]
    const c = indices[t * 3 + 2]
    const ax = positions[a * 3], ay = positions[a * 3 + 1], az = positions[a * 3 + 2]
    const bx = positions[b * 3], by = positions[b * 3 + 1], bz = positions[b * 3 + 2]
    const cx = positions[c * 3], cy = positions[c * 3 + 1], cz = positions[c * 3 + 2]
    // Face normal (normalized; the winding is the orientation source of truth).
    const ux = bx - ax, uy = by - ay, uz = bz - az
    const vx = cx - ax, vy = cy - ay, vz = cz - az
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx
    const len = Math.hypot(nx, ny, nz) || 1
    nx /= len; ny /= len; nz /= len
    for (const [i, j] of [[a, b], [b, c], [c, a]]) {
      const ka = `${q(positions[i * 3])},${q(positions[i * 3 + 1])},${q(positions[i * 3 + 2])}`
      const kb = `${q(positions[j * 3])},${q(positions[j * 3 + 1])},${q(positions[j * 3 + 2])}`
      const key = ka < kb ? `${ka};${kb}` : `${kb};${ka}`
      let entry = edges.get(key)
      if (entry === undefined) {
        entry = { normals: [], x1: positions[i * 3], y1: positions[i * 3 + 1], z1: positions[i * 3 + 2], x2: positions[j * 3], y2: positions[j * 3 + 1], z2: positions[j * 3 + 2] }
        edges.set(key, entry)
      }
      entry.normals.push([nx, ny, nz])
    }
  }
  return edges
}

const cosThreshold = (angleDeg) => Math.cos((angleDeg * Math.PI) / 180)

/**
 * Sharp + boundary feature edges, view independent. Returns flat segments
 * [x1,y1,z1, x2,y2,z2].
 */
function featureEdges(positions, indices, angleDeg = 25) {
  return featureEdgesFrom(edgeTable(positions, indices), angleDeg)
}

function featureEdgesFrom(table, angleDeg = 25) {
  const cosMin = cosThreshold(angleDeg)
  const segments = []
  for (const entry of table.values()) {
    if (entry.normals.length === 1) {
      // Boundary edge (open mesh) — always a candidate.
    } else if (entry.normals.length === 2) {
      const [n1, n2] = entry.normals
      const dot = n1[0] * n2[0] + n1[1] * n2[1] + n1[2] * n2[2]
      if (dot > cosMin) continue // smooth — not a feature edge
    } else {
      continue // non-manifold star: skip
    }
    segments.push(entry.x1, entry.y1, entry.z1, entry.x2, entry.y2, entry.z2)
  }
  return segments
}

/** Silhouette edges for one view: adjacent faces straddle the view plane. */
function silhouetteEdges(positions, indices, dir) {
  return silhouetteEdgesFrom(edgeTable(positions, indices), dir)
}

function silhouetteEdgesFrom(table, dir) {
  const segments = []
  for (const entry of table.values()) {
    if (entry.normals.length !== 2) continue // boundary handled by the sharp pass
    const [n1, n2] = entry.normals
    const d1 = n1[0] * dir[0] + n1[1] * dir[1] + n1[2] * dir[2]
    const d2 = n2[0] * dir[0] + n2[1] * dir[1] + n2[2] * dir[2]
    if (d1 * d2 < 0) segments.push(entry.x1, entry.y1, entry.z1, entry.x2, entry.y2, entry.z2)
  }
  return segments
}

/** Occlusion tester over the projected triangle soup (uniform grid). */
function createOccluderGrid(px, py, depth, indices, cellCount) {
  const triCount = indices.length / 3
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (let i = 0; i < px.length; i++) {
    if (px[i] < minX) minX = px[i]
    if (px[i] > maxX) maxX = px[i]
    if (py[i] < minY) minY = py[i]
    if (py[i] > maxY) maxY = py[i]
  }
  const extent = Math.max(maxX - minX, maxY - minY, 1e-9)
  const cell = extent / cellCount
  const grid = new Map()
  const gridKey = (gx, gy) => gx * 4096 + gy
  for (let t = 0; t < triCount; t++) {
    const a = indices[t * 3] * 1, b = indices[t * 3 + 1], c = indices[t * 3 + 2]
    const x0 = px[a], y0 = py[a], x1 = px[b], y1 = py[b], x2 = px[c], y2 = py[c]
    const loX = Math.floor((Math.min(x0, x1, x2) - minX) / cell)
    const hiX = Math.floor((Math.max(x0, x1, x2) - minX) / cell)
    const loY = Math.floor((Math.min(y0, y1, y2) - minY) / cell)
    const hiY = Math.floor((Math.max(y0, y1, y2) - minY) / cell)
    for (let gy = loY; gy <= hiY; gy++) {
      for (let gx = loX; gx <= hiX; gx++) {
        const key = gridKey(gx, gy)
        const bucket = grid.get(key)
        if (bucket === undefined) grid.set(key, [t])
        else bucket.push(t)
      }
    }
  }
  const EPS = extent * 1e-9
  // Strict-interior margin: coverage only counts when the sample is a real
  // distance inside the projected triangle. Orthographic projections make
  // back faces share their boundary with the silhouette outline exactly —
  // boundary-touching coverage must not hide the outline itself.
  const MARGIN = 5e-3
  /**
   * Is (x, y) at depth `d` hidden? A triangle covers it when the projected
   * point lies strictly inside and the interpolated depth is nearer by more
   * than `bias` (bias ≈ half the tessellation chord sag to keep edges lying
   * ON their own faces visible).
   */
  return (x, y, d, bias) => {
    const gx = Math.floor((x - minX) / cell)
    const gy = Math.floor((y - minY) / cell)
    const bucket = grid.get(gridKey(gx, gy))
    if (bucket === undefined) return false
    for (const t of bucket) {
      const a = indices[t * 3], b = indices[t * 3 + 1], c = indices[t * 3 + 2]
      const x0 = px[a], y0 = py[a], x1 = px[b], y1 = py[b], x2 = px[c], y2 = py[c]
      const area = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0)
      if (Math.abs(area) < EPS) continue
      const w0 = ((x1 - x) * (y2 - y) - (x2 - x) * (y1 - y)) / area
      const w1 = ((x2 - x) * (y0 - y) - (x0 - x) * (y2 - y)) / area
      const w2 = 1 - w0 - w1
      if (w0 < MARGIN || w1 < MARGIN || w2 < MARGIN) continue
      const frontDepth = w0 * depth[a] + w1 * depth[b] + w2 * depth[c]
      if (frontDepth > d + bias) return true
    }
    return false
  }
}

/** Ramer–Douglas–Peucker on a flat [x,y,…] polyline. */
function simplify(points, epsilon) {
  const n = points.length / 2
  if (n < 3) return points
  const keep = new Uint8Array(n)
  keep[0] = 1
  keep[n - 1] = 1
  const stack = [[0, n - 1]]
  while (stack.length > 0) {
    const [first, last] = stack.pop()
    const x1 = points[first * 2], y1 = points[first * 2 + 1]
    const x2 = points[last * 2], y2 = points[last * 2 + 1]
    const dx = x2 - x1, dy = y2 - y1
    const len = Math.hypot(dx, dy)
    let maxDist = 0
    let index = -1
    for (let i = first + 1; i < last; i++) {
      const px = points[i * 2], py = points[i * 2 + 1]
      const dist = len === 0 ? Math.hypot(px - x1, py - y1) : Math.abs(dy * px - dx * py + x2 * y1 - y2 * x1) / len
      if (dist > maxDist) { maxDist = dist; index = i }
    }
    if (maxDist > epsilon && index > 0) {
      keep[index] = 1
      stack.push([first, index], [index, last])
    }
  }
  const out = []
  for (let i = 0; i < n; i++) {
    if (keep[i]) { out.push(points[i * 2], points[i * 2 + 1]) }
  }
  return out
}

/** Chain collinear-adjacent segments ([x1,y1,x2,y2] tuples) into polylines. */
function chainSegments(segments) {
  const key = (x, y) => `${Math.round(x * 1000)}|${Math.round(y * 1000)}`
  const map = new Map()
  segments.forEach((seg, s) => {
    const [x1, y1, x2, y2] = seg
    for (const [k, end] of [[key(x1, y1), 0], [key(x2, y2), 1]]) {
      let list = map.get(k)
      if (list === undefined) { list = []; map.set(k, list) }
      list.push({ s, end })
    }
  })
  const used = new Uint8Array(segments.length)
  const chains = []
  for (let s = 0; s < segments.length; s++) {
    if (used[s]) continue
    used[s] = 1
    const chain = [segments[s][0], segments[s][1], segments[s][2], segments[s][3]]
    // Extend forward from the tail, then backward from the head.
    for (const direction of [1, -1]) {
      for (;;) {
        const tailX = direction === 1 ? chain[chain.length - 2] : chain[0]
        const tailY = direction === 1 ? chain[chain.length - 1] : chain[1]
        const candidates = map.get(key(tailX, tailY)) ?? []
        let found = null
        for (const candidate of candidates) {
          if (used[candidate.s]) continue
          found = candidate
          break
        }
        if (found === null) break
        used[found.s] = 1
        const [ex1, ey1, ex2, ey2] = segments[found.s]
        // Append the far end oriented away from the join point.
        const joinIsStart = key(ex1, ey1) === key(tailX, tailY)
        const px = joinIsStart ? ex2 : ex1
        const py = joinIsStart ? ey2 : ey1
        if (direction === 1) chain.push(px, py)
        else chain.unshift(px, py)
      }
    }
    chains.push(chain)
  }
  return chains
}

/**
 * Project one tessellated body into drawing views.
 * views: [{ name, dir:[x,y,z] toward observer, xDir:[x,y,z] screen-right }].
 * Returns { views: [{ name, visible: number[][] (flat polylines), hidden: number[][] }] }.
 */
function projectViews({ positions, indices }, views, options = {}) {
  const sharpAngle = options.sharpAngle ?? 25
  const table = edgeTable(positions, indices)
  const sharp = featureEdgesFrom(table, sharpAngle)
  const triCount = indices.length / 3
  const modelScale = (() => {
    let min = Infinity, max = -Infinity
    for (let i = 0; i < positions.length; i++) {
      if (positions[i] < min) min = positions[i]
      if (positions[i] > max) max = positions[i]
    }
    return Math.max(max - min, 1e-9)
  })()
  const bias = modelScale * (options.biasRatio ?? 0.002)
  const simplifyEps = modelScale * (options.simplifyRatio ?? 0.0012)

  return {
    views: views.map((view) => {
      const w = normalize(view.dir)
      let u = normalize(view.xDir)
      if (Math.abs(dot(u, w)) > 0.999) u = [1, 0, 0] // degenerate xDir fallback
      const v = normalize(cross(w, u))
      const count = positions.length / 3
      const px = new Float64Array(count)
      const py = new Float64Array(count)
      const depth = new Float64Array(count)
      for (let i = 0; i < count; i++) {
        const x = positions[i * 3], y = positions[i * 3 + 1], z = positions[i * 3 + 2]
        px[i] = x * u[0] + y * u[1] + z * u[2]
        py[i] = x * v[0] + y * v[1] + z * v[2]
        depth[i] = x * w[0] + y * w[1] + z * w[2]
      }
      const occluded = createOccluderGrid(px, py, depth, indices, 48)
      const candidates = [...sharp, ...silhouetteEdgesFrom(table, w)]
      const visibleSegments = []
      const hiddenSegments = []
      for (let s = 0; s < candidates.length / 6; s++) {
        const x1 = candidates[s * 6], y1 = candidates[s * 6 + 1], z1 = candidates[s * 6 + 2]
        const x2 = candidates[s * 6 + 3], y2 = candidates[s * 6 + 4], z2 = candidates[s * 6 + 5]
        const p1x = x1 * u[0] + y1 * u[1] + z1 * u[2]
        const p1y = x1 * v[0] + y1 * v[1] + z1 * v[2]
        const p2x = x2 * u[0] + y2 * u[1] + z2 * u[2]
        const p2y = x2 * v[0] + y2 * v[1] + z2 * v[2]
        if (Math.abs(p1x - p2x) < 1e-9 && Math.abs(p1y - p2y) < 1e-9) continue
        const d1 = x1 * w[0] + y1 * w[1] + z1 * w[2]
        const d2 = x2 * w[0] + y2 * w[1] + z2 * w[2]
        // Three interior samples, majority vote.
        let hits = 0
        for (const t of [0.25, 0.5, 0.75]) {
          const sx = p1x + (p2x - p1x) * t
          const sy = p1y + (p2y - p1y) * t
          const sd = d1 + (d2 - d1) * t
          if (occluded(sx, sy, sd, bias)) hits++
        }
        const target = hits >= 2 ? hiddenSegments : visibleSegments
        target.push([p1x, p1y, p2x, p2y])
      }
      const unwrap = (segments) =>
        chainSegments(segments)
          .map((chain) => simplify(chain, simplifyEps))
          .filter((chain) => chain.length >= 4)
      return { name: view.name, visible: unwrap(visibleSegments), hidden: unwrap(hiddenSegments) }
    }),
  }
}

function normalize(v) {
  const len = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / len, v[1] / len, v[2] / len]
}

function cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

module.exports = { featureEdges, silhouetteEdges, projectViews }
