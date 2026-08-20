/** FreeCAD — first external executor planned. */
import type { CadConnector } from './types.js'

export const FREECAD_CONNECTOR: CadConnector = {
  id: 'freecad',
  label: 'FreeCAD',
  vendor: 'Open-source community',
  language: 'python',
  status: 'coming-soon',
  binding: 'Python console API over a local FreeCAD process',
}
