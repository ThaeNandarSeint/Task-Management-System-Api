import dotenv from 'dotenv';
dotenv.config();

import { connectDatabase, validateEnvVariables } from './utils';
import app from './app';

(async function () {
  validateEnvVariables();
  await connectDatabase();

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
