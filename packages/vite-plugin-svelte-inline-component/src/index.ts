import { fromBase64 } from '@288-toolkit/strings';

export const INLINE_SVELTE_ID = 'virtual:inline-svelte:';

export const svelteInlineComponent = () => {
	return {
		name: 'svelte-inline-component',
		enforce: 'pre',
		resolveId(id: string) {
			if (id.startsWith(INLINE_SVELTE_ID)) {
				return id;
			}
		},
		load(id: string) {
			if (id.startsWith(INLINE_SVELTE_ID)) {
				const base64ComponentSource = id
					.split(new RegExp(INLINE_SVELTE_ID))[1]
					.replace('.svelte', '');
				return fromBase64(base64ComponentSource);
			}
		}
	};
};
