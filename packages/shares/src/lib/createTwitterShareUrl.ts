/**
 * Create a Twitter share URL
 */
export const createTwitterShareUrl = (url: string) => {
	return `https://twitter.com/intent/tweet?url=${url}`;
};
