import type { createTranslate } from '../translations/client/createTranslate';

/**
 * The params for the translate function
 */
export type TranslateParams = {
	count?: number;
	ordinal?: boolean;
	[key: string]: string | number | boolean;
};

/**
 * The properties added in the event locals by the i18n handle.
 */
export type LangInfo<Locales extends readonly Locale[] = string[]> = {
	locale: Locales[number];
	language: Locales[number] extends `${infer Lang}-${infer _}` ? Lang : string;
	region: Locales[number] extends `${_}-${infer Region}` ? Region : string;
};

/**
 * The translate function returned from `createTranslate()`
 */
export type TranslateFunction<T extends AnonymousObject> = ReturnType<typeof createTranslate<T>>;
