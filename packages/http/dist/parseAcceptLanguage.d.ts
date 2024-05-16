import type { Maybe } from '@288-toolkit/types';
export type AcceptLanguageEntry = {
    lang: string;
    priority: number;
};
/**
 * Given a string of the form "en,fr;q=0.9,de;q=0.8" returns an array of AcceptLanguageEntry
 * ordered by priority. This is mostly used to parse the Accept-Language header.
 * @param al the string value of the Accept-Language header
 * @returns an array of AcceptLanguageEntry or null
 */
export declare const parseAcceptLanguage: (al: string) => Maybe<AcceptLanguageEntry[]>;
