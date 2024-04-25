# Html-time

```sh
pnpm i @288-toolkit/html-time
```

A convenient wrapper component arund the <time> html element.

## Props

-   `date` (`Date`): The date to display
-   `formatOptions` (`FormatDateOptions`): The date formatting options (see
    [format package](../format/README.md))

## Slot props

-   `formattedDate` (`string`): The formatted date

## Examples

```svelte
<Time
	date={new Date('2023-04-17T21:34:50.360Z')}
	formatOptions={{ day: 'numeric', month: 'long', year: 'numeric' }}
/>
```

```svelte
<Time
	date={new Date('2023-04-17T21:34:50.360Z')}
	formatOptions={{ day: 'numeric', month: 'long' }}
	let:formattedDate
>
	<span class="text-[red]">
		{formattedDate}
	</span>
</Time>
```
