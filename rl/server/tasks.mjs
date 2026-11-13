/**
 * Demo task set. A task is (prompt, target ops): the target ops run through
 * the same OCCT kernel once per process and get tessellated into the target
 * mesh the reward compares against — so the ground truth is exact w.r.t. the
 * kernel the agent uses, and needs no external dataset for v1.
 *
 * Real task sets (v2+) replace this module with dataset-driven loading
 * (e.g. JSON/parquet of prompts + target ops or target STEP files).
 */
import { createModelClient } from '../../lib/modeling/client.js'

export const TASKS = [
  {
    id: 'box-30x20x10',
    prompt:
      '用 CAD 工具创建一个长方体：dx=30, dy=20, dz=10（mm，从原点出发）。' +
      '完成后调用 cad_submit 提交评分。',
    ops: [
      { kind: 'create_prim', bodyId: 'part', prim: 'box', params: { dx: 30, dy: 20, dz: 10 } },
    ],
  },
  {
    id: 'cylinder-r5-h20',
    prompt:
      '用 CAD 工具创建一个圆柱体：半径 5、高 20（mm），底面圆心在原点，轴向 +Z。' +
      '完成后调用 cad_submit 提交评分。',
    ops: [
      { kind: 'create_prim', bodyId: 'part', prim: 'cylinder', params: { radius: 5, height: 20 } },
    ],
  },
  {
    id: 'plate-60x40x10-hole-r8',
    prompt:
      '用 CAD 工具建模一块带孔的板：(1) 创建 box dx=60, dy=40, dz=10（从原点出发）；' +
      '(2) 创建圆柱 radius=8, height=20，at=[30,20,0]（轴向 +Z）；' +
      '(3) 用 boolean cut 从板上减去圆柱。完成后调用 cad_submit 提交评分。',
    ops: [
      { kind: 'create_prim', bodyId: 'plate', prim: 'box', params: { dx: 60, dy: 40, dz: 10 } },
      { kind: 'create_prim', bodyId: 'hole', prim: 'cylinder', params: { radius: 8, height: 20, at: [30, 20, 0] } },
      { kind: 'boolean', op: 'cut', target: 'plate', tools: ['hole'] },
    ],
  },
]

export function getTask(id) {
  const task = TASKS.find((t) => t.id === id)
  if (task === undefined) {
    throw new Error(`unknown task id: ${id} (available: ${TASKS.map((t) => t.id).join(', ')})`)
  }
  return task
}

export function listTasks() {
  return TASKS.map(({ id, prompt }) => ({ id, prompt }))
}

/** Target meshes per task, computed once per process on a disposable client. */
const targetCache = new Map()

export async function targetOf(task) {
  const cached = targetCache.get(task.id)
  if (cached !== undefined) return cached
  const client = createModelClient()
  try {
    for (const op of task.ops) {
      await client.run(op, 60_000)
    }
    const tess = await client.run({ kind: 'tessellate_all' }, 60_000)
    const meshes = (tess.meshes ?? []).map((m) => ({
      bodyId: m.bodyId,
      positions: Array.from(m.positions),
      indices: Array.from(m.indices),
    }))
    if (meshes.length === 0) throw new Error(`task ${task.id} produced an empty target mesh`)
    const target = { meshes }
    targetCache.set(task.id, target)
    return target
  } finally {
    client.dispose()
  }
}
