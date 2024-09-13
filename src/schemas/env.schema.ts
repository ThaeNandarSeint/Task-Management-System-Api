import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional(),
  NODE_ENV: z.enum(['local', 'development', 'production'], {
    required_error: 'NODE_ENV is missing.',
  }),
  DATABASE_URL: z.string({
    required_error: 'DATABASE_URL is missing.',
  }),
});
