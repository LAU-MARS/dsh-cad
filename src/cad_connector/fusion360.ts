/** Fusion 360 — external executor via the resident-add-in GUI bridge. */
import type { CadConnector } from './types.js'

export const FUSION360_CONNECTOR: CadConnector = {
  id: 'fusion360',
  label: 'Fusion 360',
  vendor: 'Autodesk',
  language: 'python',
  status: 'experimental',
  binding: 'Resident add-in (auto-loaded) + spool-directory job bridge — no headless mode, the Fusion window doubles as a viewer; native on Apple Silicon macOS and Windows',
}
