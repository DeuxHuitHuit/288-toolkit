import type { Translation } from '@288-toolkit/i18n/types';
import { key } from './index.js';

export const videoEmbed = {
	key,
	loaders: {
		en: () => import('./en.js'),
		fr: () => import('./fr.js')
	}
} as const satisfies Translation;
