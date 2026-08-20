/** SolidWorks — planned external executor. */
import type { CadConnector } from './types.js'

export const SOLIDWORKS_CONNECTOR: CadConnector = {
  id: 'solidworks',
  label: 'SolidWorks',
  vendor: 'Dassault Systèmes',
  language: 'csharp',
  status: 'planned',
  binding: 'SolidWorks API via COM/.NET',
}
