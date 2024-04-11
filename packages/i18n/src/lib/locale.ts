/**@docs
 * This module provide functions to get the current locale and language.
 */

import { browser } from '$app/environment';
import { page } from '$app/stores';
import type { MaybeUndefined } from '@288-toolkit/types';
import { get } from 'svelte/store';
import { LangInfo, Locale } from '../types';
import { localeToLanguage } from './localeTo';

let cachedLocale: MaybeUndefined<Locale>;

/**
 * This methods deals with isomorphic code and returns the current locale.
 * In the browser, it returns the cached locale from the page store.
 * On the server, it returns the locale from the page store, always, since the
 * cache can not be used since it is request based.
 * @returns The current or cached locale.
 */
export const currentLocale = (): Locale => {
	if (!browser) {
		return get(page).data.locale as Locale;
	}
	if (!cachedLocale) {
		cachedLocale = get(page).data.locale as Locale;
	}
	return cachedLocale;
};

/**
 * @returns The current language or the default language if no locale is set.
 * @see currentLocale
 */
export const currentLanguage = (): LangInfo['language'] => {
	return localeToLanguage(currentLocale());
};
