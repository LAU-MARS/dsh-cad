/**
 * Binary scene format: the direct worker→three.js transport. One packed
 * buffer (JSON header + raw f32/u32 payloads) that the browser decodes with
 * typed-array views — no base64, no JSON number arrays, no intermediate file
 * unless the debounced disk mirror or an explicit cad_export happens.
 *
 * Layout (little-endian):
 *   [4B magic "DCB1"][4B headerByteLength][header JSON utf8][payload bytes]
 * Header: { meshes: [{ name, color?, vertexCount, triangleCount,
 *            posOffset, posBytes, nrmOffset?, nrmBytes, idxOffset, idxBytes }],
 *           bounds: { min: [x,y,z], max: [x,y,z] }, units }
 * Offsets/lengths are byte counts relative to the payload start.
 */
export interface BinMeshDesc {
    name: string;
    color?: number;
    /** 'wire' → LINES list, 'fill' → translucent region, 'points' → vertex dots. */
    mode?: 'wire' | 'fill' | 'points';
    vertexCount: number;
    triangleCount: number;
    posOffset: number;
    posBytes: number;
    nrmOffset?: number;
    nrmBytes?: number;
    idxOffset: number;
    idxBytes: number;
}
export interface BinHeader {
    meshes: BinMeshDesc[];
    bounds: {
        min: [number, number, number];
        max: [number, number, number];
    };
    units: string;
}
export interface BinMeshData {
    name: string;
    color?: number;
    /** 'wire' → LINES list, 'fill' → translucent region, 'points' → vertex dots. */
    mode?: 'wire' | 'fill' | 'points';
    positions: Float32Array;
    normals?: Float32Array;
    indices: Uint32Array;
}
/** Pack meshes into the binary transport buffer. */
export declare function packBinaryScene(meshes: BinMeshData[]): Buffer;
