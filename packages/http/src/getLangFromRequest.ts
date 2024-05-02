import { parseAcceptLanguage } from './parseAcceptLanguage.js';

/**
 * Get the language from the request
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

	// Check user-agent accepted languages next
	const acceptLanguage = request.headers.get('accept-language');
	if (acceptLanguage) {
		const languages = parseAcceptLanguage(acceptLanguage)
			?.filter(({ lang }) => supportedLanguages.includes(lang as Language))
			.map(({ lang }) => lang);
		// If there is a match, return it
		if (languages?.length) {
			return languages[0] as Language;
		}
	}

	// Fallback to default language
	return defaultLanguage;
};
