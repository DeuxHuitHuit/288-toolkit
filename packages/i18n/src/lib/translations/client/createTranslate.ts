import { page } from '$app/stores';
import type { AnonymousObject, PropertyStringPath } from '@288-toolkit/types';
import { BROWSER, DEV } from 'esm-env';
import { get } from 'svelte/store';
import type { DataType, TranslateParams, Translation } from '../../types';
import { getTranslationKey } from '../getTranslationKey.js';
import { translate } from '../translate.js';

export const createTranslate = <TTranslationsObject extends AnonymousObject>(
	translationKey: Translation['key']
) => {
	let currentTranslations: TTranslationsObject;

	return <
		TReturnType extends DataType = string,
		TInferredOrString = TReturnType extends DataType ? TReturnType : string
	>(
		path: PropertyStringPath<TTranslationsObject>,
		data: TranslateParams = {}
	): TInferredOrString => {
		// Cache translations when in browser env, but always load them on the server
		if (!BROWSER || !currentTranslations) {
			currentTranslations = get(page).data[
				getTranslationKey(translationKey)
			] as TTranslationsObject;
		}
		// Bail out if nothing is found
		if (!currentTranslations) {
			if (DEV && BROWSER) {
				throw new Error(
					`Missing translations for path "${translationKey}". You must first load the translations you want to use.`
				);
			}
			return path as TInferredOrString;
		}
		return translate<TTranslationsObject, TReturnType, TInferredOrString>(
			currentTranslations,
			path,
			data
		);
	};
};
