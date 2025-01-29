# Url

```sh
npm i @288-toolkit/url
```

A collection of functions to work with urls.

## `isExternalUrl()`

Check if a URL is external.

## `validateSameOrigin()`

Validate if the URL is from the same origin as the request URL.

## `createEntryUrlBuilder`

Creates a function that builds URLs for entries.

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
