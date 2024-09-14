import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { GetTasksDto } from './types';

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async findTasks(
    query: GetTasksDto
  ): Promise<{ tasks: Task[]; count: number }> {
    return this.taskRepository.findTasks(query);
  }

  async findTaskById(id: number): Promise<Task | undefined> {
    return this.taskRepository.findTaskById(id);
  }

  async createTask(data: Task): Promise<Task> {
    const taskId = await this.generateCustomId();
    return this.taskRepository.createTask({ ...data, taskId } as Task);
  }

  async updateTask(
    id: number,
    taskUpdates: Partial<Task>
  ): Promise<Task | undefined> {
    return this.taskRepository.updateTask(id, taskUpdates);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.deleteTask(id);
  }

  private async generateCustomId() {
    const { tasks } = await this.taskRepository.findTasks({
      sort: 'id',
      limit: 1,
      skip: 0,
    });
    const lastTask = tasks[0];

    if (!lastTask || !lastTask.taskId) {
      return 'T1';
    }

    return `T${Number(lastTask.taskId.replace('T', '')) + 1}`;
  }
}
