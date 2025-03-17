/**
 * Get the language from the request
 *
 * @deprecated Use the values from your locals object instead.
 * Use the `@88-toolkit/hooks/server/site-uri#createSiteUri()` handle to set
 * the `uri` property in the locals object.
 * You can also check the `acceptedLanguage` function to get the language from the request's headers.
 */
export declare const getLangFromRequest: <Language extends string>(request: Request, { supportedLanguages, defaultLanguage }: {
    supportedLanguages: Language[];
    defaultLanguage: Language;
}) => Language;
