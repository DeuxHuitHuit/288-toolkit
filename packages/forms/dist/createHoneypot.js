import { makeElement } from '@melt-ui/svelte/internal/helpers';
import { HONEYPOT_NAME, STYLE_SR_ONLY } from './constants.js';
export const createHoneypot = () => {
    const honeypot = makeElement('hp', {
        returned: () => ({
            type: 'text',
            class: 'form_email',
            style: STYLE_SR_ONLY,
            tabindex: '-1',
            autocomplete: 'no',
            name: HONEYPOT_NAME
        })
    });
    return {
        elements: {
            honeypot
        }
    };
};
