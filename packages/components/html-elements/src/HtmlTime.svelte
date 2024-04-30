<script lang="ts">
	import { formatDate, type FormatDateOptions } from '@288-toolkit/format';

	/**
	 * The date to display
	 */
	export let date: Date;
	/**
	 * The date formatting options
	 */
	export let formatOptions: FormatDateOptions = {
		dateStyle: 'medium'
	};

	const formattedDate = formatDate(date, formatOptions);
</script>

{#if date}
	<time datetime={date.toISOString()}>
		<slot {formattedDate}>
			{formattedDate}
		</slot>
	</time>
{/if}
