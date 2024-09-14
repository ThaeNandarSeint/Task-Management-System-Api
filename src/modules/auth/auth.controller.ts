import { Request, Response } from 'express';
import { sendSuccessResponse } from '../../utils';
import { AuthUseCase } from './auth.usecase';

export class AuthController {
  private authUseCase: AuthUseCase;

  constructor() {
    this.authUseCase = new AuthUseCase();
  }

  async register(req: Request, res: Response): Promise<void> {
    const data = await this.authUseCase.register(req.body);
    sendSuccessResponse({
      res,
      data,
    });
  }
}
