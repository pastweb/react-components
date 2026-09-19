import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/Pagination';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Pagination as PaginationComponent } from './components';

type PaginationStoryArgs = ComponentProps<typeof PaginationComponent> & SharedCssModuleArgs & {
  fullWidth: boolean;
};

const meta = {
  title: 'Components/Pagination',
  component: PaginationComponent,
  render: ({ className, theme, sizeClass, outlined, fullWidth, ...args }) => (
    withSharedCssModules(
      <PaginationComponent
        {...args}
        className={sharedCssModuleClassName(
          className,
          { theme, sizeClass, outlined },
          fullWidth && 'is-full-width',
        )}
      />,
    )
  ),
  parameters: {
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...INITIAL_VIEWPORTS,
      },
    },
  },
  args: {
    ...SHARED_CSS_MODULE_ARGS,
    fullWidth: false,
    ...DEFAULT_PROPS,
    current: 1,
    total: 10,
    onChange: fn(),
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    fullWidth: {
      name: 'is-full-width',
      control: 'boolean',
      description: 'Makes the Pagination fill the available width.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the navigation landmark. Pass an empty string to omit it.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Pagination.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    current: {
      control: 'number',
      description: 'Current one-based page. Values are clamped to the available range.',
      table: { category: 'Props' },
    },
    disabled: {
      control: 'boolean',
      description: 'Makes every navigation action unavailable.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.disabled) },
      },
    },
    jumpBackAriaLabel: {
      control: 'text',
      description: 'Accessible name for the backward ellipsis jump control.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.jumpBackAriaLabel) },
      },
    },
    jumpForwardAriaLabel: {
      control: 'text',
      description: 'Accessible name for the forward ellipsis jump control.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.jumpForwardAriaLabel) },
      },
    },
    next: {
      control: 'text',
      description: 'Visual content of the next control.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.next) },
      },
    },
    nextAriaLabel: {
      control: 'text',
      description: 'Accessible name for the next control.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.nextAriaLabel) },
      },
    },
    onChange: {
      control: false,
      description: 'Called with a valid changed page.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    pageAriaLabel: {
      control: false,
      description: 'Names a numbered page control.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'Page N' },
      },
    },
    prev: {
      control: 'text',
      description: 'Visual content of the previous control.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.prev) },
      },
    },
    prevAriaLabel: {
      control: 'text',
      description: 'Accessible name for the previous control.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.prevAriaLabel) },
      },
    },
    total: {
      control: 'number',
      description: 'Number of pages. Values are floored and clamped to zero or greater.',
      table: { category: 'Props' },
    },
  },
} satisfies Meta<PaginationStoryArgs>;

export default meta;
type Story = StoryObj<PaginationStoryArgs>;

export const Pagination: Story = {};
