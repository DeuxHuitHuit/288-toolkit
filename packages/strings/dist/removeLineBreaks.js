/**
 * Removes line breaks from a string.
 */
export const removeLineBreaks = (text) => {
    return text.replace(/\r|\n|\t/g, '');
};
