import type { Handle, RequestEvent } from '@sveltejs/kit';
import type { Locale } from '../types/index.js';
export type I18nParams = {
    /**
     * The supported locales which will be matched against the request locale.
     */
    supportedLocales: Readonly<Locale[]>;
    /**
     * The default locale which will be used if no supported locale is found.
     */
    defaultLocale: Locale;
    /**
     * An override function that returns the supported locale for the given event.
     * When the site route is in default mode, this locale will be used to derive and set the language and region in the event locals.
     * @see I18nLocals.locale
     * @see SiteRouterLocals
     */
    supportedLocale?: (event: RequestEvent) => Locale;
    /**
     * An override function that returns the supported language for the given event.
     * When the site route is in default mode, this language will be used to derive and set the locale and region in the event locals.
     * @see I18nLocals.language
     * @see SiteRouterLocals
     */
    supportedLanguage?: (event: RequestEvent) => string;
};
export declare const createI18nHandles: <L extends App.Locals & {
    locale?: `${string}-${string}` | undefined;
    language?: string | undefined;
    region?: string | undefined;
} & {
    siteRouter: import("@288-toolkit/hooks/server").SiteRouter<string>;
}>({ supportedLocales, defaultLocale, supportedLocale, supportedLanguage }: I18nParams) => {
    langInfo: Handle;
    localeInfo: Handle;
    langRedirect: Handle;
    localeRedirect: Handle;
    langAttribute: Handle;
};
