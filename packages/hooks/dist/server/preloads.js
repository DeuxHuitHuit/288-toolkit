/**
 * Preloads css, js, and font files.
 */
export const preloads = async ({ event, resolve }) => {
    const response = await resolve(event, {
        preload: ({ type }) => {
            return ['css', 'js', 'font'].includes(type);
        }
    });
    return response;
};
