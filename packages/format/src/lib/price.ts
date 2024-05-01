import type { Locale } from '@288-toolkit/i18n/types';
import { DEV } from 'esm-env';
import { USER_LOCALE } from './userLocale.js';

const DEFAULTS: Intl.NumberFormatOptions = {
	style: 'currency',
	currency: 'CAD',
	currencyDisplay: 'narrowSymbol',
	minimumFractionDigits: 2
} as const;

export type Price = number;

export type FormatPriceLocale = Locale | USER_LOCALE;

export type FormatPriceOptions = Partial<Intl.NumberFormatOptions> & { locale?: FormatPriceLocale };

/**
 * A wrapper around Intl.NumberFormat that returns the formatted price string.
 * @param price The price to format.
 * @param options The options to pass to Intl.NumberFormatOptions and the locale to use. Use the `USER_LOCALE` symbol to use the user's locale.
 */
export const formatPrice = (price: Price, options: FormatPriceOptions = {}) => {
	const { locale, ...formatOptions } = options;
	const effectiveLocale = locale === USER_LOCALE ? undefined : locale || undefined;
	try {
		const mergedOptions: Intl.NumberFormatOptions = { ...DEFAULTS, ...formatOptions };
		return new Intl.NumberFormat(effectiveLocale, mergedOptions).format(price);
	} catch (error) {
		// The narrowSymbol currencyDisplay option is not supported in Safari,
		// so return a default price format in that case
		return DEV ? error.message : `$${price.toFixed(2)}`;
	}
};
