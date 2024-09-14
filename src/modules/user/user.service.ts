import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { GetUsersDto } from './types';
import { hashPassword } from '../../libs/bcrypt';

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async findUsers(
    query: GetUsersDto
  ): Promise<{ users: User[]; count: number }> {
    return this.repository.findUsers(query);
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.repository.findUserById(id);
  }

  async findUserByUniqueField(data: {
    [key: string]: unknown;
  }): Promise<User | undefined> {
    return this.repository.findUserByUniqueField(data);
  }

  async createUser(data: User): Promise<User> {
    const userId = await this.generateCustomUserId();
    const hashedPassword = await this.hashPassword(data.password);

    return this.repository.createUser({
      ...data,
      userId,
      password: hashedPassword,
    } as User);
  }

  async updateUser(
    id: number,
    taskUpdates: Partial<User>
  ): Promise<User | undefined> {
    return this.repository.updateUser(id, taskUpdates);
  }

  async deleteUser(id: number): Promise<void> {
    await this.repository.deleteUser(id);
  }

  private async generateCustomUserId() {
    const { users } = await this.repository.findUsers({
      sort: 'id',
      limit: 1,
      skip: 0,
    });
    const lastUser = users[0];

    if (!lastUser || !lastUser.userId) {
      return 'U1';
    }

    return `U${Number(lastUser.userId.replace('U', '')) + 1}`;
  }

  private async hashPassword(data: string): Promise<string> {
    return await hashPassword(data);
  }
}
