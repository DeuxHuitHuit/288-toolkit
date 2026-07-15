import type { SiteRouter } from '@288-toolkit/hooks/server';
import type { I18nInfo } from '@288-toolkit/i18n';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals extends I18nInfo<typeof ['en-CA', 'fr-CA']> {
			siteRouter: SiteRouter;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
