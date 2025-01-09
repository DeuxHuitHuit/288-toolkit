<script lang="ts">
	import { resize, scroll } from '@288-toolkit/device/window';
	import { throttleRaf } from '@288-toolkit/timeout';
	import clamp from 'just-clamp';
	import type { Maybe } from '@288-toolkit/types';

	interface Props {
		/**
		 * The content that should be copied in the minimap
		 */
		content: HTMLElement;
		/**
		 * Wether to allow dragging the thumb on the minimap
		 */
		draggable?: boolean;
		/**
		 * Function called when the minimap is setup and updated. Useful to modify the content's DOM
		 * before it is appended to the minimap.
		 */
		onSetup?: (content: HTMLElement) => void;
		/**
		 * The snippet for the track.
		 */
		track?: import('svelte').Snippet<[{ dragging: boolean }]>;
		/**
		 * The snippet for the thumb.
		 */
		thumb?: import('svelte').Snippet<[{ dragging: boolean }]>;
	}

	let {
		content,
		draggable = true,
		onSetup = () => {
			/* noop */
		},
		track,
		thumb
	}: Props = $props();

	let mounted = $state(false);
	let scale = $state(0);
	let mapContainer: HTMLElement = $state();
	let map: HTMLElement = $state();
	let thumbEl: HTMLElement = $state();
	let mapY = $state(0);
	let thumbY = $state(0);
	let thumbHeight = $state(0);
	let dragging = $state(false);
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
		thumbEl.setPointerCapture(e.pointerId);
		thumbEl.addEventListener('pointermove', updateScroll);
		thumbEl.addEventListener('pointerup', onDrop);
	};

	const removeDragListeners = (e: PointerEvent) => {
		thumbEl.releasePointerCapture(e.pointerId);
		thumbEl.removeEventListener('pointermove', updateScroll);
		thumbEl.removeEventListener('pointerup', onDrop);
	};

	const onDrag = (e: PointerEvent) => {
		e.stopPropagation();
		if (!draggable) {
			return;
		}
		const { clientY } = e;
		pointerAnchor = clientY - thumbEl.getBoundingClientRect().top;
		addDragListeners(e);
		dragging = true;
	};

	const onTouchStart = (e: TouchEvent) => {
		if (!draggable) {
			return;
		}
		e.preventDefault();
	};

	$effect(() => {
		let resizeUnsub: () => void;
		let scrollUnsub: () => void;
		if (content && map) {
			onResize();
			onScroll();
			setup();
			resizeUnsub = resize.subscribe(throttleRaf(onResize));
			scrollUnsub = scroll.subscribe(onScroll);
			mounted = true;
		}
		return () => {
			resizeUnsub?.();
			scrollUnsub?.();
		};
	});
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
	<div class="_track" draggable="false" onpointerdown={updateScroll}>
		{#if mounted}
			{@render track?.({ dragging })}
		{/if}
		<div
			class="_thumb"
			style="height: {thumbHeight}px"
			draggable="false"
			onpointerdown={onDrag}
			ontouchstartcapture={onTouchStart}
			bind:this={thumbEl}
		>
			{#if mounted}
				{@render thumb?.({ dragging })}
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
