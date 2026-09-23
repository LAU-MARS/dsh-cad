/** Onshape — cloud-native external executor over the public REST API. */
import type { CadConnector } from './types.js'

export const ONSHAPE_CONNECTOR: CadConnector = {
  id: 'onshape',
  label: 'Onshape',
  vendor: 'PTC',
  language: 'rest',
  status: 'available',
  binding: 'Signed REST API (v6): op programs compile to a FeatureScript custom feature pushed into a Part Studio; results read back as per-part STL + mass properties',
}
