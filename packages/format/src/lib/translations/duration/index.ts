import { createTranslate } from '@288-toolkit/i18n';
import type { DurationTranslations } from './en.js';

export const key = 'duration';

export const t = createTranslate<DurationTranslations>(key);
