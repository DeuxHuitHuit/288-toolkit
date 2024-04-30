import type { Maybe } from '@288-toolkit/types';

/**
 * Returns a string of URL parameters from an object.
 */
export const objectToQueryString = (
	options: Record<string, Maybe<string | number | boolean>>
): string => {
	const params = Object.entries(options).reduce((paramsAcc, [key, value]) => {
		if (value !== null) {
			paramsAcc[key] = value as string;
		}
		return paramsAcc;
	}, {});

	return new URLSearchParams(params).toString();
};
