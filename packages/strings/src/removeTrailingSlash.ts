/**
 * Removes trailing slashes from a string.
 */
export const removeTrailingSlash = (str: string) => {
	if (!str) {
		return str;
	}
	return str.replace(/\/+$/, '');
};
