<script lang="ts">
	import { Dismissable } from '@288-toolkit/dismissable';
	import type { Maybe } from '@288-toolkit/types';
	import { onMount } from 'svelte';

	interface Props {
		/**
		 * The consent event pushed to the dataLayer when the user accepts cookies
		 */
		gtmConsentEvent?: Maybe<string>;
		/**
		 * The storage key used to persist the popup dismissal. Must be unique across projects.
		 */
		key: string;
		/**
		 * How long the cookie popup should take to re-appear when dismissed.
		 * Default: 30 days
		 */
		maxAge?: any; // 30 days
		/**
		 * How long the popup should take to show up on the page
		 * Default: 0
		 */
		timeout?: number;
		children?: import('svelte').Snippet<[{ accept: () => void; deny: () => void }]>;
	}

	let {
		gtmConsentEvent = null,
		key,
		maxAge = 1000 * 60 * 60 * 24 * 30,
		timeout = 0,
		children
	}: Props = $props();

	const consentEvent = gtmConsentEvent || 'gtm.consent';

	let dismiss: () => void = $state();
	let isDismissed: () => boolean = $state();

	const pushConsent = () => {
		if (window.dataLayer?.push) {
			window.dataLayer.push({ event: consentEvent });
		}
	};

	const accept = () => {
		pushConsent();
		dismiss();
	};

	onMount(() => {
		// Send consent if the popup is already dismissed
		if (isDismissed()) {
			pushConsent();
		}
	});

	const children_render = $derived(children);
</script>

<Dismissable {key} {maxAge} {timeout} bind:dismiss bind:isDismissed>
	{#snippet children({ close })}
		{@render children_render?.({ accept, deny: close })}
	{/snippet}
</Dismissable>
