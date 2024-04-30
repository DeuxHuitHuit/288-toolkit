import { type KeyframeOptions, type MotionKeyframesDefinition } from 'motion';
export type Easing = KeyframeOptions['easing'];
export type ParallaxOptions = {
    /**
     * Speed of the animation. Negative values invert the direction. 0 disables the animation. DEFAULT: 0.2
     */
    speed?: number;
    /**
     * Easing of the animation. DEFAULT: 'linear'
     */
    easing?: Easing;
    /**
     * Extra keyframes to add more animation effects.
     */
    keyframes?: MotionKeyframesDefinition;
};
export declare const DEFAULT_SPEED = 0.2;
export declare const DEFAULT_EASING: Easing;
export declare const DEFAULT_EXTRA_KEYFRAMES: {};
/**
 * Creates a parallax effect on an element. The parallax will be re-initialized when the options change.
 */
export declare const parallax: (node: HTMLElement, options?: ParallaxOptions) => {
    destroy: () => void;
    update: (options?: ParallaxOptions) => void;
};
