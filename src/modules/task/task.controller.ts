import { Request, Response } from 'express';
import { TaskUseCase } from './task.usecase';
import { sendSuccessResponse } from '../../utils';

export class TaskController {
  private useCase: TaskUseCase;

  constructor() {
    this.useCase = new TaskUseCase();
  }

  async findTasks(req: Request, res: Response): Promise<void> {
    const data = await this.useCase.findTasks();
    sendSuccessResponse({
      res,
      data,
    });
  }

  async findTaskById(req: Request, res: Response): Promise<void> {
    const task = await this.useCase.findTaskById(+req.params.id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  }

  async createTask(req: Request, res: Response): Promise<void> {
    const data = await this.useCase.createTask(req.body);
    sendSuccessResponse({
      res,
      data,
    });
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    const task = await this.useCase.updateTask(+req.params.id, req.body);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    await this.useCase.deleteTask(+req.params.id);
    res.status(204).send();
  }
}
