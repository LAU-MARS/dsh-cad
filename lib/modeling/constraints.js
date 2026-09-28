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
