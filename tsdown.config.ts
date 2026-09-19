import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  entry: 'src/**/*.{ts,tsx}',
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  unbundle: true,
  tsconfig: 'tsconfig.build.json',
  deps: {
    neverBundle: [
      'react',
      /^react\//,
      'react-dom',
      /^react-dom\//,
      '@pastweb/react',
      /^@pastweb\/react\//,
      '@pastweb/components-core',
      /^@pastweb\/components-core\//,
    ],
  },
  exports: { all: true },
});
