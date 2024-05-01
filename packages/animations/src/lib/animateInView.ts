import {
	animate,
	type AnimationOptionsWithOverrides,
	type InViewOptions,
	type MotionKeyframesDefinition
} from 'motion';
import { expoOut } from 'svelte/easing';
import {
	playMotionAnimationInView,
	type PlayMotionAnimationInViewParams
} from './playMotionAnimationInView.js';

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

export const DEFAULT_DURATION = 1;
export const DEFAULT_EASING = expoOut;

export const DEFAULT_OPTIONS = {
	duration: 1,
	easing: expoOut
};

/**
 * Wraps `playMotionAnimationInView` and provides some nice defaults and options.
 */
export const animateInView = (node: HTMLElement, params: AnimateInViewParams) => {
	const { keyframes, options, selector, disabled, reverse, architect, inViewOptions } = params;

	if (disabled) {
		return;
	}

	const elements = selector ? Array.from(node.querySelectorAll<HTMLElement>(selector)) : [node];

	if (elements.length === 0) {
		return;
	}

	const animation = animate(elements, keyframes, {
		...DEFAULT_OPTIONS,
		...(options ?? {}),
		autoplay: false
	});

	return playMotionAnimationInView(node, {
		animation,
		architect,
		reverse,
		inViewOptions
	});
};
