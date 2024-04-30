# Copyright

```sh
pnpm i @288-toolkit/copyright
```

Outputs a website copyright in a standardized way. The publish year is the year the site was put
online. If the current year is greater, the output will automatically be updated to display a range
of year.

```svelte
<Copyright as="small" orgName="288 inc." publishYear={2022} />
```

## Props

-   `publishYear` (`number`): The year the website was put online.
-   `orgName` (`string`): The organization name to display in the copyright.
-   `as` (`string`): The element to use for the copyright. DEFAULT: `small`.
