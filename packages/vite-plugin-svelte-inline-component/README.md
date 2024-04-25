# vite-plugin-svelte-inline-component

Taken from https://github.com/DockYard/svelte-inline-component and rewritten in Typescript.

Allows writing inline Svelte components as tagged template literals. Useful for tests.

In your vite config:

```ts
import { defineConfig } from 'vite';
import { svelteInlineComponent } from '@288-toolkit/vite-plugin-svelte-inline-component';

export default defineConfig(({ mode }) => {
	return {
		plugins: [
			// ...
			mode === 'test' && svelteInlineComponent()
		]
	};
});
```

Example (copied from https://github.com/DockYard/svelte-inline-component):

```ts
import { cleanup, render } from '@testing-library/svelte';
import { svelte /** or html */ } from '@288-toolkit/vite-plugin-svelte-inline-components';

describe('MyComponent.svelte', () => {
	it('renders a link with the given href', async () => {
		const { getByTestId } = render(
			await svelte`
    <script>
	  	import MyButton from '$lib/MyButton.svelte';
	</script>

	<MyButton title="foo">
		Look ma! I'm using slots!!
	</MyButton>
    `
		);
		expect(getByTestId('button')).to.have.class('submit');
		expect(getByTestId('button')).to.have.text("Look ma! I'm using slots!!");
	});
});
```
