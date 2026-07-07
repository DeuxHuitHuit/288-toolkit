import { createTranslate, type TranslateFunction } from '@288-toolkit/i18n';
import type { SlideshowTranslations } from './en.js';

export const key = 'slideshow';

export const t: TranslateFunction<SlideshowTranslations> = createTranslate<SlideshowTranslations>(key);
