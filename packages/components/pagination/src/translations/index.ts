import { createTranslate, type TranslateFunction } from '@288-toolkit/i18n';
import type { PaginationTranslations } from './en.js';

export const key = 'pagination';

export const t: TranslateFunction<PaginationTranslations> = createTranslate<PaginationTranslations>(key);
