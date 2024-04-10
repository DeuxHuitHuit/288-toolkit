declare module 'src/toolkit.config' {
	import type { Locale, Translation } from 'packages/i18n/src/types';

	export type Config<T extends readonly Locale[] = readonly Locale[]> = {
		supportedLocales: T;
		defaultLocale: T[number];
		translations: Translation[];
	};

	export const config: Config;
}
