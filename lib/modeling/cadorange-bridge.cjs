/**
 * cadorange resolution + loading. cadorange is the agent-native CAD runtime
 * (wrapping occt.ts) that becomes dsh-cad's kernel backend — the plugin stops
 * driving occt.ts directly once this backend reaches capability parity.
 *
 * Resolution order:
 *   1. `$DSH_CADORANGE` — a package root (its dist/index.js) or a direct .js file
 *   2. Node's own dependency resolution (npm-installed `cadorange`; early
 *      builds export TypeScript sources, so the built dist is preferred)
 *   3. `<repo>/../cadorange/packages/cadorange/dist/index.js` — sibling checkout
 *
 * Loading is always a dynamic import() of a file URL: a top-level require() of
 * an ESM build crashes the worker at module scope (issue #5).
 */
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { pathToFileURL } = require('node:url')

/** All candidate entry files, in priority order (missing ones are skipped). */
function candidateFiles() {
  const files = []
  const env = process.env.DSH_CADORANGE
  if (env !== undefined && env !== '') {
    files.push(env.endsWith('.js') ? env : path.join(env, 'dist', 'index.js'))
  }
  try {
    // require.resolve may land on a TypeScript source (early cadorange builds
    // export ./src/index.ts); walk up to the package root and prefer dist.
    const entry = require.resolve('cadorange')
    let dir = path.dirname(entry)
    while (true) {
      const pkgFile = path.join(dir, 'package.json')
      if (fs.existsSync(pkgFile)) {
        try {
          if (JSON.parse(fs.readFileSync(pkgFile, 'utf8')).name === 'cadorange') {
            files.push(path.join(dir, 'dist', 'index.js'))
            break
          }
        } catch { /* unreadable package.json — keep walking */ }
      }
      const parent = path.dirname(dir)
      if (parent === dir) break
      dir = parent
    }
  } catch { /* cadorange not installed as a dependency */ }
  const repoRoot = path.resolve(__dirname, '..', '..')
  files.push(path.join(repoRoot, '..', 'cadorange', 'packages', 'cadorange', 'dist', 'index.js'))
  return files
}

/** Resolve the cadorange entry file, or null when none exists. */
function resolveCadorangeEntry() {
  for (const file of candidateFiles()) {
    if (fs.existsSync(file)) return file
  }
  return null
}

let shared = null

/** Load (once) the cadorange module namespace, or null when unresolvable. */
async function loadCadorange() {
  if (shared !== null) return shared
  const entry = resolveCadorangeEntry()
  if (entry === null) return null
  shared = await import(pathToFileURL(entry).href)
  return shared
}

module.exports = { loadCadorange, resolveCadorangeEntry }
