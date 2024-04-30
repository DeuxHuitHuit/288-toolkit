import type { Translation } from '@288-toolkit/i18n/types';
import { key } from '.';

export const pagination: Translation = {
	key,
	loaders: {
		en: () => import('./en'),
		fr: () => import('./fr')
	}
};
