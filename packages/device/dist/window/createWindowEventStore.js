import { BROWSER } from 'esm-env';
import { readable } from 'svelte/store';
/**
 * Create a readable store that listens to a window event.
 * @param event The event to listen to
 * @param options The options to pass to `addEventListener`
 */
export const createWindowEventStore = (event, options) => {
    const store = readable(null, (set) => {
        if (!BROWSER) {
            return;
        }
        const handler = (e) => {
            // Call every store subscribers with the event
            set(e);
            // Reset the store value so no new subscribers are called with a stale event
            // No subscribers will be called if the value is null
            set(null);
        };
        window.addEventListener(event, handler, options);
        return () => {
            window.removeEventListener(event, handler, options);
            set(null);
        };
    });
    const subscribe = (subscriber) => {
        const unsubscribe = store.subscribe((e) => {
            // Don't call store subscribers if there is no event
            if (!e) {
                return;
            }
            subscriber(e);
        });
        return unsubscribe;
    };
    return {
        subscribe
    };
};
