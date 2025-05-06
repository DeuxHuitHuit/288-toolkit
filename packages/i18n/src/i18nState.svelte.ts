import type { AnonymousObject } from '@288-toolkit/types';
import type { Locale } from './types/index.js';

class I18nState {
	currentLocale = $state<Locale>();
	currentTranslations = $state<Record<string, AnonymousObject>>({});

	addTranslations(translations: Record<string, AnonymousObject>) {
		this.currentTranslations = {
			...this.currentTranslations,
			...translations
		};
	}
}

export const i18nState = new I18nState();
