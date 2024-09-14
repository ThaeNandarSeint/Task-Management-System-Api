import { Router } from 'express';
import { catchAsync } from '../../utils';
import { AuthController } from './auth.controller';

const router = Router();

const authController = new AuthController();

router.post(
  '/register',
  catchAsync((req, res) => authController.register(req, res))
);

export { router };
