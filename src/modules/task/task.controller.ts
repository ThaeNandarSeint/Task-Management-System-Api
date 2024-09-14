import { Request, Response } from 'express';
import { TaskUseCase } from './task.usecase';
import { sendSuccessResponse } from '../../utils';
import { GetTasksDto } from './types';
import { AuthRequest } from '../../interfaces';
import { Task } from './task.entity';
export class TaskController {
  private taskUseCase: TaskUseCase;

  constructor() {
    this.taskUseCase = new TaskUseCase();
  }

  async findTasks(req: Request, res: Response): Promise<void> {
    const data = await this.taskUseCase.findTasks({
      userId: (req as unknown as AuthRequest)?.user?.id,
      ...req.query,
    } as unknown as GetTasksDto);
    sendSuccessResponse({
      res,
      data,
    });
  }

  async findTaskById(req: Request, res: Response): Promise<void> {
    const data = await this.taskUseCase.findTaskById(+req.params.id);
    sendSuccessResponse({
      res,
      data,
    });
  }

  async createTask(req: Request, res: Response): Promise<void> {
    const data = await this.taskUseCase.createTask({
      ...req.body,
      userId: (req as unknown as AuthRequest)?.user?.id,
    } as Task);
    sendSuccessResponse({
      res,
      data,
    });
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    const data = await this.taskUseCase.updateTask(+req.params.id, req.body);
    sendSuccessResponse({
      res,
      data,
    });
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    await this.taskUseCase.deleteTask(+req.params.id);
    sendSuccessResponse({
      res,
      data: null,
    });
  }
}
