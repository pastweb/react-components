/// <reference types="vitest" />
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const WEB_REGEX = '**/tests/**/*.web.test.{js,ts,jsx,tsx}';
const NODE_REGEX = '**/tests/**/*.node.test.{js,ts,jsx,tsx}';
const COMPONENTS_CORE_SOURCE = fileURLToPath(new URL('../components-core/src', import.meta.url));
const REACT_ENTRY = fileURLToPath(new URL('../react/src/index.ts', import.meta.url));
const aliases = [
  {
    find: /^@pastweb\/components-core\/(.+)$/,
    replacement: `${COMPONENTS_CORE_SOURCE}/$1`,
  },
  {
    find: '@pastweb/components-core',
    replacement: `${COMPONENTS_CORE_SOURCE}/index.ts`,
  },
  { find: '@pastweb/react', replacement: REACT_ENTRY },
];

export default defineConfig({
  resolve: {
    alias: aliases,
    dedupe: ['@pastweb/tools', 'react', 'react-dom'],
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    includeSource: ['src/**/*.{js,ts,jsx,tsx}'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['node_modules', 'dist', '**/*.d.ts'],
      thresholds: {
        branches: 0,
        functions: 5,
        lines: 5,
        statements: 5,
      },
    },

    // Multiple Projects
    projects: [
      {
        resolve: {
          alias: aliases,
          dedupe: ['@pastweb/tools', 'react', 'react-dom'],
          tsconfigPaths: true,
        },
        test: {
          name: 'DOM',
          environment: 'jsdom',
          include: [WEB_REGEX],
          setupFiles: [
            'core-js/stable',
            'vitest-localstorage-mock',
            'fake-indexeddb/auto',
          ],
          server: {
            deps: {
              inline: ['axios'],
            },
          },
        },
      },
      {
        resolve: {
          alias: aliases,
          dedupe: ['@pastweb/tools', 'react', 'react-dom'],
          tsconfigPaths: true,
        },
        test: {
          name: 'NODE',
          environment: 'node',
          include: [NODE_REGEX],
        },
      },
    ],
  },
});
