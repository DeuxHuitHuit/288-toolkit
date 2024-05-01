/**@docs
 * Timezone aware day
 */
import type { TimeZone } from '@288-toolkit/types/timezones';
import type { DatePart } from './types.js';
export type TodayOptions = {
    now: DatePart;
    hourOfStartOfDay: number;
    timeZone: TimeZone;
};
/**
 * Returns the number of hours the timezone is offset from UTC.
 * @param now The date to use to check the timezone offset.
 * @param timeZone The timezone to get the offset for.
 */
export declare const computeTimezoneOffset: (now: DatePart, timeZone: TimeZone) => number;
/**
 * Converts the number of hours into the +0000 format.
 * @param offset the number of hours the timezone is offset from UTC
 */
export declare const formatTimezoneOffset: (offset: number) => string;
/**
 * Returns a date representing the user's current day of month, in the source
 * timezone at midnight.
 * This is useful for filtering events by the user's current day of month, since events
 * are mostly displayed in the event's timezone.
 * Simply setting "now" hours to 0 could result the wrong date being shown to the user if the
 * date of month is different in the user's timezone (it works "sometimes").
 *
 * Let's illustrate the problem with an example:
 * - The user is in Japan, which is 9 hours ahead of UTC.
 * - The source date is in Toronto, which is 4 or 5 hours behind UTC, depending on the time of year.
 * - Both dates are stored as UTC.
 * - Source dates are shown to ALL users in the source timezone.
 * - When it's June 2nd in Japan, it still can be June 1st in Toronto.
 * - To get the data in the future for a user, we need to filter by the user's current "today",
 *   which is June 2nd, but filter according to the source timezone, at midnight.
 *
 * Toronto (UTC-4)
 * 19 - 20 - 21 - 22 - 23 - 00 - 01 - 02 - 03 - 04 - 05 - 06 - 07 - 08 - 09 - 10 - 11 - 12 - 13 - 14
 * -----June 1st -------- | -- June 2nd ------------------------------------------------------------
 * UTC
 * 23 - 00 - 01 - 02 - 03 - 04 - 05 - 06 - 07 - 08 - 09 - 10 - 11 - 12 - 13 - 14 - 15 - 16 - 17 - 18
 * -- | ---------------------- June 2nd ------------------------------------------------------------
 * Japan (UTC+9)
 * 08 - 09 - 10 - 11 - 12 - 13 - 14 - 15 - 16 - 17 - 18 - 19 - 20 - 21 - 22 - 23 - 00 - 01 - 02 - 03
 * --------------------------- June 2nd  --------------------------------------- | - June 3rd 2023 -
 * ^^^ We are here, June 2nd, 8 o'clock in the morning in Japan.
 *
 * If now is 2023-06-02T08:00:00.000+0900, now is also:
 *  - 2023-06-01T23:00:00.000+0000 in UTC
 *  - 2023-06-01T19:00:00.000-0400 in Toronto
 *
 * Since it's June 2nd for the user, we need to filter for events that starts after
 * 2023-06-02T00:00:00.000-0400 which is:
 *  - 2023-06-02T04:00:00.000+0000 in UTC
 *  - 2023-06-02T13:00:00.000+0900 in Japan
 *
 * Same thing applies to Vancouver with events in Paris.
 *
 * Paris (UTC+2)
 * 01 - 02 - 03 - 04 - 05 - 06 - 07 - 08 - 09 - 10 - 11 - 12 - 13 - 14 - 15 - 16 - 17 - 18 - 19 - 20
 * ------------------------------------------ June 2nd  --------------------------------------------
 * Vancouver (UTC-7)
 * 16 - 17 - 18 - 19 - 20 - 21 - 22 - 23 - 00 - 01 - 02 - 03 - 04 - 05 - 06 - 07 - 08 - 09 - 10 - 11
 * ----- June 1st ---------------------- | -- June 2nd ---------------------------------------------
 * ^^^ We are here, June 1st, 4pm in the afternoon in Vancouver.
 *
 * If now is 2023-06-01T16:00:00.000-0700, now is also:
 *  - 2023-06-01T23:00:00.000+0000 UTC
 *  - 2023-06-02T01:00:00.000+0200 in Paris
 *
 * Since it's June 1st for the user, we need to filter for events that starts after
 * 2023-06-01T00:00:00.000+0200
 *  - 2023-05-31T23:00:00.000+0000 in UTC
 *  - 2023-05-31T16:00:00.000-0700 in Vancouver
 *
 * Essentially, it's `${USER_YEAR}-${USER_MONTH}-${USER_DAY}T${START_OF_DAY}:00:00-${EVENT_OFFSET}`.
 *
 * Use `options.timeZone` to specify the source (the events) timezone.
 * It defaults to the `TIMEZONE` constant.
 *
 * Use `options.now` to specify the user's current day of month.
 *
 * Use `options.hourOfStartOfDay` to specify the hour of the start of day in the source timezone.
 * This is useful for late night events that start at 1am, for example.
 *
 * **Pros**
 *  - Deals with DST and other timezone changes.
 *
 * **Caveats**
 *  - Does not work *precisely* for timezones that are offset by 30 minutes.
 *  - Will ALWAYS use the user's timezone, regardless of its input.
 *
 * @param options Options for the function.
 */
export declare const today: (options?: Partial<TodayOptions>) => Date;
