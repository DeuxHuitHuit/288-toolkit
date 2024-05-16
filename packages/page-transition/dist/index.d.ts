/// <reference types="svelte" />
import type { Maybe } from '@288-toolkit/types';
import type { Navigation, NavigationTarget } from '@sveltejs/kit';
declare const DEFAULT: "default";
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
/**
 * Registers a transition.
 * @param {string} key The transition key. Must be unique.
 * @param {object} options
 * - options.condition: A function that determines wether navigation condition matches. If `true`, the transition will be triggered.
 * @returns A readable store that is `null` by default, and is a `Transition` object while the transition is
 * happening. The `key` of the `Transition` object will always be the key that was passed to the
 * function. That way, the store is scoped to this particular transition.
 */
export declare const registerTransition: <TKey extends TransitionKey>(key: TKey, ...args: TKey extends typeof DEFAULT ? [options: TransitionOptions<TKey>] | [] : [options: TransitionOptions<TKey>]) => import("svelte/store").Readable<{
    from: Maybe<NavigationTarget>;
    to: Maybe<NavigationTarget>;
    key: TransitionKey;
} | null>;
/**
 * Skips all transition if the condition is `true`.
 * @param {function} condition  A function that determines wether navigation condition matches. If `true`, the transition will be skipped.
 */
export declare const skipTransition: (condition: TransitionCondition) => void;
/**
 * This function resolves the promise that Sveltekit waits for from the `onNavigate` callback to render the new page.
 * @param {function} callback A callback function that Sveltekit will call after the new page is rendered.
 */
export declare const endTransition: (callback?: EndTransitionParam) => void;
/**
 * A readable store that is updated with a `Transition` object whenever any transition occurs and is
 * `null` the rest of the time.
 * This is useful if you want to easily run some code for a transition outside of the component that
 * has registered it, or for several transitions with similar keys, for example.
 */
export declare const transitioning: import("svelte/store").Readable<Transition>;
export {};
