import { AnonymousObject } from '@288-toolkit/types';
import type { createTranslate } from '../createTranslate';

export type Locale = `${string}-${string}`;

/**
 * The params for the translate function
 */
export type TranslateParams = {
	count?: number;
	ordinal?: boolean;
} & {
	[key: string]: string | number | boolean;
};

/**
 * The properties added in the event locals by the i18n handle.
 */
export type LangInfo<Locales extends readonly Locale[] = Locale[]> = {
	locale: Locales[number];
	language: Locales[number] extends `${infer Lang}-${infer _}` ? Lang : string;
	region: Locales[number] extends `${infer _}-${infer Region}` ? Region : string;
};

/**
 * The translate function returned from `createTranslate()`
 */
export type TranslateFunction<T extends AnonymousObject> = ReturnType<typeof createTranslate<T>>;

/**
 * Types we allow in translations
 */
export type DataType = string | number | boolean | object | DataType[];

/**
 * The "root" type for a specific translation
 */
export type DataRoot = Record<string, DataType>;

export type Loader = () => Promise<DataRoot>;

export type Translation = {
	key: string;
	loaders: {
		[lang: string]: Loader;
	};
};
