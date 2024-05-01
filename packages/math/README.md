# Math

```sh
npm i @288-toolkit/math
```

A collection of math related functions.

## `randomInt()`

Get a random integer between two integers. The given range includes both the min and the max.

Asking for (1, 6) will simulate a d6 and (0, array.length - 1) will return a correct index. If the
range is negative, the min and max will be swapped.

This function tries to not be biased, by rejecting values that would cause a non-uniform
distribution. See https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle.

## `lerp()`

Linear interpolation function that returns a point between two bounds derived from a value between
two other bounds. It makes sure to not divide or multiply by zero.

X1 and x2 are the target bounds.

Y1 and y2 are the two bounds between which the new value should be found.

Target is the point between to bounds from which we derive a new value.

```ts
const lerp: (x1: number, x2: number, y1: number, y2: number, target: number) => number;
```

```ts
// Convert a `progress` value that's between 0 and 1 to a width between 300 and 500.
const newWidth = lerp(0, 1, 300, 500, progress);
```

## `clamp()`

Restrict a number within a range.

A re-export of https://github.com/angus-c/just/tree/master/packages/number-clamp

## `computeGeoDistance()`

Computes the distance between two points on the earth's surface, using the Haversine formula.

```ts
const distance = computeGeoDistance(0.2323, 53530.3434);
```
