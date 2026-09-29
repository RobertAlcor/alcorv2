const fs = require('node:fs');
const {createHash} = require('node:crypto');
const manifest = require('./release-manifest.json');
let errors = 0;
for (const [file, expected] of Object.entries(manifest)) {
  const actual = createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  if (actual !== expected) { console.error('CHECKSUM MISMATCH:', file, actual); errors++; }
}
if (errors) process.exit(1);
console.log(`Release verification: ${Object.keys(manifest).length} corrected source files match the locally tested version.`);
