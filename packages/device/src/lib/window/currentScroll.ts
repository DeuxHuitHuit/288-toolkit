import { BROWSER } from 'esm-env';
import { derived } from 'svelte/store';
import { scroll } from './scroll.js';

export type ScrollPosition = {
	x: number;
	y: number;
};

const scrollPos: ScrollPosition = { x: 0, y: 0 };

/**
 * A readable store that returns the current scroll positions
 * of the user (x and y).
 */
export const currentScroll = derived<typeof scroll, ScrollPosition>(
	scroll,
	!BROWSER
		? () => scrollPos
		: () => {
				scrollPos.x = window.scrollX;
				scrollPos.y = window.scrollY;
				return scrollPos;
			}
);
