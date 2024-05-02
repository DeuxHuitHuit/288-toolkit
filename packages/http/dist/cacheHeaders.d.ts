export type CacheHeadersOptions = {
    enabled?: boolean;
    maxAge?: number;
    sMaxAge?: number;
    staleWhileRevalidate?: number;
    staleIfError?: number;
    private?: boolean;
    public?: boolean;
    noCache?: boolean;
    noStore?: boolean;
    noTransform?: boolean;
    immutable?: boolean;
    mustRevalidate?: boolean;
    proxyRevalidate?: boolean;
    mustUnderstand?: boolean;
};
/**
 * Generate cache headers
 */
export declare const cacheHeaders: (options?: Partial<CacheHeadersOptions>) => {
    'cache-control': string;
};
