/**@docs
 * Start of day in a timezone
 */
import type { TimeZone } from '@288-toolkit/types/timezones';
export type StartOfDayOptions = {
    hourOfStartOfDay: number;
    timeZone: TimeZone;
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
export declare const startOfDay: (date: {
    getTime: () => number;
}, options?: Partial<StartOfDayOptions>) => Date;
