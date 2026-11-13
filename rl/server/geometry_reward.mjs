/**
 * Pure-JS geometry comparison over tessellated triangle meshes — the reward
 * kernel for RL episodes. No dependencies, deterministic (seeded sampling).
 *
 * Reward = 0.4·volume_ratio + 0.3·bbox_IoU + 0.3·exp(-chamfer/scale)
 * All terms are [0,1]; an empty agent shape scores 0.
 *
 * Numerics are tessellation-approximate (that is fine for reward purposes —
 * both target and agent go through the same kernel and tessellator).
 */

/** Deterministic RNG (mulberry32) so reward is reproducible across runs. */
function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** |signed volume| of one mesh via the divergence theorem (mm³). */
export function meshVolume(mesh) {
  const { positions, indices } = mesh
  let sum = 0
  for (let i = 0; i + 2 < indices.length; i += 3) {
    const a = indices[i] * 3
    const b = indices[i + 1] * 3
    const c = indices[i + 2] * 3
    const ax = positions[a], ay = positions[a + 1], az = positions[a + 2]
    const bx = positions[b], by = positions[b + 1], bz = positions[b + 2]
    const cx = positions[c], cy = positions[c + 1], cz = positions[c + 2]
    sum += (ax * (by * cz - bz * cy) + ay * (bz * cx - bx * cz) + az * (bx * cy - by * cx)) / 6
  }
  return Math.abs(sum)
}

/** Sum of per-body volumes. */
export function combinedVolume(meshes) {
  let sum = 0
  for (const mesh of meshes) sum += meshVolume(mesh)
  return sum
}

/** Axis-aligned bounds over all meshes: {min:[x,y,z], max:[x,y,z]} or null. */
export function boundsOf(meshes) {
  let min = null
  let max = null
  for (const mesh of meshes) {
    const p = mesh.positions
    for (let i = 0; i + 2 < p.length; i += 3) {
      if (min === null) {
        min = [p[i], p[i + 1], p[i + 2]]
        max = [p[i], p[i + 1], p[i + 2]]
      } else {
        for (let k = 0; k < 3; k++) {
          if (p[i + k] < min[k]) min[k] = p[i + k]
          if (p[i + k] > max[k]) max[k] = p[i + k]
        }
    }
  }
  }
  return min === null ? null : { min, max }
}

function boxVolume(b) {
  return (b.max[0] - b.min[0]) * (b.max[1] - b.min[1]) * (b.max[2] - b.min[2])
}

/** 3D IoU of two axis-aligned boxes. */
function bboxIou(a, b) {
  const interMin = [Math.max(a.min[0], b.min[0]), Math.max(a.min[1], b.min[1]), Math.max(a.min[2], b.min[2])]
  const interMax = [Math.min(a.max[0], b.max[0]), Math.min(a.max[1], b.max[1]), Math.min(a.max[2], b.max[2])]
  let inter = 0
  if (interMax[0] > interMin[0] && interMax[1] > interMin[1] && interMax[2] > interMin[2]) {
    inter = (interMax[0] - interMin[0]) * (interMax[1] - interMin[1]) * (interMax[2] - interMin[2])
  }
  const union = boxVolume(a) + boxVolume(b) - inter
  return union > 0 ? inter / union : 0
}

/** Area-weighted surface samples of one mesh (flat Float64Array of xyz). */
function sampleSurface(mesh, count, rng) {
  const { positions, indices } = mesh
  const triCount = (indices.length / 3) | 0
  if (triCount === 0) return new Float64Array(0)
  const areas = new Float64Array(triCount)
  let total = 0
  for (let t = 0; t < triCount; t++) {
    const a = indices[t * 3] * 3
    const b = indices[t * 3 + 1] * 3
    const c = indices[t * 3 + 2] * 3
    const ux = positions[b] - positions[a], uy = positions[b + 1] - positions[a + 1], uz = positions[b + 2] - positions[a + 2]
    const vx = positions[c] - positions[a], vy = positions[c + 1] - positions[a + 1], vz = positions[c + 2] - positions[a + 2]
    const cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx
    total += areas[t] = Math.hypot(cx, cy, cz) / 2
  }
  const out = new Float64Array(count * 3)
  let filled = 0
  for (let i = 0; i < count; i++) {
    let pick = rng() * total
    let t = 0
    while (t + 1 < triCount && pick > areas[t]) { pick -= areas[t]; t++ }
    const a = indices[t * 3] * 3
    const b = indices[t * 3 + 1] * 3
    const c = indices[t * 3 + 2] * 3
    // random barycentric (r1, r2): p = a + r1(b-a) + r2(c-a), r1+r2<=1
    let r1 = rng()
    let r2 = rng()
    if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2 }
    for (let k = 0; k < 3; k++) {
      out[filled++] = positions[a + k] + r1 * (positions[b + k] - positions[a + k]) + r2 * (positions[c + k] - positions[a + k])
    }
  }
  return out
}

function concatSamples(meshes, perMesh, rng) {
  const parts = meshes.map((m) => sampleSurface(m, perMesh, rng))
  const total = parts.reduce((n, p) => n + p.length, 0)
  const out = new Float64Array(total)
  let at = 0
  for (const p of parts) { out.set(p, at); at += p.length }
  return out
}

function nearestDistSq(pointSet, x, y, z) {
  let best = Infinity
  for (let i = 0; i + 2 < pointSet.length; i += 3) {
    const dx = pointSet[i] - x
    const dy = pointSet[i + 1] - y
    const dz = pointSet[i + 2] - z
    const d = dx * dx + dy * dy + dz * dz
    if (d < best) best = d
  }
  return best
}

/** Symmetric mean nearest-neighbour distance between two point sets. */
function chamferDistance(a, b) {
  if (a.length === 0 || b.length === 0) return Infinity
  let sum = 0
  for (let i = 0; i + 2 < a.length; i += 3) sum += Math.sqrt(nearestDistSq(b, a[i], a[i + 1], a[i + 2]))
  for (let i = 0; i + 2 < b.length; i += 3) sum += Math.sqrt(nearestDistSq(a, b[i], b[i + 1], b[i + 2]))
  return sum / ((a.length + b.length) / 3)
}

/**
 * Compare an agent's final meshes against a target.
 * Returns {reward, volume_ratio, bbox_iou, chamfer, chamfer_term} — the
 * components are logged per-episode for training diagnostics.
 */
export function meshReward(agentMeshes, targetMeshes, { samples = 256, seed = 0x9e3779b9 } = {}) {
  const agent = agentMeshes ?? []
  const target = targetMeshes ?? []
  const empty = {
    reward: 0, volume_ratio: 0, bbox_iou: 0, chamfer: null, chamfer_term: 0,
  }
  if (agent.length === 0 || target.length === 0) return empty

  const agentVolume = combinedVolume(agent)
  const targetVolume = combinedVolume(target)
  if (targetVolume <= 0) return empty
  const volumeRatio = Math.min(agentVolume, targetVolume) / Math.max(agentVolume, targetVolume)

  const agentBounds = boundsOf(agent)
  const targetBounds = boundsOf(target)
  const iou = bboxIou(agentBounds, targetBounds)

  // Same seed per side (not one shared stream): identical geometry must
  // sample identical points, so a perfect rebuild scores chamfer = 0 exactly.
  const agentPoints = concatSamples(agent, samples, mulberry32(seed))
  const targetPoints = concatSamples(target, samples, mulberry32(seed))
  const chamfer = chamferDistance(agentPoints, targetPoints)
  const diag = Math.hypot(
    targetBounds.max[0] - targetBounds.min[0],
    targetBounds.max[1] - targetBounds.min[1],
    targetBounds.max[2] - targetBounds.min[2],
  )
  const scale = diag > 0 ? diag / 10 : 1
  const chamferTerm = Number.isFinite(chamfer) ? Math.exp(-chamfer / scale) : 0

  return {
    reward: 0.4 * volumeRatio + 0.3 * iou + 0.3 * chamferTerm,
    volume_ratio: round(volumeRatio),
    bbox_iou: round(iou),
    chamfer: Number.isFinite(chamfer) ? round(chamfer) : null,
    chamfer_term: round(chamferTerm),
  }
}

function round(v) {
  return Math.round(v * 1e6) / 1e6
}
