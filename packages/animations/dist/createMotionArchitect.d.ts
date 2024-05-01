import type { AnimationControls } from 'motion';
import { type ArchitectParams } from './createAnimationArchitect.js';
/**
 *
 * @param options @see createAnimationArchitect
 * @returns An architect instance extended with:
 * - `registerMotionAnimation`: A function that takes the animation controls returned from `animate` or
 * `timline` and automatically reverses the animation when transitioning out.
 */
export declare const createMotionArchitect: (options?: ArchitectParams) => {
    registerMotionAnimation: (animation: AnimationControls) => () => void;
    registerAnimation: (outAnimation: import("./createAnimationArchitect.js").AnimationFunction) => () => void;
    start: any;
};
