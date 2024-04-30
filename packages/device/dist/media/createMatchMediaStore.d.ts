/// <reference types="svelte" />
/**
 * @returns A readable store which is true when the media query matches and false when it doesn't.
 */
export declare const createMatchMediaStore: (mediaQuery: string) => import("svelte/store").Readable<boolean>;
export type MatchMediaStore = ReturnType<typeof createMatchMediaStore>;
