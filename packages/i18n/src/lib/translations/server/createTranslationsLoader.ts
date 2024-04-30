import type { Translation } from '../../types';
import { getTranslationKey } from '../getTranslationKey';

export const loadTranslationFile = async (translation: Translation, language: string) => {
	return translation.loaders[language]();
};

/**
 * Creates a function that can dynamically import translations objects.
 */
export const createTranslationsLoader = <
	const T extends Translation[],
	Keys extends T[number]['key'],
	Language extends keyof T[number]['loaders'] = string
>(
	translations: T
) => {
	/**
	 * @returns an object containing a unique key prefixed for each translation object.
	 */
	return async (keys: Keys[], language: Language) => {
		const modules = await Promise.all(
			keys.map(async (key) => {
				const translation = translations.find((t) => t.key === key);
				if (!translation) {
					throw new Error(`Missing translations for key "${key}".`);
				}
				const mod = await loadTranslationFile(translation, String(language));
				const messages = mod[String(language)];
				if (!messages) {
					throw new Error(
						`Missing translations for key "${translation.key}" and language "${String(language)}".`
					);
				}
				return {
					key,
					messages
				};
			})
		);
		return modules.reduce((obj, { key, messages }) => {
			obj[getTranslationKey(key)] = messages;
			return obj;
		}, {});
	};
};
