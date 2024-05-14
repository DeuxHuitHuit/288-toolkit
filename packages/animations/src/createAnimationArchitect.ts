import { reducedMotion } from '@288-toolkit/device/media';
import { endTransition, registerTransition, type Transition } from '@288-toolkit/page-transition';
import { onDestroy } from 'svelte';
import { get } from 'svelte/store';

export type AnimationFunction = (params: { durationMs: number; duration: number }) => void;

export type RegisterAnimationFn = (outAnimation: AnimationFunction) => () => void;

export type ArchitectInstance = {
	registerAnimation: RegisterAnimationFn;
	start: typeof registerTransition;
};

export type ArchitectOptions = {
	outDuration: number;
};

export type ArchitectParams = Partial<ArchitectOptions>;

const DEFAULTS: Pick<ArchitectOptions, 'outDuration'> = {
	outDuration: 400
};

/**
 * An architect allows you to register animation functions that will get played when
 * transitioning out from a page, which is useful to coordinate multiple outro animations.
 * The architect instance has to be initialized with the provided `start` function in order to work, which is
 * a wrapper around {@link registerTransition | page transition}.
 * @param {object} options Architect options:
 * - `outDuration`: The outro duration in ms that the animations must be played for. Default: `400`.
 * @returns The architect instance:
 * - `start`: A wrapper around {@link registerTransition | page transition} that initializes the architect. This function
 * MUST be called at component initialization. It returns the `$transitioning` store for registered transition.
 * - `registerAnimation`: The function to register your outro animations.
 */
export const createAnimationArchitect = (options?: ArchitectParams) => {
	const optionsWithDefaults = { ...DEFAULTS, ...(options || {}) };
	const outDuration = optionsWithDefaults?.outDuration || DEFAULTS.outDuration;
	const outDurationInSeconds = outDuration / 1000;

	const animations = new Set<AnimationFunction>();
	let timeout: ReturnType<typeof setTimeout>;

	/**
	 * Registering an `out` animation will allow it to be
	 * played when transitioning out of the page.
	 *
	 * The function receives an object containing the `duration` (in seconds)
	 * and `durationMs` (in milliseconds) properties so you can time your custom
	 * animation properly.
	 *
	 * @param outAnimation A function that plays an animation
	 * @returns A function to unregister the animation. Useful, for example, if you want
	 * to avoid playing the animation when the element is out of view.
	 */
	const registerAnimation = ((outAnimation) => {
		animations.add(outAnimation);
		return () => {
			animations.delete(outAnimation);
		};
	}) satisfies RegisterAnimationFn;

	/**
	 * A wrapper around {@link registerTransition | page transition} that initializes the architect. This function
	 * MUST be called at component initialization. It returns the `$transitioning` store for registered transition.
	 * @param args The arguments passed to `registerTransition`
	 * @returns the `$transitioning` store for registered transition.
	 */
	const start: ArchitectInstance['start'] = (...args) => {
		const transitioning = registerTransition(...args);
		const unsubscribe = transitioning.subscribe((transition: Transition) => {
			if (!transition) {
				return;
			}
			if (get(reducedMotion)) {
				// Bail out if reduced motion is enabled
				endTransition();
				// Remove all animations
				animations.clear();
				return;
			}
			// Play all animations
			animations.forEach((animation) => {
				animation({ durationMs: outDuration, duration: outDurationInSeconds });
			});
			// If there was already a transition occurring, clear it
			clearTimeout(timeout);
			// Set a timeout to let the animations play only if there are registered animations
			if (animations.size > 0) {
				timeout = setTimeout(endTransition, outDuration);
			} else {
				endTransition();
			}
			// Remove all animations
			animations.clear();
		});
		onDestroy(unsubscribe);
		return transitioning;
	};

	const instance = {
		registerAnimation,
		start
	} satisfies ArchitectInstance;

	return instance;
};
