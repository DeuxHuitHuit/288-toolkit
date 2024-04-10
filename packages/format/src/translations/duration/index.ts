import { createTranslate } from '@288-toolkit/i18n/translations/client';
import type { Translation } from '@288-toolkit/i18n/types';
import type { DurationTranslations } from './en';

const key = 'duration';

export const duration: Translation = {
	key,
	loaders: {
		en: () => import('./en'),
		fr: () => import('./fr')
	}
};

export const t = createTranslate<DurationTranslations>('duration');
