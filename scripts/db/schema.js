import { exec } from 'child-process-promise';
import { parseURL } from 'whatwg-url';

import 'src/initialize';

(async () => {
  const parts = parseURL(process.env.POSTGRES_SERVICE_URL);

  console.log('Schema import running');

  exec(`psql -U riipen -d ${parts.path[0]} -c "CREATE SCHEMA ${parts.path[0]}"`)
    .then(() =>
      exec(`psql -U riipen -d ${parts.path[0]} -c "ALTER SCHEMA ${parts.path[0]} OWNER TO ${parts.username};"`)
    )
    .then(() =>
      exec(`psql -U riipen -d ${parts.path[0]} < ./migrations/schema/index.sql`)
    )
    .then(() => {
      console.log('*************************');
      console.log('Schema import successful');
      process.exit(0);
    })
    .catch((err) => {
      console.log('*************************');
      console.log('Schema import failed. Error:', err.message);
      process.exit(1);
    });
})();
