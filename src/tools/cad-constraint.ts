/**
 * The constraint tool family over the Ansatz solver:
 * - `cad_constraint`  — declare the constraint model (entities + constraints,
 *   persisted in the document op log); instance-bound entities track assembly
 *   placements live at solve time;
 * - `cad_solve`       — solve, report the solver's diagnostics (DOF,
 *   residuals, suggestions — verbatim for the LLM), and write solved rigid3
 *   poses back onto assembly instances (scene refreshes);
 * - `cad_motion`      — kinematic sweep: drive one constraint's value from
 *   `from` to `to` over N frames, solve every frame, apply the last
 *   successful placement, and return the motion table.
 *
 * Solver capability note: Ansatz is staged — today it implements
 * distance-to-origin (2D point) and rejects other kinds with a precise
 * "capability not implemented" tool error. The plumbing here is the finished
 * contract; as the solver's constraint coverage grows (Stage 1–3: general
 * numerics, rank analysis, full 2D/3D sets), these tools need no changes.
 */
import { defineTool } from '@deepseek-ai/dsh-tools'
import type { ToolDefinition } from '@deepseek-ai/dsh-tools'
import { runModelOp } from '../modeling/client.js'
import type { ModelOp, OpResult } from '../modeling/client.js'
import { solveModel } from '../modeling/ansatz-bridge.js'
import {
  buildSolverModel,
  rigid3ToInstance,
  solvedRigid3s,
} from '../modeling/constraints.js'
import type { ConstraintModel } from '../modeling/constraints.js'
import type { ModelDocument } from '../modeling/document.js'
import type { BinMeshData } from '../modeling/bin-format.js'
import type { ModelToolDeps } from './cad-model.js'

/**
 * State shared with createModelTools. The active document is read through
 * `getDocument()` (multi-document sessions swap it per call), and
 * `resolveDoc(exec)` binds the calling session's document + replays it —
 * the multi-document successor of the old restoreOnce.
 */
export interface ConstraintToolCtx {
  deps: ModelToolDeps
  getDocument(): ModelDocument
  meshCache: Map<string, BinMeshData>
  constraintState: { model: ConstraintModel | null; lastSuggestions: string[] }
  resolveDoc(exec: unknown): Promise<void>
  syncAssembly(op: ModelOp, result: OpResult, filePath?: string): Promise<Record<string, unknown>>
  assemblyMetaOf(value: Record<string, unknown>): Record<string, unknown>
}

/** Body/triangle counts shared by every tool's output. */
function docCounts(ctx: ConstraintToolCtx): { bodies: number; triangles: number } {
  const meshes = [...ctx.meshCache.values()]
  return {
    bodies: meshes.length,
    triangles: meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0),
  }
}

function sceneUrl(ctx: ConstraintToolCtx): Record<string, unknown> {
  const base = ctx.deps.ensureSceneRoute()
  if (base === null) return {}
  return { sceneUrl: `${base.replace('/scene', '/bin')}/asm-${ctx.getDocument().doc.docId}?v=${ctx.getDocument().doc.version}` }
}

interface SolveOutcome {
  report: {
    outcome: string
    entities: Array<{ id: number; geometry?: Record<string, unknown> }>
    diagnostics?: {
      dof_total?: number
      dof_remaining?: number
      max_residual?: { residual?: number }
      suggestions?: Array<{ action?: string; human_message?: string }>
      redundant_constraints?: unknown[]
    }
  }
  applied: number
  instances: number
}

/**
 * Solve the stored model and apply rigid3 results to instance-bound entities.
 * Each applied placement goes through ctx.syncAssembly so the transform is
 * recorded in the op log (replay restores every instance) and the assembly
 * scene refreshes.
 */
async function solveAndApply(ctx: ConstraintToolCtx): Promise<SolveOutcome> {
  const model = ctx.constraintState.model
  if (model === null) throw new Error('no constraint model yet — declare one with cad_constraint first')
  const list = await runModelOp({ kind: 'assembly_list' })
  const solverInput = buildSolverModel(model, list.instances ?? [])
  const report = await solveModel(solverInput)
  let applied = 0
  const solved = solvedRigid3s(report.entities as never)
  for (const entity of model.entities) {
    if (entity.instance === undefined) continue
    const pose = solved.get(entity.id)
    if (pose === undefined) continue
    const placement = rigid3ToInstance(pose)
    const op: ModelOp = {
      kind: 'assembly_transform',
      instanceId: entity.instance,
      translate: placement.translate,
      rotate: placement.rotate,
    }
    const result = await runModelOp(op)
    await ctx.syncAssembly(op, result)
    applied++
  }
  return { report, applied, instances: list.instances?.length ?? 0 }
}

/** Apply one frame's solved poses without re-solving (motion playback path). */
async function applyPoses(ctx: ConstraintToolCtx, poses: Array<{ instance: string; translate: [number, number, number]; rotate: [number, number, number] }>): Promise<number> {
  let applied = 0
  for (const pose of poses) {
    const op: ModelOp = { kind: 'assembly_transform', instanceId: pose.instance, translate: pose.translate, rotate: pose.rotate }
    const result = await runModelOp(op)
    await ctx.syncAssembly(op, result)
    applied++
  }
  return applied
}

export function createConstraintTools(ctx: ConstraintToolCtx): ToolDefinition[] {
  const cadConstraint = defineTool({
    name: 'cad_constraint',
    description:
      'Declare the constraint model for the Ansatz solver: `entities` (2D geometry, or `instance` refs to assembly instances — their rigid3 poses sync live at solve time) + `constraints` ' +
      '(coincident/collinear/parallel/perpendicular/tangent/distance/angle/symmetric/fixed/mate/coaxial with a/b entity ids and value params, mm & radians). ' +
      'Persisted in the document op log; solved with cad_solve. Solver capability is staged — unsupported kinds fail with a precise diagnostic.',
    parameters: {
      entities: {
        type: 'array',
        description: 'Entities: {id, instance? (assembly instanceId) | geometry: {type: "point2"|"line2"|"circle2"|"arc2"|"rigid3", …}}.',
        items: { type: 'json', description: 'One entity object.' },
      },
      constraints: {
        type: 'array',
        description: 'Constraints: {type, a, b?, value?, label?} — e.g. {type: "distance", a: 0, b: null, value: 10}.',
        items: { type: 'json', description: 'One constraint object.' },
      },
      clear: { type: 'boolean', description: 'Clear the stored constraint model.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          entities: { type: 'number', required: true, description: 'Stored entity count.' },
          constraints: { type: 'number', required: true, description: 'Stored constraint count.' },
          viewId: { type: 'string', description: 'Assembly scene viewId.' },
          instances: { type: 'number', description: 'Assembly instance count.' },
          cleared: { type: 'boolean', description: 'True when the model was cleared.' },
          bodies: { type: 'number', required: true, description: 'Bodies in the document.' },
          triangles: { type: 'number', required: true, description: 'Document triangle count.' },
          version: { type: 'number', required: true, description: 'Document version.' },
          sceneUrl: { type: 'string', description: 'Versioned assembly scene URL (web compositions).' },
        },
      },
      render: (_args, value) => [{ type: 'text', text: `约束模型: ${String(value.entities)} 实体 · ${String(value.constraints)} 约束 (version ${String(value.version)})` }],
      presentationMeta: (_args, value) => ctx.assemblyMetaOf(value as unknown as Record<string, unknown>) as never,
    },
    isConcurrencySafe: () => false,
    async execute(args, exec: unknown) {
      await ctx.resolveDoc(exec)
      let model: ConstraintModel | null = null
      let cleared = false
      if (args.clear === true) {
        model = { entities: [], constraints: [] }
        cleared = true
      } else {
        const entities = (args.entities ?? []) as Array<Record<string, unknown>>
        const constraints = (args.constraints ?? []) as Array<Record<string, unknown>>
        if (entities.length === 0) throw new Error('entities must list at least one entity (or pass clear: true)')
        model = {
          entities: entities.map((entity, index) => ({
            id: Number(entity.id ?? index),
            ...(typeof entity.instance === 'string' ? { instance: entity.instance } : {}),
            ...(typeof entity.geometry === 'object' && entity.geometry !== null ? { geometry: entity.geometry as Record<string, unknown> } : {}),
          })),
          constraints: constraints.map((constraint, index) => {
            const { id, type, label, ...params } = constraint
            return {
              id: Number(id ?? index),
              kind: { type: String(type), ...params },
              ...(typeof label === 'string' ? { label } : {}),
            }
          }),
        }
      }
      const op: ModelOp = { kind: 'constraints', model: model as never }
      const result = await runModelOp(op)
      ctx.constraintState.model = model
      const syncValue = await ctx.syncAssembly(op, result)
      const value: Record<string, unknown> = {
        entities: model.entities.length,
        constraints: model.constraints.length,
        viewId: `asm-${ctx.getDocument().doc.docId}`,
        instances: Number(syncValue.instances ?? 0),
        ...docCounts(ctx),
        version: ctx.getDocument().doc.version,
        ...(cleared ? { cleared } : {}),
        ...sceneUrl(ctx),
      }
      return value as never
    },
    presentCall: () => ({ card: 'generic', title: '约束模型', kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: '约束模型' }),
  }) as unknown as ToolDefinition

  const cadSolve = defineTool({
    name: 'cad_solve',
    description:
      'Solve the stored constraint model with the Ansatz solver, write solved rigid3 poses back onto the assembly instances (the Assembly tab refreshes), ' +
      'and return the full diagnostics: outcome, DOF remaining, max residual, redundant constraints, and the solver\'s own suggestions (Chinese, agent-oriented).',
    parameters: {},
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          outcome: { type: 'string', required: true, description: 'converged | underconstrained | inconsistent.' },
          viewId: { type: 'string', description: 'Assembly scene viewId.' },
          instances: { type: 'number', description: 'Assembly instance count.' },
          dofRemaining: { type: 'number', description: 'Degrees of freedom left unsolved.' },
          dofTotal: { type: 'number', description: 'Total degrees of freedom.' },
          maxResidual: { type: 'number', description: 'Largest constraint residual.' },
          redundant: { type: 'number', description: 'Redundant constraint count.' },
          suggestions: { type: 'number', description: 'Suggestion count (full text in the render).' },
          applied: { type: 'number', required: true, description: 'Instance placements applied.' },
          bodies: { type: 'number', required: true, description: 'Bodies in the document.' },
          triangles: { type: 'number', required: true, description: 'Document triangle count.' },
          version: { type: 'number', required: true, description: 'Document version.' },
          sceneUrl: { type: 'string', description: 'Versioned assembly scene URL (web compositions).' },
        },
      },
      render: (_args, value) => [{ type: 'text', text: renderSolve(value as unknown as Record<string, unknown>, ctx.constraintState.model, ctx.constraintState.lastSuggestions) }],
      presentationMeta: (_args, value) => ctx.assemblyMetaOf(value as unknown as Record<string, unknown>) as never,
    },
    isConcurrencySafe: () => false,
    async execute(_args, exec: unknown) {
      await ctx.resolveDoc(exec)
      const { report, applied, instances } = await solveAndApply(ctx)
      const diagnostics = report.diagnostics ?? {}
      // The solver's own suggestion texts — the load-bearing LLM diagnostics.
      const suggestionText = (diagnostics.suggestions ?? [])
        .map((suggestion) => suggestion.human_message ?? suggestion.action ?? '')
        .filter((text) => text !== '')
      const value: Record<string, unknown> = {
        outcome: report.outcome,
        applied,
        viewId: `asm-${ctx.getDocument().doc.docId}`,
        instances,
        ...docCounts(ctx),
        version: ctx.getDocument().doc.version,
        ...(diagnostics.dof_remaining !== undefined ? { dofRemaining: diagnostics.dof_remaining } : {}),
        ...(diagnostics.dof_total !== undefined ? { dofTotal: diagnostics.dof_total } : {}),
        ...(diagnostics.max_residual?.residual !== undefined ? { maxResidual: diagnostics.max_residual.residual } : {}),
        ...(Array.isArray(diagnostics.redundant_constraints) ? { redundant: diagnostics.redundant_constraints.length } : {}),
        ...(suggestionText.length > 0 ? { suggestions: suggestionText.length } : {}),
        ...sceneUrl(ctx),
      }
      ctx.constraintState.lastSuggestions = suggestionText
      return value as never
    },
    presentCall: () => ({ card: 'generic', title: '约束求解', kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: '约束求解' }),
  }) as unknown as ToolDefinition

  const cadMotion = defineTool({
    name: 'cad_motion',
    description:
      'Kinematic sweep: drive one numeric constraint from `from` to `to` across N frames, solving each frame; writes the last successful placement to the assembly ' +
      'and returns the per-frame motion table (value, outcome, placements). Use for animating mechanisms (e.g. crank angle or joint distance over time).',
    parameters: {
      constraintId: { type: 'number', required: true, description: 'Id of the driving constraint (must have a numeric value).' },
      from: { type: 'number', required: true, description: 'Driver start value (mm or radians).' },
      to: { type: 'number', required: true, description: 'Driver end value.' },
      frames: { type: 'number', description: 'Frame count (default 8, min 2).' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          frames: { type: 'number', required: true, description: 'Frames solved.' },
          viewId: { type: 'string', description: 'Assembly scene viewId.' },
          instances: { type: 'number', description: 'Assembly instance count.' },
          converged: { type: 'number', required: true, description: 'Frames that converged.' },
          applied: { type: 'number', required: true, description: 'Placements applied from the last successful frame.' },
          bodies: { type: 'number', required: true, description: 'Bodies in the document.' },
          triangles: { type: 'number', required: true, description: 'Document triangle count.' },
          version: { type: 'number', required: true, description: 'Document version.' },
          table: { type: 'string', description: 'Per-frame motion table (value, outcome, poses).' },
          sceneUrl: { type: 'string', description: 'Versioned assembly scene URL (web compositions).' },
        },
      },
      render: (_args, value) => [{ type: 'text', text: String(value.table ?? '') }],
      presentationMeta: (_args, value) => ctx.assemblyMetaOf(value as unknown as Record<string, unknown>) as never,
    },
    isConcurrencySafe: () => false,
    async execute(args, exec: unknown) {
      await ctx.resolveDoc(exec)
      const model = ctx.constraintState.model
      if (model === null) throw new Error('no constraint model yet — declare one with cad_constraint first')
      const driver = model.constraints.find((constraint) => constraint.id === args.constraintId)
      if (driver === undefined) throw new Error(`unknown constraint id: ${args.constraintId}`)
      if (typeof driver.kind.value !== 'number') throw new Error(`constraint ${args.constraintId} has no numeric value to drive`)

      const frameCount = Math.max(2, Math.trunc(args.frames ?? 8))
      const list = await runModelOp({ kind: 'assembly_list' })
      const solverInput = buildSolverModel(model, list.instances ?? [])
      const byEntity = new Map(model.entities.map((entity) => [entity.id, entity]))
      const table: string[] = []
      let converged = 0
      let lastGood: Array<{ instance: string; translate: [number, number, number]; rotate: [number, number, number] }> | null = null
      for (let frame = 0; frame < frameCount; frame++) {
        const value = args.from + ((args.to - args.from) * frame) / (frameCount - 1)
        const frameModel = structuredClone(solverInput) as typeof solverInput
        for (const constraint of frameModel.constraints) {
          if (constraint.id === args.constraintId) constraint.kind.value = value
        }
        let line: string
        try {
          const report = await solveModel(frameModel)
          const solved = solvedRigid3s(report.entities as never)
          const placements: Array<{ instance: string; translate: [number, number, number]; rotate: [number, number, number] }> = []
          for (const [entityId, pose] of solved) {
            const entity = byEntity.get(entityId)
            if (entity?.instance === undefined) continue
            placements.push({ instance: entity.instance, ...rigid3ToInstance(pose) })
          }
          if (report.outcome !== 'inconsistent') {
            converged++
            lastGood = placements
          }
          line = `frame ${frame}: value=${value.toFixed(3)} ${report.outcome} · ${placements.length} poses`
        } catch (error) {
          line = `frame ${frame}: value=${value.toFixed(3)} ✗ ${error instanceof Error ? error.message.slice(0, 120) : String(error)}`
        }
        table.push(line)
      }
      let applied = 0
      if (lastGood !== null && lastGood.length > 0) {
        applied = await applyPoses(ctx, lastGood)
      }
      const value: Record<string, unknown> = {
        frames: frameCount,
        converged,
        applied,
        viewId: `asm-${ctx.getDocument().doc.docId}`,
        instances: list.instances?.length ?? 0,
        ...docCounts(ctx),
        version: ctx.getDocument().doc.version,
        table: [`运动扫描: driver=约束${args.constraintId} ${args.from} → ${args.to} (${frameCount} 帧)`, ...table].join('\n'),
        ...sceneUrl(ctx),
      }
      return value as never
    },
    presentCall: (args) => ({ card: 'generic', title: `运动扫描 ${String(args.constraintId ?? '')}`.trim(), kind: 'other' }),
    presentResult: () => ({ card: 'generic', title: '运动扫描' }),
  }) as unknown as ToolDefinition

  return [cadConstraint, cadSolve, cadMotion]
}

function renderSolve(value: Record<string, unknown>, model: ConstraintModel | null, suggestions: string[]): string {
  const lines = [
    `求解: ${String(value.outcome)} · DOF 剩余 ${String(value.dofRemaining ?? '?')}/${String(value.dofTotal ?? '?')} · 最大残差 ${String(value.maxResidual ?? '?')} · 应用 ${String(value.applied)} 个位姿`,
  ]
  if (model !== null && model.constraints.length > 0) {
    lines.push(`模型: ${model.entities.length} 实体 · ${model.constraints.length} 约束 (${model.constraints.map((c) => `#${c.id} ${String(c.kind.type)}`).join(', ')})`)
  }
  for (const suggestion of suggestions.slice(0, 4)) lines.push(`建议: ${suggestion}`)
  return lines.join('\n')
}
