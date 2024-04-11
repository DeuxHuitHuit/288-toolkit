import { TimeZone } from '@288-toolkit/types/timezones';

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
