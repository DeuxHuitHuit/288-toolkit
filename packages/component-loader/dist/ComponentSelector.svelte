<script lang="ts" generics="TEntry extends DynamicImportEntryWithSvelteComponent">
	import type { Maybe } from '@288-toolkit/types';
	import { DEV } from 'esm-env';
	import type { DynamicImportEntryWithSvelteComponent } from './createComponentLoader';

	export let entries: Maybe<TEntry>[] = [];
</script>

{#if entries?.length}
	{#each entries as entry}
		{@const component = entry?.svelteComponent}
		{#if component}
			<slot {component} {entry}>
				<svelte:component this={component} {entry} />
			</slot>
		{:else if DEV}
			<div>
				Error importing component for entry: <pre>{JSON.stringify(entry, null, 4)}</pre>
			</div>
		{/if}
	{/each}
{/if}
