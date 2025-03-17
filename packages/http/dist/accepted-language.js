import { parseAcceptLanguage } from './parseAcceptLanguage.js';
/**
 * Get the supported language from the request's headers.
 * @see parseAcceptLanguage()
 *
 * @param request The request object.
 * @param params The parameters.
 */
export const acceptedLanguage = (request, { supportedLanguages, defaultLanguage }) => {
    // Extract and parse the accept-language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
        const languages = parseAcceptLanguage(acceptLanguage)
            ?.filter(({ lang }) => supportedLanguages.includes(lang))
            .map(({ lang }) => lang);
        // If there is matches, return the first one
        if (languages?.length) {
            return languages[0];
        }
    }
    return defaultLanguage;
};
