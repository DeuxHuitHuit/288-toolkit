import type { AnonymousObject, PropertyStringPath } from '@288-toolkit/types';
import { loadTranslationFile } from '../createTranslationsLoader.js';
import { translate } from '../lib/translate.js';
import type { DataType, TranslateParams, Translation } from '../types/index.js';

export const createServerTranslate = async <
	TTranslationsObject extends AnonymousObject,
	const T extends Translation = Translation,
	Language extends keyof T['loaders'] = string
>(
	translation: Translation,
	language: Language
) => {
	const mod = await loadTranslationFile(translation, String(language));
	const translations = mod[String(language)] as TTranslationsObject;
	if (!translations) {
		throw new Error(
			`Missing translations for key "${translation.key}" and language "${String(language)}".`
		);
	}
	return <
		TReturnType extends DataType = string,
		TInferredOrString = TReturnType extends DataType ? TReturnType : string
	>(
		path: PropertyStringPath<TTranslationsObject>,
		data: TranslateParams = {}
	): TInferredOrString => {
		return translate<TTranslationsObject, TReturnType, TInferredOrString>(
			translations,
			path,
			data
		);
	};
};
