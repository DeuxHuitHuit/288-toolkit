import type { Maybe } from '@288-toolkit/types';
import { makeElement } from '@melt-ui/svelte/internal/helpers';
import { EMAIL_NAME } from './constants.js';
import { createPostForm, type CreatePostFormOptions } from './createPostForm.js';
import { createValidatedField } from './createValidatedField.js';
import { t } from './translations/newsletter-form/index.js';

export type NewsletterFormOptions = CreatePostFormOptions;

export const createNewsletterForm = (options: NewsletterFormOptions) => {
	const postForm = createPostForm<{ error?: Maybe<string> }>(options);
	const emailInput = createValidatedField({
		type: 'email',
		name: EMAIL_NAME,
		errors: postForm.helpers.errors,
		values: postForm.helpers.values
	});
	const announcer = makeElement('newsletter-announcer', {
		returned: () => {
			return {
				'aria-live': 'polite'
			};
		},
		action: (node: HTMLElement) => {
			const destroy = postForm.states.state.subscribe((state) => {
				if (state === 'success') {
					node.innerText = t('srLabels.success');
				} else if (state === 'submitting') {
					node.innerText = t('srLabels.submitting');
				} else {
					node.innerText = '';
				}
			});
			return {
				destroy
			};
		}
	});
	return {
		...postForm,
		elements: {
			...postForm.elements,
			emailInput: emailInput.elements.input,
			emailHint: emailInput.elements.hint,
			announcer
		},
		helpers: {
			...postForm.helpers,
			emailError: emailInput.helpers.error,
			emailValue: emailInput.helpers.value
		}
	};
};
