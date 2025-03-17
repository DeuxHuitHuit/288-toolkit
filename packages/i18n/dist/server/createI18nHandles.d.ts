import type { SiteRouter } from '@288-toolkit/hooks/server';
import type { Handle } from '@sveltejs/kit';
import type { Locale } from '../types/index.js';
type I18nLocals = App.Locals & {
    siteRouter?: SiteRouter;
    locale?: Locale;
    language?: string;
    region?: string;
};
export type I18nParams = {
    supportedLocales: Readonly<Locale[]>;
    defaultLocale: Locale;
};
export declare const createI18nHandles: <L extends I18nLocals>({ supportedLocales, defaultLocale }: I18nParams) => {
    langInfo: Handle;
    localeInfo: Handle;
    langRedirect: Handle;
    localeRedirect: Handle;
    langAttribute: Handle;
};
export {};
