import type { Translation } from '@288-toolkit/i18n/types';
import { key as key_duration } from './duration';
import { key as key_filesize } from './filesize';
import { key as key_relativeTime } from './relativeTime';

export const duration: Translation = {
	key: key_duration,
	loaders: {
		en: () => import('./duration/en.ts'),
		fr: () => import('./duration/fr.ts')
	}
};

export const filesize: Translation = {
	key: key_filesize,
	loaders: {
		en: () => import('./filesize/en.ts'),
		fr: () => import('./filesize/fr.ts')
	}
};

export const relativeTime: Translation = {
	key: key_relativeTime,
	loaders: {
		en: () => import('./relativeTime/en.ts'),
		fr: () => import('./relativeTime/fr.ts')
	}
};
