import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { AppDataSource } from '@/db/data-source';

export class TaskRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async findTasks(): Promise<Task[]> {
    return this.repository.find();
  }

  async findTaskById(id: number): Promise<Task | null> {
    return this.repository.findOneBy({ id });
  }

  async createTask(task: Task): Promise<Task> {
    return this.repository.save(task);
  }

  async updateTask(id: number, task: Partial<Task>): Promise<Task | null> {
    await this.repository.update(id, task);
    return this.repository.findOneBy({ id });
  }

  async deleteTask(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
