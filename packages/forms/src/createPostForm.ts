import { browser, dev } from '$app/environment';
import { applyAction } from '$app/forms';
import { page } from '$app/stores';
import type { AnonymousObject, Maybe } from '@288-toolkit/types';
import { makeElement } from '@melt-ui/svelte/internal/helpers';
import type { SubmitFunction } from '@sveltejs/kit';
import svelteFsm from 'svelte-fsm';
import { derived, get, readonly, writable } from 'svelte/store';
import { HONEYPOT_NAME, STYLE_SR_ONLY } from './constants.js';
import { createHoneypot } from './createHoneypot.js';
import { enhancePost } from './enhancePost.js';
import { requestSubmit } from './requestSubmit.js';

export type CreatePostFormOptions = {
	/**
	 * The delay in milliseconds before the form is reset
	 * after a successful submission.
	 */
	resetDelay?: Maybe<number>;
	/**
	 * The key of the form in the page store. Must be used if there are
	 * multiple forms on the page.
	 */
	formKey?: Maybe<string>;
	/**
	 * Applies the novalidate attribute to the form element, which disables browser validation, only when
	 * javascript is enabled.
	 */
	novalidate?: boolean;
};

export type FormState = 'idle' | 'submitting' | 'success' | 'error';

export type FormValues = Record<string, string | string[]>;

export type FormErrors = Record<string, string>;

export type FormData<TData extends AnonymousObject = AnonymousObject> = {
	values?: FormValues;
	errors?: FormErrors;
	success?: boolean;
} & TData;

export const DEFAULT_RESET_DELAY = 10000;

export const createPostForm = <TData extends AnonymousObject>(options?: CreatePostFormOptions) => {
	const resetDelay = options?.resetDelay ?? DEFAULT_RESET_DELAY;
	const formKey = options?.formKey;
	const novalidate = options?.novalidate;

	const pageForm = derived<typeof page, FormData<TData>>(page, (page) => {
		return formKey ? page.form?.[formKey] : page.form;
	});
	const currentForm = get(pageForm);
	const data = derived(pageForm, (form) => form || {});
	const values = derived(pageForm, (form) => form?.values || {});
	const _errors = writable(currentForm?.errors ?? {});
	const errors = readonly(_errors);
	const pageFormUnsubscribe = pageForm.subscribe((data) => {
		_errors.set(data?.errors || {});
	});
	const formEl = writable<Maybe<HTMLFormElement>>(null);

	let initialState: FormState = 'idle';
	if (currentForm?.success) {
		initialState = 'success';
	}
	if (currentForm?.errors) {
		initialState = 'error';
	}

	const state = svelteFsm(initialState, {
		idle: {
			submit: 'submitting'
		},
		submitting: {
			success: 'success',
			error: 'error'
		},
		success: {
			_enter({ args }) {
				if (!browser) {
					return;
				}
				const form: HTMLFormElement = args[0];
				form?.reset();
				this.reset.debounce(resetDelay);
			},
			reset: 'idle',
			input: 'idle',
			submit: 'submitting'
		},
		error: {
			_enter({ args }) {
				if (!browser) {
					return;
				}
				const form: HTMLFormElement = args[0];
				// Remove error keys that don't correspond to a form field name
				const elements = form?.elements || [];
				_errors.update((errors) => {
					return Object.fromEntries(
						Object.keys(errors)
							.filter((key) => !!elements[key])
							.map((key) => [key, errors[key]])
					);
				});
			},
			input(e: Event) {
				const input = e.target as HTMLInputElement;
				_errors.update((errors) => {
					delete errors[input.name];
					return errors;
				});
				if (Object.keys(get(errors)).length > 0) {
					return 'error';
				}
				return 'idle';
			},
			submit(cancel: Parameters<SubmitFunction>[0]['cancel']) {
				cancel();
			}
		}
	});

	const onSubmit: SubmitFunction = ({ cancel }) => {
		state.submit(cancel);
		return async ({ result, formElement }) => {
			if (result.type === 'success') {
				state.success(formElement);
			}
			if (['error', 'failure'].includes(result.type)) {
				state.error(formElement);
			}
			applyAction(result);
		};
	};

	const submit = () => {
		const el = get(formEl);
		if (!el) {
			dev && console.warn('`Submit` function called before a form element was set.');
			return;
		}
		requestSubmit(el);
	};

	const form = makeElement('form', {
		action: (node: HTMLFormElement) => {
			formEl.set(node);
			node.setAttribute('method', 'POST');
			if (novalidate) {
				node?.setAttribute('novalidate', '');
			}
			const enhanceResult = enhancePost(node, onSubmit);
			node.addEventListener('input', state.input);
			node.addEventListener('change', state.input);
			return {
				destroy: () => {
					enhanceResult.destroy();
					pageFormUnsubscribe();
					node.removeEventListener('input', state.input);
					node.removeEventListener('change', state.input);
				}
			};
		}
	});

	const honeypot = createHoneypot();

	return {
		elements: {
			...honeypot.elements,
			form
		},
		states: {
			state
		},
		helpers: {
			submit,
			data,
			values,
			errors
		}
	};
};
