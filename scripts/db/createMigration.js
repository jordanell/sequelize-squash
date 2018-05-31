import path from 'path';

import { spawn } from 'child-process-promise';

import 'src/initialize';

const spawnOptions = { cwd: path.join(__dirname, '../..'), stdio: 'inherit' };

(async () => {
  try {
    await spawn('./node_modules/.bin/sequelize', ['migration:create', '--name', process.argv[2], `--url=${process.env.POSTGRES_SERVICE_URL}`], spawnOptions);
    console.log('*************************');
    console.log('Migration creation successful');
  } catch (err) {
    console.log('*************************');
    console.log('Migration creation failed. Error:', err.message);
  }

  process.exit(0);
})();
