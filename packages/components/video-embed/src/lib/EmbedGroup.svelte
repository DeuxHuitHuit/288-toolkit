<script context="module" lang="ts">
	import { writable, type Readable, readonly } from 'svelte/store';
	import type { Maybe } from '@288-toolkit/types';
	import { createTypedContext } from '@288-toolkit/typed-context';

	export type InitialConsentState = 'not-required' | 'required';
	export type ConsentState = InitialConsentState | 'accepted' | 'rejected' | 'pending';

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
		 * Stop the video
		 */
		stop: () => void;
		/**
		 * The URL of the video
		 */
		url: Maybe<string>;
		/**
		 * The consent state of the user
		 */
		consentState: Readable<ConsentState>;
		/**
		 * Accept the consent and plays the video
		 */
		acceptConsent: () => void;
		/**
		 * Reject the consent and stops the video
		 */
		rejectConsent: () => void;
	}

	const CONTEXT_KEY = '__videoEmbed__';

	const { setContext, getContext } = createTypedContext<VideoEmbedApi>(CONTEXT_KEY);

	export const getVideoEmbedContext = getContext;
</script>

<script lang="ts">
	export let url: Maybe<string> = null;
	export let initialConsentState: InitialConsentState = 'not-required';

	interface $$Slots {
		default: {
			playing: boolean;
			preconnect: boolean;
			play: () => void;
			stop: () => void;
			requestPreconnect: () => void;
			consentState: ConsentState;
			acceptConsent: () => void;
			rejectConsent: () => void;
		};
	}

	const _playing = writable(false);
	export const playing = readonly(_playing);

	const preconnect = writable(false);

	const _consentState = writable<ConsentState>(initialConsentState);
	export const consentState = readonly(_consentState);
	const canPlay = () => $consentState === 'accepted' || $consentState === 'not-required';

	const requestPreconnect = () => {
		preconnect.set(canPlay());
	};

	export const play = () => {
		if (canPlay()) {
			_playing.set(true);
		} else if ($consentState === 'required') {
			_consentState.set('pending');
		}
	};

	export const stop = () => {
		_playing.set(false);
	};

	export const acceptConsent = () => {
		_consentState.set('accepted');
		play();
	};

	export const rejectConsent = () => {
		_consentState.set('rejected');
		stop();
		preconnect.set(false);
	};

	setContext({
		playing,
		preconnect: readonly(preconnect),
		requestPreconnect,
		play,
		stop,
		url,
		consentState,
		acceptConsent,
		rejectConsent
	});
</script>

<slot
	playing={$_playing}
	preconnect={$preconnect}
	{play}
	{stop}
	{requestPreconnect}
	consentState={$consentState}
	{acceptConsent}
	{rejectConsent}
/>
