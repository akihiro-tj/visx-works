const fs = require('fs-extra');

const dir = process.argv[2];
const repoName = 'visx-works';
const htmlPath = `docs/${dir}/index.html`;

const src = fs.readFileSync(htmlPath).toString();
const dest = src.replace(/\/static/g, `/${repoName}/${dir}/static`);
fs.writeFile(htmlPath, dest, (err) => {
  if (err) console.log(err);
});
