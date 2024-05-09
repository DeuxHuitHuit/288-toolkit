import { page } from '$app/stores';
import { BROWSER, DEV } from 'esm-env';
import { get } from 'svelte/store';
import { getTranslationKey } from '../getTranslationKey.js';
import { translate } from '../translate.js';
export const createTranslate = (translationKey) => {
    let currentTranslations;
    return (path, data = {}) => {
        // Cache translations when in browser env, but always load them on the server
        if (!BROWSER || !currentTranslations) {
            currentTranslations = get(page).data[getTranslationKey(translationKey)];
        }
        // Bail out if nothing is found
        if (!currentTranslations) {
            if (DEV && BROWSER) {
                throw new Error(`Missing translations for path "${translationKey}". You must first load the translations you want to use.`);
            }
            return path;
        }
        return translate(currentTranslations, path, data);
    };
};
