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

Safely parses a URL and expose and nice API to access the parts of the URL.
If the URL is not valid, all functions returns null.

## `createEntryUrlBuilder`

Creates a function that builds URLs for entries.
Its api is similar to the `parsedUrl` function.

```ts
const getEntryUrl = createEntryUrlBuilder({
	siteUrl: 'https://example.org',
	shouldRemoveTrailingSlash: true
});

getEntryUrl(mockEntry).raw; // The URL object.
getEntryUrl(mockEntry).toAbsolute(); // Returns the full URL string.
getEntryUrl(mockEntry).toString(); // Returns the full URL string.
getEntryUrl(mockEntry).toSchemeLess(); // Returns the URL string without the scheme, composed of the pathname, search, and hash.
```

## `urlCanParse`

Checks if a URL can be parsed.

This is a fallback for environments that don't support the `URL.canParse` method.
