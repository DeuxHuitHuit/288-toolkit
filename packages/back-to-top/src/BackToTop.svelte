<!--@docs 
A button that scrolls the window back to the top when clicked.

@exec BackToTopImpl.svelte

```svelte
<div class="fixed bottom-0 right-0 p-[4rem]">
	<BackToTop class="bg-[black] text-[white] p-[2rem]">
		Back to the top :)
	</BackToTop>
</div>
```
-->
<script lang="ts">
	import { motionSafeScrollBehavior } from '@288-toolkit/ui';

	let classes = '';
	export { classes as class };

	const onClick = () => {
		window.scrollTo({ top: 0, left: 0, behavior: motionSafeScrollBehavior() });
	};
</script>

<button type="button" tabindex="-1" aria-hidden="true" class={classes} on:click={onClick}>
	<slot />
</button>
