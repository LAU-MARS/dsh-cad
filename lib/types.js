/**
 * Shared CAD scene model: the normalized JSON the host produces from a CAD
 * file and the browser card renders. Binary payloads (positions, normals,
 * indices) are base64-encoded typed arrays to keep large meshes transportable.
 */
/** Flatten a converted scene into the model/card-facing summary. */
export function sceneStats(scene) {
    if (scene.kind === '3d') {
        return {
            format: scene.format,
            meshes: scene.meshes.length,
            triangles: scene.meshes.reduce((sum, mesh) => sum + mesh.triangleCount, 0),
            boundsMin: [scene.bounds.min.x, scene.bounds.min.y, scene.bounds.min.z],
            boundsMax: [scene.bounds.max.x, scene.bounds.max.y, scene.bounds.max.z],
            units: scene.units,
        };
    }
    return {
        format: scene.format,
        entities: scene.entities.length,
        layers: scene.layers,
        boundsMin: [scene.bounds.min.x, scene.bounds.min.y],
        boundsMax: [scene.bounds.max.x, scene.bounds.max.y],
    };
}
