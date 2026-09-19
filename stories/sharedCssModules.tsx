import type { ReactNode } from 'react';
import { cl } from '@/styles';

export const THEME_CLASSES = [
  '',
  'is-primary',
  'is-info',
  'is-success',
  'is-warning',
  'is-danger',
] as const;

export const SIZE_CLASSES = [
  '',
  'is-x-small',
  'is-small',
  'is-large',
  'is-x-large',
  'is-xx-large',
] as const;

export type SharedCssModuleArgs = {
  theme: (typeof THEME_CLASSES)[number];
  sizeClass: (typeof SIZE_CLASSES)[number];
  outlined: boolean;
};

export const SHARED_CSS_MODULE_ARGS: SharedCssModuleArgs = {
  theme: '',
  sizeClass: '',
  outlined: false,
};

export const SHARED_CSS_MODULE_ARG_TYPES = {
  theme: {
    control: 'select',
    options: [...THEME_CLASSES],
    description: 'Shared theme class from themes.module.scss.',
    table: {
      category: 'Shared CSS Modules',
      defaultValue: { summary: '""' },
    },
  },
  sizeClass: {
    name: 'size',
    control: 'select',
    options: [...SIZE_CLASSES],
    description: 'Shared size class from themes.module.scss.',
    table: {
      category: 'Shared CSS Modules',
      defaultValue: { summary: '""' },
    },
  },
  outlined: {
    name: 'is-outlined',
    control: 'boolean',
    description: 'Applies the shared is-outlined class.',
    table: {
      category: 'Shared CSS Modules',
      defaultValue: { summary: 'false' },
    },
  },
};

export const sharedCssModuleClassName = (
  className: string | undefined,
  { theme, sizeClass, outlined }: SharedCssModuleArgs,
  ...extra: Array<string | false | undefined | null>
) => [className, theme, sizeClass, outlined && 'is-outlined', ...extra]
  .filter(Boolean)
  .join(' ');

export const withSharedCssModules = (children: ReactNode) => (
  <div className={cl('root', 'light')}>{children}</div>
);
