import { MediaQuery } from 'svelte/reactivity';

/**
 * A class that returns whether the user is using a touch device.
 */
export class IsTouch {
	mediaQuery = new MediaQuery('(pointer: coarse)');
	current = $derived(
		this.mediaQuery.current || (typeof window !== 'undefined' && 'ontouchstart' in window)
	);
}
