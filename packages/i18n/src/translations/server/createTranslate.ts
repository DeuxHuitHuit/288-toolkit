import type { DataType, Language, TranslateParams } from '../../types';
import { getTranslationKey } from '../getTranslationKey';
import { translate } from '../translate';
import { loadTranslations } from './loadTranslations';

export const createTranslate = async <TTranslationsObject extends AnonymousObject>(
	path: string,
	lang: Language
) => {
	const result = await loadTranslations([path], lang);
	const translations = result[getTranslationKey(path)];
	return <
		TReturnType extends DataType = string,
		TInferredOrString = TReturnType extends DataType ? TReturnType : string
	>(
		key: PropertyStringPath<TTranslationsObject>,
		data: TranslateParams = {}
	): TInferredOrString => {
		return translate<TTranslationsObject, TReturnType, TInferredOrString>(
			translations,
			key,
			data
		);
	};
};
