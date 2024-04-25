type MailtoParams = {
	email?: string;
	body?: string;
	subject?: string;
	cc?: string;
	bcc?: string;
};

/**
 * Creates a mailto URL with the given parameters.
 */
export const createMailShareUrl = (params: MailtoParams) => {
	const paramsString = new URLSearchParams(params).toString();
	return `mailto:${params.email || ''}${paramsString ? `?${paramsString}` : ''}`;
};
