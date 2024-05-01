/**@docs
 * The html module provides a simple way to manipulate HTML strings.
 * It returns itself after each method call, so you can chain them.
 * You end the chain by calling the `toString` method.
 *
 * ```ts
 * const textWithOnlyBoldAndItalic = html(text).stripTags(text, ['strong', 'em']).toString();
 * ```
 *
 */
interface Html {
    stripTags(preservedTags?: string[]): Html;
    newLinesToBr(): Html;
    removeEmptyTags(): Html;
    toString(): string;
}
export declare const html: (html: string) => Html;
export {};
