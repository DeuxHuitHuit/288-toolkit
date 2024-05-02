/**
 * Returns true if the response is a redirect response.
 * Credit: https://github.com/remix-run/remix/blob/776cb79b97bdfba42f802c2f583b1ec5d4dcb785/packages/remix-server-runtime/responses.ts#L58
 */
const redirectStatusCodes = new Set([301, 302, 303, 307, 308]);
export const isRedirectResponse = (response: Response): boolean => {
	return redirectStatusCodes.has(response.status) && response.headers.has('location');
};
