import { normalize } from '@288-toolkit/strings';

/**
 * Normalizes the pathname by decoding it, normalizing each part, and joining them with slashes.
 * @see {@link @288-toolkit/strings#normalize}
 * @param pathname - The pathname to normalize.
 * @returns The normalized pathname.
 */
export const normalizePath = (pathname: string) => {
	return pathname
		.split('/')
		.map((part) => normalize(decodeURIComponent(part)))
		.join('/');
};
