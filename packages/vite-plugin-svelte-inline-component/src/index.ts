import {
	fromBase64,
	taggedTemplateToStringForSyntaxHighlighting,
	toBase64,
	type TemplateParamsArray
} from '@288-toolkit/strings';
import type { Plugin } from 'vite';

export const INLINE_SVELTE_ID = 'virtual:inline-svelte:';

export const svelteInlineComponent: () => Plugin = () => {
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

/**
 * Convert svelte component base64 string and import it from memory
 */
export const svelte = async (t: TemplateStringsArray, ...s: TemplateParamsArray) => {
	const str = taggedTemplateToStringForSyntaxHighlighting(t, ...s);
	const path = `${INLINE_SVELTE_ID}${toBase64(str)}.svelte`;
	return import(path);
};

/**
 * Convert svelte component base64 string and import it from memory
 */
export const html = svelte;
