import { FindManyOptions, ILike } from 'typeorm';
import { Task } from './task.entity';
import { GetTasksDto } from './types';
export class TaskRepository {
  async findTasks({
    search,
    limit,
    skip,
    sort,
  }: GetTasksDto): Promise<{ tasks: Task[]; count: number }> {
    const where: FindManyOptions<Task>['where'] = [];

    if (search) {
      where.push({
        username: ILike(`%${search}%`),
      });
    }

    const [tasks, count] = await Task.findAndCount({
      where,
      take: limit,
      skip,
      order: {
        [sort ?? 'id']: 'desc',
      },
    });

    return { tasks, count };
  }

  async findTaskById(id: number): Promise<Task | undefined> {
    return Task.findOne({ id });
  }

  async createTask(data: Task): Promise<Task> {
    return Task.save(data);
  }

  async updateTask(id: number, task: Partial<Task>): Promise<Task | undefined> {
    await Task.update(id, task);
    return Task.findOne({ id });
  }

  async deleteTask(id: number): Promise<void> {
    await Task.delete(id);
  }
}
