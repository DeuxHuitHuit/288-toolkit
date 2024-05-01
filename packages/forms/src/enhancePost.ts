import { applyAction, enhance } from '$app/forms';
import type { SubmitFunction } from '@sveltejs/kit';

const defaultCallback: ReturnType<SubmitFunction> = async ({ result }) => applyAction(result);

/** Wraps Sveltekit's `enhance` action to cancel in-flight request
 * (by using the current AbortController) if the form is re-submitted to quickly
 */
export const enhancePost = (form: HTMLFormElement, submit?: SubmitFunction) => {
	let previousController: AbortController;
	const submitFunction: SubmitFunction = async (input) => {
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
