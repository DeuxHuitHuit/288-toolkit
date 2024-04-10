import type { createTranslate } from '../translations/client/createTranslate';

/**
 * Types we allow in translations
 */
export type DataType = string | number | boolean | object | DataType[];

/**
 * The "root" type for a specific translation
 */
export type DataRoot = Record<string, DataType>;

/**
 * The params for the translate function
 */
export type TranslateParams = {
	count?: number;
	ordinal?: boolean;
	[key: string]: string | number | boolean;
};

export type Locale = `${string}-${string}`;
export type Language = string;
export type Region = string;

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

export type Translation = {
	key: string;
	loaders: Record<string, () => Promise<DataRoot>>;
};

export type Config = {
	translations: Translation[];
};
