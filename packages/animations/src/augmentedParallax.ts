import type { DOMKeyframesDefinition } from 'motion';
import { parallax, type ParallaxOptions } from './parallax.js';

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

export type AugmentedParallaxOptions<T extends FromToValue = number> =
	AugmentedParallaxOptionsBase & FromTo<T>;

export type GetKeyframes<T extends FromToValue = number> = (
	options: Required<FromTo<T>>
) => DOMKeyframesDefinition;

const toParallaxOptions = <T extends FromToValue = number>(
	options: AugmentedParallaxOptions<T> & Required<FromTo<T>>,
	getKeyframes: GetKeyframes<T>
) => {
	return {
		speed: options.speed,
		ease: options.ease ?? options.easing,
		keyframes: getKeyframes({ from: options.from, to: options.to })
	};
};

/**
 * @see parallax
 * Convenience function to augment the basic `parallax` action with more animation effects.
 */
export const augmentedParallax = <T extends FromToValue = number>({
	defaults,
	getKeyframes
}: {
	defaults: Required<FromTo<T>>;
	getKeyframes: GetKeyframes<T>;
}) => {
	return (node: HTMLElement, options: AugmentedParallaxOptions<T> = {}) => {
		const from = typeof options.from !== 'undefined' ? options.from : defaults.from;
		const to = typeof options.to !== 'undefined' ? options.to : defaults.to;
		return parallax(
			node,
			toParallaxOptions(
				{
					...options,
					from,
					to
				},
				getKeyframes
			)
		);
	};
};
