import { ApiError } from '../classes/error';
import { authErrors } from '../errors';
import jwt from 'jsonwebtoken';

export const generateToken = (payload: {
  userId: number;
}): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
};

export const verifyToken: (
  token: string,
  errorMessages?: { [key: string]: string }
) => Promise<unknown> = (
  token: string,
  errorMessages = {
    invalid: authErrors.INVALID_TOKEN,
    expired: authErrors.TOKEN_EXPIRED,
  }
) => {
  return new Promise((resolve, reject) => {
    if (typeof token !== 'string') {
      reject(ApiError.notAuthenticated(errorMessages.expired));
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET ?? '',
      {},
      (error, decoded) => {
        if (error) {
          if (error.name === 'TokenExpiredError') {
            reject(ApiError.notAuthenticated(errorMessages.expired));
          } else {
            reject(ApiError.notAuthenticated(errorMessages.invalid));
          }
        }

        resolve(decoded);
      }
    );
  });
};
