import type { Handle } from '@sveltejs/kit';
import type { Locale } from '../types';
export type I18nParams = {
    supportedLocales: Readonly<Locale[]>;
    defaultLocale: Locale;
};
export declare const createI18nHandles: ({ supportedLocales, defaultLocale }: I18nParams) => {
    langInfo: Handle;
    langRedirect: Handle;
    langAttribute: Handle;
};
