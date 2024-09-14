import { Task } from './task.entity';
import { TaskService } from './task.service';

export class TaskUseCase {
  private service: TaskService;

  constructor() {
    this.service = new TaskService();
  }

  async findTasks(): Promise<Task[]> {
    return this.service.findTasks();
  }

  async findTaskById(id: number): Promise<Task | undefined> {
    return this.service.findTaskById(id);
  }

  async createTask(data: Task): Promise<Task> {
    return this.service.createTask(data);
  }

  async updateTask(
    id: number,
    taskUpdates: Partial<Task>
  ): Promise<Task | undefined> {
    return this.service.updateTask(id, taskUpdates);
  }

  async deleteTask(id: number): Promise<void> {
    await this.service.deleteTask(id);
  }
}
