import type { DatePartString } from './types.js';

/**
 * Converts a date, in the yyyy-mm-dd format, into a Date object, in the user's
 * timezone, at midnight.
 * @see https://stackoverflow.com/questions/32769076/why-does-javascript-getdate-sometimes-return-the-previous-date
 * @param date The string representing the date, in the yyyy-mm-dd format.
 */
export const parseLocalDate = (date: DatePartString) => {
	return new Date(`${date}T00:00:00.000`);
};
