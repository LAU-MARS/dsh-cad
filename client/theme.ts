/**
 * Host-theme awareness for every rendered CAD surface.
 *
 * The DSH shell drives dark mode from the DOM: it writes `color-scheme` onto
 * `<html>` (inline, from the appearance setting) and toggles
 * `body[data-ds-dark-theme]` for its token block. Other hosts may publish only
 * one of those, and a plain browser preview publishes neither — there the OS
 * `prefers-color-scheme` decides.
 *
 * Chrome (toolbars, tabs, trees, menus) is host-token driven and follows the
 * theme on its own. What the host cannot style for us is the two intended
 * override hooks (`--dsh-cad-bg`, `--dsh-cad-stroke` — the host never defines
 * them) plus the Three.js scene furniture, which is canvas pixels. Those are
 * chosen here, per resolved theme, so the viewport follows the frame instead of
 * staying a light slab in dark mode.
 *
 * Override hooks (an explicit host definition always wins):
 * - `--dsh-cad-bg`: any CSS `background` value for the viewport slab.
 * - `--dsh-cad-stroke`: default 2D entity stroke color.
 * - `--dsh-cad-paper`: drawing-paper fill behind SVG sheets.
 */
import { useSyncExternalStore } from 'react'

export type CadTheme = 'light' | 'dark'

/** Three.js / canvas-texture colors that have no CSS token equivalent. */
export interface CadScenePalette {
  /** Ground-grid major lines. */
  gridCenter: number
  /** Ground-grid subdivisions. */
  gridLine: number
  /** Feature edges of shaded meshes. */
  edge: number
  /** Default mesh color (bodies without an explicit color). */
  mesh: number
  axisX: number
  axisY: number
  axisZ: number
  /** Sketch profile region fill. */
  sketchFill: number
  /** Sketch profile wire. */
  sketchWire: number
  /** Sketch vertex dots. */
  sketchPoint: number
  /** Hemisphere-light ground color (the "bounce" from below). */
  hemisphereGround: number
  /** ViewCube face plate (canvas texture). */
  cubeFill: string
  cubeBorder: string
  cubeLabel: string
}

export interface CadThemePalette {
  /** Viewport slab behind the transparent WebGL canvas and 2D scenes. */
  canvas: string
  /** Drawing paper behind SVG sheets — paper stays paper in both themes. */
  paper: string
  /** Default 2D entity stroke. */
  stroke: string
  scene: CadScenePalette
}

export const CAD_PALETTES: Record<CadTheme, CadThemePalette> = {
  light: {
    canvas: 'linear-gradient(#f5f6f8, #e9ecf0)',
    paper: '#ffffff',
    stroke: '#4c5561',
    scene: {
      gridCenter: 0x8a919c,
      gridLine: 0x4a4f58,
      edge: 0x33404f,
      mesh: 0x9fb4c7,
      axisX: 0xd23b3b,
      axisY: 0x2e9e44,
      axisZ: 0x2b6fd6,
      sketchFill: 0x74a9e0,
      sketchWire: 0x2f80d6,
      sketchPoint: 0x1c5fa8,
      hemisphereGround: 0x595f6b,
      cubeFill: 'rgba(246, 248, 251, 0.96)',
      cubeBorder: 'rgba(148, 158, 172, 0.9)',
      cubeLabel: '#5b6472',
    },
  },
  dark: {
    // Host dark surfaces: --dsw-static-neutral-bluish-900 / -950.
    canvas: 'linear-gradient(#1b1b1c, #151517)',
    paper: '#ffffff',
    stroke: '#c8ced6',
    scene: {
      gridCenter: 0x6b7280,
      gridLine: 0x3f4550,
      edge: 0xd2d7de,
      mesh: 0xa9b9c9,
      axisX: 0xff7a7a,
      axisY: 0x5fe08a,
      axisZ: 0x74a9ff,
      sketchFill: 0x6aa6e8,
      sketchWire: 0x8bbdf5,
      sketchPoint: 0xb4d4f8,
      hemisphereGround: 0x343941,
      cubeFill: 'rgba(38, 40, 44, 0.96)',
      cubeBorder: 'rgba(126, 134, 146, 0.9)',
      cubeLabel: '#d5d9df',
    },
  },
}

/** The theme signals a host can publish, as read from the DOM. */
export interface CadThemeSignals {
  /** Inline/computed `color-scheme`, e.g. `dark`, `light`, `light dark`. */
  colorScheme?: string | null
  /** `body[data-ds-dark-theme]` — the DSH token switch. */
  darkAttribute?: boolean
  /** `prefers-color-scheme: dark`. */
  prefersDark?: boolean
}

/**
 * Resolve the theme from the published signals. An explicit `color-scheme`
 * (one direction only) is the rendering contract and wins; `light dark` means
 * "defer to the OS", so both branches present fall through to the attribute
 * and then the media query.
 */
export function resolveCadTheme(signals: CadThemeSignals): CadTheme {
  const scheme = (signals.colorScheme ?? '').toLowerCase()
  const declaresDark = scheme.includes('dark')
  const declaresLight = scheme.includes('light')
  if (declaresDark && !declaresLight) return 'dark'
  if (declaresLight && !declaresDark) return 'light'
  if (signals.darkAttribute === true) return 'dark'
  return signals.prefersDark === true ? 'dark' : 'light'
}

/** `matchMedia` is cached: getCadTheme runs on every observed mutation. */
let mediaQuery: MediaQueryList | null = null

function prefersDark(): boolean {
  try {
    if (typeof window === 'undefined') return false
    mediaQuery ??= window.matchMedia('(prefers-color-scheme: dark)')
    return mediaQuery.matches
  } catch {
    return false
  }
}

/** The theme the host currently renders in (light when no DOM is available). */
export function getCadTheme(): CadTheme {
  if (typeof document === 'undefined') return 'light'
  const root = document.documentElement
  let colorScheme = root.style?.colorScheme ?? ''
  if (colorScheme === '') {
    try {
      colorScheme = getComputedStyle(root).getPropertyValue('color-scheme')
    } catch {
      colorScheme = ''
    }
  }
  return resolveCadTheme({
    colorScheme,
    darkAttribute: document.body?.hasAttribute('data-ds-dark-theme') === true,
    prefersDark: prefersDark(),
  })
}

const themeListeners = new Set<() => void>()
let stopWatching: (() => void) | null = null

/**
 * Subscribe to theme flips. The DOM sources are observed on `<html>` (inline
 * `color-scheme`) and `<body>` (the DSH dark attribute); the OS media query
 * covers hosts that publish no DOM signal. Notifications fire on any observed
 * mutation — consumers re-read {@link getCadTheme} and no-op when unchanged.
 */
export function subscribeCadTheme(listener: () => void): () => void {
  themeListeners.add(listener)
  if (stopWatching === null) stopWatching = watchThemeSources()
  return () => {
    themeListeners.delete(listener)
    if (themeListeners.size === 0 && stopWatching !== null) {
      stopWatching()
      stopWatching = null
    }
  }
}

function emitThemeChange(): void {
  for (const listener of [...themeListeners]) listener()
}

function watchThemeSources(): () => void {
  if (typeof MutationObserver === 'undefined' || typeof window === 'undefined') return () => {}
  const observer = new MutationObserver(emitThemeChange)
  const targets: Element[] = [document.documentElement]
  if (document.body !== null) targets.push(document.body)
  for (const target of targets) {
    observer.observe(target, {
      attributes: true,
      attributeFilter: ['style', 'class', 'data-ds-dark-theme', 'data-theme', 'data-color-scheme'],
    })
  }
  const media = (mediaQuery ??= window.matchMedia('(prefers-color-scheme: dark)'))
  media.addEventListener('change', emitThemeChange)
  return () => {
    observer.disconnect()
    media.removeEventListener('change', emitThemeChange)
  }
}

/** React binding for the resolved theme (re-renders the surfaces on a flip). */
export function useCadTheme(): CadTheme {
  return useSyncExternalStore(subscribeCadTheme, getCadTheme, () => 'light')
}

/** Viewport slab background, honouring the host's `--dsh-cad-bg` override. */
export function cadCanvasBackground(theme: CadTheme): string {
  return `var(--dsh-cad-bg, ${CAD_PALETTES[theme].canvas})`
}

/** Default 2D entity stroke, honouring the host's `--dsh-cad-stroke` override. */
export function cadStrokeColor(theme: CadTheme): string {
  return `var(--dsh-cad-stroke, ${CAD_PALETTES[theme].stroke})`
}

/** Drawing-paper fill behind SVG sheets, honouring `--dsh-cad-paper`. */
export function cadPaperColor(theme: CadTheme): string {
  return `var(--dsh-cad-paper, ${CAD_PALETTES[theme].paper})`
}

/** The Three.js furniture palette for a theme (shorthand used by the viewers). */
export function cadScenePalette(theme: CadTheme): CadScenePalette {
  return CAD_PALETTES[theme].scene
}
