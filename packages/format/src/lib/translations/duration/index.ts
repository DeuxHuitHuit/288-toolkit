import { createTranslate } from '@288-toolkit/i18n/translations/client';
import type { DurationTranslations } from './en.js';

export const key = 'duration';

export const t = createTranslate<DurationTranslations>(key);
