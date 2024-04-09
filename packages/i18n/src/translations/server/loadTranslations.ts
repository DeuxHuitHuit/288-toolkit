import type { Language } from '../../types';
import { getTranslationKey } from '../getTranslationKey';

/**
 * Dynamically imports translations objects.
 *
 * @returns An object containing a unique key prefixed for each translation object.
 */
export const loadTranslations = async (paths: string[], lang: Language) => {
	const modules = await Promise.all(
		paths.map(async (path) => {
			const mod = await import(/* @vite-ignore */ `${path}/${lang}.ts`);
			return {
				mod,
				path
			};
		})
	);
	return modules.reduce((obj, { mod, path }) => {
		obj[getTranslationKey(path)] = mod[lang];
		return obj;
	}, {});
};
