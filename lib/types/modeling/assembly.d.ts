/**
 * Assembly composition (main thread): instances reference body meshes by id
 * and place them with translate + XYZ-Euler rotate (degrees, the same
 * "translate → rotate" convention as cad_transform / the worker's
 * BRepBuilderAPI_Transform path: p' = T + Rx·(Ry·(Rz·p))). Composition is
 * pure typed-array math on the already-tessellated body meshes — no worker
 * round-trip, no re-tessellation.
 */
import type { BinMeshData } from './bin-format.js';
import type { AssemblyInstance, ModelOp } from './client.js';
import type { ConstraintEntity, ConstraintEntry } from './constraints.js';
import type { ModelDoc } from './document.js';
import type { AssemblyConnection, JointSpec } from './joints.js';
/**
 * The per-instance pastel palette: instance i takes palette[i % n] both in the
 * composed 3D scene and in the assembly-tree swatches, so a part's color chip
 * always matches its solid. Stable per list position (the worker's insertion
 * order), like the reference CAD assembly panels.
 */
export declare const INSTANCE_PALETTE: readonly number[];
/** The palette color of the instance at `index` in the assembly list. */
export declare function instanceColor(index: number): number;
/**
 * Instance display names with the ·N dedup suffix — the single source for
 * mesh names in the composed scene AND part names in the assembly tree, so a
 * tree row always names its mesh (highlight linking relies on it).
 */
export declare function assemblyDisplayNames(instances: AssemblyInstance[]): string[];
/**
 * Compose the assembly scene: one transformed mesh copy per instance, colored
 * by list position (see INSTANCE_PALETTE). Instances referencing bodies
 * missing from `bodies` (consumed by a later boolean) are skipped — the
 * worker's live list already filters them, this is the replay-side double
 * guard. Duplicate names get a ·N suffix (assemblyDisplayNames). `explode`
 * (from explodeOffsets) shifts each instance radially before composing —
 * the exploded view, view-only math over the same placement data.
 */
export declare function composeAssemblyMeshes(bodies: Map<string, BinMeshData>, instances: AssemblyInstance[], explode?: ReadonlyMap<string, [number, number, number]>): BinMeshData[];
/** The assembly state folded from a document's op log (worker-equivalent). */
export interface FoldedAssembly {
    instances: AssemblyInstance[];
    entities: ConstraintEntity[];
    constraints: ConstraintEntry[];
    /** Body ids alive at the end of the log — the ground truth for "missing".
     *  Folded from ops rather than read off bodyNames because documents written
     *  before pattern copies were recorded have incomplete name maps. */
    liveBodyIds: Set<string>;
    /** Joints per instance (label → spec), folded from the joint ops. */
    joints: Map<string, Record<string, JointSpec>>;
    /** Recorded joint pairings (connect order preserved — solve replays them). */
    connections: AssemblyConnection[];
    /** Latest exploded-view factor (0 = assembled). */
    explode: number;
}
/**
 * Rebuild the assembly state purely from the persisted op log — the worker
 * keeps the same data live (Map insertion order = push order here), so the
 * tree endpoint serves restart-safe data without a worker round-trip.
 *
 * Joint ops are metadata: the placements they solve are written back through
 * `assembly_transform` ops by the tool layer, so this fold carries specs and
 * connections but computes no algebra — replay restores identical placements.
 */
export declare function foldAssemblyState(ops: ModelOp[], bodyNames: Record<string, string>): FoldedAssembly;
/** One PARTS row of the assembly tree. */
export interface AssemblyTreePart {
    instanceId: string;
    bodyId: string;
    /** Display name — identical to the composed scene's mesh name. */
    name: string;
    color: number;
    /** True when the referenced body was consumed (no mesh in the scene). */
    missing: boolean;
}
/** One CONSTRAINTS row; a/b are resolved display names where possible. */
export interface AssemblyTreeConstraint {
    id: number;
    type: string;
    label?: string;
    a?: string;
    b?: string;
}
/** One JOINTS row of the assembly tree (a joint, plus its pairing if connected). */
export interface AssemblyTreeJoint {
    instanceId: string;
    label: string;
    type: string;
    /** Display text of the current motion value ("30°", "12mm · 5°"). */
    value?: string;
    /** The owner instance's display name. */
    owner: string;
    /** "owner.label ↔ peer.name" when this joint is one side of a pairing. */
    link?: string;
}
/** GET /dsh-cad/asm/<docId> response body. */
export interface AssemblyTreePayload {
    docId: string;
    version: number;
    parts: AssemblyTreePart[];
    constraints: AssemblyTreeConstraint[];
    joints: AssemblyTreeJoint[];
    /** Exploded-view factor (absent when assembled). */
    explode?: number;
}
/** Build the assembly-tree payload from a restored document. */
export declare function assemblyTreePayload(doc: ModelDoc): AssemblyTreePayload;
