import { BROWSER, DEV } from 'esm-env';
import { get } from 'svelte/store';
import { translate } from './lib/translate.js';
import { currentTranslations } from './stores/currentTranslations.js';
export const createTranslate = (translationKey) => {
    let translations;
    return (path, data = {}) => {
        if (!BROWSER || !translations) {
            translations = get(currentTranslations)[translationKey];
        }
        if (!translations) {
            if (DEV) {
                throw new Error(`Missing translations for path "${translationKey}". You must first load the translations you want to use.`);
            }
            return path;
        }
        return translate(translations, path, data);
    };
};
