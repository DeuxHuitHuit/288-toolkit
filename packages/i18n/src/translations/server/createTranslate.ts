import { DataType } from '@288-toolkit/config/types';
import type { AnonymousObject, PropertyStringPath } from '@288-toolkit/types';
import type { TranslateParams } from '../../types';
import { getTranslationKey } from '../getTranslationKey';
import { translate } from '../translate';
import { loadTranslations } from './loadTranslations';

export const createTranslate = async <TTranslationsObject extends AnonymousObject>(
	path: string,
	lang: string
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
