/**@docs
 * This module provide functions to get the current locale and language.
 */
import { BROWSER } from 'esm-env';
import { get } from 'svelte/store';
import { localeToLanguage } from './localeTo.js';
import { currentLocale as currentLocaleStore } from './stores/currentLocale.js';
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
        return get(currentLocaleStore);
    }
    if (!cachedLocale) {
        cachedLocale = get(currentLocaleStore);
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
