import z from 'zod';
import { paramIdSchema } from '../../schemas/param_id.schema';
import { baseQuerySchema } from '../../schemas/query.schema';

export const baseUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must have at least 2 characters.')
      .max(50, 'Name can only have 50 characters at most.'),
    email: z.string().email('Invalid email.'),
    password: z
      .string()
      .min(8, 'Password must have at least 8 characters.')
      .max(16, 'Password exceeds a maximum of 16 characters.'),
  }),
});

export type BaseUserDto = z.infer<typeof baseUserSchema>;

export const getUserSchema = paramIdSchema;

export type GetUserDto = z.infer<typeof getUserSchema>;

export const getUsersSchema = baseQuerySchema;
