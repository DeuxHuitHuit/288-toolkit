# Typed-context

[!IMPORTANT] This package only exports typescript files.

Wraps typed versions of Svelte's `getContext` and `setContext` functions with the provided type
argument and context key.

## Usage

`my-context.ts`

```ts
import { createTypedContext } from '@288-toolkit/typed-context';

type MyContext = {
	hello: string;
};

export const { getContext, setContext } = createTypedContext<MyContext>('my-context');
```

`my-parent-component.ts`

```svelte
<script lang="ts">
	import { setContext } from './my-context.ts';

	setContext({
		hello: 'world',
		other: 'prop' // Type error
	});
</script>
```

`my-child-component.ts`

```svelte
<script lang="ts">
	import { getContext } from './my-context.ts';

	const ctx = getContext();

	console.log(ctx.hello); // 'world'
	console.log(ctx.other); // Type error
</script>
```
