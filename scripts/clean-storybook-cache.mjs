import { rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cacheDirectories = [
  'node_modules/.cache/storybook',
  'node_modules/.cache/sb-vite-plugin-externals',
  'node_modules/.vite',
];

for (const directory of cacheDirectories) {
  rmSync(resolve(packageRoot, directory), {
    force: true,
    recursive: true,
  });
}

console.log('Storybook and Vite caches cleared.');
