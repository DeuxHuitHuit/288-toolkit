# Url

```sh
npm i @288-toolkit/url
```

A collection of functions to work with urls.

## `isExternalUrl()`

Check if a URL is external.

## `validateSameOrigin()`

Validate if the URL is from the same origin as the request URL.

## `parsedUrl()`

Safely parses a URL and exposes a nice API to access the parts of the URL. If the URL is not valid,
all functions returns null.

This should be used instead of the `URL` constructor, since it can throw errors.

## `createEntryUrlBuilder`

Creates a function that builds URLs for entries. Its api is similar to the `parsedUrl` function, but
is requires global options, so a builder function is exposed.

```ts
const entryUrl = createEntryUrlBuilder({
	siteUrl: 'https://example.org',
	shouldRemoveTrailingSlash: true
});

entryUrl({ url: '...' }).toAbsolute(); // Returns the full URL string.
entryUrl({ url: '...' }).toSchemeLess(); // Returns the URL string without the scheme, composed of the pathname, search, and hash.
```

## `urlCanParse`

Checks if a URL can be parsed.

This is a fallback for environments that don't support the `URL.canParse` method.
