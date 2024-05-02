export const DEFAULT_DATE_MARKER = '%request.date%';
/**
 * Replaces a marker in the html response with the current date.
 */
export const date = (options) => {
    const marker = options?.marker || DEFAULT_DATE_MARKER;
    return ({ event, resolve }) => {
        return resolve(event, {
            transformPageChunk: ({ html }) => html.replace(marker, new Date().toUTCString())
        });
    };
};
