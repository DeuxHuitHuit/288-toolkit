import { createTranslate } from '@288-toolkit/i18n/translations/client';
import type { PaginationTranslations } from './en';

export const key = 'pagination';

export const t = createTranslate<PaginationTranslations>(key);
