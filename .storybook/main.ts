import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const rendererSource = fileURLToPath(new URL('../src', import.meta.url));
const storybookStyles = fileURLToPath(new URL('./styles', import.meta.url));
const componentsCoreSource = fileURLToPath(new URL('../../components-core/src', import.meta.url));
const reactSource = fileURLToPath(new URL('../../react/src/index.ts', import.meta.url));
const toolsSource = fileURLToPath(new URL('../../tools/src/index.ts', import.meta.url));
const componentsCoreRoot = fileURLToPath(new URL('../../components-core', import.meta.url));
const reactRoot = fileURLToPath(new URL('../../react', import.meta.url));
const toolsRoot = fileURLToPath(new URL('../../tools', import.meta.url));

const config: StorybookConfig & { title: string } = {
  title: 'React Components',
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {
    sidebarOnboardingChecklist: false,
  },
  staticDirs: ['./assets'],
  viteFinal: async config => {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: /^@pastweb\/components-core\/(.+)$/,
            replacement: `${componentsCoreSource}/$1`,
          },
          {
            find: '@pastweb/components-core',
            replacement: `${componentsCoreSource}/index.ts`,
          },
          {
            find: /^@pastweb\/react-components\/(.+)$/,
            replacement: `${rendererSource}/$1`,
          },
          {
            find: '@pastweb/react-components',
            replacement: `${rendererSource}/index.ts`,
          },
          {
            find: '@pastweb/react',
            replacement: reactSource,
          },
          {
            find: /^@pastweb\/tools$/,
            replacement: toolsSource,
          },
          {
            find: '@/styles',
            replacement: storybookStyles,
          },
        ],
        dedupe: ['react', 'react-dom', '@pastweb/react', '@pastweb/components-core', '@pastweb/tools'],
      },
      optimizeDeps: {
        exclude: [
          '@pastweb/components-core',
          '@pastweb/react-components',
          '@pastweb/react',
          '@pastweb/tools',
        ],
      },
      server: {
        fs: {
          allow: [packageRoot, componentsCoreRoot, reactRoot, toolsRoot],
        },
      },
    });
  },
};

export default config;
