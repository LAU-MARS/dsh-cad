/**
 * Constraint-model helpers: map dsh-cad assembly instances (translate + XYZ
 * Euler degrees, matching cad_transform / assembly.ts) to and from the
 * Ansatz solver's `rigid3` pose (translation + rotation as an exponential-map
 * vector — direction = axis, magnitude = radians), plus the persisted
 * constraint-model types shared by the cad_constraint / cad_solve /
 * cad_motion tools.
 */
import type { AssemblyInstance } from './client.js';
export interface SolverVec3 {
    x: number;
    y: number;
    z: number;
}
/** Ansatz rigid3 pose: translation + exponential-map rotation vector. */
export interface Rigid3Pose {
    translation: SolverVec3;
    rotation: {
        vector: [number, number, number];
    };
}
/** One entity of the persisted constraint model. */
export interface ConstraintEntity {
    id: number;
    /** Assembly instance this entity tracks (geometry stays in sync on solve). */
    instance?: string;
    /** Literal geometry (point2 …) or a rigid3 snapshot; omitted for instance-bound entities until solve time. */
    geometry?: Record<string, unknown>;
}
/** One constraint, pass-through to the solver's schema (type + refs + params). */
export interface ConstraintEntry {
    id: number;
    kind: Record<string, unknown>;
    label?: string;
}
/** The persisted constraint model (op log entry; the worker stores it as a no-op). */
export interface ConstraintModel {
    entities: ConstraintEntity[];
    constraints: ConstraintEntry[];
}
/** Instance placement → solver rigid3 pose. */
export declare function instanceToRigid3(instance: AssemblyInstance): Rigid3Pose;
/** Solver rigid3 pose → instance placement (translate tuple + Euler degrees). */
export declare function rigid3ToInstance(pose: Rigid3Pose): {
    translate: [number, number, number];
    rotate: [number, number, number];
};
/** Build the solver-input model: instance-bound entities get live rigid3 poses. */
export declare function buildSolverModel(model: ConstraintModel, instances: AssemblyInstance[]): {
    entities: Array<{
        id: number;
        geometry: Record<string, unknown>;
    }>;
    constraints: ConstraintEntry[];
};
/** Extract solved rigid3 poses keyed by entity id (absent for 2D geometry). */
export declare function solvedRigid3s(reportEntities: Array<{
    id: number;
    geometry?: {
        type?: string;
        pose?: Rigid3Pose;
    };
}>): Map<number, Rigid3Pose>;
