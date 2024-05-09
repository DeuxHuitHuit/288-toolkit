import type { SubmitFunction } from '@sveltejs/kit';
/** Wraps Sveltekit's `enhance` action to cancel in-flight request
 * if the form is re-submitted too quickly by using the AbortController
 */
export declare const enhancePost: (form: HTMLFormElement, submit?: SubmitFunction) => {
    destroy(): void;
};
