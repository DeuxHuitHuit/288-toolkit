import type { SubmitFunction } from '@sveltejs/kit';
/** Wraps Sveltekit's `enhance` action to cancel in-flight request
 * (by using the current AbortController) if the form is re-submitted to quickly
 */
export declare const enhancePost: (form: HTMLFormElement, submit?: SubmitFunction) => {
    destroy(): void;
};
