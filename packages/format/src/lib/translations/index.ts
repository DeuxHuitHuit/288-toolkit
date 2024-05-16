import type { Translation } from '@288-toolkit/i18n/types';
import { key as key_duration } from './duration/index.js';
import { key as key_filesize } from './filesize/index.js';
import { key as key_relativeTime } from './relativeTime/index.js';

export const duration = {
	key: key_duration,
	loaders: {
		en: () => import('./duration/en.js'),
		fr: () => import('./duration/fr.js')
	}
} as const satisfies Translation;

export const filesize = {
	key: key_filesize,
	loaders: {
		en: () => import('./filesize/en.js'),
		fr: () => import('./filesize/fr.js')
	}
} as const satisfies Translation;

export const relativeTime = {
	key: key_relativeTime,
	loaders: {
		en: () => import('./relativeTime/en.js'),
		fr: () => import('./relativeTime/fr.js')
	}
} as const satisfies Translation;
