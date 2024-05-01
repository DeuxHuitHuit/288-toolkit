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
import { DEV } from 'esm-env';
import { USER_LOCALE } from './userLocale.js';
// This is a "safe", as close to ISO as possible locale.
// @see https://stackoverflow.com/questions/25050034/get-iso-8601-using-intl-datetimeformat
export const ISO_LOCALE = 'sv-SE';
/**
 * A wrapper around Intl.DateTimeFormat that returns the formatted date string.
 * @param date The date to format.
 * @param options The locale and format options to pass to Intl.DateTimeFormat.
 */
export const formatDate = (date, options = {}) => {
    const { locale, ...formatOptions } = options;
    const effectiveLocale = locale === USER_LOCALE ? undefined : locale || undefined;
    try {
        return new Intl.DateTimeFormat(effectiveLocale, formatOptions).format(date);
    }
    catch (error) {
        return DEV ? error.message : date.toLocaleString();
    }
};
/**
 * A chainable interface to manipulate the options passed to Intl.DateTimeFormat.
 * @param options The starting options to pass to Intl.DateTimeFormat and the locale to use.
 */
export const createFormatDate = (options = {}) => {
    // Create the formatter object/api
    const formatter = {
        format: (date) => formatDate(date, options),
        timeZone: (timeZone) => ((options.timeZone = timeZone), formatter),
        userTimeZone: () => formatter.timeZone(undefined),
        utc: () => formatter.timeZone('UTC'),
        dateStyle: (dateStyle) => ((options.dateStyle = dateStyle), formatter),
        short: () => formatter.dateStyle('short'),
        medium: () => formatter.dateStyle('medium'),
        long: () => formatter.dateStyle('long'),
        full: () => formatter.dateStyle('full'),
        year: (year = 'numeric') => ((options.year = year), formatter),
        month: (month = '2-digit') => ((options.month = month), formatter),
        day: (day = '2-digit') => ((options.day = day), formatter),
        weekday: (weekday = 'long') => ((options.weekday = weekday), formatter),
        hour: (hour = '2-digit') => ((options.hour = hour), formatter),
        minute: (minute = '2-digit') => ((options.minute = minute), formatter),
        second: (second = '2-digit') => ((options.second = second), formatter),
        timeStyle: (timeStyle) => ((options.timeStyle = timeStyle), formatter),
        time: () => formatter.timeStyle('short'),
        locale: (_locale) => ((options.locale = _locale), formatter),
        userLocale: () => formatter.locale(USER_LOCALE),
        iso: () => formatter.locale(ISO_LOCALE)
    };
    return formatter;
};
/**
 * Gets the short format of the date, in the default timezone and current locale.
 * Ex: 1/1/2021
 */
export const short = (date, options = {}) => createFormatDate(options).short().format(date);
/**
 * Gets the medium format of the date, in the default timezone and current locale.
 * Ex: Jan 1, 2021
 */
export const medium = (date, options = {}) => createFormatDate(options).medium().format(date);
/**
 * Gets the long format of the date, in the default timezone and current locale.
 * Ex: January 1, 2021
 */
export const long = (date, options = {}) => createFormatDate(options).long().format(date);
/**
 * Gets the full format of the date, in the default timezone and current locale.
 * Ex: Friday, January 1, 2021
 */
export const full = (date, options = {}) => createFormatDate(options).full().format(date);
/**
 * Gets the numeric year of the date, in the default timezone and current locale.
 * Ex: 2021
 */
export const year = (date, options = {}) => createFormatDate(options).year().format(date);
/**
 * Gets the 2-digit month of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const month = (date, options = {}) => createFormatDate(options).month().format(date);
/**
 * Gets the numeric month of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const monthNumeric = (date, options = {}) => createFormatDate(options).month('numeric').format(date);
/**
 * Gets the long month of the date, in the default timezone and current locale.
 * Ex: January
 */
export const monthName = (date, options = {}) => createFormatDate(options).month('long').format(date);
/**
 * Gets the 2-digit day of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const day = (date, options = {}) => createFormatDate(options).day().format(date);
/**
 * Gets the numeric day of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const dayNumeric = (date, options = {}) => createFormatDate(options).day('numeric').format(date);
/**
 * Gets the long weekday of the date, in the default timezone and current locale.
 * Ex: Friday
 */
export const weekday = (date, options = {}) => createFormatDate(options).weekday().format(date);
/**
 * Gets the 2-digit hour of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const hour = (date, options = {}) => createFormatDate(options).hour().format(date);
/**
 * Gets the numeric hour of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const hourNumeric = (date, options = {}) => createFormatDate(options).hour('numeric').format(date);
/**
 * Gets the 2-digit minutes of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const minute = (date, options = {}) => createFormatDate(options).minute().format(date);
/**
 * Gets the numeric minutes of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const minuteNumeric = (date, options = {}) => createFormatDate(options).minute('numeric').format(date);
/**
 * Gets the 2-digit seconds of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const second = (date, options = {}) => createFormatDate(options).second().format(date);
/**
 * Gets the numeric seconds of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const secondNumeric = (date, options = {}) => createFormatDate(options).second('numeric').format(date);
/**
 * Gets the short time of the date, in the default timezone and current locale.
 * Ex: 1:01 AM
 */
export const time = (date, options = {}) => createFormatDate(options).time().format(date);
/**
 * Gets the short time of the date in 24h format, in the default timezone.
 * Ex: 20:02
 */
export const time24h = (date, options = {}) => createFormatDate(options).iso().hour().minute().format(date);
/**
 * Formats the date into the ISO format, in the default timezone.
 */
export const yyyymmdd = (date, options = {}) => createFormatDate(options).iso().year('numeric').month('2-digit').day('2-digit').format(date);
/**
 * Formats the date into the ISO format, in the USER'S timezone.
 * This pairs well with `parseLocalDate()`.
 */
export const yyyymmddLocal = (date, options = {}) => createFormatDate(options)
    .userTimeZone()
    .iso()
    .year('numeric')
    .month('2-digit')
    .day('2-digit')
    .format(date);
