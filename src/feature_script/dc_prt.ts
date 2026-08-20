/**
 * dsh-cad part document (`.dcprt`) — the standalone, shareable counterpart of
 * the workspace modeling document: a replayable feature history plus a body
 * manifest. Replaying `features` through the OCCT modeling worker reproduces
 * every body exactly, which keeps the file itself geometry-free.
 *
 * Format definition only — runtime persistence/exchange (cad_export filters,
 * loaders) lands together with the assembly and drawing pipelines.
 */
import type { ModelOp } from '../modeling/client.js'
import type { ModelDoc } from '../modeling/document.js'

export const DC_PRT_FORMAT = 'dcprt' as const
export const DC_PRT_EXTENSION = '.dcprt'

export interface DcPrtHeader {
  format: typeof DC_PRT_FORMAT
  version: 1
  units: 'mm'
  upAxis: 'Z'
}

export interface DcPrtBody {
  bodyId: string
  name?: string
}

export interface DcPrtDocument {
  header: DcPrtHeader
  /** Document id from the originating workspace; doubles as the scene viewId. */
  docId: string
  /** Document version at export time (monotonic op counter). */
  version?: number
  /** Feature history — replayable by the OCCT modeling worker, in order. */
  features: ModelOp[]
  bodies: DcPrtBody[]
  createdAt?: string
}

/** Serialize a live workspace modeling document into the shareable .dcprt form. */
export function toDcPrtDocument(doc: ModelDoc): DcPrtDocument {
  return {
    header: { format: DC_PRT_FORMAT, version: 1, units: 'mm', upAxis: 'Z' },
    docId: doc.docId,
    version: doc.version,
    features: doc.ops,
    bodies: Object.entries(doc.bodyNames).map(([bodyId, name]) => ({ bodyId, name })),
  }
}

export function isDcPrtDocument(value: unknown): value is DcPrtDocument {
  if (typeof value !== 'object' || value === null) return false
  const doc = value as Partial<DcPrtDocument> & { header?: Partial<DcPrtHeader> }
  return (
    doc.header?.format === DC_PRT_FORMAT &&
    typeof doc.docId === 'string' &&
    Array.isArray(doc.features) &&
    Array.isArray(doc.bodies)
  )
}
