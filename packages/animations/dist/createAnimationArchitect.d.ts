import { registerTransition } from '@288-toolkit/page-transition';
export type AnimationFunction = (params: {
    durationMs: number;
    duration: number;
}) => void;
export type RegisterAnimationFn = (outAnimation: AnimationFunction) => () => void;
export type ArchitectInstance = {
    registerAnimation: RegisterAnimationFn;
    start: typeof registerTransition;
};
export type ArchitectOptions = {
    outDuration: number;
};
export type ArchitectParams = Partial<ArchitectOptions>;
/**
 * An architect allows you to register animation functions that will get played when
 * transitioning out from a page, which is useful to coordinate multiple outro animations.
 * The architect instance has to be initialized with the provided `start` function in order to work, which is
 * a wrapper around {@link registerTransition | page transition}.
 * @param {object} options Architect options:
 * - `outDuration`: The outro duration in ms that the animations must be played for. Default: `400`.
 * @returns The architect instance:
 * - `start`: A wrapper around {@link registerTransition | page transition} that initializes the architect. This function
 * MUST be called at component initialization. It returns the `$transitioning` store for registered transition.
 * - `registerAnimation`: The function to register your outro animations.
 */
export declare const createAnimationArchitect: (options?: ArchitectParams) => {
    registerAnimation: (outAnimation: AnimationFunction) => () => void;
    start: any;
};
