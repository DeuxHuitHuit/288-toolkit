import { BROWSER } from 'esm-env';
import { readable } from 'svelte/store';
/**
 * @returns A readable store which is true when the media query matches and false when it doesn't.
 */
export const createMatchMediaStore = (mediaQuery) => {
    const store = readable(false, (set) => {
        const onChange = (event) => {
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
