/**
 * Check if a request should not have a body
 * @param request - The request to check
 * @returns True if the request should not have a body, false otherwise
 */
export const isWithoutBody = (request: Request) => {
	return ['GET', 'HEAD'].includes(request.method);
};
