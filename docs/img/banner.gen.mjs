/**
 * Generate docs/img/banner.svg — README header banner.
 *
 * Deep-space gradient + isometric glowing wireframe of the L-bracket (the
 * README preview model), drawn from the real bracket geometry (mm, Z-up):
 * profile [0,0 100,0 100,10 10,10 10,70 0,70], extruded 50, holes ⌀9 ×2 in
 * the base leg (axis +Y) and ⌀12 in the wall (axis +X).
 *
 * Usage: node docs/img/banner.gen.mjs
 */
import { writeFile } from 'node:fs/promises'

// ── geometry (mirrors test/visual/build-bracket-scene.mjs) ─────────────────
const PROFILE = [[0, 0], [100, 0], [100, 10], [10, 10], [10, 70], [0, 70]]
const HEIGHT = 50
const HOLES = [
  { at: [25, -6, 25], axis: [0, 1, 0], r: 4.5, len: 22 },
  { at: [75, -6, 25], axis: [0, 1, 0], r: 4.5, len: 22 },
  { at: [-6, 45, 25], axis: [1, 0, 0], r: 6, len: 22 },
]

// rotate about Z, then project isometrically
const THETA = (28 * Math.PI) / 180
const C30 = Math.cos(Math.PI / 6)
const S30 = Math.sin(Math.PI / 6)
const SCALE = 3.1
const ORIGIN = [906, 208] // projection origin on the banner

function p3(x, y, z) {
  const xr = x * Math.cos(THETA) - y * Math.sin(THETA)
  const yr = x * Math.sin(THETA) + y * Math.cos(THETA)
  return [
    ORIGIN[0] + (xr - yr) * C30 * SCALE,
    ORIGIN[1] + ((xr + yr) * S30 - z) * SCALE,
  ]
}
const pt = (v) => `${v[0].toFixed(1)},${v[1].toFixed(1)}`
const line = (a, b) => `M${pt(a)}L${pt(b)}`

// bracket edges: profile at z=0 and z=HEIGHT, plus verticals
const edges = []
const bottom = PROFILE.map(([x, y]) => p3(x, y, 0))
const top = PROFILE.map(([x, y]) => p3(x, y, HEIGHT))
for (let i = 0; i < PROFILE.length; i++) {
  const j = (i + 1) % PROFILE.length
  edges.push(line(bottom[i], bottom[j]))
  edges.push(line(top[i], top[j]))
  edges.push(line(bottom[i], top[i]))
}

// hole circles: sampled rings at both ends of each hole axis, using an
// orthonormal basis (u, v) perpendicular to the axis
const rings = []
for (const h of HOLES) {
  const [ax, ay] = h.axis
  const [u, v] = ax ? [[0, 1, 0], [0, 0, 1]] : ay ? [[1, 0, 0], [0, 0, 1]] : [[1, 0, 0], [0, 1, 0]]
  for (const t of [0, h.len]) {
    const c = [h.at[0] + h.axis[0] * t, h.at[1] + h.axis[1] * t, h.at[2] + h.axis[2] * t]
    const pts = []
    for (let k = 0; k < 48; k++) {
      const a = (k / 48) * 2 * Math.PI
      const px = c[0] + (Math.cos(a) * u[0] + Math.sin(a) * v[0]) * h.r
      const py = c[1] + (Math.cos(a) * u[1] + Math.sin(a) * v[1]) * h.r
      const pz = c[2] + (Math.cos(a) * u[2] + Math.sin(a) * v[2]) * h.r
      pts.push(p3(px, py, pz))
    }
    rings.push('M' + pts.map(pt).join('L') + 'Z')
  }
}

// isometric ground grid (z = 0 plane), x/y from -40..140 step 20
const grid = []
for (let g = -40; g <= 140; g += 20) {
  grid.push(line(p3(g, -40, 0), p3(g, 140, 0)))
  grid.push(line(p3(-40, g, 0), p3(140, g, 0)))
}

const edgePath = edges.join('')
const ringPath = rings.join('')
const gridPath = grid.join('')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="360" viewBox="0 0 1280 360" role="img" aria-label="dsh-cad — CAD Plugin for DeepSeek Harness">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B0F1E"/>
      <stop offset="0.55" stop-color="#0E1530"/>
      <stop offset="1" stop-color="#0A0E1F"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0.72" cy="0.55" r="0.5">
      <stop offset="0" stop-color="#4D6BFE" stop-opacity="0.34"/>
      <stop offset="1" stop-color="#4D6BFE" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.18" cy="0.2" r="0.5">
      <stop offset="0" stop-color="#73A3D2" stop-opacity="0.14"/>
      <stop offset="1" stop-color="#73A3D2" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="titleGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="#AFC5FF"/>
    </linearGradient>
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="1280" height="360" fill="url(#bg)"/>
  <rect width="1280" height="360" fill="url(#glowB)"/>
  <rect width="1280" height="360" fill="url(#glowA)"/>
  <rect x="0.5" y="0.5" width="1279" height="359" fill="none" stroke="#2A3B66" stroke-opacity="0.6"/>

  <path d="${gridPath}" stroke="#1B2748" stroke-width="1" fill="none" opacity="0.75"/>

  <!-- bracket: soft glow pass, then crisp wireframe -->
  <g filter="url(#glow)">
    <path d="${edgePath}" stroke="#4D6BFE" stroke-width="4.5" fill="none" opacity="0.30" stroke-linecap="round"/>
  </g>
  <path d="${edgePath}" stroke="#8FA9FF" stroke-width="1.7" fill="none" stroke-linecap="round"/>
  <path d="${ringPath}" stroke="#6FA0FF" stroke-width="1.3" fill="none" opacity="0.9"/>

  <!-- text block -->
  <g font-family="'Segoe UI','PingFang SC','Microsoft YaHei',system-ui,sans-serif">
    <text x="84" y="118" font-size="15" font-weight="600" letter-spacing="4.5" fill="#6799FE">DSH PLUGIN · OCCT KERNEL</text>
    <text x="80" y="196" font-size="82" font-weight="800" letter-spacing="-1" fill="url(#titleGrad)">dsh-cad</text>
    <text x="84" y="238" font-size="21" font-weight="500" fill="#8FA3C8">CAD Plugin for DeepSeek Harness</text>
    <text x="84" y="272" font-size="16" font-style="italic" fill="#5E7196">model while you watch — exact BRep, live in the conversation</text>
    <text x="84" y="322" font-size="13" letter-spacing="1" fill="#46587D" font-family="Consolas,ui-monospace,monospace">github.com/LAU-MARS/dsh-cad</text>
  </g>

  <!-- accent ticks -->
  <rect x="84" y="132" width="56" height="4" rx="2" fill="#4D6BFE"/>
  <circle cx="1198" cy="60" r="3" fill="#4D6BFE" opacity="0.8"/>
  <circle cx="1224" cy="84" r="2" fill="#73A3D2" opacity="0.6"/>
  <circle cx="1176" cy="306" r="2.5" fill="#4D6BFE" opacity="0.5"/>
</svg>
`

await writeFile(new URL('./banner.svg', import.meta.url), svg)
console.log('banner.svg written,', svg.length, 'bytes')
