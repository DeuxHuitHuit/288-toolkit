import { getTranslationKey } from '../getTranslationKey';
export const loadTranslationFile = async (translation, language) => {
    return translation.loaders[language]();
};
/**
 * Creates a function that can dynamically import translations objects.
 */
export const createTranslationsLoader = (translations) => {
    /**
     * @returns an object containing a unique key prefixed for each translation object.
     */
    return async (keys, language) => {
        const modules = await Promise.all(keys.map(async (key) => {
            const translation = translations.find((t) => t.key === key);
            if (!translation) {
                throw new Error(`Missing translations for key "${key}".`);
            }
            const mod = await loadTranslationFile(translation, String(language));
            const messages = mod[String(language)];
            if (!messages) {
                throw new Error(`Missing translations for key "${translation.key}" and language "${String(language)}".`);
            }
            return {
                key,
                messages
            };
        }));
        return modules.reduce((obj, { key, messages }) => {
            obj[getTranslationKey(key)] = messages;
            return obj;
        }, {});
    };
};
