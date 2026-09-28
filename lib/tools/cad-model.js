import { writeFile } from 'node:fs/promises';
import { defineTool } from '@deepseek-ai/dsh-tools';
import { runModelOp, workerResetEpoch } from '../modeling/client.js';
import { ModelDocument } from '../modeling/document.js';
import { composeAssemblyMeshes } from '../modeling/assembly.js';
import { buildDrawingSheet, drawingToDxf, drawingToSvg } from '../modeling/drawing.js';
import { resolveWorkspacePath } from './util.js';
import { toDcPrtDocument } from '../feature_script/dc_prt.js';
import { createConstraintTools } from './cad-constraint.js';
/** Mirror a worker mesh with its raw typed arrays (binary-transport ready). */
function mirrorMesh(mesh, bodyId) {
    return {
        name: mesh.name === '' ? bodyId : mesh.name,
        positions: mesh.positions,
        normals: mesh.normals,
        indices: mesh.indices,
    };
}
/** Build the whole tool family over the document registry + worker + stores. */
export function createModelTools(deps) {
    // The active document and its derived caches are swapped as a unit whenever
    // a session's binding points elsewhere (see resolveDoc). meshCache /
    // drawingSheets are cleared and rebuilt by replay.
    let document = new ModelDocument(deps.workspaceRoot);
    /** bodyId → raw worker mesh mirror (binary scene source, zero encoding). */
    const meshCache = new Map();
    /** sketchName → display payload { wire, points, fill } (repopulated by replay). */
    const sketchWires = new Map();
    /** Reset epoch after the last sync — out-of-band replays (cad_view on a
     *  .dcprt) bump the epoch and force a re-replay before the next op. */
    let syncedEpoch = -1;
    /** drawingId → rebuilt sheet (backing cad_export .svg/.dxf). */
    let drawingSheets = new Map();
    let lastDrawingId = null;
    /** Live constraint-model state (rebuilt from the op log on replay). */
    const constraintState = { model: null, lastSuggestions: [] };
    /**
     * Standard drawing views (GB first-angle): 主视图 front, 俯视图 top,
     * 左视图 left, 轴测 iso. Same constants as the worker's fallback.
     */
    const DRAWING_VIEWS = [
        { name: 'front', dir: [0, -1, 0], xDir: [1, 0, 0] },
        { name: 'top', dir: [0, 0, 1], xDir: [1, 0, 0] },
        { name: 'left', dir: [-1, 0, 0], xDir: [0, 1, 0] },
        { name: 'iso', dir: [1, -1, 1], xDir: [1, 1, 0] },
    ];
    /**
     * A second stable UUID derived from the document id (hex reversed + salted
     * version nibble): SceneStore's viewId regex demands UUID shape, while the
     * drawing scene must keep one stable viewId across re-draws/replays.
     */
    const siblingUuid = (salt) => {
        const hex = document.doc.docId.replace(/-/g, '').split('').reverse().join('');
        const salted = (hex.slice(0, 12) + salt + hex.slice(13)).slice(0, 32);
        return `${salted.slice(0, 8)}-${salted.slice(8, 12)}-${salted.slice(12, 16)}-${salted.slice(16, 20)}-${salted.slice(20, 32)}`;
    };
    /**
     * Replay a document's ops into the worker and rebuild the derived caches
     * (mesh mirror, drawing sheets, constraint model). The worker is always
     * reset first — also for empty documents, so a previous document's shapes
     * never leak in. Absorbs the old restoreOnce body.
     */
    async function replayActiveDoc() {
        await runModelOp({ kind: 'reset' });
        // Derived state belongs to the outgoing document: clear before replay so
        // a document without constraints/drawings never inherits the previous one's.
        constraintState.model = null;
        sketchWires.clear();
        /** Latest instances list seen while replaying (assembly re-publish below). */
        let replayedInstances = null;
        for (const op of document.doc.ops) {
            try {
                const result = await runModelOp(op);
                if (result.instances !== undefined)
                    replayedInstances = result.instances;
                // A replayed sketch re-discretizes its display payload (curves,
                // vertex dots, region fill) — cad_sketch_edit's rewrite path relies
                // on this to refresh the viewport.
                if (op.kind === 'sketch_set' && result.wire !== undefined) {
                    sketchWires.set(op.name, { wire: result.wire, points: result.points, fill: result.fill });
                }
                // A replayed constraint model returns to live state.
                if (op.kind === 'constraints') {
                    constraintState.model = op.model;
                }
                // A replayed drawing re-generates its sheet and re-publishes the
                // scene so the stable viewId keeps serving after restarts.
                if (op.kind === 'drawing' && op.sceneViewId !== undefined && result.views !== undefined) {
                    const sheet = buildDrawingSheet({ partName: op.name ?? op.target, views: result.views, paper: op.paper });
                    drawingSheets.set(op.sceneViewId, { sheet, partName: op.name ?? op.target });
                    lastDrawingId = op.sceneViewId;
                    await deps.sceneStore.putAt(op.sceneViewId, {
                        kind: '2d',
                        format: 'drawing',
                        entities: sheet.entities,
                        bounds: sheet.bounds,
                        layers: sheet.layers,
                    });
                }
            }
            catch {
                // A single stale op must not block recovery; later ops may be independent.
            }
        }
        if (document.doc.ops.length > 0) {
            const all = await runModelOp({ kind: 'tessellate_all' });
            meshCache.clear();
            for (const mesh of all.meshes ?? []) {
                meshCache.set(mesh.bodyId, mirrorMesh(mesh, mesh.bodyId));
            }
        }
        // Re-publish the assembly scene so a document opened after a restart shows
        // the composed (per-instance colored) assembly, not the stale disk mirror.
        if (replayedInstances !== null && deps.ensureSceneRoute() !== null) {
            await deps.store.publish(`asm-${document.doc.docId}`, composeAssemblyMeshes(meshCache, replayedInstances));
        }
        syncedEpoch = workerResetEpoch();
    }
    /** Swap the active document: restore from disk, reset the worker, replay. */
    async function activateDocument(next) {
        await next.restore();
        document = next;
        meshCache.clear();
        drawingSheets = new Map();
        lastDrawingId = null;
        await replayActiveDoc();
    }
    /** Session key from the tool run context (`_default` outside a session). */
    const sessionKeyOf = (exec) => {
        const agent = exec?.agent;
        return typeof agent?.id === 'string' && agent.id !== '' ? agent.id : '_default';
    };
    /**
     * Per-op entry point (replaces restoreOnce): resolve the calling session's
     * active document, switching documents (reset + replay) when its binding
     * points elsewhere, then re-sync when the worker was reset out of band.
     */
    async function resolveDoc(exec) {
        const sessionId = sessionKeyOf(exec);
        const bound = await deps.registry.bindingOf(sessionId);
        if (bound === null) {
            // Upgrade continuity: the first unbound session inherits the migrated
            // legacy document (if any) instead of starting from scratch.
            const legacy = await deps.registry.claimLegacyFor(sessionId);
            if (legacy !== null) {
                const doc = await deps.registry.open(legacy);
                if (doc !== null) {
                    await activateDocument(doc);
                    return;
                }
            }
            // Unbound session (new conversation): start on a fresh empty document.
            const fresh = await deps.registry.create();
            await deps.registry.bind(sessionId, fresh.doc.docId);
            await activateDocument(fresh);
            return;
        }
        if (bound !== document.doc.docId) {
            const next = await deps.registry.open(bound);
            if (next === null) {
                // Manifest entry without a document file — recover with a fresh doc.
                const fresh = await deps.registry.create();
                await deps.registry.bind(sessionId, fresh.doc.docId);
                await activateDocument(fresh);
                return;
            }
            await activateDocument(next);
            return;
        }
        if (syncedEpoch !== workerResetEpoch()) {
            await document.restore();
            await replayActiveDoc();
        }
    }
    /**
     * Sketch display meshes (Onshape-style viewport curves): a translucent
     * region fill (lighter than the lines), the blue profile curves as LINES
     * on z=0, TRUE vertex dots at the corners/ends, and a faint gray plane
     * frame around the bounding box. Names carry the `sketch:` prefix so the
     * feature tree's eye toggles can address them (`sketch:<name>[:plane|:fill|:pts]`).
     */
    const SKETCH_LINE_COLOR = 0x2f80d6;
    const SKETCH_FILL_COLOR = 0x74a9e0;
    const SKETCH_POINT_COLOR = 0x1c5fa8;
    const SKETCH_PLANE_COLOR = 0xb9c2cc;
    const polylineWireMesh = (name, color, flat) => {
        const positions = new Float32Array(flat);
        const segments = flat.length / 3 - 1;
        const indices = new Uint32Array(segments * 2);
        for (let i = 0, s = 0; i < segments; i++) {
            indices[s++] = i;
            indices[s++] = i + 1;
        }
        return { name, color, mode: 'wire', positions, indices };
    };
    const sketchWireMeshes = () => {
        const out = [];
        for (const [name, payload] of sketchWires) {
            // Translucent enclosed region (kernel-triangulated face).
            if (payload.fill !== undefined) {
                out.push({
                    name: `sketch:${name}:fill`,
                    color: SKETCH_FILL_COLOR,
                    mode: 'fill',
                    positions: new Float32Array(payload.fill.positions),
                    indices: new Uint32Array(payload.fill.indices),
                });
            }
            if (payload.wire !== undefined) {
                out.push(polylineWireMesh(`sketch:${name}`, SKETCH_LINE_COLOR, payload.wire));
            }
            // TRUE vertex dots (screen-constant size client-side).
            if (payload.points !== undefined && payload.points.length >= 3) {
                out.push({
                    name: `sketch:${name}:pts`,
                    color: SKETCH_POINT_COLOR,
                    mode: 'points',
                    positions: new Float32Array(payload.points),
                    indices: new Uint32Array(0),
                });
            }
            // Plane frame: the profile bbox padded 20%, drawn as a closed rectangle.
            if (payload.wire !== undefined) {
                const flat = payload.wire;
                let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                for (let i = 0; i + 2 < flat.length; i += 3) {
                    if (flat[i] < minX)
                        minX = flat[i];
                    if (flat[i] > maxX)
                        maxX = flat[i];
                    if (flat[i + 1] < minY)
                        minY = flat[i + 1];
                    if (flat[i + 1] > maxY)
                        maxY = flat[i + 1];
                }
                if (Number.isFinite(minX)) {
                    const pad = Math.max(2, 0.2 * Math.max(maxX - minX, maxY - minY));
                    const frame = [
                        minX - pad, minY - pad, 0, maxX + pad, minY - pad, 0,
                        maxX + pad, maxY + pad, 0, minX - pad, maxY + pad, 0,
                        minX - pad, minY - pad, 0,
                    ];
                    out.push(polylineWireMesh(`sketch:${name}:plane`, SKETCH_PLANE_COLOR, frame));
                }
            }
        }
        return out;
    };
    async function syncScene(op, result, filePath) {
        if (result.mesh !== undefined && result.bodyId !== undefined) {
            meshCache.set(result.bodyId, mirrorMesh(result.mesh, result.bodyId));
        }
        for (const mesh of result.meshes ?? []) {
            meshCache.set(mesh.bodyId, mirrorMesh(mesh, mesh.bodyId));
        }
        const removed = [...(result.removed ?? []), ...(result.deleted !== undefined ? [result.deleted] : [])];
        for (const id of removed)
            meshCache.delete(id);
        const nameEntry = result.bodyId !== undefined && result.name !== undefined ? { bodyId: result.bodyId, name: result.name } : null;
        await document.record(op, nameEntry);
        await deps.registry.touch(document.doc.docId, { opCount: document.doc.version, bodyCount: meshCache.size });
        const meshes = [...meshCache.values()];
        const triangles = meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0);
        const sceneUrlBase = deps.ensureSceneRoute();
        // Bodies + sketch display wires ride the SAME binary scene, so a version
        // bump (any op, cad_sketch_edit's replay included) refreshes both.
        const publishable = [...meshes, ...sketchWireMeshes()];
        if (publishable.length > 0) {
            // Direct worker→three.js transport: packed binary, in-memory, no file
            // write per step (a debounced disk mirror keeps restart replay).
            await deps.store.publish(document.doc.docId, publishable);
        }
        const value = {
            triangles,
            bodies: meshes.length,
            version: document.doc.version,
        };
        if (result.bodyId !== undefined)
            value.bodyId = result.bodyId;
        if (result.name !== undefined)
            value.name = result.name;
        if (removed.length > 0)
            value.removed = removed;
        if (result.volume !== undefined)
            value.volume = result.volume;
        if (filePath !== undefined)
            value.filePath = filePath;
        if (sceneUrlBase !== null) {
            value.sceneUrl = `${sceneUrlBase.replace('/scene', '/bin')}/${document.doc.docId}?v=${document.doc.version}`;
        }
        return value;
    }
    const nextBodyId = () => `b${document.doc.version + 1}`;
    const nextInstanceId = () => `a${document.doc.version + 1}`;
    /**
     * Assembly sync: compose instance meshes from the body cache (pure
     * transform math), publish the packed assembly scene under the stable
     * `asm-<docId>` viewId, and record the op. Runs instead of syncScene —
     * body geometry is untouched by assembly ops.
     */
    async function syncAssembly(op, result, filePath) {
        const instances = result.instances ?? [];
        const meshes = composeAssemblyMeshes(meshCache, instances);
        await document.record(op, null);
        await deps.registry.touch(document.doc.docId, { opCount: document.doc.version, bodyCount: meshCache.size });
        const sceneUrlBase = deps.ensureSceneRoute();
        if (sceneUrlBase !== null) {
            // Publish even when empty — removing the last instance must refresh the tab.
            await deps.store.publish(`asm-${document.doc.docId}`, meshes);
        }
        const triangles = meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0);
        const value = {
            instances: instances.length,
            triangles,
            bodies: meshCache.size,
            version: document.doc.version,
            viewId: `asm-${document.doc.docId}`,
        };
        if (result.instanceId !== undefined)
            value.instanceId = result.instanceId;
        if (filePath !== undefined)
            value.filePath = filePath;
        if (sceneUrlBase !== null) {
            value.sceneUrl = `${sceneUrlBase.replace('/scene', '/bin')}/asm-${document.doc.docId}?v=${document.doc.version}`;
        }
        return value;
    }
    /** Build + publish the drawing sheet for a replayed/executed drawing op. */
    async function publishDrawing(sceneViewId, partName, views, paper) {
        const sheet = buildDrawingSheet({
            partName,
            views: views ?? [],
            paper,
            drawingNo: `DSH-${String(document.doc.version).padStart(3, '0')}`,
            date: new Date().toISOString().slice(0, 10),
        });
        drawingSheets.set(sceneViewId, { sheet, partName });
        lastDrawingId = sceneViewId;
        await deps.sceneStore.putAt(sceneViewId, {
            kind: '2d',
            format: 'drawing',
            entities: sheet.entities,
            bounds: sheet.bounds,
            layers: sheet.layers,
        });
        return sheet;
    }
    /** Most recently created surviving body (default drawing/export target). */
    const lastBodyId = () => {
        const keys = [...meshCache.keys()];
        return keys[keys.length - 1];
    };
    // The model-facing render text: bodyId visibility is the load-bearing part.
    const renderModel = (value) => {
        const lines = [
            value.bodyId !== undefined
                ? `${String(value.name ?? value.bodyId)} → ${String(value.bodyId)} (version ${String(value.version)}, document: ${String(value.bodies)} bodies, ${String(value.triangles)} triangles)`
                : `document: ${String(value.bodies)} bodies, ${String(value.triangles)} triangles (version ${String(value.version)})`,
        ];
        if (Array.isArray(value.removed) && value.removed.length > 0)
            lines.push(`consumed bodies: ${value.removed.join(', ')}`);
        if (value.volume !== undefined)
            lines.push(`volume: ${Number(value.volume).toFixed(2)} mm³`);
        if (value.filePath !== undefined)
            lines.push(`written: ${String(value.filePath)}`);
        return lines.join('\n');
    };
    const metaOf = (value) => ({
        viewId: document.doc.docId,
        kind: '3d',
        format: 'model',
        file: 'modeling document',
        doc: 'part',
        ...(value.sceneUrl === undefined ? {} : { sceneUrl: String(value.sceneUrl) }),
        title: `CAD model · ${String(value.bodies)} ${value.bodies === 1 ? 'body' : 'bodies'}`,
        stats: {
            meshes: Number(value.bodies),
            triangles: Number(value.triangles),
        },
    });
    /** Presentation meta for assembly ops (kind 3d, doc assembly). */
    const assemblyMetaOf = (value) => ({
        viewId: String(value.viewId),
        kind: '3d',
        format: 'assembly',
        file: 'assembly',
        doc: 'assembly',
        ...(value.sceneUrl === undefined ? {} : { sceneUrl: String(value.sceneUrl) }),
        title: `装配体 · ${String(value.instances)} 实例`,
        stats: {
            meshes: Number(value.instances),
            triangles: Number(value.triangles),
        },
    });
    /** Presentation meta for drawing ops (kind 2d, doc drawing). */
    const drawingMetaOf = (value) => ({
        viewId: String(value.drawingId),
        kind: '2d',
        format: 'drawing',
        file: 'drawing',
        doc: 'drawing',
        ...(value.sceneUrl === undefined ? {} : { sceneUrl: String(value.sceneUrl) }),
        title: `工程图 · ${String(value.name ?? value.target)}`,
        stats: {
            entities: Number(value.entities),
        },
    });
    const renderAssembly = (value) => {
        const lines = [
            value.instanceId !== undefined
                ? `instance ${String(value.instanceId)} placed (assembly: ${String(value.instances)} instances, ${String(value.triangles)} triangles)`
                : `assembly: ${String(value.instances)} instances, ${String(value.triangles)} triangles`,
        ];
        if (value.filePath !== undefined)
            lines.push(`written: ${String(value.filePath)}`);
        return lines.join('\n');
    };
    const renderDrawing = (value) => {
        const lines = [
            `工程图 ${String(value.target)}: 主视图/俯视图/左视图/轴测 · OCCT 真实消隐 · 比例 ${String(value.scaleText ?? '')} · ${String(value.entities)} 实体 (version ${String(value.version)})`,
        ];
        if (value.filePath !== undefined)
            lines.push(`written: ${String(value.filePath)}`);
        return lines.join('\n');
    };
    const numberParam = (description) => ({ type: 'number', description });
    const pointParam = (description) => ({ type: 'array', items: { type: 'number' }, description });
    const bodyTarget = { type: 'string', required: true, description: 'BodyId to operate on.' };
    /** Optional fields every tool's schema declares (syncScene emits any subset). */
    const commonOptional = {
        name: { type: 'string', description: 'Body display name.' },
        removed: { type: 'array', items: { type: 'string' }, description: 'Bodies consumed by a boolean.' },
        volume: { type: 'number', description: 'Body volume in mm³.' },
        filePath: { type: 'string', description: 'Written file path (cad_export).' },
        sceneUrl: { type: 'string', description: 'Versioned viewer URL (web compositions).' },
    };
    const requiredCounts = {
        triangles: { type: 'number', required: true, description: 'Document triangle count.' },
        bodies: { type: 'number', required: true, description: 'Bodies in the document.' },
        version: { type: 'number', required: true, description: 'Document version (increments per op).' },
    };
    /** Schema shared by the assembly tool family. */
    const assemblySchema = {
        instances: { type: 'number', required: true, description: 'Instances in the assembly.' },
        instanceId: { type: 'string', description: 'Affected instance id.' },
        viewId: { type: 'string', description: 'Stable assembly scene viewId.' },
        triangles: { type: 'number', required: true, description: 'Assembly triangle count.' },
        bodies: { type: 'number', required: true, description: 'Bodies in the document.' },
        version: { type: 'number', required: true, description: 'Document version.' },
        filePath: { type: 'string', description: 'Written file path (cad_export).' },
        sceneUrl: { type: 'string', description: 'Versioned assembly scene URL (web compositions).' },
    };
    /** Schema for the drawing tool output. */
    const drawingSchema = {
        target: { type: 'string', required: true, description: 'Drawn bodyId.' },
        name: { type: 'string', description: 'Drawing/part display name.' },
        drawingId: { type: 'string', description: 'Stable drawing scene viewId.' },
        entities: { type: 'number', required: true, description: 'Sheet entity count.' },
        scale: { type: 'number', required: true, description: 'Standard-view scale (1 = full size).' },
        scaleText: { type: 'string', description: 'Scale as titled text (1:2 / 2:1).' },
        bodies: { type: 'number', required: true, description: 'Bodies in the document.' },
        triangles: { type: 'number', required: true, description: 'Document triangle count.' },
        version: { type: 'number', required: true, description: 'Document version.' },
        filePath: { type: 'string', description: 'Written file path (cad_export).' },
        sceneUrl: { type: 'string', description: 'Versioned drawing scene URL (web compositions).' },
    };
    const cadCreatePrim = defineTool({
        name: 'cad_create_prim',
        description: 'Create a parametric primitive in the shared modeling document (mm, Z-up). Kinds: box (dx,dy,dz), cylinder (radius,height), sphere (radius), cone (radius1,radius2,height), torus (majorRadius,minorRadius). ' +
            '`at` is the anchor point with per-kind semantics: box → min corner (the solid spans at .. at+[dx,dy,dz] along +X/+Y/+Z); cylinder/cone → base-circle center (the solid extends `height` from it along `axis`); sphere/torus → geometric center. ' +
            '`axis` orients cylinder/cone/torus (default +Z). Returns the bodyId other CAD tools reference. The viewer card updates after every call.',
        parameters: {
            kind: { type: 'string', required: true, enum: ['box', 'cylinder', 'sphere', 'cone', 'torus'], description: 'Primitive kind.' },
            dx: numberParam('box: size X (mm).'),
            dy: numberParam('box: size Y (mm).'),
            dz: numberParam('box: size Z (mm).'),
            radius: numberParam('cylinder/sphere: radius (mm).'),
            radius1: numberParam('cone: base radius (mm).'),
            radius2: numberParam('cone: top radius (mm, 0 = pointed).'),
            height: numberParam('cylinder/cone: height (mm).'),
            majorRadius: numberParam('torus: center radius (mm).'),
            minorRadius: numberParam('torus: tube radius (mm).'),
            at: pointParam('anchor [x,y,z] (mm): box = min corner, cylinder/cone = base-circle center, sphere/torus = geometric center.'),
            axis: pointParam('axis direction [x,y,z] for cylinder/cone/torus.'),
            name: { type: 'string', description: 'Optional display name.' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    bodyId: { type: 'string', required: true, description: 'Stable body reference.' },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const bodyId = nextBodyId();
            const params = args;
            const op = { kind: 'create_prim', bodyId, prim: args.kind, params, name: args.name };
            const result = await runModelOp(op);
            return syncScene(op, result);
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD create ${String(args.kind)}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD create' }),
    });
    // ── named sketches (Sketch1…) — standalone, editable profiles ─────────────
    /** Feature ops referencing a named sketch (for referrer scans / edit reports). */
    const sketchReferrers = (name) => {
        const out = [];
        for (const op of document.doc.ops) {
            if ('sketch' in op && op.sketch === name)
                out.push(op.bodyId);
        }
        return out;
    };
    /** Sketch definitions in log order (last set wins, deletes remove). */
    const sketchesInLog = () => {
        const byName = new Map();
        for (const op of document.doc.ops) {
            if (op.kind === 'sketch_set')
                byName.set(op.name, op.profile);
            else if (op.kind === 'sketch_delete')
                byName.delete(op.name);
        }
        return [...byName].map(([name, profile]) => ({ name, profile }));
    };
    /** Compact profile summary for cad_sketch_list output. */
    const sketchProfileStats = (profile) => {
        if (Array.isArray(profile))
            return { type: 'polygon', points: profile.length / 2 };
        if (profile !== null && typeof profile === 'object') {
            const record = profile;
            if (record.circle !== undefined) {
                return { type: 'circle', radius: record.circle.radius };
            }
            const segments = Array.isArray(record.segments) ? record.segments.length : 0;
            return { type: 'segments', segments };
        }
        return { type: 'unknown' };
    };
    const cadSketchNew = defineTool({
        name: 'cad_sketch_new',
        description: 'Create a NAMED sketch (e.g. Sketch1) — a standalone, editable profile kept in the modeling document AND RENDERED IN THE VIEWPORT as blue curves + a plane frame (Onshape-style; refreshes on every edit, listed in the left feature tree with an eye toggle). Same profile forms as cad_extrude_profile: {start: [x,y], segments: […]} curve segments, {circle: {center, radius}}, or a legacy flat points loop. ' +
            'Features then reference it BY NAME (cad_extrude_profile / cad_revolve / cad_sweep `sketch` param), and cad_sketch_edit redefines it with every dependent feature rebuilt — the parametric loop.',
        parameters: {
            profile: { type: 'json', required: true, description: 'Profile: {start:[x,y], segments:[…]} | {circle:{center:[x,y], radius}} | flat [x0,y0,…] loop.' },
            name: { type: 'string', description: 'Sketch name (default Sketch<N>, auto-numbered).' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    sketch: { type: 'string', required: true, description: 'The sketch name (as referenced by features).' },
                    type: { type: 'string', required: true, description: 'Profile form: polygon | segments | circle.' },
                    points: { type: 'number', description: 'Polygon point count.' },
                    segments: { type: 'number', description: 'Curve-segment count.' },
                    radius: { type: 'number', description: 'Circle radius (mm).' },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const existing = new Set(sketchesInLog().map((entry) => entry.name));
            let n = existing.size + 1;
            while (existing.has(`Sketch${n}`))
                n += 1;
            const name = typeof args.name === 'string' && args.name !== '' ? args.name : `Sketch${n}`;
            if (existing.has(name))
                throw new Error(`sketch already exists: ${name} — use cad_sketch_edit to redefine it`);
            const op = { kind: 'sketch_set', name, profile: args.profile };
            const result = await runModelOp(op);
            if (result.wire !== undefined) {
                sketchWires.set(name, { wire: result.wire, points: result.points, fill: result.fill });
            }
            const value = await syncScene(op, result);
            return { sketch: name, ...sketchProfileStats(args.profile), ...value };
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD sketch ${String(args.name ?? 'new')}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD sketch created' }),
    });
    const cadSketchEdit = defineTool({
        name: 'cad_sketch_edit',
        description: 'Redefine a named sketch (回改): the document op is rewritten in place and the whole log replayed, so EVERY feature referencing the sketch (extrude/revolve/sweep via their `sketch` param) rebuilds with the new profile — and the viewport\'s blue sketch curves + plane frame update to match. Use for parametric iteration: change Sketch1, the extrusion follows.',
        parameters: {
            name: { type: 'string', required: true, description: 'The sketch to redefine (must exist).' },
            profile: { type: 'json', required: true, description: 'The new profile (same forms as cad_sketch_new).' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    sketch: { type: 'string', required: true, description: 'The redefined sketch name.' },
                    dependents: { type: 'array', items: { type: 'string' }, description: 'BodyIds rebuilt because they reference the sketch.' },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const name = String(args.name ?? '');
            const dependents = sketchReferrers(name);
            if (!(await document.rewriteSketch(name, args.profile))) {
                throw new Error(`unknown sketch: ${name} — create it with cad_sketch_new`);
            }
            // The rewritten definition still precedes its consumers in the log, so
            // the full replay recomputes every dependent feature with the new profile.
            await replayActiveDoc();
            const meshes = [...meshCache.values(), ...sketchWireMeshes()];
            if (meshes.length > 0)
                await deps.store.publish(document.doc.docId, meshes);
            await deps.registry.touch(document.doc.docId, { opCount: document.doc.version, bodyCount: meshCache.size });
            const triangles = meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0);
            const value = {
                sketch: name,
                dependents,
                bodies: meshes.length,
                triangles,
                version: document.doc.version,
            };
            const sceneUrlBase = deps.ensureSceneRoute();
            if (sceneUrlBase !== null) {
                value.sceneUrl = `${sceneUrlBase.replace('/scene', '/bin')}/${document.doc.docId}?v=${document.doc.version}`;
            }
            return value;
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD sketch edit ${String(args.name ?? '')}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD sketch edited' }),
    });
    const cadSketchList = defineTool({
        name: 'cad_sketch_list',
        description: 'List the document\'s named sketches: name, profile form and size. Read-only.',
        parameters: {},
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    sketches: {
                        type: 'array',
                        required: true,
                        description: 'One entry per sketch.',
                        items: {
                            type: 'object',
                            additionalProperties: false,
                            properties: {
                                name: { type: 'string', required: true, description: 'Sketch name.' },
                                type: { type: 'string', required: true, description: 'polygon | segments | circle.' },
                                points: { type: 'number', description: 'Polygon point count.' },
                                segments: { type: 'number', description: 'Curve-segment count.' },
                                radius: { type: 'number', description: 'Circle radius (mm).' },
                            },
                        },
                    },
                    ...requiredCounts,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
        },
        isConcurrencySafe: () => true,
        async execute(_args, exec) {
            await resolveDoc(exec);
            const meshes = [...meshCache.values()];
            const sketches = sketchesInLog().map(({ name, profile }) => ({ name, ...sketchProfileStats(profile) }));
            return {
                sketches,
                bodies: meshes.length,
                triangles: meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0),
                version: document.doc.version,
            };
        },
        presentCall: () => ({ card: 'generic', title: 'CAD sketch list', kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD sketches' }),
    });
    const cadSketchDelete = defineTool({
        name: 'cad_sketch_delete',
        description: 'Permanently delete a named sketch. Refused while features still reference it (delete those bodies first, or redefine the sketch with cad_sketch_edit).',
        parameters: {
            name: { type: 'string', required: true, description: 'The sketch to delete.' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    sketch: { type: 'string', required: true, description: 'The deleted sketch name.' },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const name = String(args.name ?? '');
            const referrers = sketchReferrers(name);
            if (referrers.length > 0) {
                throw new Error(`sketch ${name} is referenced by ${referrers.join(', ')} — delete those bodies first or redefine the sketch with cad_sketch_edit`);
            }
            const op = { kind: 'sketch_delete', name };
            const result = await runModelOp(op); // unknown sketch → error, nothing recorded
            sketchWires.delete(name);
            const value = await syncScene(op, result);
            return { sketch: name, ...value };
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD sketch delete ${String(args.name ?? '')}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD sketch deleted' }),
    });
    const cadExtrude = defineTool({
        name: 'cad_extrude_profile',
        description: 'Create a solid by extruding a closed profile in the XY plane along +Z (mm). `profile` accepts CURVE SEGMENTS — {start: [x,y], segments: [{type: "line"|"arc"|"bspline", …}]} (arc: to/center/ccw; bspline: through-points, sampled smooth curve) — or {circle: {center, radius}} for a round profile. ' +
            'The legacy flat `points` polygon loop (≥3 points, auto-closed) still works. Alternatively pass `sketch` (a named sketch from cad_sketch_new) instead of an inline profile — editing the sketch then rebuilds this body (cad_sketch_edit). Use cad_boolean for holes.',
        parameters: {
            points: { type: 'array', items: { type: 'number' }, description: 'Legacy flat [x0,y0,x1,y1,…] polygon loop (mm).' },
            profile: { type: 'json', description: 'Curve-segment profile: {start:[x,y], segments:[…]} or {circle:{center:[x,y], radius}}.' },
            sketch: { type: 'string', description: 'Named sketch (cad_sketch_new) to extrude — replaces points/profile; cad_sketch_edit rebuilds this body.' },
            height: { type: 'number', description: 'Extrusion height (mm, default 10).' },
            base: { type: 'number', description: 'Z of the profile plane (mm, default 0).' },
            name: { type: 'string', description: 'Optional display name.' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    bodyId: { type: 'string', required: true },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            if (args.sketch === undefined && args.profile === undefined && (args.points === undefined || args.points.length < 6 || args.points.length % 2 !== 0)) {
                throw new Error('provide a curve-segment `profile` object, a flat points array of ≥3 [x,y] pairs, or a named `sketch`');
            }
            const bodyId = nextBodyId();
            const op = {
                kind: 'extrude_profile', bodyId,
                ...(args.sketch !== undefined ? { sketch: String(args.sketch) } : args.profile !== undefined ? { profile: args.profile } : { points: args.points }),
                height: args.height, base: args.base, name: args.name,
            };
            const result = await runModelOp(op);
            return syncScene(op, result);
        },
        presentCall: () => ({ card: 'generic', title: 'CAD extrude profile', kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD extrude' }),
    });
    const cadLoft = defineTool({
        name: 'cad_loft',
        description: 'Loft (放样): skin a solid through successive closed sections. `sections` is a list of ≥2 loops, each a flat [x0,y0,z0, x1,y1,z1, …] triplet list in its own plane (≥3 points, auto-closed), ordered along the loft. ' +
            'Sections may differ in shape and point count (e.g. a square lofted to a hexagon). `ruled` keeps the sides straight instead of smoothing. ' +
            'Each result passes a BRepCheck validity gate: a self-intersecting or degenerate loft is rejected with a clear message instead of storing an unusable body.',
        parameters: {
            sections: {
                type: 'array',
                required: true,
                description: 'Ordered sections, each a flat [x,y,z,…] loop (≥9 numbers).',
                items: { type: 'array', items: { type: 'number' }, description: 'One closed section loop.' },
            },
            ruled: { type: 'boolean', description: 'Straight (ruled) sides instead of a smoothed surface (default false).' },
            solid: { type: 'boolean', description: 'Cap the ends into a solid (default true).' },
            name: { type: 'string', description: 'Optional display name.' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    bodyId: { type: 'string', required: true },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            if (!Array.isArray(args.sections) || args.sections.length < 2)
                throw new Error('sections must list at least 2 closed loops');
            const bodyId = nextBodyId();
            const op = { kind: 'loft', bodyId, sections: args.sections, solid: args.solid, ruled: args.ruled, name: args.name };
            const result = await runModelOp(op);
            return syncScene(op, result);
        },
        presentCall: () => ({ card: 'generic', title: 'CAD loft', kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD loft' }),
    });
    const cadSweep = defineTool({
        name: 'cad_sweep',
        description: 'Sweep (扫掠): pipe a closed 2D profile along a 3D path. `profile` is a flat [x0,y0, x1,y1, …] outline (≥3 points, auto-closed) placed in the plane PERPENDICULAR TO THE PATH\'S START TANGENT, so the outline\'s 2D axes map onto that plane — no manual orientation needed. ' +
            '`path` is a flat [x0,y0,z0, …] polyline. Straight, collinear and gently curved paths give exact solids; a SHARP direction change with a section large relative to the corner self-intersects — such a result is REJECTED by the BRepCheck validity gate (the error names the cause), so round or chamfer the corners in the path.',
        parameters: {
            profile: { type: 'json', required: true, description: 'Closed outline on the start plane: flat [x,y,…] array, {start, segments:[…]} curve chain, or {circle:{center,radius}}.' },
            sketch: { type: 'string', description: 'Named sketch (cad_sketch_new) to sweep — replaces the inline profile; cad_sketch_edit rebuilds this body.' },
            path: { type: 'array', required: true, items: { type: 'number' }, description: 'Sweep path as [x,y,z,…] triplets (≥6 numbers).' },
            name: { type: 'string', description: 'Optional display name.' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    bodyId: { type: 'string', required: true },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const bodyId = nextBodyId();
            const op = {
                kind: 'sweep', bodyId,
                ...(args.sketch !== undefined ? { sketch: String(args.sketch) } : { profile: args.profile }),
                path: args.path, name: args.name,
            };
            const result = await runModelOp(op);
            return syncScene(op, result);
        },
        presentCall: () => ({ card: 'generic', title: 'CAD sweep', kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD sweep' }),
    });
    const cadRevolve = defineTool({
        name: 'cad_revolve',
        description: 'Revolve (旋转): sweep a closed 2D profile around an axis into a solid of revolution — shafts, wheels, vases, cones, spheres. Profile coordinates are (radius, height) relative to the axis: with the default +Z axis, profile [x,y] means radius x at height y. ' +
            'Accepts the same curve-segment profiles as cad_extrude_profile (lines/arcs/bspline/circle), so rounded rims are exact. `angle` in degrees (default 360).',
        parameters: {
            profile: { type: 'json', required: true, description: 'Profile in (radius, height): flat [r0,h0, r1,h1,…] loop, {start, segments:[…]}, or {circle:{center,radius}}.' },
            sketch: { type: 'string', description: 'Named sketch (cad_sketch_new) to revolve — replaces the inline profile; cad_sketch_edit rebuilds this body.' },
            angle: { type: 'number', description: 'Sweep angle in degrees (default 360).' },
            axis: { type: 'array', items: { type: 'number' }, description: 'Revolve axis direction [x,y,z] (default +Z).' },
            at: { type: 'array', items: { type: 'number' }, description: 'A point the axis passes through [x,y,z] (default origin).' },
            name: { type: 'string', description: 'Optional display name.' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    bodyId: { type: 'string', required: true },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const bodyId = nextBodyId();
            const op = {
                kind: 'revolve', bodyId,
                ...(args.sketch !== undefined ? { sketch: String(args.sketch) } : { profile: args.profile }),
                ...(args.angle !== undefined ? { angle: (args.angle * Math.PI) / 180 } : {}),
                ...(Array.isArray(args.axis) ? { axis: args.axis } : {}),
                ...(Array.isArray(args.at) ? { at: args.at } : {}),
                ...(args.name !== undefined ? { name: args.name } : {}),
            };
            const result = await runModelOp(op);
            return syncScene(op, result);
        },
        presentCall: () => ({ card: 'generic', title: 'CAD revolve', kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD revolve' }),
    });
    const cadChamfer = defineTool({
        name: 'cad_chamfer',
        description: 'Chamfer (倒角): bevel every sharp edge of a body with one equal distance (mm). Fails when the distance exceeds the adjacent faces.',
        parameters: {
            target: bodyTarget,
            distance: { type: 'number', required: true, description: 'Chamfer distance (mm).' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    bodyId: { type: 'string', required: true },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const op = { kind: 'chamfer', target: args.target, distance: args.distance };
            const result = await runModelOp(op);
            return syncScene(op, result);
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD chamfer ${String(args.target)}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD chamfer' }),
    });
    const cadShell = defineTool({
        name: 'cad_shell',
        description: 'Shell (抽壳): hollow a solid into a wall of `thickness` mm (the wall grows inward, the outer skin is preserved). `open` lists outward NORMALS [x,y,z] whose faces become openings (e.g. [[0,0,1]] opens the top of a box; empty = sealed hollow). ' +
            'Runs on the occt.ts kernel (>= 0.3.0): the result becomes a HOSTED body — volume/export(.step)/display keep working, but opencascade.js-only edits (fillet/chamfer/loft/sweep/revolve/boolean) on it are refused, so do those before shelling.',
        parameters: {
            target: bodyTarget,
            thickness: { type: 'number', required: true, description: 'Wall thickness (mm, positive).' },
            open: { type: 'array', items: { type: 'array', items: { type: 'number' } }, description: 'Outward normals of the faces to open, e.g. [[0,0,1]].' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    bodyId: { type: 'string', required: true },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const op = { kind: 'shell', target: args.target, thickness: args.thickness, ...(Array.isArray(args.open) ? { openNormals: args.open } : {}) };
            const result = await runModelOp(op);
            return syncScene(op, result);
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD shell ${String(args.target)}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD shell' }),
    });
    const cadDraft = defineTool({
        name: 'cad_draft',
        description: 'Draft (拔模): tilt the walls of a solid by `angle` degrees for mold release — faces pivot about a neutral plane, dimensions there unchanged. `direction` is the pull direction (default +Z); by default the faces parallel to it (the walls) are drafted. ' +
            'Runs on the occt.ts kernel (>= 0.3.0): the result becomes a HOSTED body (same caveats as cad_shell).',
        parameters: {
            target: bodyTarget,
            angle: { type: 'number', required: true, description: 'Draft angle in degrees (positive opens the walls toward the pull direction).' },
            direction: { type: 'array', items: { type: 'number' }, description: 'Pull direction [x,y,z] (default +Z).' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    bodyId: { type: 'string', required: true },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const op = { kind: 'draft', target: args.target, angle: args.angle, ...(Array.isArray(args.direction) ? { direction: args.direction } : {}) };
            const result = await runModelOp(op);
            return syncScene(op, result);
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD draft ${String(args.target)} ${String(args.angle ?? '')}°`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD draft' }),
    });
    const cadPattern = defineTool({
        name: 'cad_pattern',
        description: 'Pattern (阵列): replicate a body into `count` total placements. Linear: `delta` [dx,dy,dz] spacing per copy. Circular: rotate copies around a principal axis (+X/+Y/+Z) through `at` over `angle` degrees (default 360). Creates new bodies (target·1 … target·(count−1)); fuse afterwards for a single body.',
        parameters: {
            target: bodyTarget,
            mode: { type: 'string', required: true, enum: ['linear', 'circular'], description: 'Pattern mode.' },
            count: { type: 'number', required: true, description: 'Total placements (≥2).' },
            delta: { type: 'array', items: { type: 'number' }, description: 'linear: spacing [dx,dy,dz] per copy (mm).' },
            axis: { type: 'array', items: { type: 'number' }, description: 'circular: principal axis [x,y,z] (default +Z).' },
            at: { type: 'array', items: { type: 'number' }, description: 'circular: axis point [x,y,z] (default origin).' },
            angle: { type: 'number', description: 'circular: total sweep in degrees (default 360).' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    bodyId: { type: 'string', required: true },
                    created: { type: 'array', items: { type: 'string' }, required: true, description: 'Ids of the newly created copy bodies.' },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) + '\ncreated: ' + value.created.join(', ') }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            if (args.mode === 'linear' && !Array.isArray(args.delta))
                throw new Error('linear patterns need delta: [dx,dy,dz]');
            const op = {
                kind: 'pattern', target: args.target, mode: args.mode, count: args.count,
                ...(Array.isArray(args.delta) ? { delta: args.delta } : {}),
                ...(Array.isArray(args.axis) ? { axis: args.axis } : {}),
                ...(Array.isArray(args.at) ? { at: args.at } : {}),
                ...(args.angle !== undefined ? { angle: args.angle } : {}),
            };
            const result = await runModelOp(op);
            const created = (result.created ?? []).map((entry) => {
                if (entry.mesh !== undefined)
                    meshCache.set(entry.bodyId, mirrorMesh(entry.mesh, entry.bodyId));
                return entry.bodyId;
            });
            await document.record(op, null);
            const meshes = [...meshCache.values()];
            const sceneUrlBase = deps.ensureSceneRoute();
            if (sceneUrlBase !== null && meshes.length > 0) {
                await deps.store.publish(document.doc.docId, meshes);
            }
            const value = {
                bodyId: args.target,
                created,
                triangles: meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0),
                bodies: meshes.length,
                version: document.doc.version,
                ...(sceneUrlBase !== null ? { sceneUrl: `${sceneUrlBase.replace('/scene', '/bin')}/${document.doc.docId}?v=${document.doc.version}` } : {}),
            };
            return value;
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD ${String(args.mode ?? '')} pattern ×${String(args.count ?? '')}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD pattern' }),
    });
    const cadBoolean = defineTool({
        name: 'cad_boolean',
        description: 'Boolean-combine bodies: fuse (union), cut (subtract tools from target), common (intersection). Consumed tool bodies are removed; the result keeps the target bodyId. Classic pattern for holes: cut a cylinder from a plate.',
        parameters: {
            op: { type: 'string', required: true, enum: ['fuse', 'cut', 'common'], description: 'Boolean operation.' },
            target: { type: 'string', required: true, description: 'BodyId kept as the result.' },
            tools: { type: 'array', required: true, items: { type: 'string' }, description: 'BodyIds combined into the target.' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    bodyId: { type: 'string', required: true },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const op = { kind: 'boolean', op: args.op, target: args.target, tools: args.tools };
            const result = await runModelOp(op);
            return syncScene(op, result);
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD ${String(args.op)} ${String(args.target)}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD boolean' }),
    });
    const cadFillet = defineTool({
        name: 'cad_fillet',
        description: 'Round every sharp edge of a body with one radius (mm). Fails when the radius exceeds the adjacent faces.',
        parameters: {
            target: bodyTarget,
            radius: { type: 'number', required: true, description: 'Fillet radius (mm).' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    bodyId: { type: 'string', required: true },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const op = { kind: 'fillet', target: args.target, radius: args.radius };
            const result = await runModelOp(op);
            return syncScene(op, result);
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD fillet ${String(args.target)}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD fillet' }),
    });
    const cadTransform = defineTool({
        name: 'cad_transform',
        description: 'Move/rotate/mirror a body (mm, degrees, Z-up). Applies in order: translate → rotate (XYZ Euler degrees) → mirror (plane through the origin by normal).',
        parameters: {
            target: bodyTarget,
            translate: pointParam('translation [x,y,z] (mm).'),
            rotate: pointParam('rotation [rx,ry,rz] (degrees, XYZ Euler).'),
            mirror: pointParam('mirror plane normal [x,y,z] through the origin.'),
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    bodyId: { type: 'string', required: true },
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const op = {
                kind: 'transform',
                target: args.target,
                translate: args.translate,
                rotate: args.rotate,
                mirror: args.mirror,
            };
            const result = await runModelOp(op);
            return syncScene(op, result);
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD transform ${String(args.target)}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD transform' }),
    });
    const cadExport = defineTool({
        name: 'cad_export',
        description: 'Export to a workspace path (extension selects format): .step / .stl of a body, or .dcprt (the native replayable part document). ' +
            'target "assembly" exports the whole assembly (STEP assembly of transformed instances). ' +
            'target "drawing" exports the latest drawing sheet (.svg vector / .dxf exchange).',
        parameters: {
            target: { type: 'string', description: 'BodyId; "assembly" for the whole assembly; "drawing" for the latest sheet (required for .step/.stl; unused for .dcprt).' },
            path: { type: 'string', required: true, description: 'Destination file path (extension selects format).' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    ...requiredCounts,
                    ...commonOptional,
                    instances: { type: 'number', description: 'Assembly instance count (assembly export).' },
                    viewId: { type: 'string', description: 'Assembly scene viewId (assembly export).' },
                    target: { type: 'string', description: 'Exported target: bodyId, "assembly", or "drawing".' },
                    drawingId: { type: 'string', description: 'Drawing scene viewId (drawing export).' },
                    entities: { type: 'number', description: 'Sheet entity count (drawing export).' },
                    scale: { type: 'number', description: 'Standard-view scale (drawing export).' },
                    scaleText: { type: 'string', description: 'Scale as titled text (drawing export).' },
                    filePath: { type: 'string', required: true, description: 'Written file path.' },
                },
            },
            render: (_args, value) => [{
                    type: 'text',
                    text: value.viewId !== undefined && String(value.viewId).startsWith('asm-')
                        ? renderAssembly(value)
                        : renderModel(value),
                }],
            presentationMeta: (_args, value) => {
                const record = value;
                if (typeof record.viewId === 'string' && record.viewId.startsWith('asm-'))
                    return assemblyMetaOf(record);
                return metaOf(record);
            },
        },
        isConcurrencySafe: () => true,
        async execute(args, exec) {
            await resolveDoc(exec);
            const resolved = resolveWorkspacePath(args.path, deps.workspaceRoot);
            const lower = args.path.toLowerCase();
            // Assembly export: compound of transformed instances via the worker.
            if (args.target === 'assembly') {
                const format = lower.endsWith('.stl') ? 'stl' : 'step';
                const op = { kind: 'export_assembly', format };
                const result = await runModelOp(op);
                if (result.bytes === undefined)
                    throw new Error('assembly export produced no data');
                await writeFile(resolved, Buffer.from(result.bytes));
                return syncAssembly(op, result, resolved);
            }
            // Drawing export: serialize the latest rebuilt sheet — no op recorded
            // (pure export, same convention as .dcprt).
            if (args.target === 'drawing') {
                if (lastDrawingId === null)
                    throw new Error('no drawing yet — call cad_drawing first');
                const entry = drawingSheets.get(lastDrawingId);
                if (entry === undefined)
                    throw new Error('drawing sheet is unavailable');
                if (lower.endsWith('.dxf'))
                    await writeFile(resolved, drawingToDxf(entry.sheet), 'utf8');
                else if (lower.endsWith('.svg'))
                    await writeFile(resolved, drawingToSvg(entry.sheet), 'utf8');
                else
                    throw new Error('drawing export supports .svg and .dxf paths');
                const meshes = [...meshCache.values()];
                const sceneUrlBase = deps.ensureSceneRoute();
                const value = {
                    target: 'drawing',
                    name: entry.partName,
                    drawingId: lastDrawingId,
                    entities: entry.sheet.entityCount,
                    scale: entry.sheet.scale,
                    scaleText: entry.sheet.scale >= 1 ? `${entry.sheet.scale}:1` : `1:${Math.round(1 / entry.sheet.scale * 100) / 100}`,
                    bodies: meshes.length,
                    triangles: meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0),
                    version: document.doc.version,
                    filePath: resolved,
                };
                if (sceneUrlBase !== null)
                    value.sceneUrl = `/dsh-cad/scene/${lastDrawingId}?v=${document.doc.version}`;
                return value;
            }
            // .dcprt serializes the whole document on the main thread — no worker
            // op (that path exports one body's geometry), no entry in the log.
            if (lower.endsWith('.dcprt')) {
                if (document.doc.ops.length === 0)
                    throw new Error('nothing to export — the modeling document is empty');
                await writeFile(resolved, JSON.stringify(toDcPrtDocument(document.doc)));
                const meshes = [...meshCache.values()];
                const value = {
                    triangles: meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0),
                    bodies: meshes.length,
                    version: document.doc.version,
                    filePath: resolved,
                };
                const sceneUrlBase = deps.ensureSceneRoute();
                if (sceneUrlBase !== null) {
                    value.sceneUrl = `${sceneUrlBase.replace('/scene', '/bin')}/${document.doc.docId}?v=${document.doc.version}`;
                }
                return value;
            }
            if (args.target === undefined)
                throw new Error('target is required for .step/.stl exports');
            const format = lower.endsWith('.stl') ? 'stl' : 'step';
            const op = { kind: 'export', target: args.target, format };
            const result = await runModelOp(op);
            if (result.bytes === undefined)
                throw new Error('export produced no data');
            await writeFile(resolved, Buffer.from(result.bytes));
            return syncScene(op, result, resolved);
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD export ${String(args.path)}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD export' }),
    });
    const cadDelete = defineTool({
        name: 'cad_delete',
        description: 'Delete a body from the modeling document.',
        parameters: {
            target: bodyTarget,
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    ...requiredCounts,
                    ...commonOptional,
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const op = { kind: 'delete', target: args.target };
            const result = await runModelOp(op);
            return syncScene(op, result);
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD delete ${String(args.target)}`, kind: 'delete' }),
        presentResult: () => ({ card: 'generic', title: 'CAD delete' }),
    });
    const cadVolume = defineTool({
        name: 'cad_volume',
        description: "Report a body's exact BRep volume in mm³.",
        parameters: {
            target: bodyTarget,
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    ...requiredCounts,
                    ...commonOptional,
                    volume: { type: 'number', required: true, description: 'Volume (mm³).' },
                    centroid: { type: 'array', items: { type: 'number' }, description: 'Center of mass [x,y,z] (occt.ts backend).' },
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderModel(value) }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => true,
        async execute(args, exec) {
            await resolveDoc(exec);
            const op = { kind: 'volume', target: args.target };
            const result = await runModelOp(op);
            const value = await syncScene(op, result);
            if (Array.isArray(result.centroid))
                value.centroid = result.centroid;
            return value;
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD volume ${String(args.target)}`, kind: 'read' }),
        presentResult: () => ({ card: 'generic', title: 'CAD volume' }),
    });
    const cadDrawing = defineTool({
        name: 'cad_drawing',
        description: 'Generate an engineering drawing (工程图) of a body: GB first-angle 主视图/俯视图/左视图 plus an isometric view on an A4/A3 sheet — ' +
            'hidden lines dashed, frame, title block, overall dimensions, standard scale. Renders in the Drawing tab and exports via cad_export target "drawing" (.svg/.dxf).',
        parameters: {
            target: { type: 'string', description: 'BodyId to draw (default: the most recently created surviving body).' },
            paper: { type: 'string', enum: ['A4', 'A3'], description: 'Sheet size (default A4 landscape).' },
            name: { type: 'string', description: 'Part display name for the title block.' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: drawingSchema,
            },
            render: (_args, value) => [{ type: 'text', text: renderDrawing(value) }],
            presentationMeta: (_args, value) => drawingMetaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const target = args.target ?? lastBodyId();
            if (target === undefined)
                throw new Error('nothing to draw — create a body first');
            if (!meshCache.has(target))
                throw new Error(`unknown body: ${target}`);
            const partName = args.name ?? document.doc.bodyNames[target] ?? target;
            const paper = args.paper === 'A3' ? 'A3' : 'A4';
            const sceneViewId = siblingUuid('d');
            const op = { kind: 'drawing', target, views: DRAWING_VIEWS, sceneViewId, name: partName, paper };
            const result = await runModelOp(op);
            const sheet = await publishDrawing(sceneViewId, partName, result.views, paper);
            const meshes = [...meshCache.values()];
            const sceneUrlBase = deps.ensureSceneRoute();
            const value = {
                target,
                name: partName,
                drawingId: sceneViewId,
                entities: sheet.entityCount,
                scale: sheet.scale,
                scaleText: sheet.scale >= 1 ? `${sheet.scale}:1` : `1:${Math.round(1 / sheet.scale * 100) / 100}`,
                bodies: meshes.length,
                triangles: meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0),
                version: document.doc.version,
            };
            if (sceneUrlBase !== null)
                value.sceneUrl = `/dsh-cad/scene/${sceneViewId}?v=${document.doc.version}`;
            return value;
        },
        presentCall: (args) => ({ card: 'generic', title: `工程图 ${String(args.target ?? '')}`.trim(), kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: '工程图' }),
    });
    const cadAssemblyInsert = defineTool({
        name: 'cad_assembly_insert',
        description: 'Insert a body into the assembly as a placed instance (mm, degrees, Z-up). `at` positions the instance origin; `rotate` orients it (XYZ Euler). ' +
            'Bodies stay untouched in the Part Studio; the Assembly tab renders every instance. Instances persist in the document op log.',
        parameters: {
            bodyId: { type: 'string', required: true, description: 'BodyId to insert.' },
            at: pointParam('instance position [x,y,z] (mm).'),
            rotate: pointParam('instance rotation [rx,ry,rz] (degrees, XYZ Euler).'),
            name: { type: 'string', description: 'Instance display name (defaults to the body name).' },
        },
        output: {
            schema: { type: 'object', additionalProperties: false, properties: assemblySchema },
            render: (_args, value) => [{ type: 'text', text: renderAssembly(value) }],
            presentationMeta: (_args, value) => assemblyMetaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            if (!meshCache.has(args.bodyId))
                throw new Error(`unknown body: ${args.bodyId}`);
            const instanceId = nextInstanceId();
            const op = {
                kind: 'assembly_insert',
                instanceId,
                bodyId: args.bodyId,
                name: args.name ?? document.doc.bodyNames[args.bodyId] ?? args.bodyId,
                translate: args.at,
                rotate: args.rotate,
            };
            const result = await runModelOp(op);
            return syncAssembly(op, result);
        },
        presentCall: (args) => ({ card: 'generic', title: `装配 ${String(args.bodyId)}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: '装配插入' }),
    });
    const cadAssemblyMove = defineTool({
        name: 'cad_assembly_move',
        description: 'Set an assembly instance placement (absolute, not incremental): `at` sets the position, `rotate` the orientation (mm, degrees).',
        parameters: {
            instanceId: { type: 'string', required: true, description: 'InstanceId to move.' },
            at: pointParam('new position [x,y,z] (mm).'),
            rotate: pointParam('new rotation [rx,ry,rz] (degrees, XYZ Euler).'),
        },
        output: {
            schema: { type: 'object', additionalProperties: false, properties: assemblySchema },
            render: (_args, value) => [{ type: 'text', text: renderAssembly(value) }],
            presentationMeta: (_args, value) => assemblyMetaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const op = {
                kind: 'assembly_transform',
                instanceId: args.instanceId,
                translate: args.at,
                rotate: args.rotate,
            };
            const result = await runModelOp(op);
            return syncAssembly(op, result);
        },
        presentCall: (args) => ({ card: 'generic', title: `移动 ${String(args.instanceId)}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: '装配移动' }),
    });
    const cadAssemblyRemove = defineTool({
        name: 'cad_assembly_remove',
        description: 'Remove an instance from the assembly (the body itself stays in the Part Studio).',
        parameters: {
            instanceId: { type: 'string', required: true, description: 'InstanceId to remove.' },
        },
        output: {
            schema: { type: 'object', additionalProperties: false, properties: assemblySchema },
            render: (_args, value) => [{ type: 'text', text: renderAssembly(value) }],
            presentationMeta: (_args, value) => assemblyMetaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            await resolveDoc(exec);
            const op = { kind: 'assembly_remove', instanceId: args.instanceId };
            const result = await runModelOp(op);
            return syncAssembly(op, result);
        },
        presentCall: (args) => ({ card: 'generic', title: `移除 ${String(args.instanceId)}`, kind: 'delete' }),
        presentResult: () => ({ card: 'generic', title: '装配移除' }),
    });
    // ── document (file space) tools ───────────────────────────────────────────
    const docRefParam = { type: 'string', required: true, description: 'Document id or exact name (list with cad_docs).' };
    const renderDocs = (value) => {
        const docs = Array.isArray(value.docs) ? value.docs : [];
        const active = typeof value.activeDoc === 'string' ? value.activeDoc : '';
        const lines = docs.map((doc) => `${doc.id === active ? '● ' : '  '}${String(doc.name)} · ${Number(doc.bodies)} 体 · ${String(doc.updatedAt).slice(0, 16).replace('T', ' ')} · ${String(doc.id)}`);
        return lines.length > 0 ? ['工作区文档:', ...lines].join('\n') : '工作区还没有建模文档';
    };
    const cadDocs = defineTool({
        name: 'cad_docs',
        description: 'List the workspace modeling documents (the file space): id, name, body count and update time, marking the one active for this session. ' +
            'Call before cad_doc_open / cad_doc_delete to discover ids and names.',
        parameters: {},
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    docs: {
                        type: 'array',
                        required: true,
                        items: {
                            type: 'object',
                            additionalProperties: false,
                            properties: {
                                id: { type: 'string', required: true },
                                name: { type: 'string', required: true },
                                bodies: { type: 'number', required: true },
                                ops: { type: 'number', required: true },
                                updatedAt: { type: 'string', required: true },
                                active: { type: 'boolean' },
                            },
                        },
                    },
                    activeDoc: { type: 'string', description: 'Active document id for this session (absent: none).' },
                },
            },
            render: (_args, value) => [{ type: 'text', text: renderDocs(value) }],
        },
        isConcurrencySafe: () => true,
        async execute(_args, exec) {
            const sessionId = sessionKeyOf(exec);
            const docs = await deps.registry.list();
            const activeDoc = await deps.registry.bindingOf(sessionId);
            return {
                docs: docs.map((doc) => ({ id: doc.id, name: doc.name, bodies: doc.bodyCount, ops: doc.opCount, updatedAt: doc.updatedAt, ...(doc.id === activeDoc ? { active: true } : {}) })),
                ...(activeDoc === null ? {} : { activeDoc }),
            };
        },
        presentCall: () => ({ card: 'generic', title: '文档列表', kind: 'read' }),
        presentResult: () => ({ card: 'generic', title: '文档列表' }),
    });
    const cadDocNew = defineTool({
        name: 'cad_doc_new',
        description: 'Create a new modeling document and make it this session\'s active modeling target (previous documents stay in the file space). ' +
            'Name it when the task has a clear subject (e.g. 发动机 / 齿轮箱) — start multi-part projects with this tool so each project keeps its own document.',
        parameters: {
            name: { type: 'string', description: 'Document name (default: 未命名 N).' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    docId: { type: 'string', required: true, description: 'New document id.' },
                    name: { type: 'string', required: true, description: 'Document name.' },
                    bodies: { type: 'number', required: true, description: 'Bodies (0 for a fresh document).' },
                    version: { type: 'number', required: true, description: 'Document version.' },
                },
            },
            render: (_args, value) => [{ type: 'text', text: `新建文档 ${String(value.name)}（后续建模操作都写入该文档）` }],
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            const sessionId = sessionKeyOf(exec);
            const doc = await deps.registry.create(args.name);
            await deps.registry.bind(sessionId, doc.doc.docId);
            await activateDocument(doc);
            const name = (await deps.registry.list()).find((meta) => meta.id === doc.doc.docId)?.name ?? doc.doc.docId;
            return { docId: doc.doc.docId, name, bodies: 0, version: doc.doc.version };
        },
        presentCall: (args) => ({ card: 'generic', title: `新建文档 ${String(args.name ?? '')}`.trim(), kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: '新建文档' }),
    });
    const cadDocOpen = defineTool({
        name: 'cad_doc_open',
        description: 'Open an existing modeling document and make it this session\'s active modeling target (its bodies load back exactly). ' +
            'Use when the user asks to continue an earlier model (e.g. “打开发动机文档”) — resolve the id/name with cad_docs first when unsure.',
        parameters: {
            doc: docRefParam,
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    docId: { type: 'string', required: true, description: 'Opened document id.' },
                    name: { type: 'string', required: true, description: 'Document name.' },
                    bodies: { type: 'number', required: true, description: 'Bodies in the document.' },
                    triangles: { type: 'number', required: true, description: 'Document triangle count.' },
                    version: { type: 'number', required: true, description: 'Document version.' },
                    sceneUrl: { type: 'string', description: 'Versioned viewer URL (web compositions).' },
                },
            },
            render: (_args, value) => [{ type: 'text', text: `打开文档 ${String(value.name)} · ${Number(value.bodies)} 体 (version ${Number(value.version)})` }],
            presentationMeta: (_args, value) => metaOf(value),
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            const sessionId = sessionKeyOf(exec);
            const meta = await deps.registry.resolve(args.doc);
            if (meta === null) {
                const available = (await deps.registry.list()).map((doc) => doc.name).join(' / ');
                throw new Error(`no document matches "${String(args.doc)}" — available: ${available === '' ? '(none)' : available}`);
            }
            await deps.registry.bind(sessionId, meta.id);
            const doc = await deps.registry.open(meta.id);
            if (doc === null)
                throw new Error(`document file missing: ${meta.id}`);
            await activateDocument(doc);
            const meshes = [...meshCache.values()];
            const triangles = meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0);
            const sceneUrlBase = deps.ensureSceneRoute();
            const value = {
                docId: meta.id,
                name: meta.name,
                bodies: meshes.length,
                triangles,
                version: document.doc.version,
            };
            if (meshes.length > 0)
                await deps.store.publish(meta.id, meshes);
            if (meshes.length > 0 && sceneUrlBase !== null) {
                value.sceneUrl = `${sceneUrlBase.replace('/scene', '/bin')}/${meta.id}?v=${document.doc.version}`;
            }
            return value;
        },
        presentCall: (args) => ({ card: 'generic', title: `打开文档 ${String(args.doc)}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: '打开文档' }),
    });
    const cadDocRename = defineTool({
        name: 'cad_doc_rename',
        description: 'Rename a modeling document in the file space.',
        parameters: {
            doc: docRefParam,
            name: { type: 'string', required: true, description: 'New document name.' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    docId: { type: 'string', required: true, description: 'Document id.' },
                    name: { type: 'string', required: true, description: 'New name.' },
                },
            },
            render: (_args, value) => [{ type: 'text', text: `文档已重命名为 ${String(value.name)}` }],
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            void exec;
            const meta = await deps.registry.resolve(args.doc);
            if (meta === null)
                throw new Error(`no document matches "${String(args.doc)}"`);
            const renamed = await deps.registry.rename(meta.id, args.name);
            if (renamed === null)
                throw new Error(`rename failed: ${meta.id}`);
            return { docId: renamed.id, name: renamed.name };
        },
        presentCall: (args) => ({ card: 'generic', title: `重命名文档 ${String(args.doc)}`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: '重命名文档' }),
    });
    const cadDocDelete = defineTool({
        name: 'cad_doc_delete',
        description: 'Permanently delete a modeling document from the file space (op log + bodies). Requires confirm=true — ask the user before calling. ' +
            'To delete a single body inside a document, use cad_delete instead.',
        parameters: {
            doc: docRefParam,
            confirm: { type: 'boolean', required: true, description: 'Must be explicitly true to delete.' },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    deleted: { type: 'string', required: true, description: 'Deleted document id.' },
                    name: { type: 'string', required: true, description: 'Deleted document name.' },
                },
            },
            render: (_args, value) => [{ type: 'text', text: `已删除文档 ${String(value.name)}` }],
        },
        isConcurrencySafe: () => false,
        async execute(args, exec) {
            void exec;
            if (args.confirm !== true) {
                throw new Error('pass confirm=true to delete — this permanently removes the document and its bodies');
            }
            const meta = await deps.registry.resolve(args.doc);
            if (meta === null)
                throw new Error(`no document matches "${String(args.doc)}"`);
            const removed = await deps.registry.remove(meta.id);
            if (!removed)
                throw new Error(`delete failed: ${meta.id}`);
            // Drop the active-document state if it was the deleted one; the next
            // modeling op lazily creates a fresh document for its session.
            if (document.doc.docId === meta.id) {
                document = new ModelDocument(deps.workspaceRoot);
                meshCache.clear();
                drawingSheets = new Map();
                lastDrawingId = null;
                syncedEpoch = -1;
            }
            return { deleted: meta.id, name: meta.name };
        },
        presentCall: (args) => ({ card: 'generic', title: `删除文档 ${String(args.doc)}`, kind: 'delete' }),
        presentResult: () => ({ card: 'generic', title: '删除文档' }),
    });
    // ── constraint tools (Ansatz solver) ──────────────────────────────────────
    const constraintTools = createConstraintTools({
        deps,
        // Read the ACTIVE document per call: multi-document sessions swap it.
        getDocument: () => document,
        meshCache,
        constraintState,
        resolveDoc,
        syncAssembly,
        assemblyMetaOf,
    });
    return [
        cadCreatePrim,
        cadSketchNew,
        cadSketchEdit,
        cadSketchList,
        cadSketchDelete,
        cadExtrude,
        cadRevolve,
        cadChamfer,
        cadShell,
        cadDraft,
        cadPattern,
        cadLoft,
        cadSweep,
        cadBoolean,
        cadFillet,
        cadTransform,
        cadExport,
        cadDelete,
        cadVolume,
        cadDrawing,
        cadAssemblyInsert,
        cadAssemblyMove,
        cadAssemblyRemove,
        cadDocs,
        cadDocNew,
        cadDocOpen,
        cadDocRename,
        cadDocDelete,
        ...constraintTools,
    ];
}
export const MODEL_TOOL_NAMES = [
    'cad_create_prim',
    'cad_sketch_new',
    'cad_sketch_edit',
    'cad_sketch_list',
    'cad_sketch_delete',
    'cad_extrude_profile',
    'cad_revolve',
    'cad_chamfer',
    'cad_shell',
    'cad_draft',
    'cad_pattern',
    'cad_loft',
    'cad_sweep',
    'cad_boolean',
    'cad_fillet',
    'cad_transform',
    'cad_export',
    'cad_delete',
    'cad_volume',
    'cad_drawing',
    'cad_assembly_insert',
    'cad_assembly_move',
    'cad_assembly_remove',
    'cad_docs',
    'cad_doc_new',
    'cad_doc_open',
    'cad_doc_rename',
    'cad_doc_delete',
    'cad_constraint',
    'cad_solve',
    'cad_motion',
];
