/**@docs
 * This module provide functions to get the current locale and language.
 */
import type { LangInfo, Locale } from './types';
/**
 * This methods deals with isomorphic code and returns the current locale.
 * In the browser, it returns the cached locale from the page store.
 * On the server, it returns the locale from the page store, always, since the
 * cache can not be used since it is request based.
 * @returns The current or cached locale.
 */
export declare const currentLocale: () => Locale;
/**
 * @returns The current language or the default language if no locale is set.
 * @see currentLocale
 */
export declare const currentLanguage: () => LangInfo['language'];
