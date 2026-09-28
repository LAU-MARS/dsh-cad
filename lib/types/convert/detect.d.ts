/**
 * CAD format detection by file extension (case-insensitive). Returns null for
 * formats this plugin does not consume.
 */
export type CadFormat = 'stl' | 'obj' | 'step' | 'iges' | 'brep' | 'dxf' | 'svg' | 'dcprt';
export declare function detectFormat(fileName: string): CadFormat | null;
export declare function is3DFormat(format: CadFormat): boolean;
