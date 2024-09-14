import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../classes/error';
import { ZodError, ZodSchema } from 'zod';

export const validateSchema = (schema: ZodSchema) => {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      const result = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      req.body = result.body;
      req.params = result.params || {};
      req.query = result.query || {};

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const { issues } = error;

        const currentIssue = issues[0];
        const { path, message } = currentIssue;
        const errorPath = path.join('.');

        next(
          ApiError.badRequest(
            `${errorPath} is ${message.toLowerCase()}`,
            error.format()
          )
        );
      } else {
        next(error);
      }
    }
  };
};
