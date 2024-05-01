import { translate } from '../translate';
import { loadTranslationFile } from './createTranslationsLoader.js';
export const createTranslate = async (translation, language) => {
    const mod = await loadTranslationFile(translation, String(language));
    const translations = mod[String(language)];
    if (!translations) {
        throw new Error(`Missing translations for key "${translation.key}" and language "${String(language)}".`);
    }
    return (path, data = {}) => {
        return translate(translations, path, data);
    };
};
