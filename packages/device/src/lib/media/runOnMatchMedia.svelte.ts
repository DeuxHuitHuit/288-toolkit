import type { AnonymousObject } from '@288-toolkit/types';
import { untrack } from 'svelte';
import type { Action, ActionReturn } from 'svelte/action';
import { MediaQuery } from 'svelte/reactivity';

export type RunOnMatchMediaCleanUpFn = void | undefined | (() => void);
export type RunOnMatchMediaCallback = () => RunOnMatchMediaCleanUpFn;

/**
 * Runs a callback only when the media matches the specified condition. The callback can return a cleanup function that
 * will be called when the media changes.
 * @param mediaQuery The [`MediaQuery`](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery) to watch.
 * @param condition The condition to match. If `'matches'`, the callback will be called when the media matches the query.
 * If `'doesNotMatch'`, the callback will be called when the media does not match the query.
 * @param callback The callback to run when the media matches the condition.
 * @returns A function that will call the cleanup function if it exists and stop watching the media query.
 */
export const runOnMatchMedia = (
	mediaQuery: MediaQuery,
	condition: 'matches' | 'doesNotMatch',
	callback: RunOnMatchMediaCallback
) => {
	const destroy = $effect.root(() => {
		let cleanUp: RunOnMatchMediaCleanUpFn;
		$effect(() => {
			const canRun = condition === 'matches' ? mediaQuery.current : !mediaQuery.current;
			untrack(() => {
				if (!canRun) {
					cleanUp?.();
					return;
				}
				cleanUp = callback();
			});
			return cleanUp;
		});
		return () => {
			cleanUp?.();
		};
	});
	return destroy;
};

/**
 * A Svelte action wrapper that runs the action and calls the update function only when the media matches the specified condition.
 * The function accepts the three generic parameters that are passed to the Svelte `Action` type (@see https://svelte.dev/docs/svelte-action#types-action).
 * @see runOnMatchMedia
 */
export const runActionOnMatchMedia = <
	Node extends HTMLElement | SVGElement,
	Params = undefined,
	Attributes extends AnonymousObject = Record<never, never>
>(
	mediaQuery: MediaQuery,
	condition: 'matches' | 'doesNotMatch',
	action: Action<Node, Params, Attributes>
) => {
	return (
		...args: [Params] extends [never]
			? [node: Node]
			: undefined extends Params
				? [node: Node, parameter?: Params | undefined]
				: [node: Node, parameter: Params]
	) => {
		let update: ActionReturn<Params, Attributes>['update'];
		const destroy = runOnMatchMedia(mediaQuery, condition, () => {
			const actionReturn = action(...args);
			update = actionReturn?.update;
			return actionReturn?.destroy;
		});
		return {
			destroy,
			update: (params: Params) => {
				if (!update) {
					return;
				}
				const matches = mediaQuery.current;
				const canRun = condition === 'matches' ? matches : !matches;
				if (!canRun) {
					return;
				}
				update(params);
			}
		};
	};
};
