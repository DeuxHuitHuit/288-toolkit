<script lang="ts">
	import { untrack, type Snippet } from 'svelte';
	import { throttleRaf } from '@288-toolkit/timeout';
	import clamp from 'just-clamp';
	import type { Maybe } from '@288-toolkit/types';
	import { on } from 'svelte/events';
	import { motionSafeScrollBehavior } from '@288-toolkit/ui';

	let {
		track: trackChildren,
		thumb: thumbChildren,
		content,
		draggable = true,
		onSetup,
		scrollBehavior = motionSafeScrollBehavior()
	}: {
		/**
		 * The content that should be copied in the minimap
		 */
		content: HTMLElement;
		/**
		 * Wether to allow dragging the thumb on the minimap. DEFAULT: true
		 */
		draggable?: boolean;
		/**
		 * Scroll behavior when clicking on the minimap.
		 * DEFAULT: 'instant' if the user prefers reduced motions, otherwise 'smooth'
		 */
		scrollBehavior?: ScrollBehavior;
		/**
		 * Function called when the minimap is setup and updated. Useful to modify the content's DOM
		 * when it is rendered in the minimap.
		 */
		onSetup?: (content: HTMLElement) => void;
		/**
		 * Snippet to style the track with your own elements
		 */
		track: Snippet<[{ dragging: boolean; scrollProgress: number }]>;
		/**
		 * Snippet to style the thumb with your own elements
		 */
		thumb: Snippet<[{ dragging: boolean; scrollProgress: number }]>;
	} = $props();

	let contentHtml = $derived(content?.outerHTML ?? '');

	let mapContainerEl = $state() as HTMLElement;
	let mapEl = $state() as HTMLElement;
	let thumbEl = $state() as HTMLElement;

	let scale = $state(0);
	let mapY = $state(0);
	let thumbY = $state(0);
	let thumbHeight = $state(0);
	let dragging = $state(false);
	let pointerAnchor = $state(0);

	const setupContent = (node: HTMLElement) => {
		// Mute all videos
		node.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
			video.muted = true;
		});
		// Pause all audios
		node.querySelectorAll<HTMLAudioElement>('audio').forEach((audio) => {
			audio.pause();
		});
		onSetup?.(node);
	};

	const onResize = () => {
		// Set scale
		scale = mapContainerEl.offsetWidth / content.offsetWidth;
		// Set thumb height
		thumbHeight = window.innerHeight * scale;
	};

	let scrollProgress = $state(0);

	const onScroll = () => {
		const contentRect = content.getBoundingClientRect();
		const contentMax = contentRect.height - window.innerHeight;
		const mapContainerHeight = mapContainerEl.offsetHeight;
		// Get real content scroll progress %
		scrollProgress = clamp(0, -contentRect.top / contentMax, 1);
		// Get map content height from the content rect. Getting it directly from the map element
		// is not reliable.
		const mapHeight = contentRect.height * scale;
		untrack(() => {
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
		});
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
		const mapContainerRect = mapContainerEl.getBoundingClientRect();
		const mapContainerTop = mapContainerRect.top;
		const mapHeight = mapEl.getBoundingClientRect().height;

		let top: Maybe<number> = null;

		const handleThumbDrag = () => {
			const contentMax = contentRect.height - window.innerHeight;
			const containerRelativePointerY = clientY - pointerAnchor - mapContainerTop;
			const dragRange = Math.min(mapContainerRect.height, mapHeight) - thumbHeight;
			// Progress is between 0 and 1
			scrollProgress = Math.min(containerRelativePointerY / dragRange, 1);
			top = scrollProgress * contentMax + contentTop;
			if (scrollProgress > 0) {
				window.scrollTo({
					top,
					behavior: 'instant'
				});
			}
		};

		const handleTrackClick = () => {
			// Track map click
			const contentMax = contentRect.height;
			const mapTop = mapEl.getBoundingClientRect().top;
			const mapRelativePointerY = clientY - mapTop;
			// Progress is between 0 and 1
			scrollProgress = Math.min((mapRelativePointerY - thumbHeight / 2) / mapHeight, 1);
			top = scrollProgress * contentMax + contentTop;
			window.scrollTo({
				top,
				behavior: scrollBehavior
			});
		};

		if (dragging) {
			handleThumbDrag();
		} else {
			handleTrackClick();
		}
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

	const onDrop = (e: PointerEvent) => {
		dragging = false;
		removeDragListeners(e);
	};

	const onTouchStart = (e: TouchEvent) => {
		if (!draggable) {
			return;
		}
		e.preventDefault();
	};

	$effect(() => {
		if (content && mapEl) {
			const resizeUnsub = on(window, 'resize', throttleRaf(onResize));
			const scrollUnsub = on(window, 'scroll', onScroll);
			onResize();
			onScroll();
			return () => {
				resizeUnsub();
				scrollUnsub();
			};
		}
	});
</script>

<div
	class="_map-container"
	style="--scale: {scale}; --map-y: {mapY}px; --thumb-y: {thumbY}px"
	aria-hidden="true"
	draggable="false"
	bind:this={mapContainerEl}
>
	{#key contentHtml}
		<div class="_map-overflow" draggable="false">
			<div class="_map" inert draggable="false" bind:this={mapEl} use:setupContent>
				{@html contentHtml}
			</div>
		</div>
		<div class="_track" draggable="false" onpointerdown={updateScroll}>
			{#if contentHtml}
				<div class="_track-content">
					{@render trackChildren?.({ dragging, scrollProgress })}
				</div>
			{/if}
			<div
				class="_thumb"
				style="height: {thumbHeight}px"
				draggable="false"
				onpointerdown={onDrag}
				ontouchstartcapture={onTouchStart}
				bind:this={thumbEl}
			>
				{#if contentHtml}
					<div class="_thumb-content">
						{@render thumbChildren?.({ dragging, scrollProgress })}
					</div>
				{/if}
			</div>
		</div>
	{/key}
</div>

<style>
	._map-container,
	._track {
		display: grid;
		grid-template: 100% / 100%;
	}

	._map-overflow,
	._track,
	._thumb,
	._track-content,
	._thumb-content {
		grid-area: 1 / 1;
	}

	._track-content,
	._thumb-content {
		height: 100%;
		width: 100%;
	}

	._map-container {
		height: 100%;
	}

	._map-overflow {
		overflow: hidden;
	}

	._track {
		height: 100%;
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
