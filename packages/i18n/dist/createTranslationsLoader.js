import { localeToLanguage } from './localeTo.js';
import { currentLocale } from './stores/currentLocale.js';
import { currentTranslations } from './stores/currentTranslations.js';
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
    return async (keys, locale) => {
        const modules = await Promise.all(keys.map(async (key) => {
            const translation = translations.find((t) => t.key === key);
            if (!translation) {
                throw new Error(`Missing translations for key "${key}".`);
            }
            const language = localeToLanguage(locale);
            const mod = await loadTranslationFile(translation, language);
            const messages = mod[language];
            if (!messages) {
                throw new Error(`Missing translations for key "${translation.key}" and language "${language}".`);
            }
            return {
                key,
                messages
            };
        }));
        currentLocale.set(locale);
        currentTranslations.update((current) => {
            return {
                ...current,
                ...modules.reduce((obj, { key, messages }) => {
                    obj[key] = messages;
                    return obj;
                }, {})
            };
        });
    };
};
