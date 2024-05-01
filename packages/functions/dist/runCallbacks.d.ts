/**
 * Batch multiple functions into one.
 * @param fns
 * @returns  A single function that calls all functions passed as arguments.
 */
export declare const runCallbacks: (...fns: (() => void | undefined | null)[]) => () => void;
