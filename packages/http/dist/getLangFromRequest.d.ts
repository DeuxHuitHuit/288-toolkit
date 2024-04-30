export declare const getLangFromRequest: <Language extends string>(request: Request, { supportedLanguages, defaultLanguage }: {
    supportedLanguages: Language[];
    defaultLanguage: Language;
}) => Language;
