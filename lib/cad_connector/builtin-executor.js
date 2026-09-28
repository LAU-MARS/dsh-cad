import { createModelClient } from '../modeling/client.js';
function workerMeshToExecutorMesh(mesh) {
    return {
        bodyId: mesh.bodyId ?? mesh.name,
        name: mesh.name,
        positions: mesh.positions,
        normals: mesh.normals,
        indices: mesh.indices,
        vertexCount: mesh.vertexCount,
        triangleCount: mesh.triangleCount,
    };
}
/** The shared WASM kernel always exists in this build. */
export const BUILTIN_EXECUTOR = {
    id: 'builtin',
    label: 'Built-in OCCT kernel',
    available: () => true,
    run(program) {
        return runOnIsolatedWorker(program);
    },
};
async function runOnIsolatedWorker(program) {
    const client = createModelClient();
    try {
        if (program.input !== undefined) {
            throw new Error('the built-in executor does not load input files (use the cad_view/cad_freecad paths)');
        }
        const volumes = {};
        let exported;
        await client.run({ kind: 'reset' });
        for (const op of program.ops) {
            const kind = String(op.kind);
            if (kind === 'volume') {
                const result = await client.run({ kind: 'volume', target: String(op.target) });
                if (result.volume !== undefined)
                    volumes[String(op.target)] = result.volume;
            }
            else if (kind === 'export') {
                const result = await client.run({ kind: 'export', target: String(op.target), format: (op.format ?? 'stl') });
                // The worker writes into its WASM filesystem; the export path is
                // surfaced by the cad_export tool path, not here.
                exported = result.bytes !== undefined ? String(op.path ?? '') : undefined;
            }
            else {
                await client.run(op);
            }
        }
        const tessellated = await client.run({ kind: 'tessellate_all' });
        const meshes = (tessellated.meshes ?? []).map(workerMeshToExecutorMesh);
        return { meshes, volumes, exported };
    }
    finally {
        client.dispose();
    }
}
