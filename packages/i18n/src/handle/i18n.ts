import { getLangFromRequest } from '@288-toolkit/http';
import type { Handle } from '@sveltejs/kit';
import { localeToLanguage, localeToRegion } from '../lib/localeTo';
import type { Locale } from '../types';

export type I18nParams = {
	supportedLocales: Readonly<Locale[]>;
	defaultLocale: Locale;
};

export const i18n: (params: I18nParams) => Handle = ({ supportedLocales, defaultLocale }) => {
	const handle: Handle = async ({ resolve, event }) => {
		const isLocalized = supportedLocales.length > 1;
		const defaultLanguage = localeToLanguage(defaultLocale);
		const supportedLanguages = supportedLocales.map(localeToLanguage);

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
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		event.locals.locale = locale;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		event.locals.language = language;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
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
	return handle;
};
