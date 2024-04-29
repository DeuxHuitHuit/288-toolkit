import type { AnonymousObject } from '@288-toolkit/types';
import type { Action, ActionReturn } from 'svelte/action';
import { get } from 'svelte/store';
import type { MatchMediaStore } from './createMatchMediaStore';

export type RunOnMatchMediaCleanUpFn = void | undefined | (() => void);
export type RunOnMatchMediaCallback = () => RunOnMatchMediaCleanUpFn;

/**
 * Runs a callback only when the media matches the specified condition. The callback can return a cleanup function that
 * will be called when the media changes.
 * @param store The media store to subscribe to.
 * @param condition The condition to match. If 'matches', the callback will be called when the media matches the store.
 * If 'doesNotMatch', the callback will be called when the media does not match the store.
 * @param callback The callback to run when the media matches the condition.
 * @returns A function that will unsubscribe from the store and call the cleanup function if it exists.
 */
export const runOnMatchMedia = (
	store: MatchMediaStore,
	condition: 'matches' | 'doesNotMatch',
	callback: RunOnMatchMediaCallback
) => {
	let cleanUp: RunOnMatchMediaCleanUpFn;
	const unsubscribe = store.subscribe((matches) => {
		const canRun = condition === 'matches' ? matches : !matches;
		if (!canRun) {
			cleanUp?.();
			return;
		}
		cleanUp = callback();
	});
	return () => {
		unsubscribe();
		cleanUp?.();
	};
};

/**
 * A Svelte action wrapper that runs the action and calls the update function only when the media matches the specified condition.
 * The function accepts the three generic parameters that are passed to the Svelte `Action` type (@see https://svelte.dev/docs/svelte-action#types-action).
 * @see runOnMatchMedia
 */
export const runActionOnMatchMedia = <
	Node extends HTMLElement,
	Params = undefined,
	Attributes extends AnonymousObject = Record<never, never>
>(
	store: MatchMediaStore,
	condition: 'matches' | 'doesNotMatch',
	action: Action<Node, Params, Attributes>
): typeof action => {
	return (...args) => {
		let update: ActionReturn<Params, Attributes>['update'];
		const destroy = runOnMatchMedia(store, condition, () => {
			const actionReturn = action(...args);
			update = actionReturn?.update;
			return actionReturn?.destroy;
		});
		return {
			destroy,
			update: (params) => {
				if (!update) {
					return;
				}
				const matches = get(store);
				const canRun = condition === 'matches' ? matches : !matches;
				if (!canRun) {
					return;
				}
				update(params);
			}
		};
	};
};
