# Hooks

```sh
npm i @288-toolkit/hooks
```

A collection of Sveltekit hooks.

## `server`

### `date`

Replaces a marker in the html response with the current date. The default marker is `%request.date%`
but can be customized via options.

```ts
export const handle = sequence(
	date({
		marker: '%my-custom-marker%'
	})
);
```

### `httpAuth`

HTTP Basic Auth middleware.

You must provide an auth string in the form of 'username:password'.

You can also disable the handle by passing `enabled: false`. This is useful for disabling auth when
the app is building.

```ts
import { building } from '$app/environment';

export const handle = sequence(httpAuth({ authString: 'username:password', enabled: !building }));
```

### `performanceHeaders`

Adds custom headers to the response to measure the performance of requests.

The added headers are:

-   `x-request-id`: An id to identify the request.
-   `x-response-time`: The response time of the request.

### `preloads`

Preloads css, js, and font files.

### `preflightCheck`

Checks if the request is allowed to be served by the server.

Returns empty responses to pathname that could be used to attack the server, including:

-   `.zip`
-   `.rar`
-   `.tar`
-   `.tar.gz`
-   `.7z`
-   `.sql`
-   `.db`
-   `.ini`
-   `.log`
-   `.php`
-   `.html`
-   `.htm`
-   `.aspx`
-   `.pdf`
-   `.doc`
-   `.docx`
-   `.xsl`
-   `.xslx`
-   `wp-content`
-   `wp-includes`

Returns empty responses to pathnames that are under `\_app/immutable`. Those requests will never be
served by the edge/serverless function, so we can save bandwidth and time when they do hit the
function.

Returns empty responses to requests to service worker file. We have seen this in the wild, and it
seems to be a problem on iOS devices.

### `securityHeaders`

Adds security headers to the response.

The following headers are added by default:

-   `x-xss-protection`: '1; mode=block'
-   `x-frame-options`: 'SAMEORIGIN'
-   `x-content-type-options`: 'nosniff'
-   `referrer-policy`: 'strict-origin-when-cross-origin'

The `x-frame-options` header prevents any pages from being embedded inside an iframe. To allow some
urls to do that, use the `allowedFrameAncestors`:

```ts
export const handle = sequence(
	securityHeaders({
		allowedFrameAncestors: ['https://my-url.com', 'https://another-url.com']
	})
);
```

This will add the following header:

-   `content-security-policy`, "frame-ancestors 'self' https://my-url.com https://another-url.com"

### `createSiteRouter()`

Creates a site router handle.

```ts
import { createSiteRouter } from '@288-toolkit/hooks/server';

export const handle = sequence(createSiteRouter({
	defaultSiteUri: 'en',
	defaultEntryUri: '__home-page__'
}));
```

The following options are available:

- `defaultSiteUri`: The default site uri, when the pathname is empty.
- `defaultEntryUri`: The default entry uri, when the pathname is empty.
- `siteHandle`: A function to format the site handle.
- `pathnameSplitter`: A function to split the pathname into site and entry parts.
- `partsToSiteRouterObject`: A function to convert the parts into a site router object.
