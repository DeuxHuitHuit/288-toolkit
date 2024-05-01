/**
 * Converts text to a valid HTML id.
 */
export const textToId = (text: string) => {
	if (!text?.trim()) {
		return '';
	}
	const id = text
		.toLowerCase()
		.replace(/[^-\s0-9a-zA-ZÀ-ÿ]/g, '-') // Replace non-word characters with dashes
		.replace(/-/g, ' ') // Replace dashes with spaces
		.replace(/\s{2,}/g, ' ') // Remove extra spaces
		.trim() // Trim start and end spaces
		.replace(/\s/g, '-'); // Replace spaces with dashes
	if (id.match(/^\d/)) {
		return `_${id}`;
	}
	return id;
};
