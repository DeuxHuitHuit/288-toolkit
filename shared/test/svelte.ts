import type { TemplateParamsArray } from '@288-toolkit/strings';
import { taggedTemplateToStringForSyntaxHighlighting, toBase64 } from '@288-toolkit/strings';
import { INLINE_SVELTE_ID } from '@288-toolkit/vite-plugin-svelte-inline-component';

// Convert svelte component base64 string and import it from memory
export const svelte = async (t: TemplateStringsArray, ...s: TemplateParamsArray) => {
	const str = taggedTemplateToStringForSyntaxHighlighting(t, ...s);
	const path = `${INLINE_SVELTE_ID}${toBase64(str)}.svelte`;
	return import(path);
};

export const html = svelte;
