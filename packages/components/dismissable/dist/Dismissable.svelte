<script lang="ts">import { onMount } from "svelte";
import { navigating } from "$app/stores";
import { DEV } from "esm-env";
let {
  key,
  timeout = 0,
  lastUpdatedAt = null,
  maxAge = 0,
  browserStorage = "local",
  closeOnNav = false,
  children
} = $props();
const storageKey = `${key}-dismissed`;
const storage = () => window[`${browserStorage}Storage`];
const FOREVER = "true";
let open = $state(false);
let dismissed = $state(false);
const getExpiryDate = () => {
  if (maxAge) {
    return new Date(Date.now() - maxAge * 1e3);
  }
  return null;
};
const stringToValidDate = (value) => {
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
const checkIfDismissed = (value) => {
  if (!value) {
    return false;
  }
  if (value === FOREVER) {
    return true;
  }
  const lastDismissed = stringToValidDate(value);
  if (lastDismissed && lastUpdatedAt && lastDismissed.getTime() < lastUpdatedAt.getTime()) {
    return false;
  }
  const expiryDate = getExpiryDate();
  const isExpired = lastDismissed && expiryDate && lastDismissed.getTime() < expiryDate.getTime();
  if (isExpired) {
    return false;
  }
  return true;
};
export const close = () => {
  open = false;
};
export const dismiss = () => {
  close();
  const storageValue = maxAge || lastUpdatedAt ? (/* @__PURE__ */ new Date()).toISOString() : FOREVER;
  storage().setItem(storageKey, storageValue);
};
export const isDismissed = () => dismissed;
onMount(() => {
  dismissed = checkIfDismissed(storage().getItem(storageKey));
  if (dismissed) {
    return;
  }
  storage().removeItem(storageKey);
  const timer = setTimeout(() => open = true, timeout);
  let navUnsubscribe;
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
	{@render children?.({ close, dismiss, dismissed })}
{/if}
