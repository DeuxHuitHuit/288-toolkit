export type TemplateParamsArray = (string | number | boolean)[];
/**
 * Convert a tagged template literal to a string for syntax highlighting.
 */
export declare const taggedTemplateToStringForSyntaxHighlighting: (t: TemplateStringsArray, ...s: TemplateParamsArray) => string;
