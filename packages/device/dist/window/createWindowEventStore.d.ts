/// <reference types="svelte" />
import type { Subscriber } from 'svelte/store';
/**
 * Create a readable store that listens to a window event.
 * @param event The event to listen to
 * @param options The options to pass to `addEventListener`
 */
export declare const createWindowEventStore: <TEvent extends Event>(event: string, options?: boolean | AddEventListenerOptions) => {
    subscribe: (subscriber: Subscriber<TEvent>) => import("svelte/store").Unsubscriber;
};
