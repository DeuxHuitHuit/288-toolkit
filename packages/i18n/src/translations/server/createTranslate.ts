import { getTranslationKey } from 'packages/i18n/src/translations/getTranslationKey';
import { loadTranslations } from 'packages/i18n/src/translations/server/loadTranslations';
import { translate } from 'packages/i18n/src/translations/translate';
import type { DataType, Language, TranslateParams } from 'packages/i18n/src/types';

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
