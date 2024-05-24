/**@docs
 * An opinionated server action guard that validates the newsletter and honeypot form data sent by the
 * [DefaultNewsletterForm.svelte](../../components/ui/DefaultNewsletterForm.svelte) component.
 *
 * It accepts a callback argument that you can use to make any api call you require for the newsletter subscription.
 * The callback receives the action `RequestEvent` augmented with the validated email address from the form.
 * The callback will only be run if the form data from the request is valid. Errors thrown from the callback are automatically handled.
 *
 * @example A basic newsletter action
 *
 * ```ts
 * import { validateNewsletter } from './lib/server/actions/validateNewsletter';
 *
 * export const actions = {
 *   default: (event) => validateNewsletter(event.locals.language, ({ email }) => {
 * 		... Make api call to newsletter service
 *   })
 * };
 * ```
 */
import { createServerTranslate } from '@288-toolkit/i18n/server';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zodErrorToObject } from './lib/zodErrorToObject.js';
import { newsletterForm } from './translations/index.js';
import { validateHoneypot } from './validateHoneypot.js';
export const validateNewsletter = (language, callback) => {
    return async (event) => {
        await validateHoneypot(event);
        const t = await createServerTranslate(newsletterForm, language);
        const emailError = t('emailError');
        const newsletterSchema = z.object({
            email: z
                .string({
                required_error: emailError,
                invalid_type_error: emailError
            })
                .email({ message: emailError })
        });
        const request = event.request.clone();
        const data = await request.formData();
        const email = data.get('email');
        const validation = newsletterSchema.safeParse({ email });
        const errors = validation.success ? null : zodErrorToObject(validation.error);
        if (errors?.email) {
            return fail(400, {
                values: {
                    email
                },
                errors
            });
        }
        try {
            return (await callback?.({ ...event, email })) || { success: true };
        }
        catch (error) {
            console.error(error);
            const status = error?.status || 500;
            return fail(status, {
                values: {
                    email
                },
                errors: {
                    email: status === 400 ? emailError : error.message
                }
            });
        }
    };
};
