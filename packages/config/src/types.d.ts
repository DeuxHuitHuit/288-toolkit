import { TimeZone } from '@288-toolkit/types/timezones';

/**
 * Types we allow in translations
 */
export type DataType = string | number | boolean | object | DataType[];

/**
 * The "root" type for a specific translation
 */
export type DataRoot = Record<string, DataType>;

export type Locale = `${string}-${string}`;

export type Translation = {
	key: string;
	loaders: Record<string, () => Promise<DataRoot>>;
};

export type Config<T extends readonly Locale[] = readonly Locale[]> = {
	/**
	 * An array of locales supported by the project
	 */
	supportedLocales: T;
	/**
	 * The default locale for the project
	 */
	defaultLocale: T[number];
	/**
	 * The translations for the project
	 */
	translations: Translation[];
	/**
	 * The start of the day in hours
	 */
	startOfDay: number;
	/**
	 * The default timezone for the project
	 */
	timezone: TimeZone;
};
