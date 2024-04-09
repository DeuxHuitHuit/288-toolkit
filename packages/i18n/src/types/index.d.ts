import type { createTranslate } from '../translations/client/createTranslate';

export type Locale = `${string}-${string}`;
export type Language = string;
export type Region = string;

export type LangInfo<Locales extends readonly Locale[] = string[]> = {
	locale: Locales[number];
	language: Locales[number] extends `${infer Lang}-${infer _}` ? Lang : string;
	region: Locales[number] extends `${_}-${infer Region}` ? Region : string;
};

export type TranslateFunction<T extends AnonymousObject> = ReturnType<typeof createTranslate<T>>;
