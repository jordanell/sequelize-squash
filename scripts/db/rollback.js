import path from 'path';

import { spawn } from 'child-process-promise';

import 'src/initialize';

const spawnOptions = { cwd: path.join(__dirname, '../..'), stdio: 'inherit' };

(async () => {
  try {
    await spawn('./node_modules/.bin/sequelize', ['db:migrate:undo', `--url=${process.env.POSTGRES_SERVICE_URL}`], spawnOptions);
    console.log('*************************');
    console.log('Migration successful');
  } catch (err) {
    console.log('*************************');
    console.log('Migration failed. Error:', err.message);
  }

  process.exit(0);
})();
