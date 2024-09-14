import { FindManyOptions, ILike } from 'typeorm';
import { User } from './user.entity';
import { GetUsersDto } from './types';

export class UserRepository {
  async findUsers({
    search,
    limit,
    skip,
    sort,
  }: GetUsersDto): Promise<{ users: User[]; count: number }> {
    const where: FindManyOptions<User>['where'] = [];

    if (search) {
      where.push({
        name: ILike(`%${search}%`),
      });
    }

    const [users, count] = await User.findAndCount({
      where,
      take: limit,
      skip,
      order: {
        [sort ?? 'id']: 'desc',
      },
    });

    return { users, count };
  }

  async findUserById(id: number): Promise<User | undefined> {
    return User.findOne({ id });
  }

  async findUserByUniqueField(data: {
    [key: string]: unknown;
  }): Promise<User | undefined> {
    return User.findOne(data);
  }

  async createUser(task: User): Promise<User> {
    return User.save(task);
  }

  async updateUser(id: number, task: Partial<User>): Promise<User | undefined> {
    await User.update(id, task);
    return User.findOne({ id });
  }

  async deleteUser(id: number): Promise<void> {
    await User.delete(id);
  }
}
