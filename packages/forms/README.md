# Forms

A collection of functions and builders to build forms.

The builders are based on [Melt-ui's](https://melt-ui.com/) APIs.

## `createPostForm`

Creates a form to post data to an endpoint.

### Usage

```svelte
<script lang="ts">
	import { createPostForm } from '@288-toolkit/forms';
	import { melt } from '@melt-ui/svelte';

	const {
		elements: { form, honeypot },
		states: { state },
		helpers: { submit, values, errors, data }
	} = createPostForm({ resetDelay: 15000, novalidate: true });
</script>

<form use:melt={$form}>
	<input use:melt={$honeypot} />
</form>
```

### Options

```ts
type CreatePostFormOptions = {
	/**
	 * The delay in milliseconds before the form is reset
	 * after a successful submission.
	 */
	resetDelay?: Maybe<number>;
	/**
	 * The key of the form in the page store. Must be used if there are
	 * multiple forms on the page.
	 */
	formKey?: Maybe<string>;
	/**
	 * Applies the novalidate attribute to the form element, which disables browser validation, only when
	 * javascript is enabled.
	 */
	novalidate?: boolean;
};
```

### Elements

-   `form`: The form element.
-   `honeypot`: A honeypot input.

### States

-   `state` (`'idle' | 'submitting' | 'success' | 'error'`): The current state of the form.

### Helpers

-   `submit` (`() => void`): A function to programmatically submit the form.
-   `values` (`Readable<Record<string, string>>`): A readable store of the form values returned from
    the server. The keys are the input names.
-   `errors` (`Readable<Record<string, string>>`): A readable store of the form errors returned from
    the server. The keys are the input names.
-   `data` (`Readable<Record<string, string>>`): The whole data object returned from the server.

## `createValidatedField`

Creates a validated input and error hint.

### Usage

```svelte
<script lang="ts">
	import { ValidatedField } from '@288-toolkit/forms';
	import { melt } from '@melt-ui/svelte';
	import classNames from 'classnames';
	import { elasticOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	const {
		elements: { input, hint },
		helpers: { value, error }
	} = createValidatedField();

	$: console.log($value);
</script>

<div class="flex w-full flex-col items-start gap-8 pt-24">
	<label class="flex w-full flex-col items-start gap-12">
		<span class="text-16 leading-100">My input</span>
		<input use:melt={$input} />
	</label>
	{#if $error}
		<div
			use:melt={$hint}
			in:fly={{ duration: 500, easing: elasticOut, x: 50 }}
			out:fade={{ duration: 200 }}
			class="text-14 leading-100 text-left text-[red]"
		>
			{$error}
		</div>
	{/if}
</div>
```

### Options

```ts
export type FieldOptions = {
	/**
	 * The type of the input element. DEFAULT: 'text'
	 */
	type?: string;
	/**
	 * The name of the field. This is used to access the value and error of the field.
	 */
	name: string;
	/**
	 * A readable store containing the errors of the form.
	 */
	errors: Readable<FormErrors>;
	/**
	 * A readable store containing the values of the form.
	 */
	values: Readable<FormValues>;
	/**
	 * If true, the field will be focused when an error is set. DEFAULT: true
	 */
	focusOnError?: boolean;
};
```

### Elements

-   `input`: The input element.
-   `hint`: The associated error message.

### Helpers

-   `value` (`Readable<Maybe<string>>`): The input value returned from the server.
-   `error` (`Readable<Maybe<string>>`): The input error returned from the server.

## `createHoneypot`

Creates a honeypot input which can be validated on the server with `validateHoneypot`.

### Usage

```svelte
<script lang="ts">
	import { createHoneypot } from '@288-toolkit/forms';
	import { melt } from '@melt-ui/svelte';

	const {
		elements: { honeypot }
	} = createHoneypot();
</script>

<input use:melt={$honeypot} />
```

## `createNewsletterForm`

Creates an accessible newsletter form which can be validated on the server with
`validateNewsletter`. Uses `createPostForm`.

### Usage

```svelte
<script lang="ts">
	import { createNewsletterForm } from '@288-toolkit/forms';
	import { melt } from '@melt-ui/svelte';

	const {
		elements: { form, honeypot, emailInput, emailHint, announcer },
		states: { state },
		helpers: { submit, values, errors, data, emailError, emailValue }
	} = createNewsletterForm({ resetDelay: 15000, novalidate: true });
</script>

<form use:melt={$form}>
	<label>
		<input use:melt={$emailInput} />
	</label>
	{#if $emailError}
		<p use:melt={$emailHint}>{$emailError}</p>
	{/if}
	<input use:melt={$honeypot} />
	<div use:melt={$announcer}></div>
</form>
```

### Options

Same as `createPostForm`.

### Elements

Same as `createPostForm`, plus:

-   `emailInput`: The email input.
-   `emailHint`: The associated email error message.
-   `announcer`: A screen-reader announcer for the state of the form.

### States

Same as `createPostForm`.

### Helpers

Same as `createPostForm`, plus:

-   `emailValue` (`Readable<Maybe<string>>`): The email value returned from the server.
-   `emailError` (`Readable<Maybe<string>>`): The email error returned from the server.

## `requestSubmit`

A function to trigger a submit event (along with validation) on a form.

## `use:enhancePost`

Wraps Sveltekit's `enhance` action to cancel in-flight request (by using the current
AbortController) if the form is re-submitted to quickly.
