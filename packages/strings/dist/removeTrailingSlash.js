/**
 * Removes trailing slashes from a string.
 */
export const removeTrailingSlash = (str) => {
    if (!str) {
        return str;
    }
    return str.replace(/\/+$/, '');
};
