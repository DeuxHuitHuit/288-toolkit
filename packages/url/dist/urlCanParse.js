/**
 * Checks if a URL can be parsed.
 * This is a fallback for environments that don't support the `URL.canParse` method.
 */
export const urlCanParse = (url) => {
    if (URL.canParse) {
        return URL.canParse(url);
    }
    try {
        new URL(url);
        return true;
    }
    catch (error) {
        return false;
    }
};
