import { Request, Response } from 'express';
import { UserUseCase } from './user.usecase';
import { sendSuccessResponse } from '../../utils';
import { GetUsersDto } from './types';
import { AuthRequest } from '@/interfaces';

export class UserController {
  private userUseCase: UserUseCase;

  constructor() {
    this.userUseCase = new UserUseCase();
  }

  async getMyInfo(req: Request, res: Response): Promise<void> {
    const data = await this.userUseCase.findUserById(
      (req as unknown as AuthRequest)?.user?.id as number
    );
    sendSuccessResponse({
      res,
      data,
    });
  }

  async findUsers(req: Request, res: Response): Promise<void> {
    const data = await this.userUseCase.findUsers(
      req.query as unknown as GetUsersDto
    );
    sendSuccessResponse({
      res,
      data,
    });
  }

  async findUserById(req: Request, res: Response): Promise<void> {
    const data = await this.userUseCase.findUserById(+req.params.id);
    sendSuccessResponse({
      res,
      data,
    });
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const data = await this.userUseCase.updateUser(+req.params.id, req.body);
    sendSuccessResponse({
      res,
      data,
    });
  }

  async updateMyProfile(req: Request, res: Response): Promise<void> {
    const data = await this.userUseCase.updateUser(
      (req as unknown as AuthRequest)?.user?.id as number,
      req.body
    );
    sendSuccessResponse({
      res,
      data,
    });
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    await this.userUseCase.deleteUser(+req.params.id);
    sendSuccessResponse({
      res,
      data: null,
    });
  }
}
