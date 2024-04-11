/**@docs
 * title: relativeTime
 *
 * This module provides functions to format a date relative to now.
 * It uses the Intl.RelativeTimeFormat API, which is not supported by all browsers.
 * It will default to `toLocaleString()` if the API is not supported or an error occurs.
 *
 * The major feature in this module is the ability to detect the proper unit to use based on the
 * difference between the date and now. For example, if the difference is 1 day, it will use the
 * `day` unit, but if the difference is 1 hour, it will use the `hour` unit. This is done by
 * providing a list of units to use, and the maximum difference for each unit. The units are
 * also skewed to make the difference more human readable. For example, the `day` unit will be
 * used even if the difference is less than 1 day, but close to it.
 *
 * It supports 3 api:
 * 1- `formatRelativeTime(date, options, unit, locale, now)`: formats the date relative to now,
 *    using the given options, unit and locale. You can also set the `now` date, which defaults to
 *    `new Date()`.
 * 2- `relativeTime(options, unit, locale, now)`: creates a formatter for the given options, unit,
 *    locale and now date. It returns a chainable object that allows you to set the unit, locale and
 *    now date, and then format a date.
 * 3- `timeAgo(date)`: formats the date relative to now, using the default options, unit and locale.
 *    This is probably the most common use case, so it's provided as a convenience.
 */

import { Locale } from '@288-toolkit/i18n/types';
import type { Maybe } from '@288-toolkit/types';
import { DEV } from 'esm-env';
import { t } from './translations/relativeTime';

export const USER_LOCALE = Symbol('user');
type USER_LOCALE = typeof USER_LOCALE;
type RelativeTimeLocale = USER_LOCALE | Maybe<Locale>;

export const AUTO_UNIT = Symbol('auto');
type AUTO_UNIT = typeof AUTO_UNIT;

export type RelativeTimeFormatUnit = Intl.RelativeTimeFormatUnit | AUTO_UNIT;

export type RelativeTimeFormatOptions = Partial<Intl.RelativeTimeFormatOptions> & {
	locale?: RelativeTimeLocale;
};

const timeUnits: ReadonlyArray<Intl.RelativeTimeFormatUnit> = [
	'years',
	'months',
	'weeks',
	'days',
	'hours',
	'minutes',
	'seconds'
] as const;
const timeLimits = [
	31_536_000_000, // years
	2_592_000_000, // months
	604_800_000, // weeks
	86_400_000, // days
	3_600_000, // hours
	60_000, // minutes
	1000 // seconds
] as const;
// Skew the time limits a bit, to make sure we don't get a value that is to close to the limit.
const timeSkews = [
	1_296_000_000, // years (15 days)
	86_400_000, // months (1 day)
	43_200_000, // weeks (12 hours)
	1_800_000, // days (30 mins)
	100_000, // hours (100 secs)
	2000, // minutes (2 secs)
	-1000 // seconds (2 secs)
] as const;

export const NOW = Symbol('now');
type NOW = typeof NOW;

/**
 * Looks up the best unit to use depending on the duration in milliseconds.
 * @param durationInMs The duration to display the units for, in milliseconds.
 */
export const resolveAutoUnit = (durationInMs: number): Intl.RelativeTimeFormatUnit | NOW => {
	let index = 0;
	durationInMs = Math.abs(durationInMs);
	while (durationInMs <= timeLimits[index] - timeSkews[index] && index < timeLimits.length) {
		index++;
	}
	if (index == timeLimits.length) {
		return NOW;
	}
	return timeUnits[index];
};

/**
 * Transform the duration in milliseconds to the given unit, rounded.
 * @param durationInMs The duration to display in the unit, in milliseconds.
 * @param unit The unit to display the duration in.
 */
export const resolveTimeDuration = (durationInMs: number, unit: Intl.RelativeTimeFormatUnit) => {
	const index = timeUnits.findIndex((u) => u == unit);
	if (index === -1) {
		throw new Error(`Invalid ${unit} unit`);
	}
	return Math.round(durationInMs / timeLimits[index]);
};

const DEFAULTS: Intl.RelativeTimeFormatOptions = {
	numeric: 'auto',
	style: 'long'
} as const;

/**
 * Formats the date relative to now.
 * It uses the Intl.RelativeTimeFormat API, which is not supported by all browsers.
 * It will default to `toLocaleString()` if the API is not supported or an error occurs.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat
 *
 * @param date The date to format.
 * @param options The options to use to format the date.
 * @param unit The unit to use to format the date. Use `AUTO_UNIT` to automatically detect the best unit.
 * @param locale The locale to use to format the date. Use `USER_LOCALE` to use the user's locale.
 *    Defaults to the current locale.
 * @param now The date to use as the reference date. Defaults to `new Date()`.
 */
export const formatRelativeTime = (
	date: Date,
	options: RelativeTimeFormatOptions = {},
	unit: RelativeTimeFormatUnit = AUTO_UNIT,
	now: Maybe<Date> = null
): string => {
	const { locale, ...formatOptions } = options;
	const effectiveLocale = locale === USER_LOCALE ? undefined : locale || undefined;
	try {
		const optionsWithDefaults: Intl.RelativeTimeFormatOptions = {
			...DEFAULTS,
			...formatOptions
		};
		const effectiveNow = (now || new Date()).getTime();
		const durationInMs = effectiveNow - date.getTime();
		const effectiveUnit = unit === AUTO_UNIT ? resolveAutoUnit(durationInMs) : unit;
		if (effectiveUnit === NOW) {
			return t('now');
		}
		return new Intl.RelativeTimeFormat(effectiveLocale, optionsWithDefaults).format(
			resolveTimeDuration(durationInMs, effectiveUnit),
			effectiveUnit
		);
	} catch (error) {
		return DEV ? error.message : date.toLocaleString();
	}
};

/**
 * The interface of the chainable object returned by `relativeTime(options, unit, locale, now)`.
 */
interface RelativeTimeFormatter {
	/**
	 * Formats the date relative to now, using previously set options.
	 * @param date The date to format.
	 */
	format: (date: Date) => string;
	/**
	 * Sets the style option to `short`.
	 */
	short: () => RelativeTimeFormatter;
	/**
	 * Sets the style option to `narrow`.
	 */
	narrow: () => RelativeTimeFormatter;
	/**
	 * Sets the numeric option to `always`.
	 */
	numeric: () => RelativeTimeFormatter;
	/**
	 * Sets the numeric option to `auto`.
	 */
	numericAuto: () => RelativeTimeFormatter;
	/**
	 * Sets the unit to use to format the date.
	 * @param unit The unit to use.
	 */
	unit: (unit: RelativeTimeFormatUnit) => RelativeTimeFormatter;
	/**
	 * Sets the unit to use to format the date to `AUTO_UNIT`.
	 */
	unitAuto: () => RelativeTimeFormatter;
	/**
	 * Sets the locale to use to format the date.
	 * @param locale The locale to use to format the date.
	 */
	locale: (locale: RelativeTimeLocale) => RelativeTimeFormatter;
	/**
	 * Sets the locale to use to format the date to `USER_LOCALE`.
	 */
	userLocale: () => RelativeTimeFormatter;
	/**
	 * Sets the date to use as the reference date.
	 * @param now The date to use as the reference date.
	 */
	now: (now: Maybe<Date>) => RelativeTimeFormatter;
}

/**
 * Creates a new formatter with the given options, unit, locale and now date.
 * This exposes options to be set with a chainable API, i.e.
 * `relativeTime().narrow().numeric().unit('days').format(date);`
 *
 * All starting parameters are optional.
 *
 * @see formatRelativeTime
 * @param options The starting options to use to format the date and the starting locale to use to format the date. Use `USER_LOCALE` to use the user's locale.
 *   Defaults to the current locale.
 * @param unit The starting unit to use to format the date. Use `AUTO_UNIT` to automatically detect the best unit.
 * @param now The starting date to use as the reference date. Defaults to `new Date()`.
 */
export const relativeTime = (
	options: RelativeTimeFormatOptions = {},
	unit: RelativeTimeFormatUnit = AUTO_UNIT,
	now: Maybe<Date> = null
): RelativeTimeFormatter => {
	// Create a copy of the object, to make sure we are not altering it
	const mergedOptions = { ...DEFAULTS, ...options };
	// Create the formatter object/api
	const formatter = {
		format: (date: Date) => formatRelativeTime(date, mergedOptions, unit, now),
		short: () => {
			mergedOptions.style = 'short';
			return formatter;
		},
		narrow: () => {
			mergedOptions.style = 'narrow';
			return formatter;
		},
		numeric: () => {
			mergedOptions.numeric = 'always';
			return formatter;
		},
		numericAuto: () => {
			mergedOptions.numeric = 'auto';
			return formatter;
		},
		unit: (unit_: RelativeTimeFormatUnit) => {
			unit = unit_;
			return formatter;
		},
		unitAuto: () => formatter.unit(AUTO_UNIT),
		locale: (locale_: RelativeTimeLocale) => {
			mergedOptions.locale = locale_;
			return formatter;
		},
		userLocale: () => formatter.locale(USER_LOCALE),
		now: (now_: Maybe<Date>) => {
			now = now_;
			return formatter;
		}
	};
	return formatter;
};

/**
 * Returns the date as a relative time string, in the X unit ago format.
 * It uses the current locale, all the default options, and the auto unit.
 * @see relativeTime
 * @param date The reference date
 */
export const timeAgo = (date: Date) => relativeTime().format(date);
