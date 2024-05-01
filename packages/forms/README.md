# Forms

A collection of functions, actions and stores to build forms.

## `requestSubmit`

A function to trigger a submit event (along with validation) on a form.

## `use:enhancePost`

Wraps Sveltekit's `enhance` action to cancel in-flight request (by using the current
AbortController) if the form is re-submitted to quickly.
