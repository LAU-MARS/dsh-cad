/**
 * The per-instance pastel palette: instance i takes palette[i % n] both in the
 * composed 3D scene and in the assembly-tree swatches, so a part's color chip
 * always matches its solid. Stable per list position (the worker's insertion
 * order), like the reference CAD assembly panels.
 */
export const INSTANCE_PALETTE = [
    0xd98e8e, // rose
    0x9fd4a8, // green
    0xc3a6e8, // violet
    0xe8d58c, // sand
    0x8fd0c9, // teal
    0xf0b7c5, // pink
    0xa8c68f, // olive
    0x9fb8e8, // periwinkle
    0xe8a87c, // orange
    0x7fc8bc, // jade
    0xc9a2d8, // lilac
    0x8fb3d9, // steel blue
];
/** The palette color of the instance at `index` in the assembly list. */
export function instanceColor(index) {
    return INSTANCE_PALETTE[index % INSTANCE_PALETTE.length];
}
/**
 * Instance display names with the ·N dedup suffix — the single source for
 * mesh names in the composed scene AND part names in the assembly tree, so a
 * tree row always names its mesh (highlight linking relies on it).
 */
export function assemblyDisplayNames(instances) {
    const nameUse = new Map();
    return instances.map((instance) => {
        const seen = nameUse.get(instance.name) ?? 0;
        nameUse.set(instance.name, seen + 1);
        return seen === 0 ? instance.name : `${instance.name}·${seen + 1}`;
    });
}
function rotationMatrix(rotate) {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const [rx, ry, rz] = rotate.map(toRad);
    const cx = Math.cos(rx), sx = Math.sin(rx);
    const cy = Math.cos(ry), sy = Math.sin(ry);
    const cz = Math.cos(rz), sz = Math.sin(rz);
    // Row-major 3×3: Rx·Ry·Rz
    return new Float64Array([
        cy * cz, -cy * sz, sy,
        cx * sz + sx * sy * cz, cx * cz - sx * sy * sz, -sx * cy,
        sx * sz - cx * sy * cz, sx * cz + cx * sy * sz, cx * cy,
    ]);
}
function transformMesh(mesh, translate, rotate) {
    const isIdentity = translate.every((v) => v === 0) && rotate.every((v) => v === 0);
    if (isIdentity)
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
    // Normals rotate with the same linear part (translation never applies).
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
/**
 * Compose the assembly scene: one transformed mesh copy per instance, colored
 * by list position (see INSTANCE_PALETTE). Instances referencing bodies
 * missing from `bodies` (consumed by a later boolean) are skipped — the
 * worker's live list already filters them, this is the replay-side double
 * guard. Duplicate names get a ·N suffix (assemblyDisplayNames).
 */
export function composeAssemblyMeshes(bodies, instances) {
    const meshes = [];
    const names = assemblyDisplayNames(instances);
    for (let index = 0; index < instances.length; index++) {
        const instance = instances[index];
        const body = bodies.get(instance.bodyId);
        if (body === undefined)
            continue;
        meshes.push(transformMesh({ ...body, name: names[index], color: instanceColor(index) }, instance.translate, instance.rotate));
    }
    return meshes;
}
/**
 * Rebuild the assembly state purely from the persisted op log — the worker
 * keeps the same data live (Map insertion order = push order here), so the
 * tree endpoint serves restart-safe data without a worker round-trip.
 */
export function foldAssemblyState(ops, bodyNames) {
    const instances = [];
    let entities = [];
    let constraints = [];
    const liveBodyIds = new Set();
    for (const op of ops) {
        switch (op.kind) {
            case 'create_prim':
            case 'extrude_profile':
            case 'loft':
            case 'revolve':
            case 'sweep':
                liveBodyIds.add(op.bodyId);
                break;
            case 'pattern': {
                // Mirror the worker's unique-copy rule so replay-derived ids match
                // (repeat patterns of the same target uniquify against live ids).
                const count = Math.max(1, Math.trunc(op.count));
                for (let i = 1; i < count; i++) {
                    let seq = i;
                    let id = `${op.target}p${seq}`;
                    while (liveBodyIds.has(id))
                        id = `${op.target}p${++seq}`;
                    liveBodyIds.add(id);
                }
                break;
            }
            case 'delete':
                liveBodyIds.delete(op.target);
                break;
            case 'boolean':
                for (const tool of op.tools)
                    liveBodyIds.delete(tool);
                break;
            case 'assembly_insert':
                instances.push({
                    instanceId: op.instanceId,
                    bodyId: op.bodyId,
                    name: op.name ?? bodyNames[op.bodyId] ?? op.bodyId,
                    translate: op.translate ?? [0, 0, 0],
                    rotate: op.rotate ?? [0, 0, 0],
                });
                break;
            case 'assembly_transform': {
                const instance = instances.find((entry) => entry.instanceId === op.instanceId);
                if (instance !== undefined) {
                    if (op.translate !== undefined)
                        instance.translate = op.translate;
                    if (op.rotate !== undefined)
                        instance.rotate = op.rotate;
                }
                break;
            }
            case 'assembly_remove': {
                const index = instances.findIndex((entry) => entry.instanceId === op.instanceId);
                if (index !== -1)
                    instances.splice(index, 1);
                break;
            }
            case 'constraints':
                // The last declaration wins (a clear records an empty model).
                entities = op.model.entities;
                constraints = op.model.constraints;
                break;
            default:
                break;
        }
    }
    return { instances, entities, constraints, liveBodyIds };
}
/** Build the assembly-tree payload from a restored document. */
export function assemblyTreePayload(doc) {
    const { instances, entities, constraints, liveBodyIds } = foldAssemblyState(doc.ops, doc.bodyNames);
    const names = assemblyDisplayNames(instances);
    const nameByInstanceId = new Map(instances.map((instance, index) => [instance.instanceId, names[index]]));
    const entityName = (id) => {
        if (typeof id !== 'number')
            return undefined;
        const entity = entities.find((entry) => entry.id === id);
        if (entity?.instance !== undefined)
            return nameByInstanceId.get(entity.instance) ?? entity.instance;
        return `#${id}`;
    };
    return {
        docId: doc.docId,
        version: doc.version,
        parts: instances.map((instance, index) => ({
            instanceId: instance.instanceId,
            bodyId: instance.bodyId,
            name: names[index],
            color: instanceColor(index),
            // Missing only when BOTH witnesses lack the body: liveBodyIds (folded
            // from the op log — covers pattern copies in documents written before
            // copy names were recorded, issue #6) and bodyNames (the recorded name
            // manifest).
            missing: !liveBodyIds.has(instance.bodyId) && doc.bodyNames[instance.bodyId] === undefined,
        })),
        constraints: constraints.map((constraint) => {
            const entry = { id: constraint.id, type: String(constraint.kind.type ?? 'constraint') };
            if (constraint.label !== undefined)
                entry.label = constraint.label;
            const a = entityName(constraint.kind.a);
            const b = entityName(constraint.kind.b);
            if (a !== undefined)
                entry.a = a;
            if (b !== undefined)
                entry.b = b;
            return entry;
        }),
    };
}
