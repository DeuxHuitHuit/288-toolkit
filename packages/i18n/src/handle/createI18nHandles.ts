import { getLangFromRequest } from '@288-toolkit/http';
import type { Handle } from '@sveltejs/kit';
import { localeToLanguage, localeToRegion } from '../lib/localeTo';
import type { Locale } from '../types';

export type I18nParams = {
	supportedLocales: Readonly<Locale[]>;
	defaultLocale: Locale;
};

export const createI18nHandles = ({ supportedLocales, defaultLocale }: I18nParams) => {
	const isLocalized = supportedLocales.length > 1;
	const defaultLanguage = localeToLanguage(defaultLocale);
	const supportedLanguages = supportedLocales.map(localeToLanguage);

	/**
	 * Sets the locale, language and region in the event locals.
	 */
	const langInfo: Handle = ({ event, resolve }) => {
		const { request } = event;
		const language = isLocalized
			? getLangFromRequest(request, {
					supportedLanguages,
					defaultLanguage
				})
			: defaultLanguage;
		const locale =
			supportedLocales.find((locale) => locale.startsWith(`${language}-`)) || defaultLocale;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		event.locals.locale = locale;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		event.locals.language = language;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		event.locals.region = localeToRegion(locale);
		return resolve(event);
	};

	/**
	 * This handle redirects the user to the correct language if the site is localized (has more than one supported locales).
	 * Depends on the langInfo handle to be run first.
	 */
	const langRedirect: Handle = async ({ resolve, event }) => {
		const { url, locals } = event;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const language = locals.language;
		// If site is localized and request is for root
		if (isLocalized && url.pathname === '/') {
			// Redirect to user preferred language
			return new Response(null, {
				status: 303,
				headers: new Headers({
					location: `/${language}`
				})
			});
		}
		return resolve(event);
	};

	/**
	 * This handle sets the html lang attribute for the request.
	 * Depends on the langInfo handle to be run first.
	 */
	const langAttribute: Handle = ({ event, resolve }) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// Get user language
		const language = event.locals.language;
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

	return {
		langInfo,
		langRedirect,
		langAttribute
	};
};
