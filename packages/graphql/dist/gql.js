import { taggedTemplateToStringForSyntaxHighlighting } from '@288-toolkit/strings';
/**
 * Simple GraphQL template tag to support syntax highlighting and formatting.
 */
export const gql = (t, ...s) => taggedTemplateToStringForSyntaxHighlighting(t, ...s);
