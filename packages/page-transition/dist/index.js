import { beforeNavigate, onNavigate } from '$app/navigation';
import { BROWSER, DEV } from 'esm-env';
import { onDestroy } from 'svelte';
import { derived, readonly, writable } from 'svelte/store';
const DEFAULT = 'default';
/**
 * The current transition value, used for internal tracking
 */
let inTransition = null;
/**
 * A boolean flag so we don't register `onNavigate` and `beforeNavigate` callbacks more than once
 */
let transitionsInited = false;
/**
 * The store that notifies us to resolve the promise returned from `onNavigate` with an optionally provided callback
 */
const transitionEnded = writable(null, (set) => {
    // Stop function when there a no subscribers anymore
    return () => {
        set(null);
    };
});
/**
 * The main `transitioning` store.
 */
const store = writable(inTransition);
const setTransitionStore = (value) => {
    inTransition = value;
    store.set(inTransition);
};
const TRANSITIONS = new Map();
const SKIP_CONDITIONS = new Set();
/**
 * If the conditions are met, set the navigation store.
 * @param navigation The object given by `beforeNavigate`
 * @param key The current transition key
 */
const beginTransition = ({ to, from, type, willUnload }, key) => {
    if (inTransition && inTransition.to?.url.toString() !== to?.url.toString()) {
        setTransitionStore(null);
        return;
    }
    if (inTransition ||
        !to?.url ||
        to?.url.toString() === from?.url.toString() ||
        type === 'popstate' ||
        willUnload) {
        return;
    }
    setTransitionStore({ from, to, key });
};
/**
 * Registers the `beforeNavigate` and `onNavigate` callbacks that start the transition
 */
const initTransitions = () => {
    if (transitionsInited) {
        return;
    }
    beforeNavigate((nav) => {
        // Remove the `cancel` function from the navigation object
        const transitionNav = { ...nav, cancel: undefined };
        // Check if we have to skip the navigation entirely
        const skipCondition = Array.from(SKIP_CONDITIONS).find((condition) => condition(transitionNav));
        if (skipCondition) {
            return;
        }
        // Find the transition that has a matching condition
        const key = Array.from(TRANSITIONS.entries()).find(([_, { condition }]) => condition(transitionNav))?.[0];
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
        if (!inTransition?.to) {
            return;
        }
        return new Promise((resolve) => {
            // Wait for the transition to be ended before updating the page
            const unsubscribe = transitionEnded.subscribe((callback) => {
                if (callback) {
                    resolve(() => {
                        callback();
                        unsubscribe();
                    });
                    setTransitionStore(null);
                }
            });
        });
    });
    transitionsInited = true;
    // Since the `beforeNavigate` and `onNavigate` callbacks are only active as long as
    // the first component that called `initTransition` is mounted, we have to register them again
    // whenever that component is destroyed.
    onDestroy(() => {
        transitionsInited = false;
    });
};
/**
 * Registers a transition.
 * @param {string} key The transition key. Must be unique.
 * @param {object} options
 * - options.condition: A function that determines wether navigation condition matches. If `true`, the transition will be triggered.
 * @returns A readable store that is `null` by default, and is a `Transition` object while the transition is
 * happening. The `key` of the `Transition` object will always be the key that was passed to the
 * function. That way, the store is scoped to this particular transition.
 */
export const registerTransition = (key, ...args) => {
    if (!BROWSER) {
        return store;
    }
    const transitioning = derived(store, ($transition) => {
        if ($transition?.key === key) {
            return $transition;
        }
        return null;
    });
    if (TRANSITIONS.has(key)) {
        DEV &&
            console.warn(`Duplicate transition key: "${key}". Only the first one will be registered.`);
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
export const skipTransition = (condition) => {
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
export const endTransition = (callback) => {
    // Calling `endTransition` before we're actually transitioning should do nothing
    if (!inTransition?.to) {
        if (DEV) {
            console.warn('Calling `endTransition` here has no effect.');
        }
        return;
    }
    // Notify that the transition is done, Sveltekit can display the new page as soon as its ready
    transitionEnded.set(() => {
        if (typeof callback === 'function') {
            callback();
        }
    });
};
/**
 * A readable store that is updated with a `Transition` object whenever any transition occurs and is
 * `null` the rest of the time.
 * This is useful if you want to easily run some code for a transition outside of the component that
 * has registered it, or for several transitions with similar keys, for example.
 */
export const transitioning = readonly(store);
