/**@docs
 * title: formatDate
 *
 * This module offers three apis to manipulate the options passed to Intl.DateTimeFormat.
 * Each api offers different affordances to manipulate the options.
 *
 * 1) `formatDate(date, options, locale)`: The most basic api.
 *    It takes a date and options and returns the formatted date string.
 * 2) `createFormatDate(options, locale)`: A chainable api that allows you to manipulate the options.
 *    offers a lot of shorthand functions to manipulate the options.
 * 3) `[option](date)`: A set of functions that call `createFormatDate()` without any option,
 *    turns on a single option, then call `format()` with the date passed to the function.
 *    Those function are also available for imports.
 */
import type { Locale } from '@288-toolkit/i18n/types';
import type { Maybe, MaybeUndefined } from '@288-toolkit/types';
import type { TimeZone } from '@288-toolkit/types/timezones';
import { USER_LOCALE } from './userLocale.js';
export declare const ISO_LOCALE: "sv-SE";
type ISO_LOCALE = typeof ISO_LOCALE;
export type FormatDateLocale = USER_LOCALE | ISO_LOCALE | Maybe<Locale>;
export type FormatDateOptions = Partial<Intl.DateTimeFormatOptions> & {
    timeZone?: TimeZone;
    locale?: FormatDateLocale;
};
/**
 * A wrapper around Intl.DateTimeFormat that returns the formatted date string.
 * @param date The date to format.
 * @param options The locale and format options to pass to Intl.DateTimeFormat.
 */
export declare const formatDate: (date: Date, options?: FormatDateOptions) => string;
/**
 * The interface returned by `createFormatDate()`.
 */
interface FormatDate {
    /**
     * Formats the date.
     * @inheritdoc formatDate
     * @see formatDate
     */
    format: (date: Date) => string;
    /**
     * Set the timeZone to use. Set to undefined to use the user's timeZone.
     * @returns formatter
     */
    timeZone: (timeZone: MaybeUndefined<TimeZone>) => FormatDate;
    /**
     * Use the user's timezone
     */
    userTimeZone: () => FormatDate;
    /**
     * Use UTC timezone
     */
    utc: () => FormatDate;
    /**
     * Set the dateStyle option to use
     */
    dateStyle: (dateStyle: Intl.DateTimeFormatOptions['dateStyle']) => FormatDate;
    /**
     * Use the short dateStyle
     */
    short: () => FormatDate;
    /**
     * Use the medium dateStyle
     */
    medium: () => FormatDate;
    /**
     * Use the long dateStyle
     */
    long: () => FormatDate;
    /**
     * Use the full dateStyle
     */
    full: () => FormatDate;
    /**
     * Set the year option to use. Defaults to numeric.
     */
    year: (year?: Intl.DateTimeFormatOptions['year']) => FormatDate;
    /**
     * Set the month option to use. Defaults to 2-digit.
     */
    month: (month?: Intl.DateTimeFormatOptions['month']) => FormatDate;
    /**
     * Set the day option to use. Defaults to 2-digit.
     */
    day: (day?: Intl.DateTimeFormatOptions['day']) => FormatDate;
    /**
     * Set the weekday option to use. Defaults to long.
     */
    weekday: (weekday?: Intl.DateTimeFormatOptions['weekday']) => FormatDate;
    /**
     * Set the hour option to use. Defaults to 2-digit.
     */
    hour: (hour?: Intl.DateTimeFormatOptions['hour']) => FormatDate;
    /**
     * Set the minute option to use. Defaults to 2-digit.
     */
    minute: (minute?: Intl.DateTimeFormatOptions['minute']) => FormatDate;
    /**
     * Set the second option to use. Defaults to 2-digit.
     */
    second: (second?: Intl.DateTimeFormatOptions['second']) => FormatDate;
    /**
     * Set the timeStyle option to use.
     */
    timeStyle: (timeStyle: Intl.DateTimeFormatOptions['timeStyle']) => FormatDate;
    /**
     * Use the short timeStyle
     */
    time: () => FormatDate;
    /**
     * Set the locale to use
     */
    locale: (_locale: FormatDateLocale) => FormatDate;
    /**
     * Use the user's locale
     */
    userLocale: () => FormatDate;
    /**
     * Use the "ISO" locale
     */
    iso: () => FormatDate;
}
/**
 * A chainable interface to manipulate the options passed to Intl.DateTimeFormat.
 * @param options The starting options to pass to Intl.DateTimeFormat and the locale to use.
 */
export declare const createFormatDate: (options?: FormatDateOptions) => FormatDate;
/**
 * Gets the short format of the date, in the default timezone and current locale.
 * Ex: 1/1/2021
 */
export declare const short: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the medium format of the date, in the default timezone and current locale.
 * Ex: Jan 1, 2021
 */
export declare const medium: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the long format of the date, in the default timezone and current locale.
 * Ex: January 1, 2021
 */
export declare const long: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the full format of the date, in the default timezone and current locale.
 * Ex: Friday, January 1, 2021
 */
export declare const full: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the numeric year of the date, in the default timezone and current locale.
 * Ex: 2021
 */
export declare const year: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the 2-digit month of the date, in the default timezone and current locale.
 * Ex: 01
 */
export declare const month: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the numeric month of the date, in the default timezone and current locale.
 * Ex: 1
 */
export declare const monthNumeric: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the long month of the date, in the default timezone and current locale.
 * Ex: January
 */
export declare const monthName: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the 2-digit day of the date, in the default timezone and current locale.
 * Ex: 01
 */
export declare const day: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the numeric day of the date, in the default timezone and current locale.
 * Ex: 1
 */
export declare const dayNumeric: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the long weekday of the date, in the default timezone and current locale.
 * Ex: Friday
 */
export declare const weekday: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the 2-digit hour of the date, in the default timezone and current locale.
 * Ex: 01
 */
export declare const hour: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the numeric hour of the date, in the default timezone and current locale.
 * Ex: 1
 */
export declare const hourNumeric: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the 2-digit minutes of the date, in the default timezone and current locale.
 * Ex: 01
 */
export declare const minute: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the numeric minutes of the date, in the default timezone and current locale.
 * Ex: 1
 */
export declare const minuteNumeric: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the 2-digit seconds of the date, in the default timezone and current locale.
 * Ex: 01
 */
export declare const second: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the numeric seconds of the date, in the default timezone and current locale.
 * Ex: 1
 */
export declare const secondNumeric: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the short time of the date, in the default timezone and current locale.
 * Ex: 1:01 AM
 */
export declare const time: (date: Date, options?: FormatDateOptions) => string;
/**
 * Gets the short time of the date in 24h format, in the default timezone.
 * Ex: 20:02
 */
export declare const time24h: (date: Date, options?: FormatDateOptions) => string;
/**
 * Formats the date into the ISO format, in the default timezone.
 */
export declare const yyyymmdd: (date: Date, options?: FormatDateOptions) => string;
/**
 * Formats the date into the ISO format, in the USER'S timezone.
 * This pairs well with `parseLocalDate()`.
 */
export declare const yyyymmddLocal: (date: Date, options?: FormatDateOptions) => string;
export {};
