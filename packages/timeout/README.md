# Timeout

A collection of function for timeouts.

## `sleep`

Resolves a promise after a given time.

## `throttle`

Return a throttled function that will run the callback at most once until the timer expires.

A re-export of https://github.com/angus-c/just/tree/master/packages/function-throttle

## `debounce`

Return a debounced function that will run the callback <time> ms after the last invocation.

A re-export of https://github.com/angus-c/just/tree/master/packages/function-debounce

## `interval`

Creates an interval that calls a function at a fixed interval using requestAnimationFrame. Returns a
function that cancels the interval.

## `throttleRaf`

Return a throttled function that is called at most once per animation frame.
