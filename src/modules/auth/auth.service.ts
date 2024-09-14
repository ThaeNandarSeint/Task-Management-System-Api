import { generateToken } from '../../libs/jwt';

export class AuthService {
  async generateToken(data: { userId: number }): Promise<string | undefined> {
    return await generateToken(data);
  }
}
