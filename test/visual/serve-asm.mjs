/**
 * Assembly-tree visual check: bundle asm-tree-check.entry.tsx (react bundled,
 * unlike the shipped client) and serve it on http://127.0.0.1:3988.
 */
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import esbuild from 'esbuild'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const entry = path.join(root, 'test', 'visual', 'asm-tree-check.entry.tsx')

const bundle = await esbuild.build({
  entryPoints: [entry],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2022',
  write: false,
  logLevel: 'warning',
})

const html = `<!doctype html>
<html lang="zh-CN">
  <head><meta charset="utf-8" /><title>assembly tree visual check</title></head>
  <body>
    <h1>Assembly tab — tree (PARTS + CONSTRAINTS) + palette-colored scene; click a part row to highlight</h1>
    <div id="asm"></div>
    <script>${bundle.outputFiles[0].text}</script>
  </body>
</html>`

const server = createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  res.end(html)
})
await new Promise((resolve) => server.listen(3988, '127.0.0.1', resolve))
console.log('assembly tree visual check: http://127.0.0.1:3988/')
