import { createTranslate } from '@288-toolkit/i18n/translations/client';
import type { Translation } from '@288-toolkit/i18n/types';

const key = 'relativeTime';

export const relativeTime: Translation = {
	key,
	loaders: {
		en: () => import('./en'),
		fr: () => import('./fr')
	}
};

export const t = createTranslate(key);
