import { key } from './index.js';

export const pagination = {
	key,
	loaders: {
		en: () => import('./en.js'),
		fr: () => import('./fr.js')
	}
} as const;
