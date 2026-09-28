/**
 * dsh-cad part document (`.dcprt`) — the standalone, shareable counterpart of
 * the workspace modeling document: a replayable feature history plus a body
 * manifest. Replaying `features` through the OCCT modeling worker reproduces
 * every body exactly, which keeps the file itself geometry-free.
 *
 * Format definition only — runtime persistence/exchange (cad_export filters,
 * loaders) lands together with the assembly and drawing pipelines.
 */
import type { ModelOp } from '../modeling/client.js';
import type { ModelDoc } from '../modeling/document.js';
export declare const DC_PRT_FORMAT: "dcprt";
export declare const DC_PRT_EXTENSION = ".dcprt";
export interface DcPrtHeader {
    format: typeof DC_PRT_FORMAT;
    version: 1;
    units: 'mm';
    upAxis: 'Z';
}
export interface DcPrtBody {
    bodyId: string;
    name?: string;
}
export interface DcPrtDocument {
    header: DcPrtHeader;
    /** Document id from the originating workspace; doubles as the scene viewId. */
    docId: string;
    /** Document version at export time (monotonic op counter). */
    version?: number;
    /** Feature history — replayable by the OCCT modeling worker, in order. */
    features: ModelOp[];
    bodies: DcPrtBody[];
    createdAt?: string;
}
/** Serialize a live workspace modeling document into the shareable .dcprt form. */
export declare function toDcPrtDocument(doc: ModelDoc): DcPrtDocument;
export declare function isDcPrtDocument(value: unknown): value is DcPrtDocument;
