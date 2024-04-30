import { BROWSER } from 'esm-env';
import { derived } from 'svelte/store';
import { scroll } from './scroll';
const scrollPos = { x: 0, y: 0 };
/**
 * A readable store that returns the current scroll positions
 * of the user (x and y).
 */
export const currentScroll = derived(scroll, !BROWSER
    ? () => scrollPos
    : () => {
        scrollPos.x = window.scrollX;
        scrollPos.y = window.scrollY;
        return scrollPos;
    });
