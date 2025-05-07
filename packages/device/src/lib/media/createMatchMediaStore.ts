import { BROWSER } from 'esm-env';
import { readable } from 'svelte/store';

/**
 * @deprecated Use [`MediaQuery`](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery) from Svelte instead.
 *
 * @returns A readable store which is true when the media query matches and false when it doesn't.
 */
export const createMatchMediaStore = (mediaQuery: string) => {
	const store = readable<boolean>(false, (set) => {
		const onChange = (event: MediaQueryListEvent) => {
			set(event.matches);
		};
		if (!BROWSER) {
			return;
		}
		if (!window.matchMedia) {
			return;
		}
		const mediaQueryList = window.matchMedia(mediaQuery);
		set(mediaQueryList.matches);
		mediaQueryList.addEventListener('change', onChange);
		return () => {
			mediaQueryList.removeEventListener('change', onChange);
		};
	});
	return store;
};

export type MatchMediaStore = ReturnType<typeof createMatchMediaStore>;
