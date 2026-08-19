/**
 * Browser-side base64 → typed-array decoding for scene payloads (the mirror
 * of the host's src/b64.ts).
 */

export function decodeF32(base64: string): Float32Array {
  const bytes = decodeBytes(base64)
  return new Float32Array(bytes.buffer, bytes.byteOffset, Math.floor(bytes.byteLength / 4))
}

export function decodeU32(base64: string): Uint32Array {
  const bytes = decodeBytes(base64)
  return new Uint32Array(bytes.buffer, bytes.byteOffset, Math.floor(bytes.byteLength / 4))
}

function decodeBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}
