import { User } from './user.entity';
import { GetUsersDto } from './types';
import { UserService } from './user.service';
import { ApiError } from '../../classes/error';
import { userErrors } from '../../errors';

export class UserUseCase {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async findUsers(
    query: GetUsersDto
  ): Promise<{ users: User[]; count: number }> {
    return await this.userService.findUsers(query);
  }

  async findUserById(id: number): Promise<User | undefined> {
    const data = await this.userService.findUserById(id);
    if (!data) throw ApiError.badRequest(userErrors.USER_NOT_FOUND);
    return data;
  }

  async createUser(data: User): Promise<User> {
    return await this.userService.createUser(data);
  }

  async updateUser(
    id: number,
    taskUpdates: Partial<User>
  ): Promise<User | undefined> {
    const data = await this.userService.updateUser(id, taskUpdates);
    if (!data) throw ApiError.badRequest(userErrors.USER_NOT_FOUND);
    return data;
  }

  async deleteUser(id: number): Promise<void> {
    await this.findUserById(id);
    await this.userService.deleteUser(id);
  }
}
