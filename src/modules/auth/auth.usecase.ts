import { authErrors, userErrors } from '../../errors';
import { ApiError } from '../../classes/error';
import { User, UserService } from '../user';
import { AuthService } from './auth.service';

export class AuthUseCase {
  private userService: UserService;
  private authService: AuthService;

  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  async register(
    data: User
  ): Promise<{ user: User; token: string | undefined }> {
    const existingUser = await this.userService.findUserByUniqueField({
      email: data.email,
    });

    if (existingUser) throw ApiError.badRequest(userErrors.USER_ALREADY_EXIST);

    const user = await this.userService.createUser(data);

    const token = await this.authService.generateToken({ userId: user.id });

    return { user, token };
  }

  async login({
    email,
    password,
  }: User): Promise<{ user: User; token: string | undefined }> {
    const user = await this.userService.findUserByUniqueField({
      email,
    });

    if (!user) {
      throw ApiError.badRequest(authErrors.WRONG_CREDENTIALS);
    }

    const isCorrectPassword = await this.authService.verifyPassword(
      password,
      user.password
    );

    if (!isCorrectPassword)
      throw ApiError.badRequest(authErrors.WRONG_CREDENTIALS);

    const token = await this.authService.generateToken({ userId: user.id });

    return { user, token };
  }
}
