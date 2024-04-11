import type { AnonymousObject, PropertyStringPath } from '@288-toolkit/types';
import type { DataType, TranslateParams, Translation } from '../../types';
import { translate } from '../translate';
import { loadTranslationFile } from './createTranslationsLoader';

export const createTranslate = async <TTranslationsObject extends AnonymousObject>(
	translation: Translation,
	language: string
) => {
	const mod = await loadTranslationFile(translation, language);
	const translations = mod[language] as TTranslationsObject;
	if (!translations) {
		throw new Error(
			`Missing translations for key "${translation.key}" and language "${language}".`
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
