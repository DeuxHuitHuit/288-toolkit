import type { SiteRouter } from '@288-toolkit/hooks/server';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { describe, expect, test } from 'vitest';
import { createI18nHandles } from '../src/server/createI18nHandles';

type TestLocals = App.Locals & {
	siteRouter: SiteRouter;
	locale?: `${string}-${string}`;
	language?: string;
	region?: string;
};

const supportedLocales = ['en-ca', 'fr-ca'] as const;
const defaultLocale = 'en-ca';

const defaultSiteRouter = (overrides: Partial<SiteRouter> = {}): SiteRouter => ({
	default: true,
	valid: true,
	parts: [],
	site: {
		uri: 'en',
		handle: 'en'
	},
	entry: {
		uri: '__home-page__'
	},
	...overrides
});

const createEvent = ({
	pathname = '/',
	acceptLanguage,
	siteRouter = defaultSiteRouter()
}: {
	pathname?: string;
	acceptLanguage?: string;
	siteRouter?: SiteRouter;
} = {}) => {
	const headers = new Headers();
	if (acceptLanguage) {
		headers.set('accept-language', acceptLanguage);
	}

	const locals = { siteRouter } as TestLocals;

	return {
		url: new URL(pathname, 'https://example.com'),
		request: new Request(new URL(pathname, 'https://example.com'), { headers }),
		locals
	} as unknown as RequestEvent & { locals: TestLocals };
};

const runHandle = async (handle: Handle, event: RequestEvent) => {
	await handle({
		event,
		resolve: async () => new Response('ok')
	});
	return event.locals as TestLocals;
};

describe('createI18nHandles', () => {
	describe('localeInfo', () => {
		test('uses Accept-Language when site router is in default mode', async () => {
			const { localeInfo } = createI18nHandles({
				supportedLocales,
				defaultLocale
			});
			const event = createEvent({ acceptLanguage: 'fr' });

			const locals = await runHandle(localeInfo, event);

			expect(locals.locale).toBe('fr-ca');
			expect(locals.language).toBe('fr');
			expect(locals.region).toBe('ca');
		});

		test('falls back to defaultLocale when Accept-Language has no supported match', async () => {
			const { localeInfo } = createI18nHandles({
				supportedLocales,
				defaultLocale
			});
			const event = createEvent({ acceptLanguage: 'de' });

			const locals = await runHandle(localeInfo, event);

			expect(locals.locale).toBe('en-ca');
			expect(locals.language).toBe('en');
			expect(locals.region).toBe('ca');
		});

		test('prefers site router locale over Accept-Language when not default', async () => {
			const { localeInfo } = createI18nHandles({
				supportedLocales,
				defaultLocale
			});
			const event = createEvent({
				acceptLanguage: 'en',
				siteRouter: defaultSiteRouter({
					default: undefined,
					parts: ['fr-ca'],
					site: { uri: 'fr-ca', handle: 'fr-ca' }
				})
			});

			const locals = await runHandle(localeInfo, event);

			expect(locals.locale).toBe('fr-ca');
			expect(locals.language).toBe('fr');
		});

		test('supportedLocale override wins over Accept-Language in default mode', async () => {
			const { localeInfo } = createI18nHandles({
				supportedLocales,
				defaultLocale,
				supportedLocale: () => 'fr-ca'
			});
			const event = createEvent({ acceptLanguage: 'en' });

			const locals = await runHandle(localeInfo, event);

			expect(locals.locale).toBe('fr-ca');
			expect(locals.language).toBe('fr');
		});

		test('site router locale wins over supportedLocale override', async () => {
			const { localeInfo } = createI18nHandles({
				supportedLocales,
				defaultLocale,
				supportedLocale: () => 'fr-ca'
			});
			const event = createEvent({
				siteRouter: defaultSiteRouter({
					default: undefined,
					parts: ['en-ca'],
					site: { uri: 'en-ca', handle: 'en-ca' }
				})
			});

			const locals = await runHandle(localeInfo, event);

			expect(locals.locale).toBe('en-ca');
			expect(locals.language).toBe('en');
		});
	});

	describe('langInfo', () => {
		test('uses Accept-Language when site router is in default mode', async () => {
			const { langInfo } = createI18nHandles({
				supportedLocales,
				defaultLocale
			});
			const event = createEvent({ acceptLanguage: 'fr' });

			const locals = await runHandle(langInfo, event);

			expect(locals.language).toBe('fr');
			expect(locals.locale).toBe('fr-ca');
			expect(locals.region).toBe('ca');
		});

		test('prefers site router language over Accept-Language when not default', async () => {
			const { langInfo } = createI18nHandles({
				supportedLocales,
				defaultLocale
			});
			const event = createEvent({
				acceptLanguage: 'en',
				siteRouter: defaultSiteRouter({
					default: undefined,
					parts: ['fr'],
					site: { uri: 'fr', handle: 'fr' }
				})
			});

			const locals = await runHandle(langInfo, event);

			expect(locals.language).toBe('fr');
			expect(locals.locale).toBe('fr-ca');
		});

		test('supportedLanguage override wins over Accept-Language in default mode', async () => {
			const { langInfo } = createI18nHandles({
				supportedLocales,
				defaultLocale,
				supportedLanguage: () => 'fr'
			});
			const event = createEvent({ acceptLanguage: 'en' });

			const locals = await runHandle(langInfo, event);

			expect(locals.language).toBe('fr');
			expect(locals.locale).toBe('fr-ca');
		});

		test('site router language wins over supportedLanguage override', async () => {
			const { langInfo } = createI18nHandles({
				supportedLocales,
				defaultLocale,
				supportedLanguage: () => 'fr'
			});
			const event = createEvent({
				siteRouter: defaultSiteRouter({
					default: undefined,
					parts: ['en'],
					site: { uri: 'en', handle: 'en' }
				})
			});

			const locals = await runHandle(langInfo, event);

			expect(locals.language).toBe('en');
			expect(locals.locale).toBe('en-ca');
		});
	});

	describe('redirects', () => {
		test('localeRedirect sends root requests to the resolved locale', async () => {
			const { localeInfo, localeRedirect } = createI18nHandles({
				supportedLocales,
				defaultLocale
			});
			const event = createEvent({ acceptLanguage: 'fr' });
			await runHandle(localeInfo, event);

			const response = await localeRedirect({
				event,
				resolve: async () => new Response('ok')
			});

			expect(response.status).toBe(303);
			expect(response.headers.get('location')).toBe('/fr-ca');
		});

		test('langRedirect sends root requests to the resolved language', async () => {
			const { langInfo, langRedirect } = createI18nHandles({
				supportedLocales,
				defaultLocale
			});
			const event = createEvent({ acceptLanguage: 'fr' });
			await runHandle(langInfo, event);

			const response = await langRedirect({
				event,
				resolve: async () => new Response('ok')
			});

			expect(response.status).toBe(303);
			expect(response.headers.get('location')).toBe('/fr');
		});
	});
});
