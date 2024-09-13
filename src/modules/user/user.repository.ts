import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AppDataSource } from '@/db/data-source';

export class TaskRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findUsers(): Promise<User[]> {
    return this.repository.find();
  }

  async findUserById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async createUser(task: User): Promise<User> {
    return this.repository.save(task);
  }

  async updateUser(id: number, task: Partial<User>): Promise<User | null> {
    await this.repository.update(id, task);
    return this.repository.findOneBy({ id });
  }

  async deleteUser(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
