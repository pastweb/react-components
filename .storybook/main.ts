import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const storybookStyles = fileURLToPath(new URL('./styles', import.meta.url));

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
            find: '@/styles',
            replacement: storybookStyles,
          },
        ],
        dedupe: ['react', 'react-dom'],
      },
      server: {
        fs: {
          allow: [packageRoot],
        },
      },
    });
  },
};

export default config;
