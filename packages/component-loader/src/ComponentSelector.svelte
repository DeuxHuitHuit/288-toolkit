<script module lang="ts">
	import type { DynamicImportEntryWithSvelteComponent } from './createComponentLoader';
</script>

<script lang="ts" generics="TEntry extends DynamicImportEntryWithSvelteComponent">
	import type { Maybe } from '@288-toolkit/types';
	import { DEV } from 'esm-env';
	import type { Component } from 'svelte';

	interface Props {
		entries?: Maybe<TEntry>[];
		children?: import('svelte').Snippet<[{ component: Component; entry: TEntry }]>;
	}

	let { entries = [], children }: Props = $props();
</script>

{#if entries?.length}
	{#each entries as entry}
		{@const SvelteComponent = entry?.svelteComponent}
		{#if SvelteComponent}
			{#if children}
				{@render children({ component: SvelteComponent, entry, })}
			{:else}
				<SvelteComponent {entry} />
			{/if}
		{:else if DEV}
			<div>
				Error importing component for entry: <pre>{JSON.stringify(entry, null, 4)}</pre>
			</div>
		{/if}
	{/each}
{/if}
