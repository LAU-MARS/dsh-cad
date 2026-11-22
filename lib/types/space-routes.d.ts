import type { IncomingMessage, ServerResponse } from 'node:http';
import { DocumentRegistry } from './modeling/registry.js';
import type { SceneStore } from './store.js';
import type { BinarySceneStore } from './modeling/bin-store.js';
export declare const SPACE_ROUTE_PATH = "/dsh-cad/space";
interface SceneRoute {
    kind: 'prefix' | 'exact';
    path: string;
    handler: (req: IncomingMessage, res: ServerResponse) => void | Promise<void>;
}
export interface SpaceRouteDeps {
    server: {
        register: (route: SceneRoute) => () => void;
    };
    registry: DocumentRegistry;
    sceneStore: SceneStore;
    binStore: BinarySceneStore;
    workspaceRoot: string;
    ensureSceneRoute: () => string | null;
    /** Await-able existence checks (keeps `sceneUrlsFor` synchronous and honest). */
    binStoreHas: (viewId: string) => Promise<boolean>;
    sceneStoreHas: (viewId: string) => Promise<boolean>;
}
/** Register the CAD-space routes on the shared HTTP server. Returns a disposer. */
export declare function registerSpaceRoutes(deps: SpaceRouteDeps): () => void;
export {};
