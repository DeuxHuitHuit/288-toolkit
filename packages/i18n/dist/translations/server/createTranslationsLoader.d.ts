import type { Translation } from '../../types';
export declare const loadTranslationFile: (translation: Translation, language: string) => Promise<import("../../types").DataRoot>;
/**
 * Creates a function that can dynamically import translations objects.
 */
export declare const createTranslationsLoader: <const T extends Translation[], Keys extends T[number]["key"], Language extends keyof T[number]["loaders"] = string>(translations: T) => (keys: Keys[], language: Language) => Promise<{}>;
