<script lang="ts">
	import { formatDate, type FormatDateOptions } from '@288-toolkit/format';

	interface Props {
		/**
		 * The date to display
		 */
		date: Date;
		/**
		 * The date formatting options
		 */
		formatOptions?: FormatDateOptions;
		children?: import('svelte').Snippet<[{ formattedDate: string }]>;
	}

	let {
		date,
		formatOptions = {
			dateStyle: 'medium'
		},
		children
	}: Props = $props();

	const formattedDate = formatDate(date, formatOptions);
</script>

{#if date}
	<time datetime={date.toISOString()}>
		{#if children}
			{@render children({ formattedDate })}
		{:else}
			{formattedDate}
		{/if}
	</time>
{/if}
