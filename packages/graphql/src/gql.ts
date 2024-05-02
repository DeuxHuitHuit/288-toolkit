import {
	taggedTemplateToStringForSyntaxHighlighting,
	type TemplateParamsArray
} from '@288-toolkit/strings';

// Simple gql template to support syntax highlighting and formatting
export const gql = (t: TemplateStringsArray, ...s: TemplateParamsArray) =>
	taggedTemplateToStringForSyntaxHighlighting(t, ...s);
