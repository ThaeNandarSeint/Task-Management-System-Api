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
