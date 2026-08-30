/** SolidWorks — planned external executor (Windows-only COM/.NET). */
import type { CadConnector } from './types.js'

export const SOLIDWORKS_CONNECTOR: CadConnector = {
  id: 'solidworks',
  label: 'SolidWorks',
  vendor: 'Dassault Systèmes',
  language: 'csharp',
  status: 'planned',
  binding: 'COM/.NET bridge over SldWorks.Application (Windows only) — demo scaffold in scripts/solidworks-bridge/, remote-REST form for mac/linux hosts',
}
