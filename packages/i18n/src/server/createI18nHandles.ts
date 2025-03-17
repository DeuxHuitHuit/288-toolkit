import type { SiteRouter } from '@288-toolkit/hooks/server';
import { acceptedLanguage } from '@288-toolkit/http';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { localeToLanguage, localeToRegion } from '../localeTo.js';
import type { Locale } from '../types/index.js';

type I18nLocals = App.Locals & {
	siteRouter?: SiteRouter; // @see @288-toolkit/hooks
	locale?: Locale;
	language?: string;
	region?: string;
};

export type I18nParams = {
	supportedLocales: Readonly<Locale[]>;
	defaultLocale: Locale;
};

export const createI18nHandles = <L extends I18nLocals>({
	supportedLocales,
	defaultLocale
}: I18nParams) => {
	const isLocalized = supportedLocales.length > 1;
	const defaultLanguage = localeToLanguage(defaultLocale);
	const supportedLanguages = supportedLocales.map(localeToLanguage);

	const i18nRedirect: (location: (event: RequestEvent) => string) => Handle = !isLocalized
		? () =>
				({ event, resolve }) =>
					resolve(event)
		: (location) =>
				({ event, resolve }) => {
					if (event.url.pathname === '/') {
						return new Response(null, {
							status: 303,
							headers: new Headers({
								location: location(event)
							})
						});
					}
					return resolve(event);
				};

	const findFirstSupportedLocale = (language: string) =>
		supportedLocales.find((locale) => locale.startsWith(`${language}-`));

	/**
	 * Sets the locale, language and region in the event locals based on the supported languages.
	 */
	const langInfo: Handle = ({ event, resolve }) => {
		const { request } = event;
		const locals = event.locals as L;
		const language = isLocalized
			? // Use the site uri if it exists and not the default site uri,
				// otherwise use the accepted language from the request headers
				!locals.siteRouter?.default &&
				supportedLanguages.includes(locals.siteRouter.site.uri)
				? locals.siteRouter.site.uri
				: acceptedLanguage(request, {
						supportedLanguages,
						defaultLanguage
					})
			: defaultLanguage;

		// Find the supported locale that starts with the language
		const locale = findFirstSupportedLocale(language) || defaultLocale;

		locals.locale = locale;
		locals.language = language;
		locals.region = localeToRegion(locale);
		return resolve(event);
	};

	/**
	 * Sets the locale, language and region in the event locals based on the supported locales.
	 */
	const localeInfo: Handle = ({ event, resolve }) => {
		const locals = event.locals as L;
		// If the site is localized, use the site uri if it exists and not the default site uri,
		// otherwise use the default locale
		// TODO: We should provide a acceptedLocale function...
		const locale = isLocalized
			? !locals.siteRouter?.default && supportedLocales.includes(locals.siteRouter.site.uri)
				? locals.siteRouter.site.uri
				: defaultLocale
			: defaultLocale;

		locals.locale = locale;
		locals.language = localeToLanguage(locale);
		locals.region = localeToRegion(locale);
		return resolve(event);
	};

	/**
	 * This handle redirects the user to the correct language if the site is localized (has more than one supported locales).
	 * Depends on the langInfo handle to be run first.
	 */
	const langRedirect: Handle = i18nRedirect((event) => {
		const locals = event.locals as L;
		return `/${locals.language}`;
	});

	/**
	 * This handle redirects the user to the correct locale if the site is localized (has more than one supported locales).
	 * Depends on the localeInfo handle to be run first.
	 */
	const localeRedirect: Handle = i18nRedirect((event) => {
		const locals = event.locals as L;
		return `/${locals.locale}`;
	});

	/**
	 * This handle sets the html lang attribute for the request.
	 * Depends on the langInfo handle to be run first.
	 */
	const langAttribute: Handle = ({ event, resolve }) => {
		const locals = event.locals as L;
		// Resolve event and output correct html lang attribute
		return resolve(event, {
			transformPageChunk: ({ html, done }) => {
				if (!done) {
					return html;
				}
				return html.replace('%lang%', locals.language);
			}
		});
	};

	return {
		langInfo,
		localeInfo,
		langRedirect,
		localeRedirect,
		langAttribute
	};
};
