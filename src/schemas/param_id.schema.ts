import z from 'zod';

export const paramIdSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().nonnegative(),
  }),
});

export type ParamIdDto = z.infer<typeof paramIdSchema>;
