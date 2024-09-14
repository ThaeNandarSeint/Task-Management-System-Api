/* eslint-disable no-console */
import { User } from '../modules/user';
import { Task } from '../modules/task';
import { createConnection } from 'typeorm';

export const connectDatabase = async () => {
  try {
    await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Task, User],
      migrations: ['src/db/migrations/*.js'],
      synchronize: ['local', 'testing'].includes(
        process.env.NODE_ENV ?? 'local'
      ),
      ssl: {
        rejectUnauthorized: ![
          'local',
          'testing',
          'development',
          'staging',
        ].includes(process.env.NODE_ENV ?? 'local'),
      },
    });

    console.log('Connected to Database.');
  } catch (error) {
    console.log('Error while connecting to MongoDB');
    console.error(error);
  }
};
