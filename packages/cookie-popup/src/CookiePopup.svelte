<script lang="ts">
	import { Dismissable } from '@288-toolkit/dismissable';
	import type { Maybe } from '@288-toolkit/types';
	import { onMount } from 'svelte';

	/**
	 * The consent event pushed to the dataLayer when the user accepts cookies
	 */
	export let gtmConsentEvent: Maybe<string> = null;
	/**
	 * The storage key used to persist the popup dismissal. Must be unique across projects.
	 */
	export let key: string;
	/**
	 * How long the cookie popup should take to re-appear when dismissed.
	 * Default: 30 days
	 */
	export let maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
	/**
	 * How long the popup should take to show up on the page
	 * Default: 0
	 */
	export let timeout = 0;

	const consentEvent = gtmConsentEvent || 'gtm.consent';

	let dismiss: () => void;
	let isDismissed: () => boolean;

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
</script>

<Dismissable {key} {maxAge} {timeout} let:close bind:dismiss bind:isDismissed>
	<slot {accept} deny={close} />
</Dismissable>
