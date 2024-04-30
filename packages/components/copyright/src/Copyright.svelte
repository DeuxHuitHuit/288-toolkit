<script lang="ts">
	/**
	 * The year the website was put online.
	 */
	export let publishYear: number;

	/**
	 * The organization name to display in the copyright.
	 */
	export let orgName = '';

	/**
	 * The element to use for the copyright.
	 */
	export let as = 'small';

	const currentYear = new Date().getFullYear();
</script>

<svelte:element this={as}>
	&#169;&nbsp;{publishYear}{#if publishYear < currentYear}&nbsp;&ndash;&nbsp;{currentYear}{/if}{#if orgName}&nbsp;{orgName}{/if}
</svelte:element>
