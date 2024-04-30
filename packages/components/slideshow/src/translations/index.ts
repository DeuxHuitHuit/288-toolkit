import { createTranslate } from '@288-toolkit/i18n/translations/client';
import type { SlideshowTranslations } from './en';

export const key = 'slideshow';

export const t = createTranslate<SlideshowTranslations>(key);
