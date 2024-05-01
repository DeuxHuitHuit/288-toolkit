import { derived } from 'svelte/store';
import { createMatchMediaStore } from './createMatchMediaStore.js';
/**
 * A readable store that returns whether the user is using a touch device.
 */
export const isTouch = derived(createMatchMediaStore('(pointer: coarse)'), (pointerCoarse) => {
    return pointerCoarse || (typeof window !== 'undefined' && 'ontouchstart' in window);
});
