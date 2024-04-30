import type { Maybe } from '@288-toolkit/types';
/**
 * Returns a string of URL parameters from an object.
 */
export declare const objectToQueryString: (options: Record<string, Maybe<string | number | boolean>>) => string;
