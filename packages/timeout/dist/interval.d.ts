/**
 * Creates an interval that calls a function at a fixed interval using requestAnimationFrame.
 * @returns a function that cancels the interval.
 */
export declare const interval: (callback: () => void, delay?: number) => () => void;
