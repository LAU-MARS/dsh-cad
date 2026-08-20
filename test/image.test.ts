/**
 * Image → profile pipeline tests: PNG decoding (programmatically built
 * fixtures), Otsu binarization, contour tracing, simplification, and the
 * CAD y-flip/scale convention.
 */
import { describe, expect, it } from 'vitest'
import { deflateSync, crc32 } from 'node:zlib'
import { decodePng } from '../src/convert/png.js'
import { extractProfiles, otsuThreshold } from '../src/image/profile.js'

/** Build a minimal grayscale PNG (color type 0, filter 0). */
function makePng(width: number, height: number, gray: Uint8Array): Buffer {
  const chunks: Buffer[] = [Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])]
  const chunk = (type: string, data: Buffer): void => {
    const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
    const length = Buffer.alloc(4)
    length.writeUInt32BE(data.length)
    const crc = Buffer.alloc(4)
    crc.writeUInt32BE(crc32(body) >>> 0)
    chunks.push(Buffer.concat([length, body, crc]))
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 0 // grayscale
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0
  chunk('IHDR', ihdr)

  const raw = Buffer.alloc((width + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (width + 1)] = 0 // filter: none
    for (let x = 0; x < width; x++) raw[y * (width + 1) + 1 + x] = gray[y * width + x]!
  }
  chunk('IDAT', deflateSync(raw))
  chunk('IEND', Buffer.alloc(0))
  return Buffer.concat(chunks)
}

function canvas(width: number, height: number, fill = 255): Uint8Array {
  return new Uint8Array(width * height).fill(fill)
}

function fillRect(target: Uint8Array, width: number, x0: number, y0: number, x1: number, y1: number, value = 0): void {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) target[y * width + x] = value
}

describe('png decoder', () => {
  it('decodes a grayscale image', () => {
    const image = decodePng(makePng(4, 3, new Uint8Array([0, 64, 128, 255, 10, 20, 30, 40, 50, 60, 70, 80])))
    expect(image.width).toBe(4)
    expect(image.height).toBe(3)
    expect(image.gray[0]).toBe(0)
    expect(image.gray[3]).toBe(255)
    expect(image.gray[11]).toBe(80)
  })

  it('rejects non-PNG buffers', () => {
    expect(() => decodePng(Buffer.from('not a png at all'))).toThrow(/not a PNG file/)
  })
})

describe('profile extraction', () => {
  it('otsu splits a bimodal histogram', () => {
    const gray = new Uint8Array(200)
    gray.fill(40, 0, 100)
    gray.fill(220, 100)
    const threshold = otsuThreshold(gray)
    expect(threshold).toBeGreaterThanOrEqual(40)
    expect(threshold).toBeLessThan(220)
  })

  it('extracts a rectangle with CAD y-up orientation', () => {
    // Black rect x 20..79, y 10..50 (y down) on a white 100×100 image.
    const gray = canvas(100, 100)
    fillRect(gray, 100, 20, 10, 79, 50)
    const profiles = extractProfiles(decodePng(makePng(100, 100, gray)), { tolerance: 1 })
    expect(profiles).toHaveLength(1)
    const points = profiles[0]!.points
    const xs = points.filter((_, i) => i % 2 === 0)
    const ys = points.filter((_, i) => i % 2 === 1)
    // y flip: pixel rows 10..50 → mm 49..89
    expect(Math.min(...xs)).toBeCloseTo(20, 0)
    expect(Math.max(...xs)).toBeCloseTo(79, 0)
    expect(Math.min(...ys)).toBeCloseTo(49, 0)
    expect(Math.max(...ys)).toBeCloseTo(89, 0)
    expect(points.length).toBeGreaterThanOrEqual(8)
    expect(points.length).toBeLessThanOrEqual(16)
  })

  it('extracts an L-shape as one six-corner contour', () => {
    const gray = canvas(120, 120)
    fillRect(gray, 120, 10, 10, 109, 29) // base leg
    fillRect(gray, 120, 10, 10, 29, 89) // wall leg
    const profiles = extractProfiles(decodePng(makePng(120, 120, gray)), { tolerance: 1.5 })
    expect(profiles).toHaveLength(1)
    // An L has 6 corners; simplification keeps them all.
    expect(profiles[0]!.points.length / 2).toBe(6)
  })

  it('applies scale and manual invert', () => {
    // Light shape on a dark background.
    const gray = canvas(60, 60, 30)
    fillRect(gray, 60, 5, 5, 34, 34, 240)
    const profiles = extractProfiles(decodePng(makePng(60, 60, gray)), { invert: true, tolerance: 1, scale: 2 })
    expect(profiles).toHaveLength(1)
    const xs = profiles[0]!.points.filter((_, i) => i % 2 === 0)
    expect(Math.min(...xs)).toBeCloseTo(10, 0)
    expect(Math.max(...xs)).toBeCloseTo(68, 0)
  })

  it('drops specks below the minimum area', () => {
    const gray = canvas(80, 80)
    fillRect(gray, 80, 10, 10, 49, 49)
    fillRect(gray, 80, 60, 60, 61, 61) // 2×2 speck
    const profiles = extractProfiles(decodePng(makePng(80, 80, gray)), { tolerance: 1 })
    expect(profiles).toHaveLength(1)
  })
})
