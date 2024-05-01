/**
 * Removes line breaks from a string.
 */
export const removeLineBreaks = (text: string) => {
	return text.replace(/\r|\n|\t/g, '');
};
