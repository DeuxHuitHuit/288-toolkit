/**@docs
 * This module provide functions to convert a locale to its parts.
 */

import type { LangInfo, Language, Locale, Region } from 'packages/i18n/src/types';

/**
 * @returns The language part of the given locale.
 */
export const localeToLanguage = <
	T extends Locale = Locale,
	U extends Language = LangInfo<T[]>['language']
>(
	locale: T
) => {
	return locale.split('-')[0] as U;
};

/**
 * @returns The language part of the given locale.
 */
export const localeToRegion = <
	T extends Locale = Locale,
	U extends Region = LangInfo<T[]>['region']
>(
	locale: T
) => {
	return locale.split('-')[1] as U;
};
