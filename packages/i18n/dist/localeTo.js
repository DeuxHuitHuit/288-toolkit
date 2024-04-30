/**@docs
 * This module provide functions to convert a locale to its parts.
 */
/**
 * @returns The language part of the given locale.
 */
export const localeToLanguage = (locale) => {
    return locale.split('-')[0];
};
/**
 * @returns The language part of the given locale.
 */
export const localeToRegion = (locale) => {
    return locale.split('-')[1];
};
