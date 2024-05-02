import type { Handle } from '@sveltejs/kit';
/**
 * Checks if the request is allowed to be served by the serverless/edge function.
 */
export declare const preflightCheck: Handle;
export type SecurityHeadersHandleOptions = {
    /**
     * The allowed frame ancestors.
     */
    allowedFrameAncestors?: string[];
};
/**
 * Adds security headers to the response
 */
export declare const securityHeaders: (options?: SecurityHeadersHandleOptions) => Handle;
