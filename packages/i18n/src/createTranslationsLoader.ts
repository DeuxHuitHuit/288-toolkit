import { i18nState } from './i18nState.svelte.js';
import { localeToLanguage } from './localeTo.js';
import type { Locale, Translation } from './types/index.js';

export const loadTranslationFile = async (translation: Translation, language: string) => {
	return translation.loaders[language]();
};

type KeysAsStrings<T extends Record<string | number | symbol, unknown>> = keyof T extends string
	? keyof T
	: never;

/**
 * Creates a function that can dynamically import translations objects.
 */
export const createTranslationsLoader = <
	const T extends Translation[],
	Keys extends string = T[number]['key'],
	TLanguage extends string = KeysAsStrings<T[number]['loaders']>,
	TLocale extends Locale = `${TLanguage}-${string}`
>(
	translations: T
) => {
	/**
	 * @returns an object containing a unique key prefixed for each translation object.
	 */
	return async (keys: Keys[], locale: TLocale) => {
		const modules = await Promise.all(
			keys.map(async (key) => {
				const translation = translations.find((t) => t.key === key);
				if (!translation) {
					throw new Error(`Missing translations for key "${key}".`);
				}
				const language = localeToLanguage(locale);
				const mod = await loadTranslationFile(translation, language);
				const messages = mod[language];
				if (!messages) {
					throw new Error(
						`Missing translations for key "${translation.key}" and language "${language}".`
					);
				}
				return {
					key,
					messages
				};
			})
		);
		i18nState.currentLocale = locale;
		i18nState.addTranslations(
			modules.reduce((obj, { key, messages }) => {
				obj[key as string] = messages;
				return obj;
			}, {})
		);
	};
};
