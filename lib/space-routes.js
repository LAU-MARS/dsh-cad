/**
 * CAD 空间 (the workspace CAD drive) HTTP routes: the netdisk-style file
 * management layer behind the left-sidebar panel.
 *
 * - GET  /dsh-cad/space/snapshot      — folders + enriched docs + session bindings
 * - GET  /dsh-cad/space/export        — download a document (.dcprt/.step/.stl/.svg/.dxf)
 * - POST /dsh-cad/space/preview       — ensure scene caches exist (bin/scene) for a doc
 * - POST /dsh-cad/space/activate      — bind a doc to a session (open in conversation)
 * - POST /dsh-cad/space/docs/*        — create/rename/move/duplicate/delete documents
 * - POST /dsh-cad/space/folders/*     — create/rename/move/delete folders
 * - POST /dsh-cad/space/import        — import .dcprt/.step/.stl/… as a new document
 *
 * The legacy `/dsh-cad/docs` (list) and `/dsh-cad/docs/delete` routes remain —
 * the resident panel's docs menu and liveness poller depend on them.
 */
import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { summarizeModelDoc } from './modeling/registry.js';
import { withWorkerLock, runModelOp } from './modeling/client.js';
import { isDcPrtDocument } from './feature_script/dc_prt.js';
import { toDcPrtDocument } from './feature_script/dc_prt.js';
import { buildDrawingSheet, drawingToSvg, drawingToDxf } from './modeling/drawing.js';
import { foldAssemblyState } from './modeling/assembly.js';
import { detectFormat } from './convert/detect.js';
import { parseSTL } from './convert/stl.js';
import { parseOBJ } from './convert/obj.js';
import { convert } from './convert/index.js';
import { decodeF32B64, decodeU32B64 } from './b64.js';
export const SPACE_ROUTE_PATH = '/dsh-cad/space';
/** The standard drawing views (GB first-angle, same constants as cad-model). */
const DRAWING_VIEWS = [
    { name: 'front', dir: [0, -1, 0], xDir: [1, 0, 0] },
    { name: 'top', dir: [0, 0, 1], xDir: [1, 0, 0] },
    { name: 'left', dir: [-1, 0, 0], xDir: [0, 1, 0] },
    { name: 'iso', dir: [1, -1, 1], xDir: [1, 1, 0] },
];
// ── helpers ──────────────────────────────────────────────────────────────────
function json(res, payload, status = 200) {
    const body = Buffer.from(JSON.stringify(payload));
    res.writeHead(status, {
        'content-type': 'application/json',
        'content-length': body.length,
        'cache-control': 'no-store',
    });
    res.end(body);
}
function fail(res, message, status = 400) {
    json(res, { error: message }, status);
}
/** RFC 5987 filename for `content-disposition` (CJK safe). */
function contentDisposition(name) {
    const ascii = name.replace(/[^\x20-\x7e]/g, '_').replace(/["\\]/g, '_');
    const encoded = encodeURIComponent(name).replace(/['()]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
    return `attachment; filename="${ascii}"; filename*=UTF-8''${encoded}`;
}
function sendBuffer(res, buffer, filename, contentType) {
    res.writeHead(200, {
        'content-type': contentType,
        'content-length': buffer.length,
        'content-disposition': contentDisposition(filename),
        'cache-control': 'no-store',
    });
    res.end(buffer);
}
async function readBody(req) {
    const chunks = [];
    for await (const chunk of req)
        chunks.push(chunk);
    return Buffer.concat(chunks);
}
async function readJsonBody(req) {
    const raw = await readBody(req);
    if (raw.length === 0)
        return {};
    try {
        return JSON.parse(raw.toString('utf8'));
    }
    catch {
        throw new Error('invalid JSON body');
    }
}
/** File stem for a default document name (basename minus extension). */
function defaultDocName(fileName) {
    const base = path.basename(fileName);
    const dot = base.lastIndexOf('.');
    return dot <= 0 ? base : base.slice(0, dot);
}
/** The asset directory that holds content-addressed sidecar CAD files. */
function assetsDir(root) {
    return path.join(root, '.dsh-cad', 'docs', 'assets');
}
/** Store a binary payload as a content-addressed sidecar asset. */
async function storeAsset(root, bytes, ext) {
    const hash = createHash('sha1').update(bytes).digest('hex');
    const dir = assetsDir(root);
    await mkdir(dir, { recursive: true });
    const assetPath = path.join(dir, `${hash}.${ext.replace(/^\./, '')}`);
    await writeFile(assetPath, bytes);
    return assetPath;
}
/** Mirror base64-encoded CadMesh payloads into worker-shaped mesh data. */
function mirrorMesh(mesh) {
    return {
        name: mesh.name,
        positions: decodeF32B64(mesh.positions),
        ...(mesh.normals === undefined ? {} : { normals: decodeF32B64(mesh.normals) }),
        indices: decodeU32B64(mesh.indices),
    };
}
function docNameFrom(meta) {
    return `${meta.name.replace(/[\\/:*?"<>|]/g, '_')}`;
}
function withVersion(base, version) {
    if (base === undefined)
        return undefined;
    const joiner = base.includes('?') ? '&' : '?';
    return `${base}${joiner}v=${version}`;
}
/**
 * Build versioned scene URLs for every scene cache that currently exists for
 * a document (part scene under the docId, assembly under `asm-<docId>`, and
 * the latest drawing sheet under its op's sceneViewId). Await-able by design:
 * the existence checks hit the disk for mirrored entries.
 */
async function sceneUrlsFor(deps, doc, ops) {
    const base = deps.ensureSceneRoute();
    if (base === null)
        return {};
    const binBase = base.replace('/scene', '/bin');
    const urls = {};
    const summary = summarizeModelDoc(ops);
    if (await deps.binStoreHas(doc.id))
        urls.partUrl = `${binBase}/${doc.id}?v=${ops.version}`;
    if (summary.instanceCount > 0 && (await deps.binStoreHas(`asm-${doc.id}`))) {
        urls.assemblyUrl = `${binBase}/asm-${doc.id}?v=${ops.version}`;
    }
    if (summary.latestDrawingId !== undefined && (await deps.sceneStoreHas(summary.latestDrawingId))) {
        urls.drawingUrl = `/dsh-cad/scene/${summary.latestDrawingId}?v=${ops.version}`;
    }
    return urls;
}
// ── document ops helpers ─────────────────────────────────────────────────────
async function readDocJson(deps, docId) {
    try {
        const text = await readFile(path.join(deps.workspaceRoot, '.dsh-cad', 'docs', `${docId}.json`), 'utf8');
        const parsed = JSON.parse(text);
        if (typeof parsed.docId !== 'string' || !Array.isArray(parsed.ops))
            return null;
        return parsed;
    }
    catch {
        return null;
    }
}
/**
 * Materialize scene caches for a document: reset + replay its op log on the
 * shared worker (serialized by the modeling lock), then publish the part
 * scene, the composed assembly scene, and any drawing sheet so every CAD
 * 空间 preview (and a conversation opened through activate) has geometry
 * available even after a process restart.
 */
async function materializeDoc(deps, docId, doc) {
    await withWorkerLock(async () => {
        await runModelOp({ kind: 'reset' });
        let replayedInstances = null;
        for (const op of doc.ops) {
            try {
                const result = await runModelOp(op);
                if (result.instances !== undefined)
                    replayedInstances = result.instances;
            }
            catch {
                // A stale op must not block the replay; later independent ops recover.
            }
        }
        if (doc.ops.length > 0) {
            const all = await runModelOp({ kind: 'tessellate_all' });
            const meshes = (all.meshes ?? []).map((mesh) => ({
                name: mesh.name === '' ? mesh.bodyId : mesh.name,
                positions: mesh.positions,
                ...(mesh.normals === undefined ? {} : { normals: mesh.normals }),
                indices: mesh.indices,
            }));
            if (meshes.length > 0)
                await deps.binStore.publish(docId, meshes);
            if (replayedInstances !== null && all.meshes !== undefined) {
                const bodies = new Map(all.meshes.map((mesh) => [mesh.bodyId, { ...mesh, name: mesh.name === '' ? mesh.bodyId : mesh.name }]));
                const { explode } = foldAssemblyState(doc.ops, doc.bodyNames);
                const composed = composeAssembly(bodies, replayedInstances, explode);
                await deps.binStore.publish(`asm-${docId}`, composed);
            }
        }
        for (const op of doc.ops) {
            if (op.kind !== 'drawing' || op.sceneViewId === undefined)
                continue;
            try {
                const result = await runModelOp(op);
                if (result.views === undefined)
                    continue;
                const sheet = buildDrawingSheet({
                    partName: op.name ?? doc.bodyNames[op.target] ?? op.target,
                    views: result.views,
                    paper: op.paper,
                });
                await deps.sceneStore.putAt(op.sceneViewId, {
                    kind: '2d',
                    format: 'drawing',
                    entities: sheet.entities,
                    bounds: sheet.bounds,
                    layers: sheet.layers,
                });
            }
            catch {
                /* drawing regeneration is best-effort */
            }
        }
    });
    return await sceneUrlsFor(deps, docMetaOf(docId, doc), doc);
}
/** docId/shape-only model doc used by sceneUrlsFor after a materialize pass. */
function docMetaOf(docId, doc) {
    const summary = summarizeModelDoc(doc);
    return {
        id: docId,
        name: '',
        createdAt: '',
        updatedAt: '',
        opCount: doc.version,
        bodyCount: summary.bodyCount,
    };
}
/** Compose per-instance colored meshes (mirrors modeling/assembly.ts). */
const INSTANCE_PALETTE = [
    0xd98e8e, 0x9fd4a8, 0xc3a6e8, 0xe8d58c, 0x8fd0c9, 0xf0b7c5, 0xa8c68f,
    0x9fb8e8, 0xe8a87c, 0x7fc8bc, 0xc9a2d8, 0x8fb3d9,
];
function composeAssembly(bodies, instances, explode) {
    const meshes = [];
    const names = new Map();
    const displayName = (name) => {
        const seen = names.get(name) ?? 0;
        names.set(name, seen + 1);
        return seen === 0 ? name : `${name}·${seen + 1}`;
    };
    for (let index = 0; index < instances.length; index++) {
        const instance = instances[index];
        const body = bodies.get(instance.bodyId);
        if (body === undefined)
            continue;
        const offset = explode !== 0 ? radialOffset(instance, bodies, explode) : null;
        const translate = offset === undefined || offset === null
            ? instance.translate
            : [
                instance.translate[0] + offset[0],
                instance.translate[1] + offset[1],
                instance.translate[2] + offset[2],
            ];
        meshes.push(transformMesh({ ...body, name: displayName(instance.name), color: INSTANCE_PALETTE[index % INSTANCE_PALETTE.length] }, translate, instance.rotate));
    }
    return meshes;
}
function radialOffset(instance, bodies, explode) {
    const centers = [...bodies.values()].map((mesh) => {
        let sumX = 0, sumY = 0, sumZ = 0;
        for (let i = 0; i < mesh.positions.length; i += 3) {
            sumX += mesh.positions[i] ?? 0;
            sumY += mesh.positions[i + 1] ?? 0;
            sumZ += mesh.positions[i + 2] ?? 0;
        }
        const count = mesh.positions.length / 3;
        return [sumX / (count || 1), sumY / (count || 1), sumZ / (count || 1)];
    });
    if (centers.length === 0)
        return null;
    const center = centers.reduce((acc, c) => [acc[0] + c[0] / centers.length, acc[1] + c[1] / centers.length, acc[2] + c[2] / centers.length], [0, 0, 0]);
    const dx = instance.translate[0] - center[0];
    const dy = instance.translate[1] - center[1];
    const dz = instance.translate[2] - center[2];
    const len = Math.hypot(dx, dy, dz);
    if (len < 1e-12)
        return [explode, 0, 0];
    return [dx * explode, dy * explode, dz * explode];
}
function rotationMatrix(rotate) {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const [rx, ry, rz] = rotate.map(toRad);
    const cx = Math.cos(rx ?? 0), sx = Math.sin(rx ?? 0);
    const cy = Math.cos(ry ?? 0), sy = Math.sin(ry ?? 0);
    const cz = Math.cos(rz ?? 0), sz = Math.sin(rz ?? 0);
    return new Float64Array([
        cy * cz, -cy * sz, sy,
        cx * sz + sx * sy * cz, cx * cz - sx * sy * sz, -sx * cy,
        sx * sz - cx * sy * cz, sx * cz + cx * sy * sz, cx * cy,
    ]);
}
function transformMesh(mesh, translate, rotate) {
    const identity = translate.every((v) => v === 0) && rotate.every((v) => v === 0);
    if (identity)
        return mesh;
    const m = rotationMatrix(rotate);
    const [tx, ty, tz] = translate;
    const positions = new Float32Array(mesh.positions.length);
    for (let i = 0; i + 2 < mesh.positions.length; i += 3) {
        const x = mesh.positions[i];
        const y = mesh.positions[i + 1];
        const z = mesh.positions[i + 2];
        positions[i] = m[0] * x + m[1] * y + m[2] * z + tx;
        positions[i + 1] = m[3] * x + m[4] * y + m[5] * z + ty;
        positions[i + 2] = m[6] * x + m[7] * y + m[8] * z + tz;
    }
    let normals;
    if (mesh.normals !== undefined) {
        normals = new Float32Array(mesh.normals.length);
        for (let i = 0; i + 2 < mesh.normals.length; i += 3) {
            const x = mesh.normals[i];
            const y = mesh.normals[i + 1];
            const z = mesh.normals[i + 2];
            normals[i] = m[0] * x + m[1] * y + m[2] * z;
            normals[i + 1] = m[3] * x + m[4] * y + m[5] * z;
            normals[i + 2] = m[6] * x + m[7] * y + m[8] * z;
        }
    }
    return { ...mesh, positions, normals };
}
/** Minimal header for a .bin scene: mesh count + total triangles. */
function binStats(buffer) {
    try {
        const headerLength = buffer.readUInt32LE(4);
        const header = JSON.parse(buffer.subarray(8, 8 + headerLength).toString('utf8'));
        return { meshes: header.meshes.length, triangles: header.meshes.reduce((sum, m) => sum + m.triangleCount, 0) };
    }
    catch {
        return { meshes: 0, triangles: 0 };
    }
}
/** Serialize a mesh-only document's bodies as a binary STL buffer. */
function packBinaryStl(meshes) {
    let triangleCount = 0;
    for (const mesh of meshes)
        triangleCount += Math.floor(mesh.indices.length / 3);
    const buffer = Buffer.alloc(84 + triangleCount * 50);
    buffer.writeUInt32LE(triangleCount, 80);
    let offset = 84;
    for (const mesh of meshes) {
        for (let i = 0; i + 2 < mesh.indices.length; i += 3) {
            const a = mesh.indices[i] * 3;
            const b = mesh.indices[i + 1] * 3;
            const c = mesh.indices[i + 2] * 3;
            const ax = mesh.positions[a], ay = mesh.positions[a + 1], az = mesh.positions[a + 2];
            const bx = mesh.positions[b], by = mesh.positions[b + 1], bz = mesh.positions[b + 2];
            const cx = mesh.positions[c], cy = mesh.positions[c + 1], cz = mesh.positions[c + 2];
            const ux = bx - ax, uy = by - ay, uz = bz - az;
            const vx = cx - ax, vy = cy - ay, vz = cz - az;
            let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
            const len = Math.hypot(nx, ny, nz) || 1;
            nx /= len;
            ny /= len;
            nz /= len;
            offset = buffer.writeFloatLE(nx, offset);
            offset = buffer.writeFloatLE(ny, offset);
            offset = buffer.writeFloatLE(nz, offset);
            for (const corner of [a, b, c]) {
                offset = buffer.writeFloatLE(mesh.positions[corner], offset);
                offset = buffer.writeFloatLE(mesh.positions[corner + 1], offset);
                offset = buffer.writeFloatLE(mesh.positions[corner + 2], offset);
            }
            buffer.writeUInt16LE(0, offset);
            offset += 2;
        }
    }
    return buffer;
}
/** The `import_mesh` op of a mesh-only document (the export fallback source). */
function meshImportOp(doc) {
    for (let i = doc.ops.length - 1; i >= 0; i--) {
        const op = doc.ops[i];
        if (op.kind === 'import_mesh')
            return op;
    }
    return null;
}
/**
 * Import an uploaded CAD file as a NEW modeling document:
 * - `.dcprt`       → the native replayable feature history (fully parametric)
 * - `.step/.stp`   → structured assembly import (names + placements survive)
 * - `.stl/.obj/.iges/.brep` → a mesh/body asset embedded via import_mesh
 */
async function importCadFile(deps, fileName, bytes, folderId) {
    const format = detectFormat(fileName);
    if (format === null) {
        throw new Error(`unsupported CAD format: ${fileName} — supported: .stl .obj .step .stp .iges .igs .brep .dcprt`);
    }
    // .dcprt: the native part document replays its feature history directly.
    if (format === 'dcprt') {
        let parsed;
        try {
            parsed = JSON.parse(bytes.toString('utf8'));
        }
        catch (error) {
            throw new Error(`the DCPRT file is not valid JSON: ${error.message}`);
        }
        if (!isDcPrtDocument(parsed)) {
            throw new Error('not a DCPRT part document (missing dcprt header or features)');
        }
        const { document, meta } = await deps.registry.importDoc(defaultDocName(fileName), { version: parsed.version ?? parsed.features.length, ops: parsed.features, bodyNames: Object.fromEntries(parsed.bodies.map((b) => [b.bodyId, b.name ?? b.bodyId])) }, { folderId, sourceKind: 'dcprt' });
        const doc = { docId: meta.id, version: document.doc.version, ops: document.doc.ops, bodyNames: document.doc.bodyNames };
        const sceneUrls = await materializeDoc(deps, meta.id, doc);
        return { meta, sceneUrls };
    }
    // .step / .stp: structured assembly import (names, part structure and
    // instance placements survive; identical parts dedupe into one body).
    if (format === 'step') {
        if (!bytes.subarray(0, 512).toString('latin1').includes('ISO-10303')) {
            throw new Error(`not a STEP file: ${fileName}`);
        }
        const assetPath = await storeAsset(deps.workspaceRoot, bytes, 'step');
        const probe = await withWorkerLock(() => runModelOp({ kind: 'import_step', path: assetPath }));
        const structure = probe.stepStructure;
        if (structure === undefined || structure.parts.length === 0) {
            throw new Error('the STEP file parses into no solid parts');
        }
        const bodyAssignments = structure.parts.map((part, index) => ({ bodyId: `b${index + 1}`, name: part.name }));
        const instanceAssignments = structure.leaves.map((leaf, index) => ({
            instanceId: `a${index + 1}`,
            bodyId: bodyAssignments[leaf.part]?.bodyId ?? `b${leaf.part + 1}`,
            name: leaf.name,
            translate: leaf.translate,
            rotate: leaf.rotate,
        }));
        const op = { kind: 'import_step', path: assetPath, bodies: bodyAssignments, instances: instanceAssignments };
        const { meta } = await deps.registry.importDoc(defaultDocName(fileName), { version: 1, ops: [op], bodyNames: Object.fromEntries(bodyAssignments.map((b) => [b.bodyId, b.name])) }, { folderId, sourceKind: 'step' });
        const doc = { docId: meta.id, version: 1, ops: [op], bodyNames: Object.fromEntries(bodyAssignments.map((b) => [b.bodyId, b.name])) };
        const sceneUrls = await materializeDoc(deps, meta.id, doc);
        return { meta, sceneUrls };
    }
    // Everything else is a mesh/body asset: parse, embed via import_mesh, and
    // let the replay path re-convert the stored asset on every materialize.
    const assetPath = await storeAsset(deps.workspaceRoot, bytes, format);
    const meshes = [];
    if (format === 'stl') {
        const mesh = parseSTL(bytes, defaultDocName(fileName));
        meshes.push(mirrorMesh(mesh));
    }
    else if (format === 'obj') {
        for (const mesh of parseOBJ(bytes.toString('utf8'), defaultDocName(fileName))) {
            meshes.push(mirrorMesh(mesh));
        }
    }
    else if (format === 'brep' || format === 'iges') {
        const scene = await convert(bytes, format, fileName);
        if (scene.kind !== '3d')
            throw new Error(`${format.toUpperCase()} files are preview-only and cannot be imported as modeling documents`);
        for (const mesh of scene.meshes)
            meshes.push(mirrorMesh(mesh));
    }
    else {
        throw new Error(`${format.toUpperCase()} files are preview-only and cannot be imported as modeling documents`);
    }
    if (meshes.length === 0)
        throw new Error(`${fileName} parses into no geometry`);
    const bodyNames = {};
    const ops = meshes.map((mesh, index) => {
        const id = index === 0 ? 'b1' : `b1m${index + 1}`;
        bodyNames[id] = index === 0 ? defaultDocName(fileName) : `${defaultDocName(fileName)} #${index + 1}`;
        return {
            kind: 'import_mesh',
            path: assetPath,
            format,
            bodyId: id,
            name: bodyNames[id],
            mesh,
        };
    });
    const { meta } = await deps.registry.importDoc(defaultDocName(fileName), { version: 1, ops, bodyNames }, { folderId, sourceKind: 'model' });
    const sceneUrls = await materializeDoc(deps, meta.id, { docId: meta.id, version: 1, ops, bodyNames });
    return { meta, sceneUrls };
}
async function folderPathOf(deps, folderId) {
    const folders = await deps.registry.listFolders();
    const byId = new Map(folders.map((folder) => [folder.id, folder]));
    const parts = [];
    let current = folderId;
    while (current !== null) {
        const folder = byId.get(current);
        if (folder === undefined)
            break;
        parts.unshift(folder.name);
        current = folder.parentId;
    }
    return parts.length > 0 ? parts.join('/') : '/';
}
async function buildSnapshot(deps) {
    const [folders, docs, bindings] = await Promise.all([
        deps.registry.listFolders(),
        deps.registry.list(),
        deps.registry.bindings(),
    ]);
    const entries = [];
    for (const meta of docs) {
        const doc = await readDocJson(deps, meta.id);
        const summary = doc !== null ? summarizeModelDoc(doc) : {
            bodyCount: meta.bodyCount,
            instanceCount: 0,
            drawingCount: 0,
            sketchCount: 0,
            bodyNames: [],
        };
        let sizeBytes = 0;
        try {
            sizeBytes = (await stat(path.join(deps.workspaceRoot, '.dsh-cad', 'docs', `${meta.id}.json`))).size;
        }
        catch {
            /* deleted file — the manifest is being cleaned up in parallel */
        }
        const urls = doc !== null ? await sceneUrlsFor(deps, meta, doc) : {};
        const boundSessions = Object.entries(bindings)
            .filter(([, docId]) => docId === meta.id)
            .map(([sessionId]) => sessionId);
        entries.push({
            id: meta.id,
            name: meta.name,
            folderId: meta.folderId ?? null,
            folderPath: await folderPathOf(deps, meta.folderId ?? null),
            createdAt: meta.createdAt,
            updatedAt: meta.updatedAt,
            opCount: meta.opCount,
            sourceKind: meta.sourceKind,
            bodyCount: summary.bodyCount,
            instanceCount: summary.instanceCount,
            sketchCount: summary.sketchCount,
            drawingCount: summary.drawingCount,
            ...(summary.latestDrawingId === undefined ? {} : { latestDrawingId: summary.latestDrawingId }),
            bodyNames: summary.bodyNames,
            sizeBytes,
            ...(urls.partUrl === undefined ? {} : { partSceneUrl: urls.partUrl }),
            ...(urls.assemblyUrl === undefined ? {} : { assemblyUrl: urls.assemblyUrl }),
            ...(urls.drawingUrl === undefined ? {} : { drawingUrl: urls.drawingUrl }),
            boundSessions,
        });
    }
    return { folders, docs: entries, sessionBindings: bindings };
}
// ── export ───────────────────────────────────────────────────────────────────
/**
 * Export a document for download: the native .dcprt (op-log JSON) is served
 * straight from disk; .step/.stl replays the document on the shared worker
 * and exports the assembly (or a fused/structured compound of the Part
 * bodies); .svg/.dxf replay the latest drawing sheet.
 */
async function exportDoc(deps, id, format) {
    const meta = await deps.registry.resolve(id);
    if (meta === null)
        return null;
    const doc = await readDocJson(deps, meta.id);
    if (doc === null)
        return null;
    const safeName = docNameFrom(meta);
    if (format === 'dcprt') {
        const payload = toDcPrtDocument(doc);
        return { buffer: Buffer.from(JSON.stringify(payload, null, 2)), filename: `${safeName}.dcprt`, contentType: 'application/json' };
    }
    if (format === 'svg' || format === 'dxf') {
        const drawingOp = [...doc.ops].reverse().find((op) => op.kind === 'drawing');
        if (drawingOp !== undefined && drawingOp.sceneViewId !== undefined) {
            // Replay the document (drawing ops included) so the sheet is rebuilt
            // from live views, then serialize the sheet to SVG/DXF.
            const result = await withWorkerLock(async () => {
                await runModelOp({ kind: 'reset' });
                let views;
                for (const op of doc.ops) {
                    try {
                        const replayed = await runModelOp(op);
                        if (op.kind === 'drawing' && replayed.views !== undefined)
                            views = replayed.views;
                    }
                    catch { /* stale ops don't block the export */ }
                }
                return views;
            });
            if (result !== undefined && result.length > 0) {
                const sheet = buildDrawingSheet({ partName: drawingOp.name ?? safeName, views: result, paper: drawingOp.paper });
                const buffer = Buffer.from(format === 'svg' ? drawingToSvg(sheet) : drawingToDxf(sheet), 'utf8');
                return { buffer, filename: `${safeName}.${format}`, contentType: format === 'svg' ? 'image/svg+xml' : 'application/dxf' };
            }
        }
        // No stored drawing: project a fresh one off the last live body.
        const target = [...doc.ops].reverse().map((op) => op).find((op) => op.kind === 'create_prim' || op.kind === 'extrude_profile' || op.kind === 'revolve' || op.kind === 'loft' || op.kind === 'sweep' || op.kind === 'import_step');
        if (target === undefined)
            throw new Error('nothing to draw — the document has no bodies');
        const drawn = target.bodyId
            ?? target.bodies?.[0]?.bodyId;
        if (drawn === undefined)
            throw new Error('nothing to draw — the document has no bodies');
        const result = await withWorkerLock(async () => {
            await runModelOp({ kind: 'reset' });
            for (const op of doc.ops) {
                try {
                    await runModelOp(op);
                }
                catch { /* stale ops don't block the export */ }
            }
            return runModelOp({ kind: 'drawing', target: drawn, views: DRAWING_VIEWS });
        });
        if (result.views === undefined)
            throw new Error('the drawing engine produced no views');
        const sheet = buildDrawingSheet({ partName: safeName, views: result.views, paper: 'A4' });
        const buffer = Buffer.from(format === 'svg' ? drawingToSvg(sheet) : drawingToDxf(sheet), 'utf8');
        return { buffer, filename: `${safeName}.${format}`, contentType: format === 'svg' ? 'image/svg+xml' : 'application/dxf' };
    }
    // .step / .stl: replay + worker export under the modeling lock.
    const result = await withWorkerLock(async () => {
        await runModelOp({ kind: 'reset' });
        for (const op of doc.ops) {
            try {
                await runModelOp(op);
            }
            catch { /* stale ops don't block the export */ }
        }
        return runModelOp({ kind: 'export_document', format });
    });
    if (result.meshExport === true) {
        // A mesh-only document (e.g. an imported .stl): return the stored asset.
        const source = meshImportOp(doc);
        if (source === null)
            throw new Error('the document has no mesh asset to export');
        const buffer = await readFile(source.path);
        return { buffer, filename: `${safeName}.${path.extname(source.path).replace(/^\./, '')}`, contentType: 'application/octet-stream' };
    }
    if (result.bytes === undefined)
        throw new Error('the export produced no data');
    return { buffer: Buffer.from(result.bytes), filename: `${safeName}.${format}`, contentType: 'application/octet-stream' };
}
// ── route registration ───────────────────────────────────────────────────────
/** Register the CAD-space routes on the shared HTTP server. Returns a disposer. */
export function registerSpaceRoutes(deps) {
    return deps.server.register({
        kind: 'prefix',
        path: SPACE_ROUTE_PATH,
        handler: async (req, res) => {
            const url = new URL(req.url ?? '/', 'http://localhost');
            const route = url.pathname.slice(SPACE_ROUTE_PATH.length).replace(/^\/+|\/+$/g, '') || 'snapshot';
            const method = req.method ?? 'GET';
            try {
                // GET /dsh-cad/space/snapshot
                if (method === 'GET' && route === 'snapshot') {
                    json(res, await buildSnapshot(deps));
                    return;
                }
                // GET /dsh-cad/space/export?id=<docId>&format=<dcprt|step|stl|svg|dxf>
                if (method === 'GET' && route === 'export') {
                    const id = url.searchParams.get('id') ?? '';
                    const format = (url.searchParams.get('format') ?? 'dcprt');
                    if (!['dcprt', 'step', 'stl', 'svg', 'dxf'].includes(format)) {
                        fail(res, `unsupported export format: ${format}`);
                        return;
                    }
                    try {
                        const result = await exportDoc(deps, id, format);
                        if (result === null) {
                            fail(res, `unknown document: ${id}`, 404);
                            return;
                        }
                        sendBuffer(res, result.buffer, result.filename, result.contentType);
                    }
                    catch (error) {
                        fail(res, error instanceof Error ? error.message : String(error), 500);
                    }
                    return;
                }
                // POST /dsh-cad/space/preview  { id }
                if (method === 'POST' && route === 'preview') {
                    const body = await readJsonBody(req);
                    const id = String(body.id ?? '');
                    const meta = await deps.registry.resolve(id);
                    if (meta === null) {
                        fail(res, `unknown document: ${id}`, 404);
                        return;
                    }
                    const doc = await readDocJson(deps, meta.id);
                    if (doc === null) {
                        fail(res, `document file missing: ${meta.id}`, 404);
                        return;
                    }
                    const urls = await materializeDoc(deps, meta.id, doc);
                    json(res, { id: meta.id, name: meta.name, ...urls });
                    return;
                }
                // POST /dsh-cad/space/activate  { id, sessionId }
                if (method === 'POST' && route === 'activate') {
                    const body = await readJsonBody(req);
                    const id = String(body.id ?? '');
                    const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
                    const meta = await deps.registry.resolve(id);
                    if (meta === null) {
                        fail(res, `unknown document: ${id}`, 404);
                        return;
                    }
                    if (sessionId === '') {
                        fail(res, 'sessionId is required');
                        return;
                    }
                    await deps.registry.bind(sessionId, meta.id);
                    const doc = await readDocJson(deps, meta.id);
                    const urls = doc === null
                        ? {}
                        : ((await deps.binStoreHas(meta.id)) ? await sceneUrlsFor(deps, meta, doc) : await materializeDoc(deps, meta.id, doc));
                    json(res, { id: meta.id, name: meta.name, sessionId, ...urls });
                    return;
                }
                // ── document management ────────────────────────────────────────────
                if (method === 'POST' && route === 'docs/create') {
                    const body = await readJsonBody(req);
                    const name = typeof body.name === 'string' ? body.name : undefined;
                    const folderId = typeof body.folderId === 'string' ? body.folderId : null;
                    const document = await deps.registry.create(name, { folderId });
                    const meta = (await deps.registry.list()).find((doc) => doc.id === document.doc.docId) ?? null;
                    json(res, { doc: meta, version: document.doc.version });
                    return;
                }
                if (method === 'POST' && route === 'docs/rename') {
                    const body = await readJsonBody(req);
                    const renamed = await deps.registry.rename(String(body.id ?? ''), String(body.name ?? ''));
                    if (renamed === null) {
                        fail(res, `unknown document: ${String(body.id ?? '')}`, 404);
                        return;
                    }
                    json(res, { doc: renamed });
                    return;
                }
                if (method === 'POST' && route === 'docs/move') {
                    const body = await readJsonBody(req);
                    const moved = await deps.registry.moveDoc(String(body.id ?? ''), typeof body.folderId === 'string' ? body.folderId : null);
                    if (moved === null) {
                        fail(res, `unknown document: ${String(body.id ?? '')}`, 404);
                        return;
                    }
                    json(res, { doc: moved });
                    return;
                }
                if (method === 'POST' && route === 'docs/duplicate') {
                    const body = await readJsonBody(req);
                    const duplicate = await deps.registry.duplicateDoc(String(body.id ?? ''), typeof body.name === 'string' ? body.name : undefined, typeof body.folderId === 'string' ? body.folderId : undefined);
                    if (duplicate === null) {
                        fail(res, `unknown document: ${String(body.id ?? '')}`, 404);
                        return;
                    }
                    json(res, { doc: duplicate });
                    return;
                }
                if (method === 'POST' && route === 'docs/delete') {
                    const body = await readJsonBody(req);
                    const ids = Array.isArray(body.ids)
                        ? body.ids.map((entry) => String(entry))
                        : [String(body.id ?? '')];
                    const removed = [];
                    for (const id of ids) {
                        if (await deps.registry.remove(id))
                            removed.push(id);
                        await deps.binStore.drop(id);
                        await deps.binStore.drop(`asm-${id}`);
                    }
                    json(res, { removed });
                    return;
                }
                // ── folder management ──────────────────────────────────────────────
                if (method === 'POST' && route === 'folders/create') {
                    const body = await readJsonBody(req);
                    const folder = await deps.registry.createFolder(typeof body.name === 'string' ? body.name : undefined, typeof body.parentId === 'string' ? body.parentId : null);
                    json(res, { folder });
                    return;
                }
                if (method === 'POST' && route === 'folders/rename') {
                    const body = await readJsonBody(req);
                    const renamed = await deps.registry.renameFolder(String(body.id ?? ''), String(body.name ?? ''));
                    if (renamed === null) {
                        fail(res, `unknown folder: ${String(body.id ?? '')}`, 404);
                        return;
                    }
                    json(res, { folder: renamed });
                    return;
                }
                if (method === 'POST' && route === 'folders/move') {
                    const body = await readJsonBody(req);
                    try {
                        const moved = await deps.registry.moveFolder(String(body.id ?? ''), typeof body.parentId === 'string' ? body.parentId : null);
                        if (moved === null) {
                            fail(res, `unknown folder: ${String(body.id ?? '')}`, 404);
                            return;
                        }
                        json(res, { folder: moved });
                    }
                    catch (error) {
                        fail(res, error instanceof Error ? error.message : String(error), 400);
                    }
                    return;
                }
                if (method === 'POST' && route === 'folders/delete') {
                    const body = await readJsonBody(req);
                    const mode = body.mode === 'move-to-parent' ? 'move-to-parent' : 'cascade';
                    const removed = await deps.registry.removeFolder(String(body.id ?? ''), mode);
                    if (removed === null) {
                        fail(res, `unknown folder: ${String(body.id ?? '')}`, 404);
                        return;
                    }
                    for (const docId of removed.removedDocIds) {
                        await deps.binStore.drop(docId);
                        await deps.binStore.drop(`asm-${docId}`);
                    }
                    json(res, removed);
                    return;
                }
                // ── import ─────────────────────────────────────────────────────────
                if (method === 'POST' && route === 'import') {
                    const fileName = url.searchParams.get('filename') ?? '';
                    const folderId = url.searchParams.get('folderId');
                    const contentType = req.headers['content-type'] ?? '';
                    let bytes;
                    try {
                        if (contentType.includes('application/json')) {
                            const body = await readJsonBody(req);
                            const base64 = typeof body.data === 'string' ? body.data : '';
                            if (base64 === '')
                                throw new Error('body.data (base64) is required');
                            bytes = Buffer.from(base64, 'base64');
                        }
                        else {
                            bytes = await readBody(req);
                        }
                        const name = fileName !== '' ? fileName : 'document';
                        const outcome = await importCadFile(deps, name, bytes, folderId);
                        const entry = { ...outcome.meta, ...(outcome.sceneUrls.partUrl === undefined ? {} : { partSceneUrl: outcome.sceneUrls.partUrl }) };
                        json(res, { doc: entry, ...outcome.sceneUrls });
                    }
                    catch (error) {
                        fail(res, error instanceof Error ? error.message : String(error), 400);
                    }
                    return;
                }
                fail(res, `unknown CAD-space route: ${method} /${route}`, 404);
            }
            catch (error) {
                fail(res, error instanceof Error ? error.message : String(error), 500);
            }
        },
    });
}
void rm;
void mkdir;
