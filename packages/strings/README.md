# Strings

A collection of functions to work with strings.

## capitalize

Capitalizes the first letter of a string.

## uncapitalize

Uncapitalize the first letter of a string.

## textToId

Converts text to a valid HTML id.

## removeLineBreaks

Removes line breaks from a string.

## removeSpaces

Removes all spaces from a string.

## removeTrailingSlash

Removes trailing slashes from a string.

## objectToQueryString

Returns a string of URL parameters from an object, filtering out `null` values.

## taggedTemplateToStringForSyntaxHighlighting

Convert a tagged template literal to a string for syntax highlighting.

```ts
import {
	taggedTemplateToStringForSyntaxHighlighting,
	type TemplateParamsArray
} from '@288-toolkit/strings';

const html = (t: TemplateStringsArray) => {
	return taggedTemplateToStringForSyntaxHighlighting(t);
};

// The string is unmodified but the editor can now syntax highlight it.
html`<div></div>`;
```

## toBase64

Converts a string into a base64 encoded string.

```typescript
toBase64(str: string): string
```

## fromBase64

Converts a base64 encoded string into a string.

```typescript
fromBase64(str: string): string
```

## base64ToUrlSafe

Converts a valid base64 string into a URL-safe base64 string.

```typescript
base64ToUrlSafe(str: string): string
```

## base64FromUrlSafe

Converts a URL-safe base64 string into a valid base64 string.

```typescript
base64FromUrlSafe(str: string): string
```

## base64FromBytes

Encodes an array of bytes into a base64 string.

```typescript
base64FromBytes(array: Uint8Array)
```

## base64ToBytes

Decodes a base64 string into an array of bytes.

```typescript
base64ToBytes(base64: string)
```
