import { reducedMotion } from '@288-toolkit/device/media';
import { animate, scroll, type KeyframeOptions, type MotionKeyframesDefinition } from 'motion';
import { get } from 'svelte/store';

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

export const DEFAULT_SPEED = 0.2;
export const DEFAULT_EASING: Easing = 'linear';
export const DEFAULT_EXTRA_KEYFRAMES = {};

const getOptions = (options?: ParallaxOptions) => {
	return {
		speed: options?.speed ?? DEFAULT_SPEED,
		easing: options?.easing || DEFAULT_EASING,
		keyframes: options?.keyframes || DEFAULT_EXTRA_KEYFRAMES
	};
};

const initParallax = ({
	node,
	speed,
	easing,
	keyframes
}: {
	node: HTMLElement;
	speed: number;
	easing: Easing;
	keyframes: MotionKeyframesDefinition;
}) => {
	if (speed === 0 || get(reducedMotion)) {
		return null;
	}
	const translateY = speed * 100;
	return scroll(
		animate(
			node,
			{
				...keyframes,
				transform: [
					`translate3d(0,${-translateY}%,0) ${keyframes?.transform?.[0] || ''}`.trim(),
					`translate3d(0,0,0) ${keyframes?.transform?.[1] || ''}`.trim(),
					`translate3d(0,${translateY}%,0) ${keyframes?.transform?.[2] || ''}`.trim()
				]
			},
			{
				easing
			}
		),
		{
			target: node,
			offset: ['start end', 'center center', 'end start']
		}
	);
};

/**
 * Creates a parallax effect on an element. The parallax will be re-initialized when the options change.
 */
export const parallax = (node: HTMLElement, options?: ParallaxOptions) => {
	let stop = initParallax({ node, ...getOptions(options) });
	return {
		destroy: () => {
			stop?.();
		},
		update: (options?: ParallaxOptions) => {
			stop?.();
			stop = initParallax({ node, ...getOptions(options) });
		}
	};
};
