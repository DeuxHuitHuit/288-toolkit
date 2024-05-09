import type { z } from 'zod';

export const zodErrorToObject = <TError>(zodError: z.ZodError<TError>) => {
	const fieldErrors = zodError.flatten().fieldErrors;
	const errors = Object.fromEntries(
		Object.entries<string[] | undefined>(fieldErrors).map(([key, value]) => [
			key,
			value?.[0] ?? ''
		])
	) as Record<keyof TError, string>;
	return errors;
};
