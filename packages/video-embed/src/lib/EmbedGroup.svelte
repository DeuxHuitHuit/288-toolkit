<script context="module" lang="ts">
	import { writable, type Readable, readonly } from 'svelte/store';
	import type { Maybe } from '@288-toolkit/types';
	import { createTypedContext } from '@288-toolkit/typed-context';

	export interface VideoEmbedApi {
		/**
		 * A readable store that indicates if the video is currently playing
		 */
		playing: Readable<boolean>;
		/**
		 * A readable store that indicates if preconnect has been requested
		 */
		preconnect: Readable<boolean>;
		/**
		 * Request preconnect
		 */
		requestPreconnect: () => void;
		/**
		 * Play the video
		 */
		play: () => void;
		/**
		 * The URL of the video
		 */
		url: Maybe<string>;
	}

	const CONTEXT_KEY = '__videoEmbed__';

	const { setContext, getContext } = createTypedContext<VideoEmbedApi>(CONTEXT_KEY);

	export const getVideoEmbedContext = getContext;
</script>

<script lang="ts">
	export let url: Maybe<string> = null;

	interface $$Slots {
		default: {
			playing: boolean;
			preconnect: boolean;
			play: () => void;
			requestPreconnect: () => void;
		};
	}

	const playing = writable(false);
	const preconnect = writable(false);

	const requestPreconnect = () => {
		preconnect.set(true);
	};

	const play = () => {
		playing.set(true);
	};

	setContext({
		playing: readonly(playing),
		preconnect: readonly(preconnect),
		requestPreconnect,
		play,
		url
	});
</script>

<slot playing={$playing} preconnect={$preconnect} {play} {requestPreconnect} />
