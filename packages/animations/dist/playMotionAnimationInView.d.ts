import { type AnimationControls, type InViewOptions } from 'motion';
import type { createMotionArchitect } from './createMotionArchitect';
export type PlayMotionAnimationInViewParams = {
    /**
     * The animation to play, returned from either `animate` or `timeline` from Motion.
     */
    animation: AnimationControls;
    /**
     * The architect to register the animation with.
     * If provided, the animation will be unregistered when the element is out of view
     * and reversed if the element is in view when a navigation occurs.
     */
    architect?: ReturnType<typeof createMotionArchitect>;
    /**
     * Whether to reverse the animation when the element is out of view. DEFAULT: true
     */
    reverse?: boolean;
    /**
     * The options to pass to the inView function.
     */
    inViewOptions?: InViewOptions;
};
/**
 * Plays a Motion animation when the element comes into view.
 * Registers it with an optional architect (@see `createMotionArchitect`) so that if the element is in view when a navigation occurs,
 * the animation will be reversed (which can be turned off with `reverse: false`).
 * Make sure that the animation is set to `autoplay: false`, otherwise it will play immediately, potentially before the element is in view.
 */
export declare const playMotionAnimationInView: (node: HTMLElement, params: PlayMotionAnimationInViewParams) => {
    destroy: VoidFunction;
};
