import { Task } from './task.entity';
export class TaskRepository {
  async findTasks(): Promise<Task[]> {
    return Task.find();
  }

  async findTaskById(id: number): Promise<Task | undefined> {
    return Task.findOne({ id });
  }

  async createTask(data: Task): Promise<Task> {
    return Task.create(data);
  }

  async updateTask(id: number, task: Partial<Task>): Promise<Task | undefined> {
    await Task.update(id, task);
    return Task.findOne({ id });
  }

  async deleteTask(id: number): Promise<void> {
    await Task.delete(id);
  }
}
