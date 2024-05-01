<script lang="ts">
	import { derived, type Readable } from 'svelte/store';
	import { t } from './translations/index.js';
	import { getInternalPaginationContext } from './Pagination.svelte';
	import PaginationLink from './PaginationLink.svelte';

	type StepDataStore = {
		page: number;
		disabled: boolean;
		label: string;
		textContent: string;
	};

	type StepDirection = 'prev' | 'next';

	type StepsData = {
		[key in StepDirection]: Readable<StepDataStore>;
	};

	/**
	 * The direction of the step
	 */
	export let direction: StepDirection;
	let classes = '';
	/**
	 * Step link classes
	 */
	export { classes as class };

	const pagination = getInternalPaginationContext();

	const { pages } = pagination;

	const stepsData = {
		prev: derived<typeof pages, StepDataStore>(pages, (pages) => {
			return {
				page: pages.prev,
				disabled: pages.prev <= 0,
				label: t('prevPage'),
				textContent: '&larr;'
			};
		}),
		next: derived<typeof pages, StepDataStore>(pages, (pages) => {
			return {
				page: pages.next,
				disabled: pages.next > pages.total,
				label: t('nextPage'),
				textContent: '&rarr;'
			};
		})
	} satisfies StepsData;

	const stepData = stepsData[direction];

	$: disabled = $stepData.disabled;
</script>

<PaginationLink page={$stepData.page} label={$stepData.label} {disabled} class={classes}>
	<slot {disabled}>{@html $stepData.textContent}</slot>
</PaginationLink>
