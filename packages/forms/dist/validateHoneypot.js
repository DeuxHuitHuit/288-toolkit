import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { HONEYPOT_NAME } from './constants.js';
/**
 * A function to validate the honeypot field in a form submission.
 * For it to work, the form form must use the [Honeypot.svelte](../../components/ui/forms/Honeypot.svelte) component.
 */
export const validateHoneypot = async (event) => {
    const schema = z.string().max(0).optional().nullable();
    const request = event.request.clone();
    const data = await request.formData();
    const honey = data.get(HONEYPOT_NAME);
    const validation = schema.safeParse(honey);
    if (!validation.success) {
        error(404);
    }
};
