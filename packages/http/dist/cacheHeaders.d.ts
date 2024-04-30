export type CacheHeadersOptions = {
    enabled?: boolean;
    maxAge?: number;
    sMaxAge?: number;
    staleWhileRevalidate?: number;
    staleIfError?: number;
    revalidate?: number;
    public?: boolean;
};
export declare const cacheHeaders: (options?: Partial<CacheHeadersOptions>) => {
    'cache-control': string;
};
