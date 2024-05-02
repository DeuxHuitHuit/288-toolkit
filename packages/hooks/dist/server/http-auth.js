import { toBase64 } from '@288-toolkit/strings';
/**
 * HTTP Basic Auth middleware.
 */
export const httpAuth = ({ authString, enabled }) => {
    return async ({ event, resolve }) => {
        if (!authString || enabled === false) {
            return resolve(event);
        }
        const base64 = toBase64(authString);
        const authHeader = event.request.headers.get('Authorization');
        // No auth, request one
        if (!authHeader) {
            return new Response('Unauthorized', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'Basic'
                }
            });
        }
        // Bad auth, request again
        if (authHeader !== `Basic ${base64}`) {
            return new Response('Forbidden', {
                status: 401
            });
        }
        // Authenticated
        return resolve(event);
    };
};
