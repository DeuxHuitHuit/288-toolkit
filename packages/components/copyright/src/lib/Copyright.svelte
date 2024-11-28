<script lang="ts">
	interface Props {
		/**
		 * The year the website was put online.
		 */
		publishYear: number;
		/**
		 * The organization name to display in the copyright.
		 */
		orgName?: string;
		/**
		 * The element to use for the copyright.
		 */
		as?: string;
		[key: string]: unknown;
	}

	let { publishYear, orgName = '', as = 'small', ...rest }: Props = $props();

	const currentYear = new Date().getFullYear();
</script>

<svelte:element this={as} {...rest}>
	&#169;&nbsp;{publishYear}{#if publishYear < currentYear}&nbsp;&ndash;&nbsp;{currentYear}{/if}{#if orgName}&nbsp;{orgName}{/if}
</svelte:element>
