import { type RequestEvent } from '@sveltejs/kit';
/**
 * A function to validate the honeypot field in a form submission.
 * For it to work, the form form must use the [Honeypot.svelte](../../components/ui/forms/Honeypot.svelte) component.
 */
export declare const validateHoneypot: (event: RequestEvent) => Promise<void>;
