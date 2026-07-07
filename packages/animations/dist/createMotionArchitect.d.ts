/// <reference types="svelte" />
/// <reference types="@sveltejs/kit" />
import type { AnimationControls } from 'motion';
import { type ArchitectParams } from './createAnimationArchitect.js';
/**
 *
 * @param options @see createAnimationArchitect
 * @returns An architect instance extended with:
 * - `registerMotionAnimation`: A function that takes the animation controls returned from `animate` or
 * `timline` and automatically reverses the animation when transitioning out.
 */
export declare const createMotionArchitect: (options?: ArchitectParams) => {
    registerMotionAnimation: (animation: AnimationControls) => () => void;
    registerAnimation: (outAnimation: import("./createAnimationArchitect.js").AnimationFunction) => () => void;
    start: <TKey extends import("@288-toolkit/page-transition").TransitionKey>(key: TKey, ...args: TKey extends "default" ? [] | [options: import("@288-toolkit/page-transition").TransitionOptions<TKey>] : [options: import("@288-toolkit/page-transition").TransitionOptions<TKey>]) => import("svelte/store").Readable<{
        from: import("@288-toolkit/types").Maybe<import("@sveltejs/kit").NavigationTarget>;
        to: import("@288-toolkit/types").Maybe<import("@sveltejs/kit").NavigationTarget>;
        key: import("@288-toolkit/page-transition").TransitionKey;
    } | null>;
};
