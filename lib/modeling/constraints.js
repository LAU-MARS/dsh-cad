/** Constraint-kind keys that hold entity refs (per the solver's schema). */
const REF_KEYS = ['a', 'b', 'c', 'about'];
function isRefKey(key) {
    return REF_KEYS.includes(key);
}
/** A u32-compatible id (non-negative integer; numeric strings count). */
function parseNumericId(raw) {
    const value = typeof raw === 'string' && /^-?\d+$/.test(raw) ? Number(raw) : raw;
    return typeof value === 'number' && Number.isInteger(value) && value >= 0 ? value : undefined;
}
/**
 * Id assigner for one namespace (entities, constraints). Solver ids are u32s,
 * but LLM callers naturally pass string labels too ("iA"); labels alias to the
 * smallest free integer, and malformed ids (floats, negatives, NaN) fail here
 * with a precise message — the #8 bug was `Number("iA")` → NaN → `null` in the
 * solver JSON, a cryptic Rust-side deserialization error.
 */
export function createIdAssigner(what) {
    const used = new Set();
    const aliases = new Map();
    const free = () => {
        let id = 0;
        while (used.has(id))
            id += 1;
        return id;
    };
    const declared = () => [...used].sort((a, b) => a - b).join(', ');
    const claim = (raw, where) => {
        let id;
        if (raw === undefined || raw === null) {
            id = free();
        }
        else if (typeof raw === 'string') {
            id = parseNumericId(raw);
            if (id === undefined) {
                const existing = aliases.get(raw);
                if (existing !== undefined)
                    throw new Error(`${where}: duplicate ${what} id "${raw}"`);
                id = free();
                aliases.set(raw, id);
            }
        }
        else {
            id = parseNumericId(raw);
        }
        if (id === undefined)
            throw new Error(`${where}: ${what} id must be a non-negative integer or a string label, got ${JSON.stringify(raw) ?? String(raw)}`);
        if (used.has(id))
            throw new Error(`${where}: duplicate ${what} id ${id}`);
        used.add(id);
        return id;
    };
    /** Resolve a constraint's entity ref: numeric ids validate, labels map through the alias table. */
    const ref = (raw, where) => {
        const id = typeof raw === 'string' ? parseNumericId(raw) ?? aliases.get(raw) : parseNumericId(raw);
        if (id === undefined)
            throw new Error(`${where}: entity ref must be a non-negative integer or a declared label, got ${JSON.stringify(raw) ?? String(raw)} (declared: ${declared()})`);
        if (!used.has(id))
            throw new Error(`${where}: unknown entity id ${id} (declared: ${declared()})`);
        return id;
    };
    return { claim, ref };
}
/**
 * Normalize raw cad_constraint args into the persisted model: ids become u32s
 * (string labels aliased), constraint refs resolve through the same table, and
 * every malformed id fails here instead of at solve time.
 */
export function normalizeConstraintModel(entitiesRaw, constraintsRaw) {
    const entityIds = createIdAssigner('entity');
    const entities = entitiesRaw.map((entity, index) => ({
        id: entityIds.claim(entity.id, `entities[${index}]`),
        ...(typeof entity.instance === 'string' ? { instance: entity.instance } : {}),
        ...(typeof entity.geometry === 'object' && entity.geometry !== null ? { geometry: entity.geometry } : {}),
    }));
    const constraintIds = createIdAssigner('constraint');
    const constraints = constraintsRaw.map((constraint, index) => {
        const { id, type, label, ...params } = constraint;
        const kind = { type: String(type) };
        for (const [key, value] of Object.entries(params)) {
            kind[key] = isRefKey(key) && value !== null && value !== undefined ? entityIds.ref(value, `constraints[${index}].${key}`) : value;
        }
        return {
            id: constraintIds.claim(id, `constraints[${index}]`),
            kind,
            ...(typeof label === 'string' ? { label } : {}),
        };
    });
    return { entities, constraints };
}
// ── Euler degrees ↔ axis-angle radians (via quaternion, XYZ order) ───────────
const DEG = Math.PI / 180;
function eulerToQuaternion(rx, ry, rz) {
    const cx = Math.cos((rx * DEG) / 2), sx = Math.sin((rx * DEG) / 2);
    const cy = Math.cos((ry * DEG) / 2), sy = Math.sin((ry * DEG) / 2);
    const cz = Math.cos((rz * DEG) / 2), sz = Math.sin((rz * DEG) / 2);
    // Rx·Ry·Rz composition — the same convention as cad_transform / assembly.ts
    // (coefficient signs matrix-verified; see the round-trip tests).
    return [
        sx * cy * cz + cx * sy * sz,
        cx * sy * cz - sx * cy * sz,
        cx * cy * sz + sx * sy * cz,
        cx * cy * cz - sx * sy * sz,
    ];
}
function quaternionToEuler(qw, qx, qy, qz) {
    // Exact inverse of eulerToQuaternion, extracted from the Rx·Ry·Rz rotation
    // matrix written in quaternion terms: ry = asin(m02), rx = atan2(−m12, m22),
    // rz = atan2(−m01, m00). ry is gimbal-limited to ±90°; rx/rz span ±180°.
    const rx = Math.atan2(2 * (qw * qx - qy * qz), 1 - 2 * (qx * qx + qy * qy)) / DEG;
    const s2 = Math.min(1, Math.max(-1, 2 * (qw * qy + qx * qz)));
    const ry = Math.asin(s2) / DEG;
    const rz = Math.atan2(2 * (qw * qz - qx * qy), 1 - 2 * (qy * qy + qz * qz)) / DEG;
    return [rx, ry, rz];
}
/** Instance placement → solver rigid3 pose. */
export function instanceToRigid3(instance) {
    const [rx, ry, rz] = instance.rotate;
    const [qx, qy, qz, qw] = eulerToQuaternion(rx, ry, rz);
    const angle = 2 * Math.acos(Math.min(1, Math.max(-1, qw)));
    let vector = [0, 0, 0];
    if (angle > 1e-9) {
        const s = Math.sin(angle / 2);
        vector = [(qx / s) * angle, (qy / s) * angle, (qz / s) * angle];
    }
    return {
        translation: { x: instance.translate[0], y: instance.translate[1], z: instance.translate[2] },
        rotation: { vector },
    };
}
/** Solver rigid3 pose → instance placement (translate tuple + Euler degrees). */
export function rigid3ToInstance(pose) {
    const [ax, ay, az] = pose.rotation.vector;
    const angle = Math.hypot(ax, ay, az);
    let qx = 0, qy = 0, qz = 0, qw = 1;
    if (angle > 1e-12) {
        const h = angle / 2;
        const s = Math.sin(h) / angle;
        qx = ax * s;
        qy = ay * s;
        qz = az * s;
        qw = Math.cos(h);
    }
    const [rx, ry, rz] = quaternionToEuler(qw, qx, qy, qz);
    return {
        translate: [pose.translation.x, pose.translation.y, pose.translation.z],
        rotate: [rx, ry, rz],
    };
}
/** Build the solver-input model: instance-bound entities get live rigid3 poses. */
export function buildSolverModel(model, instances) {
    validatePersistedModel(model);
    const byInstance = new Map(instances.map((instance) => [instance.instanceId, instance]));
    const entities = model.entities.map((entity) => {
        if (entity.instance !== undefined) {
            const live = byInstance.get(entity.instance);
            if (live === undefined)
                throw new Error(`constraint entity ${entity.id} references unknown assembly instance: ${entity.instance}`);
            return { id: entity.id, geometry: { type: 'rigid3', pose: instanceToRigid3(live) } };
        }
        if (entity.geometry === undefined)
            throw new Error(`constraint entity ${entity.id} has neither an instance binding nor literal geometry`);
        return { id: entity.id, geometry: entity.geometry };
    });
    return { entities, constraints: model.constraints };
}
/**
 * Guard against models persisted before the id normalization landed (#8):
 * `Number("iA")` stored NaN, which JSON round-trips as null, and string refs
 * passed through raw — both reached the solver as cryptic Rust errors. Point
 * the caller at re-declaring the model instead.
 */
function validatePersistedModel(model) {
    const redo = ' — re-declare the constraint model with cad_constraint (documents from before v0.15.2 may hold broken ids)';
    for (const entity of model.entities) {
        if (parseNumericId(entity.id) === undefined) {
            throw new Error(`constraint entity id must be a non-negative integer, got ${String(entity.id)}${redo}`);
        }
    }
    for (const constraint of model.constraints) {
        if (parseNumericId(constraint.id) === undefined) {
            throw new Error(`constraint ${constraint.id} has an invalid id (${String(constraint.id)})${redo}`);
        }
        for (const [key, value] of Object.entries(constraint.kind)) {
            if (isRefKey(key) && value !== null && parseNumericId(value) === undefined) {
                throw new Error(`constraint ${constraint.id} ${String(constraint.kind.type)} has a non-numeric ${key} ref (${String(value)})${redo}`);
            }
        }
    }
}
/** Extract solved rigid3 poses keyed by entity id (absent for 2D geometry). */
export function solvedRigid3s(reportEntities) {
    const out = new Map();
    for (const entity of reportEntities) {
        if (entity.geometry?.type === 'rigid3' && entity.geometry.pose !== undefined) {
            out.set(entity.id, entity.geometry.pose);
        }
    }
    return out;
}
