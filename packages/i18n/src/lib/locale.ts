/**@docs
 * This module provide functions to get the current locale and language.
 */

import { browser } from '$app/environment';
import { page } from '$app/stores';
import { get } from 'svelte/store';
import { localeToLanguage } from './localeTo';

let cachedLocale: MaybeUndefined<Locale>;

/**
 * This methods deals with isomorphic code and returns the current locale.
 * In the browser, it returns the cached locale from the page store.
 * On the server, it returns the locale from the page store, always, since the
 * cache can not be used since it is request based.
 * @returns The current or cached locale.
 */
export const currentLocale = (): Maybe<Locale> => {
	if (!browser) {
		return get(page).data.locale || null;
	}
	if (!cachedLocale) {
		cachedLocale = get(page).data.locale;
	}
	return cachedLocale || null;
};

/**
 * @returns The current language or the default language if no locale is set.
 * @see currentLocale
 */
export const currentLanguage = (): Maybe<Language> => {
	return localeToLanguage(currentLocale());
};
