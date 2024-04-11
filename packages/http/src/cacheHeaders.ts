export type CacheHeadersOptions = {
	enabled?: boolean;
	maxAge?: number;
	sMaxAge?: number;
	staleWhileRevalidate?: number;
	staleIfError?: number;
	revalidate?: number;
	public?: boolean;
};

const CACHE_CONTROL_NO_CACHE = 'private, no-cache, noindex, max-age=0, must-revalidate';

export const cacheHeaders = (options: Partial<CacheHeadersOptions> = {}) => {
	const {
		enabled,
		public: _public,
		maxAge,
		sMaxAge,
		staleWhileRevalidate,
		staleIfError
	} = options;
	if (enabled === false) {
		return {
			'cache-control': CACHE_CONTROL_NO_CACHE
		};
	}
	let cacheControl = '';
	if (_public) {
		cacheControl += 'public, ';
	} else {
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
	if (cacheControl.endsWith(', ')) {
		cacheControl = cacheControl.slice(0, -2);
	}
	return {
		'cache-control': cacheControl
	};
};
