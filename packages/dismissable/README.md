# Dismissable

```sh
pnpm i @288-toolkit/dismissable
```

This component shows its content after an optional timeout and registers dismissals in browser
storage. It supports both a maximum age and a last update date. The content will show up again if
the dismissal is expired or if the content has been updated since the last dismissal.

It is useful for a banner or a cookie consent popup, for example.

##### Examples

The default storage is `localStorage`, but you can also use `sessionStorage`.

@exec DismissableForever.svelte

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
