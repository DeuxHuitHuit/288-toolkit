import type { Config, Language } from '../../types';
import { getTranslationKey } from '../getTranslationKey';

const getConfig = async () => {
	try {
		// @ts-expect-error - This path is resolved at runtime.
		const { config } = await import('/src/translations.ts');
		return config as Config;
	} catch (error) {
		throw new Error(
			'Missing translations config. You must first load the translations you want to use.'
		);
	}
};

/**
 * Dynamically imports translations objects.
 *
 * @returns An object containing a unique key prefixed for each translation object.
 */
export const loadTranslations = async (keys: string[], language: Language) => {
	const config = await getConfig();
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
