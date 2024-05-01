/**@docs
 * This module provide functions to get the current locale and language.
 */
import { page } from '$app/stores';
import { BROWSER } from 'esm-env';
import { get } from 'svelte/store';
import { localeToLanguage } from './localeTo.js';
let cachedLocale;
/**
 * This methods deals with isomorphic code and returns the current locale.
 * In the browser, it returns the cached locale from the page store.
 * On the server, it returns the locale from the page store, always, since the
 * cache can not be used since it is request based.
 * @returns The current or cached locale.
 */
export const currentLocale = () => {
    if (!BROWSER) {
        return get(page).data.locale;
    }
    if (!cachedLocale) {
        cachedLocale = get(page).data.locale;
    }
    return cachedLocale;
};
/**
 * @returns The current language or the default language if no locale is set.
 * @see currentLocale
 */
export const currentLanguage = () => {
    return localeToLanguage(currentLocale());
};
