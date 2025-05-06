/**@docs
 * This module provide functions to get the current locale and language.
 */

import { DEV } from 'esm-env';
import { i18nState } from './i18nState.svelte.js';
import { localeToLanguage } from './localeTo.js';
import type { LangInfo, Locale } from './types/index.js';

/**
 * This methods deals with isomorphic code and returns the current locale.
 * In the browser, it returns the cached locale from the page store.
 * On the server, it returns the locale from the page store, always, since the
 * cache can not be used since it is request based.
 * @returns The current or cached locale.
 */
export const currentLocale = (): Locale => {
	const locale = i18nState.currentLocale;
	if (!locale) {
		if (DEV) {
			console.warn('No locale found. You must first call `createTranslationsLoader()`');
		}
		throw new Error('No locale found');
	}
	return locale;
};

/**
 * @returns The current language or the default language if no locale is set.
 * @see currentLocale
 */
export const currentLanguage = (): LangInfo['language'] => {
	return localeToLanguage(currentLocale());
};
