/**
 * Joint algebra for the assembly (main thread, pure math — kernel-independent).
 *
 * Mirrors cadorange 0.10.0's runtime assembly model (build123d joint family)
 * in dsh-cad's placement convention: flat world-placed instances with
 * translate + XYZ-Euler rotate (degrees, p' = T + Rx·(Ry·(Rz·p))). Joints are
 * placement data — a frame in the owner's LOCAL coordinates plus a motion
 * value; connecting pairs solves the child's world placement:
 *
 * ```text
 * childWorld = parentWorld ∘ Fp ∘ Mp(valueP) ∘ Mc(valueC) ∘ Fc⁻¹
 * ```
 *
 * `connect` is a one-time solve (the tool layer writes the result back through
 * an `assembly_transform` op, so the op log replays without this module);
 * driving a joint value or re-solving replays every recorded connection at
 * current values — the motion-study path. The worker never computes any of
 * this: joint specs and connections are persisted as ops and folded here.
 */
import type { AssemblyInstance } from './client.js';
import type { BinMeshData } from './bin-format.js';
export type JointType = 'rigid' | 'revolute' | 'linear' | 'cylindrical' | 'ball' | 'planar' | 'polar';
export declare const JOINT_TYPES: readonly JointType[];
/**
 * A joint definition persisted in the op log. The frame (`at` + `axis`/`xDir`)
 * lives in the OWNER instance's local coordinates; `value` is the joint's
 * current motion (a bare number drives single-DOF joints).
 */
export interface JointSpec {
    type: JointType;
    /** Frame origin in the owner's local coordinates (mm). */
    at?: [number, number, number];
    /** Joint axis / frame Z (default +Z). */
    axis?: [number, number, number];
    /** Pins the zero-position orientation (the frame's local X). */
    xDir?: [number, number, number];
    value?: JointValue;
    angularRange?: [number, number];
    linearRange?: [number, number];
}
export type JointValue = number | {
    angle?: number;
    linear?: number;
    radial?: number;
    position?: [number, number];
    angles?: [number, number, number];
};
/** One recorded joint pairing (child placed against parent). */
export interface AssemblyConnection {
    /** The child instance that was placed. */
    child: string;
    /** The parent (fixed side) instance. */
    parent: string;
    parentLabel: string;
    childLabel: string;
}
type Vec3 = [number, number, number];
/** Rigid transform as a row-major 3×3 rotation + translation. */
export interface RigidMat {
    /** Row-major [r00,r01,r02, r10,r11,r12, r20,r21,r22]. */
    r: readonly number[];
    t: Vec3;
}
/** Row-major rotation of XYZ Euler degrees — Rx·Ry·Rz (cad_transform). */
export declare function eulerMatrix(rotate: Vec3): number[];
/** Euler degrees back out of a row-major Rx·Ry·Rz rotation (gimbal at ±90° ry). */
export declare function matrixEuler(r: readonly number[]): Vec3;
/** a ∘ b — apply b first, then a. */
export declare function composeMat(a: RigidMat, b: RigidMat): RigidMat;
export declare function invertMat(a: RigidMat): RigidMat;
export interface Placement {
    translate: Vec3;
    rotate: Vec3;
}
export declare function placementMat(p: Placement): RigidMat;
export declare function matPlacement(m: RigidMat): Placement;
/**
 * The joint's frame in the owner's local coordinates: local X → xDir (or the
 * deterministic fallback), local Z → axis, origin → at. Columns are the frame
 * axes, so frameMat maps joint-local coordinates onto owner-local ones.
 */
export declare function jointFrameMat(spec: JointSpec): RigidMat;
/** The joint's motion at its current value, in joint-local coordinates. */
export declare function jointMotionMat(spec: JointSpec): RigidMat;
/** The spec's value as an object (a bare number routed per type). */
export declare function valueOf(spec: JointSpec): Exclude<JointValue, number>;
/** Validate + normalize a raw cad_assembly_joint payload into a JointSpec. */
export declare function normalizeJointSpec(raw: unknown, where: string): JointSpec;
/**
 * Merge a motion value into a spec (driving a joint): object values overlay
 * their keys onto the current value, a bare number replaces the single DOF.
 */
export declare function mergeJointValue(spec: JointSpec, value: JointValue, where: string): JointSpec;
/** Check a parent↔child pairing (build123d's table). */
export declare function checkPairing(parentType: JointType, childType: JointType, where: string): void;
/**
 * Merge a connect-time value into the pairing (build123d semantics): the
 * value drives the PARENT joint — except a linear→revolute pair, where
 * `angle` routes to the child revolute and the rest goes to the parent.
 */
export declare function applyConnectValue(parentSpec: JointSpec, childSpec: JointSpec, value: JointValue, where: string): {
    parent: JointSpec;
    child: JointSpec;
};
/**
 * Solve the child's world placement so the two joint frames coincide (with
 * both motions applied) — cadorange's `connectTo` in the flat world-placed
 * model. The parent stays fixed; the child is repositioned.
 */
export declare function solveConnection(parent: Placement, parentSpec: JointSpec, childSpec: JointSpec): Placement;
/**
 * Replay every connection at the joints' CURRENT values (recorded order — a
 * connection whose parent was itself placed by an earlier connection chains
 * through its fresh placement). Returns the solved placement per child.
 */
export declare function solveConnections(instances: AssemblyInstance[], joints: ReadonlyMap<string, Readonly<Record<string, JointSpec>>>, connections: readonly AssemblyConnection[]): Map<string, Placement>;
/**
 * Exploded-view offsets per instance (cadorange's `explode` in the flat
 * model): every instance is pushed radially away from the assembly's world
 * bbox center — direction = instance world center − assembly center,
 * magnitude = factor × that distance. Returns instanceId → world offset
 * (empty when factor is 0 or no two centers differ).
 */
export declare function explodeOffsets(bodies: ReadonlyMap<string, BinMeshData>, instances: readonly AssemblyInstance[], factor: number): Map<string, Vec3>;
/** Human value text ("30°", "12mm", "30° · 5mm") — for tool renders and the panel. */
export declare function jointValueText(spec: JointSpec): string;
/** Chinese labels for the joint kinds (panel display). */
export declare const JOINT_TYPE_ZH: Record<JointType, string>;
export {};
