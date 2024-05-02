import {
	taggedTemplateToStringForSyntaxHighlighting,
	type TemplateParamsArray
} from '@288-toolkit/strings';

/**
 * Simple GraphQL template tag to support syntax highlighting and formatting.
 */
export const gql = (t: TemplateStringsArray, ...s: TemplateParamsArray) =>
	taggedTemplateToStringForSyntaxHighlighting(t, ...s);
