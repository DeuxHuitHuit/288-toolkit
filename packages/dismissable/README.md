# Dismissable

```sh
pnpm i @288-toolkit/dismissable
```

This component shows its content after an optional timeout and registers dismissals in browser
storage. It supports both a maximum age and a last update date. The content will show up again if
the dismissal is expired or if the content has been updated since the last dismissal.

It is useful for a banner or a cookie consent popup, for example.

## Props

### key

Used to identify the content being dismissed in browser storage.

```ts
export let key: string;
```

### timeout

The delay in milliseconds before the content shows up.

```ts
export let timeout = 0;
```

### lastUpdatedAt

The date of the last update of the content.

```ts
export let lastUpdatedAt: Maybe<Date> = null;
```

### maxAge

The maximum age of the dismissal in seconds. The content will show up again after this time has
passed.

```ts
export let maxAge = 0;
```

### browserStorage

Whether to use `sessionStorage` or `localStorage`.

```ts
export let browserStorage: 'local' | 'session' = 'local';
```

### closeOnNav

Whether to close the content when navigating to another page.

```ts
export let closeOnNav = false;
```

### close

A function to close the popup without persistence.

```ts
export const close: () => void;
```

### dismiss

A function to dismiss the popup for the provided maxAge.

```ts
export const dismiss: () => void;
```

### isDismissed

A function to check if the popup is dismissed.

```ts
export const isDismissed: () => boolean;
```

## Slot props

-   `close` (`() => void`): A function to close the popup.
-   `dismiss` (`() => void`): A function to dismiss the popup.
-   `dismissed` (`boolean`): Wether the popup is dimissed.

## Examples

The default storage is `localStorage`, but you can also use `sessionStorage`.

```svelte
<script lang="ts">
	import { Dismissable } from '@288-toolkit/dismissable';
</script>

<Dismissable key="forever" browserStorage="session" let:close>
	<div>This content can be dismissed once per session.</div>
	<button on:click={close}>Dismiss</button>
</Dismissable>
```

You can dismiss the content based on a maximum age in seconds.

```svelte
<script lang="ts">
	import { Dismissable } from '@288-toolkit/dismissable';
</script>

<Dismissable key="maxage" maxAge={5} let:close>
	<div>This content can be dismissed for 5 seconds</div>
	<button on:click={close}>Dismiss</button>
</Dismissable>
```

The content will be back as soon as `lastUpdatedAt` prop is sooner then the last dismissal.

```svelte
<script lang="ts">
	import { Dismissable } from '@288-toolkit/dismissable';
</script>

<Dismissable key="lastUpdate" maxAge={300} lastUpdatedAt={new Date(Date.now() + 1000)} let:close>
	<div>
		This content can be dismissed for 300 seconds, but it won't since its lastUpdatedAt is in
		the future.
	</div>
	<button on:click={close}>Dismiss</button>
</Dismissable>
```

You can also use animations in or out.

```svelte
<script lang="ts">
	import { Dismissable } from '@288-toolkit/dismissable';
	import { fly } from 'svelte/transition';
</script>

<Dismissable key="animated" maxAge={5} let:close>
	<div in:fly={{ y: 0, duration: 500 }} out:fly={{ y: -100, duration: 200 }}>
		<button on:click={close}>Dismiss</button>
	</div>
</Dismissable>
```
