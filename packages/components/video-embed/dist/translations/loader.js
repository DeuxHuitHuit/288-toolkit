import { key } from '.';
export const videoEmbed = {
    key,
    loaders: {
        en: () => import('./en'),
        fr: () => import('./fr')
    }
};
