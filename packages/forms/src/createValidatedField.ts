import { makeElement } from '@melt-ui/svelte/internal/helpers';
import { derived, type Readable } from 'svelte/store';
import type { FormErrors, FormValues } from './createPostForm.js';

export type FieldOptions = {
	/**
	 * The type of the input element. DEFAULT: 'text'
	 */
	type?: string;
	/**
	 * The name of the field. This is used to access the value and error of the field.
	 */
	name: string;
	/**
	 * A readable store containing the errors of the form.
	 */
	errors: Readable<FormErrors>;
	/**
	 * A readable store containing the values of the form.
	 */
	values: Readable<FormValues>;
	/**
	 * If true, the field will be focused when an error is set. DEFAULT: true
	 */
	focusOnError?: boolean;
};

export type FieldElement = HTMLInputElement | HTMLTextAreaElement;

export type ValidatedField = ReturnType<typeof createValidatedField>;

export const DEFAULT_TYPE = 'text';

export const createValidatedField = (options: FieldOptions) => {
	const { type, name, errors, values } = options;

	const focusOnError = options.focusOnError !== false;
	const errorId = `${name}-error`;

	const value = derived(values, ($values) => $values[name]);
	const error = derived(errors, ($errors) => $errors[name]);

	const input = makeElement('input', {
		stores: [value, error],
		returned: ([value, error]) => {
			return {
				type: type ?? DEFAULT_TYPE,
				name,
				value,
				'aria-invalid': !!error || null,
				'aria-describedby': error ? errorId : null
			};
		},
		action: (node: FieldElement) => {
			if (!focusOnError) {
				return;
			}
			const destroy = error.subscribe(($error) => {
				if ($error) {
					node.focus();
				}
			});
			return { destroy };
		}
	});

	const hint = makeElement('hint', {
		stores: error,
		returned: () => {
			return {
				id: errorId
			};
		}
	});

	return {
		elements: { input, hint },
		helpers: {
			value,
			error
		}
	};
};
