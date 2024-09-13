import { Request, Response, NextFunction } from 'express';

type AsyncCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

/**
 * Wraps an asynchronous callback function to handle errors in Express routes.
 * @param callback - The asynchronous function to wrap.
 * @returns A function that catches any errors and passes them to the next middleware.
 */
export const catchAsync = (callback: AsyncCallback) => {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
};
