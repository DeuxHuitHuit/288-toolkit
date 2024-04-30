# Page-transition

```sh
npm i @288-toolkit/page-transition
```

This page transition system leverages Sveltekit's `onNavigate` and allows for multiple different
transitions within the same site. Each transition has to be registered with a unique key and a
condition. A store will then be provided so the components can get notified when the transition is
triggered.

## `registerTransition()` and `endTransition()`

A function to register a transition.

To register a default transition, use the `'default'` key. The default transition does not need a
condition because it will be played on every navigation if there are no other transition superseding
it.

To override the default transition, or simply add a transition for a specific navigation, the key
can be any string, as long is it is unique. You must also provide a condition function that returns
`true` if the transition has to be played. This condition function receives the same

```ts
/**
 * @see https://kit.svelte.dev/docs/types#public-types-navigation
 */
type TransitionCondition = (nav: Navigation) => boolean;
```

`registerTransition` returns a readable store that is `null` by default, and is a `Transition`
object while the transition is happening. The `key` of the `Transition` object will always be the
key that was passed to `registerTransition`. That way, the store is scoped to this particular
transition.

```ts
/**
 * @see https://kit.svelte.dev/docs/types#public-types-navigationtarget
 */
type Transition = Maybe<{
	from: Maybe<NavigationTarget>;
	to: Maybe<NavigationTarget>;
	key: string;
}>;
```

When a transition is playing, it is on the user to end the transition by calling `endTransition()`.
This function resolves the promise that Sveltekit waits for from the `onNavigate` callback to render
the new page. If it is never called, the new page is rendered.

It accepts an optional callback that will run after the new page is rendered.

### Examples

#### Default transition

```svelte
<script lang="ts">
	import { registerTransition, endTransition } from '@288-toolkit/page-transition';

	// Registering the default transition
	const transitioning = registerTransition('default');
</script>

{#if !$transitioning}
	<div transition:fade={{ duration: 150 }} on:outroEnd={endTransition}>
		<slot />
	</div>
{/if}
```

#### Custom transition

`ArticleCard.svelte`

```svelte
<script lang="ts">
	import { registerTransition, endTransition } from '@288-toolkit/page-transition';

	export let article;

	const href = article.href;

	// Registering a unique key for this particular article
	const transitioning = registerTransition(`article-${href}`, {
		condition: (nav) => {
			return nav?.to?.url.pathname === href;
		}
	});
</script>

{#if !$transitioning}
	<div out:fly={{ duration: 700, y: '100%' }} on:outroEnd={endTransition}>
		<slot />
	</div>
{/if}
```

## `skipTransition()`

Sometimes we want to opt-out of our page transition system and bypass all transitions, even the
default one. We can do this by calling `skipTransition` and providing it with a condition function.
If the condition returns `true`, all transitions are skipped.

```svelte
<script lang="ts">
	import { skipTransition } from '@288-toolkit/page-transition';

	export let article;

	const href = article.href;

	skipTransition((nav) => {
		return nav?.to?.url.pathname === href;
	});
</script>

<!-- ... -->
```

## `$transitioning`

The module exports a general readable store that is updated with a `Transition` object whenever any
transition occurs and is `null` the rest of the time. This is useful if you want to easily run some
code for a transition outside of the component that has registered it, or for several transitions
with similar keys, for example.

```svelte
<script lang="ts">
	import { transitioning } from '@288-toolkit/page-transition';
</script>

{#if $transitioning?.key.startsWith('article-')}
	<!-- ... -->
{/if}
```
