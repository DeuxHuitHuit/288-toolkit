import { beforeNavigate, onNavigate } from '$app/navigation';
import type { Maybe } from '@288-toolkit/types';
import type { Navigation, NavigationTarget } from '@sveltejs/kit';
import { BROWSER, DEV } from 'esm-env';
import { onDestroy, untrack } from 'svelte';

const DEFAULT = 'default' as const;

export type BuiltinTransitionKeys = typeof DEFAULT;

export type TransitionKey = BuiltinTransitionKeys | Omit<string, BuiltinTransitionKeys>;

export type TransitionCondition = (nav: Navigation) => boolean;

export type TransitionOptions<TKey extends TransitionKey> = {
	condition: TKey extends typeof DEFAULT ? never : TransitionCondition;
};

export type Transition = Maybe<{
	from: Maybe<NavigationTarget>;
	to: Maybe<NavigationTarget>;
	key: TransitionKey;
}>;

export type EndTransitionCallback = () => void;

/**
 * This is a composite type: We essentially want a function, but
 * `Event` is accepted as a callback type for backwards compatibility
 */
type EndTransitionParam = EndTransitionCallback | Event;

class PageTransition {
	/**
	 * The current transition value
	 */
	transition = $state<Transition | null>(null);
	/**
	 * A boolean flag so we don't register `onNavigate` and `beforeNavigate` callbacks more than once
	 */
	initialized = false;
	/**
	 * When set to a function, that promise returned from `onNavigate` will resolve with an optionally provided callback
	 */
	endTransitionCallback = $state<Maybe<EndTransitionCallback>>(null);
}

class ScopedTransition {
	key: TransitionKey;

	constructor(key?: TransitionKey) {
		if (key) {
			this.key = key;
		}
	}

	get current() {
		if (!this.key) {
			return pageTransition.transition;
		}
		if (this.key === pageTransition.transition?.key) {
			return pageTransition.transition;
		}
		return null;
	}
}

class Transitioning {
	get current() {
		return pageTransition.transition;
	}
}

const pageTransition = new PageTransition();

const TRANSITIONS = new Map<TransitionKey, TransitionOptions<TransitionKey>>();
const SKIP_CONDITIONS = new Set<TransitionCondition>();

/**
 * If the conditions are met, set the navigation store.
 * @param navigation The object given by `beforeNavigate`
 * @param key The current transition key
 */
const beginTransition = ({ to, from, type, willUnload }: Navigation, key: TransitionKey) => {
	if (
		pageTransition.transition &&
		pageTransition.transition.to?.url.toString() !== to?.url.toString()
	) {
		pageTransition.transition = null;
		return;
	}
	if (
		pageTransition.transition ||
		!to?.url ||
		to?.url.toString() === from?.url.toString() ||
		type === 'popstate' ||
		willUnload
	) {
		return;
	}
	pageTransition.transition = { from, to, key };
};

/**
 * Registers the `beforeNavigate` and `onNavigate` callbacks that start the transition
 */
const initTransitions = () => {
	if (pageTransition.initialized) {
		return;
	}
	beforeNavigate((nav) => {
		// Remove the `cancel` function from the navigation object
		const transitionNav = { ...nav, cancel: undefined };
		// Check if we have to skip the navigation entirely
		const skipCondition = Array.from(SKIP_CONDITIONS).find((condition) =>
			condition(transitionNav)
		);
		if (skipCondition) {
			return;
		}
		// Find the transition that has a matching condition
		const key = Array.from(TRANSITIONS.entries()).find(([_, { condition }]) =>
			condition(transitionNav)
		)?.[0];
		// If there is a transition, start it
		if (key) {
			beginTransition(transitionNav, key);
			return;
		}
		// Start the default transition if it has been registered
		if (TRANSITIONS.has(DEFAULT)) {
			beginTransition(transitionNav, DEFAULT);
		}
	});
	onNavigate(() => {
		if (!pageTransition.transition?.to) {
			return;
		}
		return new Promise((resolve) => {
			// Wait for the transition to be ended before updating the page
			const rootCleanup = $effect.root(() => {
				$effect(() => {
					if (pageTransition.endTransitionCallback) {
						resolve(() => {
							untrack(() => {
								pageTransition.endTransitionCallback?.();
								pageTransition.transition = null;
								pageTransition.endTransitionCallback = null;
								rootCleanup();
							});
						});
					}
				});
			});
		});
	});
	pageTransition.initialized = true;
	// Since the `beforeNavigate` and `onNavigate` callbacks are only active as long as
	// the first component that called `initTransition` is mounted, we have to register them again
	// whenever that component is destroyed.
	onDestroy(() => {
		pageTransition.initialized = false;
	});
};

/**
 * Registers a transition.
 * @param {string} key The transition key. Must be unique.
 * @param {object} options
 * - options.condition: A function that determines wether navigation condition matches. If `true`, the transition will be triggered.
 * @returns An object with a reactive `current` property that is `null` by default, and is a `Transition` object while the transition is
 * happening. The `key` of the `Transition` object will always be the key that was passed to the
 * function. That way, the store is scoped to this particular transition.
 */
export const registerTransition = <TKey extends TransitionKey>(
	key: TKey,
	...args: TKey extends typeof DEFAULT
		? [options: TransitionOptions<TKey>] | []
		: [options: TransitionOptions<TKey>]
) => {
	const transitioning = new ScopedTransition(key);
	if (!BROWSER) {
		return transitioning;
	}
	if (TRANSITIONS.has(key)) {
		DEV &&
			console.warn(
				`Duplicate transition key: "${key}". Only the first one will be registered.`
			);
		return transitioning;
	}
	initTransitions();
	const options = args[0];
	const condition = key === DEFAULT ? () => false : options?.condition;
	if (typeof condition === 'function') {
		TRANSITIONS.set(key, options || { condition });
		onDestroy(() => {
			TRANSITIONS.delete(key);
		});
	}
	return transitioning;
};

/**
 * Skips all transition if the condition is `true`.
 * @param {function} condition  A function that determines wether navigation condition matches. If `true`, the transition will be skipped.
 */
export const skipTransition = (condition: TransitionCondition) => {
	if (!BROWSER) {
		return;
	}
	SKIP_CONDITIONS.add(condition);
	onDestroy(() => {
		SKIP_CONDITIONS.delete(condition);
	});
};

/**
 * This function resolves the promise that Sveltekit waits for from the `onNavigate` callback to render the new page.
 * @param {function} callback A callback function that Sveltekit will call after the new page is rendered.
 */
export const endTransition = (callback?: EndTransitionParam) => {
	// Calling `endTransition` before we're actually transitioning should do nothing
	if (!pageTransition.transition?.to) {
		if (DEV) {
			console.warn('Calling `endTransition` here has no effect.');
		}
		return;
	}
	// Notify that the transition is done, Sveltekit can display the new page as soon as its ready
	pageTransition.endTransitionCallback = () => {
		if (typeof callback === 'function') {
			callback();
		}
	};
};

/**
 * An object with a reactive `current` property that is updated with a `Transition` object whenever any transition occurs and is
 * `null` the rest of the time.
 * This is useful if you want to easily run some code for a transition outside of the component that
 * has registered it, or for several transitions with similar keys, for example.
 */
export const transitioning = new Transitioning();
