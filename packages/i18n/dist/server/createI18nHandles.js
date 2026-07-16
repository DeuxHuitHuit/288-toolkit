import { acceptedLanguage } from '@288-toolkit/http';
import { localeToLanguage, localeToRegion } from '../localeTo.js';
export const createI18nHandles = ({ supportedLocales, defaultLocale, supportedLocale, supportedLanguage }) => {
    const isLocalized = supportedLocales.length > 1;
    const defaultLanguage = localeToLanguage(defaultLocale);
    const supportedLanguages = supportedLocales.map(localeToLanguage);
    const i18nRedirect = !isLocalized
        ? () => ({ event, resolve }) => resolve(event)
        : (location) => ({ event, resolve }) => {
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
    const findFirstSupportedLocaleByLanguage = (language) => supportedLocales.find((locale) => locale.startsWith(`${language}-`));
    const isSupportedLanguage = (language) => supportedLanguages.includes(language);
    const isSupportedLocale = (locale) => supportedLocales.includes(locale);
    /**
     * Sets the locale, language and region in the event locals based on the supported languages.
     * Language set in the url (i.e. resolved by site router) will always take precedence over override functions.
     */
    const langInfo = ({ event, resolve }) => {
        const locals = event.locals;
        const defaultSupportedLanguage = () => 
        // 1. Use the override function if provided
        supportedLanguage?.(event) ||
            // 2. Check the accepted language from the request headers
            acceptedLanguage(event.request, {
                supportedLanguages,
                defaultLanguage
            }) ||
            // 3. Use the default language
            defaultLanguage;
        const language = isLocalized
            ? // Use the site uri if it exists and is not the default site uri,
                // otherwise use the default language implementation
                !locals.siteRouter?.default && isSupportedLanguage(locals.siteRouter.site.uri)
                    ? locals.siteRouter.site.uri
                    : defaultSupportedLanguage()
            : defaultLanguage;
        // Find the supported locale based on the supported language found.
        const locale = findFirstSupportedLocaleByLanguage(language) || defaultLocale;
        locals.locale = locale;
        locals.language = language;
        locals.region = localeToRegion(locale);
        return resolve(event);
    };
    /**
     * Sets the locale, language and region in the event locals based on the supported locales.
     * Locale set in the url (i.e. resolved by site router) will always take precedence over override functions.
     */
    const localeInfo = ({ event, resolve }) => {
        const locals = event.locals;
        const defaultSupportedLocale = () => {
            // 1. Use the override function if provided
            let probableLocale = supportedLocale?.(event);
            if (probableLocale) {
                return probableLocale;
            }
            // 2a. Try to find a supported language from the request headers
            const language = acceptedLanguage(event.request, {
                supportedLanguages,
                defaultLanguage
            });
            // 2b. If a supported language is found, try to find a supported locale for it
            if (language) {
                probableLocale = findFirstSupportedLocaleByLanguage(language);
                if (probableLocale) {
                    return probableLocale;
                }
            }
            // 3. Use the default locale
            return defaultLocale;
        };
        const locale = isLocalized
            ? // Use the site uri if it exists and is not the default site uri,
                // otherwise use the supported locale from the override function or the default locale
                !locals.siteRouter?.default && isSupportedLocale(locals.siteRouter.site.uri)
                    ? locals.siteRouter.site.uri
                    : defaultSupportedLocale()
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
    const langRedirect = i18nRedirect((event) => {
        const locals = event.locals;
        return `/${locals.language}`;
    });
    /**
     * This handle redirects the user to the correct locale if the site is localized (has more than one supported locales).
     * Depends on the localeInfo handle to be run first.
     */
    const localeRedirect = i18nRedirect((event) => {
        const locals = event.locals;
        return `/${locals.locale}`;
    });
    /**
     * This handle sets the html lang attribute for the request.
     * Depends on the langInfo handle to be run first.
     */
    const langAttribute = ({ event, resolve }) => {
        const locals = event.locals;
        // Resolve event and output correct html lang attribute
        return resolve(event, {
            transformPageChunk: ({ html, done }) => {
                if (!done) {
                    return html;
                }
                return html.replace('%lang%', locals.language || '');
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
