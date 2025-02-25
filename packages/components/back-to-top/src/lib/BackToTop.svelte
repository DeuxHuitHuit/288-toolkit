<!--@docs 
A button that scrolls the window back to the top when clicked.
-->
<script lang="ts">
	import { motionSafeScrollBehavior } from '@288-toolkit/ui';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		children,
		...rest
	}: {
		children?: import('svelte').Snippet;
	} & HTMLButtonAttributes = $props();

	const onClick = () => {
		window.scrollTo({ top: 0, left: 0, behavior: motionSafeScrollBehavior() });
	};
</script>

<button type="button" tabindex="-1" aria-hidden="true" onclick={onClick} {...rest}>
	{@render children?.()}
</button>
