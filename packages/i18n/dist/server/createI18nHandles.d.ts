import type { Handle } from '@sveltejs/kit';
import type { Locale } from '../types/index.js';
export type I18nParams = {
    supportedLocales: Readonly<Locale[]>;
    defaultLocale: Locale;
};
export declare const createI18nHandles: ({ supportedLocales, defaultLocale }: I18nParams) => {
    langInfo: Handle;
    localeInfo: Handle;
    langRedirect: Handle;
    localeRedirect: Handle;
    langAttribute: Handle;
};
