/* eslint-disable no-console */
import { Request, Response } from 'express';
import { ApiError } from '../classes/error';
import { sendFailedResponse } from '../utils';
import { globalErrors } from '../errors';

export const errorHandler = (error: Error, _: Request, res: Response) => {
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
