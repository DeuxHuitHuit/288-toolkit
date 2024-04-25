# Cookie-popup

```sh
pnpm i @288-toolkit/cookie-popup
```

A cookie popup behavior component. Provides `accept` and `deny` methods to deal with the user's
choice.

## Props

### gtmConsentEvent

The consent event pushed to the dataLayer when the user accepts cookies.

```ts
export let gtmConsentEvent: Maybe<string> = null;
```

### key

The storage key used to persist the popup dismissal. Must be unique across projects.

```ts
export let key: string;
```

### maxAge

How long the cookie popup should take to re-appear when dismissed. Default: 30 days.

```ts
 export let maxAge = 1000 _ 60 _ 60 _ 24 _ 30; // 30 days
```

### timeout

How long the popup should take to show up on the page. Default: 0.

```ts
export let timeout = 0;
```

## Slot props

-   `accept` (`() => void`): The function to call when the user accepts cookies
-   `deny` (`() => void`): The function to call when the user denies cookies

## Example

```svelte
<script lang="ts">
	import { CookiePopup } from '@288-toolkit/cookie-popup';
</script>

<CookiePopup
	key="my-project-cookie-banner"
	gtmConsentEvent="consent"
	timeout={500}
	let:accept
	let:deny
>
	<div>
		<p>This site uses cookies</p>
		<button on:click={deny}> Deny </button>
		<button on:click={accept}> Accept </button>
	</div>
</CookiePopup>
```
