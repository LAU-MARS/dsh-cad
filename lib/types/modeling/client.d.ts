export interface WorkerMesh {
    name: string;
    positions: Float32Array;
    normals: Float32Array;
    indices: Uint32Array;
    vertexCount: number;
    triangleCount: number;
}
/** One placed reference of a body inside the assembly. */
export interface AssemblyInstance {
    instanceId: string;
    bodyId: string;
    name: string;
    translate: [number, number, number];
    rotate: [number, number, number];
}
/** One projected hidden-line drawing view (flat [x,y, x,y, …] polylines, mm). */
export interface DrawingView {
    name: string;
    visible: number[][];
    hidden: number[][];
}
export interface OpResult {
    bodyId?: string;
    name?: string;
    removed?: string[];
    edges?: number;
    mesh?: WorkerMesh;
    meshes?: Array<WorkerMesh & {
        bodyId: string;
    }>;
    bytes?: ArrayBuffer;
    volume?: number;
    /** Center of mass [x,y,z] (occt.ts backend). */
    centroid?: number[];
    deleted?: string;
    cleared?: boolean;
    views?: DrawingView[];
    instanceId?: string;
    instances?: AssemblyInstance[];
    /** Pattern op: the newly created copy bodies with their meshes. */
    created?: Array<{
        bodyId: string;
        name?: string;
        mesh?: WorkerMesh;
    }>;
    /** Name of the sketch touched by a sketch op. */
    sketch?: string;
    /** Flat [x,y,z,…] display polyline of the sketch (sketch_set; occt.ts backend). */
    wire?: number[];
    /** Flat [x,y,z,…] TRUE vertex points of the sketch (corners/ends; circles carry none). */
    points?: number[];
    /** Triangulated enclosed region { positions, indices } (the translucent fill). */
    fill?: {
        positions: number[];
        indices: number[];
    };
}
export interface DrawingViewSpec {
    name: string;
    dir: [number, number, number];
    xDir: [number, number, number];
}
export type ModelOp = {
    kind: 'create_prim';
    bodyId: string;
    prim: string;
    params?: Record<string, unknown>;
    name?: string;
} | {
    kind: 'extrude_profile';
    bodyId: string;
    points?: number[];
    profile?: unknown;
    sketch?: string;
    height?: number;
    base?: number;
    name?: string;
} | {
    kind: 'loft';
    bodyId: string;
    sections: number[][];
    solid?: boolean;
    ruled?: boolean;
    name?: string;
} | {
    kind: 'revolve';
    bodyId: string;
    profile?: unknown;
    sketch?: string;
    angle?: number;
    axis?: [number, number, number];
    at?: [number, number, number];
    name?: string;
} | {
    kind: 'chamfer';
    target: string;
    distance: number;
} | {
    kind: 'shell';
    target: string;
    thickness: number;
    openNormals?: Array<[number, number, number]>;
    faces?: number[];
} | {
    kind: 'draft';
    target: string;
    angle: number;
    direction?: [number, number, number];
    faces?: number[];
} | {
    kind: 'pattern';
    target: string;
    mode: 'linear' | 'circular';
    count: number;
    delta?: [number, number, number];
    axis?: [number, number, number];
    at?: [number, number, number];
    angle?: number;
} | {
    kind: 'sweep';
    bodyId: string;
    profile?: unknown;
    sketch?: string;
    path: number[];
    name?: string;
} | {
    kind: 'boolean';
    op: 'fuse' | 'cut' | 'common';
    target: string;
    tools: string[];
} | {
    kind: 'fillet';
    target: string;
    radius: number;
} | {
    kind: 'transform';
    target: string;
    translate?: [number, number, number];
    rotate?: [number, number, number];
    mirror?: [number, number, number];
} | {
    kind: 'tessellate_all';
} | {
    kind: 'export';
    target: string;
    format: 'step' | 'stl';
} | {
    kind: 'volume';
    target: string;
} | {
    kind: 'delete';
    target: string;
} | {
    kind: 'reset';
} | {
    kind: 'drawing';
    target: string;
    views: DrawingViewSpec[];
    sceneViewId?: string;
    name?: string;
    paper?: 'A4' | 'A3';
} | {
    kind: 'assembly_insert';
    instanceId: string;
    bodyId: string;
    name?: string;
    translate?: [number, number, number];
    rotate?: [number, number, number];
} | {
    kind: 'assembly_transform';
    instanceId: string;
    translate?: [number, number, number];
    rotate?: [number, number, number];
} | {
    kind: 'assembly_remove';
    instanceId: string;
} | {
    kind: 'assembly_list';
} | {
    kind: 'constraints';
    model: {
        entities: unknown[];
        constraints: unknown[];
    };
} | {
    kind: 'export_assembly';
    format: 'step' | 'stl';
} | {
    kind: 'sketch_set';
    name: string;
    profile: unknown;
} | {
    kind: 'sketch_delete';
    name: string;
};
export interface ModelClient {
    /** Run one modeling operation on this client's worker. */
    run(op: ModelOp, timeoutMs?: number): Promise<OpResult>;
    /** Terminate the worker and fail any in-flight jobs. */
    dispose(): void;
}
export declare function createModelClient(): ModelClient;
/** Run one modeling operation on the shared session worker. */
export declare function runModelOp(op: ModelOp, timeoutMs?: number): Promise<OpResult>;
/** Current reset epoch of the shared worker (see above). */
export declare function workerResetEpoch(): number;
/** Test/Dev helper: hard worker file path (used by the vitest suite). */
export declare function workerEntryPath(): string;
