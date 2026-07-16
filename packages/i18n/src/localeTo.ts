/**@docs
 * This module provide functions to convert a locale to its parts.
 */

import type { I18nInfo, Locale } from './types/index.js';

/**
 * @returns The language part of the given locale.
 */
export const localeToLanguage = <
	T extends Locale = Locale,
	U extends string = NonNullable<I18nInfo<T[]>['language']>
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
	U extends string = NonNullable<I18nInfo<T[]>['region']>
>(
	locale: T
) => {
	return locale.split('-')[1] as U;
};
