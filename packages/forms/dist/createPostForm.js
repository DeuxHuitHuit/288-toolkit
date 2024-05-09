import { browser, dev } from '$app/environment';
import { applyAction } from '$app/forms';
import { page } from '$app/stores';
import { makeElement } from '@melt-ui/svelte/internal/helpers';
import svelteFsm from 'svelte-fsm';
import { derived, get, readonly, writable } from 'svelte/store';
import { HONEYPOT_NAME } from './constants.js';
import { enhancePost } from './enhancePost.js';
import { requestSubmit } from './requestSubmit.js';
export const DEFAULT_RESET_DELAY = 10000;
export const createPostForm = (options) => {
    const resetDelay = options?.resetDelay ?? DEFAULT_RESET_DELAY;
    const formKey = options?.formKey;
    const novalidate = options?.novalidate;
    const pageForm = derived(page, (page) => {
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
    const formEl = writable(null);
    let initialState = 'idle';
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
                const form = args[0];
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
                const form = args[0];
                // Remove error keys that don't correspond to a form field name
                const elements = form?.elements || [];
                _errors.update((errors) => {
                    return Object.fromEntries(Object.keys(errors)
                        .filter((key) => !!elements[key])
                        .map((key) => [key, errors[key]]));
                });
            },
            input(e) {
                const input = e.target;
                _errors.update((errors) => {
                    delete errors[input.name];
                    return errors;
                });
                if (Object.keys(get(errors)).length > 0) {
                    return 'error';
                }
                return 'idle';
            },
            submit(cancel) {
                cancel();
            }
        }
    });
    const onSubmit = ({ cancel }) => {
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
        action: (node) => {
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
    const honeypot = makeElement('hp', {
        returned: () => ({
            type: 'text',
            class: 'form_email',
            style: `
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border-width: 0;
			`,
            tabindex: '-1',
            autocomplete: 'no',
            name: HONEYPOT_NAME
        })
    });
    return {
        elements: {
            form,
            honeypot
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
