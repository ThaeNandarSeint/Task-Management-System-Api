import { UserRepository } from '../modules/user';
import { ApiError } from '../classes/error';
import { verifyToken } from '../libs/jwt';
import { catchAsync } from '../utils';
import { AuthRequest } from '../interfaces';

export const authenticate = catchAsync(async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    throw ApiError.notAuthenticated();
  }

  const [, token] = bearerToken.split(' ');

  if (!token) {
    throw ApiError.notAuthenticated();
  }

  const decoded = await verifyToken(token);

  const { userId } = decoded as unknown as { userId: number };

  const userRepository = new UserRepository();

  const user = await userRepository.findUserById(userId);

  if (!user || !user.isActive) {
    throw ApiError.notAuthenticated();
  }

  (req as unknown as AuthRequest).user = user;

  next();
});
