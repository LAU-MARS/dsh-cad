#!/usr/bin/env node
/**
 * Headless CAD RL environment server (verl branch, v1 demo).
 *
 * One episode = one isolated OCCT worker thread (createModelClient) + one
 * task. There is no web UI, no scene store, no HTTP viewer route — the MDP is
 * exactly (prompt → tool call → text observation), and reward is computed
 * server-side from the final tessellation. Rendering stays out of the loop on
 * purpose; a v2 `cad_image`-style tool can add visual observations as an
 * explicit agent action.
 *
 * HTTP surface (plain JSON, no deps):
 *   GET  /health                          liveness
 *   GET  /tasks                           task list
 *   POST /reset          {task_id?}       new episode → {episode_id, prompt}
 *   POST /step           {episode_id, name, arguments?}   one agent action
 *   GET  /episodes/:id[?mesh=1]           episode summary (or + meshes)
 *   POST /initialize                      verl tool-server convention → tools
 *   POST /execute        {name, arguments?, episode_id?}  verl tool call
 *
 * Agent-facing tools: cad_op / cad_state / cad_submit (see tool_schemas.mjs).
 * /execute without episode_id binds to the most recent /reset (documented
 * limitation for single-env smoke tests; real verl rollouts key episodes).
 *
 * Run:  node rl/server/env_server.mjs [--port 8990]
 * Prereq: npm install && npm run build  (uses lib/modeling/client.js).
 */
import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'
import { pathToFileURL } from 'node:url'
import { createModelClient } from '../../lib/modeling/client.js'
import { TASKS, getTask, listTasks, targetOf } from './tasks.mjs'
import { meshReward, combinedVolume, boundsOf } from './geometry_reward.mjs'
import { TOOL_SCHEMAS } from './tool_schemas.mjs'

const OP_TIMEOUT_MS = 30_000

/** Modeling ops an agent may issue. reset is episode lifecycle (reserved);
 * drawing/assembly/constraints/export stay out of v1 — narrow the surface
 * first, widen when tasks need them. */
const ALLOWED_KINDS = new Set([
  'create_prim', 'extrude_profile', 'loft', 'revolve', 'sweep',
  'boolean', 'fillet', 'chamfer', 'shell', 'draft', 'pattern',
  'transform', 'delete', 'volume', 'tessellate_all',
])

/** Strip mesh buffers etc. from an OpResult — observations are text-sized. */
function summarizeResult(result) {
  const out = {}
  for (const [key, value] of Object.entries(result ?? {})) {
    if (value === undefined) continue
    if (key === 'mesh') { out.triangles = value.triangleCount; continue }
    if (key === 'meshes') { out.bodies = value.map((m) => ({ bodyId: m.bodyId, triangles: m.triangleCount })); continue }
    if (key === 'bytes' || key === 'views') continue
    if (key === 'created') { out.created = value.map((c) => ({ bodyId: c.bodyId, name: c.name })); continue }
    out[key] = value
  }
  return out
}

class Episode {
  constructor(id, task, target, maxSteps) {
    this.id = id
    this.task = task
    this.target = target
    this.maxSteps = maxSteps
    this.client = createModelClient()
    this.steps = []
    this.done = false
    this.truncated = false
    this.reward = null
    this.rewardDetail = null
  }

  async tessellate() {
    const result = await this.client.run({ kind: 'tessellate_all' }, OP_TIMEOUT_MS)
    return (result.meshes ?? []).map((m) => ({ bodyId: m.bodyId, positions: m.positions, indices: m.indices }))
  }

  dispose() {
    this.client.dispose()
  }
}

/** Episode store + env dynamics, transport-agnostic (reused by the demo). */
export function createEnv({ maxSteps = 24, maxEpisodes = 256 } = {}) {
  const episodes = new Map()
  let currentEpisodeId = null

  function evictIfNeeded() {
    while (episodes.size > maxEpisodes) {
      let victim = null
      for (const episode of episodes.values()) {
        if (episode.done) { victim = episode; break }
      }
      if (victim === null) for (const episode of episodes.values()) { victim = episode; break }
      episodes.delete(victim.id)
      victim.dispose()
    }
  }

  async function reset({ task_id: taskId } = {}) {
    const task = taskId === undefined ? TASKS[0] : getTask(taskId)
    const target = await targetOf(task)
    const episode = new Episode(randomUUID(), task, target, maxSteps)
    episodes.set(episode.id, episode)
    currentEpisodeId = episode.id
    evictIfNeeded()
    return {
      episode_id: episode.id,
      task_id: task.id,
      prompt: task.prompt,
      max_steps: maxSteps,
      tools: TOOL_SCHEMAS,
      done: false,
    }
  }

  async function finalize(episode, { truncated = false } = {}) {
    const meshes = await episode.tessellate()
    const detail = meshReward(meshes, episode.target.meshes)
    episode.done = true
    episode.truncated = truncated
    episode.reward = detail.reward
    episode.rewardDetail = detail
    episode.finalMeshes = meshes.map((m) => ({
      bodyId: m.bodyId,
      positions: Array.from(m.positions),
      indices: Array.from(m.indices),
    }))
    episode.dispose()
    return {
      observation: `episode 结束（${truncated ? '达到步数上限被截断' : 'agent 主动提交'}）。` +
        `reward=${detail.reward}（volume_ratio=${detail.volume_ratio}, bbox_iou=${detail.bbox_iou}, ` +
        `chamfer=${detail.chamfer}, chamfer_term=${detail.chamfer_term}）`,
      done: true,
      truncated,
      reward: detail.reward,
      reward_detail: detail,
    }
  }

  async function execute(episodeId, name, args = {}) {
    const episode = episodes.get(episodeId)
    if (episode === undefined) throw new HttpError(404, `unknown episode: ${episodeId}`)
    if (episode.done) {
      return {
        observation: 'episode 已结束，忽略本次调用。',
        done: true, reward: episode.reward, reward_detail: episode.rewardDetail,
      }
    }
    if (episode.steps.length >= episode.maxSteps) {
      return finalize(episode, { truncated: true })
    }

    episode.steps.push({ name, args })
    try {
      if (name === 'cad_op') return await runCadOp(episode, args)
      if (name === 'cad_state') return await runCadState(episode)
      if (name === 'cad_submit') return await finalize(episode)
      throw new HttpError(400, `unknown tool: ${name}`)
    } catch (error) {
      if (error instanceof HttpError) throw error
      // Kernel-level failure: surface as observation (the agent may recover),
      // but a dead worker ends the episode — see runCadOp exit detection.
      return { observation: `错误：${error.message}`, done: false, reward: null }
    }
  }

  async function runCadOp(episode, args) {
    const op = args.op
    if (typeof op !== 'object' || op === null || Array.isArray(op)) {
      throw new HttpError(400, 'cad_op 需要 arguments.op 为 ModelOp 对象')
    }
    if (typeof op.kind !== 'string' || !ALLOWED_KINDS.has(op.kind)) {
      throw new HttpError(400, `不允许的 op.kind：${String(op.kind)}（允许：${[...ALLOWED_KINDS].join(', ')}）`)
    }
    let result
    try {
      result = await episode.client.run(op, OP_TIMEOUT_MS)
    } catch (error) {
      // A crashed/exited worker can never recover within this episode.
      if (/exited unexpectedly|startup timed out/.test(error.message)) {
        episode.done = true
        episode.reward = 0
        episode.rewardDetail = { reward: 0, volume_ratio: 0, bbox_iou: 0, chamfer: null, chamfer_term: 0, fatal: error.message }
        episode.dispose()
        return { observation: `建模内核崩溃，episode 以 reward=0 结束：${error.message}`, done: true, reward: 0 }
      }
      throw error
    }
    const done = episode.steps.length >= episode.maxSteps
    if (done) {
      const summary = await finalize(episode, { truncated: true })
      summary.observation = `操作结果：${JSON.stringify(summarizeResult(result))}\n${summary.observation}`
      return summary
    }
    return { observation: JSON.stringify(summarizeResult(result)), done: false, reward: null }
  }

  async function runCadState(episode) {
    const meshes = await episode.tessellate()
    const bounds = boundsOf(meshes)
    return {
      observation: JSON.stringify({
        bodies: meshes.map((m) => ({ bodyId: m.bodyId, triangles: (m.indices.length / 3) | 0 })),
        total_volume: Math.round(combinedVolume(meshes) * 1e6) / 1e6,
        bbox: bounds === null ? null : { min: bounds.min.map(round6), max: bounds.max.map(round6) },
        steps_used: `${episode.steps.length}/${episode.maxSteps}`,
      }),
      done: false,
      reward: null,
    }
  }

  function summary(episode, { withMeshes = false } = {}) {
    const out = {
      episode_id: episode.id,
      task_id: episode.task.id,
      steps: episode.steps.map((s) => s.name),
      done: episode.done,
      truncated: episode.truncated,
      reward: episode.reward,
      reward_detail: episode.rewardDetail,
    }
    if (withMeshes && episode.finalMeshes !== undefined) out.meshes = episode.finalMeshes
    return out
  }

  return { episodes, reset, execute, summary }
}

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status }
}

function round6(v) { return Math.round(v * 1e6) / 1e6 }

/** JSON HTTP server over the env. Also serves the verl tool-server pair. */
export function startEnvServer({ port = 8990, host = '127.0.0.1', ...envOptions } = {}) {
  const env = createEnv(envOptions)

  async function verlExecute(body) {
    const episodeId = typeof body.episode_id === 'string' && body.episode_id !== ''
      ? body.episode_id
      : [...env.episodes.keys()].pop() ?? null
    if (episodeId === null) {
      const started = await env.reset({})
      return { success: true, result: await env.execute(started.episode_id, body.name, parseArguments(body.arguments)) }
    }
    return { success: true, result: await env.execute(episodeId, body.name, parseArguments(body.arguments)) }
  }

  function parseArguments(raw) {
    if (raw === undefined || raw === null) return {}
    if (typeof raw === 'object') return raw
    if (typeof raw === 'string') {
      try { return JSON.parse(raw) } catch { throw new HttpError(400, 'arguments 不是合法 JSON') }
    }
    throw new HttpError(400, 'arguments 需为 JSON 对象或 JSON 字符串')
  }

  const server = createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost')
    try {
      if (req.method === 'GET' && url.pathname === '/health') {
        return send(res, 200, { ok: true, episodes: env.episodes.size })
      }
      if (req.method === 'GET' && url.pathname === '/tasks') {
        return send(res, 200, { tasks: listTasks() })
      }
      if (req.method === 'POST' && url.pathname === '/reset') {
        return send(res, 200, await env.reset(await readJson(req)))
      }
      if (req.method === 'POST' && url.pathname === '/step') {
        const body = await readJson(req)
        if (typeof body.episode_id !== 'string') throw new HttpError(400, 'episode_id required')
        return send(res, 200, await env.execute(body.episode_id, body.name, body.arguments))
      }
      const episodeMatch = /^\/episodes\/([a-f0-9-]+)$/.exec(url.pathname)
      if (req.method === 'GET' && episodeMatch !== null) {
        const episode = env.episodes.get(episodeMatch[1])
        if (episode === undefined) throw new HttpError(404, 'unknown episode')
        return send(res, 200, env.summary(episode, { withMeshes: url.searchParams.get('mesh') === '1' }))
      }
      // verl HTTP tool-server convention (verify field names against your
      // installed verl version; a thin adapter in rl/python can reshape).
      if (req.method === 'POST' && url.pathname === '/initialize') {
        return send(res, 200, { success: true, tools: TOOL_SCHEMAS })
      }
      if (req.method === 'POST' && url.pathname === '/execute') {
        const body = await readJson(req)
        if (typeof body.name !== 'string') throw new HttpError(400, 'name required')
        return send(res, 200, await verlExecute(body))
      }
      throw new HttpError(404, `no route: ${req.method} ${url.pathname}`)
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500
      send(res, status, { success: false, error: error.message })
    }
  })

  return new Promise((resolve) => {
    server.listen(port, host, () => {
      resolve({
        server,
        env,
        url: `http://${host}:${server.address().port}`,
        close: () => {
          for (const episode of env.episodes.values()) episode.dispose()
          return new Promise((done) => server.close(() => done()))
        },
      })
    })
  })
}

function readJson(req, limit = 8 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > limit) { reject(new HttpError(413, 'body too large')); req.destroy(); return }
      chunks.push(chunk)
    })
    req.on('end', () => {
      if (chunks.length === 0) return resolve({})
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))) }
      catch { reject(new HttpError(400, 'invalid JSON body')) }
    })
    req.on('error', reject)
  })
}

function send(res, status, payload) {
  const body = JSON.stringify(payload)
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' })
  res.end(body)
}

// ── CLI entry ───────────────────────────────────────────────────────────────
const isMain = process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) {
  const args = process.argv.slice(2)
  const portFlag = args.indexOf('--port')
  const port = portFlag !== -1 ? Number(args[portFlag + 1]) : Number(process.env.RL_PORT ?? 8990)
  const started = await startEnvServer({ port })
  console.log(`[env-server] listening on ${started.url}`)
  console.log(`[env-server] tasks: ${listTasks().map((t) => t.id).join(', ')}`)
  const shutdown = () => { started.close().then(() => process.exit(0)) }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}
