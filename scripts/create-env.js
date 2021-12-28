const fs = require('fs');

fs.writevSync('./.env', `API=${process.env.API}\n`);