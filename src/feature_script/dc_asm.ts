/**
 * dsh-cad assembly document (`.dcasm`) — instances of parts placed in one
 * coordinate system. Parts are referenced, never embedded, so an assembly
 * stays small and part edits propagate on reload.
 *
 * Placement mirrors the `cad_transform` op semantics (mm, Z-up, Euler degrees)
 * so an instance can be materialized by replaying a transform on the
 * referenced body.
 */
export const DC_ASM_FORMAT = 'dcasm' as const
export const DC_ASM_EXTENSION = '.dcasm'

export interface DcAsmHeader {
  format: typeof DC_ASM_FORMAT
  version: 1
  units: 'mm'
  upAxis: 'Z'
}

export interface DcAsmPlacement {
  at: [number, number, number]
  /** Euler XYZ rotation in degrees, matching `cad_transform`. */
  rotate?: [number, number, number]
  mirror?: [number, number, number]
}

export type DcAsmSource =
  | { kind: 'body'; bodyId: string }
  | { kind: 'prt'; path: string }

export interface DcAsmInstance {
  instanceId: string
  source: DcAsmSource
  placement: DcAsmPlacement
}

export interface DcAsmDocument {
  header: DcAsmHeader
  instances: DcAsmInstance[]
}

export function isDcAsmDocument(value: unknown): value is DcAsmDocument {
  if (typeof value !== 'object' || value === null) return false
  const doc = value as Partial<DcAsmDocument> & { header?: Partial<DcAsmHeader> }
  return doc.header?.format === DC_ASM_FORMAT && Array.isArray(doc.instances)
}
