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
