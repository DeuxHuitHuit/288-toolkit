import type { Maybe } from '@288-toolkit/types';
import type { Handle } from '@sveltejs/kit';
export type HttpAuthHandleOptions = {
    /**
     * Whether the middleware is enabled.
     */
    enabled: boolean;
    /**
     * The HTTP Basic Auth string.
     */
    authString: Maybe<string> | undefined;
};
/**
 * HTTP Basic Auth middleware.
 */
export declare const httpAuth: (options: HttpAuthHandleOptions) => Handle;
