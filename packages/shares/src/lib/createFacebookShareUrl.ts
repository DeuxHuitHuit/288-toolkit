/**
 * Create a Facebook share URL
 */
export const createFacebookShareUrl = (url: string) => {
	return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
};
