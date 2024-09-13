import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/modules/**/*.entity.js'], // TODO::make sure your entity files follow this convention
  migrations: ['src/db/migrations/*.js'],
  synchronize: ['local', 'testing'].includes(process.env.NODE_ENV ?? 'local'),
  ssl: {
    rejectUnauthorized: ![
      'local',
      'testing',
      'development',
      'staging',
    ].includes(process.env.NODE_ENV ?? 'local'),
  },
});
