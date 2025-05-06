<script lang="ts">
	import { onMount } from 'svelte';
	import { DEV } from 'esm-env';
	import type { Maybe } from '@288-toolkit/types';
	import type { Snippet } from 'svelte';
	import { beforeNavigate } from '$app/navigation';

	interface Props {
		/**
		 * Used to identify the content being dismissed in browser storage.
		 */
		key: string;
		/**
		 * The delay in ms before the content shows up.
		 */
		timeout?: number;
		/**
		 * The date of the last update of the content.
		 */
		lastUpdatedAt?: Maybe<Date>;
		/**
		 * The maximum age of the dismissal in seconds.
		 * The content will show up again after this time has past.
		 */
		maxAge?: number;
		/**
		 * Wether to use `sessionStorage` or `localStorage`.
		 */
		browserStorage?: 'local' | 'session';
		/**
		 * Wether to close the content when navigating to another page.
		 */
		closeOnNav?: boolean;
		children?: Snippet<[{ close: () => void; dismiss: () => void; dismissed: boolean }]>;
	}

	let {
		key,
		timeout = 0,
		lastUpdatedAt = null,
		maxAge = 0,
		browserStorage = 'local',
		closeOnNav = false,
		children
	}: Props = $props();

	const storageKey = `${key}-dismissed`;
	const storage = (): Storage => window[`${browserStorage}Storage`];
	const FOREVER = 'true';
	let open = $state(false);
	let dismissed = $state(false);

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
		if (closeOnNav) {
			beforeNavigate(() => {
				open = false;
			});
		}

		return () => {
			clearTimeout(timer);
		};
	});
</script>

{#if open}
	{@render children?.({ close, dismiss, dismissed })}
{/if}
