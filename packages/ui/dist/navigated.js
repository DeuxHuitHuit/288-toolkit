import { afterNavigate } from '$app/navigation';
/**
 * A store that returns true when the user has navigated at least once
 * Since this store uses afterNavigate, it can only be used at component initialisation
 */
export const navigated = {
    subscribe(fn) {
        fn(false);
        afterNavigate(({ from }) => fn(!!from));
        return () => {
            /* noop */
        };
    }
};
