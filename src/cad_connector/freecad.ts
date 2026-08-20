/** FreeCAD — external executor, live via the local console binary. */
import type { CadConnector } from './types.js'

export const FREECAD_CONNECTOR: CadConnector = {
  id: 'freecad',
  label: 'FreeCAD',
  vendor: 'Open-source community',
  language: 'python',
  status: 'available',
  binding: 'Python bridge over a local FreeCAD console (freecadcmd) — requires FreeCAD installed (or FREECAD_BIN set)',
}
