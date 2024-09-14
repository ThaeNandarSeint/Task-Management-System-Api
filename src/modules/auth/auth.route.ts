import { Router } from 'express';
import { catchAsync } from '../../utils';
import { AuthController } from './auth.controller';
import { validateSchema } from '../../middlewares';
import { loginSchema, registerSchema } from './auth.schema';

const router = Router();

const authController = new AuthController();

router.post(
  '/register',
  validateSchema(registerSchema),
  catchAsync((req, res) => authController.register(req, res))
);

router.post(
  '/login',
  validateSchema(loginSchema),
  catchAsync((req, res) => authController.login(req, res))
);

export { router };
