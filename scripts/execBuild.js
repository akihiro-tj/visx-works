const { execSync } = require('child_process');

const dir = process.argv[2];
execSync(`node scripts/build.js ${dir}`);
execSync(`node scripts/postBuild.js ${dir}`);
