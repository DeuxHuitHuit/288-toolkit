import type { MotionKeyframesDefinition } from 'motion';
import { type ParallaxOptions } from './parallax';
export type FromToValue = string | number;
export type FromTo<T extends FromToValue> = {
    /**
     * Value at the START of the animation.
     */
    from?: T;
    /**
     * Value at the END of the animation.
     */
    to?: T;
};
export type AugmentedParallaxOptionsBase = Omit<ParallaxOptions, 'keyframes'>;
export type AugmentedParallaxOptions<T extends FromToValue = number> = AugmentedParallaxOptionsBase & FromTo<T>;
export type GetKeyframes<T extends FromToValue = number> = (options: Required<FromTo<T>>) => MotionKeyframesDefinition;
/**
 * @see parallax
 * Convenience function to augment the basic `parallax` action with more animation effects.
 */
export declare const augmentedParallax: <T extends FromToValue = number>({ defaults, getKeyframes }: {
    defaults: Required<FromTo<T>>;
    getKeyframes: GetKeyframes<T>;
}) => (node: HTMLElement, options?: AugmentedParallaxOptions) => {
    destroy: () => void;
    update: (options?: ParallaxOptions | undefined) => void;
};
