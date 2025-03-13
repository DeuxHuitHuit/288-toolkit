import { animate, scroll, type DOMKeyframesDefinition, type Easing } from 'motion';
import { prefersReducedMotion } from 'svelte/motion';

export type ParallaxOptions = {
	/**
	 * Speed of the animation. Negative values invert the direction. 0 disables the animation. DEFAULT: 0.2
	 */
	speed?: number;
	/**
	 * @deprecated Use `ease` instead.
	 * Easing of the animation. DEFAULT: 'linear'
	 */
	easing?: Easing;
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

const optionsOrDefaults = (options?: ParallaxOptions) => {
	return {
		speed: options?.speed ?? DEFAULT_SPEED,
		ease: options?.ease ?? options?.easing ?? DEFAULT_EASING,
		keyframes: options?.keyframes || DEFAULT_EXTRA_KEYFRAMES
	};
};

const initParallax = (node: HTMLElement, { speed, ease, keyframes }: ParallaxOptions) => {
	if (!speed || prefersReducedMotion.current) {
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
				ease
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
	let stop = initParallax(node, optionsOrDefaults(options));
	return {
		destroy: () => {
			stop?.();
		},
		update: (options?: ParallaxOptions) => {
			stop?.();
			stop = initParallax(node, optionsOrDefaults(options));
		}
	};
};
