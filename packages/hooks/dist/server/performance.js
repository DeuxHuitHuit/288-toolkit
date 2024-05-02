let id = 0;
/**
 * Adds custom headers to the response to measure the performance of requests.
 */
export const performanceHeaders = async ({ event, resolve }) => {
    const start = Date.now();
    const response = await resolve(event);
    response.headers.set('x-request-id', (id++).toString());
    response.headers.set('x-response-time', `${Date.now() - start}ms`);
    return response;
};
