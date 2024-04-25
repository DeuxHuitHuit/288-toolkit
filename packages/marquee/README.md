# Marquee

```sh
pnpm i @288-toolkit/marquee
```

A css animated generic marquee component.

## Props

### --gap

Should be set as a css variable.

To make a seamless marquee effect, the component generates whatever is in the slot twice or more.
The `gap` property represents the space between the copies. Default: `0`.

### --speed

Should be set as a css variable.

The marquee animation duration, which determines the speed of the marquee. The higher the number,
the slower the marquee. Default: `12000ms`.

### direction

The direction of the marquee.

```ts
export let direction: 'natural' | 'inverted' = 'natural';
```

### orientation

The orientation of the marquee. Default: `horizontal`.

```ts
export let orientation: 'vertical' | 'horizontal' = 'horizontal';
```

### stopOnHover

Whether the marquee should pause when hovered. Default: `false`.

```ts
export let stopOnHover = false;
```

## Slot props

-   `copy` (`boolean`): Wether the rendered slot is a copy of the original.

## Example

```svelte
<script lang="ts">
	import { Marquee } from '@288-toolkit/marquee';
</script>

<section>
	<Marquee direction="natural" stopOnHover>
		{#each ['200/300?1', '200/300?2', '200/300?3', '200/300?4', '200/300?5'] as image}
			<img src="http://placekitten.com/{image}" alt="" />
		{/each}
	</Marquee>
</section>

<style>
	section {
		--gap: 2rem;
		--speed: 40000ms;
	}

	@screen lg {
		section {
			--gap: 4rem;
			--speed: 20000ms;
		}
	}
</style>
```
