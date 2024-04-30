import { key } from '.';
export const slideshow = {
    key,
    loaders: {
        en: () => import('./en'),
        fr: () => import('./fr')
    }
};
