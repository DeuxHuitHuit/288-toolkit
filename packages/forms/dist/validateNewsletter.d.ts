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
import { type Action } from '@sveltejs/kit';
type Callback = (params: Parameters<Action>[0] & {
    email: string;
}) => ReturnType<Action>;
export declare const validateNewsletter: (language: string, callback?: Callback) => Action;
export {};
