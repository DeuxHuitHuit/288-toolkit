import type { Translation } from './types';
export declare const loadTranslationFile: (translation: Translation, language: string) => Promise<import("./types").DataRoot>;
type KeysAsStrings<T extends Record<string | number | symbol, unknown>> = keyof T extends string ? keyof T : never;
/**
 * Creates a function that can dynamically import translations objects.
 */
export declare const createTranslationsLoader: <const T extends Translation[], Keys extends string = T[number]["key"], TLanguage extends string = KeysAsStrings<T[number]["loaders"]>, TLocale extends `${string}-${string}` = `${TLanguage}-${string}`>(translations: T) => (keys: Keys[], locale: TLocale) => Promise<void>;
export {};
