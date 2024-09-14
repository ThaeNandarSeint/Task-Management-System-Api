import z from 'zod';

export const baseQuerySchema = z.object({
  query: z
    .object({
      sort: z.string().default('id'),
      skip: z.coerce.number().int().nonnegative().default(0),
      limit: z.coerce.number().int().nonnegative().default(10),
      search: z.string().optional(),
    })
    .strict(),
});

export type BaseQueryDto = z.infer<typeof baseQuerySchema>;
