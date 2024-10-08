import express from 'express';
import cors from 'cors';
import { ApiError } from './classes/error';
import { errorHandler } from './middlewares';
import router from './routes';
const app = express();

app.use(
  cors({
    origin: (_, callback) => callback(null, true),
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(['/', '/api'], (req, res) => {
  res.send(`Task Management System API - ${process.env.NODE_ENV}`);
});

app.use('/api', router);

app.all('*', (req, res, next) => {
  next(ApiError.notFound());
});

app.use(errorHandler);

export default app;
