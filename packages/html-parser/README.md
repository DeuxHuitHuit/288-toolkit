# Html-parser

```sh
npm i @288-toolkit/html-parser
```

A collection of functions to work with html strings.

## `html()`

Provides a simple way to manipulate HTML strings. It returns itself after each method call, so you
can chain them. You end the chain by calling the `toString()` method.

```ts
const textWithOnlyBoldAndItalic = html(text)
	.newLinesToBr() // Converts line break characters to <br /> tags
	.removeEmptyTags() // Removes empty tags from the HTML string
	.stripTags(['strong', 'em']) // Removes all HTML tags from the string, except `strong` and `em`.
	.toString(); // Returns the processed HTML string
```
