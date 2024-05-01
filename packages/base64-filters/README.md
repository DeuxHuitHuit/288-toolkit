# Base64-filters

```sh
npm i @288-toolkit/base64-filters
```

This modules provides functions that will encode and decode positive numeric filters into base64
strings. This is suitable for use in URLs, since it will use the url safe variant of base64.

The main api are the functions `encodeFilters` and `decodeFilters`. It will use 2 formats, depending
on the number of filters: If _all_ filters have one or zero value, the layout will be x 16 bits
numbers, one for each filter. 0 is used to represent no value. if _any_ filter have more than one
value, the layout will be 1 8 bits number for the length, followed by each value on 2 bytes
(lowest/highest).

This means that the maximum value for a filter is 65535 and the maximum number of values per filter
is 255. Only positive values are supported.

You can also choose the format strategy by using either `encodeSingleFilters` or
`encodeMultiFilters`, along with their respective `decode` functions.
