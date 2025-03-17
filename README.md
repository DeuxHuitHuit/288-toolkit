# 288 Toolkit

This is a collection of package that Deux Huit Huit uses to build websites. They are meant to be
used with Svelte, Sveltekit and Craft CMS.

## Packages

-   [@288-toolkit/animations](./packages/animations/README.md)
-   [@288-toolkit/arrays](./packages/arrays/README.md)
-   [@288-toolkit/base64-filters](./packages/base64-filters/README.md)
-   [@288-toolkit/component-loader](./packages/component-loader/README.md)
-   [@288-toolkit/components](./packages/components/README.md)
    -   [@288-toolkit/components/back-to-top](./packages/components/back-to-top/README.md)
    -   [@288-toolkit/components/cookie-popup](./packages/components/cookie-popup/README.md)
    -   [@288-toolkit/components/copyright](./packages/components/copyright/README.md)
    -   [@288-toolkit/components/dev-error-page](./packages/components/dev-error-page/README.md)
    -   [@288-toolkit/components/dismissable](./packages/components/dismissable/README.md)
    -   [@288-toolkit/components/html-elements](./packages/components/html-elements/README.md)
    -   [@288-toolkit/components/marquee](./packages/components/marquee/README.md)
    -   [@288-toolkit/components/minimap](./packages/components/minimap/README.md)
    -   [@288-toolkit/components/pagination](./packages/components/pagination/README.md)
    -   [@288-toolkit/components/slideshow](./packages/components/slideshow/README.md)
    -   [@288-toolkit/components/sprite-animation](./packages/components/sprite-animation/README.md)
    -   [@288-toolkit/components/video-embed](./packages/components/video-embed/README.md)
-   [@288-toolkit/css](./packages/css/README.md)
-   [@288-toolkit/dates](./packages/dates/README.md)
-   [@288-toolkit/device](./packages/device/README.md)
-   [@288-toolkit/format](./packages/format/README.md)
-   [@288-toolkit/forms](./packages/forms/README.md)
-   [@288-toolkit/functions](./packages/functions/README.md)
-   [@288-toolkit/graphql](./packages/graphql/README.md)
-   [@288-toolkit/hooks](./packages/hooks/README.md)
-   [@288-toolkit/html-parser](./packages/html-parser/README.md)
-   [@288-toolkit/http](./packages/http/README.md)
-   [@288-toolkit/i18n](./packages/i18n/README.md)
-   [@288-toolkit/math](./packages/math/README.md)
-   [@288-toolkit/page-transition](./packages/page-transition/README.md)
-   [@288-toolkit/shares](./packages/shares/README.md)
-   [@288-toolkit/strings](./packages/strings/README.md)
-   [@288-toolkit/timeout](./packages/timeout/README.md)
-   [@288-toolkit/typed-context](./packages/typed-context/README.md)
-   [@288-toolkit/types](./packages/types/README.md)
-   [@288-toolkit/ui](./packages/ui/README.md)
-   [@288-toolkit/url](./packages/url/README.md)
-   [@288-toolkit/vite-plugin-svelte-inline-component](./packages/vite-plugin-svelte-inline-component/README.md)
-   [@288-toolkit/vite-plugin-svelte-replacers](./packages/vite-plugin-svelte-replacers/README.md)

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

-   Run `pnpm build` to build the packages.

-   Run `pnpm changeset` then follow the instructions. This will generate a new changeset.

-   Run `pnpm changeset version`. This will update changed packages versions and changelogs.

-   Commit everything and push to your branch. Once the branch is merged into main, the package will
    automatically get published to npm.



## License

This package is part of the 288-toolkit collection, developed by [Deux Huit Huit](https://deuxhuithuit.com/).

See the [LICENSE](./LICENSE) file for more information.
