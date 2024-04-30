export const vimeoThumbnailHandler = (async ({ url }) => {
    const IMAGE_FORMAT_REGEX = /_\d{1,4}x?\d{1,4}$/g;
    const videoUrl = url.searchParams.get('url');
    const width = url.searchParams.get('width');
    const height = url.searchParams.get('height');
    try {
        const res = await fetch(`https://vimeo.com/api/oembed.json?url=${videoUrl}`);
        if (!res.ok) {
            return new Response(null, { status: res.status });
        }
        const data = await res.json();
        let thumbnailUrl = data?.thumbnail_url;
        if (!thumbnailUrl) {
            return new Response(null, { status: 404 });
        }
        if (width) {
            const format = `_${width}${height ? `x${height}` : ''}`;
            thumbnailUrl = thumbnailUrl.replace(IMAGE_FORMAT_REGEX, format);
        }
        const thumbRes = await fetch(thumbnailUrl);
        return new Response(thumbRes.body, thumbRes);
    }
    catch (error) {
        console.error(error);
        return new Response(null, { status: 500 });
    }
});
