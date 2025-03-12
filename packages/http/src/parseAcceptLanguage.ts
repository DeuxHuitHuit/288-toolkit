// from: https://github.com/DeuxHuitHuit/flang_redirection/blob/a27c6c3d63314c16ffbae68079e4c4ebf1ab4896/events/event.flang_redirect.php#L229

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
export const parseAcceptLanguage = (al: string): Maybe<AcceptLanguageEntry[]> => {
	al = al?.trim();

	if (!al) {
		return null;
	}

	const matches = al
		// Remove all spaces
		.replace(/\s/g, '')
		// Match all language entries, in the form XX-xx,YY;q=0.1
		.matchAll(/(\w+(?:-\w+)?,?)+(?:;q=(?:\d+\.\d+)?)?/gi);

	let priority = 1.0;
	return Array.from(matches)
		.flatMap((match) => {
			// Split langs from priority (q)
			const [langs, q] = match[0].split(';q=', 2);

			if (!langs) {
				return null;
			}

			// Set proper priority, if defined. If not, use the current priority
			if (q) {
				priority = parseFloat(q) || priority;
			}

			// Split each value in this langs string
			return langs.split(',').map((lang) => {
				const result = {
					lang,
					priority
				};
				// Decrease current priority a tiny bit for each locale
				priority -= 0.000000001;
				return result;
			});
		})
		.filter((x) => !!x)
		.sort((a: AcceptLanguageEntry, b: AcceptLanguageEntry) => b.priority - a.priority);
};
