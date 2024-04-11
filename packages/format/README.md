# Format

[!IMPORTANT] This package only exports typescript files.

A collection of functions to format data.

## `date`

A chainable interface to manipulate the options passed to Intl.DateTimeFormat.

This module offers three apis to manipulate the options passed to Intl.DateTimeFormat. Each api
offers different affordances to manipulate the options.

1.  `formatDate(date, options, locale)`: The most basic api. It takes a date and options and returns
    the formatted date string.
2.  `createFormatDate(options, locale)`: A chainable api that allows you to manipulate the options.
    offers a lot of shorthand functions to manipulate the options.
3.  `[option](date)`: A set of functions that call `createFormatDate()` without any option, turns on
    a single option, then call `format()` with the date passed to the function. Those function are
    also available for imports.

The module also exports single functions to quickly format a date:

### short

Gets the short format of the date, in the default timezone and current locale.

```typescript
short(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedDate = short(new Date()); // "4/11/2024"
```

---

### medium

Gets the medium format of the date, in the default timezone and current locale.

```typescript
medium(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedDate = medium(new Date()); // "Apr 11, 2024"
```

---

### long

Gets the long format of the date, in the default timezone and current locale.

```typescript
long(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedDate = long(new Date()); // "April 11, 2024"
```

---

### full

Gets the full format of the date, in the default timezone and current locale.

```typescript
full(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedDate = full(new Date()); // "Monday, April 11, 2024"
```

---

### year

Gets the numeric year of the date, in the default timezone and current locale.

```typescript
year(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedYear = year(new Date()); // "2024"
```

---

### month

Gets the 2-digit month of the date, in the default timezone and current locale.

```typescript
month(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedMonth = month(new Date()); // "04"
```

---

### monthNumeric

Gets the numeric month of the date, in the default timezone and current locale.

```typescript
monthNumeric(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedMonth = monthNumeric(new Date()); // "4"
```

---

### monthName

Gets the long month of the date, in the default timezone and current locale.

```typescript
monthName(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedMonthName = monthName(new Date()); // "April"
```

---

### day

Gets the 2-digit day of the date, in the default timezone and current locale.

```typescript
day(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedDay = day(new Date()); // "11"
```

---

### dayNumeric

Gets the numeric day of the date, in the default timezone and current locale.

```typescript
dayNumeric(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedDay = dayNumeric(new Date()); // "11"
```

---

### weekday

Gets the long weekday of the date, in the default timezone and current locale.

```typescript
weekday(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedWeekday = weekday(new Date()); // "Monday"
```

---

### hour

Gets the 2-digit hour of the date, in the default timezone and current locale.

```typescript
hour(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedHour = hour(new Date()); // "06"
```

---

### hourNumeric

Gets the numeric hour of the date, in the default timezone and current locale.

```typescript
hourNumeric(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedHour = hourNumeric(new Date()); // "6"
```

---

### minute

Gets the 2-digit minutes of the date, in the default timezone and current locale.

```typescript
minute(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedMinute = minute(new Date()); // "09"
```

---

### minuteNumeric

Gets the numeric minutes of the date, in the default timezone and current locale.

```typescript
minuteNumeric(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedMinute = minuteNumeric(new Date()); // "9"
```

---

### second

Gets the 2-digit seconds of the date, in the default timezone and current locale.

```typescript
second(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedSecond = second(new Date()); // "12"
```

---

### secondNumeric

Gets the numeric seconds of the date, in the default timezone and current locale.

```typescript
secondNumeric(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedSecond = secondNumeric(new Date()); // "12"
```

---

### time

Gets the short time of the date, in the default timezone and current locale.

```typescript
time(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedTime = time(new Date()); // "06:09 AM"
```

---

### time24h

Gets the short time of the date in 24h format, in the default timezone.

```typescript
time24h(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedTime = time24h(new Date()); // "06:09"
```

---

### yyyymmdd

Formats the date into the ISO format, in the default timezone.

```typescript
yyyymmdd(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedDate = yyyymmdd(new Date()); // "2024-04-11"
```

---

### yyyymmddLocal

Formats the date into the ISO format, in the USER'S timezone.

```typescript
yyyymmddLocal(date: Date, options: FormatDateOptions = {}): string
```

Example Output:

```typescript
const formattedDate = yyyymmddLocal(new Date()); // "2024-04-11"
```

## price

This modules exports a `formatPrice` wrapper around Intl.NumberFormat that returns the formatted
price string.

## humanDuration

Formats a duration in minute into something more easier to read.

## humanSize

Makes it easy to format and display sizes in bytes in a human friendly way. It provides a chain-able
api for the limit and precision options.

## relativeTime

This module provides functions to format a date relative to now. It uses the Intl.RelativeTimeFormat
API, which is not supported by all browsers. It will default to `toLocaleString()` if the API is not
supported or an error occurs.

The major feature in this module is the ability to detect the proper unit to use based on the
difference between the date and now. For example, if the difference is 1 day, it will use the `day`
unit, but if the difference is 1 hour, it will use the `hour` unit. This is done by providing a list
of units to use, and the maximum difference for each unit. The units are also skewed to make the
difference more human readable. For example, the `day` unit will be used even if the difference is
less than 1 day, but close to it.

It supports 3 api:

1.  `formatRelativeTime(date, options, unit, locale, now)`: formats the date relative to now, using
    the given options, unit and locale. You can also set the `now` date, which defaults to
    `new Date()`.
2.  `relativeTime(options, unit, locale, now)`: creates a formatter for the given options, unit,
    locale and now date. It returns a chainable object that allows you to set the unit, locale and
    now date, and then format a date.
3.  `timeAgo(date)`: formats the date relative to now, using the default options, unit and locale.
    This is probably the most common use case, so it's provided as a convenience.

## translations

The translations needed for `humanDuration`, `humanSize` and `relativeTime`.
