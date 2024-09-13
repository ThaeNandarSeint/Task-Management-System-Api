/* eslint-disable no-console */
import { ZodError } from 'zod';
import { envSchema } from '../schemas';

export const validateEnvVariables = () => {
  try {
    const runTime = process.env;
    envSchema.parse(runTime);
    console.log('Env variables validation completed.');
  } catch (error) {
    console.log('Env variables validation failed.');
    if (error instanceof ZodError) {
      console.log('Missing/Invalid variables:');
      console.log('##########################');

      error.errors.forEach(({ path }, idx) =>
        console.log(`${idx + 1}. ${path[0]}`)
      );
    }
    process.exit(1);
  }
};
