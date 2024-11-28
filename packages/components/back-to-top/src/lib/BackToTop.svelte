<!--@docs 
A button that scrolls the window back to the top when clicked.
-->
<script lang="ts">
	import { motionSafeScrollBehavior } from '@288-toolkit/ui';

	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { class: classes = '', children }: Props = $props();

	const onClick = () => {
		window.scrollTo({ top: 0, left: 0, behavior: motionSafeScrollBehavior() });
	};
</script>

<button type="button" tabindex="-1" aria-hidden="true" class={classes} onclick={onClick}>
	{@render children?.()}
</button>
