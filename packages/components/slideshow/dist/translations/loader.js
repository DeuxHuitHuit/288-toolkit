import { key } from './index.js';
export const slideshow = {
    key,
    loaders: {
        en: () => import('./en.js'),
        fr: () => import('./fr.js')
    }
};
