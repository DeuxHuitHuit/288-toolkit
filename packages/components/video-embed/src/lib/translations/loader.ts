import type { Translation } from '@288-toolkit/i18n/types';
import { key } from './index.js';

export const videoEmbed: Translation = {
	key,
	loaders: {
		en: () => import('./en.js'),
		fr: () => import('./fr.js')
	}
};