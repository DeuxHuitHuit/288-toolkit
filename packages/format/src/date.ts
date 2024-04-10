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

import { getConfig } from '@288-toolkit/config';
import { Locale } from '@288-toolkit/config/types';
import { currentLocale } from '@288-toolkit/i18n';
import type { Maybe, MaybeUndefined } from '@288-toolkit/types';
import type { TimeZone } from '@288-toolkit/types/timezones';
import { DEV } from 'esm-env';

export const USER_LOCALE = Symbol('user');
type USER_LOCALE = typeof USER_LOCALE;

// This is a "safe", as close to ISO as possible locale.
// @see https://stackoverflow.com/questions/25050034/get-iso-8601-using-intl-datetimeformat
export const ISO_LOCALE = 'sv-SE' as const;
type ISO_LOCALE = typeof ISO_LOCALE;

type FormatDateLocale = USER_LOCALE | ISO_LOCALE | Maybe<Locale>;

const DEFAULTS = () => {
	const config = getConfig();
	const defaults: Intl.DateTimeFormatOptions = {
		timeZone: config.timezone
	} as const;
	return defaults;
};

/**
 * A wrapper around Intl.DateTimeFormat that returns the formatted date string.
 * @param date The date to format.
 * @param options The options to pass to Intl.DateTimeFormat.
 * @param locale The locale to use. Use the `USER_LOCALE` symbol to use the user's locale.
 */
export const formatDate = (
	date: Date,
	options: Partial<Intl.DateTimeFormatOptions> = {},
	locale: FormatDateLocale = null
): string => {
	const effectiveLocale = locale === USER_LOCALE ? undefined : locale || currentLocale();
	try {
		const optionsWithDefaults: Intl.DateTimeFormatOptions = { ...DEFAULTS(), ...options };
		// Should this be DEFAULT_LOCALE instead of undefined?
		return new Intl.DateTimeFormat(effectiveLocale || undefined, optionsWithDefaults).format(
			date
		);
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
 * @param options The starting options to pass to Intl.DateTimeFormat.
 */
export const createFormatDate = (
	options_: Partial<Intl.DateTimeFormatOptions> = {},
	locale: FormatDateLocale = null
) => {
	// Create a copy of the object, to make sure we are not altering it
	const options = { ...DEFAULTS(), ...options_ };
	// Create the formatter object/api
	const formatter: FormatDate = {
		format: (date: Date) => formatDate(date, options, locale),
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
		locale: (_locale: FormatDateLocale) => ((locale = _locale), formatter),
		userLocale: () => formatter.locale(USER_LOCALE),
		iso: () => formatter.locale(ISO_LOCALE)
	};
	return formatter;
};

/**
 * Gets the short format of the date, in the default timezone and current locale.
 * Ex: 1/1/2021
 */
export const short = (date: Date) => createFormatDate().short().format(date);

/**
 * Gets the medium format of the date, in the default timezone and current locale.
 * Ex: Jan 1, 2021
 */
export const medium = (date: Date) => createFormatDate().medium().format(date);

/**
 * Gets the long format of the date, in the default timezone and current locale.
 * Ex: January 1, 2021
 */
export const long = (date: Date) => createFormatDate().long().format(date);

/**
 * Gets the full format of the date, in the default timezone and current locale.
 * Ex: Friday, January 1, 2021
 */
export const full = (date: Date) => createFormatDate().full().format(date);

/**
 * Gets the numeric year of the date, in the default timezone and current locale.
 * Ex: 2021
 */
export const year = (date: Date) => createFormatDate().year().format(date);

/**
 * Gets the 2-digit month of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const month = (date: Date) => createFormatDate().month().format(date);

/**
 * Gets the numeric month of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const monthNumeric = (date: Date) => createFormatDate().month('numeric').format(date);

/**
 * Gets the long month of the date, in the default timezone and current locale.
 * Ex: January
 */
export const monthName = (date: Date) => createFormatDate().month('long').format(date);

/**
 * Gets the 2-digit day of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const day = (date: Date) => createFormatDate().day().format(date);

/**
 * Gets the numeric day of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const dayNumeric = (date: Date) => createFormatDate().day('numeric').format(date);

/**
 * Gets the long weekday of the date, in the default timezone and current locale.
 * Ex: Friday
 */
export const weekday = (date: Date) => createFormatDate().weekday().format(date);

/**
 * Gets the 2-digit hour of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const hour = (date: Date) => createFormatDate().hour().format(date);

/**
 * Gets the numeric hour of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const hourNumeric = (date: Date) => createFormatDate().hour('numeric').format(date);

/**
 * Gets the 2-digit minutes of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const minute = (date: Date) => createFormatDate().minute().format(date);

/**
 * Gets the numeric minutes of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const minuteNumeric = (date: Date) => createFormatDate().minute('numeric').format(date);

/**
 * Gets the 2-digit seconds of the date, in the default timezone and current locale.
 * Ex: 01
 */
export const second = (date: Date) => createFormatDate().second().format(date);

/**
 * Gets the numeric seconds of the date, in the default timezone and current locale.
 * Ex: 1
 */
export const secondNumeric = (date: Date) => createFormatDate().second('numeric').format(date);

/**
 * Gets the short time of the date, in the default timezone and current locale.
 * Ex: 1:01 AM
 */
export const time = (date: Date) => createFormatDate().time().format(date);

/**
 * Gets the short time of the date in 24h format, in the default timezone.
 * Ex: 20:02
 */
export const time24h = (date: Date) => createFormatDate().iso().hour().minute().format(date);

/**
 * Formats the date into the ISO format, in the default timezone.
 */
export const yyyymmdd = (date: Date) =>
	createFormatDate().iso().year('numeric').month('2-digit').day('2-digit').format(date);

/**
 * Formats the date into the ISO format, in the USER'S timezone.
 * This pairs well with `parseLocalDate()`.
 */
export const yyyymmddLocal = (date: Date) =>
	createFormatDate()
		.userTimeZone()
		.iso()
		.year('numeric')
		.month('2-digit')
		.day('2-digit')
		.format(date);
