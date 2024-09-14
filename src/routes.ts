import { Router } from 'express';

import { router as authRouter } from './modules/auth';
import { router as userRouter } from './modules/user';
import { router as taskRouter } from './modules/task';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/tasks', taskRouter);

export default router;
