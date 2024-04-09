import { page } from '$app/stores';
import { BROWSER, DEV } from 'esm-env';
import { get } from 'svelte/store';
import { getTranslationKey } from '../getTranslationKey';
import { translate } from '../translate';
import type { DataType, TranslateParams } from '../types';

export const createTranslate = <TTranslationsObject extends AnonymousObject>(path: string) => {
	let currentTranslations: TTranslationsObject;

	return <
		TReturnType extends DataType = string,
		TInferredOrString = TReturnType extends DataType ? TReturnType : string
	>(
		key: PropertyStringPath<TTranslationsObject>,
		data: TranslateParams = {}
	): TInferredOrString => {
		// Cache translations when in browser env, but always load them on the server
		if (!BROWSER || !currentTranslations) {
			currentTranslations = get(page).data[getTranslationKey(path)] as TTranslationsObject;
		}
		// Bail out if nothing is found
		if (!currentTranslations) {
			if (DEV && BROWSER) {
				throw new Error(
					`Missing translations for path "${path}". You must first load the translations you want to use.`
				);
			}
			return key as TInferredOrString;
		}
		return translate<TTranslationsObject, TReturnType, TInferredOrString>(
			currentTranslations,
			key,
			data
		);
	};
};
