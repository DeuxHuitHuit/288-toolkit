import { createI18nHandles } from '@288-toolkit/i18n/server';
import { sequence } from '@sveltejs/kit/hooks';

const { langAttribute, langInfo, langRedirect } = createI18nHandles({
	defaultLocale: 'en-CA',
	supportedLocales: ['en-CA', 'fr-CA']
});

export const handle = sequence(langInfo, langRedirect, langAttribute);
