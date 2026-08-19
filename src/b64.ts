/**
 * Base64 codecs for typed arrays. Node (host) encodes; the browser card
 * decodes. Kept dependency-free on both sides.
 */

/** Encode a Float32Array's buffer as base64 (Node, host side). */
export function encodeF32B64(array: Float32Array): string {
  return Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString('base64')
}

/** Encode a Uint32Array's buffer as base64 (Node, host side). */
export function encodeU32B64(array: Uint32Array): string {
  return Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString('base64')
}
