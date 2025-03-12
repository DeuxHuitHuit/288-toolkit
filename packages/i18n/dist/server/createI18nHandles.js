import { getLangFromRequest } from '@288-toolkit/http';
import { localeToLanguage, localeToRegion } from '../localeTo.js';
export const createI18nHandles = ({ supportedLocales, defaultLocale }) => {
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
    /**
     * Sets the locale, language and region in the event locals based on the supported languages.
     */
    const langInfo = ({ event, resolve }) => {
        const { request } = event;
        const language = isLocalized
            ? getLangFromRequest(request, {
                supportedLanguages,
                defaultLanguage
            })
            : defaultLanguage;
        const locale = supportedLocales.find((locale) => locale.startsWith(`${language}-`)) || defaultLocale;
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
     * Sets the locale, language and region in the event locals based on the supported locales.
     */
    const localeInfo = ({ event, resolve }) => {
        let locale = defaultLocale;
        const pathLocale = event.url.pathname.split('/')[1];
        if (pathLocale && supportedLocales.includes(pathLocale)) {
            locale = pathLocale;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        event.locals.locale = locale;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        event.locals.language = localeToLanguage(locale);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        event.locals.region = localeToRegion(locale);
        return resolve(event);
    };
    /**
     * This handle redirects the user to the correct language if the site is localized (has more than one supported locales).
     * Depends on the langInfo handle to be run first.
     */
    const langRedirect = i18nRedirect((event) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return `/${event.locals.language}`;
    });
    /**
     * This handle redirects the user to the correct locale if the site is localized (has more than one supported locales).
     * Depends on the localeInfo handle to be run first.
     */
    const localeRedirect = i18nRedirect((event) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return `/${event.locals.locale}`;
    });
    /**
     * This handle sets the html lang attribute for the request.
     * Depends on the langInfo handle to be run first.
     */
    const langAttribute = ({ event, resolve }) => {
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
        localeInfo,
        langRedirect,
        localeRedirect,
        langAttribute
    };
};
