import { Request, Response } from 'express';
import { UserUseCase } from './user.usecase';
import { sendSuccessResponse } from '../../utils';
import { GetUsersDto } from './types';

export class UserController {
  private useCase: UserUseCase;

  constructor() {
    this.useCase = new UserUseCase();
  }

  async findUsers(req: Request, res: Response): Promise<void> {
    const data = await this.useCase.findUsers(
      req.query as unknown as GetUsersDto
    );
    sendSuccessResponse({
      res,
      data,
    });
  }

  async findUserById(req: Request, res: Response): Promise<void> {
    const task = await this.useCase.findUserById(+req.params.id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const task = await this.useCase.updateUser(+req.params.id, req.body);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    await this.useCase.deleteUser(+req.params.id);
    res.status(204).send();
  }
}
