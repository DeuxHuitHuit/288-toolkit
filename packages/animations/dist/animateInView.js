import { animate } from 'motion';
import { expoOut } from 'svelte/easing';
import { playMotionAnimationInView } from './playMotionAnimationInView.js';
export const DEFAULT_ANIMATE_IN_VIEW_DURATION = 1;
export const DEFAULT_ANIMATE_IN_VIEW_EASING = expoOut;
export const DEFAULT_OPTIONS = {
    duration: 1,
    easing: expoOut
};
/**
 * Wraps `playMotionAnimationInView` and provides some nice defaults and options.
 */
export const animateInView = (node, params) => {
    const { keyframes, options, selector, disabled, reverse, architect, inViewOptions } = params;
    if (disabled) {
        return;
    }
    const elements = selector ? Array.from(node.querySelectorAll(selector)) : [node];
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
