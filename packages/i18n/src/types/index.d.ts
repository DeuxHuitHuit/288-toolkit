export type Locale = `${string}-${string}`;
export type Language = string;
export type Region = string;

export type LangInfo = {
	locale: Locale;
	language: string;
	region: string;
};
