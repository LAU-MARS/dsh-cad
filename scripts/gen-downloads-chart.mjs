#!/usr/bin/env node
// Renders docs/img/downloads-cumulative.svg — cumulative npm downloads for dsh-cad.
// Runs daily via .github/workflows/downloads-chart.yml; also runnable as `npm run chart`.
// Zero dependencies: plain fetch + hand-rolled SVG, so the CI stays install-free.

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const PKG = 'dsh-cad';
const FIRST_PUBLISH = '2026-08-31'; // first version published to npm
const OUT = path.join(
  path.dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'img', 'downloads-cumulative.svg'
);

// Chart geometry / palette (GitHub-light friendly, brand blue matches the badge row).
const W = 880, H = 300;
const M = { l: 56, r: 18, t: 48, b: 34 };
const C = {
  bg: '#ffffff', border: '#e6e9ef', grid: '#eaeef4',
  line: '#4D6BFE', area: 'rgba(77,107,254,0.13)',
  text: '#59636e', title: '#1f2328', muted: '#6e7781',
};
const FONT = "Verdana,Geneva,'DejaVu Sans',sans-serif";

const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  // The npm downloads API caps ranges at 18 months; clamp so the script keeps
  // working (windowed) long after the package outgrows the full history.
  const oldest = new Date(Date.now() - 540 * 864e5).toISOString().slice(0, 10);
  const start = FIRST_PUBLISH < oldest ? oldest : FIRST_PUBLISH;

  const res = await fetch(`https://api.npmjs.org/downloads/range/${start}:${today}/${PKG}`);
  if (!res.ok) throw new Error(`npm downloads API ${res.status}`);
  const days = (await res.json()).downloads;

  // Trailing days report 0 until npm's accounting catches up (a few days of lag);
  // drop them so the curve ends on the last real data point.
  while (days.length && days[days.length - 1].downloads === 0) days.pop();
  if (!days.length) throw new Error('no download data returned');

  let run = 0;
  const pts = days.map(d => ({ day: d.day, v: (run += d.downloads) }));
  const total = run;

  // Y axis: pick a round step near a quarter of the max, then round the top up
  // to a whole multiple so every gridline label is a clean number.
  const raw = total / 4;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map(k => k * pow).reduce((a, b) =>
    Math.abs(b - raw) < Math.abs(a - raw) ? b : a
  );
  const yMax = Math.max(step * Math.ceil(total / step), step * 2);

  const iw = W - M.l - M.r, ih = H - M.t - M.b;
  const n = Math.max(pts.length, 2);
  const x = i => M.l + (i / (n - 1)) * iw;
  const y = v => M.t + (1 - v / yMax) * ih;

  const linePath = pts.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join('');
  const areaPath = `${linePath}L${x(pts.length - 1).toFixed(1)},${(H - M.b).toFixed(1)}L${M.l},${(H - M.b).toFixed(1)}Z`;

  const grid = [];
  for (let v = 0; v <= yMax + 1e-9; v += step) {
    grid.push(`
  <line x1="${M.l}" x2="${W - M.r}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" stroke="${C.grid}"/>
  <text x="${M.l - 8}" y="${(y(v) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${C.text}">${compact.format(v)}</text>`);
  }

  const tickCount = Math.min(6, pts.length);
  const xTicks = Array.from({ length: tickCount }, (_, k) => {
    const i = Math.round((k / (tickCount - 1)) * (pts.length - 1));
    const anchor = k === 0 ? 'start' : k === tickCount - 1 ? 'end' : 'middle';
    return `
  <text x="${x(i).toFixed(1)}" y="${H - 12}" text-anchor="${anchor}" font-size="11" fill="${C.text}">${pts[i].day.slice(5)}</text>`;
  }).join('');

  const last = pts[pts.length - 1];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="cumulative npm downloads of ${PKG}: ${total.toLocaleString('en-US')}">
  <rect width="${W}" height="${H}" rx="8" fill="${C.bg}" stroke="${C.border}"/>
  <text x="${M.l}" y="24" font-family="${FONT}" font-size="15" font-weight="600" fill="${C.title}">${PKG} · npm cumulative downloads</text>
  <text x="${W - M.r}" y="24" text-anchor="end" font-family="${FONT}" font-size="16" font-weight="700" fill="${C.line}">${total.toLocaleString('en-US')}</text>
  <text x="${M.l}" y="39" font-family="${FONT}" font-size="10.5" fill="${C.muted}">source npmjs.org · updated ${today} · ${pts[0].day} → ${last.day}</text>
  <g font-family="${FONT}">${grid.join('')}${xTicks}</g>
  <path d="${areaPath}" fill="${C.area}"/>
  <path d="${linePath}" fill="none" stroke="${C.line}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="${x(pts.length - 1).toFixed(1)}" cy="${y(last.v).toFixed(1)}" r="4" fill="${C.line}" stroke="#fff" stroke-width="1.5"/>
</svg>
`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, svg);
  console.log(`wrote ${OUT} — total ${total.toLocaleString('en-US')} over ${pts.length} days (${pts[0].day} → ${last.day})`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
