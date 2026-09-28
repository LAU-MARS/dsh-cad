/**
 * Base64 codecs for typed arrays. Node (host) encodes; the browser card
 * decodes. Kept dependency-free on both sides.
 */
/** Encode a Float32Array's buffer as base64 (Node, host side). */
export declare function encodeF32B64(array: Float32Array): string;
/** Encode a Uint32Array's buffer as base64 (Node, host side). */
export declare function encodeU32B64(array: Uint32Array): string;
