/** The built-in modeling kernel: cadorange over the occt.ts wasm, in a worker, rendered with WebGL/three.js. */
import type { CadConnector } from './types.js'

export const BUILTIN_CONNECTOR: CadConnector = {
  id: 'builtin',
  label: 'Built-in kernel (OCCT + WebGL)',
  vendor: 'dsh-cad',
  language: 'webgl',
  status: 'built-in',
  binding: 'cadorange/occt.ts WASM worker; three.js typed-array rendering, zero install',
}
