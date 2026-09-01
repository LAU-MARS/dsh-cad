/**
 * Bridge to the occt.ts kernel (dist/wasm/occtjs.js + occtjs.wasm — OCCT 7.9
 * with a hand-bound surface that, unlike the stock opencascade.js build, DOES
 * expose hidden-line removal, plus STEP/BRep byte import and built-in edge
 * extraction on tessellation).
 *
 * The modeling kernel stays on opencascade.js (full raw surface); this bridge
 * serves one purpose: true-HLR drawing views. Geometry crosses kernels as
 * STEP bytes (adapter's proven MEMFS export → occt.ts readStep), and the
 * projected segments are remapped into the caller's screen frame (u = right,
 * v = up) before chaining into polylines, so the sheet layout consumes the
 * exact same view data the mesh-projected fallback produces.
 *
 * Resolution order for the dist directory (first hit wins):
 *   1. explicit `distDir` argument
 *   2. `DSH_OCCTJS_DIST` environment variable
 *   3. `<repo>/node_modules/occt.ts/dist`  — the npm package (default)
 *   4. `<repo>/../opencascade-ts/dist`     — sibling checkout (dev machines)
 *   5. `<repo>/vendor/opencascade-ts/dist`
 *   6. `<repo>/node_modules/opencascade-ts/dist`
 *
 * `createOcctBridge()` resolves to null when no dist is found or init
 * fails — the drawing op then throws (engineering drawings require this
 * kernel; there is no fallback engine).
 */
'use strict'
const fs = require('node:fs')
const path = require('node:path')
const { pathToFileURL } = require('node:url')

const norm = (v) => {
  const len = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / len, v[1] / len, v[2] / len]
}
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

function resolveDistDir(explicit) {
  const repoRoot = path.resolve(__dirname, '..', '..')
  const candidates = [
    explicit,
    process.env.DSH_OCCTJS_DIST,
    path.join(repoRoot, 'node_modules', 'occt.ts', 'dist'),
    path.join(repoRoot, '..', 'opencascade-ts', 'dist'),
    path.join(repoRoot, 'vendor', 'opencascade-ts', 'dist'),
    path.join(repoRoot, 'node_modules', 'opencascade-ts', 'dist'),
  ]
  for (const dir of candidates) {
    if (!dir) continue
    if (fs.existsSync(path.join(dir, 'wasm', 'occtjs.js')) && fs.existsSync(path.join(dir, 'wasm', 'occtjs.wasm'))) {
      return dir
    }
  }
  return null
}

async function loadModule(distDir) {
  const imported = await import(pathToFileURL(path.join(distDir, 'wasm', 'occtjs.js')).href)
  const factory = imported.default
  if (typeof factory !== 'function') throw new Error(`occt.ts module has no default factory: ${distDir}`)
  const wasmBinary = fs.readFileSync(path.join(distDir, 'wasm', 'occtjs.wasm'))
  return factory({ wasmBinary })
}

/** Canonical form for coincidence filtering: sorted quantized point keys. */
function polylineKey(points) {
  const keys = []
  for (let i = 0; i + 1 < points.length; i += 2) {
    keys.push(`${Math.round(points[i] * 100)}|${Math.round(points[i + 1] * 100)}`)
  }
  keys.sort()
  return keys.join(';')
}

/**
 * Project one shape (as STEP bytes) into the requested views with the
 * occt.ts hidden-line engine. views: [{ name, dir, xDir }] — the same spec
 * the mesh HLR takes; returns { views: [{ name, visible, hidden }], version }.
 */
async function hiddenLineViews(mod, stepBytes, views) {
  const ptr = mod._malloc(stepBytes.length)
  try {
    mod.HEAPU8.set(stepBytes, ptr)
    const shape = mod.readStep(ptr, stepBytes.length)
    if (shape.isNull()) throw new Error(`occt.ts readStep: ${mod.lastError()}`)
    try {
      return {
        hlr: 'occt.ts',
        views: views.map((view) => {
          const w = norm(view.dir)
          const u = norm(view.xDir)
          const v = norm(cross(w, u)) // screen-up in model space
          // occt.ts frame rule (mirrors its occ.js wrapper): x = up projected
          // onto the view plane, y = dir × x. We pass v as the up hint.
          const dv = dot(w, v)
          let x = [v[0] - w[0] * dv, v[1] - w[1] * dv, v[2] - w[2] * dv]
          if (Math.hypot(x[0], x[1], x[2]) < 1e-9) x = Math.abs(w[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0]
          x = norm(x)
          const y = norm(cross(w, x))
          const raw = mod.hiddenLines(shape, w[0], w[1], w[2], x[0], x[1], x[2], 0.1)
          const read = (ptr2, count) => new Float32Array(mod.HEAPU8.buffer, ptr2, count * 3).slice()
          let visible
          let hidden
          try {
            visible = read(raw.visiblePtr(), raw.visiblePointCount())
            hidden = read(raw.hiddenPtr(), raw.hiddenPointCount())
          } finally {
            raw.delete()
          }
          // Remap occt.ts frame (x, y) → drawing frame (u, v): the 2×2 basis dot products.
          const a = dot(x, u)
          const b = dot(y, u)
          const c = dot(x, v)
          const d = dot(y, v)
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
          const visiblePolylines = toPolylines(remap(visible))
          const visibleKeys = new Set(visiblePolylines.map(polylineKey))
          // An outline edge hidden behind a face whose projection coincides
          // with its visible twin (e.g. a box's back rectangle) is already
          // drawn — drop the dashed duplicate.
          const hiddenPolylines = toPolylines(remap(hidden))
            .filter((chain) => !visibleKeys.has(polylineKey(chain)))
          return { name: view.name, visible: visiblePolylines, hidden: hiddenPolylines }
        }),
      }
    } finally {
      shape.delete()
    }
  } finally {
    mod._free(ptr)
  }
}

/**
 * Create the bridge, or null when the dist is absent/unloadable (the caller
 * falls back to the mesh HLR). The heavy wasm load is lazy and cached.
 */
async function createOcctBridge(options = {}) {
  const distDir = resolveDistDir(options.distDir)
  if (distDir === null) return null
  const mod = await loadModule(distDir)
  if (typeof mod.hiddenLines !== 'function' || typeof mod.readStep !== 'function') {
    throw new Error(`occt.ts dist at ${distDir} lacks hiddenLines/readStep`)
  }
  return {
    kernel: 'occt.ts',
    distDir,
    occtVersion: mod.occtVersion(),
    hiddenLineViews: (stepBytes, views) => hiddenLineViews(mod, stepBytes, views),
  }
}

// ── polyline post-processing (shared formatting for projected segments) ─────

/**
 * Chain collinear-adjacent segments ([x1,y1,x2,y2] tuples) into polylines by
 * quantized shared endpoints — turns the kernel's independent segment pairs
 * into continuous strokes for the sheet renderer.
 */
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

module.exports = { createOcctBridge, resolveDistDir }
