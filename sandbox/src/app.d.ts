import type { SiteRouter } from '@288-toolkit/hooks/server';
import type { I18nInfo } from '@288-toolkit/i18n';

type SupportedLanguages = 'en-CA' | 'fr-CA';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals extends I18nInfo<SupportedLanguages> {
			siteRouter: SiteRouter;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
