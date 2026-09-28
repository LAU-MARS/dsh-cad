/**
 * .dcprt converter: parse the native part document, replay its feature
 * history on the OCCT worker, and tessellate the rebuilt bodies into
 * indexed CadMeshes.
 *
 * Replay runs on the SHARED worker (via runModelOp): the opencascade.js WASM
 * heap is too large for a second concurrent instance. Every replay posts a
 * `reset`, which bumps the client's reset epoch — the live modeling session
 * detects the stale epoch and re-replays its own document before the next
 * modeling op, so out-of-band replays cannot corrupt the session.
 */
import type { CadMesh } from '../types.js';
/** Convert a .dcprt buffer to indexed CadMeshes by replaying its features. */
export declare function parseDcprt(buffer: Buffer, fallbackName: string, timeoutMs?: number): Promise<CadMesh[]>;
