import { Response } from 'express';
import { ApiError } from '../classes/error';

export const sendFailedResponse = ({
  res,
  error,
}: {
  res: Response;
  error: ApiError;
}) => {
  res.status(error.statusCode).json({
    code: error.statusCode,
    message: error.message,
    data: error.data,
    ...(process.env.NODE_ENV === 'local' ? { stack: error.stack } : undefined),
  });
};

export const sendSuccessResponse = ({
  res,
  data = null,
  message = 'Success',
  code = 200,
}: {
  res: Response;
  data: unknown;
  message: string;
  code: number;
}) => {
  res.status(code).json({
    code,
    data,
    message,
  });
};
