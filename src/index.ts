/**
 * dsh-cad host plugin: registers the `cad_view` / `cad_info` tools and the
 * same-origin scene route on the Web composition's shared HTTP server.
 *
 * The HTTP server is an optional backend: fibers may activate before the web
 * composition defines it (and headless never does), so the route registers
 * lazily at first `cad_view` execution — the platform's use-time-resolution
 * idiom rather than a hard inject.
 */
import type { Context } from '@deepseek-ai/cordis'
import { SceneStore } from './store.js'
import { BinarySceneStore } from './modeling/bin-store.js'
import { DocumentRegistry } from './modeling/registry.js'
import { registerSceneRoute, registerBinRoute, registerDemoRoute, registerDocsRoute, registerDocsDeleteRoute, registerAssemblyRoute, registerFeatureTreeRoute } from './routes.js'
import type { SceneRoute } from './routes.js'
import { createCadViewTool } from './tools/cad-view.js'
import { createCadInfoTool } from './tools/cad-info.js'
import { createModelTools } from './tools/cad-model.js'
import { createFreeCadTool } from './tools/cad-freecad.js'
import { createFusionTool } from './tools/cad-fusion.js'
import { createOnshapeTool } from './tools/cad-onshape.js'
import { createCadImageTool } from './tools/cad-image.js'
import { createCadScriptTool } from './tools/cad-script.js'

export const name = 'dsh-cad'

/** Hard dependencies: the tool registry. */
export const inject = ['tools']

export interface Config {
  /** Directory the scene spill store uses; defaults to the workspace root. */
  root?: string
}

export function apply(ctx: Context, config: Config = {}): void {
  const root = config.root ?? process.cwd()
  const store = new SceneStore(root)
  const binStore = new BinarySceneStore(root)
  const registry = new DocumentRegistry(process.cwd())
  const workspaceRoot = process.cwd()

  // The routes live on the host's shared webServer, which outlives this
  // plugin instance: hosts that hot-reload (the desktop runtime) re-run
  // apply() in the same process, and the server throws on duplicate
  // (kind, path). Every register disposer must therefore run on disposal —
  // leaking them makes the next apply() throw and breaks every
  // viewer-dependent tool call until a process restart.
  let routeDisposers: Array<() => void> = []
  /** Idempotently register the scene routes; returns the JSON base or null. */
  const ensureSceneRoute = (): string | null => {
    if (routeDisposers.length > 0) return '/dsh-cad/scene'
    const scope = ctx as { get?: (name: string) => unknown }
    const server = (scope.get?.('webServer') ?? scope.get?.('httpServer')) as
      | { register: (route: SceneRoute) => () => void }
      | undefined
    if (server === undefined) return null
    const pending: Array<() => void> = []
    try {
      pending.push(registerSceneRoute(server, store))
      pending.push(registerBinRoute(server, binStore))
      pending.push(registerDemoRoute(server))
      pending.push(registerDocsRoute(server, registry, binStore))
      pending.push(registerDocsDeleteRoute(server, registry))
      pending.push(registerAssemblyRoute(server, registry))
      pending.push(registerFeatureTreeRoute(server, registry))
    } catch (error) {
      // Roll back the partial batch, or the next attempt trips the duplicate
      // guard on the routes that did register.
      for (const dispose of pending) dispose()
      throw error
    }
    routeDisposers = pending
    return '/dsh-cad/scene'
  }

  // The demo route backs the CAD editor's startup fetch (before any tool
  // call), so registration must not wait for the first tool use. The web
  // composition may provide the HTTP server after our activation, so retry
  // briefly; fiber ordering decides the exact moment.
  let attempts = 0
  const retry = setInterval(() => {
    if (routeDisposers.length > 0 || ++attempts > 200) {
      clearInterval(retry)
      return
    }
    try {
      ensureSceneRoute()
    } catch {
      /* the lazy path (first tool use) still covers late availability */
    }
  }, 100)
  try {
    ensureSceneRoute()
  } catch {
    /* registers lazily at first tool use */
  }

  const cadView = createCadViewTool({ store, workspaceRoot, ensureSceneRoute })
  const cadInfo = createCadInfoTool({ workspaceRoot })
  const modelTools = createModelTools({ store: binStore, sceneStore: store, workspaceRoot, ensureSceneRoute, registry })
  const cadFreeCad = createFreeCadTool({ store: binStore, workspaceRoot, ensureSceneRoute })
  const cadFusion = createFusionTool({ store: binStore, workspaceRoot, ensureSceneRoute })
  const cadOnshape = createOnshapeTool({ store: binStore, workspaceRoot, ensureSceneRoute })
  const cadImage = createCadImageTool({ store, workspaceRoot, ensureSceneRoute })
  const cadScript = createCadScriptTool({ workspaceRoot })

  const disposers = [
    ctx.tools.register(cadView),
    ctx.tools.register(cadInfo),
    ...modelTools.map((tool) => ctx.tools.register(tool)),
    ctx.tools.register(cadFreeCad),
    ctx.tools.register(cadFusion),
    ctx.tools.register(cadOnshape),
    ctx.tools.register(cadImage),
    ctx.tools.register(cadScript),
  ]

  ctx.effect(() => {
    return () => {
      clearInterval(retry)
      for (const dispose of disposers) dispose()
      for (const dispose of routeDisposers) dispose()
      routeDisposers = []
    }
  })
}
