import { createSiteRouter } from '@288-toolkit/hooks/server';
import { createI18nHandles } from '@288-toolkit/i18n/server';
import { sequence } from '@sveltejs/kit/hooks';

const siteRouter = createSiteRouter({
	defaultSiteUri: 'en',
	defaultEntryUri: '__home-page__',
	validSiteHandles: ['en', 'fr']
});

const { langAttribute, langInfo, langRedirect } = createI18nHandles({
	defaultLocale: 'en-CA',
	supportedLocales: ['en-CA', 'fr-CA']
});

export const handle = sequence(siteRouter, langInfo, langRedirect, langAttribute);
