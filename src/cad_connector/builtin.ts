/** The built-in modeling kernel: opencascade.js (WASM) in a worker, rendered with WebGL/three.js. */
import type { CadConnector } from './types.js'

export const BUILTIN_CONNECTOR: CadConnector = {
  id: 'builtin',
  label: 'Built-in kernel (OCCT + WebGL)',
  vendor: 'dsh-cad',
  language: 'webgl',
  status: 'built-in',
  binding: 'opencascade.js 1.1.1 WASM worker; three.js typed-array rendering, zero install',
}
