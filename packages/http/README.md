# Http

A collection of functions to work with http.

## `cacheHeaders`

Generates a `cache-control` header object from the provided options.

If `enabled: false`, the `cache-control` header will be
`'private, no-cache, noindex, max-age=0, must-revalidate'`.

```ts
type CacheHeadersOptions = {
	// Disables the cache entirely
	enabled?: boolean;
	// All cache-control directives
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

const cacheControl = cacheHeaders({
	// ...
});

return new Response('', {
	headers: cacheControl
});
```

## `fetchTimeout`

Fetch with a timeout. Defaults to 20 seconds.

```ts
// 5 second timeout
const response = await fetchTimeout(url, { ... }, 5000);
```

## `isRedirectResponse`

Returns `true` if the response is a redirect response.

```ts
const isRedirectResponse: (response: Response) => boolean;
```

## `isWithoutBody`

Returns `true` if the request should not have a body.

```ts
const isWithoutBody: (request: Request) => boolean;
```

## `getLangFromRequest` (deprecated)

Get the language from the request.

```ts
const getLangFromRequest = <Language extends string>(
	request: Request,
	{ supportedLanguages: Language[]; defaultLanguage: Language }
) => Language;
```

## `parseAcceptLanguage`

Given a string of the form "en,fr;q=0.9,de;q=0.8", returns an array of `AcceptLanguageEntry` ordered
by priority. This is mostly used to parse the `'Accept-Language'` header.

```ts
type AcceptLanguageEntry = {
	lang: string;
	priority: number;
};

const parseAcceptLanguage = (acceptLanguage: string): Maybe<AcceptLanguageEntry[]>
```

## `acceptedLanguage`

Get the accepted language from the request.

```ts
const language = acceptedLanguage(request, {
	supportedLanguages: ['en', 'fr'],
	defaultLanguage: 'en'
});
```

## `getVercelIpHeaders`

Get Vercel headers from a request.

```ts
const getVercelIpHeaders: (request: Request) => {
	country: Maybe<string>;
	region: Maybe<string>;
	city: Maybe<string>;
	latitude: Maybe<string>;
	longitude: Maybe<string>;
	timezone: Maybe<string>;
	ip: Maybe<string>;
};
```
