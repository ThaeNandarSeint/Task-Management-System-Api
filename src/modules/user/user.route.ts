import { Router } from 'express';
import { catchAsync } from '../../utils';
import { UserController } from './user.controller';
import { authenticate, validateSchema } from '../../middlewares';
import { getUsersSchema } from './user.schema';

const router = Router();

const userController = new UserController();

router.use(authenticate);

router.get(
  '/',
  validateSchema(getUsersSchema),
  catchAsync((req, res) => userController.findUsers(req, res))
);

router.get(
  '/me',
  catchAsync((req, res) => userController.getMyInfo(req, res))
);

router.patch(
  '/me',
  catchAsync((req, res) => userController.updateMyProfile(req, res))
);

export { router };
