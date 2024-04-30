<script lang="ts">
	import { onDestroy } from 'svelte';
	import { resize, scroll } from '@288-toolkit/device/window';
	import { throttleRaf } from '@288-toolkit/timeout';
	import clamp from 'just-clamp';
	import type { Maybe } from '@288-toolkit/types';

	/**
	 * The content that should be copied in the minimap
	 */
	export let content: HTMLElement;
	/**
	 * Wether to allow dragging the thumb on the minimap
	 */
	export let draggable = true;
	/**
	 * Function called when the minimap is setup and updated. Useful to modify the content's DOM
	 * before it is appended to the minimap.
	 */
	export let onSetup: (content: HTMLElement) => void = () => {
		/* noop */
	};

	let mounted = false;
	let scale = 0;
	let mapContainer: HTMLElement;
	let map: HTMLElement;
	let thumb: HTMLElement;
	let mapY = 0;
	let thumbY = 0;
	let thumbHeight = 0;
	let dragging = false;
	let pointerAnchor = 0;

	const setup = () => {
		if (!content || !map) {
			return;
		}
		const copy = content.cloneNode(true) as HTMLElement;
		// Mute all videos
		copy.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
			video.muted = true;
		});
		// Pause all audios
		copy.querySelectorAll<HTMLAudioElement>('audio').forEach((audio) => {
			audio.pause();
		});
		onSetup(copy);
		map.replaceChildren(copy);
	};

	/**
	 * A function to update the minimap content. Useful if the original content's DOM is changed.
	 */
	export const update = setup;

	const onResize = () => {
		// Set scale
		scale = mapContainer.offsetWidth / content.offsetWidth;
		// Set thumb height
		thumbHeight = window.innerHeight * scale;
	};

	const onScroll = () => {
		const contentRect = content.getBoundingClientRect();
		const contentMax = contentRect.height - window.innerHeight;
		const mapContainerHeight = mapContainer.offsetHeight;
		// Get real content scroll progress %
		const scrollProgress = clamp(0, -contentRect.top / contentMax, 1);
		// Get map content height from the content rect. Getting it directly from the map element
		// is not reliable.
		const mapHeight = contentRect.height * scale;
		// Translate map if map height is greater than container
		if (mapHeight > mapContainerHeight) {
			const mapMax = mapHeight - mapContainerHeight;
			const mapProgress = scrollProgress * mapMax;
			// Convert progress to negative, make sure its not above 0 and set it on content
			mapY = -mapProgress;
		}
		// Set thumb progress
		const thumbMax = Math.min(mapContainerHeight, mapHeight) - thumbHeight;
		const thumbProgress = scrollProgress * thumbMax;
		thumbY = thumbProgress;
	};

	const updateScroll = (e: PointerEvent) => {
		if (!draggable) {
			return;
		}

		const { clientY } = e;

		// Ignore when pointer is out of viewport
		if (clientY < 0 || clientY > window.innerHeight) {
			return;
		}

		const contentRect = content.getBoundingClientRect();
		const contentTop = contentRect.top + window.scrollY;
		const mapContainerRect = mapContainer.getBoundingClientRect();
		const mapContainerTop = mapContainerRect.top;
		const mapHeight = map.getBoundingClientRect().height;

		let top: Maybe<number> = null;

		if (dragging) {
			// Dragging
			const contentMax = contentRect.height - window.innerHeight;
			const containerRelativePointerY = clientY - pointerAnchor - mapContainerTop;
			const dragRange = Math.min(mapContainerRect.height, mapHeight) - thumbHeight;
			// Progress is between 0 and 1
			const progress = Math.min(containerRelativePointerY / dragRange, 1);
			top = progress * contentMax + contentTop;
		} else {
			// Track map click
			const contentMax = contentRect.height;
			const mapTop = map.getBoundingClientRect().top;
			const mapRelativePointerY = clientY - mapTop;
			// Progress is between 0 and 1
			const progress = Math.min((mapRelativePointerY - thumbHeight / 2) / mapHeight, 1);
			top = progress * contentMax + contentTop;
		}

		if (typeof top === 'number') {
			window.scrollTo({
				top,
				behavior: 'instant'
			});
		}
	};

	const onDrop = (e: PointerEvent) => {
		dragging = false;
		removeDragListeners(e);
	};

	const addDragListeners = (e: PointerEvent) => {
		thumb.setPointerCapture(e.pointerId);
		thumb.addEventListener('pointermove', updateScroll);
		thumb.addEventListener('pointerup', onDrop);
	};

	const removeDragListeners = (e: PointerEvent) => {
		thumb.releasePointerCapture(e.pointerId);
		thumb.removeEventListener('pointermove', updateScroll);
		thumb.removeEventListener('pointerup', onDrop);
	};

	const onDrag = (e: PointerEvent) => {
		if (!draggable) {
			return;
		}
		const { clientY } = e;
		pointerAnchor = clientY - thumb.getBoundingClientRect().top;
		addDragListeners(e);
		dragging = true;
	};

	const onTouchStart = (e: TouchEvent) => {
		if (!draggable) {
			return;
		}
		e.preventDefault();
	};

	// ONMOUNT
	// We can't use svelte's `onMount` because the `content` prop is still undefined when it runs.
	// We wait for svelte to get the ref, then run the setup.
	$: if (content && map) {
		onResize();
		onScroll();
		setup();
		const resizeUnsub = resize.subscribe(throttleRaf(onResize));
		const scrollUnsub = scroll.subscribe(onScroll);
		onDestroy(() => {
			resizeUnsub();
			scrollUnsub();
		});
		mounted = true;
	}
</script>

<div
	class="_map-container"
	style="--scale: {scale}; --map-y: {mapY}px; --thumb-y: {thumbY}px"
	aria-hidden="true"
	draggable="false"
	bind:this={mapContainer}
>
	<div class="_map-overflow" draggable="false">
		<div class="_map" inert draggable="false" bind:this={map}></div>
	</div>
	<div class="_track" draggable="false" on:pointerdown={updateScroll}>
		{#if mounted}
			<slot name="track" {dragging} />
		{/if}
		<div
			class="_thumb"
			style="height: {thumbHeight}px"
			draggable="false"
			on:pointerdown|stopPropagation={onDrag}
			on:touchstart|capture={onTouchStart}
			bind:this={thumb}
		>
			{#if mounted}
				<slot name="thumb" {dragging} />
			{/if}
		</div>
	</div>
</div>

<style>
	._map-container {
		height: 100%;
	}

	._map-container,
	._track {
		display: grid;
		grid-template: 100% / 100%;

		:global(> div) {
			grid-area: 1 / 1;
		}
	}

	._map-overflow {
		overflow: hidden;
	}

	._track {
		z-index: 10;
	}

	._thumb {
		transform: translate3d(0, var(--thumb-y), 0);
	}

	._map {
		transform-origin: top left;
		transform: translate3d(0, var(--map-y), 0) scale(var(--scale));
		width: calc(calc(1 / var(--scale)) * 100%);
	}
</style>
