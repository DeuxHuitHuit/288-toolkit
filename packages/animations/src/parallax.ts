import { reducedMotion } from '@288-toolkit/device/media';
import { animate, DOMKeyframesDefinition, scroll, type Easing } from 'motion';
import { get } from 'svelte/store';

export type ParallaxOptions = {
	/**
	 * Speed of the animation. Negative values invert the direction. 0 disables the animation. DEFAULT: 0.2
	 */
	speed?: number;
	/**
	 * Easing of the animation. DEFAULT: 'linear'
	 */
	ease?: Easing;
	/**
	 * Extra keyframes to add more animation effects.
	 */
	keyframes?: DOMKeyframesDefinition;
};

export const DEFAULT_SPEED = 0.2;
export const DEFAULT_EASING: Easing = 'linear';
export const DEFAULT_EXTRA_KEYFRAMES = {};

const getOptions = (options?: ParallaxOptions) => {
	return {
		speed: options?.speed ?? DEFAULT_SPEED,
		ease: options?.ease || DEFAULT_EASING,
		keyframes: options?.keyframes || DEFAULT_EXTRA_KEYFRAMES
	};
};

const initParallax = ({
	node,
	speed,
	ease,
	keyframes
}: {
	node: HTMLElement;
	speed: number;
	ease: Easing;
	keyframes: DOMKeyframesDefinition;
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
				ease: ease
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
