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

-   `content` - `HTMLElement`: The content that should be copied in the minimap.
-   `draggable` - `boolean`: Whether to allow dragging the thumb on the minimap.
-   `onSetup` - `(content: HTMLElement) => void`: Function called when the minimap is setup and
    updated.

## Children

### `track`

Props:

-   `dragging` (`boolean`): If the user is currently dragging the thumb.

### `thumb`

Props:

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
	{#snippet track({ dragging })}
		<div
			class="transition-colors duration-100 ease-linear {dragging ? '' : 'bg-white/10'}"
		></div>
	{/snippet}
	{#snippet thumb({ dragging })}
		<div
			class="relative z-10 h-full w-full rounded ring-4 ring-white transition-[backdrop-filter] duration-100 ease-linear {dragging
				? 'backdrop-brightness-125'
				: ''}"
		></div>
	{/snippet}
</Minimap>
```
