#!/usr/bin/env node
/**
 * End-to-end demo of the headless CAD RL environment — no GPU, no verl, no
 * web UI. Boots the env server in-process, then drives it over HTTP exactly
 * the way a rollout worker would:
 *
 *   trajectory A  exact rebuild of the target           → reward ≈ 1.0
 *   trajectory B  near miss (wrong one dimension)       → partial reward
 *   trajectory C  submit an empty scene                 → reward 0
 *   verl smoke    /initialize + /execute tool calls     → convention check
 *
 * Exit code 0 iff rewards are ordered A > B > C and A > 0.95.
 * Prereq: npm install && npm run build.
 */
import { startEnvServer } from '../server/env_server.mjs'

const { url: base, close } = await startEnvServer({ port: 0 })

async function call(path, body) {
  const response = await fetch(base + path, {
    method: body === undefined ? 'GET' : 'POST',
    headers: body === undefined ? {} : { 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`${path} → ${response.status}: ${await response.text()}`)
  return response.json()
}

const step = (episodeId, name, args = {}) => call('/step', { episode_id: episodeId, name, arguments: args })

/** Run one scripted trajectory on a task and return its final reward record. */
async function trajectory(label, taskId, ops) {
  const started = await call('/reset', { task_id: taskId })
  for (const op of ops) {
    const result = await step(started.episode_id, 'cad_op', { op })
    if (result.done) break
  }
  const final = await step(started.episode_id, 'cad_submit')
  return { label, taskId, detail: final.reward_detail, reward: final.reward }
}

try {
  // Three trajectories in parallel — each spins its own OCCT worker.
  const results = await Promise.all([
    trajectory('A 精确复现', 'box-30x20x10', [
      { kind: 'create_prim', bodyId: 'part', prim: 'box', params: { dx: 30, dy: 20, dz: 10 } },
    ]),
    trajectory('B 一维偏差', 'box-30x20x10', [
      { kind: 'create_prim', bodyId: 'part', prim: 'box', params: { dx: 30, dy: 20, dz: 12 } },
    ]),
    trajectory('C 空场景提交', 'box-30x20x10', []),
  ])

  // verl tool-server convention smoke: /initialize then /execute on a fresh
  // episode (the last /reset-episode binds — single-env smoke mode).
  const init = await call('/initialize', {})
  const toolNames = init.tools.map((t) => t.function.name).join('/')
  await call('/reset', { task_id: 'plate-60x40x10-hole-r8' })
  const cut = await call('/execute', {
    name: 'cad_op',
    arguments: JSON.stringify({ op: { kind: 'create_prim', bodyId: 'plate', prim: 'box', params: { dx: 60, dy: 40, dz: 10 } } }),
  })
  const verlOk = init.success === true && toolNames === 'cad_op/cad_state/cad_submit' && cut.success === true && cut.result.done === false

  console.log(`env server: ${base}`)
  console.log(`verl 约定冒烟（/initialize + /execute）: ${verlOk ? 'PASS' : 'FAIL'} [${toolNames}]\n`)
  console.log('轨迹            | reward | volume_ratio | bbox_iou | chamfer  | chamfer_term')
  console.log('-----------------|--------|--------------|----------|----------|--------------')
  for (const r of results) {
    const d = r.detail ?? {}
    console.log(
      `${pad(r.label, 16)} | ${pad(d.reward?.toFixed(4) ?? '-', 6)} | ${pad(d.volume_ratio?.toFixed(4) ?? '-', 12)} ` +
      `| ${pad(d.bbox_iou?.toFixed(4) ?? '-', 8)} | ${pad(d.chamfer?.toFixed(3) ?? '∞', 8)} | ${d.chamfer_term?.toFixed(4) ?? '-'}`,
    )
  }

  const [a, b, c] = results.map((r) => r.reward)
  const ordered = a > b && b > c
  const exact = a > 0.95
  console.log(`\n奖励排序 A>B>C: ${ordered ? 'PASS' : 'FAIL'}；精确轨迹 A>0.95: ${exact ? 'PASS' : 'FAIL'}`)
  const ok = ordered && exact && verlOk
  console.log(ok ? '\nDEMO PASS ✓' : '\nDEMO FAIL ✗')
  process.exitCode = ok ? 0 : 1
} finally {
  await close()
}

function pad(value, width) {
  const s = String(value)
  return s.length >= width ? s : s + ' '.repeat(width - s.length)
}
