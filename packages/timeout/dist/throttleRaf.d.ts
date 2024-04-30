/**
 * @returns a throttled function that is called at most once per animation frame.
 */
export declare const throttleRaf: <T extends (...args: unknown[]) => void>(callback: T) => T;
