import { createTranslate } from '@288-toolkit/i18n/translations/client';
import type { FilesizeTranslations } from './en.js';

export const key = 'filesize';

export const t = createTranslate<FilesizeTranslations>(key);
