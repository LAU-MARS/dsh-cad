import esbuild from 'esbuild'

const watch = process.argv.includes('--watch')
const options = {
  entryPoints: ['client/index.tsx'],
  outfile: 'lib/client.js',
  bundle: true,
  // CJS keeps the named-export assignments (`exports.apply = ...`) that the
  // factory envelope's `module.exports` needs; IIFE would drop them.
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
  // `react` stays external: the shell's module table serves it via require().
  external: ['react'],
  // Wrap the bundle in the DSH client-module factory envelope.
  banner: {
    js: 'window.__ModuleLoader__.load({\n  id: "dsh-cad",\n  factory: (require) => {\n    var module = { exports: {} };\n    var exports = module.exports;',
  },
  footer: {
    js: '    return module.exports;\n  }\n});',
  },
  legalComments: 'none',
  minify: true,
  sourcemap: true,
  logLevel: 'info',
}

if (watch) {
  const ctx = await esbuild.context(options)
  await ctx.watch()
} else {
  await esbuild.build(options)
}
