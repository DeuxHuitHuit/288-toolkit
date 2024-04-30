# Minimap

```sh
pnpm i @288-toolkit/minimap
```

A minimap component that displays a scaled down overview of the selected page content. Simply pass
an HTMLElement ref to the `content` prop for it to be used inside the map.

The thumb's position, which represents the current visual viewport, is updated as the user scrolls
the page.

The minimap itself serves as a scroll bar. Dragging the thumb updates the page's scroll and clicking
the map scrolls instantly to the clicked content. This behavior can be disabled by passing
`draggable={false}` to the component.

You can add custom markup inside the `thumb` and `track` slots to style them as needed.

## Props

### content

The content that should be copied in the minimap.

```ts
export let content: HTMLElement;
```

### draggable

Whether to allow dragging the thumb on the minimap.

```ts
export let draggable: boolean = true;
```

### onSetup

Function called when the minimap is setup and updated. Useful to modify the content's DOM before it
is appended to the minimap (for example, muting videos).

```ts
export let onSetup: (content: HTMLElement) => void;
```

## Slots

### `track`

Slot props:

-   `dragging` (`boolean`): If the user is currently dragging the thumb.

### `thumb`

Slot props:

-   `dragging` (`boolean`): If the user is currently dragging the thumb.

## Example

```svelte
<script lang="ts">
	import { Minimap } from '@288-toolkit/minimap';

	let pageContent: HTMLElement;

	const onMinimapSetup = (content: HTMLElement) => {
		Array.from(content.querySelectorAll('video')).forEach((video) => {
			video.muted = true;
		});
	};
</script>

<div bind:this={pageContent}>
	<!-- ... -->
</div>
<Minimap content={pageContent} onSetup={onMinimapSetup}>
	<svelte:fragment slot="track" let:dragging>
		<div
			class="transition-colors duration-100 ease-linear {dragging ? '' : 'bg-white/10'}"
		></div>
	</svelte:fragment>
	<svelte:fragment slot="thumb" let:dragging>
		<div
			class="relative z-10 h-full w-full rounded ring-4 ring-white transition-[backdrop-filter] duration-100 ease-linear {dragging
				? 'backdrop-brightness-125'
				: ''}"
		></div>
	</svelte:fragment>
</Minimap>
```
