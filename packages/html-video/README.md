# Html-video

```sh
pnpm i @288-toolkit/html-video
```

A convenient wrapper around an html video element.

-   Automatically adds `playsinline` if `autoplay` is `true`.
-   Automatically adds `disableremoteplayback` (can be removed by passing
    `disableremoteplayback={false}`)
-   Automatically manages `x-webkit-airplay` attribute.
