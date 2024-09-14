import { baseQuerySchema, paramIdSchema } from '../../schemas';
import z from 'zod';

export const baseTaskSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Title must have at least 2 characters.'),
  }),
});

export const getTasksSchema = baseQuerySchema;

export const getTaskSchema = paramIdSchema;

export const deleteTaskSchema = paramIdSchema;

export const createTaskSchema = baseTaskSchema;

export const updateTaskSchema = z
  .object({
    body: baseTaskSchema.shape.body
      .pick({
        title: true,
      })
      .partial()
      .merge(
        z.object({
          isCompleted: z.boolean().default(false),
        })
      ),
  })
  .merge(paramIdSchema);
