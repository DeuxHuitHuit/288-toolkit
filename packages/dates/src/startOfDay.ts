/**@docs
 * Start of day in a timezone
 */

import type { TimeZone } from '@288-toolkit/types/timezones';

export type StartOfDayOptions = {
	hourOfStartOfDay: number;
	timeZone: TimeZone;
};

const DEFAULTS = {
	hourOfStartOfDay: 0,
	timeZone: 'UTC'
} as const satisfies StartOfDayOptions;

const createFormatter = (timeZone: TimeZone) => {
	try {
		return new Intl.DateTimeFormat('en-US', {
			timeZone,
			hourCycle: 'h23',
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		});
	} catch (e) {
		console.error(e);
	}
	return createFormatter('UTC');
};

/**
 * Returns the wall clock time of `time` in the formatter's timezone, expressed as
 * if that wall clock time was in UTC.
 */
const wallTime = (formatter: Intl.DateTimeFormat, time: number) => {
	const parts: Record<string, number> = {};
	for (const { type, value } of formatter.formatToParts(time)) {
		parts[type] = parseInt(value, 10);
	}
	return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
};

const offsetAt = (formatter: Intl.DateTimeFormat, time: number) => {
	return wallTime(formatter, time) - Math.floor(time / 1000) * 1000;
};

/**
 * Returns the instant at which the day of `date`, as seen in `options.timeZone`, starts.
 *
 * Unlike `today()`, which uses the *user's* current day of month, this function only
 * relies on the absolute time of `date` (`getTime()`), so the result does not depend on
 * the timezone of the runtime. This is useful to group or filter events by their day,
 * in the events' timezone.
 *
 * Example: an event on August 9th 2025 at 20:25 in Toronto is stored as
 * 2025-08-10T00:25:00.000Z. `startOfDay(event, { timeZone: 'America/Toronto' })`
 * returns 2025-08-09T04:00:00.000Z, regardless of where the code runs.
 *
 * Use `options.timeZone` to specify the timezone in which the day is computed.
 * It defaults to `UTC`. An invalid timezone falls back to `UTC`.
 *
 * Use `options.hourOfStartOfDay` to specify the hour of the start of day in that timezone.
 *
 * **Pros**
 *  - Deals with DST and other timezone changes, using the offset in effect at the start of the day.
 *  - Works with timezones offset by 30 or 45 minutes.
 *  - If the start of day does not exist (DST gap), the first instant after the gap is returned.
 *
 * @param date The date to get the start of day of.
 * @param options Options for the function.
 */
export const startOfDay = (
	date: { getTime: () => number },
	options: Partial<StartOfDayOptions> = {}
) => {
	const { hourOfStartOfDay, timeZone } = { ...DEFAULTS, ...options };
	const time = date.getTime();
	if (isNaN(time)) {
		return new Date(NaN);
	}
	const formatter = createFormatter(timeZone);
	const day = new Date(wallTime(formatter, time));
	const target = Date.UTC(
		day.getUTCFullYear(),
		day.getUTCMonth(),
		day.getUTCDate(),
		hourOfStartOfDay
	);
	// The offset at the target wall time is unknown until we know the instant, so refine once.
	// Both candidates are invalid only when the target falls in a DST gap.
	const first = target - offsetAt(formatter, target);
	const second = target - offsetAt(formatter, first);
	const valid = [first, second].filter((c) => wallTime(formatter, c) === target);
	return new Date(valid.length ? Math.min(...valid) : Math.max(first, second));
};
