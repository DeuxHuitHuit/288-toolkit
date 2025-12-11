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
		maxAge?: number; // 30 days
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
		children: childrenProp
	}: Props = $props();

	const consentEvent = gtmConsentEvent || 'gtm.consent';

	let dismissable: Dismissable;

	const pushConsent = () => {
		// @ts-expect-error window.dataLayer is loaded externally
		if (window.dataLayer?.push) {
			// @ts-expect-error window.dataLayer is loaded externally
			window.dataLayer.push({ event: consentEvent });
		}
	};

	const accept = () => {
		pushConsent();
		dismissable.dismiss();
	};

	onMount(() => {
		// Send consent if the popup is already dismissed
		if (dismissable.isDismissed()) {
			pushConsent();
		}
	});
</script>

<Dismissable {key} {maxAge} {timeout} bind:this={dismissable}>
	{#snippet children({ close })}
		{@render childrenProp?.({ accept, deny: close })}
	{/snippet}
</Dismissable>
