import { createTranslate } from '@288-toolkit/i18n/translations/client';
import type { Translation } from '@288-toolkit/i18n/types';
import type { FilesizeTranslations } from './en';

const key = 'filesize';

export const filesize: Translation = {
	key,
	loaders: {
		en: () => import('./en'),
		fr: () => import('./fr')
	}
};

export const t = createTranslate<FilesizeTranslations>('filesize');
