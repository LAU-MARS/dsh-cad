/**
 * Minimal PNG decoder for the image-profile pipeline: 8-bit non-interlaced
 * grayscale / grayscale+alpha / RGB / RGBA, decoding to a luma map. Zero
 * dependencies (node:zlib); unsupported variants fail with explicit errors.
 */
import { inflateSync } from 'node:zlib'

export interface GrayImage {
  width: number
  height: number
  /** Luma per pixel, row-major, 0–255. */
  gray: Uint8Array
}

const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

const COLOR_CHANNELS: Record<number, number> = { 0: 1, 4: 2, 2: 3, 6: 4 }

/** Decode a PNG buffer to a luma image. */
export function decodePng(buffer: Buffer): GrayImage {
  if (buffer.length < 8 || !buffer.subarray(0, 8).equals(SIGNATURE)) {
    throw new Error('not a PNG file (bad signature)')
  }

  let offset = 8
  let width = 0
  let height = 0
  let bitDepth = 0
  let colorType = -1
  const idat: Buffer[] = []
  let seenIhdr = false

  while (offset + 8 <= buffer.length) {
    const length = buffer.readUInt32BE(offset)
    const type = buffer.toString('ascii', offset + 4, offset + 8)
    const data = buffer.subarray(offset + 8, offset + 8 + length)
    if (type === 'IHDR') {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      bitDepth = data[8]!
      colorType = data[9]!
      const compression = data[10]!
      const filterMethod = data[11]!
      const interlace = data[12]!
      if (bitDepth !== 8) throw new Error(`unsupported PNG bit depth ${bitDepth} (only 8-bit)`)
      if (!(colorType in COLOR_CHANNELS)) throw new Error(`unsupported PNG color type ${colorType}`)
      if (compression !== 0 || filterMethod !== 0) throw new Error('unsupported PNG compression/filter method')
      if (interlace !== 0) throw new Error('interlaced PNG is not supported')
      seenIhdr = true
    } else if (type === 'IDAT') {
      idat.push(data)
    } else if (type === 'IEND') {
      break
    }
    offset += 12 + length
  }
  if (!seenIhdr || width === 0 || height === 0) throw new Error('the PNG has no usable IHDR chunk')

  const channels = COLOR_CHANNELS[colorType]!
  const bytesPerPixel = channels
  const stride = width * bytesPerPixel
  const raw = inflateSync(Buffer.concat(idat))
  if (raw.length < (stride + 1) * height) throw new Error('the PNG pixel data is truncated')

  const pixels = unfilter(raw, width, height, bytesPerPixel)
  return { width, height, gray: toLuma(pixels, width, height, channels) }
}

function paeth(a: number, b: number, c: number): number {
  const p = a + b - c
  const pa = Math.abs(p - a)
  const pb = Math.abs(p - b)
  const pc = Math.abs(p - c)
  if (pa <= pb && pa <= pc) return a
  if (pb <= pc) return b
  return c
}

function unfilter(raw: Buffer, width: number, height: number, bytesPerPixel: number): Uint8Array {
  const stride = width * bytesPerPixel
  const out = new Uint8Array(stride * height)
  let input = 0
  for (let y = 0; y < height; y++) {
    const filter = raw[input++]!
    const row = y * stride
    const prior = row - stride
    for (let x = 0; x < stride; x++) {
      const value = raw[input++]!
      const left = x >= bytesPerPixel ? out[row + x - bytesPerPixel]! : 0
      const up = y > 0 ? out[prior + x]! : 0
      const upLeft = y > 0 && x >= bytesPerPixel ? out[prior + x - bytesPerPixel]! : 0
      let result = value
      if (filter === 1) result = value + left
      else if (filter === 2) result = value + up
      else if (filter === 3) result = value + ((left + up) >> 1)
      else if (filter === 4) result = value + paeth(left, up, upLeft)
      else if (filter !== 0) throw new Error(`unknown PNG row filter ${filter}`)
      out[row + x] = result & 0xff
    }
  }
  return out
}

function toLuma(pixels: Uint8Array, width: number, height: number, channels: number): Uint8Array {
  const gray = new Uint8Array(width * height)
  for (let i = 0; i < gray.length; i++) {
    const o = i * channels
    if (channels === 1) gray[i] = pixels[o]!
    else if (channels === 2) gray[i] = pixels[o]!
    else gray[i] = Math.round(0.299 * pixels[o]! + 0.587 * pixels[o + 1]! + 0.114 * pixels[o + 2]!)
  }
  return gray
}
