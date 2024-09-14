import { Router } from 'express';
import { catchAsync } from '../../utils';
import { TaskController } from './task.controller';
import { authenticate, validateSchema } from '../../middlewares';
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  getTasksSchema,
  updateTaskSchema,
} from './task.schema';

const router = Router();

const taskController = new TaskController();

router.use(authenticate);

router.get(
  '/',
  validateSchema(getTasksSchema),
  catchAsync((req, res) => taskController.findTasks(req, res))
);

router.get(
  '/:id',
  validateSchema(getTaskSchema),
  catchAsync((req, res) => taskController.findTaskById(req, res))
);

router.post(
  '/',
  validateSchema(createTaskSchema),
  catchAsync((req, res) => taskController.createTask(req, res))
);

router.patch(
  '/:id',
  validateSchema(updateTaskSchema),
  catchAsync((req, res) => taskController.updateTask(req, res))
);

router.delete(
  '/:id',
  validateSchema(deleteTaskSchema),
  catchAsync((req, res) => taskController.deleteTask(req, res))
);

export { router };
