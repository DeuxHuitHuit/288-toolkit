/**@docs
 * This modules offers function to convert a name to initials.
 * It also offers a function to get the proper font size for the initials.
 */

/**
 * Convert a name to initials.
 * @param name The name to convert.
 * @param max The maximum length of the initials.
 */
export const initials = (name: string, max = Infinity) => {
	if (!name?.trim()) {
		return '';
	}
	return (
		name
			// Remove groups
			.replace(/(\(.*\))/gi, ' ')
			.replace(/(\[.*\])/gi, ' ')
			.replace(/(".*")/gi, ' ')
			// name can be splitted by space or dash
			.split(/[\s-]+/)
			// get the first letter of each part
			.map((part) => {
				// Remove remaining special characters, then get first character
				return part.replace(/[()[\]-_*@'"\s.,!?]+/gi, '').charAt(0);
			})
			// remove empty strings and holes
			.filter(Boolean)
			// join the letters together
			.join('')
			// make those letters uppercase
			.toUpperCase()
			// limit the length of the string
			.substring(0, max)
	);
};

/**
 * Get the proper font size for the initials.
 * The font sizes are based on the length of the initials.
 * If the initials are longer than the font sizes, the last font size is used.
 * @param initials The initials to get the font size for.
 * @param fontSizes The font sizes to use.
 */
export const fontSizeFromInitials = (initials: string, fontSizes: readonly string[]) => {
	const properFontSize = fontSizes[initials?.length || 0];
	return properFontSize || fontSizes[fontSizes.length - 1];
};

/**
 * Formats initials by joining them with a string.
 * @param initials The initials to format.
 * @param join The string to join the initials with.
 */
export const formatInitials = (initials: string, join: string) => {
	if (!initials?.trim()) {
		return '';
	}
	return (initials.split('').join(join) + join).trimEnd();
};
