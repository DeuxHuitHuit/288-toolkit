import type { Handle } from '@sveltejs/kit';
import { config } from 'src/toolkit.config';
import { getLangFromRequest } from '../lib/getLangFromRequest';
import { localeToLanguage } from '../lib/localeTo';
import type { Locale } from '../types';

export const i18n: Handle = async ({ resolve, event }) => {
	const { supportedLocales, defaultLocale } = config;
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
	// @ts-expect-error Type is added to App.Locals from the project
	event.locals.locale = locale;
	// @ts-expect-error Type is added to App.Locals from the project
	event.locals.language = language;
	// @ts-expect-error Type is added to App.Locals from the project
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
