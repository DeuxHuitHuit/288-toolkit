# Component-loader

```sh
npm i @288-toolkit/component-loader
```

## `createComponentLoader()`

Creates a function that allows you to import Svelte components dynamically and add them to a data
object as a `svelteComponent` property.

It takes a `DynamicImports` array that contains objects of the following form:

```ts
{
	key: string;
	getImport: (entry) => void | Promise<SvelteComponent>;
}
```

### `key`

The `key` property is a string describing the path, in dot notation, of the property you want
dynamically imported components for on the data object passed to the loader.

For example:

-   The key for a `modules` property on an `entry` property on the data object would be
    `entry.modules`.
-   The key for a `dynamicEntries` property inside of a module would be
    `entry.modules.dynamicEntries` and so on.
-   An empty string represents the data object itself.

### `getImport`

The `getImport` function receives the object corresponding to the key as an argument and returns the
`import()` call for the component.

If the value of the key is an object, `getImport` is called for that object only, and he
`svelteComponent` property is added directly to it.

If the value is an array of objects, `getImport` is called for every objects of the array, and the
`svelteComponent` property is added to all of them.

[!IMPORTANT] Do NOT `await` the import, it will not work. The 'awaiting' happens later.

[!IMPORTANT] You can return `null` or `undefined` if you don't want to import anything. For example,
if you know the entry will not have a component.

Because of how Vite processes dynamic imports, there are several limitations to keep in mind when
writing the import path. They are listed here:
[https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations](https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations).

### Example

```ts
import { createComponentLoader } from '@288-toolkit/component-loader';

const loadComponents = createComponentLoader([
	{
		key: 'relatedItems',
		getImport: (entry: CardEntry) => import(`../cards/${entry.type}.svelte`)
	},
	// Dynamically import all modules components
	{
		key: 'entry.modules',
		getImport: (entry: ModuleEntry) => import(`../modules/${entry.section}.svelte`)
	},
	// Dynamically import card components on a module
	{
		key: 'entry.modules.cardItems',
		getImport: (entry: CardEntryInsideAModule) =>
			import(`../cards/${entry.unique.property}.svelte`)
	},
	// The properties can be at any level
	{
		key: 'entry.content.blocks.items.icons',
		getImport: (entry: IconEntry) => import(`../icons/${entry.iconName}.svelte`)
	}
]);
```

You can now load components from a universal load function:

`+page.ts`

```ts
import { loadComponents } from './loadComponents';

export const load = async (data) => {
	return loadComponents(data);
};
```

This component can then be rendered in the templates, usually with the `ComponentSelector.svelte`
helper.

## `ComponentSelector.svelte`

After having dynamically loaded the components, we need to render them. To do so, you can use the
`ComponentSelector.svelte` component.

By default, `ComponentSelector` renders all components by passing them an `entry` prop corresponding
to their associated data.

You can also use the default slot to render the components in any way you like. The slot receives
the `component` and `entry` props.

### Example

```svelte
<script lang="ts">
	import ComponentSelector from '@288-toolkit/component-loader';

	export let data;

	const { modules } = data.entry;
</script>

<ComponentSelector entries={modules} />

<ComponentSelector entries={modules} let:component let:entry>
	<section>
		<svelte:component this={component} data={entry} darkMode />
	</section>
</ComponentSelector>
```
