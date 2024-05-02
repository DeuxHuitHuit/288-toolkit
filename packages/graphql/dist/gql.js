import { taggedTemplateToStringForSyntaxHighlighting } from '@288-toolkit/strings';
// Simple gql template to support syntax highlighting and formatting
export const gql = (t, ...s) => taggedTemplateToStringForSyntaxHighlighting(t, ...s);
