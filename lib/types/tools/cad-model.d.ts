import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
import { DocumentRegistry } from '../modeling/registry.js';
import type { BinarySceneStore } from '../modeling/bin-store.js';
import type { SceneStore } from '../store.js';
export interface ModelToolDeps {
    store: BinarySceneStore;
    /** JSON scene store (drawing sheets). */
    sceneStore: SceneStore;
    workspaceRoot: string;
    ensureSceneRoute: () => string | null;
    /** The workspace document registry (file space + session bindings). */
    registry: DocumentRegistry;
}
/** Build the whole tool family over the document registry + worker + stores. */
export declare function createModelTools(deps: ModelToolDeps): ToolDefinition[];
export declare const MODEL_TOOL_NAMES: readonly ["cad_create_prim", "cad_sketch_new", "cad_sketch_edit", "cad_sketch_list", "cad_sketch_delete", "cad_extrude_profile", "cad_revolve", "cad_chamfer", "cad_shell", "cad_draft", "cad_pattern", "cad_loft", "cad_sweep", "cad_boolean", "cad_fillet", "cad_transform", "cad_export", "cad_delete", "cad_volume", "cad_drawing", "cad_assembly_insert", "cad_assembly_move", "cad_assembly_remove", "cad_docs", "cad_doc_new", "cad_doc_open", "cad_doc_rename", "cad_doc_delete", "cad_constraint", "cad_solve", "cad_motion"];
