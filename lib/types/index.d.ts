/**
 * dsh-cad host plugin: registers the `cad_view` / `cad_info` tools and the
 * same-origin scene route on the Web composition's shared HTTP server.
 *
 * The HTTP server is an optional backend: fibers may activate before the web
 * composition defines it (and headless never does), so the route registers
 * lazily at first `cad_view` execution — the platform's use-time-resolution
 * idiom rather than a hard inject.
 */
import type { Context } from '@deepseek-ai/cordis';
export declare const name = "dsh-cad";
/** Hard dependencies: the tool registry. */
export declare const inject: string[];
export interface Config {
    /**
     * Directory for the plugin's persistent state: the scene spill store, the
     * document file space (`.dsh-cad/docs/`), and the fallback root for
     * relative tool paths. Defaults to the launch directory — which equals the
     * workspace root only when the host is launched from the workspace; hosts
     * started elsewhere (issue #6) should set this explicitly.
     */
    root?: string;
}
export declare function apply(ctx: Context, config?: Config): void;
