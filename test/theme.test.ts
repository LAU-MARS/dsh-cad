/**
 * Issue #7 — dark mode regression: theme resolution from the host's signals,
 * per-theme palettes for the surfaces the host cannot style (viewport slab, 2D
 * strokes, Three.js furniture, ViewCube plate), and the documented override
 * hooks staying in the value expressions.
 */
import { describe, expect, it } from 'vitest'
import {
  CAD_PALETTES,
  cadCanvasBackground,
  cadPaperColor,
  cadScenePalette,
  cadStrokeColor,
  resolveCadTheme,
} from '../client/theme.js'

describe('resolveCadTheme', () => {
  it('follows an explicit color-scheme in either direction', () => {
    expect(resolveCadTheme({ colorScheme: 'dark' })).toBe('dark')
    expect(resolveCadTheme({ colorScheme: 'light' })).toBe('light')
    expect(resolveCadTheme({ colorScheme: ' DARK ' })).toBe('dark')
  })

  it('treats "light dark" as a deferral to the OS preference', () => {
    expect(resolveCadTheme({ colorScheme: 'light dark', prefersDark: true })).toBe('dark')
    expect(resolveCadTheme({ colorScheme: 'light dark', prefersDark: false })).toBe('light')
  })

  it('honours the body[data-ds-dark-theme] attribute when no explicit scheme exists', () => {
    expect(resolveCadTheme({ darkAttribute: true })).toBe('dark')
    expect(resolveCadTheme({ darkAttribute: false, prefersDark: true })).toBe('dark')
  })

  it('lets an explicit color-scheme win over a stale attribute', () => {
    expect(resolveCadTheme({ colorScheme: 'light', darkAttribute: true })).toBe('light')
    expect(resolveCadTheme({ colorScheme: 'dark', darkAttribute: false })).toBe('dark')
  })

  it('defaults to light when the host publishes nothing', () => {
    expect(resolveCadTheme({})).toBe('light')
    expect(resolveCadTheme({ colorScheme: 'normal' })).toBe('light')
  })
})

describe('CAD palettes', () => {
  const channels = (hex: number): [number, number, number] => [(hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff]
  const linear = (value: number): number => {
    const s = value / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  const luminance = (hex: number): number => {
    const [r, g, b] = channels(hex)
    return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
  }
  const contrast = (a: number, b: number): number => {
    const [hi, lo] = luminance(a) >= luminance(b) ? [luminance(a), luminance(b)] : [luminance(b), luminance(a)]
    return (hi + 0.05) / (lo + 0.05)
  }
  const hexOf = (value: string): number => Number.parseInt(value.replace('#', ''), 16)

  it('switches the viewport slab between the host light and dark surfaces', () => {
    expect(CAD_PALETTES.light.canvas).toContain('#f5f6f8')
    expect(CAD_PALETTES.dark.canvas).toContain('#1b1b1c')
    expect(CAD_PALETTES.dark.canvas).not.toBe(CAD_PALETTES.light.canvas)
  })

  it('keeps the 3D furniture readable on both slabs', () => {
    const light = cadScenePalette('light')
    const dark = cadScenePalette('dark')
    const lightBg = 0xf5f6f8
    const darkBg = 0x1b1b1c
    // Feature edges are the primary read of a shaded part: WCAG non-text 3:1.
    expect(contrast(light.edge, lightBg)).toBeGreaterThanOrEqual(3)
    expect(contrast(dark.edge, darkBg)).toBeGreaterThanOrEqual(3)
    // The default mesh must stand off the background on both themes.
    expect(contrast(light.mesh, lightBg)).toBeGreaterThanOrEqual(1.5)
    expect(contrast(dark.mesh, darkBg)).toBeGreaterThanOrEqual(1.5)
    // Grid subdivisions are deliberately faint, but must not vanish.
    expect(contrast(light.gridLine, lightBg)).toBeGreaterThanOrEqual(1.5)
    expect(contrast(dark.gridLine, darkBg)).toBeGreaterThanOrEqual(1.5)
    // Axis triad + label sprites: brighter on dark, darker on light.
    expect(luminance(dark.axisX)).toBeGreaterThan(luminance(light.axisX))
    expect(luminance(dark.axisY)).toBeGreaterThan(luminance(light.axisY))
    expect(luminance(dark.axisZ)).toBeGreaterThan(luminance(light.axisZ))
    // Sketch overlays follow the same rule.
    expect(luminance(dark.sketchWire)).toBeGreaterThan(luminance(light.sketchWire))
    expect(luminance(dark.sketchPoint)).toBeGreaterThan(luminance(light.sketchPoint))
    // The ViewCube plate is a bright chip on light and a dark chip on dark.
    expect(luminance(hexOf('#5b6472'))).toBeLessThan(luminance(hexOf(dark.cubeLabel)))
    expect(dark.cubeFill).not.toBe(light.cubeFill)
    expect(dark.cubeBorder).not.toBe(light.cubeBorder)
  })

  it('keeps the drawing paper white in both themes', () => {
    expect(CAD_PALETTES.light.paper).toBe('#ffffff')
    expect(CAD_PALETTES.dark.paper).toBe('#ffffff')
  })

  it('exposes the documented host override hooks in every surface expression', () => {
    expect(cadCanvasBackground('dark')).toMatch(/^var\(--dsh-cad-bg, /)
    expect(cadCanvasBackground('dark')).toContain(CAD_PALETTES.dark.canvas)
    expect(cadCanvasBackground('light')).toContain(CAD_PALETTES.light.canvas)
    expect(cadStrokeColor('dark')).toMatch(/^var\(--dsh-cad-stroke, #c8ced6\)$/)
    expect(cadStrokeColor('light')).toMatch(/^var\(--dsh-cad-stroke, #4c5561\)$/)
    expect(cadPaperColor('dark')).toBe('var(--dsh-cad-paper, #ffffff)')
  })
})
