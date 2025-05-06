import type { AnonymousObject, PropertyStringPath } from '@288-toolkit/types';
import { DEV } from 'esm-env';
import { i18nState } from './i18nState.svelte.js';
import { translate } from './lib/translate.js';
import type { DataType, TranslateParams, Translation } from './types/index.js';

export const createTranslate = <TTranslationsObject extends AnonymousObject>(
	translationKey: Translation['key']
) => {
	return <
		TReturnType extends DataType = string,
		TInferredOrString = TReturnType extends DataType ? TReturnType : string
	>(
		path: PropertyStringPath<TTranslationsObject>,
		data: TranslateParams = {}
	): TInferredOrString => {
		const translations = i18nState.currentTranslations[translationKey] as TTranslationsObject;
		if (!translations) {
			if (DEV) {
				throw new Error(
					`Missing translations for path "${translationKey}". You must first load the translations you want to use.`
				);
			}
			return path as TInferredOrString;
		}
		return translate<TTranslationsObject, TReturnType, TInferredOrString>(
			translations,
			path,
			data
		);
	};
};
