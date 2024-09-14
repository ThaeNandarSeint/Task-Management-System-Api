import { User } from './user.entity';
import { GetUsersDto } from './types';
import { UserService } from './user.service';

export class UserUseCase {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  async findUsers(
    query: GetUsersDto
  ): Promise<{ users: User[]; count: number }> {
    return this.service.findUsers(query);
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.service.findUserById(id);
  }

  async createUser(data: User): Promise<User> {
    return this.service.createUser(data);
  }

  async updateUser(
    id: number,
    taskUpdates: Partial<User>
  ): Promise<User | undefined> {
    return this.service.updateUser(id, taskUpdates);
  }

  async deleteUser(id: number): Promise<void> {
    await this.service.deleteUser(id);
  }
}
