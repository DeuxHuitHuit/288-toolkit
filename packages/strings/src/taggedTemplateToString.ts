export type TemplateParamsArray = (string | number | boolean)[];

/**
 * Convert a tagged template literal to a string for syntax highlighting.
 */
export const taggedTemplateToStringForSyntaxHighlighting = (
	t: TemplateStringsArray,
	...s: TemplateParamsArray
) => String.raw(t, ...s);
