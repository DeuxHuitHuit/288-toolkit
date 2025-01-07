/**
 * Converts a string into a Date object. If the string is a Date object, it
 * returns a new Date object with the same time. If the string is not a valid date, it returns null.
 *
 * @param date The string or Date object to parse.
 * @returns A Date object or null if the string is not a valid date.
 */
export const parseDateTime = (date: string | Date) => {
	if (!date) {
		return null;
	}

	if (date instanceof Date) {
		if (isNaN(date.getTime())) {
			return null;
		}

		return new Date(date);
	}

	const parsedDate = new Date(date);

	if (isNaN(parsedDate.getTime())) {
		return null;
	}

	return parsedDate;
};
