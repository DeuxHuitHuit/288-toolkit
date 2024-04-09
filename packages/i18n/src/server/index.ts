import type { Handle } from '@sveltejs/kit';
import { getLangFromRequest } from '../lib/getLangFromRequest';
import { localeToLanguage, localeToRegion } from '../lib/localeTo';
import type { Locale } from '../types';

type Params<T extends readonly Locale[] = readonly Locale[]> = {
	supportedLocales: T;
	defaultLocale: T[number];
};

export const createI18nHandles = ({ supportedLocales, defaultLocale }: Params) => {
	const IS_LOCALIZED = supportedLocales.length > 1;
	const defaultLanguage = localeToLanguage(defaultLocale);
	const supportedLanguages = supportedLocales.map(localeToLanguage);
	/**
	 * This handle sets the locale, language and region in the request locals.
	 */
	const langInfo: Handle = async ({ resolve, event }) => {
		const { request } = event;
		const language = IS_LOCALIZED
			? getLangFromRequest(request, {
					supportedLanguages,
					defaultLanguage
				})
			: defaultLanguage;
		const locale =
			(supportedLocales.find((locale) => locale.startsWith(`${language}-`)) as Locale) ||
			defaultLocale;
		event.locals.locale = locale;
		event.locals.language = language;
		event.locals.region = localeToRegion(locale);
		return resolve(event);
	};

	/**
	 * This handle sets the html lang attribute for the request.
	 * Depends on langInfo handle to be run first.
	 * @see langInfo
	 */
	const langAttribute: Handle = ({ event, resolve }) => {
		// Get user language
		const language = event.locals.language;
		// Resolve event and output correct html lang attribute
		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html.replace(/<html ([^>]*)lang="en"/, `<html $1lang="${language}"`)
		});
	};

	/**
	 * This handle redirects the user to the correct language if the site is localized.
	 * Depends on langInfo handle to be run first.
	 * @see langInfo
	 */
	const langRedirect: Handle = async ({ resolve, event }) => {
		const { url, locals } = event;
		// If site is localized and request is for root
		if (IS_LOCALIZED && url.pathname === '/') {
			// Redirect to user preferred language
			return new Response(null, {
				status: 303,
				headers: new Headers({
					location: `/${locals.language}`
				})
			});
		}
		return resolve(event);
	};

	return {
		langInfo,
		langAttribute,
		langRedirect
	};
};
