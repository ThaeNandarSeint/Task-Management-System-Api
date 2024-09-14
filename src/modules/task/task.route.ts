import { Router } from 'express';
import { catchAsync } from '../../utils';
import { TaskController } from './task.controller';

const router = Router();

const taskController = new TaskController();

router.get(
  '/',
  catchAsync((req, res) => taskController.findTasks(req, res))
);

export { router };
