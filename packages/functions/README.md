# Functions

```sh
npm i @288-toolkit/functions
```

A collection of functions to wrap other functions with.

## `once()`

Create a function that can only be invoked once.

A re-export of https://github.com/angus-c/just/tree/master/packages/function-once.

## `expirable()`

Creates an expirable version of a value.

The `ttl` is the time to live, in seconds, for the data.

Returns a function that returns the value if it is not expired.

```ts
const expirable: <T>(value: T, ttl: number) => T;
```

## `runCallbacks()`

Batch multiple functions into one.

```ts
const unsubscribeAll = runCallbacks(
	store.subscribe(),
	anotherStore.subscribe(),
	wowAnotherStore.subsribe()
);

unsubscribeAll();
```
