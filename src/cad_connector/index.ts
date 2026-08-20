/**
 * Connector registry, ordered like the README table: the built-in kernel
 * first, then external CAD executors by support status.
 */
import type { CadConnector } from './types.js'
import { BUILTIN_CONNECTOR } from './builtin.js'
import { FREECAD_CONNECTOR } from './freecad.js'
import { SOLIDWORKS_CONNECTOR } from './solidworks.js'
import { FUSION360_CONNECTOR } from './fusion360.js'
import { ONSHAPE_CONNECTOR } from './onshape.js'
import { ZW3D_CONNECTOR } from './zw3d.js'
import { GSTARCAD3D_CONNECTOR } from './gstarcad3d.js'

export const CONNECTORS: readonly CadConnector[] = [
  BUILTIN_CONNECTOR,
  FREECAD_CONNECTOR,
  SOLIDWORKS_CONNECTOR,
  FUSION360_CONNECTOR,
  ONSHAPE_CONNECTOR,
  ZW3D_CONNECTOR,
  GSTARCAD3D_CONNECTOR,
]

export function connectorById(id: string): CadConnector | undefined {
  return CONNECTORS.find((connector) => connector.id === id)
}

export * from './types.js'
