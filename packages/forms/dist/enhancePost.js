import { applyAction, enhance } from '$app/forms';
const defaultCallback = async ({ result }) => applyAction(result);
/** Wraps Sveltekit's `enhance` action to cancel in-flight request
 * if the form is re-submitted too quickly by using the AbortController
 */
export const enhancePost = (form, submit) => {
    let previousController;
    const submitFunction = async (input) => {
        previousController?.abort();
        previousController = input.controller;
        if (submit) {
            const callback = await submit(input);
            return callback ?? defaultCallback;
        }
        return defaultCallback;
    };
    return enhance(form, submitFunction);
};
