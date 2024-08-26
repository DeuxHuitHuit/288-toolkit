/**
 * Validate if the URL is from the same origin as the request URL.
 * @param requestUrl The request URL.
 * @param urlToTest The URL to test.
 */
export const validateSameOrigin = (requestUrl, urlToTest) => {
    try {
        const validUrl = new URL(requestUrl);
        const url = new URL(urlToTest, validUrl.origin);
        return url.origin === validUrl.origin;
    }
    catch (error) {
        return false;
    }
};
