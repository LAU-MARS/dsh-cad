import type { IncomingMessage, ServerResponse } from 'node:http';
import type { SceneStore } from './store.js';
import type { BinarySceneStore } from './modeling/bin-store.js';
import type { DocumentRegistry } from './modeling/registry.js';
export declare const SCENE_ROUTE_PATH = "/dsh-cad/scene";
export declare const BIN_ROUTE_PATH = "/dsh-cad/bin";
export declare const DEMO_SCENE_ROUTE_PATH = "/dsh-cad/demo-scene";
export declare const DOCS_ROUTE_PATH = "/dsh-cad/docs";
export declare const DOCS_DELETE_ROUTE_PATH = "/dsh-cad/docs/delete";
export declare const ASSEMBLY_ROUTE_PATH = "/dsh-cad/asm";
export declare const FEATURE_TREE_ROUTE_PATH = "/dsh-cad/tree";
/** The built-in demo examples (packaged as lib/demo-<part>.brep). */
export declare const DEMO_PARTS: readonly ["bracket", "flange", "shaft"];
export type DemoPart = (typeof DEMO_PARTS)[number];
/** Register the scene route on the shared HTTP server. Returns a disposer. */
export declare function registerSceneRoute(server: {
    register: (route: SceneRoute) => () => void;
}, store: SceneStore): () => void;
interface SceneRoute {
    kind: 'prefix' | 'exact';
    path: string;
    handler: (req: IncomingMessage, res: ServerResponse) => void | Promise<void>;
}
/** Register the binary scene route. Returns a disposer. */
export declare function registerBinRoute(server: {
    register: (route: SceneRoute) => () => void;
}, store: BinarySceneStore): () => void;
/** Register the demo-scene route: GET /dsh-cad/demo-scene?part=<bracket|flange|shaft>. */
export declare function registerDemoRoute(server: {
    register: (route: SceneRoute) => () => void;
}): () => void;
/** Register the docs file-space route: GET /dsh-cad/docs (list documents). */
export declare function registerDocsRoute(server: {
    register: (route: SceneRoute) => () => void;
}, registry: DocumentRegistry, binStore: BinarySceneStore): () => void;
/** Register the docs delete route: POST /dsh-cad/docs/delete?id=<docId>. */
export declare function registerDocsDeleteRoute(server: {
    register: (route: SceneRoute) => () => void;
}, registry: DocumentRegistry): () => void;
/**
 * Register the assembly-tree route: GET /dsh-cad/asm/<docId> returns the
 * panel's PARTS + CONSTRAINTS data (instance names/colors, resolved
 * constraint rows), folded from the persisted op log — no worker round-trip,
 * so it keeps serving after restarts and for non-active documents.
 */
export declare function registerAssemblyRoute(server: {
    register: (route: SceneRoute) => () => void;
}, registry: DocumentRegistry): () => void;
export type { SceneRoute };
/**
 * Register the feature-tree route: GET /dsh-cad/tree/<docId> returns the Part
 * tab's structure panel (sketches + features in op order), folded from the
 * persisted op log — no worker round-trip, so it keeps serving after restarts
 * and for non-active documents (same pattern as the assembly tree).
 */
export declare function registerFeatureTreeRoute(server: {
    register: (route: SceneRoute) => () => void;
}, registry: DocumentRegistry): () => void;
