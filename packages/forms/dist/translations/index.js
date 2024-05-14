import { key as key_newsletter } from './newsletter-form/index.js';
export const newsletterForm = {
    key: key_newsletter,
    loaders: {
        en: () => import('./newsletter-form/en.js'),
        fr: () => import('./newsletter-form/fr.js')
    }
};
