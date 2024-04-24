<script lang="ts">
	import { page } from '$app/stores';

	/**
	 * The year the website was put online.
	 */
	export let publishYear: number;

	/**
	 * The organization name to display in the copyright.
	 */
	export let orgName: string;
	/**
	 * The element to use for the copyright.
	 */
	export let as = 'small';

	const currentYear = new Date().getFullYear();
</script>

{#if orgName}
	<svelte:element this={as}>
		&#169;&nbsp;{publishYear}{#if publishYear < currentYear}&nbsp;&ndash;&nbsp;{currentYear}{/if}&nbsp;{orgName}
	</svelte:element>
{/if}
