import { key } from '.';
export const pagination = {
    key,
    loaders: {
        en: () => import('./en'),
        fr: () => import('./fr')
    }
};
