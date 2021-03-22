const fs = require('fs-extra');
const path = require('path');

const dir = process.argv[2];
const src = path.resolve('docs', dir, dir, 'static');
const dest = path.resolve('docs', dir, 'static');
fs.moveSync(src, dest);
