/* eslint-disable no-console */
import { AppDataSource } from '../db/data-source';

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();

    console.log('Connected to Database.');
  } catch (error) {
    console.log('Error while connecting to MongoDB');
    console.error(error);
  }
};
