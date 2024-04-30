/**
 * Convert a tagged template literal to a string for syntax highlighting.
 */
export const taggedTemplateToStringForSyntaxHighlighting = (t, ...s) => String.raw(t, ...s);
