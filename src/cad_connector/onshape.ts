/** Onshape — planned external executor, cloud-native. */
import type { CadConnector } from './types.js'

export const ONSHAPE_CONNECTOR: CadConnector = {
  id: 'onshape',
  label: 'Onshape',
  vendor: 'PTC',
  language: 'rest',
  status: 'planned',
  binding: 'REST API for documents/geometry; FeatureScript for custom features',
}
