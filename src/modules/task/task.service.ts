import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

export class TaskService {
  private repository: TaskRepository;

  constructor() {
    this.repository = new TaskRepository();
  }

  async findTasks(): Promise<Task[]> {
    return this.repository.findTasks();
  }

  async findTaskById(id: number): Promise<Task | undefined> {
    return this.repository.findTaskById(id);
  }

  async createTask(data: Task): Promise<Task> {
    return this.repository.createTask(data);
  }

  async updateTask(
    id: number,
    taskUpdates: Partial<Task>
  ): Promise<Task | undefined> {
    return this.repository.updateTask(id, taskUpdates);
  }

  async deleteTask(id: number): Promise<void> {
    await this.repository.deleteTask(id);
  }
}
