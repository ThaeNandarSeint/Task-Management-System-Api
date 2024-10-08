import { FindManyOptions, ILike } from 'typeorm';
import { Task } from './task.entity';
import { GetTasksDto } from './types';
export class TaskRepository {
  async findTasks({
    search,
    limit,
    skip,
    sort,
    userId,
  }: GetTasksDto): Promise<{ tasks: Task[]; count: number }> {
    const where: FindManyOptions<Task>['where'] = [];

    if (search) {
      where.push({
        title: ILike(`%${search}%`),
      });
    }

    if (userId) {
      where.push({
        userId,
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
    return await Task.findOne({ id });
  }

  async createTask(data: Task): Promise<Task> {
    return await Task.save(data);
  }

  async updateTask(id: number, task: Partial<Task>): Promise<Task | undefined> {
    await Task.update(id, task);
    return await Task.findOne({ id });
  }

  async deleteTask(id: number): Promise<void> {
    await Task.delete(id);
  }
}
