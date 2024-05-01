import type { Locale } from '@288-toolkit/i18n/types';
import { USER_LOCALE } from './userLocale.js';
export type Price = number;
export type FormatPriceLocale = Locale | USER_LOCALE;
export type FormatPriceOptions = Partial<Intl.NumberFormatOptions> & {
    locale?: FormatPriceLocale;
};
/**
 * A wrapper around Intl.NumberFormat that returns the formatted price string.
 * @param price The price to format.
 * @param options The options to pass to Intl.NumberFormatOptions and the locale to use. Use the `USER_LOCALE` symbol to use the user's locale.
 */
export declare const formatPrice: (price: Price, options?: FormatPriceOptions) => any;
