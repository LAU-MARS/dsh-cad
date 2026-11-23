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
    /** Directory the scene spill store uses; defaults to the workspace root. */
    root?: string;
    /**
     * When the resident CAD pane opens itself (issue #14):
     * - `session`  — legacy: expand on every session switch (intrusive);
     * - `tool-use` — default: only where the conversation actually used CAD;
     * - `never`    — only the "+ → CAD 视图" menu entry.
     * The client half reads this through `GET /dsh-cad/ui-config`.
     */
    autoOpen?: 'session' | 'tool-use' | 'never';
}
export declare function apply(ctx: Context, config?: Config): void;
