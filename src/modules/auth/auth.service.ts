import { verifyPassword } from '../../libs/bcrypt';
import { generateToken } from '../../libs/jwt';

export class AuthService {
  async generateToken(data: { userId: number }): Promise<string | undefined> {
    return await generateToken(data);
  }

  async verifyPassword(plainText: string, encrypted: string): Promise<boolean> {
    return await verifyPassword(plainText, encrypted);
  }
}
