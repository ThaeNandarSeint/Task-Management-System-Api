/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../classes/error';
import { sendFailedResponse } from '../utils';
import { globalErrors } from '../errors';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error.stack);
  if (error instanceof ApiError) {
    sendFailedResponse({ res, error });
  } else {
    res.status(500).json({
      code: 500,
      message: globalErrors.SERVER_FALSE,
      data: null,
    });
  }
};
