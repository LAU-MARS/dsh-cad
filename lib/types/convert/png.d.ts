export interface GrayImage {
    width: number;
    height: number;
    /** Luma per pixel, row-major, 0–255. */
    gray: Uint8Array;
}
/** Decode a PNG buffer to a luma image. */
export declare function decodePng(buffer: Buffer): GrayImage;
