<script lang="ts">
	import { onMount } from 'svelte';
	import { navigating } from '$app/stores';
	import { DEV } from 'esm-env';
	import type { Maybe } from '@288-toolkit/types';

	/**
	 * Used to identify the content being dismissed in browser storage.
	 */
	export let key: string;
	/**
	 * The delay in ms before the content shows up.
	 */
	export let timeout = 0;
	/**
	 * The date of the last update of the content.
	 */
	export let lastUpdatedAt: Maybe<Date> = null;
	/**
	 * The maximum age of the dismissal in seconds.
	 * The content will show up again after this time has past.
	 */
	export let maxAge = 0;
	/**
	 * Wether to use `sessionStorage` or `localStorage`.
	 */
	export let browserStorage: 'local' | 'session' = 'local';
	/**
	 * Wether to close the content when navigating to another page.
	 */
	export let closeOnNav = false;

	const storageKey = `${key}-dismissed`;
	const storage = (): Storage => window[`${browserStorage}Storage`];
	const FOREVER = 'true';
	let open = false;
	$: dismissed = false;

	const getExpiryDate = () => {
		if (maxAge) {
			return new Date(Date.now() - maxAge * 1000);
		}
		return null;
	};

	const stringToValidDate = (value: Maybe<string>) => {
		if (!value) {
			return null;
		}
		const date = new Date(value);
		if (date && isNaN(date.getTime())) {
			if (DEV) {
				console.warn(`Invalid date: ${value}`);
			}
			return null;
		}
		return date;
	};

	const checkIfDismissed = (value: Maybe<string>) => {
		// Not in storage, so not dismissed
		if (!value) {
			return false;
		}

		// The default value 'true' means it has been dismissed 'forever'
		if (value === FOREVER) {
			return true;
		}

		// If we have a value other than 'true', it must be the last dismiss date
		const lastDismissed = stringToValidDate(value);

		// If it was dismissed before the last update, it is not dismissed anymore
		if (lastDismissed && lastUpdatedAt && lastDismissed.getTime() < lastUpdatedAt.getTime()) {
			return false;
		}

		// We check if the dismissal is expired
		const expiryDate = getExpiryDate();
		const isExpired =
			lastDismissed && expiryDate && lastDismissed.getTime() < expiryDate.getTime();
		if (isExpired) {
			return false;
		}

		// If we got here, it is dismissed
		return true;
	};

	/**
	 * A function to close the popup without persistance.
	 */
	export const close = () => {
		open = false;
	};

	/**
	 * A function to dismiss the popup for the provided maxAge.
	 */
	export const dismiss = () => {
		close();
		// If an expiry date is needed, the value is the date. Otherwise, the value remains 'true'
		const storageValue = maxAge || lastUpdatedAt ? new Date().toISOString() : FOREVER;
		storage().setItem(storageKey, storageValue);
	};

	/**
	 * A function to check if the popup is dismissed.
	 */
	export const isDismissed = () => dismissed;

	onMount(() => {
		// Check if previously dismissed
		dismissed = checkIfDismissed(storage().getItem(storageKey));
		if (dismissed) {
			return;
		}

		// Clear the storage
		storage().removeItem(storageKey);

		// Show after timeout
		const timer = setTimeout(() => (open = true), timeout);

		// Maybe close on navigation
		let navUnsubscribe: () => void;
		if (closeOnNav) {
			navUnsubscribe = navigating.subscribe((nav) => {
				if (nav) {
					open = false;
				}
			});
		}

		return () => {
			clearTimeout(timer);
			navUnsubscribe?.();
		};
	});
</script>

{#if open}
	<slot {close} {dismiss} {dismissed} />
{/if}
