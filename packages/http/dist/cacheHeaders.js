const CACHE_CONTROL_NO_CACHE = 'private, no-cache, noindex, max-age=0, must-revalidate';
/**
 * Generate cache headers
 */
export const cacheHeaders = (options = {}) => {
    const { enabled, public: _public, private: _private, maxAge, sMaxAge, staleWhileRevalidate, staleIfError, immutable, mustRevalidate, mustUnderstand, noCache, noStore, noTransform, proxyRevalidate } = options;
    if (enabled === false) {
        return {
            'cache-control': CACHE_CONTROL_NO_CACHE
        };
    }
    let cacheControl = '';
    if (_public) {
        cacheControl += 'public, ';
    }
    if (_private) {
        cacheControl += 'private, ';
    }
    if (maxAge) {
        cacheControl += `max-age=${maxAge}, `;
    }
    if (sMaxAge) {
        cacheControl += `s-maxage=${sMaxAge}, `;
    }
    if (staleWhileRevalidate) {
        cacheControl += `stale-while-revalidate=${staleWhileRevalidate}, `;
    }
    if (staleIfError) {
        cacheControl += `stale-if-error=${staleIfError}, `;
    }
    if (immutable) {
        cacheControl += 'immutable, ';
    }
    if (mustRevalidate) {
        cacheControl += 'must-revalidate, ';
    }
    if (mustUnderstand) {
        cacheControl += 'must-understand, ';
    }
    if (noCache) {
        cacheControl += 'no-cache, ';
    }
    if (noStore) {
        cacheControl += 'no-store, ';
    }
    if (noTransform) {
        cacheControl += 'no-transform, ';
    }
    if (proxyRevalidate) {
        cacheControl += 'proxy-revalidate, ';
    }
    if (cacheControl.endsWith(', ')) {
        cacheControl = cacheControl.slice(0, -2);
    }
    return {
        'cache-control': cacheControl
    };
};
