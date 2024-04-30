import type { Translation } from '@288-toolkit/i18n/types';
import { key } from '.';

export const videoEmbed: Translation = {
	key,
	loaders: {
		en: () => import('./en'),
		fr: () => import('./fr')
	}
};
