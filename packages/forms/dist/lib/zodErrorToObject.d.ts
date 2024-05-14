import type { z } from 'zod';
export declare const zodErrorToObject: <TError>(zodError: z.ZodError<TError>) => Record<keyof TError, string>;
