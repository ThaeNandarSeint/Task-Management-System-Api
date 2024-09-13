import express from 'express';
import cors from 'cors';
import { ApiError } from './classes/error';
import { errorHandler } from './middlewares';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(['/', '/api'], (req, res) => {
  res.send(`Social Media API - ${process.env.NODE_ENV}`);
});

// app.use('/api', router);

app.all('*', (req, res, next) => {
  next(ApiError.notFound());
});

app.use(errorHandler);

export default app;
