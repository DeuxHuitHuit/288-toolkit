# Arrays

```sh
npm i @288-toolkit/arrays
```

A collection of functions to work with arrays.

## `dedupeArray()`

Removes duplicates from an array of values (`string | number | symbol | boolean`).

```ts
dedupeArray([1, 2, 2, 2, '4', '5', '4', true, true]); // [1, 2, '4', '5', true]
```

## `dedupeArrayOfObjects()`

Removes duplicates from an array of objects based on the value of a key.

```ts
const people: Person[] = [
	{ id: 1, name: 'John', age: 30 },
	{ id: 2, name: 'Jane', age: 25 },
	{ id: 3, name: 'John', age: 30 },
	{ id: 4, name: 'Alice', age: 35 },
	{ id: 5, name: 'Jane', age: 25 }
];

const uniquePeople = dedupeArrayOfObjects(people, 'name');

// [
//     { id: 1, name: "John", age: 30 },
//     { id: 2, name: "Jane", age: 25 },
//     { id: 4, name: "Alice", age: 35 },
// ]
```

## `randomIndex()`

Returns a random index from an array with a random uniform distribution. See
[`randomInt`](../math/README.md)

## `randomItem()`

Returns a random item from an array with a random uniform distribution. See
[`randomInt`](../math/README.md)

## `shuffleArray()`

Creates a shuffled copy of an array.
