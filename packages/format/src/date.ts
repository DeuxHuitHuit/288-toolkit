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
import { DEV } from 'esm-env';
import { USER_LOCALE } from './userLocale';

// This is a "safe", as close to ISO as possible locale.
// @see https://stackoverflow.com/questions/25050034/get-iso-8601-using-intl-datetimeformat
export const ISO_LOCALE = 'sv-SE' as const;
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
export const formatDate = (date: Date, options: FormatDateOptions = {}): string => {
	const { locale, ...formatOptions } = options;
	const effectiveLocale = locale === USER_LOCALE ? undefined : locale || undefined;
	try {
		return new Intl.DateTimeFormat(effectiveLocale, formatOptions).format(date);
	} catch (error) {
		return DEV ? error.message : date.toLocaleString();
	}
};

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
export const createFormatDate = (options: FormatDateOptions = {}) => {
	// Create the formatter object/api
	const formatter: FormatDate = {
		format: (date: Date) => formatDate(date, options),
		timeZone: (timeZone: MaybeUndefined<TimeZone>) => (
			(options.timeZone = timeZone), formatter
		),
		userTimeZone: () => formatter.timeZone(undefined),
		utc: () => formatter.timeZone('UTC'),
		dateStyle: (dateStyle: Intl.DateTimeFormatOptions['dateStyle']) => (
			(options.dateStyle = dateStyle), formatter
		),
		short: () => formatter.dateStyle('short'),
		medium: () => formatter.dateStyle('medium'),
		long: () => formatter.dateStyle('long'),
		full: () => formatter.dateStyle('full'),
		year: (year: Intl.DateTimeFormatOptions['year'] = 'numeric') => (
			(options.year = year), formatter
		),
		month: (month: Intl.DateTimeFormatOptions['month'] = '2-digit') => (
			(options.month = month), formatter
		),
		day: (day: Intl.DateTimeFormatOptions['day'] = '2-digit') => (
			(options.day = day), formatter
		),
		weekday: (weekday: Intl.DateTimeFormatOptions['weekday'] = 'long') => (
			(options.weekday = weekday), formatter
		),
		hour: (hour: Intl.DateTimeFormatOptions['hour'] = '2-digit') => (
			(options.hour = hour), formatter
		),
		minute: (minute: Intl.DateTimeFormatOptions['minute'] = '2-digit') => (
			(options.minute = minute), formatter
		),
		second: (second: Intl.DateTimeFormatOptions['second'] = '2-digit') => (
			(options.second = second), formatter
		),
		timeStyle: (timeStyle: Intl.DateTimeFormatOptions['timeStyle']) => (
			(options.timeStyle = timeStyle), formatter
		),
		time: () => formatter.timeStyle('short'),
		locale: (_locale: FormatDateLocale) => ((options.locale = _locale), formatter),
		userLocale: () => formatter.locale(USER_LOCALE),
		iso: () => formatter.locale(ISO_LOCALE)
	};
	return formatter;
};

/**
 * Gets the short format of the date, in the default timezone and current locale.
 * Ex: 1/1/2021
 */
export const short = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).short().format(date);

/**
 * Gets the medium format of the date, in the default timezone and current locale.
 * Ex: Jan 1, 2021
 */
export const medium = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).medium().format(date);

/**
 * Gets the long format of the date, in the default timezone and current locale.
 * Ex: January 1, 2021
 */
export const long = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).long().format(date);

/**
 * Gets the full format of the date, in the default timezone and current locale.
 * Ex: Friday, January 1, 2021
 */
export const full = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).full().format(date);

/**
 * Gets the numeric year of the date, in the default timezone and current locale.
 * Ex: 2021
 */
export const year = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).year().format(date);

/**
 * Gets the 2-digit month of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const month = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).month().format(date);

/**
 * Gets the numeric month of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const monthNumeric = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).month('numeric').format(date);

/**
 * Gets the long month of the date, in the default timezone and current locale.
 * Ex: January
 */
export const monthName = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).month('long').format(date);

/**
 * Gets the 2-digit day of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const day = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).day().format(date);

/**
 * Gets the numeric day of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const dayNumeric = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).day('numeric').format(date);

/**
 * Gets the long weekday of the date, in the default timezone and current locale.
 * Ex: Friday
 */
export const weekday = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).weekday().format(date);

/**
 * Gets the 2-digit hour of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const hour = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).hour().format(date);

/**
 * Gets the numeric hour of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const hourNumeric = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).hour('numeric').format(date);

/**
 * Gets the 2-digit minutes of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const minute = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).minute().format(date);

/**
 * Gets the numeric minutes of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const minuteNumeric = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).minute('numeric').format(date);

/**
 * Gets the 2-digit seconds of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const second = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).second().format(date);

/**
 * Gets the numeric seconds of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const secondNumeric = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).second('numeric').format(date);

/**
 * Gets the short time of the date, in the default timezone and current locale.
 * Ex: 1:01 AM
 */
export const time = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).time().format(date);

/**
 * Gets the short time of the date in 24h format, in the default timezone.
 * Ex: 20:02
 */
export const time24h = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).iso().hour().minute().format(date);

/**
 * Formats the date into the ISO format, in the default timezone.
 */
export const yyyymmdd = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options).iso().year('numeric').month('2-digit').day('2-digit').format(date);
/**
 * Formats the date into the ISO format, in the USER'S timezone.
 * This pairs well with `parseLocalDate()`.
 */
export const yyyymmddLocal = (date: Date, options: FormatDateOptions = {}) =>
	createFormatDate(options)
		.userTimeZone()
		.iso()
		.year('numeric')
		.month('2-digit')
		.day('2-digit')
		.format(date);
