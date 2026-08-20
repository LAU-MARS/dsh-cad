/**
 * CAD format detection by file extension (case-insensitive). Returns null for
 * formats this plugin does not consume.
 */
export type CadFormat = 'stl' | 'obj' | 'step' | 'iges' | 'brep' | 'dxf' | 'svg' | 'dcprt'

const EXTENSION_TO_FORMAT: Record<string, CadFormat> = {
  stl: 'stl',
  obj: 'obj',
  step: 'step',
  stp: 'step',
  iges: 'iges',
  igs: 'iges',
  brep: 'brep',
  dxf: 'dxf',
  svg: 'svg',
  dcprt: 'dcprt',
}

export function detectFormat(fileName: string): CadFormat | null {
  const dot = fileName.lastIndexOf('.')
  if (dot < 0) return null
  const extension = fileName.slice(dot + 1).toLowerCase()
  return EXTENSION_TO_FORMAT[extension] ?? null
}

export function is3DFormat(format: CadFormat): boolean {
  return format === 'stl' || format === 'obj' || format === 'step' || format === 'iges' || format === 'brep' || format === 'dcprt'
}
