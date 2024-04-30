/// <reference types="svelte" />
export type ScrollPosition = {
    x: number;
    y: number;
};
/**
 * A readable store that returns the current scroll positions
 * of the user (x and y).
 */
export declare const currentScroll: import("svelte/store").Readable<ScrollPosition>;
