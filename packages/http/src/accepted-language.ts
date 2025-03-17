import { parseAcceptLanguage } from './parseAcceptLanguage.js';

export type AcceptedLanguageParams<Language extends string> = {
	supportedLanguages: Readonly<Language[]>;
	defaultLanguage: Language;
};

/**
 * Get the supported language from the request's headers.
 * @see parseAcceptLanguage()
 *
 * @param request The request object.
 * @param params The parameters.
 */
export const acceptedLanguage = <Language extends string>(
	request: Request,
	{ supportedLanguages, defaultLanguage }: AcceptedLanguageParams<Language>
) => {
	// Extract and parse the accept-language header
	const acceptLanguage = request.headers.get('accept-language');
	if (acceptLanguage) {
		const languages = parseAcceptLanguage(acceptLanguage)
			?.filter(({ lang }) => supportedLanguages.includes(lang as Language))
			.map(({ lang }) => lang);
		// If there is matches, return the first one
		if (languages?.length) {
			return languages[0] as Language;
		}
	}

	return defaultLanguage;
};
