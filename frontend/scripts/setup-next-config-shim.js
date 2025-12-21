const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', '.storybook', 'next-config-shim.js');
const destDir = path.resolve(__dirname, '..', 'node_modules', 'next');
const dest = path.join(destDir, 'config.js');

try {
  if (!fs.existsSync(destDir)) {
    console.warn('Destination directory does not exist:', destDir);
    process.exit(0);
  }

  const content = fs.readFileSync(src, 'utf8');
  fs.writeFileSync(dest, content, 'utf8');
  console.log('Wrote next/config shim to', dest);
} catch (err) {
  console.error('Failed to write next/config shim:', err.message);
  process.exit(1);
}
