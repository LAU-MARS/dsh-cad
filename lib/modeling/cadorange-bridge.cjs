/**
 * cadorange resolution + loading. cadorange is the agent-native CAD runtime
 * wrapping occt.ts; with `DSH_CAD_KERNEL=cadorange` it IS dsh-cad's modeling
 * backend, so both subpaths are loaded from ONE package instance:
 *
 *   - `cadorange`        — the public modeling API (prims/ops/sketch/io)
 *   - `cadorange/occt`   — the supported escape hatch (getOcc/asOccShape/
 *                          fromRaw) backing tessellation, HLR and wire
 *                          construction; it shares the kernel singleton with
 *                          the core entry through the common dist chunks.
 *
 * Resolution order (per entry):
 *   1. `$DSH_CADORANGE` — a package root (its dist/index.js) or a direct .js file
 *   2. Node's own dependency resolution (npm-installed `cadorange`)
 *   3. `<repo>/../cadorange/packages/cadorange/dist/index.js` — sibling checkout
 *
 * Loading is always a dynamic import() of a file URL: a top-level require() of
 * an ESM build crashes the worker at module scope (issue #5).
 */
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { pathToFileURL } = require('node:url')

/**
 * The dist directory holding index.js + occt/index.js, from any entry or
 * package-root candidate. null when the layout is not recognizable.
 */
function distDirOf(candidate) {
  let dir = fs.statSync(candidate).isDirectory() ? candidate : path.dirname(candidate)
  // Each level: its dist/ first (package roots point at it without carrying a
  // package.json — e.g. a DSH_CADORANGE override), then a bare index.js (the
  // dist dir itself), then keep walking up (early builds resolved to src/*.ts).
  for (;;) {
    const dist = path.join(dir, 'dist')
    if (fs.existsSync(path.join(dist, 'index.js'))) return dist
    if (fs.existsSync(path.join(dir, 'index.js'))) return dir
    if (fs.existsSync(path.join(dir, 'package.json'))) return null // a root without a dist
    const parent = path.dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

/** All candidate dist directories, in priority order (missing ones dropped). */
function candidateDistDirs() {
  const dirs = []
  const push = (candidate) => {
    try {
      const dist = distDirOf(candidate)
      if (dist !== null && !dirs.includes(dist)) dirs.push(dist)
    } catch { /* unreadable candidate — skip */ }
  }
  const env = process.env.DSH_CADORANGE
  if (env !== undefined && env !== '') push(env)
  try {
    // require.resolve follows the exports map; early cadorange builds
    // resolved to TypeScript sources, so distDirOf also accepts those roots.
    push(require.resolve('cadorange'))
  } catch { /* cadorange not installed as a dependency */ }
  push(path.resolve(__dirname, '..', '..', '..', 'cadorange', 'packages', 'cadorange', 'dist'))
  return dirs
}

/**
 * The dist directory containing BOTH entry points, or null. The escape-hatch
 * entry is mandatory for the adapter (meshing/HLR), so a core-only dist is
 * rejected here rather than exploding on the first modeling op.
 */
function resolveCadorangeDist() {
  for (const dir of candidateDistDirs()) {
    if (fs.existsSync(path.join(dir, 'occt', 'index.js'))) return dir
  }
  return null
}

let shared = null
let sharedPromise = null

/**
 * Load (once) both cadorange namespaces as `{ core, occt }`, or null when
 * unresolvable. Concurrent callers share one import (a failed import clears
 * the promise so a later call can retry after an install).
 */
async function loadCadorange() {
  if (shared !== null) return shared
  if (sharedPromise === null) {
    const dir = resolveCadorangeDist()
    if (dir === null) return null
    sharedPromise = (async () => {
      const toUrl = (file) => pathToFileURL(path.join(dir, file)).href
      const [core, occt] = await Promise.all([import(toUrl('index.js')), import(toUrl('occt/index.js'))])
      return { core, occt }
    })().catch((error) => {
      sharedPromise = null
      throw error
    })
  }
  shared = await sharedPromise
  return shared
}

module.exports = { loadCadorange, resolveCadorangeDist }
