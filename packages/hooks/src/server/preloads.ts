import type { Handle } from '@sveltejs/kit';

/**
 * Preloads css, js, and font files.
 */
export const preloads: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		preload: ({ type }) => {
			return ['css', 'js', 'font'].includes(type);
		}
	});
	return response;
};
