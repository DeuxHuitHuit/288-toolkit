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
export declare const acceptedLanguage: <Language extends string>(request: Request, { supportedLanguages, defaultLanguage }: AcceptedLanguageParams<Language>) => Language;
