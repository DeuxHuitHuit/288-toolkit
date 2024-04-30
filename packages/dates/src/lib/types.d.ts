/**@docs
 * Types representing a date without a time.
 */

/**
 * The minimal date-like interface we need to represent a date without a time.
 */
export interface DatePart {
	getTime: () => number;
	getFullYear: () => number;
	getMonth: () => number;
	getDate: () => number;
}

/**
 * The string representation of a date without a time.
 */
export type DatePartString = `${number}-${number}-${number}`;
