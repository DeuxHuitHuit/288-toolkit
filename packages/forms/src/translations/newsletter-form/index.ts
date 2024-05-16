import { createTranslate } from '@288-toolkit/i18n';
import type { NewsletterFormTranslations } from './en.js';

export const key = 'newsletter-form';

export const t = createTranslate<NewsletterFormTranslations>(key);
