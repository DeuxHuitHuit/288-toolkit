import type { Handle } from '@sveltejs/kit';
import { getLangFromRequest } from '../lib/getLangFromRequest';
import { localeToLanguage, localeToRegion } from '../lib/localeTo';
import type { Locale } from '../types';

type Params<T extends readonly Locale[] = readonly Locale[]> = {
	supportedLocales: T;
	defaultLocale: T[number];
};

/**
 * @returns A handle that:
 * - Redirects to the user's preferred language if the site is localized and the request is for the root
 * - Sets the locale, language, and region in the event locals
 * - Outputs the correct html lang attribute
 */
export const createI18nHandle = ({ supportedLocales, defaultLocale }: Params): Handle => {
	const isLocalized = supportedLocales.length > 1;
	const defaultLanguage = localeToLanguage(defaultLocale);
	const supportedLanguages = supportedLocales.map(localeToLanguage);

	return ({ resolve, event }) => {
		const { url } = event;
		const { request } = event;
		const language = isLocalized
			? getLangFromRequest(request, {
					supportedLanguages,
					defaultLanguage
				})
			: defaultLanguage;

		// If site is localized and request is for root, redirect to user preferred language
		if (isLocalized && url.pathname === '/') {
			return new Response(null, {
				status: 303,
				headers: new Headers({
					location: `/${language}`
				})
			});
		}

		// Set the locale, language, and region in event locals
		const locale =
			(supportedLocales.find((locale) => locale.startsWith(`${language}-`)) as Locale) ||
			defaultLocale;
		event.locals.locale = locale;
		event.locals.language = language;
		event.locals.region = localeToRegion(locale);

		// Resolve event and output correct html lang attribute
		return resolve(event, {
			transformPageChunk: ({ html, done }) => {
				if (!done) {
					return html;
				}
				return html.replace('%lang%', language);
			}
		});
	};
};
