# Dismissable

```sh
pnpm i @288-toolkit/dismissable
```

This component shows its content after an optional timeout and registers dismissals in browser
storage. It supports both a maximum age and a last update date. The content will show up again if
the dismissal is expired or if the content has been updated since the last dismissal.

It is useful for a banner or a cookie consent popup, for example.

## Props

-   `key` - `string`: Used to identify the content being dismissed in browser storage.
-   `timeout` - `number`: The delay in milliseconds before the content shows up.
-   `lastUpdatedAt` - `Maybe<Date>`: The date of the last update of the content.
-   `maxAge` - `number`: The maximum age of the dismissal in seconds. The content will show up again
    after this time has passed.
-   `browserStorage` - `'local' | 'session'`: Whether to use `sessionStorage` or `localStorage`.
-   `closeOnNav` - `boolean`: Whether to close the content when navigating to another page.
-   `close` - `() => void`: A function to close the popup without persistence.
-   `dismiss` - `() => void`: A function to dismiss the popup for the provided maxAge.
-   `isDismissed` - `() => boolean`: A function to check if the popup is dismissed.

## Children props

-   `close` (`() => void`): A function to close the popup.
-   `dismiss` (`() => void`): A function to dismiss the popup.
-   `dismissed` (`boolean`): Wether the popup is dimissed.

## Examples

The default storage is `localStorage`, but you can also use `sessionStorage`.

```svelte
<script lang="ts">
	import { Dismissable } from '@288-toolkit/dismissable';
</script>

<Dismissable key="forever" browserStorage="session">
	{#snippet children({ close })}
		<div>This content can be dismissed once per session.</div>
		<button onclick={close}>Dismiss</button>
	{/snippet}
</Dismissable>
```

You can dismiss the content based on a maximum age in seconds.

```svelte
<script lang="ts">
	import { Dismissable } from '@288-toolkit/dismissable';
</script>

<Dismissable key="maxage" maxAge={5}>
	{#snippet children({ close })}
		<div>This content can be dismissed for 5 seconds</div>
		<button onclick={close}>Dismiss</button>
	{/snippet}
</Dismissable>
```

The content will be back as soon as `lastUpdatedAt` prop is sooner then the last dismissal.

```svelte
<script lang="ts">
	import { Dismissable } from '@288-toolkit/dismissable';
</script>

<Dismissable key="lastUpdate" maxAge={300} lastUpdatedAt={new Date(Date.now() + 1000)}>
	{#snippet children({ close })}
		<div>
			This content can be dismissed for 300 seconds, but it won't since its lastUpdatedAt is
			in the future.
		</div>
		<button onclick={close}>Dismiss</button>
	{/snippet}
</Dismissable>
```

You can also use animations in or out.

```svelte
<script lang="ts">
	import { Dismissable } from '@288-toolkit/dismissable';
	import { fly } from 'svelte/transition';
</script>

<Dismissable key="animated" maxAge={5}>
	{#snippet children({ close })}
		<div in:fly={{ y: 0, duration: 500 }} out:fly={{ y: -100, duration: 200 }}>
			<button onclick={close}>Dismiss</button>
		</div>
	{/snippet}
</Dismissable>
```
