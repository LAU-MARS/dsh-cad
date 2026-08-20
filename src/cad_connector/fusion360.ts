/** Fusion 360 — planned external executor. */
import type { CadConnector } from './types.js'

export const FUSION360_CONNECTOR: CadConnector = {
  id: 'fusion360',
  label: 'Fusion 360',
  vendor: 'Autodesk',
  language: 'python',
  status: 'planned',
  binding: 'Fusion 360 API (Python; C++ also available)',
}
