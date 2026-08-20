/**
 * Connector contracts: how dsh-cad describes the CAD engines it can drive.
 * The built-in WebGL/OCCT kernel is one entry; external engines (FreeCAD,
 * SolidWorks, …) are executors reached through the language declared here.
 */

export type ConnectorStatus = 'built-in' | 'available' | 'coming-soon' | 'planned'

/**
 * The language/binding a connector speaks. `sdk` marks vendor
 * secondary-development kits whose surface is not a single language.
 */
export type ExecutorLanguage =
  | 'webgl'
  | 'python'
  | 'csharp'
  | 'cpp'
  | 'javascript'
  | 'rest'
  | 'sdk'

export interface CadConnector {
  id: string
  label: string
  vendor: string
  /** The external language this engine is driven through. */
  language: ExecutorLanguage
  status: ConnectorStatus
  /** Short note on the binding path. */
  binding?: string
}
