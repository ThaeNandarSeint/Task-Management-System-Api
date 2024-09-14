import z from 'zod';
import { baseUserSchema } from '../user';

export const registerSchema = z.object({
  body: baseUserSchema.shape.body.strict(),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  body: baseUserSchema.shape.body.pick({
    email: true,
    password: true,
  }),
});

export type LoginDto = z.infer<typeof loginSchema>;
