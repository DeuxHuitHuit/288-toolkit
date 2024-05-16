import type { AnonymousObject, PropertyStringPath } from '@288-toolkit/types';
import { BROWSER, DEV } from 'esm-env';
import { get } from 'svelte/store';
import { translate } from './lib/translate.js';
import { currentTranslations } from './stores/currentTranslations.js';
import type { DataType, TranslateParams, Translation } from './types/index.js';

export const createTranslate = <TTranslationsObject extends AnonymousObject>(
	translationKey: Translation['key']
) => {
	let translations: TTranslationsObject | undefined;
	return <
		TReturnType extends DataType = string,
		TInferredOrString = TReturnType extends DataType ? TReturnType : string
	>(
		path: PropertyStringPath<TTranslationsObject>,
		data: TranslateParams = {}
	): TInferredOrString => {
		if (!BROWSER || !translations) {
			translations = get(currentTranslations)[translationKey] as TTranslationsObject;
		}
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
