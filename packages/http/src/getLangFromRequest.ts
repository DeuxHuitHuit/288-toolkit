import { acceptedLanguage } from "./accepted-language.js";

/**
 * Get the language from the request
 *
 * @deprecated Use the values from your locals object instead.
 * Use the `@88-toolkit/hooks/server/site-uri#createSiteUri()` handle to set
 * the `uri` property in the locals object.
 * You can also check the `acceptedLanguage` function to get the language from the request's headers.
 */
export const getLangFromRequest = <Language extends string>(
	request: Request,
	{
		supportedLanguages,
		defaultLanguage
	}: { supportedLanguages: Language[]; defaultLanguage: Language }
): Language => {
	// Check request path first
	const url = new URL(request.url);
	const pathLang = url.pathname.split('/')[1] as Language;
	if (pathLang && supportedLanguages.includes(pathLang)) {
		return pathLang;
	}

	// Check user-agent accepted languages next, with fallback to default language
	return acceptedLanguage(request, {
		supportedLanguages,
		defaultLanguage
	});
};
/* @enddeprecated */
