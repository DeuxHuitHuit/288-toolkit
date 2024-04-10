import { getConfig } from '@288-toolkit/config';
import { getTranslationKey } from '../getTranslationKey';

/**
 * Dynamically imports translations objects.
 * @returns An object containing a unique key prefixed for each translation object.
 */
export const loadTranslations = async (keys: string[], language: string) => {
	const config = getConfig();
	const modules = await Promise.all(
		keys.map(async (key) => {
			// const mod = await import(/* @vite-ignore */ `${path}/${lang}.ts`);
			const translation = config.translations.find((t) => t.key === key);
			if (!translation) {
				throw new Error(`Missing translations for key "${key}".`);
			}
			const mod = await translation.loaders[language]();
			return {
				key,
				messages: mod[language]
			};
		})
	);
	return modules.reduce((obj, { key, messages }) => {
		obj[getTranslationKey(key)] = messages;
		return obj;
	}, {});
};
