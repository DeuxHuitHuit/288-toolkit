/**@docs
 * This module provide functions to convert a locale to its parts.
 */

import type { Language, Locale, Region } from '../types';

/**
 * @returns The language part of the given locale.
 */
export const localeToLanguage = <T = Maybe<Locale>>(
	locale: MaybeUnwrap<T, Locale>
): MaybeCopy<T, Language> => {
	if (!locale) {
		return null as MaybeCopy<T, Language>;
	}
	return locale.split('-')[0] as Language;
};

/**
 * @returns The language part of the given locale.
 */
export const localeToRegion = <T = Maybe<Locale>>(
	locale: MaybeUnwrap<T, Locale>
): MaybeCopy<T, Region> => {
	if (!locale) {
		return null as MaybeCopy<T, Region>;
	}
	return locale.split('-')[1] as Region;
};
