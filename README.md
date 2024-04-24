# 288 Toolkit

[!IMPORTANT] These packages only export typescript and svelte files. It is on the consumer of the
packages to compile those files to javascript.

This is a collection of package that Deux Huit Huit uses to build websites. They are meant to be
used with Svelte, Sveltekit and Craft CMS.

## Packages

-   [@288-toolkit/dates](./packages/dates/README.md)
-   [@288-toolkit/format](./packages/format/README.md)
-   [@288-toolkit/forms](./packages/forms/README.md)
-   [@288-toolkit/http](./packages/http/README.md)
-   [@288-toolkit/i18n](./packages/i18n/README.md)
-   [@288-toolkit/pagination](./packages/pagination/README.md)
-   [@288-toolkit/slideshow](./packages/slideshow/README.md)
-   [@288-toolkit/timeout](./packages/timeout/README.md)
-   [@288-toolkit/typed-context](./packages/typed-context/README.md)
-   [@288-toolkit/types](./packages/types/README.md)
-   [@288-toolkit/ui](./packages/ui/README.md)

## Development

### Create a package

To easily create a package:

-   Install pnpm globally:

```sh
npm i -g pnpm
```

-   Clone the repo locally

```sh
git clone https://github.com/DeuxHuitHuit/288-toolkit
```

-   Create a new branch

```sh
git checkout -b <package-name>
```

-   Run the `make-pkg` script:

```sh
pnpm make-pkg
```

This will scaffold a basic workspace inside the `packages` folder.

### Publish a package

-   Run `pnpm changeset` then follow the instructions. This will generate a new changeset.

-   Run `pnpm changeset version`. This will update changed packages versions and changelogs.

-   Commit everything and push to your branch. Once the branch is merged into main, the package will
    automatically get published to npm.
