import { taskErrors } from '../../errors';
import { ApiError } from '../../classes/error';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { GetTasksDto } from './types';

export class TaskUseCase {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async findTasks(
    query: GetTasksDto
  ): Promise<{ tasks: Task[]; count: number }> {
    return await this.taskService.findTasks(query);
  }

  async findTaskById(id: number): Promise<Task | undefined> {
    const data = await this.taskService.findTaskById(id);
    if (!data) throw ApiError.badRequest(taskErrors.TASK_NOT_FOUND);
    return data;
  }

  async createTask(data: Task): Promise<Task> {
    return await this.taskService.createTask(data);
  }

  async updateTask(id: number, data: Partial<Task>): Promise<Task | undefined> {
    const task = await this.taskService.updateTask(id, data);
    if (!task) throw ApiError.badRequest(taskErrors.TASK_NOT_FOUND);
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    await this.findTaskById(id);
    await this.taskService.deleteTask(id);
  }
}
