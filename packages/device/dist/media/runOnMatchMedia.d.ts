/// <reference types="svelte" />
import type { AnonymousObject } from '@288-toolkit/types';
import type { Action } from 'svelte/action';
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
export declare const runOnMatchMedia: (store: import("svelte/store").Readable<boolean>, condition: 'matches' | 'doesNotMatch', callback: RunOnMatchMediaCallback) => () => void;
/**
 * A Svelte action wrapper that runs the action and calls the update function only when the media matches the specified condition.
 * The function accepts the three generic parameters that are passed to the Svelte `Action` type (@see https://svelte.dev/docs/svelte-action#types-action).
 * @see runOnMatchMedia
 */
export declare const runActionOnMatchMedia: <Node extends HTMLElement, Params = undefined, Attributes extends AnonymousObject = Record<never, never>>(store: import("svelte/store").Readable<boolean>, condition: 'matches' | 'doesNotMatch', action: Action<Node, Params, Attributes>) => Action<Node, Params, Attributes>;
