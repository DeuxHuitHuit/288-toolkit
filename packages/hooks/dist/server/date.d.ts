import type { Handle } from '@sveltejs/kit';
export type DateHandleOptions = {
    /**
     * The marker to replace with the current date.
     */
    marker?: string;
};
export declare const DEFAULT_DATE_MARKER = "%request.date%";
/**
 * Replaces a marker in the html response with the current date.
 */
export declare const date: (options: DateHandleOptions) => Handle;
