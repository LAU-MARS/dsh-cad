/**
 * Image → 2D profile extraction: Otsu binarization, connected components,
 * Moore boundary tracing, Douglas-Peucker simplification. Coordinates flip
 * to CAD orientation (y up, mm via `scale`, default 1 px = 1 mm).
 */
import type { GrayImage } from '../convert/png.js';
export interface ExtractOptions {
    /** Manual binarization threshold (0–255); omit for Otsu. */
    threshold?: number;
    /** Trace light-on-dark shapes instead of dark-on-light. */
    invert?: boolean;
    /** Simplification tolerance in pixels (default 1.5). */
    tolerance?: number;
    /** Pixels per mm (default 1). */
    scale?: number;
    /** Ignore components smaller than this pixel area (default 24). */
    minArea?: number;
}
export interface ExtractedProfile {
    /** Flat [x0,y0, x1,y1, …] closed loop, mm, y-up. */
    points: number[];
    /** Pixel area of the source component (rough size ranking). */
    area: number;
}
/** Otsu's threshold for a luma image. */
export declare function otsuThreshold(gray: Uint8Array): number;
/** Extract simplified outer contours from a luma image, largest first. */
export declare function extractProfiles(image: GrayImage, options?: ExtractOptions): ExtractedProfile[];
