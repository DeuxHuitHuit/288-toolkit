/// <reference types="svelte" />
import { type AnimationOptionsWithOverrides, type InViewOptions, type MotionKeyframesDefinition } from 'motion';
import { expoOut } from 'svelte/easing';
import { type PlayMotionAnimationInViewParams } from './playMotionAnimationInView.js';
export type AnimateInViewParams = {
    /**
     * The keyframes of the animation
     */
    keyframes: MotionKeyframesDefinition;
    /**
     * The animation options.
     */
    options?: AnimationOptionsWithOverrides;
    /**
     * The selector to use to find the elements to animate. If not provided, the node itself will be animated.
     */
    selector?: string;
    /**
     * Disables the animation. DEFAULT: false
     */
    disabled?: boolean;
    /**
     * Reverses the animation when the element is out of view. DEFAULT: true
     */
    reverse?: boolean;
    /**
     * @see `playMotionAnimationInView`
     */
    architect?: PlayMotionAnimationInViewParams['architect'];
    /**
     * @see `playMotionAnimationInView`
     */
    inViewOptions?: InViewOptions;
};
export declare const DEFAULT_ANIMATE_IN_VIEW_DURATION = 1;
export declare const DEFAULT_ANIMATE_IN_VIEW_EASING: typeof expoOut;
export declare const DEFAULT_OPTIONS: {
    duration: number;
    easing: typeof expoOut;
};
/**
 * Wraps `playMotionAnimationInView` and provides some nice defaults and options.
 */
export declare const animateInView: (node: HTMLElement, params: AnimateInViewParams) => {
    destroy: VoidFunction;
} | undefined;
